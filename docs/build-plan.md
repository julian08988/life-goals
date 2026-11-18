# Life Goals — Build and Launch Plan, Week 1 (Wed Nov 18 – Tue Nov 24, 2026)

Status: plan v0.2, written Tue Nov 17, 2026, aligned Wed Nov 18 to [`core-product.md`](core-product.md) (the spec: killer feature §2, core loop §3, functional spec §4, data model §5, positioning §6). Companion to [`product-concept.md`](product-concept.md) (method §4, design §7, technical direction §8) and [`market-research.md`](market-research.md). Where the spec and this plan disagree, the spec wins.

Julian's brief: build the app this week, launch on iOS and Android fast, and do not ship a bad version. It must resemble the final product: interview you as a user, draft the plan, a sleek interactive UI that shows your heading and goals, daily correction to keep you on course. Paper (paper.design) mockups before code; gstack skills in the workflow.

Two milestones:

- **Launch this week (Mon Nov 23):** full v1 on TestFlight and Google Play internal testing, Julian plus 5–10 invited people using it daily; store submissions the same day.
- **Public listing (following milestone, target week of Nov 30):** gated on Apple review (1–3 days typical, longer for a first app with personal data and AI) and on Google Play's rule that a new personal account runs a 14-day closed test with 12+ testers before production (organization accounts exempt).

## 1. v1 scope: five moments

Method, counts and gates are concept §4 and spec §3; UI language is concept §7. v1 is exactly these five moments, voice-first, dark-first, both platforms from one codebase. The killer feature (spec §2) is the guide that holds the whole hierarchy in memory and answers the four questions out loud (why am I doing this, how should I prioritize, how do I stay on course, what should I work on now), every answer threaded to the user's words and ending in a next action. Moments (c) and (e) are where that conversation lives; (a), (b) and (d) feed and display it.

### (a) Voice interview onboarding → confirmed hierarchy

- 20-second spoken framing by the guide voice, then mic and speech permissions. Typing is always available as fallback, never the default.
- Interview 1, near-term ideal scene (6–9 months): one question per life area (the eight from concept §4.1, fixed in v1), past tense, "tell me what happened". Live transcript; at most one follow-up per area.
- Interview 2, end-of-life scene: three to four open prompts, same form. Both scenes saved verbatim as transcript plus audio.
- Resumable: every answer persists immediately; stopping returns the user to the exact question. Target ~45 minutes end to end (spec §3). Research says long intimate onboarding is the category's main abandonment lever, so the mitigations are structural, not a shorter interview: every answer visibly shapes the next screen, nothing is paywalled behind it, and the first scene playback happens inside the interview.
- Distillation, level by level: the LLM proposes 10–12 life-goal candidates, each tagged to the scene passage it came from (quote shown under the goal). User edits, merges, deletes or re-records by voice, then confirms. Nothing proceeds until the level is confirmed.
- Then 5 five-year goals (each names 1+ life goals), 3–5 one-year, 3 six-month, 3 monthly, 3 weekly priorities. Orphans are impossible by data model (NOT NULL parent, level ↔ parent-level check constraint) and by UI (parent picker is step one of creating anything).
- Two "good way" gates from concept §4.3 on each 5-year and 1-year goal: want-vs-should and the body check.
- Closing: the user reads their top three life-goal scenes aloud (stored for Morning Course), picks a review day and morning time; notifications scheduled. Home unlocks only after this.

### (b) The Plan view ("Week Weave")

- Home screen. This week's 3 priorities as three slots; each draws a visible thread up through month → 6-month → 1-year → 5-year → life goal → the ideal-scene sentence it came from.
- Tap any node to hear it (user's recording when one exists, else TTS in the user's words). Long-press to edit by voice.
- Swipe between levels to browse the hierarchy; the week is always the entry, the scene sentence always the end.
- A priority can be marked done, moved or dropped; moved and dropped are neutral, never red.
- A slot is filled by picking its monthly goal first; no quick-add without a parent.
- Course line: one smooth line across the month showing direction of travel, with correction markers from Morning Course. No counts, percentages or streaks.
- Performance budget: thread renders under 100 ms on a three-year-old Android; Reanimated worklets, no JS-thread work during gestures.

