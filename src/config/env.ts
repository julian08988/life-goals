/**
 * Runtime configuration from EXPO_PUBLIC_* variables. Every value is optional; the app
 * runs fully offline without them. See .env.example and RUNNING.md.
 */
function read(name: string): string | null {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : null;
}

export interface AppConfig {
  anthropicKey: string | null;
  anthropicModel: string;
  openaiKey: string | null;
  openaiTtsVoice: string;
  /** When set, vendor calls go to `${proxyUrl}/anthropic/...` and `${proxyUrl}/openai/...`. */
  proxyUrl: string | null;
}

export function loadConfig(): AppConfig {
  return {
    anthropicKey: read('EXPO_PUBLIC_ANTHROPIC_API_KEY'),
    anthropicModel: read('EXPO_PUBLIC_ANTHROPIC_MODEL') ?? 'claude-sonnet-4-5',
    openaiKey: read('EXPO_PUBLIC_OPENAI_API_KEY'),
    openaiTtsVoice: read('EXPO_PUBLIC_OPENAI_TTS_VOICE') ?? 'alloy',
    proxyUrl: read('EXPO_PUBLIC_GUIDE_PROXY_URL')?.replace(/\/$/, '') ?? null,
  };
}

export const config = loadConfig();

export function hasLLM(c: AppConfig = config): boolean {
  return !!(c.proxyUrl || c.anthropicKey);
}

export function hasOpenAI(c: AppConfig = config): boolean {
  return !!(c.proxyUrl || c.openaiKey);
}

export function anthropicEndpoint(c: AppConfig = config): string {
  return c.proxyUrl ? `${c.proxyUrl}/anthropic/v1/messages` : 'https://api.anthropic.com/v1/messages';
}

export function openaiEndpoint(path: string, c: AppConfig = config): string {
  return c.proxyUrl ? `${c.proxyUrl}/openai/v1/${path}` : `https://api.openai.com/v1/${path}`;
}
