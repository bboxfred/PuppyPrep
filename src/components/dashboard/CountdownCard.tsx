/**
 * COUNTDOWN / AGE CARD
 * Top card on dashboard showing pregnancy countdown or puppy age.
 * Gradient background, milestone labels, pulsing animation when overdue.
 */
import { useMemo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Phone, GraduationCap } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useCalendarStore } from '@/store/useCalendarStore';

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function getMilestoneLabel(dayAge: number): string | null {
  if (dayAge === 0) return 'Born today — colostrum window is open';
  if (dayAge >= 1 && dayAge <= 2) return 'Neonatal period — warmth is critical';
  if (dayAge >= 3 && dayAge <= 16) return `ENS exercises — Day ${dayAge - 2} of 14`;
  if (dayAge >= 10 && dayAge <= 14) return 'Eyes opening this week';
  if (dayAge === 14) return '🚨 First deworming due today';
  if (dayAge >= 21 && dayAge <= 24) return 'Weaning introduction begins';
  if (dayAge === 28) return '🚨 Second deworming due today';
  if (dayAge >= 42 && dayAge <= 44) return '🚨 Third deworming due — 3 days';
  if (dayAge === 42) return 'Week 6 — first vet visit & vaccinations';
  if (dayAge >= 49 && dayAge <= 56) return 'Preparing for rehoming';
  return null;
}

export function CountdownCard() {
  const router = useRouter();
  const status = usePuppyStore((s) => s.status);
  const breedName = usePuppyStore((s) => s.breedName);
  const dogName = usePuppyStore((s) => s.dogName);
  const birthDate = usePuppyStore((s) => s.birthDate);
  const estimatedDueDate = usePuppyStore((s) => s.estimatedDueDate);
  const events = useCalendarStore((s) => s.events);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { mainNumber, mainLabel, subtitle, milestone, isOverdue, isPregnant } = useMemo(() => {
    if (status === 'pregnant' && estimatedDueDate) {
      const due = new Date(estimatedDueDate);
      due.setHours(0, 0, 0, 0);
      const daysUntil = daysBetween(today, due);
      const overdue = daysUntil < 0;

      return {
        mainNumber: Math.abs(daysUntil),
        mainLabel: overdue ? 'days overdue' : 'days until due date',
        subtitle: overdue
          ? '⚠️ Overdue — contact your vet'
          : `Due: ${due.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][due.getMonth()]} ${due.getFullYear()}`,
        milestone: overdue ? 'Call your vet to discuss next steps' : null,
        isOverdue: overdue,
        isPregnant: true,
      };
    }

    if (status === 'born' && birthDate) {
      const birth = new Date(birthDate);
      birth.setHours(0, 0, 0, 0);
      const dayAge = daysBetween(birth, today);
      const graduationDay = 56;
      const daysToGraduation = graduationDay - dayAge;

      return {
        mainNumber: dayAge,
        mainLabel: dayAge === 0 ? 'Born today' : dayAge === 1 ? 'day old' : 'days old',
        subtitle: dayAge < 7
          ? `Week 1 of 8`
          : dayAge >= graduationDay
            ? '🎓 Graduation day!'
            : `Week ${Math.min(8, Math.ceil(dayAge / 7))} of 8 · ${daysToGraduation} days to graduation`,
        milestone: dayAge >= graduationDay ? 'Your puppies have graduated!' : getMilestoneLabel(dayAge),
        isOverdue: false,
        isPregnant: false,
      };
    }

    return { mainNumber: 0, mainLabel: '', subtitle: '', milestone: null, isOverdue: false, isPregnant: false };
  }, [status, estimatedDueDate, birthDate, today]);

  // Pulse animation for overdue state
  const pulseStyle = useAnimatedStyle(() => {
    if (!isOverdue) return { opacity: 1 };
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.6, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1, true
      ),
    };
  });

  // Next critical event
  const nextCritical = useMemo(() => {
    const upcoming = events
      .filter(e => e.priority === 'critical' && !e.completed && new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcoming[0] ?? null;
  }, [events, today]);

  const gradientColors: [string, string] = isOverdue
    ? ['#D4726A', '#C06058']
    : isPregnant
      ? [Colors.primary, Colors.tealLight]
      : [Colors.primary, '#5BA3A4'];

  return (
    <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      {/* Decorative circles */}
      <View style={styles.deco1} />
      <View style={styles.deco2} />

      {/* Dog info */}
      <View style={styles.topRow}>
        <Text style={styles.dogInfo}>
          {dogName ?? breedName ?? 'Your dog'}
        </Text>
        <Text style={styles.breedLabel}>{breedName}</Text>
      </View>

      {/* Main counter */}
      <Animated.View style={[styles.counterArea, pulseStyle]}>
        <Text style={styles.bigNumber}>{mainNumber}</Text>
        <Text style={styles.mainLabel}>{mainLabel}</Text>
      </Animated.View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Milestone */}
      {milestone && (
        <View style={styles.milestonePill}>
          <Text style={styles.milestoneText}>{milestone}</Text>
        </View>
      )}

      {/* Next critical event */}
      {nextCritical && !milestone && (
        <View style={styles.milestonePill}>
          <Text style={styles.milestoneText}>
            Next: {nextCritical.title}
          </Text>
        </View>
      )}

      {/* Emergency button for overdue */}
      {isOverdue && (
        <Pressable style={styles.emergencyBtn}>
          <Phone size={16} color="#FFF" />
          <Text style={styles.emergencyText}>Call Emergency Vet</Text>
        </Pressable>
      )}

      {/* Graduation button — shown at Day 56+ */}
      {!isPregnant && mainNumber >= 56 && (
        <Pressable
          onPress={() => router.push('/graduation' as any)}
          style={styles.graduationBtn}
        >
          <GraduationCap size={18} color={Colors.primary} />
          <Text style={styles.graduationText}>View Graduation 🎓</Text>
        </Pressable>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  deco1: { position: 'absolute', width: 150, height: 150, borderRadius: 75, backgroundColor: '#FFFFFF10', top: -40, right: -20 },
  deco2: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFFFFF08', bottom: 10, left: -15 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  dogInfo: { fontFamily: 'Nunito-Bold', fontSize: 16, color: '#FFFFFFD0' },
  breedLabel: { fontFamily: 'Quicksand-Medium', fontSize: 12, color: '#FFFFFF80' },
  counterArea: { alignItems: 'center', marginBottom: Spacing.sm },
  bigNumber: { fontFamily: 'Nunito-ExtraBold', fontSize: 72, color: '#FFFFFF', lineHeight: 80 },
  mainLabel: { fontFamily: 'Quicksand-Medium', fontSize: 16, color: '#FFFFFFC0', marginTop: -4 },
  subtitle: { fontFamily: 'Quicksand-Medium', fontSize: 14, color: '#FFFFFF90', textAlign: 'center', marginBottom: Spacing.sm },
  milestonePill: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: 16, paddingVertical: 6,
    borderRadius: Radius.pill, marginTop: Spacing.xs,
  },
  milestoneText: { fontFamily: 'Quicksand-SemiBold', fontSize: 13, color: '#FFFFFFE0' },
  emergencyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#FFFFFF25', borderRadius: Radius.pill,
    paddingVertical: 12, marginTop: Spacing.md,
  },
  emergencyText: { fontFamily: 'Nunito-Bold', fontSize: 15, color: '#FFF' },
  graduationBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#FFFFFFE0', borderRadius: Radius.pill,
    paddingVertical: 12, marginTop: Spacing.md,
  },
  graduationText: { fontFamily: 'Nunito-Bold', fontSize: 15, color: Colors.primary },
});
