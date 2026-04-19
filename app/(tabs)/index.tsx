/**
 * DASHBOARD / TODAY VIEW
 * Main screen after onboarding. Shows countdown, tasks, upcoming, actions.
 */
import { useState, useCallback, useMemo, useEffect } from 'react';
import { refreshWidget } from '@/widgets/widget-data';
import { View, ScrollView, RefreshControl, Pressable, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Bell, BellOff } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { CountdownCard } from '@/components/dashboard/CountdownCard';
import { DailyProgress } from '@/components/dashboard/DailyProgress';
import { NotificationsModal } from '@/components/dashboard/NotificationsModal';
import { RecordBirthModal } from '@/components/dashboard/RecordBirthModal';
import { PuppiesArrivedCta } from '@/components/dashboard/PuppiesArrivedCta';
import { WidgetSetupCard } from '@/components/dashboard/WidgetSetupCard';
import { TodayTasks } from '@/components/dashboard/TodayTasks';
import { UpcomingStrip } from '@/components/dashboard/UpcomingStrip';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { DamHealthBanner } from '@/components/dashboard/DamHealthBanner';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useUserStore } from '@/store/useUserStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { toDateKey } from '@/utils/calendar-helpers';

const PUPPY_PREP_LOGO = require('../../assets/images/puppyprep-logo.png');

