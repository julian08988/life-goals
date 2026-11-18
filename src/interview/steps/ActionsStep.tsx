import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { addDays, todayISO, weekStartOf } from '@/domain/dates';
import { actionsForWeekGoal, activeGoalsAtLevel } from '@/domain/hierarchy';
import type { ActionSource } from '@/domain/types';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Chip } from '@/ui/components/Chip';
import { GoalRow } from '@/ui/components/GoalRow';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { colors, spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

import { StepFrame } from '../StepFrame';
import { STEP_SPOKEN } from '../script';

interface ActionsStepProps {
  weekStart?: string;
  source?: ActionSource;
  spoken?: string;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** For each weekly priority, one or more concrete actions with a day. Shared with Weekly Review. */
export function ActionsStep({
  weekStart = weekStartOf(todayISO()),
  source = 'interview',
  spoken = STEP_SPOKEN.actions ?? '',
  onBack,
  onNext,
  nextLabel = 'Continue',
}: ActionsStepProps) {
  const state = useAppStore();
  const priorities = activeGoalsAtLevel(state, 'week').filter((g) => g.weekStart === weekStart);
  const [selected, setSelected] = useState<string | null>(priorities[0]?.id ?? null);
  const [draft, setDraft] = useState('');
  const [dayOffset, setDayOffset] = useState<number | null>(null);

  const sample = useCallback(() => 'Draft the email in plain sentences.', []);
  const voice = useVoice({ onTranscript: (t) => setDraft(t), sample });

  const add = () => {
    if (!selected || !draft.trim()) return;
    state.addAction({
      weekGoalId: selected,
      text: draft.trim(),
      source,
      dueDate: dayOffset === null ? null : addDays(weekStart, dayOffset),
    });
    setDraft('');
    setDayOffset(null);
  };

  const covered = priorities.filter((p) => actionsForWeekGoal(state, p.id).some((a) => a.status === 'open')).length;

  return (
    <StepFrame
      eyebrow={`Next actions · ${covered} of ${priorities.length} priorities covered`}
      spoken={spoken}
      methodKey="interview.week"
      say={voice.say}
      speaking={voice.speaking}
      onStop={voice.hush}>
      {priorities.map((p) => {
        const actions = actionsForWeekGoal(state, p.id).filter((a) => a.status === 'open');
        return (
          <View key={p.id} style={styles.group}>
            <Chip label={p.text} selected={selected === p.id} onPress={() => setSelected(p.id)} />
            {actions.map((a) => (
              <GoalRow
                key={a.id}
                text={a.text}
                detail={a.dueDate ? DAY_LABELS[(new Date(a.dueDate).getDay() + 6) % 7] : 'this week'}
                onRemove={() => state.setActionStatus(a.id, 'dropped')}
              />
            ))}
          </View>
        );
      })}

      <View style={styles.form}>
        <Text variant="label">WHICH DAY</Text>
        <View style={styles.days}>
          {DAY_LABELS.map((d, i) => (
            <Chip key={d} label={d} selected={dayOffset === i} onPress={() => setDayOffset(dayOffset === i ? null : i)} />
          ))}
        </View>
        <VoiceComposer
          value={draft}
          onChange={setDraft}
          onSubmit={add}
          mic={voice.mic}
          onMic={voice.toggleMic}
          submitLabel="Add action"
          multiline={false}
          placeholder="One concrete thing you will do."
          error={voice.error}
        />
      </View>

      {covered < priorities.length ? (
        <Text variant="small" color={colors.textMuted}>
          Every priority needs at least one action before you can continue. Still missing:{' '}
          {priorities
            .filter((p) => !actionsForWeekGoal(state, p.id).some((a) => a.status === 'open'))
            .map((p) => `“${p.text}”`)
            .join(', ')}
          .
        </Text>
      ) : null}
      <View style={styles.nav}>
        <Button label="Back" kind="ghost" compact onPress={onBack} />
        <Button label={nextLabel} onPress={onNext} disabled={covered < priorities.length} compact />
      </View>
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  group: { gap: spacing.sm, alignItems: 'flex-start' },
  form: { gap: spacing.sm },
  days: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
});
