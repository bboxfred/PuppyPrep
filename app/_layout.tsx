import { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import {
  Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold,
  Nunito_700Bold, Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import {
  Quicksand_400Regular, Quicksand_500Medium,
  Quicksand_600SemiBold, Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

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
  const notificationResponseListener = useRef<Notifications.EventSubscription | null>(null);

  // Load fonts
  useEffect(() => {
    Font.loadAsync({
      'Nunito-Regular': Nunito_400Regular,
      'Nunito-Medium': Nunito_500Medium,
      'Nunito-SemiBold': Nunito_600SemiBold,
      'Nunito-Bold': Nunito_700Bold,
      'Nunito-ExtraBold': Nunito_800ExtraBold,
      'Quicksand-Regular': Quicksand_400Regular,
      'Quicksand-Medium': Quicksand_500Medium,
      'Quicksand-SemiBold': Quicksand_600SemiBold,
      'Quicksand-Bold': Quicksand_700Bold,
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
        <ActivityIndicator size="large" color="#2C6E6F" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F5F0EB' },
          animation: 'slide_from_right',
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A3C3D' },
});