export default function DashboardScreen() {
  const router = useRouter();
  const events = useCalendarStore((s) => s.events);
  const dogName = usePuppyStore((s) => s.dogName);
  const breedName = usePuppyStore((s) => s.breedName);
  const birthDate = usePuppyStore((s) => s.birthDate);
  const tier = useUserStore((s) => s.subscriptionTier);
  const status = usePuppyStore((s) => s.status);
  const estimatedDueDate = usePuppyStore((s) => s.estimatedDueDate);
  const [refreshing, setRefreshing] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [recordBirthOpen, setRecordBirthOpen] = useState(false);

  // Refresh the Android home-screen widget every time the dashboard mounts.
  // Battery-friendly: widget has no scheduled periodic refresh — it updates
  // only on user interaction (opening the app) and key mutations.
  useEffect(() => { refreshWidget(); }, [events.length]);

  // Show "puppies arrived?" CTA when dog is still pregnant
  const showBirthCta = status === 'pregnant';
  // Is the dog overdue? (estimated due date is in the past)
  const isOverdue = useMemo(() => {
    if (!estimatedDueDate) return false;
    const due = new Date(estimatedDueDate);
    due.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today > due;
  }, [estimatedDueDate]);

  const todayStr = toDateKey(new Date());
  const todayEventCount = useMemo(() =>
    events.filter(e => toDateKey(new Date(e.date)) === todayStr).length,
    [events, todayStr]
  );

  // Day age for free tier check
  const dayAge = useMemo(() => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    birth.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  }, [birthDate]);

  // Soft nudge after day 10 of trial — never during onboarding or first 10 days
  const trialDays = useMemo(() => {
    const start = useUserStore.getState().trialStartDate;
    if (!start) return 0;
    return Math.floor((Date.now() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
  }, []);
  const showFreeTierNudge = tier === 'free' && trialDays >= 10 && !nudgeDismissed;

  // First event date (for empty state)
  const firstEventDate = useMemo(() => {
    const upcoming = events
      .filter(e => new Date(e.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcoming[0]?.date ? new Date(upcoming[0].date) : null;
  }, [events]);

  // Unread badge count (critical incomplete events for today)
  const unreadCount = useMemo(() =>
    events.filter(e =>
      toDateKey(new Date(e.date)) === todayStr && e.priority === 'critical' && !e.completed
    ).length,
    [events, todayStr]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh — in production this would re-fetch from Supabase
    await new Promise(r => setTimeout(r, 800));
    setRefreshing(false);
  }, []);

  // Empty state: no events at all
  if (events.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.emptyAll}>
          <Text style={styles.emptyEmoji}>🐾</Text>
          <Text variant="heading" weight="bold" style={styles.emptyTitle}>
            Your calendar is ready
          </Text>
          {firstEventDate ? (
            <Text variant="body" color={Colors.textSecondary} style={styles.emptyText}>
              Your first task is on {firstEventDate.getDate()}{' '}
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][firstEventDate.getMonth()]}
            </Text>
          ) : (
            <Text variant="body" color={Colors.textSecondary} style={styles.emptyText}>
              Complete the onboarding to generate your care calendar.
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header — Puppy Prep logo */}
      <View style={styles.header}>
        <Image source={PUPPY_PREP_LOGO} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerIcons}>
          <Pressable
            onPress={() => setNotifModalOpen(true)}
            style={styles.iconBtn}
            hitSlop={12}
          >
            {/* BellOff + slash when notifications are unavailable (free tier);
                Bell when active (paid). */}
            {tier === 'free' ? (
              <BellOff size={20} color={Colors.inkSoft} strokeWidth={1.75} />
            ) : (
              <Bell size={20} color={Colors.ink} strokeWidth={1.75} />
            )}
            {tier !== 'free' && unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/settings' as any)}
            style={styles.iconBtn}
            hitSlop={12}
          >
            <Settings size={20} color={Colors.ink} strokeWidth={1.75} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
      >
        {/* Countdown / Age card */}
        <CountdownCard />

        {/* "Puppies arrived?" CTA — animated gold card, red variant when overdue */}
        {showBirthCta && (
          <PuppiesArrivedCta
            isOverdue={isOverdue}
            onPress={() => setRecordBirthOpen(true)}
          />
        )}

        {/* One-time prompt: place the home-screen widget (Android only).
            Card auto-hides on iOS / web and after the user confirms
            placement or dismisses it. */}
        <WidgetSetupCard />

        {/* NEW: Daily progress summary — today's completion, streak, next critical */}
        <DailyProgress />

        {/* Dam health banners */}
        <DamHealthBanner />

        {/* Today's tasks */}
        {todayEventCount > 0 ? (
          <TodayTasks />
        ) : (
          <View style={styles.noTasksToday}>
            <Text style={styles.noTasksEmoji}>☀️</Text>
            <Text variant="body" weight="semibold" color={Colors.textPrimary}>
              No tasks for today
            </Text>
            <Text variant="caption" color={Colors.textSecondary}>
              {firstEventDate
                ? `Next task on ${firstEventDate.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][firstEventDate.getMonth()]}`
                : 'Enjoy the quiet day'}
            </Text>
          </View>
        )}

        {/* Free tier nudge — positions Pro as the calendar/reminders/tracker
            upgrade. The library stays free for everyone, always. */}
        {showFreeTierNudge && (
          <View style={styles.nudgeBanner}>
            <Text variant="body" weight="semibold" color={Colors.textPrimary}>
              Enjoying Puppy Prep?
            </Text>
            <Text variant="caption" color={Colors.textSecondary} style={styles.nudgeText}>
              Your trial ends in {Math.max(0, 14 - trialDays)} days. Keep the personalised calendar, reminders, and weight tracker for S$12.99 — one payment. The Info Library stays free either way.
            </Text>
            <View style={styles.nudgeButtons}>
              <Pressable onPress={() => setNudgeDismissed(true)} style={styles.nudgeDismiss}>
                <Text variant="caption" color={Colors.textLight}>Maybe later</Text>
              </Pressable>
              <Button title="Learn more" onPress={() => router.push('/paywall' as any)} style={styles.nudgeUpgrade} />
            </View>
          </View>
        )}

        {/* Quick actions */}
        <QuickActions />

        {/* Upcoming strip */}
        <UpcomingStrip />

        {/* Bottom spacer */}
        <View style={{ height: Spacing['2xl'] }} />
      </ScrollView>

      {/* In-app notifications modal (replaces browser confirm/alert) */}
      <NotificationsModal
        visible={notifModalOpen}
        tier={tier}
        unreadCount={unreadCount}
        onClose={() => setNotifModalOpen(false)}
        onUpgrade={() => {
          setNotifModalOpen(false);
          router.push('/paywall' as any);
        }}
      />

      {/* Record Birth modal — shown from the "Puppies arrived?" CTA. Transitions
          status from 'pregnant' to 'born' and regenerates the schedule. */}
      <RecordBirthModal
        visible={recordBirthOpen}
        onClose={() => setRecordBirthOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Header — logo on left, icons on right
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    backgroundColor: Colors.paper,
    borderBottomWidth: 1, borderBottomColor: Colors.rule,
  },
  logo: {
    // 2357x453 logo → width 160 gives height ~31, fits neatly in the bar
    width: 160,
    height: 40,
  },
  headerIcons: { flexDirection: 'row', gap: Spacing.sm },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute', top: -2, right: -2,
    backgroundColor: '#D4726A', width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.surface,
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#FFF' },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.lg },

  // No tasks today
  noTasksToday: {
    alignItems: 'center', backgroundColor: Colors.creamLight,
    borderRadius: Radius.md, padding: Spacing.lg, marginBottom: Spacing.lg,
  },
  noTasksEmoji: { fontSize: 36, marginBottom: Spacing.sm },

  // Free tier nudge
  nudgeBanner: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.lg,
    borderWidth: 1, borderColor: Colors.primary + '20',
  },
  nudgeText: { marginTop: 2, marginBottom: Spacing.sm },
  nudgeButtons: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: Spacing.md },
  nudgeDismiss: { paddingVertical: Spacing.xs },
  nudgeUpgrade: { paddingHorizontal: Spacing.lg, height: 38 },

  // Empty all
  emptyAll: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 56, marginBottom: Spacing.lg },
  emptyTitle: { textAlign: 'center', marginBottom: Spacing.sm },
  emptyText: { textAlign: 'center', lineHeight: 22 },

  // "Puppies arrived?" CTA — shown only when status = 'pregnant'. Sits
  // directly under the countdown. Forest accent normally; terracotta/red
  // tint when overdue so it reads as an urgent prompt.
  birthCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.forest + '10',
    borderWidth: 1.5,
    borderColor: Colors.forest + '40',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  birthCtaOverdue: {
    backgroundColor: '#D4726A15',
    borderColor: '#D4726A60',
  },
  birthCtaText: { flex: 1, gap: 2 },
  birthCtaTitle: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.forest,
  },
  birthCtaSub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.inkSoft,
  },
  birthCtaArrow: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Colors.forest,
    lineHeight: 28,
  },
});
