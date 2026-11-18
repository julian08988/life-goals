import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';

import { colors, type } from '@/ui/theme';

type Variant = keyof typeof type;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: string;
}

export function Text({ variant = 'body', color, style, ...rest }: TextProps) {
  return (
    <RNText
      {...rest}
      style={[type[variant], { color: color ?? defaultColor(variant) }, styles.base, style]}
    />
  );
}

function defaultColor(variant: Variant): string {
  switch (variant) {
    case 'bodyMuted':
    case 'small':
      return colors.textMuted;
    case 'label':
      return colors.textFaint;
    default:
      return colors.text;
  }
}

const styles = StyleSheet.create({
  base: { fontFamily: undefined },
});
