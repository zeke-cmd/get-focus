import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';

const PIN_HASH_KEY = 'pin_hash';
const BIOMETRIC_KEY = 'biometric_enabled';
const PIN_ENABLED_KEY = 'pin_enabled';

async function hashPin(pin: string): Promise<string> {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pin + '_focus_salt');
}

export async function setPin(pin: string): Promise<void> {
  const hash = await hashPin(pin);
  await AsyncStorage.setItem(PIN_HASH_KEY, hash);
  await AsyncStorage.setItem(PIN_ENABLED_KEY, 'true');
}

export async function verifyPin(pin: string): Promise<boolean> {
  const stored = await AsyncStorage.getItem(PIN_HASH_KEY);
  if (!stored) return false;
  const hash = await hashPin(pin);
  return hash === stored;
}

export async function removePin(): Promise<void> {
  await AsyncStorage.removeItem(PIN_HASH_KEY);
  await AsyncStorage.setItem(PIN_ENABLED_KEY, 'false');
  await AsyncStorage.setItem(BIOMETRIC_KEY, 'false');
}

export async function isPinEnabled(): Promise<boolean> {
  const v = await AsyncStorage.getItem(PIN_ENABLED_KEY);
  return v === 'true';
}

export async function setBiometricEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(BIOMETRIC_KEY, enabled ? 'true' : 'false');
}

export async function isBiometricEnabled(): Promise<boolean> {
  const v = await AsyncStorage.getItem(BIOMETRIC_KEY);
  return v === 'true';
}

export async function isBiometricAvailable(): Promise<boolean> {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
}

export async function authenticateWithBiometric(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'unlock focus',
    fallbackLabel: 'use pin',
    disableDeviceFallback: true,
  });
  return result.success;
}

export async function authenticateForReset(): Promise<boolean> {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!compatible || !enrolled) return true;
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'authenticate to reset all data',
    fallbackLabel: 'use device pin',
    disableDeviceFallback: false,
  });
  return result.success;
}
