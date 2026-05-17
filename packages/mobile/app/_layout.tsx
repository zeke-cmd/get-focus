import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, AppState } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme, fonts } from '../lib/theme';
import { DatabaseProvider } from '../db/client';
import { isOnboardingComplete } from '../lib/storage';
import { isPinEnabled, verifyPin, isBiometricEnabled, authenticateWithBiometric } from '../lib/pin';
import { useRouter, useSegments } from 'expo-router';
import { ErrorBoundary } from '../components/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

function PinGate({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  const [locked, setLocked] = useState<boolean | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function check() {
      const enabled = await isPinEnabled();
      if (!enabled) {
        setLocked(false);
        return;
      }
      setLocked(true);

      // Try biometric first
      const bioEnabled = await isBiometricEnabled();
      if (bioEnabled) {
        const success = await authenticateWithBiometric();
        if (success) {
          setLocked(false);
        }
      }
    }
    check();
  }, []);

  // Re-lock on background
  useEffect(() => {
    const sub = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        const enabled = await isPinEnabled();
        if (enabled) {
          setLocked(true);
          setPin('');
          setError('');
          const bioEnabled = await isBiometricEnabled();
          if (bioEnabled) {
            const success = await authenticateWithBiometric();
            if (success) setLocked(false);
          }
        }
      }
    });
    return () => sub.remove();
  }, []);

  const handleUnlock = useCallback(async (value: string) => {
    const clean = value.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(clean);
    setError('');

    if (clean.length === 4) {
      const valid = await verifyPin(clean);
      if (valid) {
        setLocked(false);
        setPin('');
      } else {
        setError('wrong pin');
        setPin('');
      }
    }
  }, []);

  if (locked === null) return null;
  if (!locked) return <>{children}</>;

  return (
    <View style={[pinStyles.container, { backgroundColor: colors.background }]}>
      <Text style={[pinStyles.logo, { color: colors.foreground, fontFamily: 'Unbounded' }]}>
        focus
      </Text>
      <Text style={[pinStyles.label, { color: colors.mutedForeground, fontFamily: 'JosefinSans' }]}>
        enter pin to unlock
      </Text>
      <View style={pinStyles.dotsRow}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              pinStyles.dot,
              {
                backgroundColor: i < pin.length ? colors.foreground : 'transparent',
                borderColor: colors.border,
              },
            ]}
          />
        ))}
      </View>
      <TextInput
        style={pinStyles.hiddenInput}
        keyboardType="number-pad"
        maxLength={4}
        value={pin}
        onChangeText={handleUnlock}
        autoFocus
      />
      {error ? (
        <Text style={[pinStyles.error, { color: colors.foreground, fontFamily: 'JosefinSans' }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const pinStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  logo: { fontSize: 28, fontWeight: '300' },
  label: { fontSize: 14, textTransform: 'lowercase' },
  dotsRow: { flexDirection: 'row', gap: 16 },
  dot: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 0,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  error: { fontSize: 13, textTransform: 'lowercase' },
});

function NavigationGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    isOnboardingComplete().then((v) => setOnboarded(v === true));
  }, []);

  useEffect(() => {
    if (onboarded === null) return;

    const inOnboarding = segments[0] === '(onboarding)';

    if (!onboarded && !inOnboarding) {
      router.replace('/(onboarding)/welcome');
    } else if (onboarded && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [onboarded, segments]);

  return <>{children}</>;
}

function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Unbounded: require('../assets/fonts/Unbounded.ttf'),
    JosefinSans: require('../assets/fonts/JosefinSans.ttf'),
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ErrorBoundary level="global">
      <SafeAreaProvider>
        <ThemeProvider>
          <DatabaseProvider>
            <PinGate>
              <NavigationGuard>
                <ThemedStatusBar />
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(onboarding)" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen
                    name="(modals)"
                    options={{ presentation: 'modal' }}
                  />
                </Stack>
              </NavigationGuard>
            </PinGate>
          </DatabaseProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
