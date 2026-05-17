import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../lib/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 16, style }: SkeletonProps) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          backgroundColor: colors.muted,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function SkeletonCard() {
  const { colors } = useTheme();
  return (
    <View style={[skeletonStyles.card, { borderColor: colors.border }]}>
      <Skeleton width="60%" height={14} />
      <Skeleton width="85%" height={12} />
      <View style={skeletonStyles.row}>
        <Skeleton width={60} height={20} />
        <Skeleton width={40} height={20} />
      </View>
    </View>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <View style={skeletonStyles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

export function SkeletonWidget() {
  const { colors } = useTheme();
  return (
    <View style={[skeletonStyles.widget, { borderColor: colors.border }]}>
      <Skeleton width="40%" height={14} />
      <Skeleton width="100%" height={40} />
      <View style={skeletonStyles.row}>
        <Skeleton width="30%" height={12} />
        <Skeleton width="20%" height={12} />
      </View>
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    gap: 10,
    marginBottom: -1,
  },
  list: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  widget: {
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
});