### (c) Morning Course ritual (3 minutes, voice-guided)

Spec §3 step 2; "Daily Recall" in plan v0.1. Renamed because the job is to set today's heading and correct yesterday's drift, not to reminisce.

- Local notification at the chosen time, also from home. Hands-free once started: the guide speaks, pauses for responses, resumes.
- Fixed script, variable content: 20 s settling breath with haptic pulse → one life goal and one 5-year goal spoken back in the user's own words (own recording when available, else TTS) → today's priority step → process imagery ("walk through the first two minutes of doing it") → one obstacle and if-then plan, spoken by the user and saved.
- One optional "catch and reframe" prompt: "Has your inner critic said anything about this today?" Skippable in one word, never forced (research flags Stoic's forced negative prompt as a failure). The LLM labels the distortion (catastrophizing, all-or-nothing, mind-reading), asks one distanced question using the user's name, offers one believable alternative. Accept, edit by voice, or skip. The reframe links to the goal it was attacking.
- One correction: if yesterday's step was missed, the guide names it once, neutrally, and asks for the smallest step back on course today; that becomes a course-line marker.
- Visual: the Scene Player from concept §7 for the whole ritual: near-empty screen, slow ambient motion, waveform, one large sentence of what is being spoken.
- Always completable in 3 minutes with skips; every response is saved to the session and surfaces in the Weekly Review.
- Never ends on the fantasy: obstacle and next action are mandatory (concept §5).

### (d) Weekly Review (15 minutes)

- Notification on the chosen day; last week's three priorities one at a time: done / moved / dropped by voice or tap, plus one sentence on what the inner critic said (prefilled from reframe logs, editable).
- The guide reads the monthly goals and asks for next week's three priorities one at a time. Each must attach to a monthly goal (parent picker first), then gets an if-then plan by voice.
- A monthly goal with no priority for two consecutive weeks is flagged once, plainly, with the option to re-plan or let it dissolve.
- Ends by redrawing the Week Weave and speaking the three priorities and what they serve back as one sentence.

### (e) Talk It Through (anytime, open conversation)

Spec §3 step 3 and the whole of spec §2. First-class in v1: this is the moment that makes the memory model visible and the product more than a planner.

- Entry from home (hold the orb and talk) and from the "I'm in my head" affordance; also reachable from any node in the Week Weave ("talk about this").
- The guide receives the context pack (spec §2: full hierarchy, active week, last three sessions' extracts, linked reframes, retrieved turns) and maps the ask to one of the four questions or a reframe. Answers quote the user's words verbatim, name drift with the data, and converge on a next action; target close in five minutes, with "keep going?" rather than homework.
- Can write back: save a next action, move or drop a priority (parent picker still enforced), log a reframe. Every write is confirmed by voice before it lands.
- Streamed STT → LLM → TTS with automatic end-of-speech detection; the user never taps to send. Text input available as fallback.
- Visual: the orb (listening / thinking / speaking), the sentence being spoken, and the thread of whatever goal is in play lit beneath.
- Rules enforced in the prompt and checked in QA: spec §2 "Rules the guide must obey" (thread to the user's words, end in a next action, no pure positive fantasy, challenge drift, no shame, bounded, never invent, not therapy).

### Explicit non-goals for v1

No payments or paywall (decision A in §5), no sharing or coach mode, no home-screen or lock-screen widgets on either platform, no voice cloning, no Constellation home (the thread view is the v1 surface; the Constellation is a week-2+ upgrade of the same data), no full-duplex realtime voice (streamed three-service pipeline with auto end-of-speech, concept §8), no evening close, emotion check-in or familiar-self map, no Dispenza program, no "What I know about you" memory panel (week 2; memory is edited through the hierarchy and sessions in v1), English only, no web or tablet layouts, no export beyond delete-my-data, no social login beyond Sign in with Apple and email OTP. Monthly Recalibration (spec §3 step 5) is not in the launch build; it ships in week 2–3, before the first month boundary any tester reaches (~Dec 18).

## 2. Design-first sequence

Design runs Wed–Thu in Paper with a hard go/no-go Thursday noon ET before any screen code. Voice scripts are designed in the same pass; a mockup without its spoken line is incomplete.

### Screens to mock in Paper (11)

1. Welcome and permissions, with the guide's first spoken line as copy.
2. Interview, listening: live transcript, waveform, area indicator, pause/resume.
3. Interview, guide speaking, and the typed fallback.
4. Distillation: life-goal candidates with source quotes; edit, merge, confirm.
5. Distillation: lower level with parent picker (the orphan rule, visualized).
6. Record your scenes: three recordings, playback, redo.
7. Home / Week Weave: three slots, threads to the scene sentence, course line.
8. Node detail: tap-to-hear, long-press edit, parent and children.
9. Morning Course player, including the reframe dissolve/reform animation and the correction prompt.
10. Weekly Review: last week's priorities, new slot with parent picker and if-then plan.
11. Talk It Through: orb states, the spoken sentence, the lit thread of the goal in play, and the "save this next action" confirmation.

Plus a system board: type scale, color tokens, orb states (idle, listening, speaking, thinking), notification copy, app icon.

### Design language constraints (concept §7, made testable)

- Dark-first, one luminous accent. Body type 17 pt minimum, one typeface family. Negative space over chrome; no tab bar over three items; no numbers on home.
- Every screen has a voice state: the orb shows listening / speaking / thinking and the screen shows the sentence being spoken.
- Motion breathes (eased, 400–800 ms, tied to breath and speech), never bounces. Haptics only on breath cue, confirm and reframe.
- No streaks, red, checkbox grids or guilt copy anywhere, including notifications.
- Futuristic and calm, not sci-fi: no neon grids, no glass clutter. A quiet instrument, not a game.
- Android is the same design; differences limited to system back, status bar and haptic intensity.

### Go/no-go (Thu Nov 19, noon ET)

gstack `/design-review` on the Paper board, then Julian decides. Go requires: all 11 screens meet the constraints; every screen has its spoken line; the Week Weave thread is legible on a 6.1-inch phone with a six-level ancestry; the reframe moment has a storyboard; tokens (color, type, spacing, radii, motion) exported as JSON the app imports. No-go means a second pass Thursday afternoon and a half-day slip taken from Sunday's polish budget, not from the quality bar.

## 3. Architecture and stack

- **App:** Expo (React Native, TypeScript), EAS Build for iOS and Android, EAS Submit for upload, EAS Update for JS-only hotfixes after submission. One codebase for both stores; development builds (voice modules need them), no Expo Go.
- **Navigation:** Expo Router; typed routes; deep links from notifications into Morning Course and Weekly Review.
- **State:** Zustand with an MMKV-persisted slice (hierarchy, current session, offline queue); TanStack Query for server reads. Offline-first so the ritual never blocks on network.
- **Visuals:** Reanimated + Skia for thread, waveform and orb.
- **Backend:** Supabase. Auth (Sign in with Apple, email OTP), Postgres with RLS on every table, Storage for audio (private bucket, signed URLs), Edge Functions as the only path to LLM/STT/TTS providers (keys never ship in the app). Matches Julian's existing stack; one vendor to operate.
- **Schema v0** (spec §5): `profiles` (name, review_day, morning_time), `scenes` (near_term | end_of_life, transcript, audio_path), `scene_passages` (scene_id, life_area, text, order), `goals` (level enum life → weekly, parent_id NOT NULL except life, scene_passage_id NOT NULL when life, text, source_quote, want_or_should, energizes, status active | dissolved, confirmed_at), `recordings` (target scene_passage | goal, audio_path, duration, transcript), `weekly_priorities` (goal_id → monthly, week_start, if_then, status, closing_sentence), `next_actions` (weekly_priority_id, text, due_at, session_id, status), `sessions` (kind interview | morning | talk | review | recalibration, transcript, summary, extracts jsonb), `reframes` (session_id, goal_id, thought, distortion, reframe, accepted, thought_family), `memory_facts` (key, value, source_session_id, user_edited). A check constraint enforces level ↔ parent level; a trigger rejects any priority or next action whose ancestry does not resolve to a scene passage.
- **Memory model** (spec §2). The guide's memory is the database, not a vector store: hierarchy, scenes, recordings, sessions with extracts, weekly outcomes, reframes grouped into thought families, and context facts. An Edge Function `context_pack(user, question)` assembles per turn: the full hierarchy (small enough to send whole), the active week's priorities and outcomes, the last three sessions' extracts, reframes linked to any goal mentioned, and the top retrieved transcript turns (Postgres full-text in v1; embeddings only if retrieval quality demands it). Session extracts (decisions, commitments, next actions, questions) are produced by a structured-output call at session close and are what Talk It Through and Weekly Review read; raw transcripts are kept but rarely sent. The guide may only state facts present in the pack, and every cited goal or scene is quoted verbatim from its row.
- **LLM:** one provider behind an Edge Function; JSON-schema structured outputs for every call (candidates with quote spans, parent suggestions, want-vs-should verdict, reframe object, session extracts, Talk It Through write-backs). Default Anthropic Sonnet-class, OpenAI as the swap. Prompts are versioned files in the repo, one per moment plus the shared rules block from spec §2; the user's edits always overwrite model text. Talk It Through streams tokens to TTS sentence by sentence.
- **STT:** on-device `expo-speech-recognition` (iOS 17+ offline; Android on-device where available) for live transcript, with end-of-speech detection so Talk It Through never needs a send tap; `gpt-4o-transcribe`-class API as server fallback for long or noisy audio. Privacy and zero marginal cost on the primary path.
- **TTS:** OpenAI TTS default (roughly $0.015 per minute of audio, streamed, a few hundred ms to first audio; fine for a scripted ritual and acceptable for conversation when streamed per sentence). ElevenLabs as the upgrade for a distinctive guide voice or later cloning (lower first-byte latency on Flash models, roughly 5–20× the cost per minute, cloning needs consent and a paid tier). Fixed guide lines are pre-rendered and bundled; user-specific lines are synthesized at confirm time and cached by text hash.
- **Notifications:** `expo-notifications`, local scheduled only; no push server in v1.
- **Analytics:** PostHog React Native, event-level only (step reached, level confirmed, ritual and review completed); never transcript content; session replay off.
- **Crash reporting:** Sentry (`@sentry/react-native`, Expo plugin, source maps from EAS); PII scrubbing on, no transcript breadcrumbs.

### Data-privacy minimums

- RLS on every table and the storage bucket; service role only inside Edge Functions; a negative test (user B cannot read user A) in CI.
- Encryption at rest (Supabase default) plus app-level encryption, key in the device keychain, for transcript and reframe text the server never queries. Full client-side E2E is a follow-up (concept §11 Q5).
- No training on user data: API tiers that do not train by default (Anthropic, OpenAI, ElevenLabs), zero-retention where offered, stated in the privacy policy.
- Delete-my-data: one tap in Settings removes account, rows, audio and provider caches (Apple 5.1.1(v); Google Play also requires a web deletion-request URL).
- Disclose AI processing and named providers in onboarding, privacy policy, App Privacy and Data Safety answers; Apple's 2025 guidelines require consent before sharing personal data with third-party AI.
- No health or medical claims in app or listing; the language is practice and planning.

## 4. Day-by-day schedule

Owners: **A** = agents (Cursor cloud agents plus gstack skills, reviewed by Julian), **J** = Julian. Times America/New_York.

**Wed Nov 18 — Scaffold, design, retire the voice risk**

- A: `/plan-ceo-review` on this document first thing; accepted changes folded back before noon.
- A: Repo scaffold (Expo, TypeScript, Expo Router, lint, EAS profiles for both platforms, Sentry and PostHog behind env flags, CI on PR); Supabase migrations v0, RLS, Edge Function skeletons, synthetic seed hierarchy.
- A: Voice spike on a development build: on-device STT with end-of-speech detection → Edge Function → TTS → streamed playback on iPhone and mid-range Android. Bar: under 1.5 s from end of speech to first audio, measured on a Talk It Through turn with a full context pack, not just a scripted line.
- A: Design tokens draft; `/design-shotgun` variants as references for Paper.
- J: Paper screens 1–6. Apple Developer enrollment this morning (§5); Google Play Console, Expo/EAS and Supabase accounts; API keys; privacy-policy domain.

**Thu Nov 19 — Go/no-go, then the interview**

- J: Paper screens 7–11 and system board by 11:00. A + J: `/design-review`, go/no-go at noon, tokens exported.
- A: Interview script as versioned prompt files (every spoken line, follow-up rule, area order, distillation schemas, gate prompts), paced for ~45 minutes; dry-run read aloud once. Shared rules block (spec §2) and the Talk It Through prompt drafted the same day so the context-pack contract is fixed before schema work ends.
- A: Moment (a): permissions, interview screens, live transcript, resumable persistence, Sign in with Apple and email OTP. `/plan-eng-review` on schema, `context_pack` and Edge Function contracts.
- J: Evening, complete the interview on the dev build with his real content.

**Fri Nov 20 — Finish onboarding, build the Plan view**

- A: Distillation for all six levels with parent picker and confirm gates; scene recording; notification scheduling.
- A: Moment (b): threads, tap-to-hear, long-press edit, slot states, course line, hierarchy browsing; TTS caching and bundled guide lines.
- A: Memory layer: `sessions` and extracts, `context_pack` Edge Function, Talk It Through conversation loop (streamed STT → LLM → TTS, end-of-speech, write-back confirmations) running against Julian's real hierarchy from Thursday night.
- J: Redo onboarding on a fresh account on both devices; dictate friction notes; approve or reject distilled-hierarchy quality (the LLM checkpoint, risk 3). Evening: first Talk It Through session on his own content; the four questions, one each.

**Sat Nov 21 — Morning Course, Weekly Review, Talk It Through, first builds**

- A: Moment (c): ritual engine (speak → listen → save → next), Scene Player, catch and reframe, correction prompt, notification deep link. Moment (d): review flow, two-week flag, if-then capture, redraw and read-back. Moment (e): orb entry, lit thread, write-backs, five-minute bound.
- A: `/qa` pass 1 on both platforms, including a scripted Talk It Through transcript set (one per question, plus a drift case and a shame-bait case) checked against the spec §2 rules; fixes triaged must/should/later.
- A: EAS production builds to TestFlight internal (no Beta App Review needed) and Google Play internal testing: "launch this week" build 1.
- J: Install as user zero on both platforms; run Morning Course Saturday evening for real and one Talk It Through when actually stuck; file issues by voice.

**Sun Nov 22 — Polish, parity, store assets**

- J: Morning Course in the morning, Weekly Review at his chosen time: the full loop runs once, end to end.
- A: Parity pass against Paper screen by screen; motion and haptics; empty, error and offline states; Android pass (back gesture, audio focus, notification channels); `/design-review` round 2.
- A: Store assets from the real app: icon, iPhone and Android screenshots, descriptions written to spec §6 (headline "Stay on course to the life you chose", sub-line "Become who you set out to be", subtitle on what the guide does, and "Course, not streaks" said plainly; no manifestation or future-self framing), privacy-policy page live with the deletion URL, App Privacy and Data Safety answers for Julian's approval.
- A: `/cso` pass on RLS, Edge Function auth and keys; delete-my-data verified end to end; `/ios-qa` on a physical iPhone against §7.

**Mon Nov 23 — Gate, ship, submit (launch milestone)**

- A + J: Quality-bar review (§7) at 10:00; anything failing is fixed or cut per §6, no third option.
- A: `/qa` pass 2 and `/ios-qa` on the release candidate; `/ship`; production build 2.
- A: TestFlight external group (5–10 of Julian's people; Beta App Review usually clears within a day) and Google Play closed testing with the same people (starts the 14-day clock if the Play account is personal).
- J: Submit to App Store Review with App Privacy answers, a review note explaining the voice flows, and a demo account with a pre-filled hierarchy; submit on Google Play (production if organization account, closed testing otherwise).

**Tue Nov 24 — Respond, hotfix, plan week 2**

- A: Watch Sentry and PostHog from the first external sessions; JS fixes via EAS Update, native fixes queued for build 3.
- A + J: Answer any App Review question within the hour (typical first-app asks: demo account, permission strings, AI data-sharing disclosure).
- A: `/retro`; draft week 2: public listing, Monthly Recalibration (before ~Dec 18), "What I know about you" memory panel, Constellation home, widgets, monetization per decision A.
- J: Morning Course as usual; close decisions A and B if still open.

## 5. Julian's to-do list

All critical path; only Julian can do these.

1. **Apple Developer Program, enroll Wednesday morning.** $99/year, as an individual through the Apple Developer app on iPhone (usually 24–48 hours, sometimes a week). Organization enrollment needs a D-U-N-S number and can take 1–2+ weeks: not this week. No membership means no TestFlight and no submission; each day of delay slips the Saturday iOS build.
2. **Google Play Console account.** $25 one-time; verification can take days. Personal accounts need the 14-day, 12-tester closed test before production; organization accounts skip it but need business documents. Enable Play App Signing; create the internal testing track.
3. **Expo/EAS account;** add the agents as collaborators; connect Apple and Google credentials for signing and EAS Submit.
4. **Supabase project** (new, not Zeigen's); pick region (EU if residency matters, concept §11 Q10); invite the agents.
5. **API keys:** Anthropic and OpenAI (both, so the swap is free); ElevenLabs only if decision B picks it. Confirm no-training / zero-retention tiers.
6. **Domain for the privacy policy** and deletion-request URL (a subdomain is fine).
7. **Devices:** one iPhone and one mid-range Android on hand all week.
8. **Decision A, monetization at launch.** None in v1 (recommended: testers and reviewers reach the core moment without friction), a soft paywall after the first Weekly Review, or paid from day one. Market research confirms annual-pricing norms and heavy one-star penalties for a hard paywall after a long intimate onboarding; with a ~45-minute interview, none in v1 is the only safe answer.
9. **Decision B, AI guide voice vs the user's own voice.** v1 ships one guide voice plus the user's own recordings of three scenes (no cloning). Open: which guide voice (OpenAI stock vs an ElevenLabs designed voice) and whether week 2 adds consented cloning. Market research flags own-voice playback as the strongest mechanism in the review corpus; per spec §6 it stays a feature, not the hook.
10. **Confirm "gstack" is Garry Tan's pack** (concept §9) and that experimental Cursor-host support is acceptable.

## 6. Risks and cuts

| # | Risk | Signal | Cut or response |
| --- | --- | --- | --- |
| 1 | **Store review** slow or rejected (first app, voice, personal data, AI disclosure) | No decision 72 h after submit, or rejection citing 5.1.1 / 5.1.2 / 2.1 | Public listing is already the next milestone. Reply within the hour with demo account, permission strings, AI disclosure copy. TestFlight external and Play closed testing stay the live product; no new features while in review. |
| 2 | **Voice latency** over 1.5 s, or STT unreliable on Android | Wednesday spike fails the bar | Pre-render more guide lines; synthesize user lines at confirm time; trim the context pack (extracts only, no retrieved turns); Android falls back to tap-to-transcribe; worst case Morning Course plays recorded scenes plus bundled guide audio with typed answers and Talk It Through ships text-in, voice-out. |
| 3 | **LLM quality on distillation** (generic goals, lost nuance, wrong parents) | Julian rejects over a third of Friday's candidates | Shorter candidate list (6–8) with more editing; "say it in your words" re-record per goal; fallback where the user names goals and the model only tags quotes and suggests parents. |
| 3b | **Talk It Through quality** (generic, sycophantic, invents facts, no next action, moralizes) | Friday evening: Julian rates fewer than three of four answers as grounded in his own words and ending in a step he would take | Tighten the rules block and few-shot it with Julian's own accepted exchanges; restrict the pack to hierarchy + active week; force the structured write-back (next action required) before the closing line; if still failing, v1 launches with Talk It Through limited to the four scripted question flows rather than open conversation. |
| 4 | **Scope creep** (Constellation, widgets, cloning, program, memory panel) | Any screen not on the Paper board after Thursday noon | The five moments are the contract; new ideas go to the week-2 list in `/retro`. The quality bar, not feature count, decides submission. |
| 5 | **Android parity** lags (audio focus, speech recognition, back gesture, channels) | Saturday `/qa` shows Android-only failures in a moment | Android stays in internal testing, iOS goes external; Android public listing follows a week later. Never ship a visibly worse Android build publicly. |
| 6 | **New-account delays** (Apple, Play verification, EAS credentials) | Apple not approved by Friday evening | Saturday build to Android internal first; iOS on an ad-hoc dev build on Julian's phone; Play closed test starts Monday regardless so the 14-day clock runs. |

## 7. Definition of "resembles the final product"

Submission is gated on all eleven, checked Monday 10:00 on real devices on both platforms, by someone other than the builder.

1. A new user completes the voice interview and confirms every level without typing, in about 45 minutes, and can stop and resume at any question; nothing is saved without a parent.
2. Every goal and priority is in the user's words, with its ideal-scene sentence one tap away.
3. Week Weave shows a complete thread from this week to the scene sentence, renders under 100 ms, and tap-to-hear works on every node.
4. Morning Course runs hands-free in 3 minutes, plays the user's own recordings where they exist, always ends in an obstacle and next action, and the reframe (when the user opts in) is believable and linked to a goal.
5. Talk It Through answers each of the four questions on Julian's real hierarchy with an answer that quotes his own words, names drift where the data shows it, and ends in a saved next action; first audio under 1.5 s; no invented facts across a ten-exchange QA set.
6. Weekly Review yields three priorities, each threaded to a monthly goal with an if-then plan, and flags neglected monthly goals once, neutrally.
7. No streaks, counts, red states or guilt copy anywhere, including notifications and empty states.
8. Every screen matches its Paper mockup in layout, type, color and motion; `/design-review` round 2 has no blocking notes.
9. Zero crashes in `/qa` pass 2 and in Julian's last three sessions; no unhandled Sentry errors from testers in 24 hours; cold start under 2 s on both test devices.
10. Plan view and Morning Course playback work offline with cached audio; the interview resumes exactly where it stopped after a force quit.
11. Privacy complete: RLS negative test passes, delete-my-data verified end to end, privacy policy and deletion URL live, App Privacy and Data Safety answers match the app, AI processing disclosed in onboarding.

Resembling the final product does not mean every concept-doc feature; it means the five moments feel finished, sound like the user, keep them on course, and look like the Paper board. Anything failing a line above is fixed or cut on Monday, and we submit what passes.
