import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import {
  isPinEnabled,
  setPin,
  verifyPin,
  removePin,
  isBiometricAvailable,
  isBiometricEnabled,
  setBiometricEnabled,
} from '../../lib/pin';
import { X, Shield, Fingerprint, Trash2 } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

type Step = 'enter' | 'confirm' | 'remove-verify';

export default function PinSetupModal() {
  const { colors } = useTheme();
  const router = useRouter();

  const [hasPin, setHasPin] = useState(false);
  const [step, setStep] = useState<Step>('enter');
  const [pin, setPinValue] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [biometricAvail, setBiometricAvail] = useState(false);
  const [biometricOn, setBiometricOn] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    async function load() {
      const enabled = await isPinEnabled();
      setHasPin(enabled);
      if (enabled) {
        setStep('remove-verify');
      }
      const avail = await isBiometricAvailable();
      setBiometricAvail(avail);
      const bioOn = await isBiometricEnabled();
      setBiometricOn(bioOn);
    }
    load();
  }, []);

  const handlePinInput = (value: string, setter: (v: string) => void) => {
    const clean = value.replace(/[^0-9]/g, '').slice(0, 4);
    setter(clean);
    setError('');
  };

  const handleSetPin = async () => {
    if (step === 'enter') {
      if (pin.length !== 4) {
        setError('pin must be 4 digits');
        return;
      }
      setStep('confirm');
      setConfirmPin('');
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    if (step === 'confirm') {
      if (confirmPin !== pin) {
        setError('pins do not match');
        haptic.error();
        setConfirmPin('');
        return;
      }
      await setPin(pin);
      haptic.success();
      router.back();
    }
  };

  const handleRemovePin = async () => {
    if (pin.length !== 4) {
      setError('enter your current pin');
      return;
    }
    const valid = await verifyPin(pin);
    if (!valid) {
      setError('incorrect pin');
      haptic.error();
      setPinValue('');
      return;
    }
    await removePin();
    haptic.success();
    Alert.alert('pin removed', 'your app is no longer pin-protected.');
    router.back();
  };

  const handleBiometricToggle = async () => {
    const newVal = !biometricOn;
    await setBiometricEnabled(newVal);
    setBiometricOn(newVal);
    haptic.selection();
  };

  const renderDots = (value: string) => (
    <View style={styles.dotsRow}>
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: i < value.length ? colors.primary : 'transparent',
              borderColor: colors.border,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          pin lock
        </Text>
        <Pressable onPress={() => router.back()}>
          <X size={22} color={colors.foreground} strokeWidth={1.5} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.iconRow}>
          <Shield size={40} color={colors.foreground} strokeWidth={1} />
        </View>

        {hasPin && step === 'remove-verify' ? (
          <>
            <Text style={[styles.subtitle, { color: colors.foreground, fontFamily: fonts.body }]}>
              enter current pin to remove
            </Text>
            {renderDots(pin)}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              maxLength={4}
              value={pin}
              onChangeText={(v) => handlePinInput(v, setPinValue)}
              autoFocus
            />
            {error ? (
              <Text style={[styles.errorText, { color: colors.foreground, fontFamily: fonts.body }]}>
                {error}
              </Text>
            ) : null}
            <Pressable
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={handleRemovePin}
            >
              <Trash2 size={16} color={colors.primaryForeground} strokeWidth={1.5} />
              <Text style={[styles.actionBtnText, { color: colors.primaryForeground, fontFamily: fonts.heading }]}>
                remove pin
              </Text>
            </Pressable>

            {biometricAvail && (
              <Pressable
                style={[styles.biometricRow, { borderColor: colors.border }]}
                onPress={handleBiometricToggle}
              >
                <Fingerprint size={18} color={colors.foreground} strokeWidth={1.5} />
                <Text style={[styles.biometricText, { color: colors.foreground, fontFamily: fonts.body }]}>
                  biometric unlock
                </Text>
                <View
                  style={[
                    styles.toggle,
                    {
                      backgroundColor: biometricOn ? colors.primary : colors.muted,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.toggleDot,
                      {
                        backgroundColor: biometricOn ? colors.background : colors.mutedForeground,
                        alignSelf: biometricOn ? 'flex-end' : 'flex-start',
                      },
                    ]}
                  />
                </View>
              </Pressable>
            )}
          </>
        ) : (
          <>
            <Text style={[styles.subtitle, { color: colors.foreground, fontFamily: fonts.body }]}>
              {step === 'enter' ? 'choose a 4-digit pin' : 'confirm your pin'}
            </Text>
            {renderDots(step === 'enter' ? pin : confirmPin)}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              maxLength={4}
              value={step === 'enter' ? pin : confirmPin}
              onChangeText={(v) =>
                handlePinInput(v, step === 'enter' ? setPinValue : setConfirmPin)
              }
              autoFocus
            />
            {error ? (
              <Text style={[styles.errorText, { color: colors.foreground, fontFamily: fonts.body }]}>
                {error}
              </Text>
            ) : null}
            <Pressable
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={handleSetPin}
            >
              <Text style={[styles.actionBtnText, { color: colors.primaryForeground, fontFamily: fonts.heading }]}>
                {step === 'enter' ? 'next' : 'set pin'}
              </Text>
            </Pressable>
            {step === 'confirm' && (
              <Pressable
                onPress={() => {
                  setStep('enter');
                  setPinValue('');
                  setConfirmPin('');
                  setError('');
                }}
              >
                <Text style={[styles.backText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                  go back
                </Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: { fontSize: 20, fontWeight: '300', textTransform: 'lowercase' },
  content: { padding: 20, alignItems: 'center', gap: 20 },
  iconRow: { marginTop: 20, marginBottom: 10 },
  subtitle: { fontSize: 15, textTransform: 'lowercase', textAlign: 'center' },
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
  errorText: { fontSize: 13, textTransform: 'lowercase' },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    width: '100%',
    marginTop: 12,
  },
  actionBtnText: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
  backText: { fontSize: 13, textTransform: 'lowercase', marginTop: 8 },
  biometricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderWidth: 1,
    padding: 14,
    marginTop: 16,
  },
  biometricText: { flex: 1, fontSize: 14, textTransform: 'lowercase' },
  toggle: {
    width: 44,
    height: 24,
    borderWidth: 1,
    padding: 2,
    justifyContent: 'center',
  },
  toggleDot: {
    width: 18,
    height: 18,
  },
});
