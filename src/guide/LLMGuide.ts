import { anthropicEndpoint, config, type AppConfig } from '@/config/env';
import type { GuideAnswer, ScenePassage } from '@/domain/types';

import { renderContextPack } from './context';
import { MockGuide } from './MockGuide';
import { DISTILL_TOOL, distillSystemPrompt } from './prompts/distill';
import { TALK_TOOL, talkSystemPrompt } from './prompts/talk';
import type { GuideProvider, LifeGoalCandidate, TalkRequest } from './types';

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ToolDefinition {
  name: string;
  description: string;
  input_schema: object;
}

/**
 * Anthropic-backed guide. Uses forced tool use so every answer is structured JSON.
 * Any failure (no key, network, malformed output) falls back to the MockGuide so the
 * app never blocks on the network.
 */
export class LLMGuide implements GuideProvider {
  readonly kind = 'llm';

  constructor(
    private readonly fallback: GuideProvider = new MockGuide(),
    private readonly cfg: AppConfig = config,
  ) {}

  async talk(request: TalkRequest): Promise<GuideAnswer> {
    try {
      const messages: AnthropicMessage[] = [
        { role: 'user', content: `Context pack:\n\n${renderContextPack(request.context)}` },
        { role: 'assistant', content: 'Context received. I will quote from it verbatim.' },
        ...request.history.map<AnthropicMessage>((t) => ({
          role: t.role === 'user' ? 'user' : 'assistant',
          content: t.text,
        })),
        {
          role: 'user',
          content: request.question
            ? `[Question: ${request.question}] ${request.userText}`
            : request.userText,
        },
      ];
      const raw = await this.callTool<GuideAnswer>(talkSystemPrompt(), messages, TALK_TOOL);
      return validateAnswer(raw, request);
    } catch {
      return this.fallback.talk(request);
    }
  }

  async distillLifeGoals(passages: ScenePassage[]): Promise<LifeGoalCandidate[]> {
    try {
      const body = passages.map((p) => `[passage ${p.id}] (${p.area ?? 'end of life'}) ${p.text}`).join('\n');
      const raw = await this.callTool<{ candidates: LifeGoalCandidate[] }>(
        distillSystemPrompt(),
        [{ role: 'user', content: body }],
        DISTILL_TOOL,
      );
      const ids = new Set(passages.map((p) => p.id));
      const valid = raw.candidates.filter((c) => c.text && ids.has(c.passageId));
      if (valid.length === 0) throw new Error('No valid candidates');
      return valid;
    } catch {
      return this.fallback.distillLifeGoals(passages);
    }
  }

  private async callTool<T>(system: string, messages: AnthropicMessage[], tool: ToolDefinition): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    };
    if (this.cfg.anthropicKey) headers['x-api-key'] = this.cfg.anthropicKey;
    const response = await fetch(anthropicEndpoint(this.cfg), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: this.cfg.anthropicModel,
        max_tokens: 1024,
        system,
        messages,
        tools: [tool],
        tool_choice: { type: 'tool', name: tool.name },
      }),
    });
    if (!response.ok) throw new Error(`Anthropic ${response.status}`);
    const json = (await response.json()) as {
      content?: { type: string; name?: string; input?: unknown }[];
    };
    const block = json.content?.find((c) => c.type === 'tool_use' && c.name === tool.name);
    if (!block?.input) throw new Error('No tool output');
    return block.input as T;
  }
}

function validateAnswer(raw: GuideAnswer, request: TalkRequest): GuideAnswer {
  if (typeof raw.text !== 'string' || !raw.text.trim()) throw new Error('Empty answer');
  if (!raw.nextAction || typeof raw.nextAction.text !== 'string') throw new Error('No next action');
  const goals = request.context.goals;
  const weekGoalId =
    raw.nextAction.weekGoalId && goals[raw.nextAction.weekGoalId]?.level === 'week'
      ? raw.nextAction.weekGoalId
      : null;
  return {
    question: raw.question ?? null,
    text: raw.text.trim(),
    citations: Array.isArray(raw.citations) ? raw.citations : [],
    nextAction: {
      text: raw.nextAction.text.trim(),
      weekGoalId,
      servesText: weekGoalId ? goals[weekGoalId].text : null,
    },
  };
}
