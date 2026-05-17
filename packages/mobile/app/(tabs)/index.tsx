import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, RefreshControl, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, fonts } from '../../lib/theme';
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
import { SkeletonWidget } from '../../components/ui/Skeleton';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Settings2, ChevronUp, ChevronDown, Eye, EyeOff, Check } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

const WIDGET_COMPONENTS: Record<string, { component: React.ComponentType; label: string }> = {
  'focus-intention': { component: FocusIntention, label: 'focus intention' },
  'pomodoro': { component: PomodoroTimer, label: 'pomodoro timer' },
  'tasks': { component: TaskManagement, label: 'tasks' },
  'quick-bookmark': { component: QuickBookmark, label: 'quick bookmark' },
  'journal': { component: DailyJournal, label: 'journal' },
  'calendar': { component: CalendarAgenda, label: 'calendar' },
  'habits': { component: HabitTracker, label: 'habits' },
};

const ALL_WIDGET_IDS = Object.keys(WIDGET_COMPONENTS);

interface WidgetPref {
  id: string;
  enabled: boolean;
  sortOrder: number;
}

export default function DashboardScreen() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [prefs, setPrefs] = useState<WidgetPref[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);
  const [editing, setEditing] = useState(false);

  const loadPrefs = async () => {
    const rows = await db.select().from(widgetPreferences);
    if (rows.length > 0) {
      setPrefs(rows.sort((a, b) => a.sortOrder - b.sortOrder));
    } else {
      setPrefs(
        ALL_WIDGET_IDS.map((id, i) => ({
          id,
          enabled: true,
          sortOrder: i,
        }))
      );
    }
    setLoading(false);
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

  const savePrefs = async (updated: WidgetPref[]) => {
    setPrefs(updated);
    // Persist to DB
    for (const pref of updated) {
      await db
        .insert(widgetPreferences)
        .values({ id: pref.id, enabled: pref.enabled, sortOrder: pref.sortOrder })
        .onConflictDoUpdate({
          target: widgetPreferences.id,
          set: { enabled: pref.enabled, sortOrder: pref.sortOrder },
        });
    }
  };

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const newPrefs = [...prefs];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newPrefs.length) return;
    haptic.light();
    // Swap
    [newPrefs[index], newPrefs[swapIndex]] = [newPrefs[swapIndex], newPrefs[index]];
    // Update sort orders
    const reordered = newPrefs.map((p, i) => ({ ...p, sortOrder: i }));
    savePrefs(reordered);
  };

  const toggleWidget = (index: number) => {
    haptic.light();
    const updated = prefs.map((p, i) =>
      i === index ? { ...p, enabled: !p.enabled } : p
    );
    savePrefs(updated);
  };

  const enabledPrefs = prefs.filter((p) => p.enabled);

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
        <View style={styles.topRow}>
          <GreetingSection key={`greeting-${key}`} />
          <Pressable
            onPress={() => {
              haptic.selection();
              setEditing(!editing);
            }}
            style={[styles.editBtn, { borderColor: editing ? colors.foreground : colors.border }]}
            accessibilityLabel={editing ? 'done editing widgets' : 'customize widgets'}
            accessibilityRole="button"
          >
            {editing ? (
              <Check size={16} color={colors.foreground} strokeWidth={2} />
            ) : (
              <Settings2 size={16} color={colors.mutedForeground} strokeWidth={1.5} />
            )}
          </Pressable>
        </View>

        {!editing && <QuoteWidget key={`quote-${key}`} />}

        {editing ? (
          <View style={styles.editList}>
            <Text style={[styles.editTitle, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              drag to reorder, tap eye to toggle
            </Text>
            {prefs.map((pref, index) => {
              const widget = WIDGET_COMPONENTS[pref.id];
              if (!widget) return null;
              return (
                <View
                  key={pref.id}
                  style={[
                    styles.editRow,
                    {
                      borderColor: colors.border,
                      opacity: pref.enabled ? 1 : 0.4,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.editLabel,
                      { color: colors.foreground, fontFamily: fonts.body },
                    ]}
                    numberOfLines={1}
                  >
                    {widget.label}
                  </Text>
                  <View style={styles.editActions}>
                    <Pressable
                      onPress={() => toggleWidget(index)}
                      hitSlop={8}
                      accessibilityLabel={`${pref.enabled ? 'hide' : 'show'} ${widget.label}`}
                    >
                      {pref.enabled ? (
                        <Eye size={16} color={colors.foreground} strokeWidth={1.5} />
                      ) : (
                        <EyeOff size={16} color={colors.mutedForeground} strokeWidth={1.5} />
                      )}
                    </Pressable>
                    <Pressable
                      onPress={() => moveWidget(index, 'up')}
                      hitSlop={8}
                      disabled={index === 0}
                      accessibilityLabel={`move ${widget.label} up`}
                    >
                      <ChevronUp
                        size={18}
                        color={index === 0 ? colors.mutedForeground : colors.foreground}
                        strokeWidth={1.5}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => moveWidget(index, 'down')}
                      hitSlop={8}
                      disabled={index === prefs.length - 1}
                      accessibilityLabel={`move ${widget.label} down`}
                    >
                      <ChevronDown
                        size={18}
                        color={index === prefs.length - 1 ? colors.mutedForeground : colors.foreground}
                        strokeWidth={1.5}
                      />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        ) : loading ? (
          <View style={{ gap: 16 }}>
            <SkeletonWidget />
            <SkeletonWidget />
            <SkeletonWidget />
          </View>
        ) : (
          enabledPrefs.map((pref) => {
            const widget = WIDGET_COMPONENTS[pref.id];
            if (!widget) return null;
            return (
              <ErrorBoundary key={`${pref.id}-${key}`} level="widget">
                <widget.component />
              </ErrorBoundary>
            );
          })
        )}
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  editBtn: {
    width: 36,
    height: 36,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  editList: {
    gap: 0,
  },
  editTitle: {
    fontSize: 12,
    textTransform: 'lowercase',
    marginBottom: 12,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginBottom: -1,
    paddingHorizontal: 16,
    height: 52,
  },
  editLabel: {
    fontSize: 14,
    textTransform: 'lowercase',
    flex: 1,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
