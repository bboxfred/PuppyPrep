/**
 * GENERATING SCREEN
 * "Building your personalised care calendar..."
 *
 * Animated screen shown while the schedule engine runs.
 * Uses warm paw-print animation, NOT a clinical spinner.
 * Calls generateSchedule() → saves events to store → navigates to tabs.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
  type SharedValue,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors, Spacing } from '@/constants/design-system';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useUserStore } from '@/store/useUserStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { generateSchedule } from '@/data/schedule-engine';
import { getBreedById } from '@/data/breeds/registry';

const PAWS = ['🐾', '🐾', '🐾'];
const MESSAGES = [
  'Reading your answers...',
  'Loading breed-specific care data...',
  'Calculating deworming schedule...',
  'Building your daily events...',
  'Adding health milestones...',
  'Almost there...',
];

export default function GeneratingScreen() {
  const router = useRouter();
  const setEvents = useCalendarStore((s) => s.setEvents);
  const setOnboardingComplete = useUserStore((s) => s.setOnboardingComplete);
  const hasRun = useRef(false);

  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Paw animation — bouncing dots
  const paw1 = useSharedValue(0);
  const paw2 = useSharedValue(0);
  const paw3 = useSharedValue(0);

  useEffect(() => {
    const bounce = (sv: SharedValue<number>, delay: number) => {
      sv.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(-12, { duration: 400, easing: Easing.out(Easing.cubic) }),
            withTiming(0, { duration: 400, easing: Easing.in(Easing.cubic) })
          ),
          -1,
          false
        )
      );
    };
    bounce(paw1, 0);
    bounce(paw2, 150);
    bounce(paw3, 300);
  }, [paw1, paw2, paw3]);

  const pawStyle1 = useAnimatedStyle(() => ({ transform: [{ translateY: paw1.value }] }));
  const pawStyle2 = useAnimatedStyle(() => ({ transform: [{ translateY: paw2.value }] }));
  const pawStyle3 = useAnimatedStyle(() => ({ transform: [{ translateY: paw3.value }] }));
  const pawStyles = [pawStyle1, pawStyle2, pawStyle3];

  // Progress message cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Run schedule engine
  const runGeneration = useCallback(async () => {
    const store = usePuppyStore.getState();
    const breed = store.breedId ? getBreedById(store.breedId) : null;

    setProgress(0.2);

    try {
      const events = await generateSchedule({
        dog_id: store.dogId ?? 'local_dog_1',
        breed_id: store.breedId ?? 'mixed_breed',
        breed_name: store.breedName ?? 'Mixed Breed',
        size_category: store.sizeCategory ?? 'medium',
        status: store.status ?? 'born',
        mating_date: store.matingDate ? new Date(store.matingDate) : undefined,
        estimated_due_date: store.estimatedDueDate ? new Date(store.estimatedDueDate) : undefined,
        birth_date: store.birthDate ? new Date(store.birthDate) : undefined,
        date_is_estimated: store.dateIsEstimated,
        puppy_count: store.puppyCount ?? undefined,
        is_singleton: store.isSingleton,
        // Default to 'all' (all nursing) when not asked — avoids false emergency alerts
        nursing_status: store.nursingStatus ?? (store.status === 'born' ? 'all' : undefined),
        dam_weight_kg: store.damWeightKg ?? 6.5,
        dam_age_band: store.damAgeBand ?? '2_to_5',
        first_litter: store.firstLitter ?? true,
        // If born, pregnancy is obviously confirmed — don't default to 'not_yet'
        vet_confirmed: store.vetConfirmed ?? (store.status === 'born' ? 'ultrasound' : 'not_yet'),
        is_jrt_type: store.isJrtType,
        is_fox_terrier: store.isFoxTerrier,
        is_wire_fox_terrier: store.isWireFoxTerrier,
        is_border_terrier: store.isBorderTerrier,
        is_min_pin: store.isMinPin,
        is_rat_terrier: store.isRatTerrier,
        rat_terrier_variety: store.ratTerrierVariety ?? undefined,
        notif_time: useUserStore.getState().notifTime,
        notif_lead_time_hours: useUserStore.getState().notifLeadTimeHours,
      });

      setProgress(0.8);

      // Brief pause so user sees the animation complete
      await new Promise((r) => setTimeout(r, 600));

      setEvents(events);
      setOnboardingComplete();
      useUserStore.getState().startTrial(); // Start 14-day free trial

      setProgress(1);

      // Navigate to main app after a moment
      await new Promise((r) => setTimeout(r, 400));
      router.replace('/(tabs)');
    } catch (error) {
      console.error('[GeneratingScreen] Schedule generation failed:', error);
      // Still navigate — user can retry from settings
      setOnboardingComplete();
      router.replace('/(tabs)');
    }
  }, [setEvents, setOnboardingComplete, router]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    runGeneration();
  }, [runGeneration]);

  return (
    <View style={styles.container}>
      {/* Bouncing paws */}
      <View style={styles.pawRow}>
        {PAWS.map((paw, i) => (
          <Animated.Text key={i} style={[styles.paw, pawStyles[i]]}>
            {paw}
          </Animated.Text>
        ))}
      </View>

      {/* Main message */}
      <Animated.View entering={FadeIn.duration(600)}>
        <Text variant="heading" style={styles.headline}>
          Building your personalised{'\n'}care calendar...
        </Text>
      </Animated.View>

      {/* Progress message */}
      <Text variant="body" color={Colors.textSecondary} style={styles.message}>
        {MESSAGES[messageIndex]}
      </Text>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} height={4} color={Colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  pawRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  paw: {
    fontSize: 36,
  },
  headline: {
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  message: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
    minHeight: 24,
  },
  progressContainer: {
    width: '80%',
  },
});
