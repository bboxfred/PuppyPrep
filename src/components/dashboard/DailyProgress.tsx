/**
 * DAILY PROGRESS — Field Journal summary card
 *
 * Shows today's completion ratio, a streak of 100%-done days, and the
 * next critical event preview — purely derived state, no new data model.
 * A small animated progress bar provides quiet visual feedback when the
 * user checks tasks off through the day.
 */
import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated';
import { Flame, AlertTriangle, CheckCircle2 } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
import { toDateKey } from '@/utils/calendar-helpers';

/** How many consecutive days (ending yesterday) hit 100% completion? */
function computeStreak(allEvents: ReturnType<typeof useCalendarStore.getState>['events']): number {
  const todayStr = toDateKey(new Date());
  const byDay = new Map<string, { total: number; done: number }>();
  for (const e of allEvents) {
    const key = toDateKey(new Date(e.date));
    if (key >= todayStr) continue; // only past days count toward streak
    const bucket = byDay.get(key) ?? { total: 0, done: 0 };
    bucket.total += 1;
    if (e.completed) bucket.done += 1;
    byDay.set(key, bucket);
  }

  let streak = 0;
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - 1); // start from yesterday
  cursor.setHours(0, 0, 0, 0);

  while (true) {
    const key = toDateKey(cursor);
    const bucket = byDay.get(key);
    // Only "full" days count — days with 0 events neither break nor extend
    if (!bucket || bucket.total === 0) break;
    if (bucket.done < bucket.total) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function DailyProgress() {
  const events = useCalendarStore((s) => s.events);
  const todayStr = toDateKey(new Date());

  const { done, total, progress, streak, nextCritical } = useMemo(() => {
    const todays = events.filter((e) => toDateKey(new Date(e.date)) === todayStr);
    const done = todays.filter((e) => e.completed).length;
    const total = todays.length;
    const progress = total > 0 ? done / total : 1; // 100% if no tasks today

    // Nearest upcoming task — today's uncompleted tasks first, then future.
    // Within a day, critical > high > recommended.
    const priorityRank: Record<string, number> = { critical: 0, high: 1, recommended: 2 };
    const todayMs = new Date(todayStr + 'T00:00:00').getTime();
    const upcoming = events
      .filter((e) => !e.completed && new Date(e.date).getTime() >= todayMs)
      .sort((a, b) => {
        const dA = new Date(a.date).setHours(0, 0, 0, 0);
        const dB = new Date(b.date).setHours(0, 0, 0, 0);
        if (dA !== dB) return dA - dB;
        return (priorityRank[a.priority] ?? 99) - (priorityRank[b.priority] ?? 99);
      });

    return {
      done,
      total,
      progress,
      streak: computeStreak(events),
      nextCritical: upcoming[0] ?? null,
    };
  }, [events, todayStr]);

  // Animated bar width
  const barStyle = useAnimatedStyle(() => ({
    width: withTiming(`${Math.round(progress * 100)}%`, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  // Count the days until the next critical event (for the label)
  const daysUntilCritical = nextCritical
    ? Math.max(
        0,
        Math.round(
          (new Date(toDateKey(new Date(nextCritical.date)) + 'T00:00:00').getTime() -
            new Date(todayStr + 'T00:00:00').getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : null;

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(420)} style={styles.card}>
      {/* Row 1 — Today's progress */}
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <CheckCircle2 size={18} color={Colors.forest} strokeWidth={1.75} />
        </View>
        <View style={styles.info}>
          <Text style={styles.rowTitle}>
            {total === 0 ? 'A quiet day' : `Today · ${done} of ${total} done`}
          </Text>
          <View style={styles.track}>
            <Animated.View style={[styles.fill, barStyle]} />
          </View>
        </View>
      </View>

      {/* Row 2 — Streak */}
      {streak > 0 && (
        <View style={[styles.row, styles.rowBorder]}>
          <View style={[styles.iconWrap, { backgroundColor: Colors.ochreBg }]}>
            <Flame size={18} color={Colors.ochre} strokeWidth={1.75} />
          </View>
          <View style={styles.info}>
            <Text style={styles.rowTitle}>
              {streak === 1 ? '1 day streak' : `${streak} days streak`}
            </Text>
            <Text style={styles.rowSub}>Every task done, every day. Keep it steady.</Text>
          </View>
        </View>
      )}

      {/* Row 3 — Nearest upcoming task (any priority) */}
      {nextCritical && (
        <View style={[styles.row, styles.rowBorder]}>
          <View style={[
            styles.iconWrap,
            { backgroundColor: nextCritical.priority === 'critical' ? Colors.criticalBg : nextCritical.priority === 'high' ? Colors.ochreBg : Colors.mossBg },
          ]}>
            <AlertTriangle
              size={18}
              color={nextCritical.priority === 'critical' ? Colors.critical : nextCritical.priority === 'high' ? Colors.ochre : Colors.moss}
              strokeWidth={1.75}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.rowTitle}>
              {daysUntilCritical === 0
                ? 'Today'
                : daysUntilCritical === 1
                ? 'Tomorrow'
                : `In ${daysUntilCritical} days`}
            </Text>
            <Text style={styles.rowSub} numberOfLines={1}>
              {nextCritical.title}
            </Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm + 2,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.mossBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 16,
    lineHeight: 20,
    color: Colors.ink,
    marginBottom: 3,
  },
  rowSub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.inkSoft,
  },
  track: {
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.rule + '60',
    overflow: 'hidden',
    marginTop: 4,
  },
  fill: {
    height: 5,
    backgroundColor: Colors.forest,
    borderRadius: 3,
  },
});
