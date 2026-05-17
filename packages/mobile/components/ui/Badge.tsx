import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'outline' | 'muted';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'default', style }: BadgeProps) {
  const { colors } = useTheme();

  const bgMap = {
    default: colors.foreground,
    outline: 'transparent',
    muted: colors.muted,
  };

  const fgMap = {
    default: colors.background,
    outline: colors.foreground,
    muted: colors.mutedForeground,
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgMap[variant],
          borderColor: variant === 'outline' ? colors.border : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: fgMap[variant], fontFamily: fonts.body }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 0,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
