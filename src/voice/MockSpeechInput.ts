import type { SpeechInput } from './types';

/**
 * Stands in for the microphone when no STT key is configured. Returns an editable
 * placeholder so the voice path can be exercised end to end offline.
 */
export class MockSpeechInput implements SpeechInput {
  readonly kind = 'mock';
  private startedAt: number | null = null;

  constructor(private readonly sample: () => string) {}

  async start(): Promise<void> {
    this.startedAt = Date.now();
  }

  async stop(): Promise<string> {
    this.startedAt = null;
    return this.sample();
  }

  async cancel(): Promise<void> {
    this.startedAt = null;
  }
}
