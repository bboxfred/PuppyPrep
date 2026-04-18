import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, CalendarDays, BookOpen, Scale, Settings } from 'lucide-react-native';
import { Colors } from '@/constants/design-system';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  // Tab bar sizing — icon + label + minimal padding. Previous 84px on web
  // had too much empty space below the labels. We shrink to a compact
  // 58px-tall bar, adjusted up by iOS home-indicator inset when present.
  const bottomPad = Platform.OS === 'web' ? 10 : Math.max(insets.bottom, 8);
  const height = 58 + bottomPad;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.rule,
          height,
          paddingBottom: bottomPad,
          paddingTop: 4,
        },
        tabBarItemStyle: {
          // Even spacing: each tab takes equal width and is vertically centered.
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontFamily: 'DMSans-Medium',
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => <CalendarDays size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color, size }) => <Scale size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
