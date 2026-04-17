/**
 * GRADUATION SCREEN — Day 56 celebration
 * Shown when puppies reach 8 weeks. Summarises the journey.
 */
import { useMemo } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/design-system';
import { useCalendarStore } from '@/store/useCalendarStore';
import { usePuppyStore } from '@/store/usePuppyStore';
import { usePuppyTrackerStore } from '@/store/usePuppyTrackerStore';

export default function GraduationScreen() {
  const router = useRouter();
  const events = useCalendarStore((s) => s.events);
  const breedName = usePuppyStore((s) => s.breedName);
  const puppyCount = usePuppyStore((s) => s.puppyCount);
  const birthDate = usePuppyStore((s) => s.birthDate);
  const puppies = usePuppyTrackerStore((s) => s.puppies);
  const weightLogs = usePuppyTrackerStore((s) => s.weightLogs);

  const stats = useMemo(() => {
    const completed = events.filter(e => e.completed).length;
    const total = events.length;
    const weighings = weightLogs.length;

    const dayAge = birthDate
      ? Math.round((Date.now() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24))
      : 56;

    return { completed, total, weighings, dayAge };
  }, [events, weightLogs, birthDate]);

  // Puppy summary
  const puppySummary = useMemo(() => {
    return puppies.map(p => {
      const logs = weightLogs
        .filter(l => l.puppyId === p.id)
        .sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());
      const currentWeight = logs[0]?.weightG ?? null;
      const birthWeight = p.birthWeightG;
      const totalGain = currentWeight && birthWeight ? currentWeight - birthWeight : null;
      return { ...p, currentWeight, totalGain };
    });
  }, [puppies, weightLogs]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={[Colors.primary, Colors.tealLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroEmoji}>🎓</Text>
          <Text style={styles.heroTitle}>Congratulations!</Text>
          <Text style={styles.heroSubtitle}>
            {puppyCount ?? 'Your'} {breedName ?? ''} {(puppyCount ?? 0) === 1 ? 'puppy has' : 'puppies have'} graduated!
          </Text>
          <Text style={styles.heroDay}>Day {stats.dayAge}</Text>
        </LinearGradient>

        {/* Journey stats */}
        <Card style={styles.statsCard}>
          <Text variant="heading" weight="bold" style={styles.statsTitle}>Your journey</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.dayAge}</Text>
              <Text variant="caption" color={Colors.textSecondary}>Days of care</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.completed}</Text>
              <Text variant="caption" color={Colors.textSecondary}>Tasks completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.weighings}</Text>
              <Text variant="caption" color={Colors.textSecondary}>Weight logs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{Math.round((stats.completed / Math.max(stats.total, 1)) * 100)}%</Text>
              <Text variant="caption" color={Colors.textSecondary}>Completion rate</Text>
            </View>
          </View>
        </Card>

        {/* Puppy summary */}
        {puppySummary.length > 0 && (
          <Card style={styles.puppyCard}>
            <Text variant="heading" weight="bold" style={styles.statsTitle}>Your puppies</Text>
            {puppySummary.map((p, i) => (
              <View key={p.id} style={[styles.puppyRow, i < puppySummary.length - 1 && styles.puppyRowBorder]}>
                <View style={[styles.puppyDot, { backgroundColor: p.idColour ? ('#E74C3C') : Colors.primary }]} />
                <View style={styles.puppyInfo}>
                  <Text variant="body" weight="semibold">{p.nickname}</Text>
                  {p.currentWeight && (
                    <Text variant="caption" color={Colors.textSecondary}>
                      {p.birthWeightG}g → {p.currentWeight}g
                      {p.totalGain ? ` (+${p.totalGain}g)` : ''}
                    </Text>
                  )}
                </View>
                <Text style={styles.puppyCheck}>✅</Text>
              </View>
            ))}
          </Card>
        )}

        {/* What's next */}
        <Card style={styles.nextCard}>
          <Text variant="heading" weight="bold" style={styles.statsTitle}>What's next</Text>
          <View style={styles.nextItem}>
            <Text style={styles.nextEmoji}>💉</Text>
            <View style={styles.nextText}>
              <Text variant="body" weight="semibold">Week 10 — Second vaccination</Text>
              <Text variant="caption" color={Colors.textSecondary}>DHPP #2, 2–4 weeks after first dose</Text>
            </View>
          </View>
          <View style={styles.nextItem}>
            <Text style={styles.nextEmoji}>💉</Text>
            <View style={styles.nextText}>
              <Text variant="body" weight="semibold">Week 14 — Final vaccination + Rabies</Text>
              <Text variant="caption" color={Colors.textSecondary}>Full protection 2 weeks after this</Text>
            </View>
          </View>
          <View style={styles.nextItem}>
            <Text style={styles.nextEmoji}>🏠</Text>
            <View style={styles.nextText}>
              <Text variant="body" weight="semibold">Rehoming</Text>
              <Text variant="caption" color={Colors.textSecondary}>Puppies are ready for their new homes</Text>
            </View>
          </View>
        </Card>

        {/* Thank you */}
        <View style={styles.thankYou}>
          <Text style={styles.thankEmoji}>🐾</Text>
          <Text variant="body" weight="bold" color={Colors.primary} style={styles.thankText}>
            You gave them the best start in life.
          </Text>
          <Text variant="caption" color={Colors.textSecondary} style={styles.thankSub}>
            Your care during these 8 weeks shaped their health, behaviour, and future.
            The Emergency Guide and Birth Guide remain free forever if you need them again.
          </Text>
        </View>

        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text variant="body" weight="semibold" color={Colors.primary}>Back to dashboard</Text>
        </Pressable>

        <View style={{ height: Spacing['2xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing['2xl'] },
  hero: {
    paddingTop: Spacing['2xl'] + Spacing.lg, paddingBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.lg, alignItems: 'center',
  },
  heroEmoji: { fontSize: 64, marginBottom: Spacing.md },
  heroTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 32, color: '#FFF', marginBottom: Spacing.sm },
  heroSubtitle: { fontFamily: 'Quicksand-Medium', fontSize: 16, color: '#FFFFFFC0', textAlign: 'center', lineHeight: 24 },
  heroDay: { fontFamily: 'Nunito-Bold', fontSize: 14, color: '#FFFFFF80', marginTop: Spacing.sm, backgroundColor: '#FFFFFF20', paddingHorizontal: 14, paddingVertical: 4, borderRadius: Radius.pill },
  statsCard: { margin: Spacing.lg, marginTop: -Spacing.lg, padding: Spacing.lg },
  statsTitle: { marginBottom: Spacing.md },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  statItem: { width: '50%', alignItems: 'center', paddingVertical: Spacing.sm },
  statNumber: { fontFamily: 'Nunito-ExtraBold', fontSize: 28, color: Colors.primary },
  puppyCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.lg, padding: Spacing.lg },
  puppyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm },
  puppyRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.creamDark + '30' },
  puppyDot: { width: 12, height: 12, borderRadius: 6, marginRight: Spacing.sm },
  puppyInfo: { flex: 1 },
  puppyCheck: { fontSize: 18 },
  nextCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.lg, padding: Spacing.lg },
  nextItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.md },
  nextEmoji: { fontSize: 22, marginTop: 2 },
  nextText: { flex: 1 },
  thankYou: { alignItems: 'center', paddingHorizontal: Spacing.xl, marginVertical: Spacing.lg },
  thankEmoji: { fontSize: 36, marginBottom: Spacing.sm },
  thankText: { textAlign: 'center', marginBottom: Spacing.sm },
  thankSub: { textAlign: 'center', lineHeight: 20 },
  backBtn: { alignItems: 'center', paddingVertical: Spacing.md },
});
