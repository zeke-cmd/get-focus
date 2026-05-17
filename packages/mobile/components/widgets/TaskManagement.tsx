import { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import { useTheme, fonts } from '../../lib/theme';
import { useDatabase } from '../../db/client';
import { tasks } from '../../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CheckSquare, Plus, Check, Trash2 } from 'lucide-react-native';
import { Badge } from '../ui/Badge';
import { haptic } from '../../lib/haptics';
import { randomUUID } from 'expo-crypto';

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

export function TaskManagement() {
  const { colors } = useTheme();
  const db = useDatabase();
  const [taskList, setTaskList] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [tab, setTab] = useState<'today' | 'upcoming' | 'completed'>('today');

  const loadTasks = useCallback(async () => {
    const today = getTodayStr();
    let rows: any[];

    if (tab === 'today') {
      rows = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.completed, false)))
        .orderBy(tasks.sortOrder);
      // filter to today or no date
      rows = rows.filter((t) => !t.dueDate || t.dueDate === today);
    } else if (tab === 'upcoming') {
      rows = await db
        .select()
        .from(tasks)
        .where(eq(tasks.completed, false))
        .orderBy(tasks.dueDate);
      rows = rows.filter((t) => t.dueDate && t.dueDate > today);
    } else {
      rows = await db
        .select()
        .from(tasks)
        .where(eq(tasks.completed, true))
        .orderBy(desc(tasks.completedAt))
        .limit(20);
    }
    setTaskList(rows);
  }, [tab]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async () => {
    if (!input.trim()) return;
    const id = randomUUID();
    await db.insert(tasks).values({
      id,
      title: input.trim(),
      completed: false,
      priority: 'medium',
      tags: '[]',
      isPending: true,
      sortOrder: 0,
      createdAt: new Date().toISOString(),
    });
    haptic.medium();
    setInput('');
    loadTasks();
  };

  const toggleTask = async (id: string, completed: boolean) => {
    haptic.medium();
    await db.update(tasks).set({
      completed: !completed,
      completedAt: !completed ? new Date().toISOString() : null,
    }).where(eq(tasks.id, id));
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    haptic.light();
    await db.delete(tasks).where(eq(tasks.id, id));
    loadTasks();
  };

  const tabs: { key: typeof tab; label: string }[] = [
    { key: 'today', label: 'today' },
    { key: 'upcoming', label: 'upcoming' },
    { key: 'completed', label: 'done' },
  ];

  const priorityColors: Record<string, string> = {
    high: 'p1',
    medium: 'p2',
    low: 'p3',
  };

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerRow}>
          <CheckSquare size={16} color={colors.foreground} strokeWidth={1.5} />
          <CardTitle>tasks</CardTitle>
          <Text style={[styles.count, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            {taskList.length}
          </Text>
        </View>
      </CardHeader>
      <CardContent>
        {/* Tabs */}
        <View style={styles.tabs}>
          {tabs.map((t) => (
            <Pressable
              key={t.key}
              style={[
                styles.tab,
                {
                  backgroundColor: tab === t.key ? colors.primary : 'transparent',
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                haptic.selection();
                setTab(t.key);
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: tab === t.key ? colors.primaryForeground : colors.mutedForeground,
                    fontFamily: fonts.body,
                  },
                ]}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Add task */}
        {tab !== 'completed' && (
          <View style={styles.addRow}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.foreground,
                  fontFamily: fonts.body,
                },
              ]}
              placeholder="add a task..."
              placeholderTextColor={colors.mutedForeground}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={addTask}
              returnKeyType="done"
            />
            <Pressable
              style={[styles.addBtn, { backgroundColor: colors.primary }]}
              onPress={addTask}
            >
              <Plus size={18} color={colors.primaryForeground} strokeWidth={2} />
            </Pressable>
          </View>
        )}

        {/* Task list */}
        {taskList.length === 0 ? (
          <Text style={[styles.empty, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            {tab === 'completed' ? 'no completed tasks yet' : 'no tasks — enjoy the calm'}
          </Text>
        ) : (
          <View style={styles.list}>
            {taskList.slice(0, 5).map((task) => (
              <View
                key={task.id}
                style={[styles.taskRow, { borderBottomColor: colors.border }]}
              >
                <Pressable
                  style={[
                    styles.checkbox,
                    {
                      borderColor: colors.border,
                      backgroundColor: task.completed ? colors.primary : 'transparent',
                    },
                  ]}
                  onPress={() => toggleTask(task.id, task.completed)}
                >
                  {task.completed && <Check size={12} color={colors.primaryForeground} strokeWidth={2} />}
                </Pressable>
                <Text
                  style={[
                    styles.taskTitle,
                    {
                      color: task.completed ? colors.mutedForeground : colors.foreground,
                      fontFamily: fonts.body,
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {task.title}
                </Text>
                {!task.completed && task.priority !== 'medium' && (
                  <Badge label={priorityColors[task.priority] || 'p2'} variant="outline" />
                )}
                <Pressable onPress={() => deleteTask(task.id)} hitSlop={8}>
                  <Trash2 size={14} color={colors.mutedForeground} strokeWidth={1.5} />
                </Pressable>
              </View>
            ))}
            {taskList.length > 5 && (
              <Text style={[styles.more, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                +{taskList.length - 5} more
              </Text>
            )}
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
  count: {
    fontSize: 12,
    marginLeft: 'auto',
  },
  tabs: {
    flexDirection: 'row',
    gap: 0,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -1,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 12,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    gap: 0,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  empty: {
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'lowercase',
    paddingVertical: 16,
  },
  more: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'lowercase',
    paddingTop: 8,
  },
});
