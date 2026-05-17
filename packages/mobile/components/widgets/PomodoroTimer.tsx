import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, AppState } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { pomodoroSettings, pomodoroSessions } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Timer, Play, Pause, RotateCcw, Coffee, Settings } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { useRouter } from 'expo-router';

type Mode = 'work' | 'break' | 'long-break';

export function PomodoroTimer() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();

  const [workMin, setWorkMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(15);
  const [cyclesUntilLong, setCyclesUntilLong] = useState(4);

  const [mode, setMode] = useState<Mode>('work');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const rows = await db.select().from(pomodoroSettings).where(eq(pomodoroSettings.id, 1));
      if (rows.length > 0) {
        const s = rows[0];
        setWorkMin(s.workMinutes);
        setBreakMin(s.breakMinutes);
        setLongBreakMin(s.longBreakMinutes);
        setCyclesUntilLong(s.cyclesUntilLongBreak);
        setSecondsLeft(s.workMinutes * 60);
      }
    }
    loadSettings();
  }, []);

  const totalSeconds = useCallback(() => {
    switch (mode) {
      case 'work': return workMin * 60;
      case 'break': return breakMin * 60;
      case 'long-break': return longBreakMin * 60;
    }
  }, [mode, workMin, breakMin, longBreakMin]);

  // Handle background/foreground
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && endTimeRef.current && running) {
        const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
        setSecondsLeft(remaining);
        if (remaining <= 0) handleTimerEnd();
      }
    });
    return () => sub.remove();
  }, [running, mode]);

  useEffect(() => {
    if (running) {
      endTimeRef.current = Date.now() + secondsLeft * 1000;
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      endTimeRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleTimerEnd = async () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    haptic.success();

    if (mode === 'work') {
      // log session
      await db.insert(pomodoroSessions).values({
        durationMinutes: workMin,
        completedAt: new Date().toISOString(),
      });

      const newCycle = cycle + 1;
      setCycle(newCycle);

      if (newCycle % cyclesUntilLong === 0) {
        setMode('long-break');
        setSecondsLeft(longBreakMin * 60);
      } else {
        setMode('break');
        setSecondsLeft(breakMin * 60);
      }
    } else {
      setMode('work');
      setSecondsLeft(workMin * 60);
    }
  };

  const toggleTimer = () => {
    haptic.light();
    setRunning(!running);
  };

  const resetTimer = () => {
    haptic.light();
    setRunning(false);
    setMode('work');
    setSecondsLeft(workMin * 60);
    setCycle(0);
  };

  const progress = 1 - secondsLeft / totalSeconds();
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const modeLabel = mode === 'work' ? 'focus' : mode === 'break' ? 'break' : 'long break';

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerRow}>
          <Timer size={16} color={colors.foreground} strokeWidth={1.5} />
          <CardTitle>pomodoro</CardTitle>
          <Pressable
            onPress={() => {
              haptic.light();
              router.push('/(modals)/pomodoro-settings');
            }}
            style={{ marginLeft: 'auto' }}
          >
            <Settings size={16} color={colors.mutedForeground} strokeWidth={1.5} />
          </Pressable>
        </View>
      </CardHeader>
      <CardContent>
        <View style={styles.timerContainer}>
          {/* progress bar */}
          <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.foreground,
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>

          <View style={styles.timerRow}>
            <View style={styles.modeTag}>
              {mode !== 'work' && <Coffee size={14} color={colors.mutedForeground} strokeWidth={1.5} />}
              <Text style={[styles.modeText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                {modeLabel}
              </Text>
            </View>
            <Text style={[styles.time, { color: colors.foreground, fontFamily: fonts.heading }]}>
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </Text>
            <Text style={[styles.cycleText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              cycle {cycle + 1}
            </Text>
          </View>

          <View style={styles.controls}>
            <Pressable
              style={[styles.controlBtn, { borderColor: colors.border }]}
              onPress={resetTimer}
            >
              <RotateCcw size={18} color={colors.foreground} strokeWidth={1.5} />
            </Pressable>
            <Pressable
              style={[styles.playBtn, { backgroundColor: colors.foreground }]}
              onPress={toggleTimer}
            >
              {running ? (
                <Pause size={20} color={colors.background} strokeWidth={2} />
              ) : (
                <Play size={20} color={colors.background} strokeWidth={2} />
              )}
            </Pressable>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerContainer: {
    gap: 20,
    alignItems: 'center',
  },
  progressBg: {
    width: '100%',
    height: 4,
  },
  progressFill: {
    height: 4,
  },
  timerRow: {
    alignItems: 'center',
    gap: 4,
  },
  modeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modeText: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  time: {
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 2,
  },
  cycleText: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 56,
    height: 44,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
