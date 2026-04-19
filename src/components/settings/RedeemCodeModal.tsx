/**
 * REDEEM CODE MODAL
 *
 * Shown from Settings → Account → "Redeem code". User enters a string
 * (case-insensitive), app calls the `redeem_promo_code` RPC on Supabase.
 *
 * Errors returned by the RPC are mapped to human-friendly messages.
 */
import { useState, useCallback } from 'react';
import {
  View,
  Modal,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Gift, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { supabase } from '@/lib/supabase';

interface RedeemCodeModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (daysGranted: number, proUntil: string) => void;
}

const ERROR_MESSAGES: Record<string, string> = {
  not_signed_in:   'You need to sign in first.',
  code_not_found:  "That code doesn't exist — double-check the spelling.",
  code_expired:    'This code has expired.',
  code_exhausted:  'This code has already been used up.',
  already_redeemed:'You\'ve already redeemed this code.',
};

export function RedeemCodeModal({ visible, onClose, onSuccess }: RedeemCodeModalProps) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'redeeming' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const close = () => {
    setCode('');
    setStatus('idle');
    setError(null);
    setSuccessMsg(null);
    onClose();
  };

  const handleRedeem = useCallback(async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError('Enter a code to continue.');
      return;
    }

    setStatus('redeeming');
    setError(null);

    const { data, error: rpcError } = await supabase.rpc('redeem_promo_code', {
      input_code: trimmed,
    });

    if (rpcError) {
      setStatus('idle');
      setError(rpcError.message);
      return;
    }

    if (!data?.ok) {
      setStatus('idle');
      setError(ERROR_MESSAGES[data?.error] ?? 'Could not redeem this code.');
      return;
    }

    // Success
    const days = data.days_granted as number;
    const proUntil = data.pro_until as string;
    const until = new Date(proUntil).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    setStatus('success');
    setSuccessMsg(`🎉 ${days} days of Pro unlocked — valid until ${until}.`);
    onSuccess(days, proUntil);

    setTimeout(close, 2200);
  }, [code, onSuccess]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={close} style={styles.closeBtn} hitSlop={12}>
            <X size={20} color={Colors.ink} strokeWidth={1.75} />
          </Pressable>
          <Text style={styles.headerTitle}>Redeem code</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.heroIcon}>
            <Gift size={36} color={Colors.primary} strokeWidth={1.5} />
          </View>

          <Text style={styles.title}>Have a promo code?</Text>
          <Text style={styles.subtitle}>
            Enter it below to unlock Pro for a limited time.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. BREEDER2026"
            placeholderTextColor={Colors.inkFaint}
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            autoCorrect={false}
            editable={status !== 'redeeming' && status !== 'success'}
          />

          {error && (
            <View style={styles.errorCard}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {successMsg && (
            <Card style={styles.successCard}>
              <Check size={20} color={Colors.success} strokeWidth={2} />
              <Text style={styles.successText}>{successMsg}</Text>
            </Card>
          )}

          <Pressable
            onPress={handleRedeem}
            disabled={status !== 'idle'}
            style={({ pressed }) => [
              styles.redeemBtn,
              status !== 'idle' && { opacity: 0.6 },
              pressed && { opacity: 0.88 },
            ]}
          >
            {status === 'redeeming' ? (
              <ActivityIndicator color={Colors.paper} size="small" />
            ) : status === 'success' ? (
              <Text style={styles.redeemBtnLabel}>Redeemed ✓</Text>
            ) : (
              <Text style={styles.redeemBtnLabel}>Redeem</Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.paper },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontFamily: Fonts.display, fontSize: 18, color: Colors.ink },
  content: { padding: Spacing.xl, alignItems: 'center' },
  heroIcon: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 26,
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.rule,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: 18,
    fontFamily: 'monospace',
    letterSpacing: 2,
    textAlign: 'center',
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  errorCard: {
    width: '100%',
    backgroundColor: '#C05B3F10',
    borderWidth: 1,
    borderColor: '#C05B3F30',
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  errorText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#C05B3F',
    textAlign: 'center',
  },
  successCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  successText: {
    flex: 1,
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.success,
  },
  redeemBtn: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.forest,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  redeemBtnLabel: {
    fontFamily: Fonts.display,
    fontSize: 17,
    color: Colors.paper,
    letterSpacing: 0.3,
  },
});
