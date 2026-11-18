import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/ui/components/Text';
import { colors, radius, spacing } from '@/ui/theme';

interface GoalRowProps {
  text: string;
  /** Small line under the text: parent, source quote, if-then. */
  detail?: string | null;
  onRemove?: () => void;
  onPress?: () => void;
  trailing?: React.ReactNode;
}

/** A goal or action line. Only the text is pressable, so controls beside it never nest inside it. */
export function GoalRow({ text, detail, onRemove, onPress, trailing }: GoalRowProps) {
  const body = (
    <View style={styles.body}>
      <Text>{text}</Text>
      {detail ? <Text variant="small">{detail}</Text> : null}
    </View>
  );
  return (
    <View style={styles.row}>
      {onPress ? (
        <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [styles.pressArea, pressed && styles.pressed]}>
          {body}
        </Pressable>
      ) : (
        body
      )}
      {trailing}
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Remove"
          onPress={onRemove}
          hitSlop={12}
          style={styles.remove}>
          <Text variant="label" color={colors.textFaint}>
            ✕
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  pressArea: { flex: 1 },
  pressed: { opacity: 0.7 },
  body: { flex: 1, gap: 4 },
  remove: { paddingTop: 2 },
});
