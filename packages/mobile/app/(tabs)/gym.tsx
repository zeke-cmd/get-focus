import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { gymExercises, gymWorkouts, gymSets } from '../../db/schema';
import { eq, desc, count, sum } from 'drizzle-orm';
import {
  Dumbbell,
  Plus,
  Play,
  Clock,
  Flame,
  Trash2,
  ChevronRight,
} from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

type Tab = 'overview' | 'exercises' | 'history';
type GymCat = 'push' | 'pull' | 'legs' | 'cardio' | 'core' | 'other';

const CATEGORIES: GymCat[] = ['push', 'pull', 'legs', 'cardio', 'core', 'other'];

export default function GymScreen() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overview');
  const [exercises, setExercises] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [weekCount, setWeekCount] = useState(0);
  const [newExercise, setNewExercise] = useState('');
  const [newCategory, setNewCategory] = useState<GymCat>('push');
  const [showAddExercise, setShowAddExercise] = useState(false);

  const load = useCallback(async () => {
    const ex = await db.select().from(gymExercises).orderBy(gymExercises.category);
    setExercises(ex);

    const w = await db.select().from(gymWorkouts).orderBy(desc(gymWorkouts.date)).limit(20);
    setWorkouts(w);

    // count this week
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monDate = new Date(now);
    monDate.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const weekStart = monDate.toISOString().split('T')[0];
    const thisWeek = w.filter((wo) => wo.date >= weekStart);
    setWeekCount(thisWeek.length);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addExercise = async () => {
    if (!newExercise.trim()) return;
    await db.insert(gymExercises).values({
      id: randomUUID(),
      name: newExercise.trim(),
      category: newCategory,
      createdAt: new Date().toISOString(),
    });
    haptic.medium();
    setNewExercise('');
    setShowAddExercise(false);
    load();
  };

  const deleteExercise = async (id: string) => {
    haptic.light();
    await db.delete(gymExercises).where(eq(gymExercises.id, id));
    load();
  };

  const deleteWorkout = async (id: string) => {
    haptic.light();
    await db.delete(gymSets).where(eq(gymSets.workoutId, id));
    await db.delete(gymWorkouts).where(eq(gymWorkouts.id, id));
    load();
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'overview' },
    { key: 'exercises', label: 'exercises' },
    { key: 'history', label: 'history' },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          gym
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((t) => (
          <Pressable
            key={t.key}
            style={[
              styles.tab,
              {
                backgroundColor: tab === t.key ? colors.foreground : 'transparent',
                borderColor: colors.border,
              },
            ]}
            onPress={() => {
              haptic.selection();
              setTab(t.key);
            }}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: tab === t.key ? colors.background : colors.mutedForeground,
                  fontFamily: fonts.body,
                },
              ]}
            >
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === 'overview' && (
          <>
            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { borderColor: colors.border }]}>
                <Dumbbell size={18} color={colors.foreground} strokeWidth={1.5} />
                <Text style={[styles.statValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {weekCount}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  this week
                </Text>
              </View>
              <View style={[styles.statCard, { borderColor: colors.border }]}>
                <Flame size={18} color={colors.foreground} strokeWidth={1.5} />
                <Text style={[styles.statValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {exercises.length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  exercises
                </Text>
              </View>
              <View style={[styles.statCard, { borderColor: colors.border }]}>
                <Clock size={18} color={colors.foreground} strokeWidth={1.5} />
                <Text style={[styles.statValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {workouts.length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  total
                </Text>
              </View>
            </View>

            {/* Quick start */}
            <Card>
              <CardContent>
                <View style={styles.quickStart}>
                  <Text style={[styles.quickTitle, { color: colors.foreground, fontFamily: fonts.heading }]}>
                    ready to train?
                  </Text>
                  <Text style={[styles.quickDesc, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                    start a workout, add exercises, and log your sets.
                  </Text>
                  <Button
                    label="start workout"
                    onPress={() => {
                      haptic.medium();
                      router.push('/(modals)/gym-workout');
                    }}
                    style={{ marginTop: 12 }}
                  />
                </View>
              </CardContent>
            </Card>

            {/* Recent workouts */}
            {workouts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>recent workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  {workouts.slice(0, 3).map((w) => (
                    <View key={w.id} style={[styles.workoutRow, { borderBottomColor: colors.border }]}>
                      <View>
                        <Text style={[styles.workoutName, { color: colors.foreground, fontFamily: fonts.body }]}>
                          {w.name}
                        </Text>
                        <Text style={[styles.workoutDate, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                          {w.date}{w.durationMinutes ? ` • ${w.durationMinutes}min` : ''}
                        </Text>
                      </View>
                      <ChevronRight size={16} color={colors.mutedForeground} strokeWidth={1.5} />
                    </View>
                  ))}
                </CardContent>
              </Card>
            )}
          </>
        )}

        {tab === 'exercises' && (
          <>
            <View style={styles.exerciseHeader}>
              <Pressable
                style={[styles.addExBtn, { backgroundColor: colors.foreground }]}
                onPress={() => setShowAddExercise(!showAddExercise)}
              >
                <Plus size={16} color={colors.background} strokeWidth={2} />
                <Text style={[styles.addExText, { color: colors.background, fontFamily: fonts.body }]}>
                  add exercise
                </Text>
              </Pressable>
            </View>

            {showAddExercise && (
              <Card>
                <CardContent>
                  <View style={styles.addForm}>
                    <TextInput
                      style={[
                        styles.input,
                        { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
                      ]}
                      placeholder="exercise name"
                      placeholderTextColor={colors.mutedForeground}
                      value={newExercise}
                      onChangeText={setNewExercise}
                      autoFocus
                    />
                    <View style={styles.catRow}>
                      {CATEGORIES.map((c) => (
                        <Pressable
                          key={c}
                          style={[
                            styles.catChip,
                            {
                              backgroundColor: newCategory === c ? colors.foreground : 'transparent',
                              borderColor: colors.border,
                            },
                          ]}
                          onPress={() => setNewCategory(c)}
                        >
                          <Text
                            style={[
                              styles.catChipText,
                              {
                                color: newCategory === c ? colors.background : colors.mutedForeground,
                                fontFamily: fonts.body,
                              },
                            ]}
                          >
                            {c}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                    <Button label="add" onPress={addExercise} size="sm" />
                  </View>
                </CardContent>
              </Card>
            )}

            {CATEGORIES.filter((cat) => exercises.some((e) => e.category === cat)).map((cat) => (
              <Card key={cat}>
                <CardHeader>
                  <CardTitle>{cat}</CardTitle>
                </CardHeader>
                <CardContent>
                  {exercises
                    .filter((e) => e.category === cat)
                    .map((ex) => (
                      <View key={ex.id} style={[styles.exerciseRow, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.exerciseName, { color: colors.foreground, fontFamily: fonts.body }]}>
                          {ex.name}
                        </Text>
                        <Pressable onPress={() => deleteExercise(ex.id)} hitSlop={8}>
                          <Trash2 size={14} color={colors.mutedForeground} strokeWidth={1.5} />
                        </Pressable>
                      </View>
                    ))}
                </CardContent>
              </Card>
            ))}

            {exercises.length === 0 && (
              <View style={styles.empty}>
                <Dumbbell size={32} color={colors.mutedForeground} strokeWidth={1} />
                <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  add exercises to build your library
                </Text>
              </View>
            )}
          </>
        )}

        {tab === 'history' && (
          <>
            {workouts.length === 0 ? (
              <View style={styles.empty}>
                <Clock size={32} color={colors.mutedForeground} strokeWidth={1} />
                <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  no workouts recorded yet
                </Text>
              </View>
            ) : (
              workouts.map((w) => (
                <Card key={w.id}>
                  <CardContent>
                    <View style={styles.historyRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.workoutName, { color: colors.foreground, fontFamily: fonts.body }]}>
                          {w.name}
                        </Text>
                        <Text style={[styles.workoutDate, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                          {w.date}{w.durationMinutes ? ` • ${w.durationMinutes}min` : ''}
                        </Text>
                        {w.notes && (
                          <Text style={[styles.workoutNotes, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                            {w.notes}
                          </Text>
                        )}
                      </View>
                      <Pressable onPress={() => deleteWorkout(w.id)} hitSlop={8}>
                        <Trash2 size={14} color={colors.mutedForeground} strokeWidth={1.5} />
                      </Pressable>
                    </View>
                  </CardContent>
                </Card>
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '300', textTransform: 'lowercase' },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -1,
  },
  tabText: { fontSize: 12, fontWeight: '500', textTransform: 'lowercase' },
  content: { padding: 20, paddingTop: 0, gap: 16, paddingBottom: 32 },
  statsRow: { flexDirection: 'row', gap: 0 },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 0,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    marginRight: -1,
  },
  statValue: { fontSize: 24, fontWeight: '300' },
  statLabel: { fontSize: 11, textTransform: 'lowercase' },
  quickStart: { gap: 4 },
  quickTitle: { fontSize: 18, fontWeight: '300', textTransform: 'lowercase' },
  quickDesc: { fontSize: 13, textTransform: 'lowercase' },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  workoutName: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
  workoutDate: { fontSize: 12, textTransform: 'lowercase' },
  workoutNotes: { fontSize: 12, textTransform: 'lowercase', marginTop: 4 },
  exerciseHeader: { flexDirection: 'row', justifyContent: 'flex-end' },
  addExBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 0,
  },
  addExText: { fontSize: 13, fontWeight: '500', textTransform: 'lowercase' },
  addForm: { gap: 12 },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 12,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  catChip: {
    paddingHorizontal: 10,
    height: 28,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catChipText: { fontSize: 11, textTransform: 'lowercase' },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  exerciseName: { fontSize: 14, textTransform: 'lowercase' },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 14, textTransform: 'lowercase' },
});
