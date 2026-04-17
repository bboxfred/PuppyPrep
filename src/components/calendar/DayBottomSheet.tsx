/**
 * DAY BOTTOM SHEET — Simple modal version (React 19 compatible)
 * Replaces @gorhom/bottom-sheet which has React 19 ref issues.
 */
import { useCallback, useMemo } from 'react';
import { View, Modal, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { EventCard } from './EventCard';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { formatDateHeader, sortByPriority } from '@/utils/calendar-helpers';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useUserStore } from '@/store/useUserStore';
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

interface DayBottomSheetProps {
  visible: boolean;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onClose: () => void;
}

export function DayBottomSheet({ visible, selectedDate, events, onClose }: DayBottomSheetProps) {
  const router = useRouter();
  const markCompleted = useCalendarStore((s) => s.markCompleted);
  const markUncompleted = useCalendarStore((s) => s.markUncompleted);
  const tier = useUserStore((s) => s.subscriptionTier);

  const sortedEvents = useMemo(() => sortByPriority(events), [events]);

  const handleEventPress = useCallback((event: CalendarEvent) => {
    onClose();
    setTimeout(() => router.push(`/event/${event.id}`), 200);
  }, [router, onClose]);

  const handleToggleComplete = useCallback((event: CalendarEvent) => {
    if (event.completed) markUncompleted(event.id);
    else markCompleted(event.id);
  }, [markCompleted, markUncompleted]);

  const isLocked = useCallback((event: CalendarEvent): boolean => {
    if (tier !== 'free') return false;
    return !event.is_free;
  }, [tier]);

  if (!selectedDate) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.overlayTouch} onPress={onClose} />

        <View style={styles.sheet}>
          {/* Handle + close */}
          <View style={styles.handleBar}>
            <View style={styles.handle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text variant="heading" weight="bold">{formatDateHeader(selectedDate)}</Text>
              <Text variant="caption" color={Colors.textSecondary}>
                {sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
              <X size={20} color={Colors.textSecondary} />
            </Pressable>
          </View>

          {/* Events */}
          {sortedEvents.length > 0 ? (
            <FlatList
              data={sortedEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <EventCard
                  event={item}
                  onPress={() => handleEventPress(item)}
                  onToggleComplete={() => handleToggleComplete(item)}
                  isLocked={isLocked(item)}
                />
              )}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🐾</Text>
              <Text variant="body" color={Colors.textSecondary} style={styles.emptyText}>
                Nothing scheduled — enjoy the quiet day
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  overlayTouch: {
    flex: 1,
  },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    maxHeight: '75%',
    paddingBottom: Spacing['2xl'],
  },
  handleBar: {
    alignItems: 'center',
    paddingTop: Spacing.sm + 4,
    paddingBottom: Spacing.xs,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.creamDark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.creamDark + '40',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.creamDark + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
  },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
  emptyText: { textAlign: 'center' },
});
