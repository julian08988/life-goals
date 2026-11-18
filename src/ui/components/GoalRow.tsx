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

export function GoalRow({ text, detail, onRemove, onPress, trailing }: GoalRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && onPress && styles.pressed]}>
      <View style={styles.body}>
        <Text>{text}</Text>
        {detail ? <Text variant="small">{detail}</Text> : null}
      </View>
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
    </Pressable>
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
  pressed: { opacity: 0.85 },
  body: { flex: 1, gap: 4 },
  remove: { paddingTop: 2 },
});
