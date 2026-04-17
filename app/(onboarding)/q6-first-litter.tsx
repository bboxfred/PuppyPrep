/**
 * Q6 — FIRST LITTER?  🟡 HELPFUL — can skip
 */
import { useState, useCallback } from 'react';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { SelectionCard } from '@/components/onboarding/SelectionCard';
import { Colors } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore } from '@/store/usePuppyStore';

export default function Q6FirstLitter() {
  const { goNext, goBack } = useOnboarding();
  const setFirstLitter = usePuppyStore((s) => s.setFirstLitter);
  const saved = usePuppyStore((s) => s.firstLitter);
  const [selected, setSelected] = useState<boolean | null>(saved);

  return (
    <OnboardingScreen illustration="🐣" heroColor="#5BA3A4"
      headline="Is this her first litter?"
      subtext="First-time mums sometimes have longer labours and may need more help."
      onNext={() => { setFirstLitter(selected ?? true); goNext('q6-first-litter'); }}
      onBack={() => goBack('q6-first-litter')}
      nextDisabled={false}
      skipLabel="Not sure / Skip"
      onSkip={() => { setFirstLitter(true); goNext('q6-first-litter'); }}>
      <SelectionCard emoji="🐣" title="Yes — first time" selected={selected === true} onPress={() => setSelected(true)} />
      <SelectionCard emoji="🐕" title="No — she's had puppies before" selected={selected === false} onPress={() => setSelected(false)} />
    </OnboardingScreen>
  );
}
