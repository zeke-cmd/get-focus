import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  THEME: '@focus/theme',
  ONBOARDING_COMPLETE: '@focus/onboarding_complete',
  PIN_ENABLED: '@focus/pin_enabled',
  PIN_HASH: '@focus/pin_hash',
  BIOMETRIC_ENABLED: '@focus/biometric_enabled',
} as const;

export type StorageKey = (typeof KEYS)[keyof typeof KEYS];

// generic helpers
export async function getItem<T = string>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as unknown as T;
  }
}

export async function setItem(key: string, value: unknown): Promise<void> {
  const raw = typeof value === 'string' ? value : JSON.stringify(value);
  await AsyncStorage.setItem(key, raw);
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

// specific helpers
export const isOnboardingComplete = () => getItem<boolean>(KEYS.ONBOARDING_COMPLETE);
export const setOnboardingComplete = (v: boolean) => setItem(KEYS.ONBOARDING_COMPLETE, v);

export const isPinEnabled = () => getItem<boolean>(KEYS.PIN_ENABLED);
export const setPinEnabled = (v: boolean) => setItem(KEYS.PIN_ENABLED, v);

export const getPinHash = () => getItem<string>(KEYS.PIN_HASH);
export const setPinHash = (hash: string) => setItem(KEYS.PIN_HASH, hash);

export const isBiometricEnabled = () => getItem<boolean>(KEYS.BIOMETRIC_ENABLED);
export const setBiometricEnabled = (v: boolean) => setItem(KEYS.BIOMETRIC_ENABLED, v);

export { KEYS };
