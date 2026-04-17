/**
 * TEMPERATURE LOG STORE — persists temperature readings for pregnant dogs.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkv-storage';

export interface TempReading {
  id: string;
  date: string; // ISO
  tempCelsius: number;
  notes?: string;
}

interface TempLogState {
  readings: TempReading[];
  addReading: (tempCelsius: number, notes?: string) => void;
  clearAll: () => void;
}

export const useTempLogStore = create<TempLogState>()(
  persist(
    (set) => ({
      readings: [],
      addReading: (tempCelsius, notes) =>
        set((state) => ({
          readings: [
            { id: `temp_${Date.now()}`, date: new Date().toISOString(), tempCelsius, notes },
            ...state.readings,
          ],
        })),
      clearAll: () => set({ readings: [] }),
    }),
    { name: 'temp-log-store', storage: createJSONStorage(() => mmkvStorage) }
  )
);
