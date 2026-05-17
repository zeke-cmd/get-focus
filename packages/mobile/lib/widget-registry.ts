import type { WidgetConfig } from './types';

export const WIDGETS: WidgetConfig[] = [
  {
    id: 'focus-intention',
    name: 'focus intention',
    description: 'set your daily focus and track completion',
    icon: 'Target',
    defaultEnabled: true,
    component: 'FocusIntention',
  },
  {
    id: 'pomodoro',
    name: 'pomodoro timer',
    description: 'focused work sessions with break intervals',
    icon: 'Timer',
    defaultEnabled: true,
    component: 'PomodoroTimer',
  },
  {
    id: 'tasks',
    name: 'task management',
    description: 'organize and track your daily tasks',
    icon: 'CheckSquare',
    defaultEnabled: true,
    component: 'TaskManagement',
  },
  {
    id: 'quick-bookmark',
    name: 'quick bookmark',
    description: 'save links and resources instantly',
    icon: 'Bookmark',
    defaultEnabled: true,
    component: 'QuickBookmark',
  },
  {
    id: 'journal',
    name: 'daily journal',
    description: 'reflect on your day with quick entries',
    icon: 'BookOpen',
    defaultEnabled: true,
    component: 'DailyJournal',
  },
  {
    id: 'calendar',
    name: 'calendar & agenda',
    description: 'view your schedule from device calendar',
    icon: 'Calendar',
    defaultEnabled: true,
    component: 'CalendarAgenda',
  },
  {
    id: 'habits',
    name: 'habit tracker',
    description: 'build consistency with daily habit tracking',
    icon: 'Flame',
    defaultEnabled: true,
    component: 'HabitTracker',
  },
];

export function getDefaultWidgetPreferences() {
  return WIDGETS.map((w, i) => ({
    id: w.id,
    enabled: w.defaultEnabled,
    sortOrder: i,
  }));
}
