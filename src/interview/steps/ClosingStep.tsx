import { StyleSheet, View } from 'react-native';

import { WEEKDAY_LABEL } from '@/domain/dates';
import type { Weekday } from '@/domain/types';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Chip } from '@/ui/components/Chip';
import { Input } from '@/ui/components/Input';
import { Text } from '@/ui/components/Text';
import { spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

import { StepFrame } from '../StepFrame';
import { STEP_SPOKEN } from '../script';

interface ClosingStepProps {
  onBack: () => void;
  onDone: () => void;
}

const DAYS: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

export function ClosingStep({ onBack, onDone }: ClosingStepProps) {
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const voice = useVoice({ onTranscript: () => undefined });
  const timeValid = /^([01]\d|2[0-3]):[0-5]\d$/.test(settings.morningTime);

  return (
    <StepFrame
      eyebrow="Set"
      spoken={STEP_SPOKEN.closing ?? ''}
      methodKey="morning.hear_goals"
      say={voice.say}
      speaking={voice.speaking}
      onStop={voice.hush}>
      <View style={styles.group}>
        <Text variant="label">WEEKLY REVIEW DAY</Text>
        <View style={styles.chips}>
          {DAYS.map((d) => (
            <Chip
              key={d}
              label={WEEKDAY_LABEL[d].slice(0, 3)}
              selected={settings.reviewDay === d}
              onPress={() => updateSettings({ reviewDay: d })}
            />
          ))}
        </View>
      </View>
      <View style={styles.group}>
        <Text variant="label">MORNING COURSE TIME</Text>
        <Input
          value={settings.morningTime}
          onChangeText={(morningTime) => updateSettings({ morningTime })}
          placeholder="07:30"
          multiline={false}
          keyboardType="numbers-and-punctuation"
        />
      </View>
      <View style={styles.nav}>
        <Button label="Back" kind="ghost" compact onPress={onBack} />
        <Button label="Go to today" onPress={onDone} disabled={!timeValid} compact />
      </View>
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  group: { gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
});
