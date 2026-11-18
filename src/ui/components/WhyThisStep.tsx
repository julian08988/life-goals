import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  CONFIDENCE_LABEL,
  methodNote,
  methodsFor,
  type Confidence,
  type MethodNoteKey,
} from '@/content/methods';
import { Text } from '@/ui/components/Text';
import { colors, radius, spacing } from '@/ui/theme';

interface WhyThisStepProps {
  step: MethodNoteKey;
}

/**
 * One line plus a confidence tag; expands to the method's explanation and source.
 * Content comes from src/content/method-notes.json (spec §8).
 */
export function WhyThisStep({ step }: WhyThisStepProps) {
  const [open, setOpen] = useState(false);
  const note = methodNote(step);
  const methods = methodsFor(note);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={open ? 'Hide why this step' : 'Show why this step'}
      onPress={() => setOpen((v) => !v)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.row}>
        <Text variant="small" style={styles.note}>
          {note.note}
        </Text>
        <ConfidenceTag confidence={note.confidence} />
      </View>
      {open ? (
        <View style={styles.detail}>
          {methods.map((m) => (
            <View key={m.id} style={styles.method}>
              <Text variant="small" color={colors.text}>
                {m.name}
              </Text>
              <Text variant="small">{m.why}.</Text>
            </View>
          ))}
          {note.confidenceDetail ? <Text variant="small">{note.confidenceDetail}.</Text> : null}
          <Text variant="label">SOURCE</Text>
          <Text variant="small">{note.source}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function ConfidenceTag({ confidence }: { confidence: Confidence }) {
  return (
    <View style={[styles.tag, styles[confidence]]}>
      <Text variant="label" color={colors.text} style={styles.tagText}>
        {CONFIDENCE_LABEL[confidence].split(' ')[0].toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  pressed: { opacity: 0.85 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  note: { flex: 1 },
  detail: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  method: { gap: 2 },
  tag: {
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tagText: { fontSize: 10, lineHeight: 12, letterSpacing: 1 },
  strong: { borderColor: colors.accent, backgroundColor: colors.accentGlow },
  moderate: { borderColor: colors.textFaint },
  emerging: { borderColor: colors.hairline },
});
