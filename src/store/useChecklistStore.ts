/**
 * CHECKLIST STORE — persists whelping kit checkbox state.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkv-storage';

interface ChecklistState {
  checkedItems: Record<string, boolean>;
  toggleItem: (item: string) => void;
  getCheckedCount: () => number;
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      checkedItems: {},
      toggleItem: (item) =>
        set((state) => ({
          checkedItems: { ...state.checkedItems, [item]: !state.checkedItems[item] },
        })),
      getCheckedCount: () =>
        Object.values(get().checkedItems).filter(Boolean).length,
    }),
    { name: 'checklist-store', storage: createJSONStorage(() => mmkvStorage) }
  )
);
