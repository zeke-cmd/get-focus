import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../lib/theme';

interface ProgressIndicatorProps {
  steps: number;
  current: number;
}

export function ProgressIndicator({ steps, current }: ProgressIndicatorProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: steps }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: i <= current ? colors.foreground : colors.border,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 0,
  },
});
