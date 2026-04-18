/**
 * ONBOARDING LAYOUT — Field Journal editorial
 *
 * Paper background across the whole screen. No dark header. Brand name set in
 * Young Serif at top-left; "Chapter NN of NN" in top-right using ChapterMark.
 * Back navigation remains in the bottom bar of OnboardingScreen — not here.
 *
 * No feature-behavior changes: step indices, routing, and flow order are unchanged.
 */
import { View, StyleSheet } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { ChapterMark } from '@/components/ui/ChapterMark';
import { Colors, Spacing, Fonts } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function OnboardingLayout() {
  const pathname = usePathname();
  const { getStepIndex, totalSteps } = useOnboarding();

  const segments = pathname.split('/');
  const currentRoute = segments[segments.length - 1] ?? '';
  const stepIndex = getStepIndex(currentRoute);
  const isGenerating = currentRoute === 'generating';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {!isGenerating && (
        <View style={styles.header}>
          <Text style={styles.brandName}>Puppy Prep</Text>
          <ChapterMark current={stepIndex + 1} total={totalSteps} />
        </View>
      )}

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.paper },
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
    backgroundColor: Colors.paper,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.paper,
  },
  brandName: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 20,
    color: Colors.ink,
    letterSpacing: 0.2,
  },
});
