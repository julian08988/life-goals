# Running Life Goals

Expo SDK 58, React Native, TypeScript, Expo Router. Local-first: everything is stored on the device. No account, no backend required.

## On your phone with Expo Go

1. Install **Expo Go** from the App Store or Google Play.
2. On your computer, in this folder:

   ```bash
   npm install
   npx expo start
   ```

3. Scan the QR code in the terminal (iPhone: Camera app; Android: Expo Go's scanner). Phone and computer must be on the same Wi-Fi. If the LAN is blocked, run `npx expo start --tunnel`.
4. The app opens on the interview. Settings (top right on Home) has **Demo data** to load a sample hierarchy so every screen has content.

Web preview: `npx expo start --web`, or `npm run web`.

## Keys (optional)

Without keys the app runs fully offline: the guide is the rule-based `MockGuide`, speech output is the device's text-to-speech, and the mic button inserts a sample transcript you can edit.

To turn on the real guide and voice:

```bash
cp .env.example .env
```

Then fill in:

| Variable | Used for | Without it |
| --- | --- | --- |
| `EXPO_PUBLIC_ANTHROPIC_API_KEY` | Guide reasoning (Talk It Through, interview distillation, review) via Anthropic, structured JSON output | `MockGuide` |
| `EXPO_PUBLIC_ANTHROPIC_MODEL` | Model id (default `claude-sonnet-4-5`) | default |
| `EXPO_PUBLIC_OPENAI_API_KEY` | Whisper speech-to-text for the mic; OpenAI TTS for the guide's voice | sample transcript; device TTS |
| `EXPO_PUBLIC_OPENAI_TTS_VOICE` | OpenAI voice name (default `alloy`) | default |
| `EXPO_PUBLIC_GUIDE_PROXY_URL` | Base URL of your own proxy that forwards to the vendors. When set, keys above are not needed on the device. | direct vendor calls |

Restart `npx expo start` after editing `.env` (Expo inlines `EXPO_PUBLIC_*` at bundle time).

`EXPO_PUBLIC_*` values ship inside the JS bundle. That is fine for a personal build on your own phone; before anyone else installs the app, set `EXPO_PUBLIC_GUIDE_PROXY_URL` and keep the vendor keys on the proxy. `.env*` is gitignored.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run check   # all three
```

## Project layout

```
src/app/          Expo Router screens (file = route)
src/domain/       types, hierarchy rules, dates, demo seed
src/store/        Zustand store + selectors
src/persistence/  StateRepository interface; AsyncStorage implementation
src/guide/        GuideProvider, MockGuide, LLMGuide, prompts/
src/voice/        SpeechInput / SpeechOutput abstractions and implementations
src/content/      method notes shown on each step
src/ui/           theme tokens and shared components
docs/             product concept, spec, build plan, decisions
```
