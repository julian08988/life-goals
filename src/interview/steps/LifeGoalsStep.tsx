import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { allPassages, bestMatchingPassage, bestMatchingSentence, goalsAtLevel } from '@/domain/hierarchy';
import { LEVEL_TARGET } from '@/domain/levels';
import { useGuide } from '@/guide/useGuide';
import type { LifeGoalCandidate } from '@/guide/types';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { GoalRow } from '@/ui/components/GoalRow';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { colors, spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

import { StepFrame } from '../StepFrame';
import { STEP_SPOKEN } from '../script';

interface LifeGoalsStepProps {
  onBack: () => void;
  onNext: () => void;
}

/**
 * Distillation. Candidates come from the guide (LLM or rule-based); the user edits,
 * removes and adds. Each accepted goal is saved with the passage it came from.
 */
export function LifeGoalsStep({ onBack, onNext }: LifeGoalsStepProps) {
  const guide = useGuide();
  const state = useAppStore();
  const saved = goalsAtLevel(state, 'life').filter((g) => g.status === 'active');
  const passages = allPassages(state);
  const [candidates, setCandidates] = useState<LifeGoalCandidate[] | null>(saved.length > 0 ? [] : null);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (candidates !== null) return;
    let cancelled = false;
    setLoading(true);
    guide
      .distillLifeGoals(passages)
      .then((c) => {
        if (!cancelled) setCandidates(c);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [candidates, guide, passages]);

  const sample = useCallback(() => 'I do work I am proud of with people I know by name.', []);
  const voice = useVoice({ onTranscript: (t) => setDraft(t), sample });

  const accept = (c: LifeGoalCandidate) => {
    state.addGoal({ level: 'life', text: c.text, scenePassageId: c.passageId, sourceQuote: c.sourceQuote });
    setCandidates((list) => (list ?? []).filter((x) => x !== c));
  };

  const addOwn = () => {
    const text = draft.trim();
    const passage = bestMatchingPassage(passages, text);
    if (!passage) return;
    state.addGoal({
      level: 'life',
      text,
      scenePassageId: passage.id,
      sourceQuote: bestMatchingSentence(passage.text, text),
    });
    setDraft('');
  };

  const target = LEVEL_TARGET.life;
  const canContinue = saved.length >= target.min;

  return (
    <StepFrame
      eyebrow={`Life goals · ${saved.length} kept, ${target.min}–${target.max} suggested`}
      spoken={STEP_SPOKEN.life_goals ?? ''}
      methodKey="interview.life_goals"
      say={voice.say}
      speaking={voice.speaking}
      onStop={voice.hush}>
      {saved.length > 0 ? (
        <View style={styles.group}>
          <Text variant="label">KEPT</Text>
          {saved.map((g) => (
            <GoalRow
              key={g.id}
              text={g.text}
              detail={g.sourceQuote ? `“${g.sourceQuote}”` : null}
              onRemove={() => state.removeGoal(g.id)}
            />
          ))}
        </View>
      ) : null}

      {loading ? (
        <Text variant="bodyMuted">Reading your scenes…</Text>
      ) : candidates && candidates.length > 0 ? (
        <View style={styles.group}>
          <Text variant="label">CANDIDATES · TAP TO KEEP</Text>
          {candidates.map((c, i) => (
            <GoalRow
              key={`${c.passageId}-${i}`}
              text={c.text}
              detail={`“${c.sourceQuote}”`}
              onPress={() => accept(c)}
              onRemove={() => setCandidates((list) => (list ?? []).filter((x) => x !== c))}
            />
          ))}
        </View>
      ) : null}

      <View style={styles.group}>
        <Text variant="label">ADD YOUR OWN</Text>
        <VoiceComposer
          value={draft}
          onChange={setDraft}
          onSubmit={addOwn}
          mic={voice.mic}
          onMic={voice.toggleMic}
          submitLabel="Keep"
          multiline={false}
          placeholder="One sentence, present tense."
          error={voice.error}
        />
        <Text variant="small" color={colors.textFaint}>
          Your own goals are tied to the scene sentence that matches them best.
        </Text>
      </View>

      <View style={styles.nav}>
        <Button label="Back" kind="ghost" compact onPress={onBack} />
        <Button label="Continue" onPress={onNext} disabled={!canContinue} compact />
      </View>
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  group: { gap: spacing.sm },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
});
