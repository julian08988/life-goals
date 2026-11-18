import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SceneKind } from '@/domain/types';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/ui/components/Button';
import { Text } from '@/ui/components/Text';
import { VoiceComposer } from '@/ui/components/VoiceComposer';
import { spacing } from '@/ui/theme';
import { useVoice } from '@/voice/useVoice';

import { StepFrame } from '../StepFrame';
import { END_OF_LIFE_PROMPTS, NEAR_TERM_PROMPTS, STEP_SPOKEN } from '../script';

interface SceneStepProps {
  kind: SceneKind;
  promptIndex: number;
  onPromptIndex: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const SAMPLE: Record<SceneKind, string> = {
  near_term: 'I kept a simple routine and the work was smaller and better. I said no twice and it was fine.',
  end_of_life: 'I built something small that lasted, and the same few people were around me the whole way.',
};

/** One prompt at a time; each answer is saved as a passage the moment it is submitted. */
export function SceneStep(props: SceneStepProps) {
  return <ScenePrompt key={`${props.kind}-${props.promptIndex}`} {...props} />;
}

function ScenePrompt({ kind, promptIndex, onPromptIndex, onBack, onNext }: SceneStepProps) {
  const prompts = kind === 'near_term' ? NEAR_TERM_PROMPTS : END_OF_LIFE_PROMPTS;
  const prompt = prompts[Math.min(promptIndex, prompts.length - 1)];
  const ensureScene = useAppStore((s) => s.ensureScene);
  const savePassage = useAppStore((s) => s.savePassage);
  const scenes = useAppStore((s) => s.scenes);
  const existing = Object.values(scenes)
    .find((s) => s.kind === kind)
    ?.passages.find((p) => p.order === promptIndex);

  const [draft, setDraft] = useState(existing?.text ?? '');

  const sample = useCallback(() => SAMPLE[kind], [kind]);
  const voice = useVoice({
    onTranscript: (t) => setDraft((d) => (d ? `${d} ${t}` : t)),
    sample,
  });

  const spoken = promptIndex === 0 ? `${STEP_SPOKEN[kind === 'near_term' ? 'near_term_scene' : 'end_of_life_scene']} ${prompt.spoken}` : prompt.spoken;

  const save = () => {
    const sceneId = ensureScene(kind);
    savePassage({ sceneId, area: prompt.area, prompt: prompt.prompt, text: draft.trim(), order: promptIndex });
    if (promptIndex + 1 < prompts.length) onPromptIndex(promptIndex + 1);
    else onNext();
  };

  return (
    <StepFrame
      eyebrow={`${kind === 'near_term' ? 'Near-term scene' : 'End-of-life scene'} · ${promptIndex + 1} of ${prompts.length}`}
      spoken={spoken}
      methodKey={kind === 'near_term' ? 'interview.near_term_scene' : 'interview.end_of_life_scene'}
      say={voice.say}
      speaking={voice.speaking}
      onStop={voice.hush}>
      <Text variant="bodyMuted">Past tense. Full sentences. Say what happened, not what you hope.</Text>
      <VoiceComposer
        value={draft}
        onChange={setDraft}
        onSubmit={save}
        mic={voice.mic}
        onMic={voice.toggleMic}
        submitLabel={promptIndex + 1 < prompts.length ? 'Save and next' : 'Save and continue'}
        error={voice.error}
        hint={voice.inputKind === 'mock' ? 'Mic is simulated until an OpenAI key is set.' : null}
      />
      <View style={styles.nav}>
        <Button
          label="Back"
          kind="ghost"
          compact
          onPress={() => (promptIndex > 0 ? onPromptIndex(promptIndex - 1) : onBack())}
        />
        {existing ? <Button label="Skip ahead" kind="ghost" compact onPress={() => (promptIndex + 1 < prompts.length ? onPromptIndex(promptIndex + 1) : onNext())} /> : null}
      </View>
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  nav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
});
