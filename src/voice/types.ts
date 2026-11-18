/**
 * Voice abstraction. Screens talk to these two interfaces only, so STT and TTS vendors
 * can change (Whisper → on-device, device TTS → OpenAI) without touching UI.
 */
export interface SpeechInput {
  readonly kind: 'mock' | 'whisper';
  /** Begins capturing. Resolves once capture is live. */
  start(): Promise<void>;
  /** Ends capturing and returns the transcript (may be empty). */
  stop(): Promise<string>;
  /** Discards the capture without transcribing. */
  cancel(): Promise<void>;
}

export interface SpeechOutput {
  readonly kind: 'device' | 'openai';
  /** Resolves when playback finishes or is stopped. */
  speak(text: string): Promise<void>;
  stop(): Promise<void>;
}

export class SpeechInputError extends Error {
  constructor(
    message: string,
    readonly code: 'permission_denied' | 'unavailable' | 'transcription_failed',
  ) {
    super(message);
    this.name = 'SpeechInputError';
  }
}
