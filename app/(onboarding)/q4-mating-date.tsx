/**
 * Q4 — MATING DATE / ESTIMATED DUE DATE
 * 🔴 CRITICAL — Scroll picker for date. Shows live due date.
 */
import { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { DateScrollPicker } from '@/components/ui/ScrollPicker';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { usePuppyStore } from '@/store/usePuppyStore';

const GESTATION_DAYS = 63;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function formatDate(d: Date) { return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; }
function daysFromNow(d: Date) { const n = new Date(); n.setHours(0,0,0,0); return Math.round((d.getTime()-n.getTime())/MS_PER_DAY); }

export default function Q4MatingDate() {
  const { goNext, goBack } = useOnboarding();
  const setMatingDate = usePuppyStore((s) => s.setMatingDate);
  const isEstimated = usePuppyStore((s) => s.dateIsEstimated);
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const minDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate()-90); return d; }, [today]);

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date(today); d.setDate(d.getDate()-14); return d;
  });

  const dueDate = useMemo(() => {
    if (isEstimated) return selectedDate;
    const d = new Date(selectedDate); d.setDate(d.getDate()+GESTATION_DAYS); return d;
  }, [selectedDate, isEstimated]);
  const daysUntilDue = daysFromNow(dueDate);
  const dueDateInPast = daysUntilDue < 0;

  const handleContinue = useCallback(() => {
    setMatingDate(selectedDate.toISOString(), isEstimated ?? false);
    goNext('q4-mating-date');
  }, [selectedDate, isEstimated, setMatingDate, goNext]);

  return (
    <OnboardingScreen
      illustrationImage={require('../../assets/images/onboard-calendar.png')}
      headline={isEstimated ? "Estimated due date?" : "When was she mated?"}
      subtext={isEstimated ? "Enter the date your vet gave you." : "If mated over multiple days, pick the first day."}
      onNext={handleContinue}
      onBack={() => goBack('q4-mating-date')}
      nextDisabled={dueDateInPast && !isEstimated}
    >
      <DateScrollPicker value={selectedDate} onChange={setSelectedDate}
        minDate={isEstimated ? today : minDate} maxDate={isEstimated ? undefined : today} />

      <Card style={styles.dueDateCard}>
        <Text variant="caption" color={Colors.textSecondary}>Estimated due date</Text>
        <Text variant="subheading" weight="bold">{formatDate(dueDate)}</Text>
        {!dueDateInPast && <Text variant="caption" color={Colors.primary}>
          {daysUntilDue === 0 ? 'Due today!' : `In ${daysUntilDue} days`}
        </Text>}
      </Card>

      {dueDateInPast && !isEstimated && (
        <Card style={styles.warningCard}>
          <Text variant="caption" weight="semibold" color={Colors.coral}>
            That date suggests she would have given birth already. Go back and select "puppies are already here".
          </Text>
        </Card>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  dueDateCard: { marginTop: Spacing.lg, alignItems: 'center', paddingVertical: Spacing.lg, backgroundColor: Colors.creamLight },
  warningCard: { marginTop: Spacing.md, backgroundColor: Colors.coral + '10', borderWidth: 1, borderColor: Colors.coral + '30' },
});
