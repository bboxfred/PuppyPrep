/**
 * DAM HEALTH BANNER — contextual warning banners.
 * Shows when vet not confirmed, near due date, eclampsia risk period, etc.
 */
import { useMemo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AlertTriangle, Calendar } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { usePuppyStore } from '@/store/usePuppyStore';

type BannerType = 'red' | 'amber' | 'info';

interface Banner {
  type: BannerType;
  title: string;
  message: string;
}

export function DamHealthBanner() {
  const status = usePuppyStore((s) => s.status);
  const vetConfirmed = usePuppyStore((s) => s.vetConfirmed);
  const estimatedDueDate = usePuppyStore((s) => s.estimatedDueDate);
  const birthDate = usePuppyStore((s) => s.birthDate);

  const banner = useMemo((): Banner | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Vet not confirmed
    if (vetConfirmed === 'not_yet') {
      return {
        type: 'amber',
        title: 'Vet visit not booked',
        message: 'A vet confirmation is strongly recommended before birth. Book today.',
      };
    }

    // Pregnant: near due date
    if (status === 'pregnant' && estimatedDueDate) {
      const due = new Date(estimatedDueDate);
      due.setHours(0, 0, 0, 0);
      const daysUntil = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (daysUntil < 0) {
        return { type: 'red', title: 'Overdue', message: 'Contact your vet today to discuss next steps.' };
      }
      if (daysUntil <= 3) {
        return { type: 'amber', title: `Due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`, message: 'Do not leave her alone. Check on her every 2 hours.' };
      }
    }

    // Born: eclampsia risk period (days 14–35)
    if (status === 'born' && birthDate) {
      const birth = new Date(birthDate);
      birth.setHours(0, 0, 0, 0);
      const dayAge = Math.round((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

      if (dayAge >= 14 && dayAge <= 35) {
        return {
          type: 'info',
          title: 'Eclampsia watch period',
          message: 'Watch for muscle tremors, stiff gait, or panting in the mother. Peak risk is weeks 2–5.',
        };
      }
    }

    return null;
  }, [status, vetConfirmed, estimatedDueDate, birthDate]);

  if (!banner) return null;

  const bgColor = banner.type === 'red' ? '#D4726A15' : banner.type === 'amber' ? '#D4A84B15' : Colors.primary + '08';
  const borderColor = banner.type === 'red' ? '#D4726A30' : banner.type === 'amber' ? '#D4A84B30' : Colors.primary + '15';
  const iconColor = banner.type === 'red' ? '#D4726A' : banner.type === 'amber' ? '#D4A84B' : Colors.primary;

  return (
    <View style={[styles.banner, { backgroundColor: bgColor, borderColor }]}>
      <AlertTriangle size={18} color={iconColor} />
      <View style={styles.textCol}>
        <Text variant="body" weight="bold" color={iconColor}>{banner.title}</Text>
        <Text variant="caption" color={Colors.textSecondary} style={styles.msg}>{banner.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    borderRadius: Radius.md, padding: Spacing.md,
    borderWidth: 1, marginBottom: Spacing.lg,
  },
  textCol: { flex: 1 },
  msg: { marginTop: 2, lineHeight: 19 },
});
