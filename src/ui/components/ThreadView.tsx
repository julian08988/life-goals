import { StyleSheet, View } from 'react-native';

import type { GoalThread } from '@/domain/hierarchy';
import { LEVEL_LABEL } from '@/domain/levels';
import { Text } from '@/ui/components/Text';
import { colors, spacing } from '@/ui/theme';

interface ThreadViewProps {
  thread: GoalThread;
  /** Show from the top (life goal) down instead of from the week up. */
  topDown?: boolean;
  /** Hide the lowest goal; useful when it is already the screen's title. */
  skipFirst?: boolean;
}

/** The thread from a priority up to the life goal and the scene sentence it came from. */
export function ThreadView({ thread, topDown = false, skipFirst = false }: ThreadViewProps) {
  const goals = skipFirst ? thread.goals.slice(1) : thread.goals;
  const ordered = topDown ? [...goals].reverse() : goals;
  return (
    <View style={styles.root}>
      {ordered.map((goal, i) => (
        <View key={goal.id} style={styles.row}>
          <View style={styles.rail}>
            <View style={[styles.dot, i === 0 && !topDown && styles.dotActive]} />
            {i < ordered.length - 1 || thread.passage ? <View style={styles.line} /> : null}
          </View>
          <View style={styles.body}>
            <Text variant="label">{LEVEL_LABEL[goal.level].toUpperCase()}</Text>
            <Text>{goal.text}</Text>
          </View>
        </View>
      ))}
      {thread.passage ? (
        <View style={styles.row}>
          <View style={styles.rail}>
            <View style={styles.dotFaint} />
          </View>
          <View style={styles.body}>
            <Text variant="label">YOUR WORDS</Text>
            <Text variant="bodyMuted" style={styles.quote}>
              “{thread.passage.text}”
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 0 },
  row: { flexDirection: 'row', gap: spacing.md },
  rail: { width: 12, alignItems: 'center' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.accentDeep,
  },
  dotActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  dotFaint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    backgroundColor: colors.textFaint,
  },
  line: { flex: 1, width: StyleSheet.hairlineWidth, backgroundColor: colors.accentDeep, marginVertical: 2 },
  body: { flex: 1, paddingBottom: spacing.md, gap: 2 },
  quote: { fontStyle: 'italic' },
});
