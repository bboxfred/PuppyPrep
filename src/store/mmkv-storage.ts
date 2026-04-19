import { Platform } from 'react-native';
import { type StateStorage } from 'zustand/middleware';

/**
 * Zustand persist storage adapter.
 *
 * Native (iOS/Android): `react-native-mmkv` — synchronous, ~30× faster
 *                       than AsyncStorage. Survives app restart + kills.
 * Web (preview/dev):    localStorage fallback — sufficient for browser testing.
 *
 * IMPORTANT: loading real MMKV on web crashes Metro (JSI module not
 * available), so we lazy-import inside the native branch only.
 */

// ─── Web fallbacks ─────────────────────────────────────────────────────────
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

const webMmkv = {
  getString: (key: string) => { try { return localStorage.getItem(key) ?? undefined; } catch { return undefined; } },
  set: (key: string, value: string) => { try { localStorage.setItem(key, value); } catch {} },
  remove: (key: string) => { try { localStorage.removeItem(key); } catch {} },
};

// ─── Native MMKV ───────────────────────────────────────────────────────────
// Lazy-required so web never tries to load the JSI module.
let nativeStorage: StateStorage | null = null;
let nativeMmkv: typeof webMmkv | null = null;

if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MMKV } = require('react-native-mmkv');
  const instance = new MMKV({ id: 'puppyprep' });

  nativeStorage = {
    getItem: (name: string) => {
      const v = instance.getString(name);
      return v === undefined ? null : v;
    },
    setItem: (name: string, value: string) => instance.set(name, value),
    removeItem: (name: string) => instance.delete(name),
  };

  nativeMmkv = {
    getString: (key: string) => instance.getString(key),
    set: (key: string, value: string) => instance.set(key, value),
    remove: (key: string) => instance.delete(key),
  };
}

// ─── Exports ───────────────────────────────────────────────────────────────
export const mmkvStorage: StateStorage = nativeStorage ?? webStorage;
export const mmkv = nativeMmkv ?? webMmkv;
