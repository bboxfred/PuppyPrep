/**
 * CLOUD SYNC
 *
 * Pushes every user-owned store to Supabase and pulls them back on a
 * new device. Everything still lives in MMKV locally — Supabase is a
 * mirror, not the source of truth for reads. This keeps the app fully
 * offline-capable even after sign-in.
 *
 * Stores covered (matches user decision "everything 1–4"):
 *   - usePuppyStore     → dog profile + onboarding answers
 *   - useCalendarStore  → generated events + completion marks + snoozes
 *   - usePuppyTrackerStore → puppy profiles + weight logs
 *   - useUserStore      → notification time + lead time + preferences
 *
 * Strategy:
 *   - `pushToCloud()` is called whenever the user completes an action that
 *     modifies any of those stores (debounced so we don't hammer the API).
 *   - `pullFromCloud()` is called once after a successful sign-in and
 *     overwrites local state — this is how a new device receives existing
 *     data. "Last write wins" (simplest useful semantics).
 *
 * Single cloud row per user (upserted on `user_id` PK).
 * This avoids complex per-event sync + is plenty for a breeder managing
 * one litter at a time.
 */
import { supabase } from './supabase';
import { usePuppyStore } from '@/store/usePuppyStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { usePuppyTrackerStore } from '@/store/usePuppyTrackerStore';
import { useUserStore } from '@/store/useUserStore';

// Single-row-per-user Supabase table. Schema in docs/SUPABASE_SCHEMA.sql.
const USER_DATA_TABLE = 'user_data';

interface CloudSnapshot {
  user_id: string;
  puppy_store: any;
  calendar_store: any;
  tracker_store: any;
  user_prefs: any;
  updated_at: string;
}

/**
 * Build a serialisable snapshot of every user-owned store.
 * Keys must match the `persist({ name: ... })` on each store for clarity.
 */
function snapshotLocal(userId: string): CloudSnapshot {
  const puppy = usePuppyStore.getState();
  const calendar = useCalendarStore.getState();
  const tracker = usePuppyTrackerStore.getState();
  const user = useUserStore.getState();

  // Strip functions — only serialise the data fields.
  const stripFns = <T extends object>(obj: T): Partial<T> =>
    Object.fromEntries(
      Object.entries(obj).filter(([, v]) => typeof v !== 'function')
    ) as Partial<T>;

  return {
    user_id: userId,
    puppy_store:    stripFns(puppy),
    calendar_store: stripFns(calendar),
    tracker_store:  stripFns(tracker),
    user_prefs:     stripFns(user),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Upload the current local state to the cloud. Overwrites remote.
 * Debounce this at the call-site (e.g. 2s after last store mutation)
 * so we don't spam the API on every keystroke.
 */
export async function pushToCloud(): Promise<{ ok: boolean; error?: string }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not signed in' };

  const snapshot = snapshotLocal(user.id);

  const { error } = await supabase
    .from(USER_DATA_TABLE)
    .upsert(snapshot, { onConflict: 'user_id' });

  if (error) {
    console.warn('[cloud-sync] push failed:', error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/**
 * Pull cloud state and rehydrate local stores.
 * Called once on successful sign-in. If the user has no cloud row yet
 * (brand-new account) this returns `{ ok: true, hadData: false }` and
 * the app proceeds to onboarding.
 */
export async function pullFromCloud(): Promise<{ ok: boolean; hadData: boolean; error?: string }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, hadData: false, error: 'Not signed in' };

  const { data, error } = await supabase
    .from(USER_DATA_TABLE)
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    return { ok: false, hadData: false, error: error.message };
  }

  if (!data) {
    // First sign-in on this account — no cloud data exists yet
    return { ok: true, hadData: false };
  }

  // Rehydrate each store. `setState(partial, replace=false)` preserves
  // the store's action methods while overwriting data fields.
  if (data.puppy_store)    usePuppyStore.setState(data.puppy_store);
  if (data.calendar_store) useCalendarStore.setState(data.calendar_store);
  if (data.tracker_store)  usePuppyTrackerStore.setState(data.tracker_store);
  if (data.user_prefs)     useUserStore.setState(data.user_prefs);

  return { ok: true, hadData: true };
}

/**
 * Wipe local stores (for sign-out + change-account flows).
 * Does NOT touch the cloud row — that stays intact so the user can
 * sign back in on any device and recover.
 */
export function clearLocal(): void {
  usePuppyStore.getState().resetProfile?.();
  useCalendarStore.getState().clearAll?.();
  usePuppyTrackerStore.getState().clearAll?.();
  // useUserStore.reset?.() — only clear if defined; otherwise leave prefs
}

/**
 * Debounced push — call after any user action that modifies a synced
 * store. Coalesces multiple rapid mutations into one network call.
 */
let pushTimer: ReturnType<typeof setTimeout> | null = null;
export function schedulePush(delayMs: number = 2000): void {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    pushToCloud().catch(() => { /* best-effort — local stays authoritative */ });
  }, delayMs);
}

/**
 * One-time wire-up: subscribe to every synced store's state changes and
 * debounce-push them to Supabase. Called from the root layout on boot.
 *
 * Zustand's `subscribe()` fires on every `set()` call, so any mutation
 * via any setter triggers a schedulePush (which coalesces to one network
 * round-trip per 2-second window of mutations).
 */
let subscribed = false;
export function startCloudSyncSubscriptions(): void {
  if (subscribed) return;
  subscribed = true;

  const trigger = () => schedulePush();

  usePuppyStore.subscribe(trigger);
  useCalendarStore.subscribe(trigger);
  usePuppyTrackerStore.subscribe(trigger);
  useUserStore.subscribe(trigger);
}
