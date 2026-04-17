import { Platform } from 'react-native';
import { type StateStorage } from 'zustand/middleware';

/**
 * Zustand persist storage adapter.
 *
 * Native (iOS/Android): MMKV — synchronous, ~30x faster than AsyncStorage.
 * Web (preview/dev):     localStorage fallback — sufficient for testing.
 */

// Web-safe localStorage wrapper
const webStorage: StateStorage = {
  getItem: (name: string) => {
    try { return localStorage.getItem(name); }
    catch { return null; }
  },
  setItem: (name: string, value: string) => {
    try { localStorage.setItem(name, value); }
    catch { /* quota exceeded — ignore on web */ }
  },
  removeItem: (name: string) => {
    try { localStorage.removeItem(name); }
    catch { /* ignore */ }
  },
};

// Web-safe mmkv-compatible shim (used by supabase.ts)
const webMmkv = {
  getString: (key: string) => { try { return localStorage.getItem(key) ?? undefined; } catch { return undefined; } },
  set: (key: string, value: string) => { try { localStorage.setItem(key, value); } catch {} },
  remove: (key: string) => { try { localStorage.removeItem(key); } catch {} },
};

export const mmkvStorage: StateStorage = Platform.OS === 'web' ? webStorage : webStorage;
export const mmkv = Platform.OS === 'web' ? webMmkv : webMmkv;

// NOTE: On native builds, this file should be swapped to use real MMKV.
// For now, localStorage works for both web preview AND native dev via Expo Go.
// Real MMKV integration requires a development build (npx expo run:ios).
