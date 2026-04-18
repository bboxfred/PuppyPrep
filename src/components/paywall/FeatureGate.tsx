/**
 * FEATURE GATE — Simplified for 2-tier model
 *
 * During 14-day trial: everything unlocked, gate never shows.
 * After trial expires (and not paid): shows locked state.
 * Pro users: gate never shows.
 *
 * ALWAYS FREE (never wrapped in this gate, regardless of tier):
 *   - The entire Info Library — every article, every guide
 *   - Birth Guide
 *   - Emergency Guide
 *
 * This gate is only used for: the full personalised calendar beyond Day 7,
 * push notifications, the weight tracker, and the home-screen widget.
 */
import { type ReactNode } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Radius, Spacing } from '@/constants/design-system';
import { useUserStore, isTrialActive, isAccessLocked, getTrialDaysUsed } from '@/store/useUserStore';

interface FeatureGateProps {
  children: ReactNode;
  /** Custom fallback when locked */
  fallback?: ReactNode;
  /** Short reason text */
  reason?: string;
}

export function FeatureGate({ children, fallback, reason }: FeatureGateProps) {
  const tier = useUserStore((s) => s.subscriptionTier);
  const router = useRouter();

  const isPro = tier === 'pro';
  const trialActive = isTrialActive();

  // Full access: paid or still in trial
  if (isPro || trialActive) {
    return <>{children}</>;
  }

  if (fallback) return <>{fallback}</>;

  const daysOver = getTrialDaysUsed() - 14;

  return (
    <Pressable
      onPress={() => router.push('/paywall' as any)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.lockIcon}>
        <Lock size={20} color={Colors.primary} strokeWidth={2.2} />
      </View>
      <Text variant="body" weight="bold" style={styles.title}>
        Your free trial has ended
      </Text>
      <Text variant="caption" color={Colors.textSecondary} style={styles.reason}>
        {reason ?? 'The full care calendar, reminders, and weight tracker live behind this. The Info Library is always free.'}
      </Text>
      <View style={styles.priceTag}>
        <Text variant="caption" weight="bold" color={Colors.primary}>
          S$12.99 — one-time, yours forever
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.lg, alignItems: 'center',
    borderWidth: 2, borderColor: Colors.creamDark, borderStyle: 'dashed',
  },
  lockIcon: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: Colors.primary + '12',
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm,
  },
  title: { marginBottom: 4, fontSize: 15 },
  reason: { textAlign: 'center', marginBottom: Spacing.sm, lineHeight: 18 },
  priceTag: {
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill,
  },
});
