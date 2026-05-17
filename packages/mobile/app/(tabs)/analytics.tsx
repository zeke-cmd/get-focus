import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { pomodoroSessions, tasks, focusIntentions, habits, habitEntries } from '../../db/schema';
import { eq, gte, count, sum } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { BarChart3, Clock, CheckSquare, Target, Flame, TrendingUp } from 'lucide-react-native';

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(now);
  mon.setDate(diff);
  return mon.toISOString().split('T')[0];
}

export default function AnalyticsScreen() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [stats, setStats] = useState({
    totalPomodoros: 0,
    totalMinutes: 0,
    weekPomodoros: 0,
    weekMinutes: 0,
    totalTasks: 0,
    completedTasks: 0,
    totalIntentions: 0,
    completedIntentions: 0,
    totalHabits: 0,
    weekHabitChecks: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const weekStart = getWeekStart();

      // Pomodoro stats
      const allPomo = await db.select().from(pomodoroSessions);
      const weekPomo = allPomo.filter((p) => p.completedAt >= weekStart);

      // Task stats
      const allTasks = await db.select().from(tasks);
      const done = allTasks.filter((t) => t.completed);

      // Intention stats
      const allIntentions = await db.select().from(focusIntentions);
      const doneIntentions = allIntentions.filter((f) => f.completed);

      // Habit stats
      const allHabits = await db.select().from(habits);
      const weekEntries = await db
        .select()
        .from(habitEntries)
        .where(gte(habitEntries.date, weekStart));

      setStats({
        totalPomodoros: allPomo.length,
        totalMinutes: allPomo.reduce((s, p) => s + p.durationMinutes, 0),
        weekPomodoros: weekPomo.length,
        weekMinutes: weekPomo.reduce((s, p) => s + p.durationMinutes, 0),
        totalTasks: allTasks.length,
        completedTasks: done.length,
        totalIntentions: allIntentions.length,
        completedIntentions: doneIntentions.length,
        totalHabits: allHabits.length,
        weekHabitChecks: weekEntries.length,
      });
    }
    loadStats();
  }, []);

  const focusHours = Math.floor(stats.totalMinutes / 60);
  const weekHours = (stats.weekMinutes / 60).toFixed(1);
  const taskRate = stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;
  const intentionRate = stats.totalIntentions > 0
    ? Math.round((stats.completedIntentions / stats.totalIntentions) * 100)
    : 0;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          analytics
        </Text>

        {/* Focus score */}
        <Card>
          <CardHeader>
            <View style={styles.row}>
              <TrendingUp size={16} color={colors.foreground} strokeWidth={1.5} />
              <CardTitle>focus score</CardTitle>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                {Math.min(100, Math.round((stats.weekPomodoros * 10 + stats.completedTasks * 5) / Math.max(1, 7) * 10))}
              </Text>
              <Text style={[styles.scoreUnit, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                / 100
              </Text>
            </View>
            <Text style={[styles.scoreDesc, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              based on pomodoro sessions and completed tasks this week
            </Text>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <View style={styles.grid}>
          <View style={[styles.statBox, { borderColor: colors.border }]}>
            <Clock size={16} color={colors.foreground} strokeWidth={1.5} />
            <Text style={[styles.statValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
              {weekHours}h
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              focus this week
            </Text>
          </View>
          <View style={[styles.statBox, { borderColor: colors.border }]}>
            <BarChart3 size={16} color={colors.foreground} strokeWidth={1.5} />
            <Text style={[styles.statValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
              {stats.weekPomodoros}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              sessions
            </Text>
          </View>
          <View style={[styles.statBox, { borderColor: colors.border }]}>
            <CheckSquare size={16} color={colors.foreground} strokeWidth={1.5} />
            <Text style={[styles.statValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
              {taskRate}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              tasks done
            </Text>
          </View>
          <View style={[styles.statBox, { borderColor: colors.border }]}>
            <Target size={16} color={colors.foreground} strokeWidth={1.5} />
            <Text style={[styles.statValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
              {intentionRate}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              intentions met
            </Text>
          </View>
        </View>

        {/* Totals */}
        <Card>
          <CardHeader>
            <CardTitle>all time</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.totalRows}>
              <View style={[styles.totalRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.totalLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  total focus hours
                </Text>
                <Text style={[styles.totalValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {focusHours}h
                </Text>
              </View>
              <View style={[styles.totalRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.totalLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  pomodoro sessions
                </Text>
                <Text style={[styles.totalValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {stats.totalPomodoros}
                </Text>
              </View>
              <View style={[styles.totalRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.totalLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  tasks completed
                </Text>
                <Text style={[styles.totalValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {stats.completedTasks}
                </Text>
              </View>
              <View style={[styles.totalRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.totalLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  habits tracked
                </Text>
                <Text style={[styles.totalValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {stats.totalHabits}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  habit checks this week
                </Text>
                <Text style={[styles.totalValue, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {stats.weekHabitChecks}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, gap: 16, paddingBottom: 32 },
  title: { fontSize: 28, fontWeight: '300', textTransform: 'lowercase' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  scoreContainer: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  scoreValue: { fontSize: 48, fontWeight: '300' },
  scoreUnit: { fontSize: 18 },
  scoreDesc: { fontSize: 12, textTransform: 'lowercase', marginTop: 8 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  statBox: {
    width: '50%',
    borderWidth: 1,
    borderRadius: 0,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    // collapse borders
    marginRight: -1,
    marginBottom: -1,
  },
  statValue: { fontSize: 24, fontWeight: '300' },
  statLabel: { fontSize: 11, textTransform: 'lowercase', textAlign: 'center' },
  totalRows: { gap: 0 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  totalLabel: { fontSize: 13, textTransform: 'lowercase' },
  totalValue: { fontSize: 18, fontWeight: '300' },
});
