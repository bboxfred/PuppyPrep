/**
 * PUPPY TRACKER STORE
 *
 * Manages puppy profiles and weight logs for the Litter Pro feature.
 * Persisted to MMKV for offline logging. Syncs to Supabase when online.
 *
 * Weight alert logic is embedded here — runs after every weight entry.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkv-storage';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type IdColour = 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple' | 'white' | 'pink';

export const ID_COLOURS: { value: IdColour; hex: string; label: string }[] = [
  { value: 'red',    hex: '#E74C3C', label: 'Red' },
  { value: 'blue',   hex: '#3498DB', label: 'Blue' },
  { value: 'green',  hex: '#2ECC71', label: 'Green' },
  { value: 'yellow', hex: '#F1C40F', label: 'Yellow' },
  { value: 'orange', hex: '#E67E22', label: 'Orange' },
  { value: 'purple', hex: '#9B59B6', label: 'Purple' },
  { value: 'white',  hex: '#ECF0F1', label: 'White' },
  { value: 'pink',   hex: '#FD79A8', label: 'Pink' },
];

export interface PuppyProfile {
  id: string;
  dogId: string;
  nickname: string;
  idColour: IdColour;
  birthWeightG: number | null;
  sex: 'male' | 'female' | null;
  createdAt: string;
}

export interface WeightLog {
  id: string;
  puppyId: string;
  weightG: number;
  loggedAt: string; // ISO
  notes?: string;
  synced: boolean;  // false = queued for Supabase sync
}

export type AlertLevel = 'critical' | 'high' | 'none';
export type AlertType =
  | 'lost_weight'
  | 'very_slow_gain'
  | 'below_birth_weight'
  | 'runt'
  | 'slow_gain';

export interface PuppyAlert {
  puppyId: string;
  level: AlertLevel;
  type: AlertType;
  title: string;
  message: string;
  action: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ALERT CALCULATION
// ─────────────────────────────────────────────────────────────────────────────

function calculateAlerts(
  puppy: PuppyProfile,
  logs: WeightLog[],
  allPuppyLogs: Map<string, WeightLog[]>,
  birthDate: string | null
): PuppyAlert | null {
  if (logs.length < 2) return null;

  const sorted = [...logs].sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());
  const latest = sorted[0];
  const previous = sorted[1];
  const gain = latest.weightG - previous.weightG;

  const dayAge = birthDate
    ? Math.round((new Date().getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // CRITICAL: Weight loss after Day 1
  if (gain < 0 && dayAge > 1) {
    return {
      puppyId: puppy.id,
      level: 'critical',
      type: 'lost_weight',
      title: `🔴 ${puppy.nickname} lost weight`,
      message: `Lost ${Math.abs(gain)}g since last weigh. Weight loss after Day 1 needs immediate attention.`,
      action: 'Supplement with Esbilac after each nursing session. If no improvement in 6 hours, call your vet.',
    };
  }

  // CRITICAL: Less than 5g gain in 24 hours
  const hoursSinceLastWeigh = (new Date(latest.loggedAt).getTime() - new Date(previous.loggedAt).getTime()) / (1000 * 60 * 60);
  if (gain < 5 && hoursSinceLastWeigh >= 20 && dayAge <= 14) {
    return {
      puppyId: puppy.id,
      level: 'critical',
      type: 'very_slow_gain',
      title: `🔴 ${puppy.nickname} — very slow gain`,
      message: `Only ${gain}g gain in the last ${Math.round(hoursSinceLastWeigh)} hours. Small breed puppies need 10–20g per day.`,
      action: 'Supplement with formula after every nursing session. Weigh again in 4 hours.',
    };
  }

  // CRITICAL: Weight below birth weight after Day 1
  if (puppy.birthWeightG && latest.weightG < puppy.birthWeightG * 0.9 && dayAge > 1) {
    return {
      puppyId: puppy.id,
      level: 'critical',
      type: 'below_birth_weight',
      title: `🔴 ${puppy.nickname} below birth weight`,
      message: `Current weight (${latest.weightG}g) is more than 10% below birth weight (${puppy.birthWeightG}g).`,
      action: 'This puppy needs immediate supplementation. Call your vet if not improving within 4 hours.',
    };
  }

  // HIGH: Significantly below littermate average
  let lightestVsHeaviest = false;
  if (allPuppyLogs.size > 1) {
    const latestWeights: number[] = [];
    allPuppyLogs.forEach((pLogs) => {
      if (pLogs.length > 0) {
        const pSorted = [...pLogs].sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());
        latestWeights.push(pSorted[0].weightG);
      }
    });
    const heaviest = Math.max(...latestWeights);
    if (latest.weightG < heaviest * 0.75) {
      lightestVsHeaviest = true;
    }
  }

  if (lightestVsHeaviest) {
    return {
      puppyId: puppy.id,
      level: 'high',
      type: 'runt',
      title: `⚠️ ${puppy.nickname} — runt alert`,
      message: `This puppy is significantly lighter than the heaviest littermate (more than 25% difference).`,
      action: 'Move this puppy to the front of the rotation. Supplement after every nursing session.',
    };
  }

  // HIGH: Gaining less than 10% per day for 2 consecutive days
  if (sorted.length >= 3) {
    const gain1 = sorted[0].weightG - sorted[1].weightG;
    const gain2 = sorted[1].weightG - sorted[2].weightG;
    const pct1 = sorted[1].weightG > 0 ? gain1 / sorted[1].weightG : 0;
    const pct2 = sorted[2].weightG > 0 ? gain2 / sorted[2].weightG : 0;
    if (pct1 < 0.1 && pct2 < 0.1 && dayAge <= 14) {
      return {
        puppyId: puppy.id,
        level: 'high',
        type: 'slow_gain',
        title: `⚠️ ${puppy.nickname} — slow gain`,
        message: `Gaining less than 10% per day for 2 consecutive weighings.`,
        action: 'Supplement with formula. Ensure this puppy gets rear nipples (highest milk flow).',
      };
    }
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

interface PuppyTrackerState {
  puppies: PuppyProfile[];
  weightLogs: WeightLog[];
  profilesSetUp: boolean;

  // Actions
  setupProfiles: (puppies: PuppyProfile[]) => void;
  addPuppy: (puppy: PuppyProfile) => void;
  updatePuppy: (id: string, updates: Partial<PuppyProfile>) => void;
  deletePuppy: (id: string) => void;
  resetProfiles: () => void;
  addWeightLog: (puppyId: string, weightG: number, notes?: string) => void;
  deleteWeightLog: (logId: string) => void;
  clearAll: () => void;

  // Queries
  getLogsForPuppy: (puppyId: string) => WeightLog[];
  getLatestWeight: (puppyId: string) => WeightLog | null;
  getAlertForPuppy: (puppyId: string, birthDate: string | null) => PuppyAlert | null;
  getAllAlerts: (birthDate: string | null) => PuppyAlert[];
  getLitterSummary: (birthDate: string | null) => LitterSummaryRow[];
}

export interface LitterSummaryRow {
  puppy: PuppyProfile;
  birthWeight: number | null;
  currentWeight: number | null;
  totalGain: number | null;
  dailyAvgGain: number | null;
  status: 'on_track' | 'watch' | 'concern';
}

export const usePuppyTrackerStore = create<PuppyTrackerState>()(
  persist(
    (set, get) => ({
      puppies: [],
      weightLogs: [],
      profilesSetUp: false,

      setupProfiles: (puppies) => set({ puppies, profilesSetUp: true }),

      addPuppy: (puppy) => set((s) => ({ puppies: [...s.puppies, puppy] })),

      updatePuppy: (id, updates) => set((s) => ({
        puppies: s.puppies.map(p => p.id === id ? { ...p, ...updates } : p),
      })),

      deletePuppy: (id) => set((s) => ({
        puppies: s.puppies.filter(p => p.id !== id),
        weightLogs: s.weightLogs.filter(l => l.puppyId !== id),
      })),

      resetProfiles: () => set({ puppies: [], profilesSetUp: false }),

      addWeightLog: (puppyId, weightG, notes) => set((s) => ({
        weightLogs: [
          ...s.weightLogs,
          {
            id: `wl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            puppyId,
            weightG,
            loggedAt: new Date().toISOString(),
            notes,
            synced: false,
          },
        ],
      })),

      deleteWeightLog: (logId) => set((s) => ({
        weightLogs: s.weightLogs.filter(l => l.id !== logId),
      })),

      clearAll: () => set({ puppies: [], weightLogs: [], profilesSetUp: false }),

      getLogsForPuppy: (puppyId) => {
        return get().weightLogs
          .filter(l => l.puppyId === puppyId)
          .sort((a, b) => new Date(a.loggedAt).getTime() - new Date(b.loggedAt).getTime());
      },

      getLatestWeight: (puppyId) => {
        const logs = get().weightLogs.filter(l => l.puppyId === puppyId);
        if (logs.length === 0) return null;
        return logs.sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime())[0];
      },

      getAlertForPuppy: (puppyId, birthDate) => {
        const { puppies, weightLogs } = get();
        const puppy = puppies.find(p => p.id === puppyId);
        if (!puppy) return null;
        const logs = weightLogs.filter(l => l.puppyId === puppyId);

        const allPuppyLogs = new Map<string, WeightLog[]>();
        puppies.forEach(p => {
          allPuppyLogs.set(p.id, weightLogs.filter(l => l.puppyId === p.id));
        });

        return calculateAlerts(puppy, logs, allPuppyLogs, birthDate);
      },

      getAllAlerts: (birthDate) => {
        const { puppies } = get();
        const alerts: PuppyAlert[] = [];
        for (const puppy of puppies) {
          const alert = get().getAlertForPuppy(puppy.id, birthDate);
          if (alert) alerts.push(alert);
        }
        return alerts;
      },

      getLitterSummary: (birthDate) => {
        const { puppies, weightLogs } = get();
        const dayAge = birthDate
          ? Math.max(1, Math.round((Date.now() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24)))
          : 1;

        return puppies.map(puppy => {
          const logs = weightLogs
            .filter(l => l.puppyId === puppy.id)
            .sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());

          const currentWeight = logs[0]?.weightG ?? null;
          const birthWeight = puppy.birthWeightG;
          const totalGain = currentWeight !== null && birthWeight !== null ? currentWeight - birthWeight : null;
          const dailyAvgGain = totalGain !== null ? Math.round(totalGain / dayAge) : null;

          let status: 'on_track' | 'watch' | 'concern' = 'on_track';
          if (totalGain !== null && birthWeight !== null) {
            const gainPct = totalGain / birthWeight;
            const expectedPct = dayAge * 0.1; // 10% per day
            if (gainPct < expectedPct * 0.5) status = 'concern';
            else if (gainPct < expectedPct * 0.75) status = 'watch';
          }

          return { puppy, birthWeight, currentWeight, totalGain, dailyAvgGain, status };
        });
      },
    }),
    {
      name: 'puppy-tracker-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
