import { View, Text, StyleSheet, type ViewProps, type TextProps } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style, ...props }: CardProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.card, { borderColor: colors.border, backgroundColor: colors.card }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
  noBorder?: boolean;
}

export function CardHeader({ children, style, noBorder, ...props }: CardHeaderProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.header,
        !noBorder && { borderBottomWidth: 1, borderBottomColor: colors.border },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardTitle({ children, style, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        styles.title,
        { color: colors.cardForeground, fontFamily: fonts.heading },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function CardDescription({ children, style, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        styles.description,
        { color: colors.mutedForeground, fontFamily: fonts.body },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function CardContent({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 0,
  },
  header: {
    padding: 20,
    gap: 4,
  },
  title: {
    fontSize: 16,
    textTransform: 'lowercase',
  },
  description: {
    fontSize: 13,
    textTransform: 'lowercase',
  },
  content: {
    padding: 20,
  },
});
