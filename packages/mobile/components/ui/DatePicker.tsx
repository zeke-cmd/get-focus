import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Platform } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { Calendar } from 'lucide-react-native';

interface DatePickerProps {
  label?: string;
  value: string; // YYYY-MM-DD
  onValueChange: (date: string) => void;
  placeholder?: string;
  error?: string;
}

// simple month/year/day picker without native deps
export function DatePicker({ label, value, onValueChange, placeholder = 'select date', error }: DatePickerProps) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  const parsed = value ? new Date(value + 'T00:00:00') : null;
  const [year, setYear] = useState(parsed?.getFullYear() ?? 2000);
  const [month, setMonth] = useState(parsed?.getMonth() ?? 0);
  const [day, setDay] = useState(parsed?.getDate() ?? 1);

  const months = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDisplay = () => {
    if (!value) return placeholder;
    return `${day} ${months[month]} ${year}`;
  };

  const handleConfirm = () => {
    const d = String(day).padStart(2, '0');
    const m = String(month + 1).padStart(2, '0');
    onValueChange(`${year}-${m}-${d}`);
    setOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
          {label}
        </Text>
      )}
      <Pressable
        style={[styles.trigger, { borderColor: error ? colors.foreground : colors.border }]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[
            styles.triggerText,
            { color: value ? colors.foreground : colors.mutedForeground, fontFamily: fonts.body },
          ]}
        >
          {formatDisplay()}
        </Text>
        <Calendar size={18} color={colors.mutedForeground} strokeWidth={1.5} />
      </Pressable>
      {error && (
        <Text style={[styles.error, { color: colors.foreground, fontFamily: fonts.body }]}>
          {error}
        </Text>
      )}

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable
            style={[styles.sheet, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={[styles.sheetTitle, { color: colors.foreground, fontFamily: fonts.heading }]}>
              date of birth
            </Text>

            {/* Year row */}
            <View style={styles.row}>
              <Pressable
                style={[styles.arrow, { borderColor: colors.border }]}
                onPress={() => setYear((y) => y - 1)}
              >
                <Text style={[styles.arrowText, { color: colors.foreground }]}>−</Text>
              </Pressable>
              <Text style={[styles.value, { color: colors.foreground, fontFamily: fonts.body }]}>
                {year}
              </Text>
              <Pressable
                style={[styles.arrow, { borderColor: colors.border }]}
                onPress={() => setYear((y) => Math.min(y + 1, new Date().getFullYear()))}
              >
                <Text style={[styles.arrowText, { color: colors.foreground }]}>+</Text>
              </Pressable>
            </View>

            {/* Month row */}
            <View style={styles.row}>
              <Pressable
                style={[styles.arrow, { borderColor: colors.border }]}
                onPress={() => setMonth((m) => (m > 0 ? m - 1 : 11))}
              >
                <Text style={[styles.arrowText, { color: colors.foreground }]}>−</Text>
              </Pressable>
              <Text style={[styles.value, { color: colors.foreground, fontFamily: fonts.body }]}>
                {months[month]}
              </Text>
              <Pressable
                style={[styles.arrow, { borderColor: colors.border }]}
                onPress={() => setMonth((m) => (m < 11 ? m + 1 : 0))}
              >
                <Text style={[styles.arrowText, { color: colors.foreground }]}>+</Text>
              </Pressable>
            </View>

            {/* Day row */}
            <View style={styles.row}>
              <Pressable
                style={[styles.arrow, { borderColor: colors.border }]}
                onPress={() => setDay((d) => (d > 1 ? d - 1 : daysInMonth))}
              >
                <Text style={[styles.arrowText, { color: colors.foreground }]}>−</Text>
              </Pressable>
              <Text style={[styles.value, { color: colors.foreground, fontFamily: fonts.body }]}>
                {String(day).padStart(2, '0')}
              </Text>
              <Pressable
                style={[styles.arrow, { borderColor: colors.border }]}
                onPress={() => setDay((d) => (d < daysInMonth ? d + 1 : 1))}
              >
                <Text style={[styles.arrowText, { color: colors.foreground }]}>+</Text>
              </Pressable>
            </View>

            <Pressable
              style={[styles.confirm, { backgroundColor: colors.foreground }]}
              onPress={handleConfirm}
            >
              <Text style={[styles.confirmText, { color: colors.background, fontFamily: fonts.body }]}>
                confirm
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { fontSize: 12, textTransform: 'lowercase' },
  trigger: {
    height: 48,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: { fontSize: 16, textTransform: 'lowercase' },
  error: { fontSize: 12, textTransform: 'lowercase' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 32,
  },
  sheet: {
    borderWidth: 1,
    borderRadius: 0,
    padding: 24,
    gap: 20,
  },
  sheetTitle: { fontSize: 18, textTransform: 'lowercase', textAlign: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  arrow: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: { fontSize: 20, fontWeight: '300' },
  value: {
    fontSize: 20,
    width: 80,
    textAlign: 'center',
  },
  confirm: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    marginTop: 4,
  },
  confirmText: { fontSize: 14, fontWeight: '500', textTransform: 'lowercase' },
});
