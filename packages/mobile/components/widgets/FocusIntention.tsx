import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { focusIntentions } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Target, Check, RotateCcw } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

function getTodayId(): string {
  return new Date().toISOString().split('T')[0];
}

export function FocusIntention() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [intention, setIntention] = useState('');
  const [saved, setSaved] = useState<{ intention: string; completed: boolean } | null>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadToday();
  }, []);

  async function loadToday() {
    const todayId = getTodayId();
    const rows = await db.select().from(focusIntentions).where(eq(focusIntentions.id, todayId));
    if (rows.length > 0) {
      setSaved({ intention: rows[0].intention, completed: rows[0].completed });
    }
  }

  async function handleSet() {
    if (!input.trim()) return;
    const todayId = getTodayId();
    await db.insert(focusIntentions).values({
      id: todayId,
      intention: input.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }).onConflictDoUpdate({
      target: focusIntentions.id,
      set: { intention: input.trim(), completed: false },
    });
    haptic.medium();
    setSaved({ intention: input.trim(), completed: false });
    setInput('');
  }

  async function handleComplete() {
    const todayId = getTodayId();
    await db.update(focusIntentions).set({ completed: true }).where(eq(focusIntentions.id, todayId));
    haptic.success();
    setSaved((prev) => prev ? { ...prev, completed: true } : null);
  }

  async function handleReset() {
    const todayId = getTodayId();
    await db.delete(focusIntentions).where(eq(focusIntentions.id, todayId));
    haptic.light();
    setSaved(null);
    setInput('');
  }

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerRow}>
          <Target size={16} color={colors.foreground} strokeWidth={1.5} />
          <CardTitle>focus intention</CardTitle>
        </View>
      </CardHeader>
      <CardContent>
        {saved ? (
          <View style={styles.savedContainer}>
            <Text
              style={[
                styles.savedText,
                {
                  color: saved.completed ? colors.mutedForeground : colors.foreground,
                  fontFamily: fonts.body,
                  textDecorationLine: saved.completed ? 'line-through' : 'none',
                },
              ]}
            >
              {saved.intention}
            </Text>
            <View style={styles.actions}>
              {!saved.completed && (
                <Pressable
                  style={[styles.actionBtn, { backgroundColor: colors.foreground }]}
                  onPress={handleComplete}
                >
                  <Check size={16} color={colors.background} strokeWidth={2} />
                </Pressable>
              )}
              <Pressable
                style={[styles.actionBtn, { borderWidth: 1, borderColor: colors.border }]}
                onPress={handleReset}
              >
                <RotateCcw size={16} color={colors.foreground} strokeWidth={1.5} />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.foreground,
                  fontFamily: fonts.body,
                },
              ]}
              placeholder="what are you working on today?"
              placeholderTextColor={colors.mutedForeground}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSet}
              returnKeyType="done"
            />
            <Pressable
              style={[
                styles.setBtn,
                {
                  backgroundColor: input.trim() ? colors.foreground : colors.muted,
                },
              ]}
              onPress={handleSet}
              disabled={!input.trim()}
            >
              <Text
                style={[
                  styles.setBtnText,
                  {
                    color: input.trim() ? colors.background : colors.mutedForeground,
                    fontFamily: fonts.body,
                  },
                ]}
              >
                set
              </Text>
            </Pressable>
          </View>
        )}
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
  savedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  savedText: {
    fontSize: 16,
    flex: 1,
    textTransform: 'lowercase',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 12,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  setBtn: {
    height: 44,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  setBtnText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
});
