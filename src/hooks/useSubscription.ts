/**
 * USE SUBSCRIPTION — Simplified to 2 tiers (free trial + pro)
 *
 * Free: 14 days full access, then limited
 * Pro: S$12.99 one-time, everything unlocked forever
 */
import { useState, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  useUserStore,
  isTrialActive,
  isAccessLocked,
  getTrialDaysUsed,
  shouldShowNudge,
} from '@/store/useUserStore';

export const PRODUCT_ID = 'puppyprep_pro_lifetime';
export const PRICE = 'S$12.99';

export function useSubscription() {
  const tier = useUserStore((s) => s.subscriptionTier);
  const setSubscription = useUserStore((s) => s.setSubscription);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPro = tier === 'pro';
  const trialActive = isTrialActive();
  const trialDays = getTrialDaysUsed();
  const locked = isAccessLocked();
  const showNudge = shouldShowNudge();

  /** Full access = paid OR still in trial */
  const hasFullAccess = isPro || trialActive;

  const purchasePro = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    if (Platform.OS === 'web') {
      // Mock purchase for web testing
      console.log('[Subscription] MOCK PURCHASE (web)');
      setSubscription('pro', PRODUCT_ID, new Date().toISOString());
      setIsLoading(false);
      return true;
    }

    try {
      const Purchases = (await import('react-native-purchases')).default;
      const offerings = await Purchases.getOfferings();
      const pkg = offerings?.current?.availablePackages?.find(
        (p: any) => p.product?.identifier === PRODUCT_ID
      );
      if (!pkg) throw new Error('Product not found');

      const { customerInfo } = await Purchases.purchasePackage(pkg);
      const hasEntitlement = customerInfo?.entitlements?.active?.['pro_access'];
      if (hasEntitlement) {
        setSubscription('pro', PRODUCT_ID, new Date().toISOString());
        return true;
      }
      return false;
    } catch (err: any) {
      if (err?.userCancelled) return false;
      setError(err?.message ?? 'Purchase failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setSubscription]);

  const restorePurchases = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'web') return false;
    setIsLoading(true);
    try {
      const Purchases = (await import('react-native-purchases')).default;
      const info = await Purchases.restorePurchases();
      if (info?.entitlements?.active?.['pro_access']) {
        setSubscription('pro', PRODUCT_ID, new Date().toISOString());
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setSubscription]);

  return {
    isPro,
    hasFullAccess,
    trialActive,
    trialDays,
    locked,
    showNudge,
    isLoading,
    error,
    purchasePro,
    restorePurchases,
  };
}
