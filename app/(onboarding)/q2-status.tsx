/**
 * Q2 — CURRENT STATUS
 * 🔴 CRITICAL — No skip. Select then press Next.
 */
import { useState, useCallback } from 'react';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { SelectionCard } from '@/components/onboarding/SelectionCard';
import { Colors } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore, type DogStatus } from '@/store/usePuppyStore';

// Illustrations that swap based on which option is selected
const PREGNANT_HERO = require('../../assets/images/onboarding-pregnant.png');
const BORN_HERO = require('../../assets/images/onboarding-born.png');

export default function Q2Status() {
  const { goNext, goBack } = useOnboarding();
  const setStatus = usePuppyStore((s) => s.setStatus);
  const savedStatus = usePuppyStore((s) => s.status);
  const [selected, setSelected] = useState<DogStatus | null>(savedStatus);

  const handleContinue = useCallback(() => {
    if (!selected) return;
    setStatus(selected);
    goNext('q2-status');
  }, [selected, setStatus, goNext]);

  // Hero illustration mirrors the selected answer (default = pregnant mama)
  const heroImage = selected === 'born' ? BORN_HERO : PREGNANT_HERO;

  return (
    <OnboardingScreen
      illustrationImage={heroImage}
      heroColor={Colors.primary}
      headline="Where are you right now?"
      subtext="We'll build a completely different care plan depending on your answer."
      onNext={handleContinue}
      onBack={() => goBack('q2-status')}
      nextDisabled={!selected}
    >
      <SelectionCard
        emoji="🤰"
        title="My dog is pregnant"
        description="Puppies haven't arrived yet"
        selected={selected === 'pregnant'}
        onPress={() => setSelected('pregnant')}
        index={0}
      />
      <SelectionCard
        emoji="🐣"
        title="The puppies are already here"
        description="They've been born"
        selected={selected === 'born'}
        onPress={() => setSelected('born')}
        index={1}
      />
    </OnboardingScreen>
  );
}
