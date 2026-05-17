import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, fonts } from '../../lib/theme';

export default function GymScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
        gym
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
        your workout tracker will appear here.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, marginBottom: 8 },
  subtitle: { fontSize: 14 },
});
