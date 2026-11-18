import { spokenReason } from '@/content/methods';
import type { FourQuestion } from '@/domain/types';

import { GUIDE_RULES } from './system';

export const QUESTION_LABEL: Record<FourQuestion, string> = {
  why: 'Why am I doing this?',
  prioritize: 'How should I prioritize?',
  stay_on_course: 'How do I stay on course?',
  work_on_now: 'What should I work on now?',
};

const QUESTION_GUIDANCE: Record<FourQuestion, string> = {
  why: 'Read the thread upward from the priority in question to the life goal and its scene sentence, in the user\'s words. Check whether the why still holds. Convert it into one decision so the user can push through or consciously re-plan.',
  prioritize: 'Sort the candidates the user names by the goal each serves. Name what does not attach to anything. Break ties with past outcomes (carried or dropped priorities go first). End with the first move.',
  stay_on_course: 'Name the pattern plainly from the outcomes. Separate drift (a goal still wanted, slipping) from recalibration (a goal whose season changed). Offer the smallest step back or an honest re-plan.',
  work_on_now: 'Pick one thing. Say which goal it serves. Scale it to the time and energy the user reports. Get them started: name the first two minutes.',
};

export function talkSystemPrompt(): string {
  return `${GUIDE_RULES}

The four questions you answer and how:
- why: ${QUESTION_GUIDANCE.why}
- prioritize: ${QUESTION_GUIDANCE.prioritize}
- stay_on_course: ${QUESTION_GUIDANCE.stay_on_course}
- work_on_now: ${QUESTION_GUIDANCE.work_on_now}

Method clause for the close of every talk: "${spokenReason('talk.closing')}"

Respond only by calling the answer tool.`;
}

export const TALK_TOOL = {
  name: 'answer',
  description: 'Deliver the guide\'s answer with citations and one next action.',
  input_schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      question: {
        type: ['string', 'null'],
        enum: ['why', 'prioritize', 'stay_on_course', 'work_on_now', null],
        description: 'Which of the four questions this answers, or null if none.',
      },
      text: { type: 'string', description: 'What the guide says. Plain sentences, spoken aloud. Under 120 words.' },
      citations: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            kind: { type: 'string', enum: ['goal', 'passage', 'action'] },
            id: { type: 'string', description: 'The id in square brackets from the context pack.' },
            quote: { type: 'string', description: 'Verbatim text.' },
          },
          required: ['kind', 'id', 'quote'],
        },
      },
      nextAction: {
        type: 'object',
        additionalProperties: false,
        properties: {
          text: { type: 'string', description: 'One concrete action with a time, e.g. "Tuesday 9:00, draft the three tiers."' },
          weekGoalId: { type: ['string', 'null'], description: 'Id of the weekly priority this action serves, from the context pack.' },
          servesText: { type: ['string', 'null'], description: 'Verbatim text of that priority.' },
        },
        required: ['text', 'weekGoalId', 'servesText'],
      },
    },
    required: ['question', 'text', 'citations', 'nextAction'],
  },
} as const;
