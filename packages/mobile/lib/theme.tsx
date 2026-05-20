import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  foreground: '#171717',
  card: '#FFFFFF',
  cardForeground: '#171717',
  primary: '#404040',
  primaryForeground: '#FAFAFA',
  secondary: '#F5F5F5',
  secondaryForeground: '#171717',
  muted: '#F5F5F5',
  mutedForeground: '#737373',
  accent: '#F5F5F5',
  accentForeground: '#171717',
  destructive: '#171717',
  border: '#E3E3E3',
  input: '#E3E3E3',
  ring: '#171717',
  chart1: '#000000',
  chart2: '#333333',
  chart3: '#666666',
  chart4: '#999999',
  chart5: '#CCCCCC',
};

const darkColors: ThemeColors = {
  background: '#000000',
  foreground: '#FAFAFA',
  card: '#000000',
  cardForeground: '#FAFAFA',
  primary: '#525252',
  primaryForeground: '#FAFAFA',
  secondary: '#000000',
  secondaryForeground: '#FAFAFA',
  muted: '#1A1A1A',
  mutedForeground: '#A6A6A6',
  accent: '#1A1A1A',
  accentForeground: '#FAFAFA',
  destructive: '#FAFAFA',
  border: '#333333',
  input: '#333333',
  ring: '#FAFAFA',
  chart1: '#FFFFFF',
  chart2: '#CCCCCC',
  chart3: '#999999',
  chart4: '#666666',
  chart5: '#333333',
};

export const fonts = {
  logo: 'Unbounded',
  heading: 'JosefinSans',
  body: 'Montserrat',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = '@focus/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setModeState(stored);
      }
      setLoaded(true);
    });
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(THEME_KEY, newMode);
  }, []);

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ mode, isDark, colors, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
