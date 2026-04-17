import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkv-storage';

/**
 * Two tiers only:
 * - 'free' = 14-day trial (everything unlocked), then limited
 * - 'pro'  = paid (S$12.99 one-time, everything unlocked forever)
 */
export type SubscriptionTier = 'free' | 'pro';

interface UserState {
  id: string | null;
  email: string | null;

  // Subscription
  subscriptionTier: SubscriptionTier;
  purchaseDate: string | null;
  productId: string | null;

  // Trial — 14 days free, no payment mentions during onboarding
  trialStartDate: string | null;  // ISO — set when onboarding completes

  // Notification preferences
  notifTime: string;
  notifLeadTimeHours: number;

  // Session
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;

  // Actions
  setUser: (id: string, email: string) => void;
  clearUser: () => void;
  setSubscription: (tier: SubscriptionTier, productId?: string | null, purchaseDate?: string | null) => void;
  setNotifPreferences: (time: string, leadHours: number) => void;
  setOnboardingComplete: () => void;
  startTrial: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      email: null,
      subscriptionTier: 'free',
      purchaseDate: null,
      productId: null,
      trialStartDate: null,
      notifTime: '08:00',
      notifLeadTimeHours: 0,
      isAuthenticated: false,
      hasCompletedOnboarding: false,

      setUser: (id, email) => set({ id, email, isAuthenticated: true }),

      clearUser: () => set({
        id: null, email: null, isAuthenticated: false,
        subscriptionTier: 'free', purchaseDate: null, productId: null,
      }),

      setSubscription: (tier, productId = null, purchaseDate = null) =>
        set({ subscriptionTier: tier, productId, purchaseDate }),

      setNotifPreferences: (time, leadHours) =>
        set({ notifTime: time, notifLeadTimeHours: leadHours }),

      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),

      startTrial: () => set({ trialStartDate: new Date().toISOString() }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// ── TRIAL HELPERS ──

/** How many days since trial started */
export function getTrialDaysUsed(): number {
  const start = useUserStore.getState().trialStartDate;
  if (!start) return 0;
  return Math.floor((Date.now() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
}

/** Is the 14-day trial still active? */
export function isTrialActive(): boolean {
  const tier = useUserStore.getState().subscriptionTier;
  if (tier === 'pro') return false; // Paid — not on trial
  return getTrialDaysUsed() <= 14;
}

/** Should we show a payment nudge? (after day 10, soft) */
export function shouldShowNudge(): boolean {
  const tier = useUserStore.getState().subscriptionTier;
  if (tier === 'pro') return false;
  const days = getTrialDaysUsed();
  return days >= 10;
}

/** Is the user's access fully locked? (trial expired + not paid) */
export function isAccessLocked(): boolean {
  const tier = useUserStore.getState().subscriptionTier;
  if (tier === 'pro') return false;
  return getTrialDaysUsed() > 14;
}
