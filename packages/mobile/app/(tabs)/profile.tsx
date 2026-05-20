import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, fonts, type ThemeMode } from '../../lib/theme';
import { useDatabase, resetAllData } from '../../db/client';
import { userProfile, appSettings } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import {
  User,
  Sun,
  Moon,
  Monitor,
  BookOpen,
  Shield,
  Download,
  Upload,
  Info,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { authenticateForReset } from '../../lib/pin';
import type { QuoteSource } from '../../lib/quote-sources';

export default function ProfileScreen() {
  const { colors, mode, setMode, isDark } = useTheme();
  const db = useDatabase();
  const router = useRouter();
  const [name, setName] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [quoteSource, setQuoteSource] = useState<QuoteSource>('gita');

  useEffect(() => {
    async function load() {
      const profile = await db.select().from(userProfile).limit(1);
      if (profile.length > 0) {
        setName(profile[0].name);
        setMemberSince(
          new Date(profile[0].createdAt).toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
          }).toLowerCase()
        );
      }

      const qs = await db.select().from(appSettings).where(eq(appSettings.key, 'quote_source'));
      if (qs.length > 0) setQuoteSource(qs[0].value as QuoteSource);
    }
    load();
  }, []);

  const themeModes: { key: ThemeMode; label: string; Icon: typeof Sun }[] = [
    { key: 'light', label: 'light', Icon: Sun },
    { key: 'dark', label: 'dark', Icon: Moon },
    { key: 'system', label: 'system', Icon: Monitor },
  ];

  const quoteSources: { key: QuoteSource; label: string }[] = [
    { key: 'gita', label: 'bhagavad gita' },
    { key: 'stoic', label: 'stoic philosophy' },
    { key: 'none', label: 'none' },
  ];

  const handleQuoteChange = async (source: QuoteSource) => {
    haptic.selection();
    setQuoteSource(source);
    await db.insert(appSettings).values({ key: 'quote_source', value: source })
      .onConflictDoUpdate({ target: appSettings.key, set: { value: source } });
  };

  const handleThemeChange = (m: ThemeMode) => {
    haptic.selection();
    setMode(m);
  };

  const handleReset = () => {
    haptic.light();
    Alert.alert(
      'reset app',
      'this will erase all data and return to onboarding. this cannot be undone.',
      [
        { text: 'cancel', style: 'cancel' },
        {
          text: 'reset',
          style: 'destructive',
          onPress: async () => {
            const ok = await authenticateForReset();
            if (!ok) return;
            resetAllData();
            await AsyncStorage.clear();
            router.replace('/(onboarding)/welcome');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          profile
        </Text>

        {/* User card */}
        <Card>
          <CardContent>
            <View style={styles.userRow}>
              <View style={[styles.avatar, { borderColor: colors.border }]}>
                <User size={24} color={colors.foreground} strokeWidth={1.5} />
              </View>
              <View>
                <Text style={[styles.userName, { color: colors.foreground, fontFamily: fonts.heading }]}>
                  {name || 'user'}
                </Text>
                {memberSince && (
                  <Text style={[styles.memberSince, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                    member since {memberSince}
                  </Text>
                )}
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader>
            <CardTitle>appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.themeRow}>
              {themeModes.map((t) => {
                const iconColor = mode === t.key ? colors.background : colors.foreground;
                return (
                  <Pressable
                    key={t.key}
                    style={[
                      styles.themeBtn,
                      {
                        backgroundColor: mode === t.key ? colors.primary : 'transparent',
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => handleThemeChange(t.key)}
                  >
                    <t.Icon size={16} color={iconColor} strokeWidth={1.5} />
                    <Text
                      style={[
                        styles.themeBtnText,
                        {
                          color: mode === t.key ? colors.primaryForeground : colors.mutedForeground,
                          fontFamily: fonts.body,
                        },
                      ]}
                    >
                      {t.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </CardContent>
        </Card>

        {/* Quotes */}
        <Card>
          <CardHeader>
            <View style={styles.sectionRow}>
              <BookOpen size={16} color={colors.foreground} strokeWidth={1.5} />
              <CardTitle>daily quote source</CardTitle>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.quoteOptions}>
              {quoteSources.map((q) => (
                <Pressable
                  key={q.key}
                  style={[
                    styles.quoteOption,
                    {
                      backgroundColor: quoteSource === q.key ? colors.primary : 'transparent',
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleQuoteChange(q.key)}
                >
                  <Text
                    style={[
                      styles.quoteOptionText,
                      {
                        color: quoteSource === q.key ? colors.primaryForeground : colors.foreground,
                        fontFamily: fonts.body,
                      },
                    ]}
                  >
                    {q.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </CardContent>
        </Card>

        {/* Settings list */}
        <Card>
          <CardHeader>
            <CardTitle>settings</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.settingsList}>
              {[
                { icon: Shield, label: 'pin lock', desc: 'secure your app', route: '/(modals)/pin-setup' as const },
                { icon: Download, label: 'export data', desc: 'save your data as json', route: '/(modals)/export-import' as const },
                { icon: Upload, label: 'import data', desc: 'restore from backup', route: '/(modals)/export-import' as const },
              ].map((item) => (
                <Pressable
                  key={item.label}
                  style={[styles.settingRow, { borderBottomWidth: 1, borderBottomColor: colors.border }]}
                  onPress={() => {
                    haptic.light();
                    router.push(item.route);
                  }}
                >
                  <item.icon size={18} color={colors.foreground} strokeWidth={1.5} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.settingLabel, { color: colors.foreground, fontFamily: fonts.body }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.settingDesc, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                      {item.desc}
                    </Text>
                  </View>
                  <ChevronRight size={16} color={colors.mutedForeground} strokeWidth={1.5} />
                </Pressable>
              ))}
              <Pressable style={styles.settingRow} onPress={handleReset}>
                <RotateCcw size={18} color={colors.destructive} strokeWidth={1.5} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.settingLabel, { color: colors.destructive, fontFamily: fonts.body }]}>
                    reset app
                  </Text>
                  <Text style={[styles.settingDesc, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                    erase all data and start over
                  </Text>
                </View>
                <ChevronRight size={16} color={colors.mutedForeground} strokeWidth={1.5} />
              </Pressable>
            </View>
          </CardContent>
        </Card>

        {/* App info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appName, { color: colors.foreground, fontFamily: fonts.logo }]}>
            focus
          </Text>
          <Text style={[styles.appVersion, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            v0.0.1 • beta
          </Text>
          <View style={styles.madeWith}>
            <Sparkles size={12} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.madeWithText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              made with runable
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, gap: 16, paddingBottom: 32 },
  title: { fontSize: 28, fontWeight: '300', textTransform: 'lowercase' },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: { fontSize: 18, fontWeight: '300', textTransform: 'lowercase' },
  memberSince: { fontSize: 12, textTransform: 'lowercase', marginTop: 2 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  themeRow: { flexDirection: 'row', gap: 0 },
  themeBtn: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    marginRight: -1,
  },
  themeBtnText: { fontSize: 12, fontWeight: '500', textTransform: 'lowercase' },
  quoteOptions: { gap: 0 },
  quoteOption: {
    height: 44,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: -1,
  },
  quoteOptionText: { fontSize: 14, textTransform: 'lowercase' },
  settingsList: { gap: 0 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  settingLabel: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
  settingDesc: { fontSize: 12, textTransform: 'lowercase' },
  appInfo: { alignItems: 'center', paddingVertical: 24, gap: 4 },
  appName: { fontSize: 20 },
  appVersion: { fontSize: 12, textTransform: 'lowercase' },
  madeWith: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  madeWithText: { fontSize: 11, textTransform: 'lowercase' },
});
