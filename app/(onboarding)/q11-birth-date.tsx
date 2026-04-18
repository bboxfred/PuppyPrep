/**
 * Q11 — BIRTH DATE  🔴 CRITICAL (if born)
 */
import { useState, useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { DateScrollPicker } from '@/components/ui/ScrollPicker';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore } from '@/store/usePuppyStore';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default function Q11BirthDate() {
  const { goNext, goBack } = useOnboarding();
  const setBirthDate = usePuppyStore((s) => s.setBirthDate);
  const saved = usePuppyStore((s) => s.birthDate);
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const minDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate()-70); return d; }, [today]);
  const [selectedDate, setSelectedDate] = useState<Date>(saved ? new Date(saved) : today);
  const [confirmed, setConfirmed] = useState(false);
  const isToday = selectedDate.toDateString() === today.toDateString();
  const puppyAgeDays = Math.round((today.getTime() - selectedDate.getTime()) / MS_PER_DAY);

  const handleContinue = useCallback(() => {
    if (isToday && !confirmed) return;
    setBirthDate(selectedDate.toISOString());
    goNext('q11-birth-date');
  }, [isToday, confirmed, selectedDate, setBirthDate, goNext]);

  return (
    <OnboardingScreen illustrationImage={require("../../assets/images/onboard-cake.png")}
      headline="When were the puppies born?"
      subtext="Deworming starts Day 14, eyes open Day 12, first vet visit Week 6."
      onNext={handleContinue} onBack={() => goBack('q11-birth-date')}
      nextDisabled={isToday && !confirmed}>

      <DateScrollPicker value={selectedDate} onChange={(d) => { setSelectedDate(d); setConfirmed(false); }}
        minDate={minDate} maxDate={today} />

      <Card style={styles.ageCard}>
        <Text variant="caption" color={Colors.textSecondary}>Puppy age</Text>
        <Text variant="subheading" weight="bold">
          {puppyAgeDays === 0 ? 'Born today' : `Day ${puppyAgeDays}`}
        </Text>
      </Card>

      {isToday && !confirmed && (
        <Card style={styles.confirmCard}>
          <Text variant="caption" weight="semibold">Born today? Arrived in the last 24 hours?</Text>
          <Button title="Yes, born today" onPress={() => setConfirmed(true)} style={styles.confirmBtn} />
        </Card>
      )}

      <Card style={styles.guidanceCard}>
        <Text variant="caption" color={Colors.textSecondary} style={styles.guidanceText}>
          If not 100% sure, use the EARLIEST date. Safer to deworm slightly early than miss the window.
        </Text>
      </Card>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  ageCard: { marginTop: Spacing.lg, alignItems: 'center', paddingVertical: Spacing.lg, backgroundColor: Colors.creamLight },
  confirmCard: { marginTop: Spacing.md, backgroundColor: Colors.creamLight, borderWidth: 1, borderColor: Colors.creamDark },
  confirmBtn: { marginTop: Spacing.sm },
  guidanceCard: { marginTop: Spacing.md, backgroundColor: Colors.primary + '08' },
  guidanceText: { lineHeight: 20 },
});
