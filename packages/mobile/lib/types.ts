export type Priority = 'high' | 'medium' | 'low';
export type BookmarkCategory = 'article' | 'video' | 'documentation' | 'tool' | 'other';
export type GymCategory = 'push' | 'pull' | 'legs' | 'cardio' | 'core' | 'other';
export type Gender = 'male' | 'female' | 'non-binary' | 'prefer not to say';
export type QuoteSource = 'gita' | 'stoic' | 'none';

export interface UserProfile {
  id: number;
  name: string;
  dob: string;
  gender: Gender;
  email: string | null;
  analyticsConsent: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  time: string | null;
  dueDate: string | null;
  priority: Priority;
  tags: string[];
  isPending: boolean;
  sortOrder: number;
  createdAt: string;
  completedAt: string | null;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string | null;
  tags: string[];
  category: BookmarkCategory;
  isRead: boolean;
  isFavorite: boolean;
  createdAt: string;
  readAt: string | null;
}

export interface FocusIntention {
  id: string;
  intention: string;
  completed: boolean;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
}

export interface HabitEntry {
  id: number;
  habitId: string;
  date: string;
}

export interface PomodoroSession {
  id: number;
  durationMinutes: number;
  taskTitle: string | null;
  completedAt: string;
}

export interface GymExercise {
  id: string;
  name: string;
  category: GymCategory;
  createdAt: string;
}

export interface GymWorkout {
  id: string;
  name: string;
  date: string;
  durationMinutes: number | null;
  notes: string | null;
  createdAt: string;
}

export interface GymSet {
  id: number;
  workoutId: string;
  exerciseId: string;
  setNumber: number;
  reps: number | null;
  weight: number | null;
  durationSeconds: number | null;
  sortOrder: number;
}

export interface WidgetConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultEnabled: boolean;
  component: string;
}
