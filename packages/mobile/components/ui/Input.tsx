import { TextInput, View, Text, StyleSheet, type TextInputProps } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text
          style={[styles.label, { color: colors.mutedForeground, fontFamily: fonts.body }]}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? colors.foreground : colors.border,
            color: colors.foreground,
            fontFamily: fonts.body,
            backgroundColor: 'transparent',
          },
          style,
        ]}
        placeholderTextColor={colors.mutedForeground}
        {...props}
      />
      {error && (
        <Text style={[styles.error, { color: colors.foreground, fontFamily: fonts.body }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 16,
    fontSize: 16,
    textTransform: 'lowercase',
  },
  error: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
});
