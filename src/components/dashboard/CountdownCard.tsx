/**
 * COUNTDOWN / AGE CARD — Field Journal
 *
 * The hero card on the dashboard. Shows:
 *   - Pregnancy countdown (days until due date), or
 *   - Puppy age (days / weeks), or
 *   - Graduation state.
 *
 * Background is a forest-toned watercolor with faint ferns (card-countdown-bg.png)
 * with a forestDeep tint overlay to keep white text legible. Title is the
 * breed or dog name — set large in Young Serif. The small duplicate breed
 * label is removed per feedback.
 */
import { useMemo } from 'react';
import { View, Pressable, ImageBackground, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle, withRepeat, withTiming, withSequence,
  FadeIn, FadeInDown, FadeInUp,
  useSharedValue, Easing, withDelay, interpolate,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Phone, GraduationCap } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useCalendarStore } from '@/store/useCalendarStore';

const CARD_BG = require('../../../assets/images/card-countdown-bg.png');

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function getMilestoneLabel(dayAge: number): string | null {
  if (dayAge === 0) return 'Born today — colostrum window is open';
  if (dayAge >= 1 && dayAge <= 2) return 'Neonatal period — warmth is critical';
  if (dayAge >= 3 && dayAge <= 16) return `ENS exercises — Day ${dayAge - 2} of 14`;
  if (dayAge >= 10 && dayAge <= 14) return 'Eyes opening this week';
  if (dayAge === 14) return 'First deworming due today';
  if (dayAge >= 21 && dayAge <= 24) return 'Weaning introduction begins';
  if (dayAge === 28) return 'Second deworming due today';
  if (dayAge >= 42 && dayAge <= 44) return 'Third deworming due in 3 days';
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
          ? 'Overdue — contact your vet'
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
            ? 'Graduation day'
            : `Week ${Math.min(8, Math.ceil(dayAge / 7))} of 8 · ${daysToGraduation} days to graduation`,
        milestone: dayAge >= graduationDay ? 'Your puppies have graduated' : getMilestoneLabel(dayAge),
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

  // Soft edge-glow breathing — the card's inner border subtly fades
  // between 0.25 and 0.55 opacity every ~4s. Much quieter than a
  // shimmer sweep, and reads as "alive" without "loading".
  const glow = useSharedValue(0);
  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [glow]);
  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glow.value, [0, 1], [0.25, 0.65]),
  }));

  // Nearest upcoming task — prioritise TODAY's uncompleted tasks first,
  // then fall back to the nearest future task regardless of priority.
  // Within a given day, ties are broken by priority rank (critical > high > recommended).
  const nextCritical = useMemo(() => {
    const priorityRank: Record<string, number> = { critical: 0, high: 1, recommended: 2 };
    const todayMs = today.getTime();

    const upcoming = events
      .filter((e) => !e.completed && new Date(e.date).getTime() >= todayMs)
      .sort((a, b) => {
        const dA = new Date(a.date).setHours(0, 0, 0, 0);
        const dB = new Date(b.date).setHours(0, 0, 0, 0);
        if (dA !== dB) return dA - dB;
        return (priorityRank[a.priority] ?? 99) - (priorityRank[b.priority] ?? 99);
      });

    return upcoming[0] ?? null;
  }, [events, today]);

  return (
    <ImageBackground
      source={CARD_BG}
      style={styles.card}
      imageStyle={styles.cardBgImage}
      resizeMode="cover"
    >
      {/* Forest wash overlay — keeps text legible */}
      <View style={styles.tintOverlay} pointerEvents="none" />

      {/* Inner edge glow — fades between low/high opacity every ~4s so the
          card softly breathes. Warm cream border on a forest background. */}
      <Animated.View
        pointerEvents="none"
        style={[styles.edgeGlow, glowStyle]}
      />

      {/* Title — large breed/dog name in Young Serif, centralized */}
      <Animated.Text
        entering={FadeInDown.duration(400).delay(80)}
        style={styles.dogHeadline}
        numberOfLines={2}
      >
        {dogName ?? breedName ?? 'Your dog'}
      </Animated.Text>

      {/* Main counter — pulses on overdue, gently fades in on mount */}
      <Animated.View
        entering={FadeIn.duration(500).delay(140)}
        style={[styles.counterArea, pulseStyle]}
      >
        <Text style={styles.bigNumber}>{mainNumber}</Text>
        <Text style={styles.mainLabel}>{mainLabel}</Text>
      </Animated.View>

      {/* Subtitle */}
      {subtitle ? (
        <Animated.Text
          entering={FadeInUp.duration(400).delay(220)}
          style={styles.subtitle}
        >
          {subtitle}
        </Animated.Text>
      ) : null}

      {/* Milestone */}
      {milestone && (
        <View style={styles.milestonePill}>
          <Text style={styles.milestoneText}>{milestone}</Text>
        </View>
      )}

      {/* Nearest upcoming task — label distinguishes today vs tomorrow vs later */}
      {nextCritical && !milestone && (() => {
        const eventDate = new Date(nextCritical.date);
        eventDate.setHours(0, 0, 0, 0);
        const daysAway = Math.round((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const prefix =
          daysAway <= 0 ? 'Today'
          : daysAway === 1 ? 'Tomorrow'
          : `In ${daysAway} days`;
        return (
          <View style={styles.milestonePill}>
            <Text style={styles.milestoneText}>
              {prefix}: {nextCritical.title}
            </Text>
          </View>
        );
      })()}

      {/* Emergency button for overdue */}
      {isOverdue && (
        <Pressable style={styles.emergencyBtn}>
          <Phone size={16} color="#F5EDE0" strokeWidth={1.75} />
          <Text style={styles.emergencyText}>Call emergency vet</Text>
        </Pressable>
      )}

      {/* Graduation button — shown at Day 56+ */}
      {!isPregnant && mainNumber >= 56 && (
        <Pressable
          onPress={() => router.push('/graduation' as any)}
          style={styles.graduationBtn}
        >
          <GraduationCap size={18} color={Colors.forest} strokeWidth={1.75} />
          <Text style={styles.graduationText}>View graduation</Text>
        </Pressable>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    // Cap width on desktop so the background image doesn't stretch to an
    // extreme aspect ratio (which would crop out the dog subjects and only
    // show a horizontal strip of ferns). 560px is a comfortable phone-width
    // cap; narrower viewports render unaffected.
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  cardBgImage: {
    borderRadius: Radius.lg,
    // Regenerated bg has the subtle subject baked in — image fills the
    // card naturally via `resizeMode="cover"`.
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1E342266', // forestDeep @ ~40%
    borderRadius: Radius.lg,
  },
  // Inner edge glow — thin cream border inset a few pixels from the card
  // edge. Animated opacity gives a slow "breathing" effect. No sweep, no
  // movement — reads as ambient, not as a loading skeleton.
  edgeGlow: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: Radius.lg - 3,
    borderWidth: 1.5,
    borderColor: '#F5EDE0',
  },
  dogHeadline: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 28,
    lineHeight: 32,
    color: '#F5EDE0',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  counterArea: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  bigNumber: {
    fontFamily: Fonts.display,
    fontSize: 80,
    lineHeight: 82,
    color: '#F5EDE0',
    letterSpacing: -2,
  },
  mainLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#F5EDE0C0',
    marginTop: 2,
  },
  subtitle: {
    fontFamily: Fonts.display,
    fontStyle: 'italic',
    fontSize: 14,
    color: '#F5EDE0B0',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  milestonePill: {
    alignSelf: 'center',
    backgroundColor: '#F5EDE020',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: '#F5EDE030',
  },
  milestoneText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: '#F5EDE0E0',
    letterSpacing: 0.2,
  },
  emergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.critical,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    marginTop: Spacing.md,
  },
  emergencyText: {
    fontFamily: Fonts.display,
    fontSize: 15,
    color: '#F5EDE0',
  },
  graduationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.paper,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    marginTop: Spacing.md,
  },
  graduationText: {
    fontFamily: Fonts.display,
    fontSize: 15,
    color: Colors.forest,
  },
});
