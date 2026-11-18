import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { spokenReason } from '@/content/methods';
import { todayISO, weekStartOf } from '@/domain/dates';
import { activeGoalsAtLevel } from '@/domain/hierarchy';
import { LEVEL_TARGET, PARENT_LEVEL } from '@/domain/levels';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Chip } from '@/ui/components/Chip';
import { GoalRow } from '@/ui/components/GoalRow';
import { Input } from '@/ui/components/Input';
import { ParentPicker } from '@/ui/components/ParentPicker';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { colors, spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

import { StepFrame } from '../StepFrame';
import type { LevelStepConfig } from '../script';

interface LevelStepProps {
  config: LevelStepConfig;
  onBack: () => void;
  onNext: () => void;
  /** Week level only: which week the priorities belong to. Defaults to the current week. */
  weekStart?: string;
  nextLabel?: string;
  /** Rendered above the form (for example neglect flags in Weekly Review). */
  notice?: React.ReactNode;
}

const SAMPLE = 'The first retainer client is signed and the work is on my terms.';

/**
 * One hierarchy level: pick the parent, say the goal, run the body check where the
 * method asks for it, add the if-then plan at week level. Parent first; no orphans.
 */
export function LevelStep({
  config,
  onBack,
  onNext,
  weekStart = weekStartOf(todayISO()),
  nextLabel = 'Continue',
  notice,
}: LevelStepProps) {
  const state = useAppStore();
  const parentLevel = PARENT_LEVEL[config.level];
  const parents = parentLevel ? activeGoalsAtLevel(state, parentLevel) : [];
  const goals = activeGoalsAtLevel(state, config.level).filter(
    (g) => config.level !== 'week' || g.weekStart === weekStart,
  );

  const [parentId, setParentId] = useState<string | null>(parents[0]?.id ?? null);
  const [draft, setDraft] = useState('');
  const [ifThen, setIfThen] = useState('');
  const [energizes, setEnergizes] = useState<boolean | null>(null);

  const sample = useCallback(() => SAMPLE, []);
  const voice = useVoice({ onTranscript: (t) => setDraft(t), sample });

  const target = LEVEL_TARGET[config.level];
  const full = goals.length >= target.max;
  const needsCheck = config.bodyCheck && energizes === null;
  const needsIfThen = config.ifThen && ifThen.trim().length === 0;

  const save = () => {
    if (!parentId || !draft.trim() || needsCheck || needsIfThen) return;
    state.addGoal({
      level: config.level,
      text: draft.trim(),
      parentId,
      sourceQuote: state.goals[parentId]?.text ?? null,
      energizes: config.bodyCheck ? energizes : null,
      ifThen: config.ifThen ? ifThen.trim() : null,
      weekStart: config.level === 'week' ? weekStart : null,
    });
    setDraft('');
    setIfThen('');
    setEnergizes(null);
  };

  return (
    <StepFrame
      eyebrow={`${config.title} · ${goals.length} of ${target.max}`}
      spoken={config.spoken}
      methodKey={config.methodKey}
      say={voice.say}
      speaking={voice.speaking}
      onStop={voice.hush}>
      {notice}
      {goals.length > 0 ? (
        <View style={styles.group}>
          {goals.map((g) => (
            <GoalRow
              key={g.id}
              text={g.text}
              detail={[
                g.parentId ? `serves “${state.goals[g.parentId]?.text}”` : null,
                g.ifThen ? g.ifThen : null,
                g.energizes === false ? 'drains: consider rewriting' : null,
              ]
                .filter(Boolean)
                .join(' · ')}
              onRemove={() => {
                try {
                  state.removeGoal(g.id);
                } catch {
                  // has children; leave it
                }
              }}
            />
          ))}
        </View>
      ) : null}

      {!full ? (
        <View style={styles.form}>
          <ParentPicker
            label={`Serves which ${parentLevel === 'life' ? 'life goal' : 'goal'}?`}
            options={parents}
            selectedId={parentId}
            onSelect={setParentId}
          />
          <VoiceComposer
            value={draft}
            onChange={setDraft}
            onSubmit={save}
            mic={voice.mic}
            onMic={voice.toggleMic}
            submitLabel="Add"
            multiline={false}
            placeholder="State it as already true."
            error={voice.error}
          />
          {config.bodyCheck ? (
            <View style={styles.check}>
              <Text variant="small">
                Say it out loud. Does it energize or drain you? {spokenReason('interview.want_vs_should')}
              </Text>
              <View style={styles.chips}>
                <Chip label="Energizes" selected={energizes === true} onPress={() => setEnergizes(true)} />
                <Chip label="Drains" selected={energizes === false} onPress={() => setEnergizes(false)} />
              </View>
              {energizes === false ? (
                <Text variant="small" color={colors.textMuted}>
                  Rewrite it as the feeling you want and three ways you would go after it, or keep it and watch it.
                </Text>
              ) : null}
            </View>
          ) : null}
          {config.ifThen ? (
            <View style={styles.check}>
              <Text variant="label">IF-THEN PLAN</Text>
              <Input
                value={ifThen}
                onChangeText={setIfThen}
                placeholder="If it is Tuesday at 9:00, then I…"
                multiline={false}
              />
            </View>
          ) : null}
        </View>
      ) : (
        <Text variant="bodyMuted">That is the suggested number. Remove one to add another.</Text>
      )}

      <View style={styles.nav}>
        <Button label="Back" kind="ghost" compact onPress={onBack} />
        <Button label={nextLabel} onPress={onNext} disabled={goals.length < target.min} compact />
      </View>
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  group: { gap: spacing.sm },
  form: { gap: spacing.md },
  check: { gap: spacing.sm },
  chips: { flexDirection: 'row', gap: spacing.sm },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
});
