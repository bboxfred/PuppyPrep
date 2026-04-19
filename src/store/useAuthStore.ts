/**
 * AUTH STORE
 *
 * Tracks the signed-in Supabase user. On app boot, it rehydrates from
 * Supabase's persistent session (MMKV-backed) and subscribes to auth
 * state changes — so a token refresh or remote sign-out propagates
 * through the app automatically.
 *
 * IMPORTANT: Auth state is the root gate. Every UI surface reads
 * `isSignedIn` — if false, the root layout redirects to /(auth)/login.
 */
import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  /** `null` = unknown (still loading); `User | null` once initialised */
  user: User | null;
  session: Session | null;
  isInitialized: boolean;
  isSigningIn: boolean;
  error: string | null;

  setSession: (s: Session | null) => void;
  setError: (msg: string | null) => void;
  setSigningIn: (v: boolean) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isInitialized: false,
  isSigningIn: false,
  error: null,

  setSession: (session) => set({
    session,
    user: session?.user ?? null,
  }),

  setError: (error) => set({ error }),
  setSigningIn: (isSigningIn) => set({ isSigningIn }),

  /**
   * Called once at app boot. Reads the persisted session from Supabase's
   * MMKV-backed storage and subscribes to future auth changes.
   */
  initialize: async () => {
    if (get().isInitialized) return;

    const { data: { session } } = await supabase.auth.getSession();
    set({
      session,
      user: session?.user ?? null,
      isInitialized: true,
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      set({
        session: newSession,
        user: newSession?.user ?? null,
      });
    });
  },
}));

/** Derived selector — true only when initialised AND has a user */
export const selectIsSignedIn = (s: AuthState) =>
  s.isInitialized && !!s.user;
