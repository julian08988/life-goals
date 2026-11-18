import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { methodNote, spokenReason } from '@/content/methods';
import { addDays, todayISO } from '@/domain/dates';
import { activeGoalsAtLevel, lifeGoalOf, threadFor } from '@/domain/hierarchy';
import { selectTodayActions } from '@/store/selectors';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Chip } from '@/ui/components/Chip';
import { GuideLine } from '@/ui/components/GuideLine';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { WhyThisStep } from '@/ui/components/WhyThisStep';
import { colors, spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

type Stage = 'hear' | 'correction' | 'heading' | 'obstacle' | 'critic' | 'done';

function dayOfYear(iso: string): number {
  const d = new Date(iso);
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

/**
 * Morning Course: set today's heading, correct yesterday's drift. Three minutes.
 * Hear two goals → (correction) → one thing and its first two minutes → obstacle
 * and if-then → (optional inner-critic prompt) → saved.
 */
export default function MorningScreen() {
  const today = todayISO();
  const state = useAppStore();
  const name = state.settings.name;

  const lifeGoals = activeGoalsAtLevel(state, 'life');
  const fiveYear = activeGoalsAtLevel(state, 'five_year');
  const rotation = dayOfYear(today);
  const life = lifeGoals[rotation % Math.max(lifeGoals.length, 1)] ?? null;
  const five = fiveYear[rotation % Math.max(fiveYear.length, 1)] ?? null;
  const fiveLife = five ? lifeGoalOf(state, five.id) : null;

  const todayActions = useMemo(() => selectTodayActions(state, today), [state, today]);
  const yesterday = state.days[addDays(today, -1)] ?? null;
  const yesterdayOpen =
    yesterday?.headingActionId && state.actions[yesterday.headingActionId]?.status === 'open'
      ? state.actions[yesterday.headingActionId]
      : null;

  const [stage, setStage] = useState<Stage>('hear');
  const [correction, setCorrection] = useState('');
  const [headingId, setHeadingId] = useState<string | null>(
    (yesterdayOpen && todayActions.some((t) => t.action.id === yesterdayOpen.id) ? yesterdayOpen.id : null) ??
      todayActions[0]?.action.id ??
      null,
  );
  const [firstStep, setFirstStep] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [critic, setCritic] = useState('');

  const sample = useCallback(() => 'Open the document and write the first sentence.', []);
  const voice = useVoice({
    onTranscript: (t) => {
      if (stage === 'correction') setCorrection(t);
      else if (stage === 'heading') setFirstStep(t);
      else if (stage === 'obstacle') setObstacle(t);
      else if (stage === 'critic') setCritic(t);
    },
    sample,
  });

  const headingAction = headingId ? state.actions[headingId] : null;
  const headingThread = headingAction ? threadFor(state, headingAction.weekGoalId) : null;

  const spoken: Record<Stage, string> = {
    hear:
      (life ? `Where you are heading, in your words: "${life.text}"` : 'You have no life goals yet.') +
      (five ? ` Five years out: "${five.text}"${fiveLife && fiveLife.id !== life?.id ? `, which serves "${fiveLife.text}".` : '.'}` : '') +
      ` Say the thread back, out loud. ${spokenReason('morning.hear_goals')}`,
    correction: yesterdayOpen
      ? `Yesterday you named "${yesterdayOpen.text}". It is still open. That is normal. What is the smallest step back on course today? ${spokenReason('morning.correction')}`
      : '',
    heading: `One thing today. Which action, and what are its first two minutes? ${spokenReason('morning.first_two_minutes')}`,
    obstacle: `Name the one thing most likely to get in the way, then the plan: if that happens, then I… ${spokenReason('morning.obstacle_if_then')}`,
    critic: `Optional. Has your inner critic said anything about this today? Say it${name ? `, ${name}` : ''}, or skip. ${spokenReason('morning.reframe')}`,
    done: 'Set. Go do the first two minutes.',
  };

  const order: Stage[] = ['hear', ...(yesterdayOpen ? (['correction'] as Stage[]) : []), 'heading', 'obstacle', ...(state.settings.selfTalkLayer ? (['critic'] as Stage[]) : []), 'done'];
  const advance = () => {
    const i = order.indexOf(stage);
    const next = order[Math.min(i + 1, order.length - 1)];
    if (next === 'done') finish();
    setStage(next);
  };

  const finish = () => {
    state.startDay({
      date: today,
      heading: headingAction?.text ?? null,
      headingActionId: headingAction?.id ?? null,
      firstStep: firstStep.trim() || null,
      obstaclePlan: obstacle.trim() || null,
      correction: correction.trim() || null,
      innerCriticNote: critic.trim() || null,
    });
  };

  const methodKey = {
    hear: 'morning.hear_goals',
    correction: 'morning.correction',
    heading: 'morning.first_two_minutes',
    obstacle: 'morning.obstacle_if_then',
    critic: 'morning.reframe',
    done: 'morning.obstacle_if_then',
  } as const;

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="label">MORNING COURSE · {order.indexOf(stage) + 1} OF {order.length}</Text>
        <Button label="Leave" kind="ghost" compact onPress={() => router.back()} />
      </View>
      <GuideLine text={spoken[stage]} say={voice.say} speaking={voice.speaking} onStop={voice.hush} />
      <WhyThisStep step={methodKey[stage]} />

      {stage === 'hear' ? (
        <View style={styles.body}>
          {life ? <Quote label="LIFE GOAL" text={life.text} why={life.why} /> : null}
          {five ? <Quote label="FIVE YEARS" text={five.text} why={null} /> : null}
          <Button label="I said it. Next." onPress={advance} />
        </View>
      ) : null}

      {stage === 'correction' ? (
        <View style={styles.body}>
          <VoiceComposer value={correction} onChange={setCorrection} onSubmit={advance} mic={voice.mic} onMic={voice.toggleMic} submitLabel="Save step" placeholder="The smallest step, today." error={voice.error} multiline={false} />
          <Button label="Skip" kind="ghost" compact onPress={advance} />
        </View>
      ) : null}

      {stage === 'heading' ? (
        <View style={styles.body}>
          {todayActions.length > 0 ? (
            <View style={styles.chips}>
              {todayActions.map((t) => (
                <Chip key={t.action.id} label={t.action.text} selected={headingId === t.action.id} onPress={() => setHeadingId(t.action.id)} />
              ))}
            </View>
          ) : (
            <Text variant="bodyMuted">No open actions for today. Add one in Week, then come back.</Text>
          )}
          {headingThread ? <Text variant="small">Serves “{headingThread.goals[0]?.text}” → “{headingThread.goals[headingThread.goals.length - 1]?.text}”</Text> : null}
          <VoiceComposer value={firstStep} onChange={setFirstStep} onSubmit={advance} mic={voice.mic} onMic={voice.toggleMic} submitLabel="Next" placeholder="The first two minutes, concretely." error={voice.error} multiline={false} />
        </View>
      ) : null}

      {stage === 'obstacle' ? (
        <View style={styles.body}>
          <VoiceComposer value={obstacle} onChange={setObstacle} onSubmit={advance} mic={voice.mic} onMic={voice.toggleMic} submitLabel="Set the day" placeholder="If … then I …" error={voice.error} />
        </View>
      ) : null}

      {stage === 'critic' ? (
        <View style={styles.body}>
          <Text variant="small">{methodNote('morning.reframe').note}</Text>
          <VoiceComposer value={critic} onChange={setCritic} onSubmit={advance} mic={voice.mic} onMic={voice.toggleMic} submitLabel="Save and finish" placeholder="What it said, in its words." error={voice.error} />
          <Button label="Skip" kind="ghost" compact onPress={advance} />
        </View>
      ) : null}

      {stage === 'done' ? (
        <View style={styles.body}>
          {headingAction ? <Quote label="TODAY" text={headingAction.text} why={firstStep || null} /> : null}
          {obstacle ? <Text variant="small">{obstacle}</Text> : null}
          <Button label="Go" onPress={() => router.replace('/')} />
        </View>
      ) : null}
    </Screen>
  );
}

function Quote({ label, text, why }: { label: string; text: string; why: string | null }) {
  return (
    <View style={styles.quote}>
      <Text variant="label">{label}</Text>
      <Text variant="heading">“{text}”</Text>
      {why ? (
        <Text variant="small" color={colors.textMuted}>
          {why}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  body: { gap: spacing.md, marginTop: spacing.lg },
  chips: { gap: spacing.sm },
  quote: { gap: 6, paddingVertical: spacing.sm },
});
