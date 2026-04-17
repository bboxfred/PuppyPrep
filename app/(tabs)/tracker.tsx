/**
 * PUPPY WEIGHT TRACKER — Litter Pro feature (S$18.99)
 *
 * Three states:
 * 1. Not Litter Pro → FeatureGate paywall
 * 2. Litter Pro but no profiles → Setup flow
 * 3. Litter Pro with profiles → Tracker dashboard
 */
import { useState, useMemo, useCallback } from 'react';
import { View, ScrollView, FlatList, TextInput, Pressable, Modal, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Scale, TrendingUp, TrendingDown, Minus, ArrowRight, X, FileText } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeatureGate } from '@/components/paywall/FeatureGate';
import { Colors, Spacing, Radius, Shadows } from '@/constants/design-system';
import { useUserStore } from '@/store/useUserStore';
import { usePuppyStore } from '@/store/usePuppyStore';
import {
  usePuppyTrackerStore,
  ID_COLOURS,
  type PuppyProfile,
  type IdColour,
} from '@/store/usePuppyTrackerStore';

// Breed-specific weight targets imported from veterinary reference data
import { getBreedWeightTarget, evaluateWeight } from '@/utils/weight-targets';

// ─────────────────────────────────────────────────────────────────────────────
// PUPPY CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function PuppyCard({ puppy, onPress }: { puppy: PuppyProfile; onPress: () => void }) {
  const weightLogs = usePuppyTrackerStore((s) => s.weightLogs);
  const birthDate = usePuppyStore((s) => s.birthDate);
  const breedId = usePuppyStore((s) => s.breedId);
  const ratTerrierVariety = usePuppyStore((s) => s.ratTerrierVariety);

  const logs = useMemo(() =>
    weightLogs.filter(l => l.puppyId === puppy.id).sort((a, b) => new Date(a.loggedAt).getTime() - new Date(b.loggedAt).getTime()),
    [weightLogs, puppy.id]
  );
  const latestWeight = logs.length > 0 ? logs[logs.length - 1] : null;
  const alert = useMemo(() =>
    usePuppyTrackerStore.getState().getAlertForPuppy(puppy.id, birthDate),
    [weightLogs, puppy.id, birthDate]
  );

  const colourHex = ID_COLOURS.find(c => c.value === puppy.idColour)?.hex ?? '#999';

  // Calculate day age
  const dayAge = useMemo(() => {
    if (!birthDate) return 0;
    return Math.max(0, Math.round((Date.now() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24)));
  }, [birthDate]);

  // Breed-specific weight evaluation — interpolated for exact day age
  const weightEval = useMemo(() => {
    if (!latestWeight) return null;
    const result = evaluateWeight(latestWeight.weightG, dayAge, breedId, ratTerrierVariety);
    if (result.target) {
      console.log(`[Weight] ${puppy.nickname} Day ${dayAge}: ${latestWeight.weightG}g → ${result.label} (expected ${result.target.min}–${result.target.max}g for ${breedId})`);
    }
    return result;
  }, [latestWeight, dayAge, breedId, ratTerrierVariety, puppy.nickname]);

  // Calculate gain since previous
  const gain = useMemo(() => {
    if (logs.length < 2) return null;
    const sorted = [...logs].sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());
    return sorted[0].weightG - sorted[1].weightG;
  }, [logs]);

  const lastWeighed = latestWeight
    ? new Date(latestWeight.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.puppyCard, pressed && { opacity: 0.85 }]}>
      {/* Alert banner */}
      {alert && (
        <View style={[styles.alertBanner, { backgroundColor: alert.level === 'critical' ? '#D4726A20' : '#D4A84B20' }]}>
          <Text style={styles.alertBannerText}>{alert.title}</Text>
        </View>
      )}

      {/* Colour indicator */}
      <View style={[styles.colourDot, { backgroundColor: colourHex }]} />

      {/* Info */}
      <Text variant="body" weight="bold" numberOfLines={1}>{puppy.nickname}</Text>
      <Text variant="heading" weight="heavy" style={styles.weightText}>
        {latestWeight ? `${latestWeight.weightG}g` : '—'}
      </Text>

      {/* Simple weight status */}
      {weightEval?.target && (
        <Text variant="caption" weight="semibold" color={
          weightEval.status === 'very_underweight' ? '#D4726A' :
          weightEval.status === 'slightly_underweight' ? '#D4A84B' :
          weightEval.status === 'very_overweight' ? '#D4726A' :
          weightEval.status === 'slightly_overweight' ? '#D4A84B' :
          weightEval.status === 'very_good' ? Colors.success :
          Colors.success
        } style={styles.recommendedText}>
          {weightEval.label}
        </Text>
      )}

      {/* Gain indicator */}
      {gain !== null && (
        <View style={styles.gainRow}>
          {gain > 0 ? (
            <TrendingUp size={14} color={Colors.success} />
          ) : gain < 0 ? (
            <TrendingDown size={14} color="#D4726A" />
          ) : (
            <Minus size={14} color={Colors.textLight} />
          )}
          <Text variant="caption" weight="semibold" color={gain > 0 ? Colors.success : gain < 0 ? '#D4726A' : Colors.textLight}>
            {gain > 0 ? '+' : ''}{gain}g
          </Text>
        </View>
      )}

      {lastWeighed && (
        <Text variant="caption" color={Colors.textLight} style={styles.lastWeighed}>
          Last: {lastWeighed}
        </Text>
      )}
    </Pressable>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETUP FLOW
