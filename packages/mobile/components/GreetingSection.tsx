import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, fonts } from '../lib/theme';
import { useDatabase } from '../db/client';
import { userProfile, weeklyStreaks } from '../db/schema';
import { eq } from 'drizzle-orm';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'good morning';
  if (h < 17) return 'good afternoon';
  return 'good evening';
}

function getFormattedDate(): string {
  return new Date()
    .toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toLowerCase();
}

function getWeekStartId(): string {
  const now = new Date();
  const d = new Date(now);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

function getDayOfWeek(): number {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1; // Mon=0 .. Sun=6
}

export function GreetingSection() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [name, setName] = useState('');
  const [streakDays, setStreakDays] = useState<boolean[]>([false, false, false, false, false, false, false]);

  useEffect(() => {
    async function load() {
      const profile = await db.select().from(userProfile).limit(1);
      if (profile.length > 0) setName(profile[0].name);

      const weekId = getWeekStartId();
      const streak = await db.select().from(weeklyStreaks).where(eq(weeklyStreaks.id, weekId));
      if (streak.length > 0) {
        try {
          setStreakDays(JSON.parse(streak[0].completedDays));
        } catch {}
      }
    }
    load();
  }, []);

  const days = ['m', 't', 'w', 't', 'f', 's', 's'];
  const todayIdx = getDayOfWeek();

  return (
    <View style={styles.container}>
      <Text style={[styles.greeting, { color: colors.foreground, fontFamily: fonts.heading }]}>
        {getGreeting()}{name ? `, ${name}` : ''}
      </Text>
      <Text style={[styles.date, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
        {getFormattedDate()}
      </Text>
      <View style={styles.streakRow}>
        {days.map((day, i) => (
          <View key={i} style={styles.streakItem}>
            <Text
              style={[
                styles.dayLabel,
                {
                  color: i === todayIdx ? colors.foreground : colors.mutedForeground,
                  fontFamily: fonts.body,
                  fontWeight: i === todayIdx ? '600' : '400',
                },
              ]}
            >
              {day}
            </Text>
            <View
              style={[
                styles.streakDot,
                {
                  backgroundColor: streakDays[i]
                    ? colors.foreground
                    : colors.border,
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 0.5,
    textTransform: 'lowercase',
  },
  date: {
    fontSize: 14,
    textTransform: 'lowercase',
  },
  streakRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  streakItem: {
    alignItems: 'center',
    gap: 6,
  },
  dayLabel: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: 0,
  },
});
