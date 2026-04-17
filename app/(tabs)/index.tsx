/**
 * DASHBOARD / TODAY VIEW
 * Main screen after onboarding. Shows countdown, tasks, upcoming, actions.
 */
import { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, RefreshControl, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Bell } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { CountdownCard } from '@/components/dashboard/CountdownCard';
import { TodayTasks } from '@/components/dashboard/TodayTasks';
import { UpcomingStrip } from '@/components/dashboard/UpcomingStrip';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { DamHealthBanner } from '@/components/dashboard/DamHealthBanner';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useUserStore } from '@/store/useUserStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { toDateKey } from '@/utils/calendar-helpers';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const router = useRouter();
  const events = useCalendarStore((s) => s.events);
  const dogName = usePuppyStore((s) => s.dogName);
  const breedName = usePuppyStore((s) => s.breedName);
  const birthDate = usePuppyStore((s) => s.birthDate);
  const tier = useUserStore((s) => s.subscriptionTier);
  const [refreshing, setRefreshing] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

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
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text variant="caption" color={Colors.textSecondary}>{getGreeting()}</Text>
          <Text variant="heading" weight="bold">
            {dogName ?? breedName ?? 'Puppy Prep'}
          </Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconBtn}>
            <Bell size={20} color={Colors.textPrimary} strokeWidth={2} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Settings size={20} color={Colors.textPrimary} strokeWidth={2} />
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

        {/* Free tier nudge */}
        {showFreeTierNudge && (
          <View style={styles.nudgeBanner}>
            <Text variant="body" weight="semibold" color={Colors.textPrimary}>
              Enjoying Puppy Prep?
            </Text>
            <Text variant="caption" color={Colors.textSecondary} style={styles.nudgeText}>
              Your free trial ends in {Math.max(0, 14 - trialDays)} days. Keep everything unlocked for S$12.99.
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.creamDark + '20',
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
});
