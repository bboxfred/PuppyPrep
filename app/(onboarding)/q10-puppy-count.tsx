/**
 * Q10 — PUPPY COUNT  🔴 CRITICAL (if born)
 */
import { useState, useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Radius, Spacing } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore } from '@/store/usePuppyStore';

export default function Q10PuppyCount() {
  const { goNext, goBack } = useOnboarding();
  const setPuppyCount = usePuppyStore((s) => s.setPuppyCount);
  const saved = usePuppyStore((s) => s.puppyCount);
  const [count, setCount] = useState(saved ?? 4);

  const handleContinue = useCallback(() => {
    setPuppyCount(count);
    goNext('q10-puppy-count');
  }, [count, setPuppyCount, goNext]);

  return (
    <OnboardingScreen illustrationImage={require("../../assets/images/onboard-puppy-count.png")}
      headline="How many puppies are there?"
      subtext="We need this for feeding volumes and to watch for runts."
      onNext={handleContinue} onBack={() => goBack('q10-puppy-count')}>

      <View style={styles.stepper}>
        <Pressable onPress={() => setCount((c) => Math.max(1, c-1))}
          style={[styles.stepBtn, count <= 1 && { opacity: 0.3 }]}>
          <Text style={styles.stepBtnText}>−</Text>
        </Pressable>
        <Text style={styles.countNum}>{count}</Text>
        <Pressable onPress={() => setCount((c) => Math.min(14, c+1))}
          style={[styles.stepBtn, count >= 14 && { opacity: 0.3 }]}>
          <Text style={styles.stepBtnText}>+</Text>
        </Pressable>
      </View>
      <Text variant="caption" color={Colors.textSecondary} style={styles.countLabel}>
        {count === 1 ? '1 puppy' : `${count} puppies`}
      </Text>

      {count === 1 && (
        <Card style={styles.warningCard}>
          <Text variant="caption" weight="semibold" color={Colors.coral}>⚠️ Singleton — special protocol needed</Text>
          <Text variant="caption" color={Colors.textSecondary} style={styles.warnText}>
            One puppy means no littermates. We'll add socialisation tasks to prevent behavioural problems.
          </Text>
        </Card>
      )}
      {count >= 10 && (
        <Card style={styles.warningCard}>
          <Text variant="caption" weight="semibold" color={Colors.gold}>Large litter!</Text>
          <Text variant="caption" color={Colors.textSecondary} style={styles.warnText}>
            We'll add dam fatigue monitoring and rotation feeding schedules.
          </Text>
        </Card>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: Spacing.lg },
  stepBtn: {
    width: 56, height: 56, borderRadius: 16, backgroundColor: Colors.cream,
    alignItems: 'center', justifyContent: 'center',
  },
  stepBtnText: { fontSize: 28, fontWeight: '700', color: Colors.primary },
  countNum: { fontSize: 64, fontWeight: '800', color: Colors.textPrimary, minWidth: 100, textAlign: 'center', fontFamily: 'monospace' },
  countLabel: { textAlign: 'center', marginBottom: Spacing.md },
  warningCard: { marginBottom: Spacing.sm, backgroundColor: Colors.creamLight, borderWidth: 1, borderColor: Colors.creamDark },
  warnText: { marginTop: Spacing.xs, lineHeight: 20 },
});
