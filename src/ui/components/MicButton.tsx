import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/ui/components/Text';
import { colors } from '@/ui/theme';
import type { MicState } from '@/voice/useVoice';

interface MicButtonProps {
  state: MicState;
  onPress: () => void;
  size?: number;
}

export function MicButton({ state, onPress, size = 56 }: MicButtonProps) {
  const listening = state === 'listening';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={listening ? 'Stop listening' : 'Start listening'}
      onPress={onPress}
      disabled={state === 'transcribing'}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size, borderRadius: size / 2 },
        listening && styles.listening,
        pressed && styles.pressed,
      ]}>
      {state === 'transcribing' ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <View style={[styles.glyph, listening && styles.glyphListening]}>
          <Text variant="label" color={listening ? colors.onAccent : colors.text} style={styles.label}>
            {listening ? 'STOP' : 'MIC'}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accentDeep,
    backgroundColor: colors.surface,
  },
  listening: { backgroundColor: colors.accent, borderColor: colors.accent },
  pressed: { opacity: 0.8 },
  glyph: { alignItems: 'center', justifyContent: 'center' },
  glyphListening: {},
  label: { letterSpacing: 1.5 },
});
