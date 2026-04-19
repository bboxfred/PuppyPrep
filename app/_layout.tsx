import { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import 'react-native-url-polyfill/auto';
import { useAuthStore, selectIsSignedIn } from '@/store/useAuthStore';
import { startCloudSyncSubscriptions } from '@/lib/cloud-sync';
// ── Field Journal fonts ──
import { YoungSerif_400Regular } from '@expo-google-fonts/young-serif';
import {
  DMSans_400Regular, DMSans_500Medium,
  DMSans_600SemiBold, DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

// ── Notification handler — runs when notification received while app is foregrounded ──
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    const priority = notification.request.content.data?.priority as string | undefined;
    const showAlert = priority === 'critical' || Platform.OS === 'android';
    const playSound = priority === 'critical' || priority === 'high';
    return {
      shouldShowAlert: showAlert,
      shouldShowBanner: showAlert,
      shouldShowList: showAlert,
      shouldPlaySound: playSound,
      shouldSetBadge: priority === 'critical',
    };
  },
});

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();
  const segments = useSegments();
  const notificationResponseListener = useRef<Notifications.EventSubscription | null>(null);

  // ── Auth gate ─────────────────────────────────────────────────────────────
  // Initialise Supabase session once on boot, then watch for auth changes.
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isSignedIn = useAuthStore(selectIsSignedIn);
  const initializeAuth = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initializeAuth();
    // Subscribe to store changes → debounced cloud push.
    // Only does real work once a signed-in user exists (guards inside pushToCloud).
    startCloudSyncSubscriptions();
  }, [initializeAuth]);

  // Redirect based on auth state. Runs AFTER initialise finishes so we
  // don't flash the login screen for users with a persisted session.
  useEffect(() => {
    if (!isInitialized) return;
    const inAuthGroup = segments[0] === '(auth)';

    if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isSignedIn && inAuthGroup) {
      // Signed in but stuck on the login screen — route to app
      router.replace('/(tabs)');
    }
  }, [isInitialized, isSignedIn, segments, router]);

  // Load Field Journal fonts (Young Serif + DM Sans). All references to legacy
  // Nunito / Quicksand names were swept to the new names in a prior step.
  useEffect(() => {
    Font.loadAsync({
      'YoungSerif-Regular': YoungSerif_400Regular,
      'DMSans-Regular':    DMSans_400Regular,
      'DMSans-Medium':     DMSans_500Medium,
      'DMSans-SemiBold':   DMSans_600SemiBold,
      'DMSans-Bold':       DMSans_700Bold,
    }).then(() => setFontsLoaded(true));
  }, []);

  // ── Deep link handler — when user taps a notification ──
  useEffect(() => {
    if (Platform.OS === 'web') return; // Notifications not available on web

    // Handle notification tapped (warm start — app in background)
    notificationResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        const route = data?.deepLink as string | undefined;
        if (route) {
          setTimeout(() => router.push(route as any), 300);
        }
      });

    // Handle cold start — check if app was opened via notification
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        const data = response.notification.request.content.data;
        const route = data?.deepLink as string | undefined;
        if (route) {
          setTimeout(() => router.push(route as any), 500);
        }
      }
    });

    return () => {
      if (notificationResponseListener.current) {
        notificationResponseListener.current.remove();
      }
    };
  }, [router]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2D4A32" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F5EDE0' },
          animation: 'slide_from_right',
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5EDE0' },
});
