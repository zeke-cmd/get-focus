import { Pressable, View, StyleSheet, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { useTheme } from '../../lib/theme';
import * as Haptics from 'expo-haptics';

interface ToggleProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ value, onValueChange, disabled }: ToggleProps) {
  const { colors } = useTheme();
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.muted, colors.foreground],
  });

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onValueChange(!value);
      }}
      disabled={disabled}
      style={[styles.track, { opacity: disabled ? 0.5 : 1 }]}
    >
      <Animated.View style={[styles.trackBg, { backgroundColor: bgColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: value ? colors.background : colors.foreground,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
  },
  trackBg: {
    width: 48,
    height: 28,
    borderRadius: 0,
    justifyContent: 'center',
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 0,
  },
});
