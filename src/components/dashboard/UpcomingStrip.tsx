/**
 * UPCOMING EVENTS — Horizontal scrollable strip showing next 7 days.
 */
import { useMemo } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Shadows } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
import { toDateKey, getCategoryDots } from '@/utils/calendar-helpers';

const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function UpcomingStrip() {
  const events = useCalendarStore((s) => s.events);
  const router = useRouter();

  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i + 1); // Start from tomorrow
      const key = toDateKey(d);
      const dayEvents = events.filter(e => toDateKey(new Date(e.date)) === key);
      const dots = getCategoryDots(dayEvents);
      const titles = dayEvents.slice(0, 2).map(e => e.title);
      return {
        date: d,
        key,
        dayName: i === 0 ? 'Tomorrow' : DAYS_SHORT[d.getDay()],
        dateLabel: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
        eventCount: dayEvents.length,
        titles,
        dots,
      };
    });
  }, [events]);

  if (events.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text variant="heading" weight="bold" style={styles.title}>Upcoming</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {days.map((day) => (
          <Pressable
            key={day.key}
            style={({ pressed }) => [styles.dayCard, pressed && { opacity: 0.85 }]}
            onPress={() => router.push('/(tabs)/calendar')}
          >
            <Text variant="caption" weight="semibold" color={Colors.primary}>{day.dayName}</Text>
            <Text variant="caption" color={Colors.textSecondary}>{day.dateLabel}</Text>

            {day.titles.length > 0 ? (
              day.titles.map((t, i) => (
                <Text key={i} variant="caption" color={Colors.textPrimary} numberOfLines={1} style={styles.eventTitle}>
                  {t}
                </Text>
              ))
            ) : (
              <Text variant="caption" color={Colors.textLight} style={styles.eventTitle}>No events</Text>
            )}

            <View style={styles.dotRow}>
              {day.dots.map((dot, i) => (
                <View key={i} style={[styles.dot, { backgroundColor: dot.color }]} />
              ))}
              {day.eventCount > 2 && (
                <Text style={styles.moreCount}>+{day.eventCount - 2}</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.lg },
  title: { marginBottom: Spacing.sm },
  scrollContent: { gap: Spacing.sm, paddingRight: Spacing.md },
  dayCard: {
    width: 140, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.sm + 4, ...Shadows.card,
  },
  eventTitle: { marginTop: 4, fontSize: 12, lineHeight: 16 },
  dotRow: { flexDirection: 'row', gap: 4, marginTop: 6, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3 },
  moreCount: { fontSize: 10, color: Colors.textLight, fontFamily: 'DMSans-Medium' },
});
