import * as schema from '../db/schema';

describe('database schema', () => {
  it('should export all expected tables', () => {
    expect(schema.userProfile).toBeDefined();
    expect(schema.widgetPreferences).toBeDefined();
    expect(schema.tasks).toBeDefined();
    expect(schema.notes).toBeDefined();
    expect(schema.bookmarks).toBeDefined();
    expect(schema.focusIntentions).toBeDefined();
    expect(schema.journalEntries).toBeDefined();
    expect(schema.habits).toBeDefined();
    expect(schema.habitEntries).toBeDefined();
    expect(schema.pomodoroSessions).toBeDefined();
    expect(schema.pomodoroSettings).toBeDefined();
    expect(schema.gymExercises).toBeDefined();
    expect(schema.gymWorkouts).toBeDefined();
    expect(schema.gymSets).toBeDefined();
    expect(schema.weeklyStreaks).toBeDefined();
    expect(schema.appSettings).toBeDefined();
  });

  it('tasks table should have notes column', () => {
    // Verify the notes field exists in the tasks schema
    const taskColumns = Object.keys(schema.tasks);
    expect(taskColumns).toContain('notes');
  });

  it('tasks table should have all required columns', () => {
    const taskCols = Object.keys(schema.tasks);
    const required = ['id', 'title', 'completed', 'priority', 'notes', 'dueDate', 'tags', 'isPending', 'sortOrder', 'createdAt'];
    for (const col of required) {
      expect(taskCols).toContain(col);
    }
  });

  it('bookmarks table should have all required columns', () => {
    const cols = Object.keys(schema.bookmarks);
    const required = ['id', 'title', 'url', 'description', 'category', 'tags', 'isRead', 'isFavorite', 'createdAt'];
    for (const col of required) {
      expect(cols).toContain(col);
    }
  });

  it('gym tables should be properly defined', () => {
    const exerciseCols = Object.keys(schema.gymExercises);
    expect(exerciseCols).toContain('id');
    expect(exerciseCols).toContain('name');
    expect(exerciseCols).toContain('category');

    const workoutCols = Object.keys(schema.gymWorkouts);
    expect(workoutCols).toContain('id');
    expect(workoutCols).toContain('name');
    expect(workoutCols).toContain('date');
    expect(workoutCols).toContain('notes');

    const setCols = Object.keys(schema.gymSets);
    expect(setCols).toContain('workoutId');
    expect(setCols).toContain('exerciseId');
    expect(setCols).toContain('reps');
    expect(setCols).toContain('weight');
  });

  it('pomodoro settings should have all config columns', () => {
    const cols = Object.keys(schema.pomodoroSettings);
    expect(cols).toContain('workMinutes');
    expect(cols).toContain('breakMinutes');
    expect(cols).toContain('longBreakMinutes');
    expect(cols).toContain('cyclesUntilLongBreak');
    expect(cols).toContain('dailyGoalHours');
  });
});
