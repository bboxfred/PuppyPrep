// Note: react-native-url-polyfill is installed but imported in the root layout
// rather than here, to avoid web bundling issues.
import { createClient } from '@supabase/supabase-js';
import { mmkv } from '@/store/mmkv-storage';

// ─────────────────────────────────────────────────────────────────────────────
// MMKV-backed storage adapter for Supabase Auth
// Supabase expects an AsyncStorage-compatible interface.
// ─────────────────────────────────────────────────────────────────────────────

const SupabaseStorage = {
  getItem: (key: string) => mmkv.getString(key) ?? null,
  setItem: (key: string, value: string) => mmkv.set(key, value),
  removeItem: (key: string) => { mmkv.remove(key); },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE CLIENT
// Replace these with your actual Supabase project credentials.
// For production, use environment variables via expo-constants.
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: SupabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Required for React Native
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH HELPERS — Magic Link Email
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a magic link to the user's email.
 * No password required — just tap the link in the email to sign in.
 */
export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'puppyprep://auth/callback',
    },
  });

  if (error) throw error;
}

/**
 * Sign out and clear the session.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get the current session (or null if not authenticated).
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

/**
 * Listen for auth state changes.
 * Returns an unsubscribe function.
 */
export function onAuthStateChange(
  callback: (event: string, session: any) => void
) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription.unsubscribe;
}
