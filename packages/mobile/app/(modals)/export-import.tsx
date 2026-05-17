import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { exportAllData, importData } from '../../lib/data-manager';
import { X, Download, Upload, AlertTriangle } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

export default function ExportImportModal() {
  const { colors } = useTheme();
  const db = useDatabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await exportAllData(db);
      haptic.success();
    } catch (e: any) {
      Alert.alert('export failed', e.message || 'something went wrong');
      haptic.error();
    }
    setLoading(false);
  };

  const handleImport = async () => {
    Alert.alert(
      'import data',
      'this will replace all your current data. are you sure?',
      [
        { text: 'cancel', style: 'cancel' },
        {
          text: 'import',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            const result = await importData(db);
            setLoading(false);
            if (result.success) {
              haptic.success();
              Alert.alert('success', 'data imported successfully. restart the app for changes to take effect.');
              router.back();
            } else if (result.error !== 'cancelled') {
              haptic.error();
              Alert.alert('import failed', result.error || 'something went wrong');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.heading }]}>
          data
        </Text>
        <Pressable onPress={() => router.back()}>
          <X size={22} color={colors.foreground} strokeWidth={1.5} />
        </Pressable>
      </View>

      <View style={styles.content}>
        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.foreground} />
            <Text style={[styles.loadingText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              processing...
            </Text>
          </View>
        )}

        {/* Export */}
        <Pressable
          style={[styles.actionCard, { borderColor: colors.border }]}
          onPress={handleExport}
          disabled={loading}
        >
          <Download size={22} color={colors.foreground} strokeWidth={1.5} />
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.foreground, fontFamily: fonts.heading }]}>
              export data
            </Text>
            <Text style={[styles.actionDesc, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              save all your data as a json file. includes tasks, bookmarks, journal entries, habits, gym workouts, and settings.
            </Text>
          </View>
        </Pressable>

        {/* Import */}
        <Pressable
          style={[styles.actionCard, { borderColor: colors.border }]}
          onPress={handleImport}
          disabled={loading}
        >
          <Upload size={22} color={colors.foreground} strokeWidth={1.5} />
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.foreground, fontFamily: fonts.heading }]}>
              import data
            </Text>
            <Text style={[styles.actionDesc, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              restore from a previously exported json backup. this will replace all current data.
            </Text>
          </View>
        </Pressable>

        {/* Warning */}
        <View style={[styles.warningBox, { borderColor: colors.border }]}>
          <AlertTriangle size={16} color={colors.mutedForeground} strokeWidth={1.5} />
          <Text style={[styles.warningText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            your data never leaves your device. exports are stored locally and shared only when you choose to.
          </Text>
        </View>
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
  content: { padding: 20, gap: 16 },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    padding: 12,
  },
  loadingText: { fontSize: 13, textTransform: 'lowercase' },
  actionCard: {
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  actionContent: { flex: 1, gap: 6 },
  actionTitle: { fontSize: 15, fontWeight: '500', textTransform: 'lowercase' },
  actionDesc: { fontSize: 13, textTransform: 'lowercase', lineHeight: 18 },
  warningBox: {
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  warningText: { flex: 1, fontSize: 12, textTransform: 'lowercase', lineHeight: 18 },
});
