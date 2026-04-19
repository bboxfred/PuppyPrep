/**
 * LOGIN SCREEN
 *
 * Google-only sign-in for v1. Forced — no "continue as guest" path.
 *
 * After a successful sign-in:
 *   1. useAuthStore picks up the new session via its onAuthStateChange
 *      subscription (no manual setSession needed here).
 *   2. The root layout's auth gate redirects to /(tabs) or /(onboarding)
 *      depending on whether the user has finished onboarding.
 */
import { useState } from 'react';
import { View, Image, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing, Radius, Fonts } from '@/constants/design-system';
import { signInWithGoogle } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { pullFromCloud } from '@/lib/cloud-sync';

const LOGO = require('../../assets/images/puppyprep-logo.png');

export default function LoginScreen() {
  const setSigningIn = useAuthStore((s) => s.setSigningIn);
  const setError = useAuthStore((s) => s.setError);
  const error = useAuthStore((s) => s.error);
  const [localLoading, setLocalLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLocalLoading(true);
    setSigningIn(true);
    setError(null);

    try {
      const result = await signInWithGoogle();
      if (!result.ok) {
        setError(result.error ?? 'Sign-in failed');
        return;
      }
      // On success, useAuthStore's onAuthStateChange subscription will
      // automatically update `user`. Pull cloud data in the background
      // so it's ready by the time the auth gate routes us forward.
      pullFromCloud().catch(() => { /* first sign-in has no cloud data — ok */ });
    } finally {
      setLocalLoading(false);
      setSigningIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Welcome to Puppy Prep</Text>
        <Text style={styles.subtitle}>
          From bump to bark — a personalised day-by-day care calendar for dog breeders.
        </Text>

        <View style={styles.features}>
          <Text style={styles.feature}>🐾  Personalised for 42 breeds</Text>
          <Text style={styles.feature}>📅  Every critical window, every day</Text>
          <Text style={styles.feature}>☁️  Your data, synced across devices</Text>
        </View>

        <View style={styles.spacer} />

        <Pressable
          onPress={handleGoogleSignIn}
          disabled={localLoading}
          style={({ pressed }) => [
            styles.googleBtn,
            pressed && { opacity: 0.88 },
            localLoading && { opacity: 0.6 },
          ]}
        >
          {localLoading ? (
            <ActivityIndicator color={Colors.ink} />
          ) : (
            <>
              <Image
                source={require('../../assets/images/google-logo.png')}
                style={styles.googleLogo}
                resizeMode="contain"
              />
              <Text style={styles.googleLabel}>Continue with Google</Text>
            </>
          )}
        </Pressable>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <Text style={styles.legal}>
          By continuing you agree to our{' '}
          <Text style={styles.legalLink}>Terms</Text> and{' '}
          <Text style={styles.legalLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.paper },
  content: { flex: 1, padding: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 220, height: 56, marginBottom: Spacing['2xl'] },
  title: {
    fontFamily: Fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontFamily: Fonts.display,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  features: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  feature: {
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.inkSoft,
    textAlign: 'left',
  },
  spacer: { flex: 1 },
  googleBtn: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.rule,
    paddingHorizontal: Spacing.lg,
  },
  googleLogo: { width: 22, height: 22 },
  googleLabel: {
    fontFamily: Fonts.bodySemi,
    fontSize: 16,
    color: Colors.ink,
    letterSpacing: 0.2,
  },
  errorText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#C05B3F',
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  legal: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.inkSoft,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
});
