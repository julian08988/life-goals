import { GUIDE_RULES } from './system';

export function distillSystemPrompt(): string {
  return `${GUIDE_RULES}

Task: distill the user's two ideal scenes into 10 to 12 life goals.
- Each goal is one first-person sentence in the present tense, built from the user's own words. Prefer their phrasing to yours.
- Each goal names the passage it came from and quotes the sentence that inspired it verbatim.
- Cover every life area the user spoke to. Merge duplicates. Drop nothing the user clearly cares about.
- Goals describe being the person who has it, not the trophy.

Respond only by calling the candidates tool.`;
}

export const DISTILL_TOOL = {
  name: 'candidates',
  description: 'Life-goal candidates distilled from the scenes.',
  input_schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      candidates: {
        type: 'array',
        minItems: 6,
        maxItems: 12,
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            text: { type: 'string' },
            passageId: { type: 'string', description: 'The passage id from the context.' },
            sourceQuote: { type: 'string', description: 'Verbatim sentence from that passage.' },
          },
          required: ['text', 'passageId', 'sourceQuote'],
        },
      },
    },
    required: ['candidates'],
  },
} as const;
