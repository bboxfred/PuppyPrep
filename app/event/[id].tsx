/**
 * EVENT DETAIL SCREEN
 * Full event view with title, detail text, vet callout, actions.
 */
import { useMemo, useCallback } from 'react';
import { View, ScrollView, Pressable, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Share2, Clock, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useUserStore } from '@/store/useUserStore';
import { formatDateDisplay } from '@/utils/calendar-helpers';

const PRIORITY_CONFIG: Record<string, { label: string; bg: string }> = {
  critical:    { label: 'CRITICAL', bg: '#D4726A' },
  high:        { label: 'HIGH',     bg: '#D4A84B' },
  recommended: { label: 'Recommended', bg: '#3D8B8C' },
};

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const events = useCalendarStore((s) => s.events);
  const markCompleted = useCalendarStore((s) => s.markCompleted);
  const markUncompleted = useCalendarStore((s) => s.markUncompleted);
  const snoozeEvent = useCalendarStore((s) => s.snoozeEvent);
  const tier = useUserStore((s) => s.subscriptionTier);

  const event = useMemo(() => events.find(e => e.id === id), [events, id]);

  const isLocked = event && tier === 'free' && !event.is_free;
  const priority = event ? PRIORITY_CONFIG[event.priority] ?? PRIORITY_CONFIG.recommended : PRIORITY_CONFIG.recommended;

  const handleToggleComplete = useCallback(() => {
    if (!event) return;
    if (event.completed) {
      markUncompleted(event.id);
    } else {
      markCompleted(event.id);
      router.back(); // Return to home after marking done
    }
  }, [event, markCompleted, markUncompleted, router]);

  const handleSnooze = useCallback((hours: number) => {
    if (!event) return;
    const until = new Date();
    until.setHours(until.getHours() + hours);
    snoozeEvent(event.id, until.toISOString());
    router.back();
  }, [event, snoozeEvent, router]);

  const handleShare = useCallback(() => {
    if (!event) return;
    const text = `${event.title}\n${formatDateDisplay(new Date(event.date))}\n\n${event.description}`;
    // Clipboard API — works on web and native
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      Alert.alert('Copied', 'Event details copied to clipboard');
    }
  }, [event]);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text variant="heading">Event not found</Text>
          <Button title="Go back" onPress={() => router.back()} style={styles.backBtn} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with category color */}
      <View style={[styles.header, { backgroundColor: event.category_color }]}>
        <Pressable onPress={() => router.back()} style={styles.headerBack} hitSlop={12}>
          <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
        </Pressable>
        <View style={styles.headerContent}>
          <View style={[styles.priorityPill, { backgroundColor: '#FFFFFF30' }]}>
            <Text style={styles.priorityLabel}>{priority.label}</Text>
          </View>
          <Text style={styles.headerTitle}>{event.title}</Text>
          <Text style={styles.headerDate}>{formatDateDisplay(new Date(event.date))}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Locked paywall */}
        {isLocked ? (
          <Card style={styles.paywallCard}>
            <Text variant="heading" weight="bold" style={styles.paywallTitle}>
              Upgrade to see full details
            </Text>
            <Text variant="body" color={Colors.textSecondary} style={styles.paywallText}>
              This event is part of the full care calendar. Upgrade to Puppy Prep Pro to unlock all events.
            </Text>
            <Button title="Upgrade to Pro — S$12.99" onPress={() => router.push('/paywall' as any)} style={styles.paywallBtn} />
          </Card>
        ) : (
          <>
            {/* Detail text */}
            <Card style={styles.detailCard}>
              <Text variant="body" style={styles.detailText}>{event.detail}</Text>
            </Card>

            {/* Vet callout */}
            {event.call_vet_if && (
              <Card style={styles.vetCard}>
                <Text variant="body" weight="bold" color="#D4726A">
                  🚨 Call your vet if:
                </Text>
                <Text variant="body" color={Colors.textPrimary} style={styles.vetText}>
                  {event.call_vet_if}
                </Text>
              </Card>
            )}

            {/* Emergency contact */}
            {event.emergency_contact_recommended && (
              <Pressable style={styles.emergencyBtn}>
                <Phone size={18} color="#FFF" />
                <Text variant="body" weight="bold" color="#FFF">
                  Emergency Vet Contacts
                </Text>
              </Pressable>
            )}

            {/* Vet action */}
            {event.vet_action && (
              <Card style={styles.actionCard}>
                <Text variant="caption" weight="semibold" color={Colors.primary}>
                  Vet action needed:
                </Text>
                <Text variant="body" color={Colors.textPrimary}>{event.vet_action}</Text>
              </Card>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom actions */}
      {!isLocked && (
        <View style={styles.bottomActions}>
          {/* Main action row — Not Yet + Mark Done side by side */}
          <View style={styles.mainActionRow}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.notYetBtn, pressed && { opacity: 0.7 }]}
            >
              <Text variant="body" weight="semibold" color={Colors.textSecondary}>Not yet</Text>
            </Pressable>
            <Button
              title={event.completed ? '✓ Completed' : 'Mark as Done'}
              variant={event.completed ? 'secondary' : 'primary'}
              onPress={handleToggleComplete}
              style={styles.doneBtn}
            />
          </View>

          <View style={styles.secondaryActions}>
            {/* Snooze */}
            <Pressable onPress={() => handleSnooze(1)} style={styles.actionPill}>
              <Clock size={14} color={Colors.primary} />
              <Text variant="caption" weight="semibold" color={Colors.primary}>1hr</Text>
            </Pressable>
            <Pressable onPress={() => handleSnooze(24)} style={styles.actionPill}>
              <Clock size={14} color={Colors.primary} />
              <Text variant="caption" weight="semibold" color={Colors.primary}>Tomorrow</Text>
            </Pressable>
            <Pressable onPress={() => handleSnooze(72)} style={styles.actionPill}>
              <Clock size={14} color={Colors.primary} />
              <Text variant="caption" weight="semibold" color={Colors.primary}>3 days</Text>
            </Pressable>

            {/* Share */}
            <Pressable onPress={handleShare} style={styles.actionPill}>
              <Share2 size={14} color={Colors.primary} />
              <Text variant="caption" weight="semibold" color={Colors.primary}>Share</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  headerBack: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFFFFF20', alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  headerContent: {},
  priorityPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: Radius.pill, marginBottom: Spacing.sm,
  },
  priorityLabel: { fontSize: 11, fontWeight: '700', color: '#FFF', letterSpacing: 0.5 },
  headerTitle: {
    fontFamily: 'Nunito-ExtraBold', fontSize: 24, color: '#FFF',
    lineHeight: 32, marginBottom: 4,
  },
  headerDate: { fontFamily: 'Quicksand-Medium', fontSize: 14, color: '#FFFFFFB0' },

  // Content
  scroll: { flex: 1 },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  detailCard: { marginBottom: Spacing.md },
  detailText: { lineHeight: 24 },
  vetCard: {
    marginBottom: Spacing.md,
    backgroundColor: '#D4726A10',
    borderWidth: 1, borderColor: '#D4726A30',
  },
  vetText: { marginTop: Spacing.xs, lineHeight: 22 },
  emergencyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: '#D4726A', borderRadius: Radius.pill,
    padding: Spacing.md, justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  actionCard: { marginBottom: Spacing.md },

  // Paywall
  paywallCard: { alignItems: 'center', padding: Spacing.xl },
  paywallTitle: { textAlign: 'center', marginBottom: Spacing.sm },
  paywallText: { textAlign: 'center', marginBottom: Spacing.lg, lineHeight: 22 },
  paywallBtn: {},

  // Bottom actions
  bottomActions: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.creamDark + '40',
  },
  mainActionRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  notYetBtn: {
    flex: 1, height: 54, borderRadius: Radius.pill,
    backgroundColor: Colors.creamLight, borderWidth: 2, borderColor: Colors.creamDark,
    alignItems: 'center', justifyContent: 'center',
  },
  doneBtn: { flex: 1 },
  secondaryActions: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm,
  },
  actionPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primary + '08',
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: Radius.pill,
  },

  // Not found
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backBtn: { marginTop: Spacing.lg },
});
