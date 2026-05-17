import * as Haptics from 'expo-haptics';

export const haptic = {
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  selection: () => Haptics.selectionAsync(),
  // patterns
  tick: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  confirm: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  delete: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 100);
  },
  timerDone: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 300);
    setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 600);
  },
  buttonPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  toggle: () => Haptics.selectionAsync(),
};
