import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/ui/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'fade',
          }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="interview" />
          <Stack.Screen name="morning" />
          <Stack.Screen name="close-day" />
          <Stack.Screen name="review" />
          <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
