/**
 * Q7 — DAM AGE  🔴 CRITICAL
 */
import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { SelectionCard } from '@/components/onboarding/SelectionCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore, type DamAgeBand } from '@/store/usePuppyStore';

const AGE_OPTIONS: { value: DamAgeBand; label: string; emoji: string; risk?: string }[] = [
  { value: 'under_1', label: 'Under 1 year', emoji: '🐾', risk: 'Very young — higher pregnancy risk.' },
  { value: '1_to_2', label: '1–2 years', emoji: '🐕', risk: 'Young — first pregnancies may have longer labour.' },
  { value: '2_to_5', label: '2–5 years', emoji: '✅' },
  { value: '5_to_7', label: '5–7 years', emoji: '⚠️', risk: 'Older — discuss C-section risk with vet.' },
  { value: 'over_7', label: 'Over 7 years', emoji: '🚨', risk: 'High risk — vet should assess before labour.' },
];

export default function Q7Age() {
  const { goNext, goBack } = useOnboarding();
  const setDamAge = usePuppyStore((s) => s.setDamAge);
  const saved = usePuppyStore((s) => s.damAgeBand);
  const [selected, setSelected] = useState<DamAgeBand | null>(saved);
  const [showHelp, setShowHelp] = useState(false);

  const selectedOption = AGE_OPTIONS.find((o) => o.value === selected);

  const handleContinue = useCallback(() => {
    if (!selected) return;
    setDamAge(selected);
    goNext('q7-age');
  }, [selected, setDamAge, goNext]);

  return (
    <OnboardingScreen illustrationImage={require("../../assets/images/onboard-age.png")}
      headline="How old is she?"
      subtext="Dogs under 2 or over 6 have higher pregnancy risks."
      onNext={handleContinue} onBack={() => goBack('q7-age')} nextDisabled={!selected}>

      {AGE_OPTIONS.map((o) => (
        <SelectionCard key={o.value} emoji={o.emoji} title={o.label}
          selected={selected === o.value} onPress={() => { setSelected(o.value); setShowHelp(false); }} />
      ))}

      {selectedOption?.risk && (
        <Card style={styles.riskCard}>
          <Text variant="caption" weight="semibold" color={Colors.coral}>{selectedOption.risk}</Text>
        </Card>
      )}

      {!showHelp ? (
        <Text variant="caption" color={Colors.textLight} style={styles.helpLink}
          onPress={() => setShowHelp(true)}>I don't know her age</Text>
      ) : (
        <Card style={styles.helpCard}>
          <Text variant="caption" color={Colors.textSecondary} style={styles.helpText}>
            Check her papers, microchip records, or ask your vet.
          </Text>
          <Button title="I genuinely cannot find out" variant="secondary"
            onPress={() => { setSelected('2_to_5'); setDamAge('2_to_5'); setShowHelp(false); goNext('q7-age'); }} />
        </Card>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  riskCard: { marginTop: Spacing.sm, backgroundColor: Colors.creamLight, borderWidth: 1, borderColor: Colors.coral + '20' },
  helpLink: { textAlign: 'center', marginTop: Spacing.lg, textDecorationLine: 'underline' },
  helpCard: { marginTop: Spacing.md, gap: Spacing.sm },
  helpText: { lineHeight: 20 },
});
