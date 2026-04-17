/**
 * SETTINGS SCREEN — notification controls, account, app info.
 */
import { useState, useCallback } from 'react';
import { View, ScrollView, Pressable, Switch, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Clock, RefreshCw, User, Info, ChevronRight } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { useUserStore } from '@/store/useUserStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useNotifications } from '@/hooks/useNotifications';

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
      <View style={styles.header}>
        <Text variant="display" weight="heavy" style={styles.title}>Settings</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: 28 },
  scrollContent: { padding: Spacing.lg },
  sectionTitle: { fontSize: 15, marginBottom: Spacing.sm, marginTop: Spacing.lg },
  settingCard: { marginBottom: Spacing.sm },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingText: { flex: 1, marginRight: Spacing.md },
  settingLabel: { marginBottom: Spacing.sm },
  timeChips: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
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
