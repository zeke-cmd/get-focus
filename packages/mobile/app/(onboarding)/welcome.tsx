import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={styles.content}>
        <Text style={[styles.logo, { color: colors.foreground, fontFamily: fonts.logo }]}>
          focus
        </Text>
        <Text
          style={[
            styles.message,
            { color: colors.mutedForeground, fontFamily: fonts.body },
          ]}
        >
          change starts with a single focused moment.
        </Text>
      </View>
      <Pressable
        style={[styles.button, { backgroundColor: colors.foreground }]}
        onPress={() => router.push('/(onboarding)/personal-info')}
      >
        <Text style={[styles.buttonText, { color: colors.background, fontFamily: fonts.body }]}>
          begin
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    letterSpacing: -1,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'lowercase',
  },
});
