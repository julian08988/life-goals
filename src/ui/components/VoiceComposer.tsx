import { StyleSheet, View } from 'react-native';

import { Button } from '@/ui/components/Button';
import { Input } from '@/ui/components/Input';
import { MicButton } from '@/ui/components/MicButton';
import { Text } from '@/ui/components/Text';
import { colors, spacing } from '@/ui/theme';
import type { MicState } from '@/voice/useVoice';

interface VoiceComposerProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  mic: MicState;
  onMic: () => void;
  placeholder?: string;
  submitLabel?: string;
  multiline?: boolean;
  error?: string | null;
  busy?: boolean;
  /** Shown under the input when the mic is a mock. */
  hint?: string | null;
}

/** Text input plus mic plus submit. Voice first, typing always available. */
export function VoiceComposer({
  value,
  onChange,
  onSubmit,
  mic,
  onMic,
  placeholder = 'Speak, or type here.',
  submitLabel = 'Save',
  multiline = true,
  error,
  busy = false,
  hint,
}: VoiceComposerProps) {
  return (
    <View style={styles.root}>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={mic === 'listening' ? 'Listening…' : placeholder}
        multiline={multiline}
        editable={mic !== 'listening'}
        onSubmitEditing={multiline ? undefined : onSubmit}
      />
      {error ? (
        <Text variant="small" color={colors.textMuted}>
          {error}
        </Text>
      ) : hint ? (
        <Text variant="small" color={colors.textFaint}>
          {hint}
        </Text>
      ) : null}
      <View style={styles.row}>
        <MicButton state={mic} onPress={onMic} />
        <Button
          label={submitLabel}
          onPress={onSubmit}
          disabled={value.trim().length === 0 || mic !== 'idle'}
          busy={busy}
          style={styles.submit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  submit: { flex: 1 },
});
