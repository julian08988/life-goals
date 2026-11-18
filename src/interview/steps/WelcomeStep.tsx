import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { methodNote } from '@/content/methods';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Input } from '@/ui/components/Input';
import { Text } from '@/ui/components/Text';
import { WhyThisStep } from '@/ui/components/WhyThisStep';
import { spacing } from '@/ui/theme';

import { HEADLINE, SUBLINE } from '../script';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const savedName = useAppStore((s) => s.settings.name);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const [name, setName] = useState(savedName ?? '');

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <Text variant="display">{HEADLINE}</Text>
        <Text variant="display">{SUBLINE}</Text>
      </View>
      <Text variant="bodyMuted">
        One interview, about forty-five minutes. You describe the life you intend to have, then
        distill it into goals for five years, one year, six months, this month and this week. Every
        step shows the technique it uses and how strong the evidence is. Stop any time; you come
        back to the same question.
      </Text>
      <WhyThisStep step="interview.opening" />
      <View style={styles.field}>
        <Text variant="label">YOUR FIRST NAME</Text>
        <Input value={name} onChangeText={setName} placeholder="So the guide can address you" autoCapitalize="words" />
        <Text variant="small">{methodNote('morning.reframe').note}</Text>
      </View>
      <Button
        label="Start the interview"
        onPress={() => {
          updateSettings({ name: name.trim() || null });
          onNext();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.lg },
  hero: { gap: spacing.xs, paddingVertical: spacing.lg },
  field: { gap: spacing.sm },
});
