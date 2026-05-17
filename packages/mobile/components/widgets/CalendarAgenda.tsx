import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Linking, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import { useTheme, fonts } from '../../lib/theme';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Calendar as CalIcon, Clock, ChevronRight, AlertCircle } from 'lucide-react-native';
import { haptic } from '../../lib/haptics';

interface CalEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
}

export function CalendarAgenda() {
  const { colors } = useTheme();
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        setHasPermission(false);
        setLoading(false);
        return;
      }
      setHasPermission(true);

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const calIds = calendars.map((c) => c.id);

      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const raw = await Calendar.getEventsAsync(calIds, now, endOfDay);
      const mapped: CalEvent[] = raw.map((e) => ({
        id: e.id,
        title: e.title,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        allDay: e.allDay || false,
      }));

      mapped.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      setEvents(mapped.slice(0, 5));
    } catch {
      setHasPermission(false);
    }
    setLoading(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }).toLowerCase();
  };

  const isNow = (start: Date, end: Date) => {
    const now = new Date();
    return now >= start && now <= end;
  };

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerRow}>
          <CalIcon size={16} color={colors.foreground} strokeWidth={1.5} />
          <CardTitle>today's agenda</CardTitle>
        </View>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            loading...
          </Text>
        ) : hasPermission === false ? (
          <Pressable
            style={[styles.permissionBox, { borderColor: colors.border }]}
            onPress={async () => {
              haptic.light();
              if (Platform.OS === 'ios') {
                Linking.openSettings();
              } else {
                const { status } = await Calendar.requestCalendarPermissionsAsync();
                if (status === 'granted') loadEvents();
              }
            }}
          >
            <AlertCircle size={16} color={colors.mutedForeground} strokeWidth={1.5} />
            <Text style={[styles.permissionText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
              calendar access needed. tap to grant permission.
            </Text>
          </Pressable>
        ) : events.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
            no events remaining today
          </Text>
        ) : (
          <View style={styles.eventList}>
            {events.map((event, i) => {
              const current = !event.allDay && isNow(event.startDate, event.endDate);
              return (
                <View
                  key={event.id}
                  style={[
                    styles.eventRow,
                    i < events.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                    current && { backgroundColor: colors.muted },
                  ]}
                >
                  <View style={[styles.timeDot, { backgroundColor: current ? colors.primary : colors.border }]} />
                  <View style={styles.eventContent}>
                    <Text
                      style={[
                        styles.eventTitle,
                        { color: colors.foreground, fontFamily: fonts.body },
                      ]}
                      numberOfLines={1}
                    >
                      {event.title.toLowerCase()}
                    </Text>
                    <View style={styles.timeRow}>
                      <Clock size={11} color={colors.mutedForeground} strokeWidth={1.5} />
                      <Text style={[styles.timeText, { color: colors.mutedForeground, fontFamily: fonts.body }]}>
                        {event.allDay ? 'all day' : `${formatTime(event.startDate)} – ${formatTime(event.endDate)}`}
                      </Text>
                    </View>
                  </View>
                  {current && (
                    <Text style={[styles.nowBadge, { color: colors.foreground, fontFamily: fonts.body }]}>
                      now
                    </Text>
                  )}
                </View>
              );
            })}
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
  emptyText: { fontSize: 13, textTransform: 'lowercase', textAlign: 'center', paddingVertical: 8 },
  permissionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    padding: 12,
  },
  permissionText: { flex: 1, fontSize: 13, textTransform: 'lowercase', lineHeight: 18 },
  eventList: { gap: 0 },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  timeDot: { width: 6, height: 6 },
  eventContent: { flex: 1, gap: 2 },
  eventTitle: { fontSize: 14, textTransform: 'lowercase' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 11, textTransform: 'lowercase' },
  nowBadge: { fontSize: 11, fontWeight: '600', textTransform: 'lowercase' },
});
