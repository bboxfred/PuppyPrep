import { Stack } from 'expo-router';
import { Colors } from '@/constants/design-system';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.paper },
        animation: 'fade',
      }}
    />
  );
}
