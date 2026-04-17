/**
 * Q12 — NOTIFICATIONS  🟡 HELPFUL — can skip
 * Skip link is INSIDE the content area (below the picker), not in the bottom bar.
 * Bottom bar only has Back + Build my calendar.
 */
import { useState, useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { TimeScrollPicker } from '@/components/ui/ScrollPicker';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing } from '@/constants/design-system';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useUserStore } from '@/store/useUserStore';

function to24Hour(h: number, p: 'AM' | 'PM') { return p === 'AM' ? (h === 12 ? 0 : h) : (h === 12 ? 12 : h + 12); }

export default function Q12Notifications() {
  const { goNext, goBack } = useOnboarding();
  const setNotifPreferences = useUserStore((s) => s.setNotifPreferences);
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const handleContinue = useCallback(() => {
    const h24 = to24Hour(hour, period);
    setNotifPreferences(`${String(h24).padStart(2,'0')}:${String(minute).padStart(2,'0')}`, 0);
    goNext('q12-notifications');
  }, [hour, minute, period, setNotifPreferences, goNext]);

  const handleSkip = useCallback(() => {
    setNotifPreferences('08:00', 0);
    goNext('q12-notifications');
  }, [setNotifPreferences, goNext]);

  return (
    <OnboardingScreen illustration="🔔" heroColor="#5BA3A4"
      headline="When should we remind you?"
      subtext="Daily summary and alerts before important events."
      onNext={handleContinue} onBack={() => goBack('q12-notifications')}
      nextLabel="Build my calendar">

      <TimeScrollPicker hour={hour} minute={minute} period={period}
        onChangeHour={setHour} onChangeMinute={setMinute} onChangePeriod={setPeriod} />

      {/* Skip link inside content — not in bottom bar */}
      <Pressable onPress={handleSkip} style={styles.skipLink}>
        <Text variant="caption" color={Colors.primary} weight="medium">
          Use default (8:00 AM)
        </Text>
      </Pressable>

      <Card style={styles.note}>
        <Text variant="caption" color={Colors.textSecondary} style={styles.noteText}>
          These reminders help you not miss deworming doses or health windows — not marketing.
        </Text>
      </Card>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  skipLink: { alignItems: 'center', marginTop: Spacing.lg, paddingVertical: Spacing.sm },
  note: { marginTop: Spacing.md, backgroundColor: Colors.creamLight },
  noteText: { lineHeight: 20 },
});
