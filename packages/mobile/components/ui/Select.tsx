import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, FlatList } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { ChevronDown, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export function Select({ label, placeholder = 'select...', options, value, onValueChange, error }: SelectProps) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
          {label}
        </Text>
      )}
      <Pressable
        style={[
          styles.trigger,
          { borderColor: error ? colors.foreground : colors.border },
        ]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[
            styles.triggerText,
            {
              color: selected ? colors.foreground : colors.mutedForeground,
              fontFamily: fonts.body,
            },
          ]}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <ChevronDown size={18} color={colors.mutedForeground} strokeWidth={1.5} />
      </Pressable>
      {error && (
        <Text style={[styles.error, { color: colors.foreground, fontFamily: fonts.body }]}>
          {error}
        </Text>
      )}

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(o) => o.value}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.option, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    onValueChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: colors.foreground, fontFamily: fonts.body },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Check size={16} color={colors.foreground} strokeWidth={2} />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  trigger: {
    height: 48,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: {
    fontSize: 16,
    textTransform: 'lowercase',
  },
  error: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 32,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 0,
    maxHeight: 300,
  },
  option: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    textTransform: 'lowercase',
  },
});
