import { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { habits, habitEntries } from '../../db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Flame, Plus, Trash2 } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getWeekDates(): string[] {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mon = new Date(now);
  mon.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

export function HabitTracker() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [habitList, setHabitList] = useState<any[]>([]);
  const [entries, setEntries] = useState<Record<string, Set<string>>>({});
  const [input, setInput] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const weekDates = getWeekDates();
  const today = getTodayStr();
  const dayLabels = ['m', 't', 'w', 't', 'f', 's', 's'];

  const load = useCallback(async () => {
    const h = await db.select().from(habits);
    setHabitList(h);

    if (h.length > 0) {
      const weekStart = weekDates[0];
      const weekEnd = weekDates[6];
      const ent = await db
        .select()
        .from(habitEntries)
        .where(and(gte(habitEntries.date, weekStart), lte(habitEntries.date, weekEnd)));

      const map: Record<string, Set<string>> = {};
      for (const e of ent) {
        if (!map[e.habitId]) map[e.habitId] = new Set();
        map[e.habitId].add(e.date);
      }
      setEntries(map);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleEntry = async (habitId: string, date: string) => {
    haptic.medium();
    const exists = entries[habitId]?.has(date);
    if (exists) {
      await db
        .delete(habitEntries)
        .where(and(eq(habitEntries.habitId, habitId), eq(habitEntries.date, date)));
    } else {
      await db.insert(habitEntries).values({ habitId, date });
    }
    load();
  };

  const addHabit = async () => {
    if (!input.trim()) return;
    await db.insert(habits).values({
      id: randomUUID(),
      name: input.trim(),
      createdAt: new Date().toISOString(),
    });
    haptic.medium();
    setInput('');
    setShowAdd(false);
    load();
  };

  const deleteHabit = async (id: string) => {
    haptic.light();
    await db.delete(habitEntries).where(eq(habitEntries.habitId, id));
    await db.delete(habits).where(eq(habits.id, id));
    load();
  };

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerRow}>
          <Flame size={16} color={colors.foreground} strokeWidth={1.5} />
          <CardTitle>habits</CardTitle>
          <Badge label="pro" variant="outline" style={{ marginLeft: 4 }} />
          <Pressable
            style={{ marginLeft: 'auto' }}
            onPress={() => setShowAdd(!showAdd)}
            hitSlop={8}
          >
            <Plus size={18} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
        </View>
      </CardHeader>
      <CardContent>
        {showAdd && (
          <View style={styles.addRow}>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
              ]}
              placeholder="new habit..."
              placeholderTextColor={colors.mutedForeground}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={addHabit}
              autoFocus
            />
            <Pressable
              style={[styles.addBtn, { backgroundColor: colors.foreground }]}
              onPress={addHabit}
            >
              <Plus size={16} color={colors.background} strokeWidth={2} />
            </Pressable>
          </View>
        )}

        {/* Day labels */}
        {habitList.length > 0 && (
          <View style={styles.dayRow}>
            <View style={styles.habitName} />
            {dayLabels.map((d, i) => (
              <Text
                key={i}
                style={[
                  styles.dayLabel,
                  {
                    color: weekDates[i] === today ? colors.foreground : colors.mutedForeground,
                    fontFamily: fonts.body,
                    fontWeight: weekDates[i] === today ? '600' : '400',
                  },
                ]}
              >
                {d}
              </Text>
            ))}
            <View style={{ width: 20 }} />
          </View>
        )}

        {habitList.length === 0 ? (
          <Text style={[styles.empty, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            tap + to add your first habit
          </Text>
        ) : (
          habitList.map((habit) => {
            const streak = entries[habit.id]?.size ?? 0;
            return (
              <View key={habit.id} style={[styles.habitRow, { borderBottomColor: colors.border }]}>
                <View style={styles.habitName}>
                  <Text
                    style={[styles.habitText, { color: colors.foreground, fontFamily: fonts.body }]}
                    numberOfLines={1}
                  >
                    {habit.name}
                  </Text>
                  {streak > 0 && (
                    <Text style={[styles.streakText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                      {streak}
                    </Text>
                  )}
                </View>
                {weekDates.map((date) => {
                  const checked = entries[habit.id]?.has(date);
                  return (
                    <Pressable
                      key={date}
                      style={[
                        styles.dot,
                        {
                          backgroundColor: checked ? colors.foreground : 'transparent',
                          borderColor: colors.border,
                        },
                      ]}
                      onPress={() => toggleEntry(habit.id, date)}
                    />
                  );
                })}
                <Pressable onPress={() => deleteHabit(habit.id)} hitSlop={8}>
                  <Trash2 size={12} color={colors.mutedForeground} strokeWidth={1.5} />
                </Pressable>
              </View>
            );
          })
        )}
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
  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 10,
    fontSize: 13,
    textTransform: 'lowercase',
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 0,
  },
  dayLabel: {
    width: 28,
    fontSize: 11,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 0,
  },
  habitName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 60,
  },
  habitText: {
    fontSize: 13,
    textTransform: 'lowercase',
    flexShrink: 1,
  },
  streakText: {
    fontSize: 10,
  },
  dot: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 0,
    marginHorizontal: 4,
  },
  empty: {
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'lowercase',
    paddingVertical: 16,
  },
});
