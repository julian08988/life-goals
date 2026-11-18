import { ActivityIndicator, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { Text } from '@/ui/components/Text';
import { colors, radius, spacing } from '@/ui/theme';

type Kind = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  kind?: Kind;
  disabled?: boolean;
  busy?: boolean;
  style?: ViewStyle;
  compact?: boolean;
}

export function Button({
  label,
  onPress,
  kind = 'primary',
  disabled = false,
  busy = false,
  style,
  compact = false,
}: ButtonProps) {
  const inactive = disabled || busy;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive }}
      onPress={onPress}
      disabled={inactive}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        styles[kind],
        inactive && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}>
      {busy ? (
        <ActivityIndicator color={kind === 'primary' ? colors.onAccent : colors.text} />
      ) : (
        <Text
          variant={compact ? 'small' : 'body'}
          color={kind === 'primary' ? colors.onAccent : colors.text}
          style={styles.label}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compact: { minHeight: 38, paddingHorizontal: spacing.md },
  primary: { backgroundColor: colors.accent },
  secondary: { borderWidth: StyleSheet.hairlineWidth, borderColor: colors.textFaint },
  ghost: {},
  disabled: { opacity: 0.35 },
  pressed: { opacity: 0.8 },
  label: { fontWeight: '500' },
});
