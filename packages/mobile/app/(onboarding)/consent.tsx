import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { Input } from '../../components/ui/Input';
import { Toggle } from '../../components/ui/Toggle';
import { Button } from '../../components/ui/Button';
import { ProgressIndicator } from '../../components/ui/ProgressIndicator';

export default function ConsentScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ name: string; dob: string; gender: string }>();
  const [email, setEmail] = useState('');
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  const handleNext = () => {
    router.push({
      pathname: '/(onboarding)/widget-setup',
      params: {
        name: params.name,
        dob: params.dob,
        gender: params.gender,
        email: email.trim() || '',
        analyticsConsent: analyticsConsent ? '1' : '0',
      },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <ProgressIndicator steps={3} current={1} />
            <Text
              style={[
                styles.title,
                { color: colors.foreground, fontFamily: fonts.heading },
              ]}
            >
              privacy & consent
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: colors.mutedForeground, fontFamily: fonts.body },
              ]}
            >
              your data stays on your device. always.
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="email (optional)"
              placeholder="for future sync features"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={[styles.consentRow, { borderColor: colors.border }]}>
              <View style={styles.consentText}>
                <Text
                  style={[
                    styles.consentTitle,
                    { color: colors.foreground, fontFamily: fonts.body },
                  ]}
                >
                  anonymous analytics
                </Text>
                <Text
                  style={[
                    styles.consentDesc,
                    { color: colors.mutedForeground, fontFamily: fonts.body },
                  ]}
                >
                  help improve focus by sharing anonymous usage patterns. no personal data is ever collected.
                </Text>
              </View>
              <Toggle value={analyticsConsent} onValueChange={setAnalyticsConsent} />
            </View>

            <View style={[styles.infoBox, { backgroundColor: colors.muted }]}>
              <Text
                style={[styles.infoText, { color: colors.mutedForeground, fontFamily: fonts.body }]}
              >
                • all your data lives locally on this device{'\n'}
                • no accounts, no cloud, no tracking{'\n'}
                • export your data anytime from profile{'\n'}
                • analytics only tracks feature usage counts
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button label="continue" onPress={handleNext} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    gap: 4,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    textTransform: 'lowercase',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    textTransform: 'lowercase',
  },
  form: {
    gap: 24,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderRadius: 0,
    padding: 16,
  },
  consentText: {
    flex: 1,
    gap: 4,
  },
  consentTitle: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  consentDesc: {
    fontSize: 12,
    lineHeight: 18,
    textTransform: 'lowercase',
  },
  infoBox: {
    padding: 16,
    borderRadius: 0,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 20,
    textTransform: 'lowercase',
  },
  footer: {
    padding: 24,
    paddingTop: 8,
  },
});
