import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import type { ActionThread } from '@/domain/hierarchy';
import { whyLineFor } from '@/store/selectors';
import { Button } from '@/ui/components/Button';
import { Text } from '@/ui/components/Text';
import { ThreadView } from '@/ui/components/ThreadView';
import { colors, radius, spacing } from '@/ui/theme';

interface ActionCardProps {
  thread: ActionThread;
  onDone?: () => void;
  highlighted?: boolean;
  onTalk?: () => void;
}

/** One action, the priority it serves, the why in the user's words, and the full thread one tap away. */
export function ActionCard({ thread, onDone, highlighted = false, onTalk }: ActionCardProps) {
  const [open, setOpen] = useState(false);
  const priority = thread.goals[0];
  const why = whyLineFor(thread);
  return (
    <View style={[styles.card, highlighted && styles.highlighted]}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel={open ? 'Hide thread' : 'Show thread'}
        style={({ pressed }) => [styles.head, pressed && styles.pressed]}>
        <View style={styles.body}>
          {highlighted ? <Text variant="label" color={colors.accent}>TODAY’S ONE THING</Text> : null}
          <Text variant="heading">{thread.action.text}</Text>
          {priority ? <Text variant="small">for “{priority.text}”</Text> : null}
          {why ? (
            <Text variant="small" color={colors.textMuted} style={styles.why}>
              Why, in your words: “{why}”
            </Text>
          ) : null}
        </View>
      </Pressable>
      {open ? (
        <View style={styles.thread}>
          <ThreadView thread={thread} skipFirst />
          {onTalk ? <Button label="Talk about this" kind="ghost" compact onPress={onTalk} /> : null}
        </View>
      ) : null}
      {onDone && thread.action.status === 'open' ? (
        <Button label="Done" kind="secondary" compact onPress={onDone} style={styles.done} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  highlighted: { borderColor: colors.accentDeep, backgroundColor: colors.surfaceRaised },
  pressed: { opacity: 0.9 },
  head: { flexDirection: 'row' },
  body: { flex: 1, gap: 4 },
  why: { marginTop: 4 },
  thread: { paddingTop: spacing.sm, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline, gap: spacing.sm },
  done: { alignSelf: 'flex-start' },
});
