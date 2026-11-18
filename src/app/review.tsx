import { router } from 'expo-router';

import { Button } from '@/ui/components/Button';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';

export default function ReviewScreen() {
  return (
    <Screen>
      <Text variant="title">Weekly Review</Text>
      <Button label="Back" kind="ghost" compact onPress={() => router.back()} />
    </Screen>
  );
}
