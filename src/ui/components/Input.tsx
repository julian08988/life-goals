import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { colors, radius, spacing, type } from '@/ui/theme';

export function Input({ style, multiline, ...rest }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.textFaint}
      selectionColor={colors.accent}
      keyboardAppearance="dark"
      multiline={multiline}
      {...rest}
      style={[styles.input, multiline && styles.multiline, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    ...type.body,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  multiline: { minHeight: 120, textAlignVertical: 'top' },
});
