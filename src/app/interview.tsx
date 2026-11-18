import { router } from 'expo-router';

import { INTERVIEW_STEPS, type InterviewStep } from '@/domain/types';
import { LEVEL_STEPS } from '@/interview/script';
import { ActionsStep } from '@/interview/steps/ActionsStep';
import { ClosingStep } from '@/interview/steps/ClosingStep';
import { LevelStep } from '@/interview/steps/LevelStep';
import { LifeGoalsStep } from '@/interview/steps/LifeGoalsStep';
import { SceneStep } from '@/interview/steps/SceneStep';
import { WelcomeStep } from '@/interview/steps/WelcomeStep';
import { useAppStore } from '@/store/useAppStore';
import { Screen } from '@/ui/components/Screen';

/**
 * The interview. Progress lives in the store, so closing the app returns the user to
 * the exact question. Each step saves as it goes.
 */
export default function InterviewScreen() {
  const progress = useAppStore((s) => s.interview);
  const setInterview = useAppStore((s) => s.setInterview);
  const completeInterview = useAppStore((s) => s.completeInterview);

  const go = (step: InterviewStep) => setInterview({ step, promptIndex: 0 });
  const index = INTERVIEW_STEPS.indexOf(progress.step);
  const next = () => go(INTERVIEW_STEPS[Math.min(index + 1, INTERVIEW_STEPS.length - 1)]);
  const back = () => go(INTERVIEW_STEPS[Math.max(index - 1, 0)]);
  const setPrompt = (promptIndex: number) => setInterview({ promptIndex });

  const level = LEVEL_STEPS.find((l) => l.step === progress.step);

  return (
    <Screen>
      {progress.step === 'welcome' ? <WelcomeStep onNext={next} /> : null}
      {progress.step === 'near_term_scene' ? (
        <SceneStep kind="near_term" promptIndex={progress.promptIndex} onPromptIndex={setPrompt} onBack={back} onNext={next} />
      ) : null}
      {progress.step === 'end_of_life_scene' ? (
        <SceneStep kind="end_of_life" promptIndex={progress.promptIndex} onPromptIndex={setPrompt} onBack={back} onNext={next} />
      ) : null}
      {progress.step === 'life_goals' ? <LifeGoalsStep onBack={back} onNext={next} /> : null}
      {level ? <LevelStep key={level.step} config={level} onBack={back} onNext={next} /> : null}
      {progress.step === 'actions' ? <ActionsStep onBack={back} onNext={next} /> : null}
      {progress.step === 'closing' ? (
        <ClosingStep
          onBack={back}
          onDone={() => {
            completeInterview();
            router.replace('/');
          }}
        />
      ) : null}
    </Screen>
  );
}
