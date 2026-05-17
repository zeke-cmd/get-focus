import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../lib/theme';
import { DatabaseProvider } from '../db/client';
import { isOnboardingComplete } from '../lib/storage';
import { useRouter, useSegments } from 'expo-router';

SplashScreen.preventAutoHideAsync();

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
    <SafeAreaProvider>
      <ThemeProvider>
        <DatabaseProvider>
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
        </DatabaseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
