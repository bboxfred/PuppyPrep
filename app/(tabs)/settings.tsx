/**
 * SETTINGS SCREEN — notification controls, account, app info.
 */
import { useState, useCallback } from 'react';
import { View, ScrollView, Pressable, Switch, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Clock, User, Info, LogOut, UserCog, Gift } from 'lucide-react-native';
import { RedeemCodeModal } from '@/components/settings/RedeemCodeModal';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { useUserStore } from '@/store/useUserStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';
import { clearLocal, pushToCloud } from '@/lib/cloud-sync';

const PUPPY_PREP_LOGO = require('../../assets/images/puppyprep-logo.png');

const TIME_OPTIONS = ['07:00', '08:00', '09:00', '10:00'];
const TIME_LABELS: Record<string, string> = {
  '07:00': '7:00 AM', '08:00': '8:00 AM', '09:00': '9:00 AM', '10:00': '10:00 AM',
};

export default function SettingsScreen() {
  const tier = useUserStore((s) => s.subscriptionTier);
  const notifTime = useUserStore((s) => s.notifTime);
  const setNotifPreferences = useUserStore((s) => s.setNotifPreferences);
  const notifLeadTimeHours = useUserStore((s) => s.notifLeadTimeHours);
  const events = useCalendarStore((s) => s.events);

  const { requestPermissions, rescheduleAll, getScheduledNotifications, isLoading } = useNotifications();
  const [notifsEnabled, setNotifsEnabled] = useState(true);
  const [redeemOpen, setRedeemOpen] = useState(false);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const authUser = useAuthStore((s) => s.user);
  const userEmail = authUser?.email ?? 'Signed in';
  const userName =
    (authUser?.user_metadata as any)?.full_name ??
    (authUser?.user_metadata as any)?.name ??
    authUser?.email?.split('@')[0] ??
    'User';

  const handleSignOut = useCallback(() => {
    Alert.alert(
      'Sign out?',
      'Your data is safely stored in your account — sign back in on any device to restore it.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: async () => {
            // Push any pending changes before wiping local state
            await pushToCloud().catch(() => {});
            await supabase.auth.signOut();
            clearLocal();
            // Auth gate in root layout will redirect to /(auth)/login
          },
        },
      ]
    );
  }, []);

  const handleChangeAccount = useCallback(() => {
    Alert.alert(
      'Change account?',
      'This signs you out and returns to the login screen so you can sign in with a different Google account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change account',
          onPress: async () => {
            await pushToCloud().catch(() => {});
            await supabase.auth.signOut();
            clearLocal();
          },
        },
      ]
    );
  }, []);

  const handleToggleNotifs = useCallback(async (value: boolean) => {
    if (value) {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert('Notifications blocked', 'Go to Settings > Puppy Prep to enable notifications.');
        return;
      }
      setNotifsEnabled(true);
      await rescheduleAll(events);
    } else {
      setNotifsEnabled(false);
    }
  }, [requestPermissions, rescheduleAll, events]);

  const handleChangeTime = useCallback(async (time: string) => {
    setNotifPreferences(time, notifLeadTimeHours);
    if (notifsEnabled && tier !== 'free') {
      await rescheduleAll(events);
    }
  }, [setNotifPreferences, notifLeadTimeHours, notifsEnabled, tier, rescheduleAll, events]);

  const handleDebugNotifs = useCallback(async () => {
    const scheduled = await getScheduledNotifications();
    Alert.alert('Scheduled Notifications', `${scheduled.length} notifications scheduled`);
    console.log('[Settings] Scheduled notifications:', scheduled.length);
    scheduled.slice(0, 5).forEach((n, i) => {
      console.log(`  ${i + 1}. ${n.content.title} → ${n.trigger}`);
    });
  }, [getScheduledNotifications]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header — "Settings" title on the left, logo on the right, side by side */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Image source={PUPPY_PREP_LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── NOTIFICATIONS ── */}
        <Text variant="body" weight="bold" style={styles.sectionTitle}>
          <Bell size={16} color={Colors.primary} /> Notifications
        </Text>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text variant="body" weight="semibold">Push notifications</Text>
              <Text variant="caption" color={Colors.textSecondary}>
                {tier === 'free' ? 'Upgrade to Pro to enable' : 'Reminders for care events'}
              </Text>
            </View>
            <Switch
              value={notifsEnabled && tier !== 'free'}
              onValueChange={handleToggleNotifs}
              disabled={tier === 'free'}
              trackColor={{ false: Colors.creamDark, true: Colors.primary + '60' }}
              thumbColor={notifsEnabled && tier !== 'free' ? Colors.primary : Colors.textLight}
            />
          </View>
        </Card>

        {/* Notification time */}
        <Card style={styles.settingCard}>
          <Text variant="body" weight="semibold" style={styles.settingLabel}>
            <Clock size={14} color={Colors.textSecondary} /> Reminder time
          </Text>
          <View style={styles.timeChips}>
            {TIME_OPTIONS.map((time) => (
              <Pressable
                key={time}
                onPress={() => handleChangeTime(time)}
                style={[styles.timeChip, notifTime === time && styles.timeChipActive]}
              >
                <Text
                  variant="caption"
                  weight={notifTime === time ? 'bold' : 'regular'}
                  color={notifTime === time ? Colors.primary : Colors.textSecondary}
                >
                  {TIME_LABELS[time]}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Manual time entry — HH:MM, 24h. Overrides the preset chips above. */}
          <View style={styles.manualTimeRow}>
            <Text variant="caption" color={Colors.inkSoft} style={styles.manualTimeLabel}>
              Or set a specific time
            </Text>
            <View style={styles.manualTimeInputRow}>
              <TextInput
                value={notifTime}
                onChangeText={(v) => {
                  // Accept partial input (user is typing); apply only if it's valid HH:MM
                  if (/^\d{0,2}:?\d{0,2}$/.test(v)) {
                    if (/^\d{1,2}:\d{2}$/.test(v)) {
                      const [h, m] = v.split(':').map(Number);
                      if (h >= 0 && h < 24 && m >= 0 && m < 60) {
                        handleChangeTime(v.padStart(5, '0'));
                      }
                    }
                  }
                }}
                placeholder="HH:MM"
                placeholderTextColor={Colors.inkFaint}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
                style={styles.manualTimeInput}
              />
              <Text variant="caption" color={Colors.inkFaint} style={styles.manualTimeHint}>
                24-hour format · e.g. 06:30 or 21:15
              </Text>
            </View>
          </View>
        </Card>

        {/* Reschedule button */}
        {tier !== 'free' && (
          <Button
            title={isLoading ? 'Rescheduling...' : 'Reschedule all notifications'}
            variant="secondary"
            onPress={() => rescheduleAll(events)}
            loading={isLoading}
            style={styles.rescheduleBtn}
          />
        )}

        {/* ── ACCOUNT ── */}
        <Text variant="body" weight="bold" style={styles.sectionTitle}>
          <User size={16} color={Colors.primary} /> Account
        </Text>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text variant="body" weight="semibold" numberOfLines={1}>{userName}</Text>
              <Text variant="caption" color={Colors.textSecondary} numberOfLines={1}>{userEmail}</Text>
            </View>
          </View>

          <Pressable onPress={() => setRedeemOpen(true)} style={styles.accountAction}>
            <Gift size={18} color={Colors.primary} strokeWidth={1.75} />
            <Text variant="body" color={Colors.primary} weight="semibold">
              Redeem a code
            </Text>
          </Pressable>

          <Pressable onPress={handleChangeAccount} style={styles.accountAction}>
            <UserCog size={18} color={Colors.primary} strokeWidth={1.75} />
            <Text variant="body" color={Colors.primary} weight="semibold">
              Change account
            </Text>
          </Pressable>

          <Pressable onPress={handleSignOut} style={styles.accountAction}>
            <LogOut size={18} color="#C05B3F" strokeWidth={1.75} />
            <Text variant="body" color="#C05B3F" weight="semibold">
              Sign out
            </Text>
          </Pressable>
        </Card>

        {/* ── SUBSCRIPTION ── */}
        <Text variant="body" weight="bold" style={styles.sectionTitle}>
          <User size={16} color={Colors.primary} /> Subscription
        </Text>

        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text variant="body" weight="semibold">Current plan</Text>
              <Text variant="caption" color={Colors.textSecondary}>
                {tier === 'free' ? 'Free' : tier === 'pro' ? 'PuppyCare Pro' : 'Litter Pro'}
              </Text>
            </View>
            {tier === 'free' && (
              <Text variant="caption" weight="bold" color={Colors.primary}>Upgrade →</Text>
            )}
          </View>
        </Card>

        {/* ── APP INFO ── */}
        <Text variant="body" weight="bold" style={styles.sectionTitle}>
          <Info size={16} color={Colors.primary} /> About
        </Text>

        <Card style={styles.settingCard}>
          <View style={styles.infoRow}>
            <Text variant="caption" color={Colors.textSecondary}>App version</Text>
            <Text variant="caption" weight="semibold">1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="caption" color={Colors.textSecondary}>Events generated</Text>
            <Text variant="caption" weight="semibold">{events.length}</Text>
          </View>
        </Card>

        {/* Debug button (dev only) */}
        <Pressable onPress={handleDebugNotifs} style={styles.debugBtn}>
          <Text variant="caption" color={Colors.textLight}>View scheduled notifications (debug)</Text>
        </Pressable>

        <View style={{ height: Spacing['2xl'] }} />
      </ScrollView>

      {/* Promo code redemption modal — slides up from bottom */}
      <RedeemCodeModal
        visible={redeemOpen}
        onClose={() => setRedeemOpen(false)}
        onSuccess={(days, proUntil) => {
          // The entitlement is now in Supabase. On next Dashboard mount
          // (or via the auth store subscription) the app will reflect
          // Pro status. No local state change needed here.
          console.log(`[promo] Granted ${days} days; Pro until ${proUntil}`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.paper },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  logo: { width: 130, height: 32 },
  title: {
    fontFamily: Fonts.display, // Young Serif
    fontSize: 28,
    lineHeight: 32,
    color: Colors.ink,
    letterSpacing: -0.4,
  },
  // Tight gap: first section starts immediately under the header.
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: Spacing.xl },
  sectionTitle: { fontSize: 15, marginBottom: Spacing.sm, marginTop: Spacing.md },
  settingCard: { marginBottom: Spacing.sm },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingText: { flex: 1, marginRight: Spacing.md },
  accountAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
    paddingHorizontal: Spacing.xs,
  },
  settingLabel: { marginBottom: Spacing.sm },
  timeChips: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  manualTimeRow: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
    paddingTop: Spacing.sm + 2,
  },
  manualTimeLabel: {
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  manualTimeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  manualTimeInput: {
    width: 90,
    borderWidth: 1,
    borderColor: Colors.rule,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 8,
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: Colors.ink,
    backgroundColor: Colors.paper,
  },
  manualTimeHint: {
    flex: 1,
    fontSize: 11,
  },
  timeChip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: Radius.pill, borderWidth: 1.5, borderColor: Colors.creamDark,
    backgroundColor: Colors.surface,
  },
  timeChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  rescheduleBtn: { marginTop: Spacing.sm, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  debugBtn: { alignItems: 'center', marginTop: Spacing.lg, padding: Spacing.sm },
});
