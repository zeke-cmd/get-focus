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
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { DatePicker } from '../../components/ui/DatePicker';
import { Button } from '../../components/ui/Button';
import { ProgressIndicator } from '../../components/ui/ProgressIndicator';

const GENDER_OPTIONS = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
  { value: 'non-binary', label: 'non-binary' },
  { value: 'prefer not to say', label: 'prefer not to say' },
];

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'name is required';
    if (!dob) e.dob = 'date of birth is required';
    if (!gender) e.gender = 'please select a gender';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    // pass data via params — will save in widget-setup screen
    router.push({
      pathname: '/(onboarding)/consent',
      params: { name: name.trim(), dob, gender },
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
            <ProgressIndicator steps={3} current={0} />
            <Text
              style={[
                styles.title,
                { color: colors.foreground, fontFamily: fonts.heading },
              ]}
            >
              about you
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: colors.mutedForeground, fontFamily: fonts.body },
              ]}
            >
              let's personalize your experience.
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="name"
              placeholder="your name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <DatePicker
              label="date of birth"
              value={dob}
              onValueChange={setDob}
              error={errors.dob}
            />
            <Select
              label="gender"
              placeholder="select gender"
              options={GENDER_OPTIONS}
              value={gender}
              onValueChange={setGender}
              error={errors.gender}
            />
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
    gap: 20,
  },
  footer: {
    padding: 24,
    paddingTop: 8,
  },
});
