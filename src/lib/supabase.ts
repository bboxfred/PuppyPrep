// Note: react-native-url-polyfill is installed but imported in the root layout
// rather than here, to avoid web bundling issues.
import { createClient } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
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
 * Sign in with Google via OAuth.
 *
 * Flow (Android + iOS + Web):
 *   1. User taps "Continue with Google"
 *   2. We ask Supabase for the Google OAuth URL
 *   3. WebBrowser.openAuthSessionAsync opens an in-app browser
 *   4. User grants consent on Google's page
 *   5. Google → Supabase → puppyprep://auth/callback with tokens in URL
 *   6. We parse the returned URL and call setSession with the tokens
 *   7. useAuthStore's onAuthStateChange subscription picks it up
 */
export async function signInWithGoogle(): Promise<{ ok: boolean; error?: string }> {
  const redirectTo = Linking.createURL('auth/callback');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      // skipBrowserRedirect forces Supabase to return a URL we can open ourselves
      // (so we can close the browser tab when done — cleaner UX).
      skipBrowserRedirect: true,
    },
  });

  if (error || !data?.url) {
    return { ok: false, error: error?.message ?? 'No OAuth URL returned' };
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (result.type !== 'success' || !result.url) {
    // User cancelled, closed tab, or dismissed
    return { ok: false, error: result.type === 'cancel' ? 'Sign-in cancelled' : 'Sign-in failed' };
  }

  // Parse the returned URL — Supabase appends tokens as URL fragments:
  //   puppyprep://auth/callback#access_token=...&refresh_token=...&expires_in=...
  const url = result.url;
  const fragment = url.split('#')[1] ?? '';
  const params = new URLSearchParams(fragment);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');

  if (!access_token || !refresh_token) {
    return { ok: false, error: 'Missing tokens in callback URL' };
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (sessionError) return { ok: false, error: sessionError.message };

  return { ok: true };
}

/**
 * Legacy: magic-link email sign-in. Kept for future use but not surfaced
 * in the v1 UI — we chose Google-only per product decision.
 */
export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: Linking.createURL('auth/callback'),
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
