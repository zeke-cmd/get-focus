import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, fonts } from '../../lib/theme';

export default function DashboardScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text
          style={[
            styles.greeting,
            { color: colors.foreground, fontFamily: fonts.heading },
          ]}
        >
          good morning
        </Text>
        <Text
          style={[
            styles.date,
            { color: colors.mutedForeground, fontFamily: fonts.body },
          ]}
        >
          {new Date()
            .toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
            .toLowerCase()}
        </Text>

        <View style={[styles.card, { borderColor: colors.border }]}>
          <Text
            style={[
              styles.cardTitle,
              { color: colors.foreground, fontFamily: fonts.heading },
            ]}
          >
            dashboard
          </Text>
          <Text
            style={[
              styles.cardBody,
              { color: colors.mutedForeground, fontFamily: fonts.body },
            ]}
          >
            widgets will appear here once built.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, gap: 16 },
  greeting: { fontSize: 28 },
  date: { fontSize: 14, marginBottom: 8 },
  card: {
    borderWidth: 1,
    borderRadius: 0,
    padding: 20,
    gap: 8,
  },
  cardTitle: { fontSize: 16 },
  cardBody: { fontSize: 14, lineHeight: 20 },
});
