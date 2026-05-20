import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { Button } from '../../components/ui/Button';
import { ProgressIndicator } from '../../components/ui/ProgressIndicator';
import { setPin } from '../../lib/pin';
import { Shield } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

type Step = 'enter' | 'confirm';

export default function OnboardingPinSetup() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ name: string; dob: string; gender: string }>();

  const [step, setStep] = useState<Step>('enter');
  const [pin, setPinValue] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePinInput = (value: string, setter: (v: string) => void) => {
    const clean = value.replace(/[^0-9]/g, '').slice(0, 4);
    setter(clean);
    setError('');
  };

  const goToNextStep = () => {
    router.push({
      pathname: '/(onboarding)/widget-setup',
      params: { name: params.name, dob: params.dob, gender: params.gender },
    });
  };

  const handleContinue = async () => {
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

    if (confirmPin !== pin) {
      setError('pins do not match');
      haptic.error();
      setConfirmPin('');
      return;
    }

    setSaving(true);
    try {
      await setPin(pin);
      haptic.success();
      goToNextStep();
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => {
    haptic.light();
    goToNextStep();
  };

  const value = step === 'enter' ? pin : confirmPin;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={styles.body}>
        <View style={styles.header}>
          <ProgressIndicator steps={4} current={1} />
          <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
            secure your app
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            {step === 'enter' ? 'set an optional 4-digit pin' : 'confirm your pin'}
          </Text>
        </View>

        <View style={styles.pinArea}>
          <Shield size={40} color={colors.foreground} strokeWidth={1} />
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
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            keyboardType="number-pad"
            maxLength={4}
            value={value}
            onChangeText={(v) => handlePinInput(v, step === 'enter' ? setPinValue : setConfirmPin)}
            autoFocus
          />
          {error ? (
            <Text style={[styles.errorText, { color: colors.destructive, fontFamily: fonts.body }]}>
              {error}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        <Button label={step === 'enter' ? 'continue' : 'set pin'} onPress={handleContinue} loading={saving} />
        <Pressable onPress={handleSkip} style={styles.skipBtn}>
          <Text style={[styles.skipText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            skip for now
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
            style={styles.skipBtn}
          >
            <Text style={[styles.skipText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              go back
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1, padding: 24 },
  header: { gap: 4, marginBottom: 32 },
  title: {
    fontSize: 28,
    fontWeight: '300',
    textTransform: 'lowercase',
    marginTop: 8,
  },
  subtitle: { fontSize: 14, textTransform: 'lowercase' },
  pinArea: { alignItems: 'center', gap: 24, marginTop: 32 },
  dotsRow: { flexDirection: 'row', gap: 16 },
  dot: { width: 16, height: 16, borderWidth: 1, borderRadius: 0 },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 1,
    width: 1,
  },
  errorText: { fontSize: 12, textTransform: 'lowercase', marginTop: 8 },
  footer: { padding: 24, paddingTop: 8, gap: 12 },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipText: { fontSize: 13, textTransform: 'lowercase' },
});
