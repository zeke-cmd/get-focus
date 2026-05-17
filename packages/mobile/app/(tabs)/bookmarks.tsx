import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { bookmarks } from '../../db/schema';
import { eq, desc, like } from 'drizzle-orm';
import {
  Search,
  Plus,
  Star,
  ExternalLink,
  Trash2,
  BookOpen,
} from 'lucide-react-native';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SkeletonList } from '../../components/ui/Skeleton';
import { SwipeToDelete } from '../../components/ui/SwipeToDelete';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

type Category = 'all' | 'article' | 'video' | 'documentation' | 'tool' | 'other';

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'article', label: 'articles' },
  { key: 'video', label: 'videos' },
  { key: 'documentation', label: 'docs' },
  { key: 'tool', label: 'tools' },
];

export default function BookmarksScreen() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');

  const load = useCallback(async () => {
    let rows = await db.select().from(bookmarks).orderBy(desc(bookmarks.createdAt));
    if (category !== 'all') {
      rows = rows.filter((r) => r.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.url.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q))
      );
    }
    setList(rows);
    setLoading(false);
  }, [category, search]);

  useEffect(() => {
    load();
  }, [load]);

  // Reload when coming back from edit modal
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const toggleFavorite = async (id: string, current: boolean) => {
    haptic.light();
    await db.update(bookmarks).set({ isFavorite: !current }).where(eq(bookmarks.id, id));
    load();
  };

  const toggleRead = async (id: string, current: boolean) => {
    await db.update(bookmarks).set({
      isRead: !current,
      readAt: !current ? new Date().toISOString() : null,
    }).where(eq(bookmarks.id, id));
    load();
  };

  const deleteBookmark = async (id: string) => {
    haptic.light();
    await db.delete(bookmarks).where(eq(bookmarks.id, id));
    load();
  };

  const openUrl = (url: string) => {
    Linking.openURL(url.startsWith('http') ? url : `https://${url}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          bookmarks
        </Text>
        <Text style={[styles.count, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
          {list.length} saved
        </Text>
      </View>

      {/* Search */}
      <View style={[styles.searchRow, { borderColor: colors.border }]}>
        <Search size={16} color={colors.mutedForeground} strokeWidth={1.5} />
        <TextInput
          style={[styles.searchInput, { color: colors.foreground, fontFamily: fonts.body }]}
          placeholder="search bookmarks..."
          placeholderTextColor={colors.mutedForeground}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />
      </View>

      {/* Category tabs */}
      <View style={styles.categories}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.key}
            style={[
              styles.catTab,
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

      {/* List */}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <SwipeToDelete onDelete={() => deleteBookmark(item.id)}>
            <Pressable
              style={[styles.bookmarkCard, { borderColor: colors.border }]}
              onPress={() => {
                haptic.light();
                router.push({ pathname: '/(modals)/bookmark-detail', params: { id: item.id } });
              }}
            >
              <View style={styles.bookmarkTop}>
                <View style={styles.bookmarkInfo}>
                  <Text
                    style={[styles.bookmarkTitle, { color: colors.foreground, fontFamily: fonts.body }]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.bookmarkUrl, { color: colors.mutedForeground, fontFamily: fonts.body }]}
                    numberOfLines={1}
                  >
                    {item.url}
                  </Text>
                </View>
                <View style={styles.bookmarkActions}>
                  <Pressable onPress={(e) => { e.stopPropagation(); toggleFavorite(item.id, item.isFavorite); }} hitSlop={8}>
                    <Star
                      size={16}
                      color={item.isFavorite ? colors.foreground : colors.mutedForeground}
                      fill={item.isFavorite ? colors.foreground : 'none'}
                      strokeWidth={1.5}
                    />
                  </Pressable>
                  <Pressable onPress={(e) => { e.stopPropagation(); openUrl(item.url); }} hitSlop={8}>
                    <ExternalLink size={16} color={colors.mutedForeground} strokeWidth={1.5} />
                  </Pressable>
                </View>
              </View>
              <View style={styles.bookmarkMeta}>
                <Badge label={item.category} variant="outline" />
                {item.isRead && <Badge label="read" variant="muted" />}
              </View>
            </Pressable>
          </SwipeToDelete>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <BookOpen size={32} color={colors.mutedForeground} strokeWidth={1} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              no bookmarks yet
            </Text>
          </View>
        }
      />

      {/* FAB */}
      <Pressable
        style={[styles.fab, { backgroundColor: colors.foreground }]}
        onPress={() => {
          haptic.light();
          router.push('/(modals)/bookmark-detail');
        }}
        accessibilityLabel="add bookmark"
        accessibilityRole="button"
      >
        <Plus size={22} color={colors.background} strokeWidth={2} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    paddingBottom: 12,
    gap: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    textTransform: 'lowercase',
  },
  count: {
    fontSize: 13,
    textTransform: 'lowercase',
  },
  searchRow: {
    marginHorizontal: 20,
    height: 44,
    borderWidth: 1,
    borderRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 0,
  },
  catTab: {
    paddingHorizontal: 12,
    height: 28,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -1,
  },
  catText: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  list: {
    padding: 20,
    paddingTop: 0,
    gap: 0,
  },
  bookmarkCard: {
    borderWidth: 1,
    borderRadius: 0,
    padding: 16,
    gap: 10,
    marginBottom: -1,
  },
  bookmarkTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bookmarkInfo: {
    flex: 1,
    gap: 2,
  },
  bookmarkTitle: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  bookmarkUrl: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  bookmarkActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 2,
  },
  bookmarkMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    textTransform: 'lowercase',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
