import { Redirect } from 'expo-router';
import { useUserStore } from '@/store/useUserStore';

/**
 * ROOT INDEX — Immediate redirect based on onboarding status.
 * This file must exist for Expo Router to have a valid "/" route.
 */
export default function RootIndex() {
  const hasCompletedOnboarding = useUserStore((s) => s.hasCompletedOnboarding);

  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(onboarding)/q1-breed" />;
}
