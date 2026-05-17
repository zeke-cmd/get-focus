import { sqliteTable, text, integer, real, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const userProfile = sqliteTable('user_profile', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  dob: text('dob').notNull(),
  gender: text('gender').notNull(),
  email: text('email'),
  analyticsConsent: integer('analytics_consent', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

export const widgetPreferences = sqliteTable('widget_preferences', {
  id: text('id').primaryKey(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  time: text('time'),
  dueDate: text('due_date'),
  priority: text('priority').notNull().default('medium'),
  tags: text('tags').notNull().default('[]'),
  notes: text('notes'),
  isPending: integer('is_pending', { mode: 'boolean' }).notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at').notNull(),
  completedAt: text('completed_at'),
});

export const notes = sqliteTable('notes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
});

export const bookmarks = sqliteTable('bookmarks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  description: text('description'),
  tags: text('tags').notNull().default('[]'),
  category: text('category').notNull().default('other'),
  isRead: integer('is_read', { mode: 'boolean' }).notNull().default(false),
  isFavorite: integer('is_favorite', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
  readAt: text('read_at'),
});

export const focusIntentions = sqliteTable('focus_intentions', {
  id: text('id').primaryKey(),
  intention: text('intention').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

export const journalEntries = sqliteTable('journal_entries', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
});

export const habits = sqliteTable('habits', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull(),
});

export const habitEntries = sqliteTable('habit_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  habitId: text('habit_id').notNull().references(() => habits.id),
  date: text('date').notNull(),
}, (table) => [
  uniqueIndex('habit_date_unique').on(table.habitId, table.date),
]);

export const pomodoroSessions = sqliteTable('pomodoro_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  durationMinutes: integer('duration_minutes').notNull(),
  taskTitle: text('task_title'),
  completedAt: text('completed_at').notNull(),
});

export const pomodoroSettings = sqliteTable('pomodoro_settings', {
  id: integer('id').primaryKey().default(1),
  workMinutes: integer('work_minutes').notNull().default(25),
  breakMinutes: integer('break_minutes').notNull().default(5),
  longBreakMinutes: integer('long_break_minutes').notNull().default(15),
  cyclesUntilLongBreak: integer('cycles_until_long_break').notNull().default(4),
  dailyGoalHours: real('daily_goal_hours').notNull().default(4),
  notificationsEnabled: integer('notifications_enabled', { mode: 'boolean' }).notNull().default(true),
});

export const gymExercises = sqliteTable('gym_exercises', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  createdAt: text('created_at').notNull(),
});

export const gymWorkouts = sqliteTable('gym_workouts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  date: text('date').notNull(),
  durationMinutes: integer('duration_minutes'),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
});

export const gymSets = sqliteTable('gym_sets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  workoutId: text('workout_id').notNull().references(() => gymWorkouts.id),
  exerciseId: text('exercise_id').notNull().references(() => gymExercises.id),
  setNumber: integer('set_number').notNull(),
  reps: integer('reps'),
  weight: real('weight'),
  durationSeconds: integer('duration_seconds'),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const weeklyStreaks = sqliteTable('weekly_streaks', {
  id: text('id').primaryKey(),
  completedDays: text('completed_days').notNull().default('[]'),
});

export const appSettings = sqliteTable('app_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});
