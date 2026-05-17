import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { gymExercises } from '../../db/schema';
import { X, Dumbbell } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

type GymCat = 'push' | 'pull' | 'legs' | 'cardio' | 'core' | 'other';

const CATEGORIES: { key: GymCat; label: string }[] = [
  { key: 'push', label: 'push' },
  { key: 'pull', label: 'pull' },
  { key: 'legs', label: 'legs' },
  { key: 'cardio', label: 'cardio' },
  { key: 'core', label: 'core' },
  { key: 'other', label: 'other' },
];

export default function GymExerciseModal() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<GymCat>('push');

  const handleSave = async () => {
    if (!name.trim()) return;
    Keyboard.dismiss();

    await db.insert(gymExercises).values({
      id: randomUUID(),
      name: name.trim(),
      category,
      createdAt: new Date().toISOString(),
    });

    haptic.success();
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          new exercise
        </Text>
        <Pressable onPress={() => router.back()}>
          <X size={22} color={colors.foreground} strokeWidth={1.5} />
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Name */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Dumbbell size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              exercise name
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
            ]}
            placeholder="e.g. bench press"
            placeholderTextColor={colors.mutedForeground}
            value={name}
            onChangeText={setName}
            autoFocus
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            category
          </Text>
          <View style={styles.catGrid}>
            {CATEGORIES.map((c) => (
              <Pressable
                key={c.key}
                style={[
                  styles.catBtn,
                  {
                    backgroundColor: category === c.key ? colors.foreground : 'transparent',
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  haptic.selection();
                  setCategory(c.key);
                }}
              >
                <Text
                  style={[
                    styles.catText,
                    {
                      color: category === c.key ? colors.background : colors.mutedForeground,
                      fontFamily: fonts.body,
                    },
                  ]}
                >
                  {c.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Save */}
        <Pressable
          style={[
            styles.saveBtn,
            { backgroundColor: name.trim() ? colors.foreground : colors.muted },
          ]}
          onPress={handleSave}
          disabled={!name.trim()}
        >
          <Text
            style={[
              styles.saveBtnText,
              { color: name.trim() ? colors.background : colors.mutedForeground, fontFamily: fonts.heading },
            ]}
          >
            add exercise
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: { fontSize: 20, fontWeight: '300', textTransform: 'lowercase' },
  content: { padding: 20, gap: 24 },
  section: { gap: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionLabel: { fontSize: 12, textTransform: 'lowercase' },
  input: {
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 16,
    textTransform: 'lowercase',
  },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
  },
  catText: { fontSize: 13, textTransform: 'lowercase' },
  saveBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveBtnText: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
});
