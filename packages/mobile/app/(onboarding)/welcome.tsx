import { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { Target } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const doodleAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const lineOneAnim = useRef(new Animated.Value(0)).current;
  const lineTwoAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(220, [
      Animated.timing(doodleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(lineOneAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(lineTwoAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rise = (v: Animated.Value) => ({
    opacity: v,
    transform: [
      {
        translateY: v.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }),
      },
    ],
  });

  const doodleStyle = {
    opacity: doodleAnim,
    transform: [
      {
        scale: doodleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }),
      },
    ],
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.doodle, doodleStyle]}>
          <View style={[styles.ring, { borderColor: colors.border }]} />
          <View style={[styles.ringInner, { borderColor: colors.border }]} />
          <Target size={48} color={colors.foreground} strokeWidth={1.25} />
        </Animated.View>

        <Animated.Text
          style={[
            styles.logo,
            { color: colors.foreground, fontFamily: fonts.logo },
            rise(logoAnim),
          ]}
        >
          focus
        </Animated.Text>

        <Animated.Text
          style={[
            styles.tagline,
            { color: colors.foreground, fontFamily: fonts.body },
            rise(lineOneAnim),
          ]}
        >
          your attention is your most valuable asset.
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subTagline,
            { color: colors.mutedForeground, fontFamily: fonts.body },
            rise(lineTwoAnim),
          ]}
        >
          change starts with a single focused moment.
        </Animated.Text>
      </View>

      <Animated.View style={rise(buttonAnim)}>
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(onboarding)/personal-info')}
        >
          <Text
            style={[
              styles.buttonText,
              { color: colors.primaryForeground, fontFamily: fonts.body },
            ]}
          >
            begin
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  doodle: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  ring: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
  },
  ringInner: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
  },
  logo: {
    fontSize: 48,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
    textTransform: 'lowercase',
    marginTop: 8,
  },
  subTagline: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 32,
    textTransform: 'lowercase',
  },
  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'lowercase',
  },
});
