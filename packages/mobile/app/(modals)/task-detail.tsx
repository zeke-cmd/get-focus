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
import { tasks } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { X, Trash2, Calendar, Flag, Tag, FileText } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

type Priority = 'low' | 'medium' | 'high';

const PRIORITIES: { key: Priority; label: string }[] = [
  { key: 'low', label: 'low' },
  { key: 'medium', label: 'medium' },
  { key: 'high', label: 'high' },
];

const TAG_OPTIONS = ['work', 'personal', 'health', 'learning', 'creative', 'errands'];

export default function TaskDetailModal() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!id) return;
    async function load() {
      const rows = await db.select().from(tasks).where(eq(tasks.id, id!));
      if (rows.length > 0) {
        const t = rows[0];
        setTitle(t.title);
        setPriority(t.priority as Priority);
        setDueDate(t.dueDate || '');
        setNotes(t.notes || t.time || '');
        try {
          setTags(JSON.parse(t.tags));
        } catch {
          setTags([]);
        }
      }
    }
    load();
  }, [id]);

  const toggleTag = (tag: string) => {
    haptic.selection();
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    Keyboard.dismiss();

    if (isEdit) {
      await db.update(tasks).set({
        title: title.trim(),
        priority,
        dueDate: dueDate || null,
        tags: JSON.stringify(tags),
        notes: notes.trim() || null,
      }).where(eq(tasks.id, id!));
    } else {
      await db.insert(tasks).values({
        id: randomUUID(),
        title: title.trim(),
        priority,
        dueDate: dueDate || null,
        tags: JSON.stringify(tags),
        notes: notes.trim() || null,
        completed: false,
        isPending: true,
        sortOrder: 0,
        createdAt: new Date().toISOString(),
      });
    }
    haptic.success();
    router.back();
  };

  const handleDelete = async () => {
    if (!id) return;
    await db.delete(tasks).where(eq(tasks.id, id));
    haptic.delete();
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          {isEdit ? 'edit task' : 'new task'}
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
        {/* Title */}
        <TextInput
          style={[
            styles.input,
            styles.titleInput,
            { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.heading },
          ]}
          placeholder="task title"
          placeholderTextColor={colors.mutedForeground}
          value={title}
          onChangeText={setTitle}
          autoFocus={!isEdit}
        />

        {/* Priority */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Flag size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              priority
            </Text>
          </View>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((p) => (
              <Pressable
                key={p.key}
                style={[
                  styles.priorityBtn,
                  {
                    backgroundColor: priority === p.key ? colors.primary : 'transparent',
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  haptic.selection();
                  setPriority(p.key);
                }}
              >
                <Text
                  style={[
                    styles.priorityText,
                    {
                      color: priority === p.key ? colors.primaryForeground : colors.mutedForeground,
                      fontFamily: fonts.body,
                    },
                  ]}
                >
                  {p.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Due Date */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              due date (yyyy-mm-dd)
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
            ]}
            placeholder="2026-05-20"
            placeholderTextColor={colors.mutedForeground}
            value={dueDate}
            onChangeText={setDueDate}
            keyboardType="numbers-and-punctuation"
          />
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Tag size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              tags
            </Text>
          </View>
          <View style={styles.tagRow}>
            {TAG_OPTIONS.map((tag) => (
              <Pressable
                key={tag}
                style={[
                  styles.tagChip,
                  {
                    backgroundColor: tags.includes(tag) ? colors.primary : 'transparent',
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: tags.includes(tag) ? colors.primaryForeground : colors.mutedForeground,
                      fontFamily: fonts.body,
                    },
                  ]}
                >
                  {tag}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={14} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              notes
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              styles.notesInput,
              { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
            ]}
            placeholder="additional notes..."
            placeholderTextColor={colors.mutedForeground}
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Save */}
        <Pressable
          style={[
            styles.saveBtn,
            { backgroundColor: title.trim() ? colors.primary : colors.muted },
          ]}
          onPress={handleSave}
          disabled={!title.trim()}
        >
          <Text
            style={[
              styles.saveBtnText,
              { color: title.trim() ? colors.primaryForeground : colors.mutedForeground, fontFamily: fonts.heading },
            ]}
          >
            {isEdit ? 'update task' : 'add task'}
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
  title: { fontSize: 20, fontWeight: '300', textTransform: 'lowercase' },
  deleteBtn: { padding: 4 },
  content: { padding: 20, gap: 24, paddingBottom: 40 },
  input: {
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 14,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  titleInput: { fontSize: 18, height: 52 },
  notesInput: { height: 100, paddingTop: 12 },
  section: { gap: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionLabel: { fontSize: 12, textTransform: 'lowercase' },
  priorityRow: { flexDirection: 'row', gap: 0 },
  priorityBtn: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -1,
  },
  priorityText: { fontSize: 13, textTransform: 'lowercase' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  tagText: { fontSize: 12, textTransform: 'lowercase' },
  saveBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveBtnText: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
});
