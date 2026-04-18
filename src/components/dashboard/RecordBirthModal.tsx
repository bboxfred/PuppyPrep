/**
 * RECORD BIRTH MODAL
 *
 * Shown when status = 'pregnant' and the user wants to record that
 * puppies have arrived. Captures:
 *   - Birth date (scroll picker, default = today)
 *   - Puppy count (stepper, 1–15)
 *
 * On save:
 *   1. Calls usePuppyStore.recordBirth() — atomically transitions status
 *      to 'born', sets birthDate, sets puppyCount.
 *   2. Calls regenerate() from useScheduleEngine so the calendar rebuilds
 *      immediately with postnatal events from the correct birth anchor.
 *   3. Clears tracker profiles so the tracker setup flow runs fresh.
 */
import { useState, useMemo, useCallback } from 'react';
import {
  View,
  Modal,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Minus, Plus } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DateScrollPicker } from '@/components/ui/ScrollPicker';
import { Colors, Spacing, Radius, Fonts, FontSizes } from '@/constants/design-system';
import { usePuppyStore } from '@/store/usePuppyStore';
import { usePuppyTrackerStore } from '@/store/usePuppyTrackerStore';
import { useScheduleEngine } from '@/hooks/useScheduleEngine';

interface RecordBirthModalProps {
  visible: boolean;
  onClose: () => void;
}

