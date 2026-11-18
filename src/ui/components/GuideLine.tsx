import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/ui/components/Text';
import { colors, spacing } from '@/ui/theme';

interface GuideLineProps {
  text: string;
  /** Speak when the text changes. */
  say: (text: string) => Promise<void>;
  speaking: boolean;
  onStop: () => void;
  autoSpeak?: boolean;
}

/** The sentence the guide is saying, large and alone, with tap-to-stop. */
export function GuideLine({ text, say, speaking, onStop, autoSpeak = true }: GuideLineProps) {
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (!autoSpeak || last.current === text) return;
    last.current = text;
    say(text).catch(() => undefined);
  }, [autoSpeak, say, text]);

  return (
    <Pressable onPress={speaking ? onStop : () => say(text)} accessibilityRole="button">
      <View style={styles.row}>
        <View style={[styles.orb, speaking && styles.orbActive]} />
        <Text variant="heading" style={styles.text}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  orb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.accentDeep,
  },
  orbActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  text: { flex: 1 },
});
