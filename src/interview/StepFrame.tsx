import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import type { MethodNoteKey } from '@/content/methods';
import { GuideLine } from '@/ui/components/GuideLine';
import { Text } from '@/ui/components/Text';
import { WhyThisStep } from '@/ui/components/WhyThisStep';
import { spacing } from '@/ui/theme';

interface StepFrameProps extends PropsWithChildren {
  eyebrow: string;
  spoken: string;
  methodKey: MethodNoteKey;
  say: (text: string) => Promise<void>;
  speaking: boolean;
  onStop: () => void;
}

/** Common shell for every interview step: eyebrow, the guide's line, why this step, body. */
export function StepFrame({ eyebrow, spoken, methodKey, say, speaking, onStop, children }: StepFrameProps) {
  return (
    <View style={styles.root}>
      <Text variant="label">{eyebrow.toUpperCase()}</Text>
      <GuideLine text={spoken} say={say} speaking={speaking} onStop={onStop} />
      <WhyThisStep step={methodKey} />
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.lg },
  body: { gap: spacing.md },
});
