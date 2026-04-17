/**
 * Q3 — MATING DATE KNOWN?
 * 🔴 CRITICAL — No skip. Blocked state if "No".
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
import { usePuppyStore } from '@/store/usePuppyStore';

type Answer = 'yes' | 'no' | null;

export default function Q3MatingKnown() {
  const { goNext, goBack } = useOnboarding();
  const savedMatingDateKnown = usePuppyStore((s) => s.matingDateKnown);
  const [answer, setAnswer] = useState<Answer>(
    savedMatingDateKnown === true ? 'yes' : savedMatingDateKnown === false ? 'no' : null
  );
  const [showBlocked, setShowBlocked] = useState(false);

  const handleContinue = useCallback(() => {
    if (answer === 'yes') {
      usePuppyStore.setState({ matingDateKnown: true });
      goNext('q3-mating-known');
    } else if (answer === 'no') {
      setShowBlocked(true);
    }
  }, [answer, goNext]);

  const handleEnterEstimate = useCallback(() => {
    usePuppyStore.setState({ matingDateKnown: false, dateIsEstimated: true });
    goNext('q3-mating-known');
  }, [goNext]);

  return (
    <OnboardingScreen
      illustration="📅"
      heroColor="#2C6E6F"
      headline="Do you know when she was mated?"
      subtext="The mating date lets us calculate your due date and build your pregnancy timeline."
      onNext={!showBlocked ? handleContinue : undefined}
      onBack={() => goBack('q3-mating-known')}
      nextDisabled={!answer}
      hideBottomBar={showBlocked}
    >
      {!showBlocked ? (
        <>
          <SelectionCard emoji="✅" title="Yes, I know the date" selected={answer === 'yes'} onPress={() => setAnswer('yes')} />
          <SelectionCard emoji="❌" title="No, I don't know" selected={answer === 'no'} onPress={() => setAnswer('no')} />
        </>
      ) : (
        <Card style={styles.blockedCard}>
          <Text variant="subheading" weight="bold" color={Colors.primary}>
            We need this to keep your puppies safe
          </Text>
          <Text variant="body" color={Colors.textSecondary} style={styles.blockedText}>
            Book a vet appointment for an ultrasound. Call your vet and say:
          </Text>
          <Text variant="body" weight="semibold" color={Colors.textPrimary} style={styles.quote}>
            "My dog is pregnant and I need an ultrasound to estimate the due date."
          </Text>
          <View style={styles.blockedActions}>
            <Button title="Enter vet's estimated due date" variant="secondary" onPress={handleEnterEstimate} />
            <Button title="I know the date now" onPress={() => { setShowBlocked(false); setAnswer('yes'); }} />
          </View>
        </Card>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  blockedCard: { padding: Spacing.lg, backgroundColor: Colors.creamLight, borderWidth: 1, borderColor: Colors.creamDark },
  blockedText: { marginTop: Spacing.sm, lineHeight: 23 },
  quote: { marginTop: Spacing.sm, fontStyle: 'italic', lineHeight: 23 },
  blockedActions: { marginTop: Spacing.lg, gap: Spacing.sm },
});
