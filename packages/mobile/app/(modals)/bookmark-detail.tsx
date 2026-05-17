import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { bookmarks } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { X, Trash2, Link, FileText, Folder } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

type Category = 'article' | 'video' | 'documentation' | 'tool' | 'other';

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'article', label: 'article' },
  { key: 'video', label: 'video' },
  { key: 'documentation', label: 'docs' },
  { key: 'tool', label: 'tool' },
  { key: 'other', label: 'other' },
];

export default function BookmarkDetailModal() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('other');

  useEffect(() => {
    if (!id) return;
    async function load() {
      const rows = await db.select().from(bookmarks).where(eq(bookmarks.id, id!));
      if (rows.length > 0) {
        const b = rows[0];
        setTitle(b.title);
        setUrl(b.url);
        setDescription(b.description || '');
        setCategory(b.category as Category);
      }
    }
    load();
  }, [id]);

  const handleSave = async () => {
    if (!url.trim()) return;
    Keyboard.dismiss();

    if (isEdit) {
      await db.update(bookmarks).set({
        title: title.trim() || url.trim(),
        url: url.trim(),
        description: description.trim() || null,
        category,
      }).where(eq(bookmarks.id, id!));
    } else {
      await db.insert(bookmarks).values({
        id: randomUUID(),
        title: title.trim() || url.trim(),
        url: url.trim(),
        description: description.trim() || null,
        category,
        tags: '[]',
        isRead: false,
        isFavorite: false,
        createdAt: new Date().toISOString(),
      });
    }
    haptic.success();
    router.back();
  };

  const handleDelete = async () => {
    if (!id) return;
    await db.delete(bookmarks).where(eq(bookmarks.id, id));
    haptic.delete();
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: fonts.heading }]}>
          {isEdit ? 'edit bookmark' : 'new bookmark'}
        </Text>
        <View style={styles.headerActions}>
          {isEdit && (
            <Pressable onPress={handleDelete} style={styles.deleteBtn}>
              <Trash2 size={18} color={colors.foreground} strokeWidth={1.5} />
            </Pressable>
          )}
          <Pressable onPress={() => router.back()}>
            <X size={22} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* URL */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Link size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              url
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
            ]}
            placeholder="https://example.com"
            placeholderTextColor={colors.mutedForeground}
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={!isEdit}
          />
        </View>

        {/* Title */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              title
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
            ]}
            placeholder="bookmark title (optional)"
            placeholderTextColor={colors.mutedForeground}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Folder size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              category
            </Text>
          </View>
          <View style={styles.catRow}>
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

        {/* Description */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              description
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              styles.descInput,
              { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
            ]}
            placeholder="notes about this bookmark..."
            placeholderTextColor={colors.mutedForeground}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Save */}
        <Pressable
          style={[
            styles.saveBtn,
            { backgroundColor: url.trim() ? colors.foreground : colors.muted },
          ]}
          onPress={handleSave}
          disabled={!url.trim()}
        >
          <Text
            style={[
              styles.saveBtnText,
              { color: url.trim() ? colors.background : colors.mutedForeground, fontFamily: fonts.heading },
            ]}
          >
            {isEdit ? 'update bookmark' : 'save bookmark'}
          </Text>
        </Pressable>
      </ScrollView>
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
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  headerTitle: { fontSize: 20, fontWeight: '300', textTransform: 'lowercase' },
  deleteBtn: { padding: 4 },
  content: { padding: 20, gap: 24, paddingBottom: 40 },
  section: { gap: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionLabel: { fontSize: 12, textTransform: 'lowercase' },
  input: {
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 14,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  descInput: { height: 80, paddingTop: 12 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
  catText: { fontSize: 12, textTransform: 'lowercase' },
  saveBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveBtnText: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
});
