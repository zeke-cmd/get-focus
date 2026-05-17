import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { widgetPreferences } from '../../db/schema';
import { GreetingSection } from '../../components/GreetingSection';
import { QuoteWidget } from '../../components/widgets/QuoteWidget';
import { FocusIntention } from '../../components/widgets/FocusIntention';
import { PomodoroTimer } from '../../components/widgets/PomodoroTimer';
import { TaskManagement } from '../../components/widgets/TaskManagement';
import { QuickBookmark } from '../../components/widgets/QuickBookmark';
import { DailyJournal } from '../../components/widgets/DailyJournal';
import { HabitTracker } from '../../components/widgets/HabitTracker';
import { CalendarAgenda } from '../../components/widgets/CalendarAgenda';

const WIDGET_COMPONENTS: Record<string, React.ComponentType> = {
  'focus-intention': FocusIntention,
  'pomodoro': PomodoroTimer,
  'tasks': TaskManagement,
  'quick-bookmark': QuickBookmark,
  'journal': DailyJournal,
  'calendar': CalendarAgenda,
  'habits': HabitTracker,
};

interface WidgetPref {
  id: string;
  enabled: boolean;
  sortOrder: number;
}

export default function DashboardScreen() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [prefs, setPrefs] = useState<WidgetPref[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const loadPrefs = async () => {
    const rows = await db.select().from(widgetPreferences);
    if (rows.length > 0) {
      setPrefs(
        rows
          .filter((r) => r.enabled)
          .sort((a, b) => a.sortOrder - b.sortOrder)
      );
    } else {
      // default: show all
      setPrefs(
        Object.keys(WIDGET_COMPONENTS).map((id, i) => ({
          id,
          enabled: true,
          sortOrder: i,
        }))
      );
    }
  };

  useEffect(() => {
    loadPrefs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPrefs();
    setKey((k) => k + 1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.foreground}
          />
        }
      >
        <GreetingSection key={`greeting-${key}`} />
        <QuoteWidget key={`quote-${key}`} />

        {prefs.map((pref) => {
          const Component = WIDGET_COMPONENTS[pref.id];
          if (!Component) return null;
          return <Component key={`${pref.id}-${key}`} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
});
