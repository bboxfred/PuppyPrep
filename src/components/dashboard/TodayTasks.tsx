/**
 * TODAY'S TASKS — shows events for today sorted by priority.
 * Completed tasks move to bottom. Max 8 shown with "Show more" button.
 */
import { useMemo, useCallback, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { EventCard } from '@/components/calendar/EventCard';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useUserStore } from '@/store/useUserStore';
import { toDateKey, sortByPriority } from '@/utils/calendar-helpers';
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

const MAX_VISIBLE = 8;

export function TodayTasks() {
  const router = useRouter();
  const events = useCalendarStore((s) => s.events);
  const markCompleted = useCalendarStore((s) => s.markCompleted);
  const markUncompleted = useCalendarStore((s) => s.markUncompleted);
  const tier = useUserStore((s) => s.subscriptionTier);
  const [showAll, setShowAll] = useState(false);

  const todayEvents = useMemo(() => {
    const todayStr = toDateKey(new Date());
    const dayEvents = events.filter(e => toDateKey(new Date(e.date)) === todayStr);
    // Sort: incomplete critical first, then incomplete others, then completed
    const incomplete = sortByPriority(dayEvents.filter(e => !e.completed));
    const completed = dayEvents.filter(e => e.completed);
    return [...incomplete, ...completed];
  }, [events]);

  const visibleEvents = showAll ? todayEvents : todayEvents.slice(0, MAX_VISIBLE);
  const hiddenCount = todayEvents.length - MAX_VISIBLE;
  const allDone = todayEvents.length > 0 && todayEvents.every(e => e.completed);

  const handleToggle = useCallback((event: CalendarEvent) => {
    if (event.completed) markUncompleted(event.id);
    else markCompleted(event.id);
  }, [markCompleted, markUncompleted]);

  const isLocked = useCallback((event: CalendarEvent) => {
    return tier === 'free' && !event.is_free;
  }, [tier]);

  if (todayEvents.length === 0) return null; // Empty state handled by parent

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading" weight="bold">Today's Tasks</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {todayEvents.filter(e => e.completed).length}/{todayEvents.length}
          </Text>
        </View>
      </View>

      {/* All done celebration */}
      {allDone && (
        <View style={styles.celebration}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text variant="body" weight="bold" color={Colors.primary}>
            All done for today!
          </Text>
          <Text variant="caption" color={Colors.textSecondary}>
            Your puppies are in good hands.
          </Text>
        </View>
      )}

      {/* Task list */}
      {visibleEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onPress={() => router.push(`/event/${event.id}`)}
          onToggleComplete={() => handleToggle(event)}
          isLocked={isLocked(event)}
        />
      ))}

      {/* Show more */}
      {!showAll && hiddenCount > 0 && (
        <Pressable onPress={() => setShowAll(true)} style={styles.showMore}>
          <Text variant="caption" weight="semibold" color={Colors.primary}>
            Show {hiddenCount} more task{hiddenCount !== 1 ? 's' : ''}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.lg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: Spacing.md,
  },
  countBadge: {
    backgroundColor: Colors.primary + '12', paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  countText: { fontSize: 13, fontFamily: 'Nunito-Bold', color: Colors.primary },
  celebration: {
    alignItems: 'center', backgroundColor: Colors.creamLight,
    borderRadius: Radius.md, padding: Spacing.lg, marginBottom: Spacing.md,
  },
  celebrationEmoji: { fontSize: 40, marginBottom: Spacing.sm },
  showMore: {
    alignItems: 'center', paddingVertical: Spacing.sm, marginTop: Spacing.xs,
  },
});
