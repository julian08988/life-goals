import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';

import { config, openaiEndpoint, type AppConfig } from '@/config/env';

import type { SpeechOutput } from './types';

/** OpenAI TTS; falls back to `fallback` on any failure so the guide is never silent. */
export class OpenAISpeechOutput implements SpeechOutput {
  readonly kind = 'openai';
  private player: AudioPlayer | null = null;

  constructor(
    private readonly fallback: SpeechOutput,
    private readonly cfg: AppConfig = config,
  ) {}

  async speak(text: string): Promise<void> {
    try {
      const uri = await this.synthesize(text);
      await this.play(uri);
    } catch {
      await this.fallback.speak(text);
    }
  }

  async stop(): Promise<void> {
    this.player?.pause();
    this.player?.remove();
    this.player = null;
    await this.fallback.stop();
  }

  private async synthesize(text: string): Promise<string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.cfg.openaiKey) headers.Authorization = `Bearer ${this.cfg.openaiKey}`;
    const response = await fetch(openaiEndpoint('audio/speech', this.cfg), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts',
        voice: this.cfg.openaiTtsVoice,
        input: text,
        response_format: 'mp3',
      }),
    });
    if (!response.ok) throw new Error(`TTS failed (${response.status})`);
    const bytes = await response.arrayBuffer();
    if (Platform.OS === 'web') {
      return URL.createObjectURL(new Blob([bytes], { type: 'audio/mpeg' }));
    }
    const file = new File(Paths.cache, `guide-${Date.now()}.mp3`);
    await file.write(new Uint8Array(bytes));
    return file.uri;
  }

  private play(uri: string): Promise<void> {
    return new Promise((resolve) => {
      setAudioModeAsync({ playsInSilentMode: true }).catch(() => undefined);
      const player = createAudioPlayer({ uri });
      this.player = player;
      const sub = player.addListener('playbackStatusUpdate', (status) => {
        if (status.didJustFinish) {
          sub.remove();
          player.remove();
          if (this.player === player) this.player = null;
          resolve();
        }
      });
      player.play();
    });
  }
}
