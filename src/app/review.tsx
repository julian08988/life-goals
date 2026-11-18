import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { spokenReason } from '@/content/methods';
import { formatWeekRange, resolveReviewWeeks, todayISO } from '@/domain/dates';
import { actionsForWeekGoal, threadFor } from '@/domain/hierarchy';
import type { Goal } from '@/domain/types';
import { LEVEL_STEPS } from '@/interview/script';
import { ActionsStep } from '@/interview/steps/ActionsStep';
import { LevelStep } from '@/interview/steps/LevelStep';
import { selectNeglectedMonthGoals, selectOrphans, selectWeekThread } from '@/store/selectors';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { GoalRow } from '@/ui/components/GoalRow';
import { GuideLine } from '@/ui/components/GuideLine';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { WhyThisStep } from '@/ui/components/WhyThisStep';
import { colors, radius, spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

type Stage = 'close' | 'pick' | 'actions' | 'done';

const WEEK_CONFIG = LEVEL_STEPS.find((l) => l.step === 'week')!;

/**
 * Weekly Review. Close last week's priorities as done / carried / dropped with one
 * neutral sentence, pick next week's three (each tied to a monthly goal), add their
 * first actions. Nothing finishes with an orphan.
 */
export default function ReviewScreen() {
  const today = todayISO();
  const { closing, planning } = resolveReviewWeeks(today);
  const state = useAppStore();

  const closingPriorities = Object.values(state.goals)
    .filter((g) => g.level === 'week' && g.weekStart === closing && g.status === 'active')
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const [stage, setStage] = useState<Stage>(closingPriorities.length > 0 ? 'close' : 'pick');
  const [note, setNote] = useState('');
  const sample = useCallback(() => 'Good week on the studio; the reading slipped and that is a season, not a verdict.', []);
  const voice = useVoice({ onTranscript: setNote, sample });

  const neglected = selectNeglectedMonthGoals(state, today);
  const planned = selectWeekThread(state, planning);
  const orphans = selectOrphans(state, planning);

  const closeAs = (priority: Goal, status: 'done' | 'carried' | 'dropped') => {
    state.setGoalStatus(priority.id, status);
    const open = actionsForWeekGoal(state, priority.id).filter((a) => a.status === 'open');
    if (status === 'carried' && priority.parentId) {
      const copy = state.addGoal({
        level: 'week',
        text: priority.text,
        parentId: priority.parentId,
        sourceQuote: priority.sourceQuote,
        ifThen: priority.ifThen,
        weekStart: planning,
      });
      for (const a of open) state.carryAction(a.id, copy.id);
    } else {
      for (const a of open) state.setActionStatus(a.id, status === 'done' ? 'done' : 'dropped');
    }
  };

  const finish = () => {
    state.recordReview({ closedWeekStart: closing, plannedWeekStart: planning, note: note.trim() || null });
    setStage('done');
  };

  const summary = planned
    .map((s) => `"${s.priority.text}" for "${s.thread.goals[1]?.text ?? ''}"`)
    .join('; ');

  return (
    <>
      {stage === 'close' ? (
        <Screen>
          <Header title={`Close the week of ${formatWeekRange(closing)}`} />
          <GuideLine
            text={`Three priorities, one at a time: done, carried or dropped. Carried and dropped are neutral. One sentence about the week when you are through. ${spokenReason('review.close_week')}`}
            say={voice.say}
            speaking={voice.speaking}
            onStop={voice.hush}
          />
          <WhyThisStep step="review.close_week" />
          <View style={styles.list}>
            {closingPriorities.map((p) => (
              <View key={p.id} style={styles.card}>
                <Text variant="heading">{p.text}</Text>
                <Text variant="small">for “{threadFor(state, p.id).goals[1]?.text}”</Text>
                {actionsForWeekGoal(state, p.id).map((a) => (
                  <Text key={a.id} variant="small" color={colors.textFaint}>
                    {a.status}: {a.text}
                  </Text>
                ))}
                <View style={styles.row}>
                  <Button label="Done" compact onPress={() => closeAs(p, 'done')} />
                  <Button label="Carry" kind="secondary" compact onPress={() => closeAs(p, 'carried')} />
                  <Button label="Drop" kind="ghost" compact onPress={() => closeAs(p, 'dropped')} />
                </View>
              </View>
            ))}
            {closingPriorities.length === 0 ? (
              <>
                <Text variant="bodyMuted">All closed.</Text>
                <VoiceComposer value={note} onChange={setNote} onSubmit={() => setStage('pick')} mic={voice.mic} onMic={voice.toggleMic} submitLabel="Save and plan next week" placeholder="One sentence about the week." error={voice.error} />
                <Button label="Plan next week without a note" kind="ghost" compact onPress={() => setStage('pick')} />
              </>
            ) : null}
          </View>
        </Screen>
      ) : null}

      {stage === 'pick' ? (
        <Screen>
          <Header title={`Plan the week of ${formatWeekRange(planning)}`} />
          <LevelStep
            config={{ ...WEEK_CONFIG, spoken: `Three priorities for next week, each tied to a monthly goal, each with a when and a where. ${spokenReason('review.pick_three')}`, methodKey: 'review.pick_three' }}
            weekStart={planning}
            onBack={() => (closingPriorities.length > 0 ? setStage('close') : router.back())}
            onNext={() => setStage('actions')}
            nextLabel="Next: actions"
            notice={
              neglected.length > 0 ? (
                <View style={styles.flag}>
                  <Text variant="label">UNTOUCHED FOR TWO WEEKS</Text>
                  {neglected.map((g) => (
                    <GoalRow
                      key={g.id}
                      text={g.text}
                      detail="Plan a priority for it, or let it dissolve."
                      trailing={<Button label="Dissolve" kind="ghost" compact onPress={() => state.setGoalStatus(g.id, 'dissolved')} />}
                    />
                  ))}
                </View>
              ) : null
            }
          />
        </Screen>
      ) : null}

      {stage === 'actions' ? (
        <Screen>
          <Header title={`First actions, week of ${formatWeekRange(planning)}`} />
          <ActionsStep
            weekStart={planning}
            source="review"
            spoken={`For each priority, the first concrete action and the day. ${spokenReason('review.if_then')}`}
            onBack={() => setStage('pick')}
            onNext={finish}
            nextLabel={orphans.length === 0 ? 'Finish the review' : 'Fix the thread first'}
          />
          {orphans.length > 0 ? (
            <Text variant="small" color={colors.textMuted}>
              {orphans.length} item{orphans.length > 1 ? 's' : ''} without a thread: {orphans.map((o) => `“${o.text}”`).join(', ')}. Nothing finishes with an orphan.
            </Text>
          ) : null}
        </Screen>
      ) : null}

      {stage === 'done' ? (
        <Screen>
          <Header title="Set" />
          <GuideLine
            text={`Next week: ${summary}. That is your heading. ${spokenReason('review.pick_three')}`}
            say={voice.say}
            speaking={voice.speaking}
            onStop={voice.hush}
          />
          <View style={styles.list}>
            {planned.map((s) => (
              <GoalRow key={s.priority.id} text={s.priority.text} detail={`→ ${s.thread.goals.slice(1).map((g) => g.text).join(' → ')}`} />
            ))}
          </View>
          <Button label="Back to today" onPress={() => router.replace('/')} />
        </Screen>
      ) : null}
    </>
  );
}

function Header({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text variant="label">WEEKLY REVIEW</Text>
        <Text variant="title">{title}</Text>
      </View>
      <Button label="Leave" kind="ghost" compact onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg, gap: spacing.md },
  headerText: { flex: 1, gap: 4 },
  list: { gap: spacing.md, marginTop: spacing.lg },
  card: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  row: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  flag: { gap: spacing.sm },
});
