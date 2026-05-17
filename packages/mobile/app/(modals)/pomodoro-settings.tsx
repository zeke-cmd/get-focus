import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { pomodoroSettings } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { X, Minus, Plus, Timer, Coffee, Repeat, Target } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

export default function PomodoroSettingsModal() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();

  const [workMin, setWorkMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(15);
  const [cycles, setCycles] = useState(4);
  const [dailyGoal, setDailyGoal] = useState(4);

  useEffect(() => {
    async function load() {
      const rows = await db.select().from(pomodoroSettings).where(eq(pomodoroSettings.id, 1));
      if (rows.length > 0) {
        const s = rows[0];
        setWorkMin(s.workMinutes);
        setBreakMin(s.breakMinutes);
        setLongBreakMin(s.longBreakMinutes);
        setCycles(s.cyclesUntilLongBreak);
        setDailyGoal(s.dailyGoalHours);
      }
    }
    load();
  }, []);

  const save = async () => {
    await db.insert(pomodoroSettings).values({
      id: 1,
      workMinutes: workMin,
      breakMinutes: breakMin,
      longBreakMinutes: longBreakMin,
      cyclesUntilLongBreak: cycles,
      dailyGoalHours: dailyGoal,
      notificationsEnabled: true,
    }).onConflictDoUpdate({
      target: pomodoroSettings.id,
      set: {
        workMinutes: workMin,
        breakMinutes: breakMin,
        longBreakMinutes: longBreakMin,
        cyclesUntilLongBreak: cycles,
        dailyGoalHours: dailyGoal,
      },
    });
    haptic.success();
    router.back();
  };

  const NumericStepper = ({
    value,
    onDec,
    onInc,
    label,
    icon: Icon,
    unit,
    min,
    max,
    step = 1,
  }: {
    value: number;
    onDec: () => void;
    onInc: () => void;
    label: string;
    icon: typeof Timer;
    unit: string;
    min: number;
    max: number;
    step?: number;
  }) => (
    <View style={[styles.row, { borderColor: colors.border }]}>
      <View style={styles.rowLeft}>
        <Icon size={16} color={colors.foreground} strokeWidth={1.5} />
        <Text style={[styles.rowLabel, { color: colors.foreground, fontFamily: fonts.body }]}>
          {label}
        </Text>
      </View>
      <View style={styles.stepper}>
        <Pressable
          style={[styles.stepBtn, { borderColor: colors.border }]}
          onPress={() => {
            if (value > min) {
              haptic.selection();
              onDec();
            }
          }}
        >
          <Minus size={14} color={value > min ? colors.foreground : colors.mutedForeground} strokeWidth={2} />
        </Pressable>
        <Text style={[styles.stepValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
          {value}{unit}
        </Text>
        <Pressable
          style={[styles.stepBtn, { borderColor: colors.border }]}
          onPress={() => {
            if (value < max) {
              haptic.selection();
              onInc();
            }
          }}
        >
          <Plus size={14} color={value < max ? colors.foreground : colors.mutedForeground} strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          pomodoro settings
        </Text>
        <Pressable onPress={() => router.back()}>
          <X size={22} color={colors.foreground} strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <NumericStepper
          value={workMin}
          onDec={() => setWorkMin((v) => v - 5)}
          onInc={() => setWorkMin((v) => v + 5)}
          label="work duration"
          icon={Timer}
          unit="m"
          min={5}
          max={90}
        />
        <NumericStepper
          value={breakMin}
          onDec={() => setBreakMin((v) => v - 1)}
          onInc={() => setBreakMin((v) => v + 1)}
          label="short break"
          icon={Coffee}
          unit="m"
          min={1}
          max={30}
        />
        <NumericStepper
          value={longBreakMin}
          onDec={() => setLongBreakMin((v) => v - 5)}
          onInc={() => setLongBreakMin((v) => v + 5)}
          label="long break"
          icon={Coffee}
          unit="m"
          min={5}
          max={60}
        />
        <NumericStepper
          value={cycles}
          onDec={() => setCycles((v) => v - 1)}
          onInc={() => setCycles((v) => v + 1)}
          label="cycles before long break"
          icon={Repeat}
          unit=""
          min={2}
          max={8}
        />
        <NumericStepper
          value={dailyGoal}
          onDec={() => setDailyGoal((v) => Math.round((v - 0.5) * 10) / 10)}
          onInc={() => setDailyGoal((v) => Math.round((v + 0.5) * 10) / 10)}
          label="daily goal"
          icon={Target}
          unit="h"
          min={0.5}
          max={12}
        />

        <Pressable
          style={[styles.saveBtn, { backgroundColor: colors.foreground }]}
          onPress={save}
        >
          <Text style={[styles.saveBtnText, { color: colors.background, fontFamily: fonts.heading }]}>
            save settings
          </Text>
        </Pressable>
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
  content: { padding: 20, gap: 0, paddingBottom: 40 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  rowLabel: { fontSize: 14, textTransform: 'lowercase' },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValue: { fontSize: 16, minWidth: 40, textAlign: 'center' },
  saveBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  saveBtnText: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
});
