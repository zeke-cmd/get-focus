jest.mock('expo-local-authentication');

// The moduleNameMapper in jest.config.js maps async-storage to our manual mock
// which has a shared in-memory store. We import it here for assertions.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setPin, verifyPin, removePin, isPinEnabled } from '../lib/pin';

describe('pin', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  it('should report pin as disabled by default', async () => {
    const result = await isPinEnabled();
    expect(result).toBe(false);
  });

  it('should set and verify pin', async () => {
    await setPin('1234');

    // pin_enabled should be 'true'
    const enabled = await isPinEnabled();
    expect(enabled).toBe(true);

    // correct pin should verify
    const valid = await verifyPin('1234');
    expect(valid).toBe(true);

    // wrong pin should not verify
    const invalid = await verifyPin('0000');
    expect(invalid).toBe(false);
  });

  it('should remove pin', async () => {
    await setPin('1234');
    expect(await isPinEnabled()).toBe(true);

    await removePin();
    expect(await isPinEnabled()).toBe(false);
  });
});
