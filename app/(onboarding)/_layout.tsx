/**
 * ONBOARDING LAYOUT — Teal header, cream body
 * Matches reference: dark teal top bar with white text, warm cream content area.
 * Back button is now in the bottom bar (beside Next), NOT in the header.
 */
import { View, StyleSheet } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function OnboardingLayout() {
  const pathname = usePathname();
  const { getStepIndex, getProgress, totalSteps } =
    useOnboarding();

  const segments = pathname.split('/');
  const currentRoute = segments[segments.length - 1] ?? '';
  const stepIndex = getStepIndex(currentRoute);
  const progress = getProgress(currentRoute);
  const isGenerating = currentRoute === 'generating';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {!isGenerating && (
        <View style={styles.header}>
          {/* Brand bar — dark teal */}
          <View style={styles.brandBar}>
            <View style={styles.brandLeft}>
              <Text style={styles.brandPaw}>🐾</Text>
              <Text variant="body" weight="bold" color={Colors.textOnDark} style={styles.brandName}>
                Puppy Prep
              </Text>
            </View>
            <View style={styles.stepPill}>
              <Text style={styles.stepText}>{stepIndex + 1} / {totalSteps}</Text>
            </View>
          </View>

          {/* Progress bar on teal */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
        </View>
      )}

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDeep,
  },
  header: {
    backgroundColor: Colors.primaryDeep,
  },
  brandBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandPaw: {
    fontSize: 22,
  },
  brandName: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
  stepPill: {
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  stepText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.cream,
  },
  progressTrack: {
    height: 3,
    backgroundColor: '#FFFFFF15',
    marginHorizontal: Spacing.lg,
    borderRadius: 2,
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.cream,
    borderRadius: 2,
  },
});
