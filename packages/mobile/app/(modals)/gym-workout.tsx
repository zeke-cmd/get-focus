import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { gymExercises, gymWorkouts, gymSets } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { X, Plus, Trash2, Clock, Check, Dumbbell, Search } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

interface SetEntry {
  reps: string;
  weight: string;
}

interface ExerciseEntry {
  exerciseId: string;
  exerciseName: string;
  sets: SetEntry[];
}

export default function GymWorkoutModal() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();

  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const [allExercises, setAllExercises] = useState<any[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [restTimer, setRestTimer] = useState(0);
  const [restRunning, setRestRunning] = useState(false);
  const [startTime] = useState(Date.now());
  const restInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function loadExercises() {
      const rows = await db.select().from(gymExercises).orderBy(gymExercises.name);
      setAllExercises(rows);
    }
    loadExercises();
  }, []);

  // rest timer
  useEffect(() => {
    if (restRunning && restTimer > 0) {
      restInterval.current = setInterval(() => {
        setRestTimer((v) => {
          if (v <= 1) {
            setRestRunning(false);
            haptic.timerDone();
            return 0;
          }
          return v - 1;
        });
      }, 1000);
    }
    return () => {
      if (restInterval.current) clearInterval(restInterval.current);
    };
  }, [restRunning, restTimer]);

  const startRest = (seconds: number) => {
    haptic.medium();
    setRestTimer(seconds);
    setRestRunning(true);
  };

  const addExercise = (ex: any) => {
    haptic.medium();
    setExercises((prev) => [
      ...prev,
      { exerciseId: ex.id, exerciseName: ex.name, sets: [{ reps: '', weight: '' }] },
    ]);
    setShowPicker(false);
    setSearchQuery('');
  };

  const removeExercise = (idx: number) => {
    haptic.light();
    setExercises((prev) => prev.filter((_, i) => i !== idx));
  };

  const addSet = (exIdx: number) => {
    haptic.light();
    setExercises((prev) => {
      const copy = [...prev];
      const last = copy[exIdx].sets[copy[exIdx].sets.length - 1];
      copy[exIdx] = {
        ...copy[exIdx],
        sets: [...copy[exIdx].sets, { reps: last?.reps || '', weight: last?.weight || '' }],
      };
      return copy;
    });
  };

  const removeSet = (exIdx: number, setIdx: number) => {
    setExercises((prev) => {
      const copy = [...prev];
      copy[exIdx] = {
        ...copy[exIdx],
        sets: copy[exIdx].sets.filter((_, i) => i !== setIdx),
      };
      return copy;
    });
  };

  const updateSet = (exIdx: number, setIdx: number, field: 'reps' | 'weight', value: string) => {
    setExercises((prev) => {
      const copy = [...prev];
      const sets = [...copy[exIdx].sets];
      sets[setIdx] = { ...sets[setIdx], [field]: value };
      copy[exIdx] = { ...copy[exIdx], sets };
      return copy;
    });
  };

  const finishWorkout = async () => {
    if (exercises.length === 0) {
      Alert.alert('no exercises', 'add at least one exercise to save.');
      return;
    }

    const durationMinutes = Math.round((Date.now() - startTime) / 60000);
    const workoutId = randomUUID();
    const today = new Date().toISOString().split('T')[0];

    await db.insert(gymWorkouts).values({
      id: workoutId,
      name: workoutName.trim() || `workout ${today}`,
      date: today,
      durationMinutes,
      notes: null,
      createdAt: new Date().toISOString(),
    });

    let sortOrder = 0;
    for (const ex of exercises) {
      for (let s = 0; s < ex.sets.length; s++) {
        const set = ex.sets[s];
        const reps = parseInt(set.reps) || null;
        const weight = parseFloat(set.weight) || null;
        if (reps || weight) {
          await db.insert(gymSets).values({
            workoutId,
            exerciseId: ex.exerciseId,
            setNumber: s + 1,
            reps,
            weight,
            durationSeconds: null,
            sortOrder: sortOrder++,
          });
        }
      }
    }

    haptic.success();
    router.back();
  };

  const filteredExercises = allExercises.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          workout
        </Text>
        <Pressable onPress={() => {
          if (exercises.length > 0) {
            Alert.alert('discard workout?', 'your progress will be lost.', [
              { text: 'cancel', style: 'cancel' },
              { text: 'discard', style: 'destructive', onPress: () => router.back() },
            ]);
          } else {
            router.back();
          }
        }}>
          <X size={22} color={colors.foreground} strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Workout Name */}
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
          ]}
          placeholder="workout name (optional)"
          placeholderTextColor={colors.mutedForeground}
          value={workoutName}
          onChangeText={setWorkoutName}
        />

        {/* Rest Timer */}
        {restRunning && (
          <View style={[styles.restBox, { borderColor: colors.border }]}>
            <Clock size={16} color={colors.foreground} strokeWidth={1.5} />
            <Text style={[styles.restText, { color: colors.foreground, fontFamily: fonts.heading }]}>
              rest: {formatTime(restTimer)}
            </Text>
            <Pressable onPress={() => { setRestRunning(false); setRestTimer(0); }}>
              <X size={16} color={colors.mutedForeground} strokeWidth={1.5} />
            </Pressable>
          </View>
        )}
        {!restRunning && exercises.length > 0 && (
          <View style={styles.restBtns}>
            {[30, 60, 90, 120].map((s) => (
              <Pressable
                key={s}
                style={[styles.restBtn, { borderColor: colors.border }]}
                onPress={() => startRest(s)}
              >
                <Text style={[styles.restBtnText, { color: colors.foreground, fontFamily: fonts.body }]}>
                  {s < 60 ? `${s}s` : `${s / 60}m`}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Exercises */}
        {exercises.map((ex, exIdx) => (
          <View key={`${ex.exerciseId}-${exIdx}`} style={[styles.exCard, { borderColor: colors.border }]}>
            <View style={styles.exHeader}>
              <Text style={[styles.exName, { color: colors.foreground, fontFamily: fonts.heading }]}>
                {ex.exerciseName}
              </Text>
              <Pressable onPress={() => removeExercise(exIdx)}>
                <Trash2 size={16} color={colors.mutedForeground} strokeWidth={1.5} />
              </Pressable>
            </View>

            {/* Set headers */}
            <View style={styles.setHeaderRow}>
              <Text style={[styles.setHeaderText, { color: colors.mutedForeground, fontFamily: fonts.body, flex: 0.5 }]}>
                set
              </Text>
              <Text style={[styles.setHeaderText, { color: colors.mutedForeground, fontFamily: fonts.body, flex: 1 }]}>
                reps
              </Text>
              <Text style={[styles.setHeaderText, { color: colors.mutedForeground, fontFamily: fonts.body, flex: 1 }]}>
                kg
              </Text>
              <View style={{ width: 24 }} />
            </View>

            {ex.sets.map((set, setIdx) => (
              <View key={setIdx} style={styles.setRow}>
                <Text style={[styles.setNum, { color: colors.mutedForeground, fontFamily: fonts.body, flex: 0.5 }]}>
                  {setIdx + 1}
                </Text>
                <TextInput
                  style={[
                    styles.setInput,
                    { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body, flex: 1 },
                  ]}
                  placeholder="0"
                  placeholderTextColor={colors.mutedForeground}
                  keyboardType="numeric"
                  value={set.reps}
                  onChangeText={(v) => updateSet(exIdx, setIdx, 'reps', v)}
                />
                <TextInput
                  style={[
                    styles.setInput,
                    { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body, flex: 1 },
                  ]}
                  placeholder="0"
                  placeholderTextColor={colors.mutedForeground}
                  keyboardType="decimal-pad"
                  value={set.weight}
                  onChangeText={(v) => updateSet(exIdx, setIdx, 'weight', v)}
                />
                <Pressable onPress={() => removeSet(exIdx, setIdx)} style={{ width: 24 }}>
                  <X size={14} color={colors.mutedForeground} strokeWidth={1.5} />
                </Pressable>
              </View>
            ))}

            <Pressable
              style={[styles.addSetBtn, { borderColor: colors.border }]}
              onPress={() => addSet(exIdx)}
            >
              <Plus size={14} color={colors.foreground} strokeWidth={1.5} />
              <Text style={[styles.addSetText, { color: colors.foreground, fontFamily: fonts.body }]}>
                add set
              </Text>
            </Pressable>
          </View>
        ))}

        {/* Add Exercise Button */}
        {!showPicker ? (
          <Pressable
            style={[styles.addExBtn, { borderColor: colors.border }]}
            onPress={() => {
              haptic.light();
              setShowPicker(true);
            }}
          >
            <Dumbbell size={16} color={colors.foreground} strokeWidth={1.5} />
            <Text style={[styles.addExText, { color: colors.foreground, fontFamily: fonts.body }]}>
              add exercise
            </Text>
          </Pressable>
        ) : (
          <View style={[styles.pickerBox, { borderColor: colors.border }]}>
            <View style={[styles.searchRow, { borderColor: colors.border }]}>
              <Search size={14} color={colors.mutedForeground} strokeWidth={1.5} />
              <TextInput
                style={[styles.searchInput, { color: colors.foreground, fontFamily: fonts.body }]}
                placeholder="search exercises..."
                placeholderTextColor={colors.mutedForeground}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <Pressable onPress={() => { setShowPicker(false); setSearchQuery(''); }}>
                <X size={16} color={colors.mutedForeground} strokeWidth={1.5} />
              </Pressable>
            </View>
            {filteredExercises.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                no exercises found. add some in the gym tab first.
              </Text>
            ) : (
              filteredExercises.slice(0, 10).map((ex) => (
                <Pressable
                  key={ex.id}
                  style={[styles.exPickerRow, { borderColor: colors.border }]}
                  onPress={() => addExercise(ex)}
                >
                  <Text style={[styles.exPickerName, { color: colors.foreground, fontFamily: fonts.body }]}>
                    {ex.name}
                  </Text>
                  <Text style={[styles.exPickerCat, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                    {ex.category}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
        )}

        {/* Finish */}
        {exercises.length > 0 && (
          <Pressable
            style={[styles.finishBtn, { backgroundColor: colors.foreground }]}
            onPress={finishWorkout}
          >
            <Check size={18} color={colors.background} strokeWidth={2} />
            <Text style={[styles.finishText, { color: colors.background, fontFamily: fonts.heading }]}>
              finish workout
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: { fontSize: 20, fontWeight: '300', textTransform: 'lowercase' },
  content: { padding: 20, gap: 16, paddingBottom: 40 },
  input: {
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 14,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  restBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    padding: 12,
  },
  restText: { flex: 1, fontSize: 16 },
  restBtns: { flexDirection: 'row', gap: 8 },
  restBtn: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restBtnText: { fontSize: 12, textTransform: 'lowercase' },
  exCard: { borderWidth: 1, padding: 14, gap: 10 },
  exHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exName: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
  setHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  setHeaderText: { fontSize: 11, textTransform: 'lowercase' },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  setNum: { fontSize: 13, textAlign: 'center' },
  setInput: {
    borderWidth: 1,
    height: 36,
    paddingHorizontal: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 32,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addSetText: { fontSize: 12, textTransform: 'lowercase' },
  addExBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addExText: { fontSize: 14, textTransform: 'lowercase' },
  pickerBox: { borderWidth: 1, overflow: 'hidden' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderBottomWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14, padding: 0 },
  exPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
  },
  exPickerName: { fontSize: 14, textTransform: 'lowercase' },
  exPickerCat: { fontSize: 12, textTransform: 'lowercase' },
  emptyText: { padding: 16, fontSize: 13, textAlign: 'center', textTransform: 'lowercase' },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    marginTop: 8,
  },
  finishText: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
});
