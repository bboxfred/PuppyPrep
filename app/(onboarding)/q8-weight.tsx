/**
 * Q8 — DAM WEIGHT  🔴 CRITICAL — no skip, no bypass
 */
import { useState, useCallback, useMemo } from 'react';
import { View, TextInput, Keyboard, StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Radius, Spacing, FontSizes } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore } from '@/store/usePuppyStore';
import { getBreedById } from '@/data/breeds/registry';

export default function Q8Weight() {
  const { goNext, goBack } = useOnboarding();
  const setDamWeight = usePuppyStore((s) => s.setDamWeight);
  const savedWeight = usePuppyStore((s) => s.damWeightKg);
  const breedId = usePuppyStore((s) => s.breedId);
  const [weightText, setWeightText] = useState(savedWeight ? String(savedWeight) : '');
  const breed = useMemo(() => (breedId ? getBreedById(breedId) : null), [breedId]);
  const weightNum = parseFloat(weightText);
  const isValid = !isNaN(weightNum) && weightNum > 0 && weightNum < 150;

  const handleContinue = useCallback(() => {
    if (!isValid) return;
    Keyboard.dismiss();
    setDamWeight(weightNum);
    goNext('q8-weight');
  }, [isValid, weightNum, setDamWeight, goNext]);

  return (
    <OnboardingScreen illustration="⚖️" heroColor="#3D8B8C"
      headline="How much does she weigh?"
      subtext="We use this to calculate safe formula volumes and whelping box size."
      onNext={handleContinue} onBack={() => goBack('q8-weight')} nextDisabled={!isValid}>

      {breed && (
        <Text variant="caption" color={Colors.textSecondary} style={styles.breedRef}>
          A typical {breed.name} weighs {breed.avg_weight_kg.min}–{breed.avg_weight_kg.max} kg
        </Text>
      )}

      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={weightText} onChangeText={setWeightText}
          keyboardType="decimal-pad" placeholder="0.0" placeholderTextColor={Colors.textLight}
          returnKeyType="done" onSubmitEditing={handleContinue} maxLength={5} />
        <Text variant="subheading" color={Colors.textSecondary} style={styles.unit}>kg</Text>
      </View>

      <Card style={styles.helpCard}>
        <Text variant="caption" weight="semibold" color={Colors.primary}>How to weigh her at home:</Text>
        <Text variant="caption" color={Colors.textSecondary} style={styles.step}>1. Step on scales, note your weight</Text>
        <Text variant="caption" color={Colors.textSecondary} style={styles.step}>2. Pick her up, step on scales again</Text>
        <Text variant="caption" color={Colors.textSecondary} style={styles.step}>3. Subtract — that's her weight</Text>
      </Card>

      <Card style={styles.safetyCard}>
        <Text variant="caption" color={Colors.coral} weight="semibold">Why we can't skip this</Text>
        <Text variant="caption" color={Colors.textSecondary} style={styles.safetyText}>
          Formula volume is calculated from weight. Wrong amount = aspiration or starvation.
        </Text>
      </Card>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  breedRef: { marginBottom: Spacing.md },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  input: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, fontSize: FontSizes['3xl'],
    fontFamily: 'monospace', color: Colors.textPrimary, textAlign: 'center',
    borderWidth: 2, borderColor: Colors.creamDark,
  },
  unit: { marginLeft: Spacing.sm, fontSize: FontSizes.xl },
  helpCard: { marginBottom: Spacing.md, backgroundColor: Colors.creamLight },
  step: { lineHeight: 24 },
  safetyCard: { backgroundColor: Colors.coral + '08', borderWidth: 1, borderColor: Colors.coral + '20' },
  safetyText: { marginTop: Spacing.xs, lineHeight: 20 },
});
