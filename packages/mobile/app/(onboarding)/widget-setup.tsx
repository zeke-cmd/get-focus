import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { Toggle } from '../../components/ui/Toggle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressIndicator } from '../../components/ui/ProgressIndicator';
import { WIDGETS } from '../../lib/widget-registry';
import {
  Target,
  Timer,
  CheckSquare,
  Bookmark,
  BookOpen,
  Calendar,
  Flame,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target,
  Timer,
  CheckSquare,
  Bookmark,
  BookOpen,
  Calendar,
  Flame,
};

export default function WidgetSetupScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ name: string; dob: string; gender: string }>();

  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(WIDGETS.map((w) => [w.id, w.defaultEnabled]))
  );

  const toggleWidget = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const enabledIdsCsv = () =>
    WIDGETS.filter((w) => enabled[w.id] ?? w.defaultEnabled)
      .map((w) => w.id)
      .join(',');

  const defaultEnabledIdsCsv = () =>
    WIDGETS.filter((w) => w.defaultEnabled).map((w) => w.id).join(',');

  const goToConsent = (widgetCsv: string) => {
    router.push({
      pathname: '/(onboarding)/consent',
      params: {
        name: params.name,
        dob: params.dob,
        gender: params.gender,
        widgets: widgetCsv,
      },
    });
  };

  const handleContinue = () => goToConsent(enabledIdsCsv());
  const handleUseDefaults = () => goToConsent(defaultEnabledIdsCsv());

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <ProgressIndicator steps={4} current={2} />
          <Text
            style={[
              styles.title,
              { color: colors.foreground, fontFamily: fonts.heading },
            ]}
          >
            your widgets
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.mutedForeground, fontFamily: fonts.body },
            ]}
          >
            choose what appears on your dashboard. you can change this later.
          </Text>
        </View>

        <View style={styles.list}>
          {WIDGETS.map((widget) => {
            const Icon = ICON_MAP[widget.icon];
            return (
              <Pressable
                key={widget.id}
                style={[styles.widgetRow, { borderColor: colors.border }]}
                onPress={() => toggleWidget(widget.id)}
              >
                <View style={styles.widgetLeft}>
                  {Icon && (
                    <Icon
                      size={20}
                      color={enabled[widget.id] ? colors.foreground : colors.mutedForeground}
                      strokeWidth={1.5}
                    />
                  )}
                  <View style={styles.widgetInfo}>
                    <View style={styles.widgetNameRow}>
                      <Text
                        style={[
                          styles.widgetName,
                          {
                            color: enabled[widget.id]
                              ? colors.foreground
                              : colors.mutedForeground,
                            fontFamily: fonts.body,
                          },
                        ]}
                      >
                        {widget.name}
                      </Text>
                      {widget.id === 'habits' && (
                        <Badge label="pro" variant="outline" />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.widgetDesc,
                        { color: colors.mutedForeground, fontFamily: fonts.body },
                      ]}
                    >
                      {widget.description}
                    </Text>
                  </View>
                </View>
                <Toggle
                  value={enabled[widget.id]}
                  onValueChange={() => toggleWidget(widget.id)}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="continue" onPress={handleContinue} />
        <Pressable onPress={handleUseDefaults} style={styles.skipBtn}>
          <Text style={[styles.skipText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            use defaults
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    padding: 24,
    paddingBottom: 8,
  },
  header: {
    gap: 4,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    textTransform: 'lowercase',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    textTransform: 'lowercase',
    lineHeight: 20,
  },
  list: {
    gap: 0,
  },
  widgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 0,
    padding: 16,
    marginBottom: -1, // collapse borders
  },
  widgetLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 12,
  },
  widgetInfo: {
    flex: 1,
    gap: 2,
  },
  widgetNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  widgetName: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  widgetDesc: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  footer: {
    padding: 24,
    paddingTop: 8,
    gap: 12,
  },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipText: { fontSize: 13, textTransform: 'lowercase' },
});
