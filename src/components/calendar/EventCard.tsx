/**
 * EVENT CARD — shown in the day bottom sheet and event lists.
 *
 * Shows: category color bar, priority badge, title, description, done check.
 * Locked cards show for paid events on free tier.
 */
import { Pressable, View, StyleSheet } from 'react-native';
import { Lock, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Radius, Spacing, Shadows } from '@/constants/design-system';
import type { CalendarEvent } from '@/data/schedule-engine/event-builder';

interface EventCardProps {
  event: CalendarEvent;
  onPress: () => void;
  onToggleComplete?: () => void;
  isLocked?: boolean;
}

const PRIORITY_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  critical:    { label: 'CRITICAL', bg: '#D4726A', text: '#FFF' },
  high:        { label: 'HIGH',     bg: '#D4A84B', text: '#FFF' },
  recommended: { label: 'Rec.',     bg: '#3D8B8C', text: '#FFF' },
};

export function EventCard({ event, onPress, onToggleComplete, isLocked = false }: EventCardProps) {
  const priority = PRIORITY_LABELS[event.priority] ?? PRIORITY_LABELS.recommended;

  if (isLocked) {
    return (
      <View style={[styles.card, styles.lockedCard]}>
        <View style={[styles.categoryBar, { backgroundColor: Colors.textLight }]} />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Lock size={14} color={Colors.textLight} />
            <Text variant="caption" color={Colors.textLight} style={styles.lockedText}>
              Upgrade to see this event
            </Text>
          </View>
          <Text variant="body" color={Colors.textLight} numberOfLines={1} style={styles.lockedTitle}>
            {event.title}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
    >
      {/* Category color bar */}
      <View style={[styles.categoryBar, { backgroundColor: event.category_color }]} />

      <View style={styles.content}>
        {/* Priority badge + completed indicator */}
        <View style={styles.topRow}>
          <View style={[styles.priorityBadge, { backgroundColor: priority.bg }]}>
            <Text style={[styles.priorityText, { color: priority.text }]}>
              {priority.label}
            </Text>
          </View>

          {event.completed && (
            <View style={styles.doneBadge}>
              <Check size={12} color={Colors.success} strokeWidth={3} />
              <Text variant="caption" color={Colors.success} weight="semibold">Done</Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text variant="body" weight="semibold" numberOfLines={1} style={styles.title}>
          {event.title}
        </Text>

        {/* Description */}
        <Text variant="caption" color={Colors.textSecondary} numberOfLines={2} style={styles.desc}>
          {event.description}
        </Text>
      </View>

      {/* Completion toggle */}
      {onToggleComplete && (
        <Pressable onPress={onToggleComplete} style={styles.checkBtn} hitSlop={12}>
          <View style={[styles.checkbox, event.completed && styles.checkboxDone]}>
            {event.completed && <Check size={14} color="#FFF" strokeWidth={3} />}
          </View>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    ...Shadows.card,
  },
  lockedCard: {
    opacity: 0.6,
  },
  categoryBar: {
    width: 5,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    padding: Spacing.sm + 4,
    paddingLeft: Spacing.sm + 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  priorityBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  doneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    lineHeight: 17,
  },
  lockedText: {
    fontSize: 12,
  },
  lockedTitle: {
    fontSize: 13,
  },
  checkBtn: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm + 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: Colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
});
