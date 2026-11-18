import {
  AudioModule,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  type AudioRecorder,
} from 'expo-audio';
import { Platform } from 'react-native';

import { config, openaiEndpoint, type AppConfig } from '@/config/env';

import { SpeechInputError, type SpeechInput } from './types';

/** Records with expo-audio and transcribes with OpenAI's Whisper endpoint. */
export class WhisperSpeechInput implements SpeechInput {
  readonly kind = 'whisper';
  private recorder: AudioRecorder | null = null;

  constructor(private readonly cfg: AppConfig = config) {}

  async start(): Promise<void> {
    const permission = await requestRecordingPermissionsAsync();
    if (!permission.granted) {
      throw new SpeechInputError('Microphone permission was not granted.', 'permission_denied');
    }
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    const recorder = new AudioModule.AudioRecorder(RecordingPresets.LOW_QUALITY);
    await recorder.prepareToRecordAsync();
    recorder.record();
    this.recorder = recorder;
  }

  async stop(): Promise<string> {
    const recorder = this.recorder;
    if (!recorder) return '';
    this.recorder = null;
    await recorder.stop();
    await setAudioModeAsync({ allowsRecording: false });
    const uri = recorder.uri;
    if (!uri) throw new SpeechInputError('Nothing was recorded.', 'unavailable');
    try {
      return await this.transcribe(uri);
    } finally {
      recorder.release();
    }
  }

  async cancel(): Promise<void> {
    const recorder = this.recorder;
    this.recorder = null;
    if (recorder) {
      await recorder.stop();
      recorder.release();
    }
    await setAudioModeAsync({ allowsRecording: false });
  }

  private async transcribe(uri: string): Promise<string> {
    const form = new FormData();
    form.append('model', 'whisper-1');
    form.append('response_format', 'json');
    if (Platform.OS === 'web') {
      const blob = await (await fetch(uri)).blob();
      form.append('file', blob, 'speech.webm');
    } else {
      form.append('file', { uri, name: 'speech.m4a', type: 'audio/m4a' } as unknown as Blob);
    }
    const headers: Record<string, string> = {};
    if (this.cfg.openaiKey) headers.Authorization = `Bearer ${this.cfg.openaiKey}`;
    const response = await fetch(openaiEndpoint('audio/transcriptions', this.cfg), {
      method: 'POST',
      headers,
      body: form,
    });
    if (!response.ok) {
      throw new SpeechInputError(`Transcription failed (${response.status}).`, 'transcription_failed');
    }
    const json = (await response.json()) as { text?: string };
    return (json.text ?? '').trim();
  }
}
