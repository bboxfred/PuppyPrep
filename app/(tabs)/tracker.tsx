/**
 * PUPPY WEIGHT TRACKER — Litter Pro feature (S$18.99)
 *
 * Three states:
 * 1. Not Litter Pro → FeatureGate paywall
 * 2. Litter Pro but no profiles → Setup flow
 * 3. Litter Pro with profiles → Tracker dashboard
 */
import { useState, useMemo, useCallback } from 'react';
import { View, ScrollView, FlatList, TextInput, Pressable, Modal, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Scale, TrendingUp, TrendingDown, Minus, ArrowRight, X, FileText, Trash2, Baby } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeatureGate } from '@/components/paywall/FeatureGate';
import { RecordBirthModal } from '@/components/dashboard/RecordBirthModal';
import { Colors, Spacing, Radius, Shadows, Fonts } from '@/constants/design-system';
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
import { AlertInfoModal } from '@/components/tracker/AlertInfoModal';

// ─────────────────────────────────────────────────────────────────────────────
// PUPPY CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function PuppyCard({ puppy, onPress }: { puppy: PuppyProfile; onPress: () => void }) {
  const [alertInfoOpen, setAlertInfoOpen] = useState(false);
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
      {/* Alert banner — tap to open an info modal with recommendations */}
      {alert && (
        <Pressable
          onPress={(e) => {
            // Stop the card's onPress from firing; we only want the alert modal.
            e.stopPropagation?.();
            setAlertInfoOpen(true);
          }}
          hitSlop={4}
          style={[
            styles.alertBanner,
            { backgroundColor: alert.level === 'critical' ? '#D4726A20' : '#D4A84B20' },
          ]}
        >
          <Text style={styles.alertBannerText}>{alert.title}  ·  tap for info</Text>
        </Pressable>
      )}

      {/* Alert info modal */}
      <AlertInfoModal
        visible={alertInfoOpen}
        alertType={alert?.type ?? null}
        puppyName={puppy.nickname}
        onClose={() => setAlertInfoOpen(false)}
      />

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
  const setPuppyCountStore = usePuppyStore((s) => s.setPuppyCount);

  const [profiles, setProfiles] = useState<{ nickname: string; colour: IdColour; birthWeight: string }[]>(
    Array.from({ length: puppyCount }, (_, i) => ({
      nickname: `Puppy ${i + 1}`,
      colour: ID_COLOURS[i % ID_COLOURS.length].value,
      birthWeight: '',
    }))
  );

  const addWeightLog = usePuppyTrackerStore((s) => s.addWeightLog);

  const handleAddPuppy = () => {
    if (profiles.length >= 15) return; // Upper bound — very rare to have more
    setProfiles([
      ...profiles,
      {
        nickname: `Puppy ${profiles.length + 1}`,
        colour: ID_COLOURS[profiles.length % ID_COLOURS.length].value,
        birthWeight: '',
      },
    ]);
  };

  const handleRemovePuppy = (index: number) => {
    if (profiles.length <= 1) return; // Must have at least one
    setProfiles(profiles.filter((_, i) => i !== index));
  };

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

    // Sync puppy count back to the puppy store in case user added/removed
    // during setup — keeps onboarding data consistent with actual litter.
    setPuppyCountStore(puppyProfiles.length);

    // Log birth weights as the first weight entry so they appear in summary immediately
    puppyProfiles.forEach((puppy) => {
      if (puppy.birthWeightG && puppy.birthWeightG > 0) {
        addWeightLog(puppy.id, puppy.birthWeightG, 'Birth weight');
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.setupContent} keyboardShouldPersistTaps="handled">
      {/* Overflow-hidden frame crops out the generated Polaroid-style paper
          border so only the subject shows. Scale on the inner Image zooms
          into the subject. Outer frame is 15% smaller than before. */}
      <View style={styles.setupHeroFrame}>
        <Image
          source={require('../../assets/images/setup-puppies-hero.png')}
          style={styles.setupHeroImage}
          resizeMode="contain"
        />
      </View>
      <Text variant="display" weight="heavy" style={styles.setupTitle}>
        Set up your puppies
      </Text>
      <Text variant="body" color={Colors.textSecondary} style={styles.setupSubtext}>
        Give each puppy an ID colour (match their yarn collar) and optionally a nickname. You can add or remove puppies at any time — everyone makes miscounts.
      </Text>

      {/* Puppy count indicator + stepper */}
      <View style={styles.setupCountRow}>
        <Text variant="body" weight="bold">
          {profiles.length} {profiles.length === 1 ? 'puppy' : 'puppies'}
        </Text>
        <View style={styles.setupCountActions}>
          <Pressable
            onPress={() => handleRemovePuppy(profiles.length - 1)}
            disabled={profiles.length <= 1}
            style={[styles.setupCountBtn, profiles.length <= 1 && { opacity: 0.3 }]}
          >
            <Minus size={16} color={Colors.primary} strokeWidth={2} />
          </Pressable>
          <Pressable
            onPress={handleAddPuppy}
            disabled={profiles.length >= 15}
            style={[styles.setupCountBtn, profiles.length >= 15 && { opacity: 0.3 }]}
          >
            <Plus size={16} color={Colors.primary} strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      {profiles.map((profile, i) => (
        <Card key={i} style={styles.setupCard}>
          <View style={styles.setupCardHeader}>
            <Text variant="body" weight="bold" style={styles.setupCardTitle}>Puppy {i + 1}</Text>
            {profiles.length > 1 && (
              <Pressable
                onPress={() => handleRemovePuppy(i)}
                style={styles.setupRemoveBtn}
                hitSlop={8}
              >
                <Trash2 size={16} color="#D4726A" strokeWidth={1.75} />
              </Pressable>
            )}
          </View>

          {/* Puppy name — promoted to the first field so it's obvious */}
          <Text variant="caption" color={Colors.inkSoft} style={styles.setupFieldLabel}>
            Puppy name
          </Text>
          <TextInput
            style={styles.setupInput}
            placeholder={`e.g. ${['Luna','Max','Bella','Rosie','Pip'][i % 5]}`}
            placeholderTextColor={Colors.textLight}
            value={profile.nickname}
            onChangeText={(text) => {
              const updated = [...profiles];
              updated[i] = { ...updated[i], nickname: text };
              setProfiles(updated);
            }}
          />

          {/* Colour (ID collar) */}
          <Text variant="caption" color={Colors.inkSoft} style={styles.setupFieldLabel}>
            ID colour (match the yarn collar)
          </Text>
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

          {/* Birth weight */}
          <Text variant="caption" color={Colors.inkSoft} style={styles.setupFieldLabel}>
            Birth weight (optional)
          </Text>
          <View style={styles.weightInputRow}>
            <TextInput
              style={[styles.setupInput, { flex: 1, marginBottom: 0 }]}
              placeholder="Weight at birth"
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

      {/* Add another puppy — inline below the last card so it's discoverable */}
      {profiles.length < 15 && (
        <Pressable onPress={handleAddPuppy} style={styles.addPuppyRow}>
          <Plus size={18} color={Colors.primary} strokeWidth={2} />
          <Text variant="body" weight="semibold" color={Colors.primary}>
            Add another puppy
          </Text>
        </Pressable>
      )}

      <Button title="Start Tracking" onPress={handleSave} style={styles.setupBtn} />
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRE-BIRTH WALL
// Shown when status = 'pregnant' (puppies haven't arrived yet). Blocks the
// tracker UI and prompts the user to record the birth — weight tracking
// makes no sense before Day 0.
// ─────────────────────────────────────────────────────────────────────────────

function PreBirthWall() {
  const estimatedDueDate = usePuppyStore((s) => s.estimatedDueDate);
  const [recordBirthOpen, setRecordBirthOpen] = useState(false);

  const daysUntilDue = useMemo(() => {
    if (!estimatedDueDate) return null;
    const due = new Date(estimatedDueDate);
    due.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, [estimatedDueDate]);

  const subline = useMemo(() => {
    if (daysUntilDue === null) return 'We\'ll unlock the weight tracker on Day 0.';
    if (daysUntilDue > 1) return `Estimated ${daysUntilDue} days until they arrive.`;
    if (daysUntilDue === 1) return 'Due tomorrow — keep close watch tonight.';
    if (daysUntilDue === 0) return 'Due today — the tracker unlocks the moment you record the birth.';
    return `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) === 1 ? '' : 's'} — tap below when they arrive.`;
  }, [daysUntilDue]);

  return (
    <ScrollView contentContainerStyle={styles.wallContent}>
      <View style={styles.wallIcon}>
        <Baby size={48} color={Colors.forest} strokeWidth={1.5} />
      </View>

      <Text style={styles.wallTitle}>Puppies not born yet</Text>
      <Text style={styles.wallSub}>{subline}</Text>

      <Card style={styles.wallCard}>
        <Text style={styles.wallCardTitle}>What happens here</Text>
        <Text style={styles.wallCardText}>
          Once you record the birth, this tab becomes your weight tracker. You'll be able to:
        </Text>
        <View style={styles.wallList}>
          <Text style={styles.wallListItem}>• Add each puppy with name + ID colour</Text>
          <Text style={styles.wallListItem}>• Log birth weight and daily weigh-ins</Text>
          <Text style={styles.wallListItem}>• Get alerts if any puppy stops gaining</Text>
          <Text style={styles.wallListItem}>• Edit, add, or remove puppies any time</Text>
        </View>
      </Card>

      <Pressable
        onPress={() => setRecordBirthOpen(true)}
        style={({ pressed }) => [styles.wallCta, pressed && { opacity: 0.85 }]}
      >
        <Baby size={20} color={Colors.paper} strokeWidth={1.75} />
        <Text style={styles.wallCtaText}>Record Birth</Text>
      </Pressable>

      <RecordBirthModal
        visible={recordBirthOpen}
        onClose={() => setRecordBirthOpen(false)}
      />
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
  const status = usePuppyStore((s) => s.status);

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
  const [nameEditInput, setNameEditInput] = useState('');
  const addWeightLog = usePuppyTrackerStore((s) => s.addWeightLog);
  const updatePuppy = usePuppyTrackerStore((s) => s.updatePuppy);
  // IMPORTANT: all store hooks MUST be declared here, BEFORE any early returns
  // below — React's rules-of-hooks require the same call count on every render.
  const deletePuppy = usePuppyTrackerStore((s) => s.deletePuppy);

  const router = useRouter();

  // Tracker is always free — no gate

  // Pre-birth wall — puppies aren't born yet. Block tracker UI and prompt to
  // record the birth. Takes priority over the setup flow because setting up
  // profiles before Day 0 means entering fake birth weights.
  if (status !== 'born' || !birthDate) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <PreBirthWall />
      </SafeAreaView>
    );
  }

  // Profile setup — shown once after birth is recorded, before any weight logs.
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

    // Save name change if user edited it
    const trimmedName = nameEditInput.trim();
    const current = puppies.find((p) => p.id === singleWeighPuppyId);
    if (current && trimmedName && trimmedName !== current.nickname) {
      updatePuppy(singleWeighPuppyId, { nickname: trimmedName });
    }

    // Save weight if user entered one (weight is optional — modal can be used
    // purely to edit the puppy's name)
    const w = parseInt(singleWeightInput);
    if (!isNaN(w) && w > 0) {
      addWeightLog(singleWeighPuppyId, w);
    }

    setSingleWeighPuppyId(null);
    setSingleWeightInput('');
    setNameEditInput('');
  };

  const handleDeletePuppy = () => {
    if (!singleWeighPuppyId) return;
    const puppy = puppies.find((p) => p.id === singleWeighPuppyId);
    if (!puppy) return;
    Alert.alert(
      `Remove ${puppy.nickname}?`,
      'This deletes the puppy and all of their weight logs. You can add them back later if needed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            deletePuppy(singleWeighPuppyId);
            setSingleWeighPuppyId(null);
            setSingleWeightInput('');
            setNameEditInput('');
          },
        },
      ]
    );
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
            onPress={() => {
              setSingleWeighPuppyId(item.id);
              setSingleWeightInput('');
              setNameEditInput(item.nickname ?? '');
            }}
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

            {/* Puppy name — editable. Update the name even without entering a weight. */}
            <Text variant="caption" color={Colors.inkSoft} style={styles.singleFieldLabel}>
              Puppy name
            </Text>
            <TextInput
              style={styles.singleNameInput}
              placeholder="Nickname"
              placeholderTextColor={Colors.inkFaint}
              value={nameEditInput}
              onChangeText={setNameEditInput}
              autoCapitalize="words"
            />

            <Text variant="caption" color={Colors.inkSoft} style={styles.singleFieldLabel}>
              Weight (grams)
            </Text>
            <TextInput
              style={styles.singleInput}
              placeholder="e.g. 450"
              placeholderTextColor={Colors.inkFaint}
              keyboardType="number-pad"
              value={singleWeightInput}
              onChangeText={setSingleWeightInput}
            />

            <View style={styles.singleActions}>
              <Pressable onPress={handleDeletePuppy} style={styles.singleDeleteBtn} hitSlop={8}>
                <Trash2 size={16} color="#D4726A" strokeWidth={1.75} />
                <Text variant="caption" color="#D4726A" weight="semibold">Delete</Text>
              </Pressable>
              <View style={{ flex: 1 }} />
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
  alertBannerText: { fontSize: 10, fontFamily: 'YoungSerif-Regular', color: '#D4726A' },
  colourDot: { width: 32, height: 32, borderRadius: 16, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  weightText: { fontSize: 28, marginVertical: 4 },
  recommendedText: { fontSize: 11, marginBottom: 4, lineHeight: 15 },
  gainRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  lastWeighed: { marginTop: 4, fontSize: 11 },

  // Setup
  setupContent: { padding: Spacing.lg, paddingBottom: Spacing['2xl'], alignItems: 'center' },
  // Frame crops the Polaroid-style paper border baked into the generated sketch.
  // 170×170 = 15% smaller than the previous 200×200. Inner image scales to 1.22
  // so the white margin of the illustration is cropped off.
  setupHeroFrame: {
    width: 170,
    height: 170,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setupHeroImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.22 }],
  },
  setupTitle: { fontSize: 26, marginBottom: Spacing.sm, textAlign: 'center' },
  setupSubtext: { marginBottom: Spacing.lg, lineHeight: 22, textAlign: 'center' },

  // Count stepper row — above the puppy cards, lets user +/- count fast
  setupCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.rule,
    marginBottom: Spacing.md,
  },
  setupCountActions: { flexDirection: 'row', gap: Spacing.sm },
  setupCountBtn: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary + '15',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },

  setupCard: { marginBottom: Spacing.md },
  setupCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  setupCardTitle: { marginBottom: 0 },
  setupRemoveBtn: {
    padding: 6,
    borderRadius: Radius.sm,
    backgroundColor: '#D4726A10',
  },

  // Inline "add another puppy" row at the end of the setup list
  addPuppyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.primary + '50',
    marginBottom: Spacing.lg,
  },

  // Pre-birth wall
  wallContent: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  wallIcon: {
    width: 88, height: 88, borderRadius: 44,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.forest + '10',
    borderWidth: 1.5,
    borderColor: Colors.forest + '25',
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  wallTitle: {
    fontFamily: Fonts.display,
    fontSize: 26,
    lineHeight: 32,
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  wallSub: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  wallCard: {
    width: '100%',
    marginBottom: Spacing.xl,
    backgroundColor: Colors.forest + '08',
    borderWidth: 1,
    borderColor: Colors.forest + '20',
  },
  wallCardTitle: {
    fontFamily: Fonts.bodySemi,
    fontSize: 13,
    color: Colors.forest,
    marginBottom: Spacing.xs,
  },
  wallCardText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.inkSoft,
    marginBottom: Spacing.sm,
  },
  wallList: { gap: 4 },
  wallListItem: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.inkSoft,
  },
  wallCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    width: '100%',
    paddingVertical: 16,
    borderRadius: Radius.pill,
    backgroundColor: Colors.forest,
    ...Shadows.glow,
  },
  wallCtaText: {
    fontFamily: Fonts.display,
    fontSize: 17,
    letterSpacing: 0.3,
    color: Colors.paper,
  },

  // Single puppy modal — delete button
  singleDeleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.sm,
    backgroundColor: '#D4726A10',
  },
  setupFieldLabel: {
    marginBottom: 6,
    marginTop: Spacing.xs,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  colourRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.md, flexWrap: 'wrap' },
  colourSwatch: { width: 32, height: 32, borderRadius: 10, borderWidth: 2, borderColor: 'transparent' },
  colourSwatchSelected: { borderColor: Colors.textPrimary, borderWidth: 3 },
  setupInput: {
    backgroundColor: Colors.background, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm + 2,
    fontSize: 15, fontFamily: 'DMSans-Medium', color: Colors.textPrimary,
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
    fontSize: 36, fontFamily: 'YoungSerif-Regular', color: Colors.textPrimary,
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
  singleFieldLabel: {
    marginTop: Spacing.md,
    marginBottom: 6,
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  singleNameInput: {
    borderWidth: 1,
    borderColor: Colors.rule,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontFamily: 'YoungSerif-Regular',
    fontSize: 18,
    color: Colors.ink,
    backgroundColor: Colors.paper,
  },
  singleInput: {
    backgroundColor: Colors.background, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    fontSize: 28, fontFamily: 'YoungSerif-Regular', color: Colors.textPrimary,
    textAlign: 'center', borderWidth: 1, borderColor: Colors.creamDark,
    marginBottom: Spacing.lg,
  },
  singleActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: Spacing.lg },
});
