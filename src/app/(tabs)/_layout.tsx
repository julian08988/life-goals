import { Redirect, Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { selectHasHierarchy } from '@/store/selectors';
import { useAppStore } from '@/store/useAppStore';
import { Text } from '@/ui/components/Text';
import { colors } from '@/ui/theme';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={styles.icon}>
      <View style={[styles.dot, focused && styles.dotActive]} />
      <Text variant="label" color={focused ? colors.text : colors.textFaint}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const hydrated = useAppStore((s) => s.hydrated);
  const completed = useAppStore((s) => s.interview.completedAt);
  const hasHierarchy = useAppStore((s) => selectHasHierarchy(s));

  if (!hydrated) return <View style={styles.blank} />;
  if (!completed && !hasHierarchy) return <Redirect href="/interview" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bar,
        sceneStyle: { backgroundColor: colors.background },
      }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ focused }) => <TabIcon label="Today" focused={focused} /> }} />
      <Tabs.Screen name="talk" options={{ tabBarIcon: ({ focused }) => <TabIcon label="Talk" focused={focused} /> }} />
      <Tabs.Screen name="week" options={{ tabBarIcon: ({ focused }) => <TabIcon label="Week" focused={focused} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  blank: { flex: 1, backgroundColor: colors.background },
  bar: {
    backgroundColor: colors.background,
    borderTopColor: colors.hairline,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 72,
    paddingTop: 10,
  },
  icon: { alignItems: 'center', gap: 6, width: 72 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },
  dotActive: { backgroundColor: colors.accent },
});
