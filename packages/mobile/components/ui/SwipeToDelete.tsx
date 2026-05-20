import { useRef } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { Trash2 } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const THRESHOLD = -80;
const DELETE_THRESHOLD = -SCREEN_WIDTH * 0.4;

interface SwipeToDeleteProps {
  children: React.ReactNode;
  onDelete: () => void;
  enabled?: boolean;
}

export function SwipeToDelete({ children, onDelete, enabled = true }: SwipeToDeleteProps) {
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        enabled && Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderMove: (_, gs) => {
        if (gs.dx < 0) {
          translateX.setValue(gs.dx);
          deleteOpacity.setValue(Math.min(1, Math.abs(gs.dx) / Math.abs(THRESHOLD)));
        }
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx < DELETE_THRESHOLD) {
          // Full delete
          Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }).start(() => onDelete());
        } else if (gs.dx < THRESHOLD) {
          // Snap to show delete button
          Animated.spring(translateX, {
            toValue: THRESHOLD,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        } else {
          // Snap back
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
          Animated.timing(deleteOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!enabled) return <>{children}</>;

  return (
    <View style={styles.wrapper}>
      {/* Delete background */}
      <Animated.View
        style={[
          styles.deleteArea,
          { backgroundColor: colors.primary, opacity: deleteOpacity },
        ]}
      >
        <Trash2 size={18} color={colors.primaryForeground} strokeWidth={1.5} />
        <Text style={[styles.deleteText, { color: colors.primaryForeground, fontFamily: fonts.body }]}>
          delete
        </Text>
      </Animated.View>

      {/* Swipeable content */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          { backgroundColor: colors.background, transform: [{ translateX }] },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  deleteArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  content: {
    zIndex: 1,
  },
  deleteText: {
    fontSize: 12,
    textTransform: 'lowercase',
    fontWeight: '500',
  },
});
