/**
 * Q5 — VET CONFIRMED?  🔴 CRITICAL
 */
import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { SelectionCard } from '@/components/onboarding/SelectionCard';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore, type VetConfirmed } from '@/store/usePuppyStore';

export default function Q5VetConfirmed() {
  const { goNext, goBack } = useOnboarding();
  const setVetConfirmed = usePuppyStore((s) => s.setVetConfirmed);
  const saved = usePuppyStore((s) => s.vetConfirmed);
  const [selected, setSelected] = useState<VetConfirmed | null>(saved);

  const handleContinue = useCallback(() => {
    if (!selected) return;
    setVetConfirmed(selected);
    goNext('q5-vet-confirmed');
  }, [selected, setVetConfirmed, goNext]);

  return (
    <OnboardingScreen illustration="🏥" heroColor="#2C6E6F"
      headline="Has a vet confirmed the pregnancy?"
      subtext="Unconfirmed pregnancies can be false pregnancies."
      onNext={handleContinue} onBack={() => goBack('q5-vet-confirmed')}
      nextDisabled={!selected} nextLabel={selected === 'not_yet' ? "Continue — I'll book the vet" : 'Next'}>
      <SelectionCard emoji="✅" title="Yes — ultrasound confirmed" selected={selected === 'ultrasound'} onPress={() => setSelected('ultrasound')} />
      <SelectionCard emoji="✅" title="Yes — vet examined her" selected={selected === 'exam_only'} onPress={() => setSelected('exam_only')} />
      <SelectionCard emoji="❌" title="Not yet" selected={selected === 'not_yet'} onPress={() => setSelected('not_yet')} accentColor={Colors.coral} />
      {selected === 'not_yet' && (
        <Card style={styles.urgentCard}>
          <Text variant="caption" weight="semibold" color={Colors.coral}>Please book a vet visit today</Text>
          <Text variant="caption" color={Colors.textSecondary} style={styles.text}>
            Call your vet: "My dog is pregnant and I need a confirmation visit and puppy count."
          </Text>
        </Card>
      )}
    </OnboardingScreen>
  );
}
const styles = StyleSheet.create({
  urgentCard: { marginTop: Spacing.md, backgroundColor: Colors.creamLight, borderWidth: 1, borderColor: Colors.coral + '30' },
  text: { marginTop: Spacing.xs, lineHeight: 20 },
});
