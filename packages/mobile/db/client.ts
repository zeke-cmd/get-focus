import React, { createContext, useContext, useEffect, useState } from 'react';
import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const expoDb = openDatabaseSync('focus.db');
export const db = drizzle(expoDb, { schema });
export type Database = typeof db;

const DatabaseContext = createContext<Database | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      // create all tables
      expoDb.execSync(`
        CREATE TABLE IF NOT EXISTS user_profile (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          dob TEXT NOT NULL,
          gender TEXT NOT NULL,
          email TEXT,
          analytics_consent INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS widget_preferences (
          id TEXT PRIMARY KEY,
          enabled INTEGER NOT NULL DEFAULT 1,
          sort_order INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          completed INTEGER NOT NULL DEFAULT 0,
          time TEXT,
          due_date TEXT,
          priority TEXT NOT NULL DEFAULT 'medium',
          tags TEXT NOT NULL DEFAULT '[]',
          notes TEXT,
          is_pending INTEGER NOT NULL DEFAULT 1,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL,
          completed_at TEXT
        );

        CREATE TABLE IF NOT EXISTS notes (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS bookmarks (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          description TEXT,
          tags TEXT NOT NULL DEFAULT '[]',
          category TEXT NOT NULL DEFAULT 'other',
          is_read INTEGER NOT NULL DEFAULT 0,
          is_favorite INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL,
          read_at TEXT
        );

        CREATE TABLE IF NOT EXISTS focus_intentions (
          id TEXT PRIMARY KEY,
          intention TEXT NOT NULL,
          completed INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS journal_entries (
          id TEXT PRIMARY KEY,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS habits (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS habit_entries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          habit_id TEXT NOT NULL REFERENCES habits(id),
          date TEXT NOT NULL,
          UNIQUE(habit_id, date)
        );

        CREATE TABLE IF NOT EXISTS pomodoro_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          duration_minutes INTEGER NOT NULL,
          task_title TEXT,
          completed_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS pomodoro_settings (
          id INTEGER PRIMARY KEY DEFAULT 1,
          work_minutes INTEGER NOT NULL DEFAULT 25,
          break_minutes INTEGER NOT NULL DEFAULT 5,
          long_break_minutes INTEGER NOT NULL DEFAULT 15,
          cycles_until_long_break INTEGER NOT NULL DEFAULT 4,
          daily_goal_hours REAL NOT NULL DEFAULT 4,
          notifications_enabled INTEGER NOT NULL DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS gym_exercises (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS gym_workouts (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          date TEXT NOT NULL,
          duration_minutes INTEGER,
          notes TEXT,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS gym_sets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id TEXT NOT NULL REFERENCES gym_workouts(id),
          exercise_id TEXT NOT NULL REFERENCES gym_exercises(id),
          set_number INTEGER NOT NULL,
          reps INTEGER,
          weight REAL,
          duration_seconds INTEGER,
          sort_order INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS weekly_streaks (
          id TEXT PRIMARY KEY,
          completed_days TEXT NOT NULL DEFAULT '[]'
        );

        CREATE TABLE IF NOT EXISTS app_settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );

        INSERT OR IGNORE INTO pomodoro_settings (id) VALUES (1);
      `);

      // Migrations for existing databases
      try {
        expoDb.execSync(`ALTER TABLE tasks ADD COLUMN notes TEXT;`);
      } catch {
        // Column already exists — ignore
      }

      setReady(true);
    }
    init();
  }, []);

  if (!ready) return null;

  return React.createElement(DatabaseContext.Provider, { value: db }, children);
}

export function useDatabase(): Database {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error('useDatabase must be used within DatabaseProvider');
  return ctx;
}

export function resetAllData(): void {
  expoDb.execSync(`
    DELETE FROM user_profile;
    DELETE FROM widget_preferences;
    DELETE FROM tasks;
    DELETE FROM notes;
    DELETE FROM bookmarks;
    DELETE FROM focus_intentions;
    DELETE FROM journal_entries;
    DELETE FROM habits;
    DELETE FROM habit_entries;
    DELETE FROM pomodoro_sessions;
    DELETE FROM pomodoro_settings;
    DELETE FROM gym_exercises;
    DELETE FROM gym_workouts;
    DELETE FROM gym_sets;
    DELETE FROM weekly_streaks;
    DELETE FROM app_settings;
    INSERT OR IGNORE INTO pomodoro_settings (id) VALUES (1);
  `);
}
