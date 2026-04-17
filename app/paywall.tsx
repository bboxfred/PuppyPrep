/**
 * PAYWALL — Simple, honest, one-time payment.
 * Only shown after trial expires (day 14+) or when user taps a locked feature.
 * Never shown during onboarding.
 */
import { useState, useCallback } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius, Shadows } from '@/constants/design-system';
import { useSubscription, PRICE } from '@/hooks/useSubscription';

const FEATURES = [
  'Full care calendar (8 weeks)',
  'Complete Info Library',
  'Puppy weight tracker',
  'Push notification reminders',
  'Weight trend charts & alerts',
];

const ALWAYS_FREE = [
  'Birth Guide',
  'Emergency Guide',
  '14-day free trial',
];

export default function PaywallScreen() {
  const router = useRouter();
  const { isPro, isLoading, error, purchasePro, restorePurchases, trialDays } = useSubscription();
  const [toast, setToast] = useState<string | null>(null);

  const handlePurchase = useCallback(async () => {
    const ok = await purchasePro();
    if (ok) {
      setToast('Welcome to Puppy Prep Pro! 🐾');
      setTimeout(() => router.back(), 1200);
    }
  }, [purchasePro, router]);

  const handleRestore = useCallback(async () => {
    const ok = await restorePurchases();
    setToast(ok ? 'Purchases restored ✓' : 'No purchases found');
    if (ok) setTimeout(() => router.back(), 1200);
  }, [restorePurchases, router]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Pressable onPress={() => router.back()} style={styles.closeBtn} hitSlop={12}>
        <X size={22} color={Colors.textSecondary} strokeWidth={2.5} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={[Colors.primary, Colors.primaryLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <Text style={styles.heroEmoji}>🐾</Text>
          <Text style={styles.heroTitle}>Keep going with{'\n'}Puppy Prep Pro</Text>
          <Text style={styles.heroSub}>Your 14-day trial is over — unlock everything with a single payment.</Text>
        </LinearGradient>

        {/* What you get */}
        <View style={styles.section}>
          <Text variant="heading" weight="bold" style={styles.sectionTitle}>What's included</Text>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Check size={18} color={Colors.primary} strokeWidth={3} />
              <Text variant="body" style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* Always free */}
        <View style={styles.section}>
          <Text variant="caption" weight="bold" color={Colors.textSecondary} style={styles.sectionTitle}>
            Always free — no payment needed
          </Text>
          {ALWAYS_FREE.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Check size={16} color={Colors.success} strokeWidth={2.5} />
              <Text variant="caption" color={Colors.textSecondary} style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaArea}>
          <Button
            title={isLoading ? 'Processing...' : `Get Puppy Prep Pro — ${PRICE}`}
            onPress={handlePurchase}
            loading={isLoading}
          />
          <Text variant="caption" color={Colors.textSecondary} style={styles.oneTime}>
            One-time payment. No subscription. Yours forever.
          </Text>
        </View>

        {/* Restore */}
        <Pressable onPress={handleRestore} style={styles.restoreBtn} disabled={isLoading}>
          <Text variant="caption" color={Colors.textSecondary} style={styles.restoreText}>
            Already paid? Restore purchase
          </Text>
        </Pressable>

        {error && (
          <Text variant="caption" color={Colors.error} style={styles.errorText}>{error}</Text>
        )}
      </ScrollView>

      {toast && (
        <View style={styles.toast}>
          <Text variant="body" weight="semibold" color="#FFF">{toast}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  closeBtn: {
    position: 'absolute', top: 50, right: Spacing.lg, zIndex: 10,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', ...Shadows.card,
  },
  scrollContent: { paddingBottom: Spacing['2xl'] },
  hero: {
    paddingTop: Spacing['2xl'] + Spacing.md, paddingBottom: Spacing.xl + Spacing.md,
    paddingHorizontal: Spacing.lg, alignItems: 'center',
  },
  heroEmoji: { fontSize: 48, marginBottom: Spacing.md },
  heroTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 26, color: '#FFF', textAlign: 'center', lineHeight: 33 },
  heroSub: { fontFamily: 'Quicksand-Medium', fontSize: 14, color: '#FFFFFFB0', textAlign: 'center', marginTop: Spacing.sm, lineHeight: 21 },
  section: { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg },
  sectionTitle: { marginBottom: Spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm + 2 },
  featureText: { flex: 1, fontSize: 15, lineHeight: 21 },
  ctaArea: { paddingHorizontal: Spacing.lg, marginTop: Spacing.xl },
  oneTime: { textAlign: 'center', marginTop: Spacing.sm },
  restoreBtn: { alignItems: 'center', marginTop: Spacing.lg, padding: Spacing.sm },
  restoreText: { textDecorationLine: 'underline' },
  errorText: { textAlign: 'center', marginTop: Spacing.sm, paddingHorizontal: Spacing.lg },
  toast: {
    position: 'absolute', bottom: Spacing.lg + 20, left: Spacing.lg, right: Spacing.lg,
    backgroundColor: Colors.primary, borderRadius: Radius.pill,
    paddingVertical: Spacing.md, alignItems: 'center', ...Shadows.card,
  },
});
