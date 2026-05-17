import { cacheDirectory, writeAsStringAsync, readAsStringAsync } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import {
  userProfile,
  tasks,
  bookmarks,
  focusIntentions,
  journalEntries,
  habits,
  habitEntries,
  pomodoroSessions,
  pomodoroSettings,
  gymExercises,
  gymWorkouts,
  gymSets,
  widgetPreferences,
  appSettings,
  weeklyStreaks,
} from '../db/schema';

interface ExportData {
  version: 1;
  exportedAt: string;
  tables: {
    userProfile: any[];
    tasks: any[];
    bookmarks: any[];
    focusIntentions: any[];
    journalEntries: any[];
    habits: any[];
    habitEntries: any[];
    pomodoroSessions: any[];
    pomodoroSettings: any[];
    gymExercises: any[];
    gymWorkouts: any[];
    gymSets: any[];
    widgetPreferences: any[];
    appSettings: any[];
    weeklyStreaks: any[];
  };
}

export async function exportAllData(db: any): Promise<void> {
  const data: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    tables: {
      userProfile: await db.select().from(userProfile),
      tasks: await db.select().from(tasks),
      bookmarks: await db.select().from(bookmarks),
      focusIntentions: await db.select().from(focusIntentions),
      journalEntries: await db.select().from(journalEntries),
      habits: await db.select().from(habits),
      habitEntries: await db.select().from(habitEntries),
      pomodoroSessions: await db.select().from(pomodoroSessions),
      pomodoroSettings: await db.select().from(pomodoroSettings),
      gymExercises: await db.select().from(gymExercises),
      gymWorkouts: await db.select().from(gymWorkouts),
      gymSets: await db.select().from(gymSets),
      widgetPreferences: await db.select().from(widgetPreferences),
      appSettings: await db.select().from(appSettings),
      weeklyStreaks: await db.select().from(weeklyStreaks),
    },
  };

  const json = JSON.stringify(data, null, 2);
  const path = `${cacheDirectory}focus-backup-${Date.now()}.json`;
  await writeAsStringAsync(path, json);

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(path, {
      mimeType: 'application/json',
      dialogTitle: 'export focus data',
      UTI: 'public.json',
    });
  }
}

export async function importData(db: any): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true,
    });

    if (result.canceled) return { success: false, error: 'cancelled' };

    const file = result.assets[0];
    const content = await readAsStringAsync(file.uri);
    const data: ExportData = JSON.parse(content);

    if (data.version !== 1) {
      return { success: false, error: 'unsupported backup version' };
    }

    // Import in order (respecting foreign keys)
    const tableMap: [any, any[]][] = [
      [userProfile, data.tables.userProfile],
      [appSettings, data.tables.appSettings],
      [widgetPreferences, data.tables.widgetPreferences],
      [weeklyStreaks, data.tables.weeklyStreaks],
      [tasks, data.tables.tasks],
      [bookmarks, data.tables.bookmarks],
      [focusIntentions, data.tables.focusIntentions],
      [journalEntries, data.tables.journalEntries],
      [habits, data.tables.habits],
      [habitEntries, data.tables.habitEntries],
      [pomodoroSettings, data.tables.pomodoroSettings],
      [pomodoroSessions, data.tables.pomodoroSessions],
      [gymExercises, data.tables.gymExercises],
      [gymWorkouts, data.tables.gymWorkouts],
      [gymSets, data.tables.gymSets],
    ];

    // Clear existing data in reverse order
    for (const [table] of [...tableMap].reverse()) {
      await db.delete(table);
    }

    // Insert new data
    for (const [table, rows] of tableMap) {
      if (rows && rows.length > 0) {
        for (const row of rows) {
          await db.insert(table).values(row);
        }
      }
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || 'import failed' };
  }
}
