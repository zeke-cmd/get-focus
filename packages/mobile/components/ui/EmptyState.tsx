import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { Plus } from 'lucide-react-native';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { borderColor: colors.border }]}>
        {icon}
      </View>
      <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
        {title}
      </Text>
      {description && (
        <Text style={[styles.desc, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Pressable style={[styles.actionBtn, { borderColor: colors.border }]} onPress={onAction}>
          <Plus size={14} color={colors.foreground} strokeWidth={1.5} />
          <Text style={[styles.actionText, { color: colors.foreground, fontFamily: fonts.body }]}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
    gap: 12,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '300',
    textTransform: 'lowercase',
    textAlign: 'center',
  },
  desc: {
    fontSize: 13,
    textTransform: 'lowercase',
    textAlign: 'center',
    lineHeight: 18,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
  },
  actionText: {
    fontSize: 13,
    textTransform: 'lowercase',
  },
});
