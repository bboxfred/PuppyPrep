/**
 * NOTIFICATIONS MODAL — Field Journal popup
 *
 * Shown when the user taps the bell icon on the dashboard.
 *   - Free tier  → upgrade prompt (Not now / See plans)
 *   - Pro tier   → today's critical-task summary (Close)
 *
 * Replaces the previous browser `window.confirm`/`Alert.alert` fallback so
 * the notification surface feels like part of the app, not a system dialog.
 */
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import { BellOff, Bell, X, Sparkles } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';

interface Props {
  visible: boolean;
  tier: 'free' | 'pro';
  unreadCount: number;
  onClose: () => void;
  onUpgrade: () => void;
}

export function NotificationsModal({ visible, tier, unreadCount, onClose, onUpgrade }: Props) {
  const isFree = tier === 'free';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation?.()}>
          {/* Close button */}
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={10}>
            <X size={18} color={Colors.inkSoft} strokeWidth={1.75} />
          </Pressable>

          {/* Icon */}
          <View style={styles.iconWrap}>
            {isFree ? (
              <BellOff size={26} color={Colors.terracotta} strokeWidth={1.6} />
            ) : (
              <Bell size={26} color={Colors.forest} strokeWidth={1.6} />
            )}
          </View>

          {/* Body — branches by tier */}
          {isFree ? (
            <>
              <Text style={styles.eyebrow}>REMINDERS</Text>
              <Text style={styles.headline}>Push notifications are part of Pro.</Text>
              <Text style={styles.body}>
                Unlock one-time Puppy Prep Pro to get gentle reminders for every
                critical care event — deworming windows, vet visits, weight checks,
                and the little milestones in between.
              </Text>

              <View style={styles.bulletRow}>
                <Sparkles size={14} color={Colors.ochre} strokeWidth={1.75} />
                <Text style={styles.bulletText}>14-day trial already included. No auto-charge.</Text>
              </View>

              <View style={styles.actions}>
                <Pressable onPress={onClose} hitSlop={8} style={styles.dismissBtn}>
                  <Text style={styles.dismissLabel}>Not now</Text>
                </Pressable>
                <Button title="See plans" onPress={onUpgrade} style={styles.upgradeBtn} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.eyebrow}>NOTIFICATIONS</Text>
              <Text style={styles.headline}>
                {unreadCount > 0
                  ? `${unreadCount} critical task${unreadCount === 1 ? '' : 's'} due today`
                  : 'You\u2019re all caught up.'}
              </Text>
              <Text style={styles.body}>
                {unreadCount > 0
                  ? 'Head to the Today tab to review them.'
                  : 'Enjoy the quiet. We\u2019ll nudge you when something needs your attention.'}
              </Text>

              <View style={styles.actions}>
                <View style={{ flex: 1 }} />
                <Button title="Got it" onPress={onClose} style={styles.upgradeBtn} />
              </View>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#1E2A1FCC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: Colors.paper,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: Spacing.lg,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
    zIndex: 10,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.rule,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  eyebrow: {
    fontFamily: Fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: Colors.terracotta,
    marginBottom: 4,
  },
  headline: {
    fontFamily: Fonts.display,
    fontSize: 22,
    lineHeight: 26,
    color: Colors.ink,
    letterSpacing: -0.2,
    marginBottom: Spacing.sm,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.inkSoft,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  bulletText: {
    fontFamily: Fonts.body,
    fontStyle: 'italic',
    fontSize: 13,
    color: Colors.inkSoft,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  dismissBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
  },
  dismissLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.inkSoft,
  },
  upgradeBtn: {
    minWidth: 140,
  },
});