// ─────────────────────────────────────────────────────────────────────────────

function ProfileSetup() {
  const puppyCount = usePuppyStore((s) => s.puppyCount) ?? 4;
  const dogId = usePuppyStore((s) => s.dogId) ?? 'local_dog_1';
  const setupProfiles = usePuppyTrackerStore((s) => s.setupProfiles);

  const [profiles, setProfiles] = useState<{ nickname: string; colour: IdColour; birthWeight: string }[]>(
    Array.from({ length: puppyCount }, (_, i) => ({
      nickname: `Puppy ${i + 1}`,
      colour: ID_COLOURS[i % ID_COLOURS.length].value,
      birthWeight: '',
    }))
  );

  const addWeightLog = usePuppyTrackerStore((s) => s.addWeightLog);

  const handleSave = () => {
    const puppyProfiles: PuppyProfile[] = profiles.map((p, i) => ({
      id: `puppy_${Date.now()}_${i}`,
      dogId,
      nickname: p.nickname || `Puppy ${i + 1}`,
      idColour: p.colour,
      birthWeightG: p.birthWeight ? parseInt(p.birthWeight) : null,
      sex: null,
      createdAt: new Date().toISOString(),
    }));
    setupProfiles(puppyProfiles);

    // Also log birth weights as the first weight entry so they appear in summary immediately
    puppyProfiles.forEach((puppy) => {
      if (puppy.birthWeightG && puppy.birthWeightG > 0) {
        addWeightLog(puppy.id, puppy.birthWeightG, 'Birth weight');
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.setupContent}>
      <Text variant="display" weight="heavy" style={styles.setupTitle}>
        Set up your puppies
      </Text>
      <Text variant="body" color={Colors.textSecondary} style={styles.setupSubtext}>
        Give each puppy an ID colour (match their yarn collar) and optionally a nickname.
      </Text>

      {profiles.map((profile, i) => (
        <Card key={i} style={styles.setupCard}>
          <Text variant="body" weight="bold" style={styles.setupCardTitle}>Puppy {i + 1}</Text>

          {/* Colour selection */}
          <View style={styles.colourRow}>
            {ID_COLOURS.map((c) => (
              <Pressable
                key={c.value}
                onPress={() => {
                  const updated = [...profiles];
                  updated[i] = { ...updated[i], colour: c.value };
                  setProfiles(updated);
                }}
                style={[
                  styles.colourSwatch,
                  { backgroundColor: c.hex },
                  profile.colour === c.value && styles.colourSwatchSelected,
                ]}
              />
            ))}
          </View>

          {/* Nickname */}
          <TextInput
            style={styles.setupInput}
            placeholder="Nickname (optional)"
            placeholderTextColor={Colors.textLight}
            value={profile.nickname}
            onChangeText={(text) => {
              const updated = [...profiles];
              updated[i] = { ...updated[i], nickname: text };
              setProfiles(updated);
            }}
          />

          {/* Birth weight */}
          <View style={styles.weightInputRow}>
            <TextInput
              style={[styles.setupInput, { flex: 1 }]}
              placeholder="Birth weight"
              placeholderTextColor={Colors.textLight}
              keyboardType="number-pad"
              value={profile.birthWeight}
              onChangeText={(text) => {
                const updated = [...profiles];
                updated[i] = { ...updated[i], birthWeight: text };
                setProfiles(updated);
              }}
            />
            <Text variant="caption" color={Colors.textSecondary} style={styles.gramLabel}>g</Text>
          </View>
        </Card>
      ))}

      <Button title="Start Tracking" onPress={handleSave} style={styles.setupBtn} />
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WEIGH ALL FLOW (Modal)
// ─────────────────────────────────────────────────────────────────────────────

function WeighAllModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const puppies = usePuppyTrackerStore((s) => s.puppies);
  const weightLogs = usePuppyTrackerStore((s) => s.weightLogs);
  const addWeightLog = usePuppyTrackerStore((s) => s.addWeightLog);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [weightInput, setWeightInput] = useState('');
  const [results, setResults] = useState<{ id: string; name: string; weight: number | null }[]>([]);
  const [done, setDone] = useState(false);

  const currentPuppy = puppies[currentIndex];
  const colourHex = currentPuppy ? ID_COLOURS.find(c => c.value === currentPuppy.idColour)?.hex ?? '#999' : '#999';
  const prevWeight = useMemo(() => {
    if (!currentPuppy) return null;
    const logs = weightLogs.filter(l => l.puppyId === currentPuppy.id);
    if (logs.length === 0) return null;
    return logs.sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime())[0];
  }, [currentPuppy, weightLogs]);

  const handleNext = () => {
    const weight = parseInt(weightInput);
    if (currentPuppy) {
      if (!isNaN(weight) && weight > 0) {
        addWeightLog(currentPuppy.id, weight);
        setResults(prev => [...prev, { id: currentPuppy.id, name: currentPuppy.nickname, weight }]);
      } else {
        setResults(prev => [...prev, { id: currentPuppy.id, name: currentPuppy.nickname, weight: null }]);
      }
    }
    setWeightInput('');

    if (currentIndex + 1 >= puppies.length) {
      setDone(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleClose = () => {
    setCurrentIndex(0);
    setWeightInput('');
    setResults([]);
    setDone(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <SafeAreaView style={styles.weighAllContainer}>
        {/* Header */}
        <View style={styles.weighAllHeader}>
          <Pressable onPress={handleClose} style={styles.weighAllClose}>
            <X size={22} color={Colors.textPrimary} />
          </Pressable>
          <Text variant="body" weight="semibold">
            {done ? 'All done!' : `Puppy ${currentIndex + 1} of ${puppies.length}`}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {done ? (
          /* Summary */
          <ScrollView contentContainerStyle={styles.weighSummary}>
            <Text style={styles.summaryEmoji}>✅</Text>
            <Text variant="heading" weight="bold" style={styles.summaryTitle}>Weighing complete</Text>
            {results.map((r, i) => (
              <View key={i} style={styles.summaryRow}>
                <Text variant="body" weight="medium">{r.name}</Text>
                <Text variant="body" weight="bold" color={r.weight ? Colors.textPrimary : Colors.textLight}>
                  {r.weight ? `${r.weight}g` : 'Skipped'}
                </Text>
              </View>
            ))}
            <Button title="Done" onPress={handleClose} style={styles.summaryBtn} />
          </ScrollView>
        ) : currentPuppy ? (
          /* Weigh one puppy */
          <View style={styles.weighOneContainer}>
            <View style={[styles.weighColourBig, { backgroundColor: colourHex }]} />
            <Text variant="heading" weight="bold" style={styles.weighName}>{currentPuppy.nickname}</Text>
            {prevWeight && (
              <Text variant="caption" color={Colors.textSecondary}>
                Previous: {prevWeight.weightG}g
              </Text>
            )}

            <TextInput
              style={styles.weighInput}
              placeholder="Weight in grams"
              placeholderTextColor={Colors.textLight}
              keyboardType="number-pad"
              value={weightInput}
              onChangeText={setWeightInput}
              autoFocus
            />

            <View style={styles.weighActions}>
              <Pressable onPress={handleNext} style={styles.skipBtn}>
                <Text variant="caption" color={Colors.textSecondary}>Skip</Text>
              </Pressable>
              <Button
                title={currentIndex + 1 >= puppies.length ? 'Finish' : 'Next'}
                onPress={handleNext}
                style={styles.weighNextBtn}
              />
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN TRACKER SCREEN
// ─────────────────────────────────────────────────────────────────────────────

export default function TrackerScreen() {
  const tier = useUserStore((s) => s.subscriptionTier);
  const profilesSetUp = usePuppyTrackerStore((s) => s.profilesSetUp);
  const puppies = usePuppyTrackerStore((s) => s.puppies);
  const weightLogs = usePuppyTrackerStore((s) => s.weightLogs);
  const birthDate = usePuppyStore((s) => s.birthDate);

  // Compute alerts and summary from raw data — avoids infinite loop from store selectors
  const alerts = useMemo(() => {
    return usePuppyTrackerStore.getState().getAllAlerts(birthDate);
  }, [puppies, weightLogs, birthDate]);

  const summary = useMemo(() => {
    return usePuppyTrackerStore.getState().getLitterSummary(birthDate);
  }, [puppies, weightLogs, birthDate]);

  const [weighAllVisible, setWeighAllVisible] = useState(false);
  const [singleWeighPuppyId, setSingleWeighPuppyId] = useState<string | null>(null);
  const [singleWeightInput, setSingleWeightInput] = useState('');
  const addWeightLog = usePuppyTrackerStore((s) => s.addWeightLog);

  const router = useRouter();

  // Tracker is always free — no gate

  // Profile setup
  if (!profilesSetUp) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ProfileSetup />
      </SafeAreaView>
    );
  }

  // Litter summary export
  const handleExportSummary = () => {
    const dayAge = birthDate
      ? Math.round((Date.now() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0;
    const lines = [`Litter summary — Day ${dayAge}\n`];
    summary.forEach(row => {
      const status = row.status === 'on_track' ? '✅' : row.status === 'watch' ? '⚠️' : '🔴';
      const bw = row.birthWeight ?? '?';
      const cw = row.currentWeight ?? '?';
      const gain = row.totalGain !== null ? `+${row.totalGain}g` : '';
      lines.push(`${row.puppy.nickname} (${row.puppy.idColour}): ${bw}g → ${cw}g ${gain} ${status}`);
    });
    const text = lines.join('\n');
    Alert.alert('Litter Summary', text);
  };

  const handleSingleWeighSave = () => {
    if (!singleWeighPuppyId) return;
    const w = parseInt(singleWeightInput);
    if (!isNaN(w) && w > 0) {
      addWeightLog(singleWeighPuppyId, w);
    }
    setSingleWeighPuppyId(null);
    setSingleWeightInput('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text variant="display" weight="heavy" style={styles.title}>Weight Tracker</Text>
          <Text variant="caption" color={Colors.textSecondary}>{puppies.length} puppies</Text>
        </View>
        <Pressable onPress={handleExportSummary} style={styles.summaryBtn2}>
          <FileText size={18} color={Colors.primary} />
          <Text variant="caption" weight="semibold" color={Colors.primary}>Summary</Text>
        </Pressable>
      </View>

      {/* Alerts */}
      {alerts.filter(a => a.level === 'critical').map(alert => (
        <View key={alert.puppyId} style={styles.criticalAlert}>
          <Text variant="body" weight="bold" color="#D4726A">{alert.title}</Text>
          <Text variant="caption" color={Colors.textSecondary} style={styles.alertMsg}>{alert.action}</Text>
        </View>
      ))}

      {/* Weigh All button */}
      <Pressable onPress={() => setWeighAllVisible(true)} style={styles.weighAllBtn}>
        <Scale size={20} color="#FFF" />
        <Text variant="body" weight="bold" color="#FFF">Weigh All Puppies</Text>
      </Pressable>

      {/* Puppy grid */}
      <FlatList
        data={puppies}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PuppyCard
            puppy={item}
            onPress={() => { setSingleWeighPuppyId(item.id); setSingleWeightInput(''); }}
          />
        )}
      />

      {/* Weigh All modal */}
      <WeighAllModal visible={weighAllVisible} onClose={() => setWeighAllVisible(false)} />

      {/* Single puppy weigh modal */}
      <Modal visible={!!singleWeighPuppyId} animationType="fade" transparent onRequestClose={() => setSingleWeighPuppyId(null)}>
        <View style={styles.singleOverlay}>
          <Card style={styles.singleCard}>
            <Text variant="heading" weight="bold">Log weight</Text>
            <Text variant="caption" color={Colors.textSecondary} style={styles.singlePuppyName}>
              {puppies.find(p => p.id === singleWeighPuppyId)?.nickname ?? 'Puppy'}
            </Text>
            <TextInput
              style={styles.singleInput}
              placeholder="Weight in grams"
              placeholderTextColor={Colors.textLight}
              keyboardType="number-pad"
              value={singleWeightInput}
              onChangeText={setSingleWeightInput}
              autoFocus
            />
            <View style={styles.singleActions}>
              <Pressable onPress={() => setSingleWeighPuppyId(null)}>
                <Text variant="body" color={Colors.textSecondary}>Cancel</Text>
              </Pressable>
              <Button title="Save" onPress={handleSingleWeighSave} style={{ height: 44, paddingHorizontal: Spacing.xl }} />
            </View>
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm,
  },
  title: { fontSize: 28 },
  summaryBtn2: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.primary + '10', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: Radius.pill,
  },

  // Alerts
  criticalAlert: {
    marginHorizontal: Spacing.lg, marginBottom: Spacing.sm,
    padding: Spacing.md, backgroundColor: '#D4726A10',
    borderRadius: Radius.sm, borderWidth: 1, borderColor: '#D4726A30',
  },
  alertMsg: { marginTop: 4, lineHeight: 18 },

  // Weigh All button
  weighAllBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    marginHorizontal: Spacing.lg, marginVertical: Spacing.md,
    backgroundColor: Colors.primary, borderRadius: Radius.pill,
    paddingVertical: 14, ...Shadows.glow,
  },

  // Puppy grid
  gridRow: { gap: Spacing.sm, paddingHorizontal: Spacing.lg },
  gridContent: { paddingBottom: Spacing['2xl'] },
  puppyCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.creamDark, ...Shadows.card,
    position: 'relative', overflow: 'hidden',
  },
  alertBanner: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingVertical: 3, paddingHorizontal: Spacing.sm,
  },
  alertBannerText: { fontSize: 10, fontFamily: 'Nunito-Bold', color: '#D4726A' },
  colourDot: { width: 32, height: 32, borderRadius: 16, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  weightText: { fontSize: 28, marginVertical: 4 },
  recommendedText: { fontSize: 11, marginBottom: 4, lineHeight: 15 },
  gainRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  lastWeighed: { marginTop: 4, fontSize: 11 },

  // Setup
  setupContent: { padding: Spacing.lg, paddingBottom: Spacing['2xl'] },
  setupTitle: { fontSize: 26, marginBottom: Spacing.sm },
  setupSubtext: { marginBottom: Spacing.lg, lineHeight: 22 },
  setupCard: { marginBottom: Spacing.md },
  setupCardTitle: { marginBottom: Spacing.sm },
  colourRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.md, flexWrap: 'wrap' },
  colourSwatch: { width: 32, height: 32, borderRadius: 10, borderWidth: 2, borderColor: 'transparent' },
  colourSwatchSelected: { borderColor: Colors.textPrimary, borderWidth: 3 },
  setupInput: {
    backgroundColor: Colors.background, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm + 2,
    fontSize: 15, fontFamily: 'Quicksand-Medium', color: Colors.textPrimary,
    borderWidth: 1, borderColor: Colors.creamDark, marginBottom: Spacing.sm,
  },
  weightInputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  gramLabel: { fontSize: 16 },
  setupBtn: { marginTop: Spacing.lg },

  // Weigh All modal
  weighAllContainer: { flex: 1, backgroundColor: Colors.background },
  weighAllHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.creamDark + '30',
  },
  weighAllClose: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.creamDark + '30', alignItems: 'center', justifyContent: 'center' },
  weighOneContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  weighColourBig: { width: 80, height: 80, borderRadius: 28, marginBottom: Spacing.lg },
  weighName: { fontSize: 24, marginBottom: Spacing.xs },
  weighInput: {
    width: '80%', backgroundColor: Colors.surface, borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.lg,
    fontSize: 36, fontFamily: 'Nunito-ExtraBold', color: Colors.textPrimary,
    textAlign: 'center', borderWidth: 2, borderColor: Colors.creamDark,
    marginTop: Spacing.xl, marginBottom: Spacing.xl,
  },
  weighActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl },
  skipBtn: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
  weighNextBtn: { paddingHorizontal: Spacing['2xl'] },

  // Summary
  weighSummary: { alignItems: 'center', padding: Spacing.xl },
  summaryEmoji: { fontSize: 56, marginBottom: Spacing.md },
  summaryTitle: { marginBottom: Spacing.lg },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', width: '100%',
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.creamDark + '30',
  },
  summaryBtn: { marginTop: Spacing.xl, width: '100%' },

  // Single weigh modal
  singleOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: Spacing.xl },
  singleCard: { padding: Spacing.xl },
  singlePuppyName: { marginBottom: Spacing.md },
  singleInput: {
    backgroundColor: Colors.background, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    fontSize: 28, fontFamily: 'Nunito-Bold', color: Colors.textPrimary,
    textAlign: 'center', borderWidth: 1, borderColor: Colors.creamDark,
    marginBottom: Spacing.lg,
  },
  singleActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: Spacing.lg },
});