export function RecordBirthModal({ visible, onClose }: RecordBirthModalProps) {
  const recordBirth = usePuppyStore((s) => s.recordBirth);
  const resetProfiles = usePuppyTrackerStore((s) => s.resetProfiles);
  const { regenerate, isLoading } = useScheduleEngine();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const minDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 7); // Can be at most a week ago to prevent errors
    return d;
  }, [today]);

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [puppyCount, setPuppyCount] = useState(1);
  const [confirmedToday, setConfirmedToday] = useState(false);
  const [saving, setSaving] = useState(false);

  const isToday = selectedDate.toDateString() === today.toDateString();
  const dayAge = Math.max(0, Math.round((today.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)));
  const needsConfirm = isToday && !confirmedToday;

  const handleSave = useCallback(async () => {
    if (needsConfirm) return;
    setSaving(true);
    try {
      // 1. Record birth in store — transitions to 'born'
      recordBirth(selectedDate.toISOString(), puppyCount);
      // 2. Reset tracker so user sets up puppy profiles fresh
      resetProfiles();
      // 3. Regenerate schedule from new birth anchor
      await regenerate();
      onClose();
    } finally {
      setSaving(false);
    }
  }, [needsConfirm, selectedDate, puppyCount, recordBirth, resetProfiles, regenerate, onClose]);

  const handleDateChange = useCallback((d: Date) => {
    setSelectedDate(d);
    setConfirmedToday(false);
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
            <X size={20} color={Colors.ink} strokeWidth={1.75} />
          </Pressable>
          <Text style={styles.headerTitle}>Record Birth</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero message */}
          <View style={styles.heroSection}>
            <Text style={styles.heroEmoji}>🐾</Text>
            <Text style={styles.heroTitle}>They're here!</Text>
            <Text style={styles.heroSub}>
              Tell us when the puppies arrived and we'll rebuild your care calendar from day one.
            </Text>
          </View>

          {/* Birth date picker */}
          <Text style={styles.sectionLabel}>Birth date</Text>
          <Card style={styles.pickerCard}>
            <DateScrollPicker
              value={selectedDate}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={today}
            />
          </Card>

          {/* Age display */}
          <View style={styles.ageRow}>
            <Text style={styles.ageLabel}>Puppy age</Text>
            <Text style={styles.ageValue}>
              {dayAge === 0 ? 'Born today' : `Day ${dayAge}`}
            </Text>
          </View>

          {/* Today confirmation */}
          {isToday && !confirmedToday && (
            <Card style={styles.confirmCard}>
              <Text style={styles.confirmQuestion}>
                Born today — arrived in the last 24 hours?
              </Text>
              <Button
                title="Yes, born today"
                onPress={() => setConfirmedToday(true)}
                style={styles.confirmBtn}
              />
            </Card>
          )}

          {/* Puppy count */}
          <Text style={styles.sectionLabel}>How many puppies?</Text>
          <Card style={styles.countCard}>
            <View style={styles.stepperRow}>
              <Pressable
                onPress={() => setPuppyCount(c => Math.max(1, c - 1))}
                style={[styles.stepBtn, puppyCount <= 1 && { opacity: 0.35 }]}
                disabled={puppyCount <= 1}
              >
                <Minus size={20} color={Colors.forest} strokeWidth={2} />
              </Pressable>

              <View style={styles.countDisplay}>
                <Text style={styles.countNumber}>{puppyCount}</Text>
                <Text style={styles.countUnit}>
                  {puppyCount === 1 ? 'puppy' : 'puppies'}
                </Text>
              </View>

              <Pressable
                onPress={() => setPuppyCount(c => Math.min(15, c + 1))}
                style={[styles.stepBtn, puppyCount >= 15 && { opacity: 0.35 }]}
                disabled={puppyCount >= 15}
              >
                <Plus size={20} color={Colors.forest} strokeWidth={2} />
              </Pressable>
            </View>

            {/* Contextual hint for edge cases */}
            {puppyCount === 1 && (
              <Text style={styles.hintText}>
                Singleton litter — we'll add a special socialisation protocol.
              </Text>
            )}
            {puppyCount >= 8 && (
              <Text style={styles.hintText}>
                Large litter — we'll add dam fatigue checks to your calendar.
              </Text>
            )}
          </Card>

          {/* Safety note */}
          <Card style={styles.safetyCard}>
            <Text style={styles.safetyTitle}>What happens next</Text>
            <Text style={styles.safetyText}>
              Your calendar will be rebuilt from Day 0. Deworming, vaccination, vet visits, and all daily tasks start from this date.{'\n\n'}
              You'll also be taken to the Weight Tracker to add each puppy's name and birth weight.
            </Text>
          </Card>

          {/* CTA */}
          <Pressable
            onPress={handleSave}
            disabled={needsConfirm || saving || isLoading}
            style={[
              styles.saveBtn,
              (needsConfirm || saving || isLoading) && { opacity: 0.4 },
            ]}
          >
            {saving || isLoading ? (
              <ActivityIndicator color={Colors.paper} size="small" />
            ) : (
              <Text style={styles.saveBtnText}>Build my puppy calendar →</Text>
            )}
          </Pressable>

          <View style={{ height: Spacing['2xl'] }} />
        </ScrollView>
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
  headerTitle: {
    fontFamily: Fonts.display,
    fontSize: 18,
    color: Colors.ink,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },

  heroSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  heroEmoji: { fontSize: 48, marginBottom: Spacing.sm },
  heroTitle: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  heroSub: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.inkSoft,
    textAlign: 'center',
  },

  sectionLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: Colors.inkSoft,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },

  pickerCard: { padding: 0, overflow: 'hidden' },

  ageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.creamLight,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.sm,
  },
  ageLabel: { fontFamily: Fonts.body, fontSize: 13, color: Colors.inkSoft },
  ageValue: { fontFamily: Fonts.display, fontSize: 15, color: Colors.ink },

  confirmCard: {
    marginTop: Spacing.sm,
    backgroundColor: '#E8A87C15',
    borderWidth: 1,
    borderColor: Colors.terracotta + '30',
  },
  confirmQuestion: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  confirmBtn: { height: 44 },

  countCard: { alignItems: 'center', paddingVertical: Spacing.lg },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
  },
  stepBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.forest + '15',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.forest + '30',
  },
  countDisplay: { alignItems: 'center', minWidth: 80 },
  countNumber: {
    fontFamily: Fonts.display,
    fontSize: 52,
    lineHeight: 56,
    color: Colors.ink,
  },
  countUnit: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.inkSoft,
    marginTop: 2,
  },
  hintText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 18,
  },

  safetyCard: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.forest + '08',
    borderWidth: 1,
    borderColor: Colors.forest + '20',
  },
  safetyTitle: {
    fontFamily: Fonts.bodySemi,
    fontSize: 13,
    color: Colors.forest,
    marginBottom: Spacing.xs,
  },
  safetyText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.inkSoft,
  },

  saveBtn: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.forest,
    borderRadius: Radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: Fonts.display,
    fontSize: 17,
    letterSpacing: 0.3,
    color: Colors.paper,
  },
});
