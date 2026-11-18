import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/ui/theme';

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  /** Pinned below the scrolling content (input bars, primary actions). */
  footer?: React.ReactNode;
  padded?: boolean;
}

export function Screen({ children, scroll = true, footer, padded = true }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const padding = padded ? styles.padded : undefined;
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {scroll ? (
        <ScrollView
          style={styles.root}
          contentContainerStyle={[padding, { paddingTop: insets.top + spacing.md }]}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.root, padding, { paddingTop: insets.top + spacing.md }]}>
          {children}
        </View>
      )}
      {footer ? (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          {footer}
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  padded: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
});
