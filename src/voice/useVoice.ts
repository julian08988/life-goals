import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { hasOpenAI } from '@/config/env';
import { useAppStore } from '@/store/useAppStore';

import { DeviceSpeechOutput } from './DeviceSpeechOutput';
import { MockSpeechInput } from './MockSpeechInput';
import { OpenAISpeechOutput } from './OpenAISpeechOutput';
import type { SpeechInput, SpeechOutput } from './types';
import { WhisperSpeechInput } from './WhisperSpeechInput';

export type MicState = 'idle' | 'listening' | 'transcribing';

const SAMPLE_TRANSCRIPT = 'Sample transcript. Add an OpenAI key to transcribe real speech.';

let sharedOutput: SpeechOutput | null = null;

export function speechOutput(): SpeechOutput {
  if (!sharedOutput) {
    const device = new DeviceSpeechOutput();
    sharedOutput = hasOpenAI() ? new OpenAISpeechOutput(device) : device;
  }
  return sharedOutput;
}

export function createSpeechInput(sample: () => string = () => SAMPLE_TRANSCRIPT): SpeechInput {
  return hasOpenAI() ? new WhisperSpeechInput() : new MockSpeechInput(sample);
}

interface UseVoiceOptions {
  onTranscript: (text: string) => void;
  /** Transcript the mock returns when no STT is configured; defaults to a generic sample. */
  sample?: () => string;
}

/** Mic state machine plus guide speech, honouring the voiceOutput setting. */
export function useVoice({ onTranscript, sample }: UseVoiceOptions) {
  const voiceOutput = useAppStore((s) => s.settings.voiceOutput);
  const input = useMemo(() => createSpeechInput(sample), [sample]);
  const [mic, setMic] = useState<MicState>('idle');
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      input.cancel().catch(() => undefined);
      speechOutput().stop().catch(() => undefined);
    };
  }, [input]);

  const toggleMic = useCallback(async () => {
    setError(null);
    if (mic === 'idle') {
      try {
        await speechOutput().stop();
        await input.start();
        if (alive.current) setMic('listening');
      } catch (e) {
        if (alive.current) setError(e instanceof Error ? e.message : 'Microphone unavailable.');
      }
      return;
    }
    if (mic === 'listening') {
      setMic('transcribing');
      try {
        const text = await input.stop();
        if (alive.current && text) onTranscript(text);
      } catch (e) {
        if (alive.current) setError(e instanceof Error ? e.message : 'Transcription failed.');
      } finally {
        if (alive.current) setMic('idle');
      }
    }
  }, [input, mic, onTranscript]);

  const say = useCallback(
    async (text: string) => {
      if (!voiceOutput || !text) return;
      setSpeaking(true);
      try {
        await speechOutput().speak(text);
      } finally {
        if (alive.current) setSpeaking(false);
      }
    },
    [voiceOutput],
  );

  const hush = useCallback(async () => {
    await speechOutput().stop();
    if (alive.current) setSpeaking(false);
  }, []);

  return { mic, speaking, error, toggleMic, say, hush, inputKind: input.kind };
}
