import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { Toggle } from '../../components/ui/Toggle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressIndicator } from '../../components/ui/ProgressIndicator';
import { WIDGETS, getDefaultWidgetPreferences } from '../../lib/widget-registry';
import { useDatabase } from '../../db/client';
import { userProfile, widgetPreferences } from '../../db/schema';
import { setOnboardingComplete } from '../../lib/storage';
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
  const db = useDatabase();
  const params = useLocalSearchParams<{
    name: string;
    dob: string;
    gender: string;
    email: string;
    analyticsConsent: string;
  }>();

  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(WIDGETS.map((w) => [w.id, w.defaultEnabled]))
  );
  const [loading, setLoading] = useState(false);

  const toggleWidget = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // save user profile
      await db.insert(userProfile).values({
        id: 1,
        name: params.name || 'user',
        dob: params.dob || '2000-01-01',
        gender: params.gender || 'prefer not to say',
        email: params.email || null,
        analyticsConsent: params.analyticsConsent === '1',
        createdAt: new Date().toISOString(),
      });

      // save widget preferences
      for (let i = 0; i < WIDGETS.length; i++) {
        const w = WIDGETS[i];
        await db.insert(widgetPreferences).values({
          id: w.id,
          enabled: enabled[w.id] ?? true,
          sortOrder: i,
        });
      }

      // mark onboarding complete
      await setOnboardingComplete(true);

      // navigate to tabs
      router.replace('/(tabs)');
    } catch (e) {
      console.error('onboarding save error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <ProgressIndicator steps={3} current={2} />
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
        <Button
          label="start focusing"
          onPress={handleFinish}
          loading={loading}
        />
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
  },
});
