import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkv-storage';
import type { SizeCategory } from '@/data/breeds/registry';

export type DogStatus = 'pregnant' | 'born';
export type NursingStatus = 'all' | 'some' | 'none_or_unsure';
export type VetConfirmed = 'ultrasound' | 'exam_only' | 'not_yet';
export type DamAgeBand = 'under_1' | '1_to_2' | '2_to_5' | '5_to_7' | 'over_7';

interface DogProfile {
  dogId: string | null;
  dogName: string | null;

  // Q1 — Breed
  breedId: string | null;
  breedName: string | null;
  breedGroupId: string | null;
  sizeCategory: SizeCategory | null;

  // Q2 — Status
  status: DogStatus | null;

  // Q3/Q4 — Mating date
  matingDateKnown: boolean | null;
  matingDate: string | null;         // ISO string for persistence
  estimatedDueDate: string | null;
  dateIsEstimated: boolean;

  // Q5 — Birth date (if born)
  birthDate: string | null;

  // Q6 — Puppy count
  puppyCount: number | null;
  isSingleton: boolean;

  // Q7 — Nursing status
  nursingStatus: NursingStatus | null;

  // Q8 — Vet confirmed
  vetConfirmed: VetConfirmed | null;

  // Q9 — First litter
  firstLitter: boolean | null;

  // Q10 — Dam age
  damAgeBand: DamAgeBand | null;

  // Q11 — Dam weight
  damWeightKg: number | null;

  // Q12 — Notifications (stored on user store, but tracked here for completeness)

  // Breed flags (resolved from registry)
  isJrtType: boolean;
  isFoxTerrier: boolean;
  isWireFoxTerrier: boolean;
  isBorderTerrier: boolean;
  isMinPin: boolean;
  isRatTerrier: boolean;
  ratTerrierVariety: 'miniature' | 'standard' | null;
}

interface PuppyState extends DogProfile {
  // Actions — one per onboarding question
  setBreed: (breedId: string, breedName: string, groupId: string, size: SizeCategory) => void;
  setStatus: (status: DogStatus) => void;
  setMatingDate: (date: string, isEstimated: boolean) => void;
  setBirthDate: (date: string) => void;
  setPuppyCount: (count: number) => void;
  setNursingStatus: (status: NursingStatus) => void;
  setVetConfirmed: (status: VetConfirmed) => void;
  setFirstLitter: (first: boolean) => void;
  setDamAge: (band: DamAgeBand) => void;
  setDamWeight: (kg: number) => void;
  setDogId: (id: string) => void;
  setDogName: (name: string) => void;
  setBreedFlags: (flags: Partial<Pick<DogProfile,
    'isJrtType' | 'isFoxTerrier' | 'isWireFoxTerrier' |
    'isBorderTerrier' | 'isMinPin' | 'isRatTerrier' | 'ratTerrierVariety'
  >>) => void;
  resetProfile: () => void;
}

const initialState: DogProfile = {
  dogId: null,
  dogName: null,
  breedId: null,
  breedName: null,
  breedGroupId: null,
  sizeCategory: null,
  status: null,
  matingDateKnown: null,
  matingDate: null,
  estimatedDueDate: null,
  dateIsEstimated: false,
  birthDate: null,
  puppyCount: null,
  isSingleton: false,
  nursingStatus: null,
  vetConfirmed: null,
  firstLitter: null,
  damAgeBand: null,
  damWeightKg: null,
  isJrtType: false,
  isFoxTerrier: false,
  isWireFoxTerrier: false,
  isBorderTerrier: false,
  isMinPin: false,
  isRatTerrier: false,
  ratTerrierVariety: null,
};

export const usePuppyStore = create<PuppyState>()(
  persist(
    (set) => ({
      ...initialState,

      setBreed: (breedId, breedName, groupId, size) =>
        set({ breedId, breedName, breedGroupId: groupId, sizeCategory: size }),

      setStatus: (status) =>
        set({ status }),

      setMatingDate: (date, isEstimated) => {
        const matingDate = isEstimated ? null : date;
        const estimatedDueDate = isEstimated
          ? date
          : new Date(new Date(date).getTime() + 63 * 24 * 60 * 60 * 1000).toISOString();
        set({ matingDate, estimatedDueDate, dateIsEstimated: isEstimated, matingDateKnown: !isEstimated });
      },

      setBirthDate: (date) =>
        set({ birthDate: date }),

      setPuppyCount: (count) =>
        set({ puppyCount: count, isSingleton: count === 1 }),

      setNursingStatus: (status) =>
        set({ nursingStatus: status }),

      setVetConfirmed: (status) =>
        set({ vetConfirmed: status }),

      setFirstLitter: (first) =>
        set({ firstLitter: first }),

      setDamAge: (band) =>
        set({ damAgeBand: band }),

      setDamWeight: (kg) =>
        set({ damWeightKg: kg }),

      setDogId: (id) =>
        set({ dogId: id }),

      setDogName: (name) =>
        set({ dogName: name }),

      setBreedFlags: (flags) =>
        set(flags),

      resetProfile: () =>
        set(initialState),
    }),
    {
      name: 'puppy-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
