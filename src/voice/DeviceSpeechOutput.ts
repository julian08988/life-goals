import * as Speech from 'expo-speech';

import type { SpeechOutput } from './types';

/** Platform text-to-speech. Always available; the fallback for every other output. */
export class DeviceSpeechOutput implements SpeechOutput {
  readonly kind = 'device';

  speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      Speech.speak(text, {
        language: 'en-US',
        rate: 0.95,
        onDone: () => resolve(),
        onStopped: () => resolve(),
        onError: () => resolve(),
      });
    });
  }

  async stop(): Promise<void> {
    await Speech.stop();
  }
}
