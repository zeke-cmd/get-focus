import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Keyboard } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { bookmarks } from '../../db/schema';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Bookmark, Plus, Check } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

export function QuickBookmark() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = async () => {
    if (!url.trim()) return;
    await db.insert(bookmarks).values({
      id: randomUUID(),
      title: title.trim() || url.trim(),
      url: url.trim(),
      tags: '[]',
      category: 'other',
      isRead: false,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    });
    haptic.medium();
    setTitle('');
    setUrl('');
    setExpanded(false);
    Keyboard.dismiss();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerRow}>
          <Bookmark size={16} color={colors.foreground} strokeWidth={1.5} />
          <CardTitle>quick bookmark</CardTitle>
          {!expanded && (
            <Pressable
              style={[styles.addBtn, { backgroundColor: colors.foreground }]}
              onPress={() => {
                haptic.light();
                setExpanded(true);
              }}
            >
              <Plus size={16} color={colors.background} strokeWidth={2} />
            </Pressable>
          )}
        </View>
      </CardHeader>
      {expanded && (
        <CardContent>
          <View style={styles.form}>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
              ]}
              placeholder="url"
              placeholderTextColor={colors.mutedForeground}
              value={url}
              onChangeText={setUrl}
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground, fontFamily: fonts.body },
              ]}
              placeholder="title (optional)"
              placeholderTextColor={colors.mutedForeground}
              value={title}
              onChangeText={setTitle}
              autoCapitalize="none"
            />
            <View style={styles.actions}>
              <Pressable
                style={[styles.cancelBtn, { borderColor: colors.border }]}
                onPress={() => {
                  setExpanded(false);
                  setTitle('');
                  setUrl('');
                }}
              >
                <Text style={[styles.btnText, { color: colors.foreground, fontFamily: fonts.body }]}>
                  cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.saveBtn, { backgroundColor: url.trim() ? colors.foreground : colors.muted }]}
                onPress={handleSave}
                disabled={!url.trim()}
              >
                <Text
                  style={[
                    styles.btnText,
                    { color: url.trim() ? colors.background : colors.mutedForeground, fontFamily: fonts.body },
                  ]}
                >
                  save
                </Text>
              </Pressable>
            </View>
          </View>
        </CardContent>
      )}
      {justSaved && !expanded && (
        <CardContent>
          <View style={styles.savedRow}>
            <Check size={14} color={colors.foreground} strokeWidth={2} />
            <Text style={[styles.savedText, { color: colors.foreground, fontFamily: fonts.body }]}>
              bookmark saved
            </Text>
          </View>
        </CardContent>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  form: {
    gap: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 12,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    flex: 1,
    height: 36,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  savedText: {
    fontSize: 13,
    textTransform: 'lowercase',
  },
});
