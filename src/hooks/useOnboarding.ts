/**
 * ONBOARDING NAVIGATION HOOK
 *
 * Manages the question flow including conditional branching:
 *   - If status = 'pregnant' → Q1, Q2, Q3, Q4?, Q5, Q6, Q7, Q8, Q12
 *   - If status = 'born'     → Q1, Q2, Q10, Q11, Q5, Q6, Q7, Q8, Q12
 *
 * IMPORTANT: goNext() reads store state directly (not from React state)
 * because Q2 sets status and calls goNext in the same handler — the
 * React re-render with updated useMemo hasn't happened yet.
 */
import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { usePuppyStore } from '@/store/usePuppyStore';

/** Compute the flow from raw store values — pure function, no React dependency */
function computeFlow(
  status: string | null,
  matingDateKnown: boolean | null
): readonly string[] {
  if (!status) return ['q1-breed', 'q2-status'];

  if (status === 'pregnant') {
    // q4-mating-date is needed in BOTH branches: when the user knows the
    // mating date, and when they chose "I don't know — let me enter an
    // estimated due date instead." The question simply renders differently
    // (it reads `dateIsEstimated` from the store to switch its label).
    return [
      'q1-breed',
      'q2-status',
      'q3-mating-known',
      'q4-mating-date',
      'q5-vet-confirmed',
      'q6-first-litter',
      'q7-age',
      'q8-weight',
      'q12-notifications',
    ];
  }

  // status === 'born' — no need to confirm pregnancy, it's already happened
  return [
    'q1-breed',
    'q2-status',
    'q10-puppy-count',
    'q11-birth-date',
    'q6-first-litter',
    'q7-age',
    'q8-weight',
    'q12-notifications',
  ];
}

export type OnboardingRoute = string;

export function useOnboarding() {
  const router = useRouter();
  const status = usePuppyStore((s) => s.status);
  const matingDateKnown = usePuppyStore((s) => s.matingDateKnown);

  // For UI display (progress bar, question counter)
  const flow = useMemo(() => computeFlow(status, matingDateKnown), [status, matingDateKnown]);
  const totalSteps = flow.length;

  const getStepIndex = useCallback(
    (route: string): number => {
      const idx = flow.indexOf(route);
      return idx >= 0 ? idx : 0;
    },
    [flow]
  );

  const getProgress = useCallback(
    (route: string): number => {
      const idx = getStepIndex(route);
      return (idx + 1) / totalSteps;
    },
    [getStepIndex, totalSteps]
  );

  const goNext = useCallback(
    (currentRoute: string) => {
      // Read store directly — NOT from React state — because the caller
      // may have just called setStatus() in the same event handler,
      // and React hasn't re-rendered yet.
      const store = usePuppyStore.getState();
      const currentFlow = computeFlow(store.status, store.matingDateKnown);

      const idx = currentFlow.indexOf(currentRoute);
      if (idx < 0 || idx >= currentFlow.length - 1) {
        router.replace('/(onboarding)/generating');
        return;
      }
      const nextRoute = currentFlow[idx + 1];
      router.push(`/(onboarding)/${nextRoute}`);
    },
    [router]
  );

  const goBack = useCallback(
    (currentRoute: string) => {
      const idx = flow.indexOf(currentRoute);
      if (idx <= 0) return;
      router.back();
    },
    [flow, router]
  );

  const canGoBack = useCallback(
    (currentRoute: string): boolean => {
      return flow.indexOf(currentRoute) > 0;
    },
    [flow]
  );

  return {
    flow,
    totalSteps,
    getStepIndex,
    getProgress,
    goNext,
    goBack,
    canGoBack,
  };
}
