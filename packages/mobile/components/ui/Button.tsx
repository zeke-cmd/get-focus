import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import * as Haptics from 'expo-haptics';

type Variant = 'default' | 'outline' | 'ghost' | 'destructive';
type Size = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: Variant;
  size?: Size;
  label?: string;
  loading?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const heightMap: Record<Size, number> = {
  sm: 36,
  default: 44,
  lg: 52,
  icon: 44,
};

export function Button({
  variant = 'default',
  size = 'default',
  label,
  loading,
  disabled,
  style,
  children,
  onPress,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();

  const bg: Record<Variant, string> = {
    default: colors.foreground,
    outline: 'transparent',
    ghost: 'transparent',
    destructive: colors.foreground,
  };

  const fg: Record<Variant, string> = {
    default: colors.background,
    outline: colors.foreground,
    ghost: colors.foreground,
    destructive: colors.background,
  };

  const borderColor: Record<Variant, string> = {
    default: colors.foreground,
    outline: colors.border,
    ghost: 'transparent',
    destructive: colors.foreground,
  };

  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          height: heightMap[size],
          backgroundColor: bg[variant],
          borderColor: borderColor[variant],
          borderWidth: variant === 'ghost' ? 0 : 1,
          opacity: disabled || loading ? 0.5 : pressed ? 0.8 : 1,
          paddingHorizontal: size === 'icon' ? 0 : 20,
          minWidth: size === 'icon' ? 44 : undefined,
        },
        style,
      ]}
      disabled={disabled || loading}
      onPress={handlePress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={fg[variant]} />
      ) : children ? (
        children
      ) : label ? (
        <Text
          style={[
            styles.label,
            { color: fg[variant], fontFamily: fonts.body },
          ]}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
});
