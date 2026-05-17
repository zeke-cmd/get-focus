import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { journalEntries } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BookOpen, ChevronLeft, ChevronRight, Save } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

function displayDate(d: Date): string {
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).toLowerCase();
}

export function DailyJournal() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  const dateId = formatDate(date);
  const isToday = dateId === formatDate(new Date());

  useEffect(() => {
    loadEntry();
  }, [dateId]);

  async function loadEntry() {
    const rows = await db.select().from(journalEntries).where(eq(journalEntries.id, dateId));
    if (rows.length > 0) {
      setContent(rows[0].content);
      setSaved(true);
    } else {
      setContent('');
      setSaved(false);
    }
  }

  async function saveEntry() {
    if (!content.trim()) return;
    await db.insert(journalEntries).values({
      id: dateId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    }).onConflictDoUpdate({
      target: journalEntries.id,
      set: { content: content.trim() },
    });
    haptic.medium();
    setSaved(true);
  }

  const prevDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d);
  };

  const nextDay = () => {
    if (isToday) return;
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d);
  };

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerRow}>
          <BookOpen size={16} color={colors.foreground} strokeWidth={1.5} />
          <CardTitle>journal</CardTitle>
        </View>
      </CardHeader>
      <CardContent>
        {/* Date navigator */}
        <View style={styles.dateNav}>
          <Pressable onPress={prevDay} hitSlop={12}>
            <ChevronLeft size={20} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
          <Text style={[styles.dateText, { color: colors.foreground, fontFamily: fonts.body }]}>
            {isToday ? 'today' : displayDate(date)}
          </Text>
          <Pressable onPress={nextDay} hitSlop={12} disabled={isToday}>
            <ChevronRight
              size={20}
              color={isToday ? colors.mutedForeground : colors.foreground}
              strokeWidth={1.5}
            />
          </Pressable>
        </View>

        <TextInput
          style={[
            styles.textarea,
            {
              borderColor: colors.border,
              color: colors.foreground,
              fontFamily: fonts.body,
            },
          ]}
          placeholder="how was your day?"
          placeholderTextColor={colors.mutedForeground}
          value={content}
          onChangeText={(t) => {
            setContent(t);
            setSaved(false);
          }}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.footer}>
          <Text style={[styles.charCount, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            {content.length} characters
          </Text>
          <Pressable
            style={[
              styles.saveBtn,
              {
                backgroundColor: saved ? colors.muted : colors.foreground,
              },
            ]}
            onPress={saveEntry}
            disabled={saved || !content.trim()}
          >
            <Save size={14} color={saved ? colors.mutedForeground : colors.background} strokeWidth={1.5} />
            <Text
              style={[
                styles.saveBtnText,
                {
                  color: saved ? colors.mutedForeground : colors.background,
                  fontFamily: fonts.body,
                },
              ]}
            >
              {saved ? 'saved' : 'save'}
            </Text>
          </Pressable>
        </View>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 0,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textTransform: 'lowercase',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  charCount: {
    fontSize: 11,
    textTransform: 'lowercase',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 0,
  },
  saveBtnText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
});
