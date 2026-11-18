# Goals App — Product Concept and Exploration

Status: discovery draft, v0.1 (nothing built). Working name: Goals App.
Inputs: Julian's brief, his goal-setting template (method only; personal content excluded), the Art of Accomplishment "goals that don't make you miserable" email, and web research summarized inline.

## 1. Vision and core hypothesis

Most people do not fail at goals because they lack a list; they fail because the big goals fade from daily awareness and because an inner voice talks them out of acting. The Goals App is a voice-first mobile companion that helps someone write the "ideal scene" of their life, distill it into a small hierarchy of goals (life → 5-year → 1-year → 6-month → month → week), and then keeps those goals alive every day through short, emotionally charged recall and rehearsal moments. The core hypothesis: if a person hears their own future in their own words for a few minutes a day, plans the week from that future, and gets help catching and reframing self-defeating thoughts in the moment, they will act on meaningful goals far more consistently than with any tracker. Differentiation is not storage or tracking; it is recall, meaning, and the inner game.

## 2. Who it is for and the job to be done

Primary user: an ambitious, reflective adult (founders, operators, athletes, creatives, roughly 25–45) who has already tried goal docs, Notion templates, journaling, or meditation apps, and who notices that negative self-talk and drift, not planning, is what derails them. They are willing to spend 5–10 minutes a day if it feels like a ritual rather than admin.

Jobs to be done:

- "Help me figure out what I actually want, not what I should want, and make it vivid enough that I believe it."
- "Keep my big goals present so my weeks are spent on them, not on reaction."
- "When my inner critic takes over, help me come back to who I am becoming."
- "Show me I am on course without making me feel like a failure when a week goes badly."

Secondary users (later): coaches and accountability partners who want visibility into a client's hierarchy and weekly priorities.

## 3. Why existing apps fail, and the "not a notes app" test

Landscape in one pass:

- Trackers (Strides, Goalify, Habitica, Weekdone, GoalsOnTrack): good at structuring a goal and logging progress; silent on whether the goal is yours, why you keep abandoning it, or what you believe about yourself. Strides is the strongest iOS tracker and has no Android app.
- Habit/self-care (Finch, Routinery): gamified consistency; reviews complain the game mechanics and paywall get in the way of the reflection itself.
- Journaling (Day One, Reflectly, Rosebud, Mindsera, Lound): Day One is an archive with AI bolted on; Reflectly is a two-minute mood check-in; Rosebud is the closest in spirit (conversational AI with cross-entry memory, weekly reports, goal tracking) but is text-first, voice is paid, and it has no goal hierarchy or future-self rehearsal.
- Meditation (Headspace, Oak, Calm): guided content libraries, generic, not tied to the user's own goals.
- Notion templates and Google Docs: this is what Julian uses today. Great for the one-off annual exercise; zero recall; the doc is opened a handful of times a year.

Why they decay into "just a notes app": the goal is captured once and then the product only asks for logging. Nothing re-presents the goal with emotional weight, nothing connects this week to the 5-year goal, and streaks turn a bad week into shame, which is precisely the negative self-talk trigger. A 2024 JMIR scoping review found a median 70% of users abandon lifestyle and mental-health apps within 100 days; the drop is steepest right after download, when setup friction is high and value is not yet felt.

The "not a notes app" test. We hold ourselves to these:

1. Every goal is captured as a vivid, first-person, past-tense scene with a feeling attached, not a line of text.
2. The app speaks the user's goals back to them (in their words, ideally their voice) more often than it asks them to type.
3. Every weekly priority must trace to a goal above it; orphan tasks are not allowed.
4. No streaks, no red X's, no guilt copy. Progress is shown as course, not compliance.
5. The app intervenes on the inner game: it has a first-class flow for catching and reframing self-talk.
6. If a feature could be done equally well in a note, it does not ship.

## 4. The goal-setting method the app encodes

Synthesized from Julian's template, the Art of Accomplishment principles, and the research.

### 4.1 Two ideal scenes first

- Near-term ideal scene (6–9 months): spoken in full sentences, past tense, "I woke up and everything had gone the way I wanted; here is what happened." Organized by life areas (personal growth, work, relationships, creative expression, money, lifestyle, leisure/travel, world).
- End-of-life ideal scene (age 70–80+): same form, looking back on a whole life.
- Writing in past tense and sensory detail is the Dispenza "live it as if it has happened" move, and it is also the setup for mental contrasting (section 5): a vivid wished-for future is step one of WOOP.

### 4.2 Distillation into a hierarchy

| Level | Count | Link to level above |
| --- | --- | --- |
| Life ideal scene | 2 scenes | — |
| Life goals | 10–12 | Each goal is tagged to scene passages it came from |
| 5-year goals | 5 | Each must serve 1+ life goals |
| 1-year goals | 3–5 | Each must advance a 5-year goal |
| 6-month goals | 3 | Each is a 1-year goal milestone |
| Monthly goals | 3 | Each moves a 6-month goal |
| Weekly priorities | 3 (+ sub-steps) | Each must name its monthly goal |

The app enforces the links (choose a parent when creating a child) and can show any weekly priority's "ancestry" up to the scene sentence that inspired it. That ancestry is the recall mechanism.

### 4.3 "Good way" quality gates (from the Art of Accomplishment email)

Before a goal is accepted, the guided dialogue checks:

- Want vs should: "Does this come from desire or from a 'should'? What is the deeper want behind the should?"
- Body check: "Say it out loud. Does it energize or drain you?" If it drains, flip it to the feeling-state version ("I want to feel light and alive") and then name three ways you want to go after it.
- Orientation, not arrival: ask what the goal reveals or asks of you, not just when it is done.
- Live from it: the scene text should describe being the person who has it, not the trophy.

### 4.4 Lower levels get sharper

Life and 5-year goals stay qualitative. From 1-year down, the dialogue nudges toward specificity, and weekly priorities get implementation intentions ("If it is Tuesday 7:00, then I open the pitch deck"). This is where the strongest evidence sits (section 5).

## 5. Neuroplasticity and anti-negative-self-talk layer

Honest framing first. Dispenza's "Breaking the Habit of Being Yourself" contributes a usable vocabulary and practice set: the thinking–feeling loop (thoughts produce chemistry, feelings reinforce thoughts, repetition makes the loop automatic and becomes "the familiar self"), emotional addiction to that familiar self, meditation to slow brainwaves and create a gap, "becoming no one/nothing" (dropping body, environment, time), mental rehearsal of a new self, and pairing a clear intention with an elevated emotion (gratitude, love, joy) so the body feels the future before it arrives. His four-week protocol (induction → recognizing → admitting → surrendering → observing → redirecting → creating/rehearsing) is a good scaffold for a program.

What is well-evidenced vs. pop-science:

- Well-evidenced: implementation intentions (if–then plans), meta-analytic d ≈ 0.46–0.65 across hundreds of tests; mental contrasting with implementation intentions (WOOP), g ≈ 0.34; process-focused mental simulation beats outcome-only simulation for goal attainment (Pham & Taylor); distanced self-talk (addressing yourself by name or "you") reduces emotional reactivity without extra cognitive load (Kross, Orvell); cognitive restructuring for negative self-talk (core CBT); self-compassion interventions reduce depression, anxiety, and stress (d ≈ 0.5–0.6) and may soothe highly self-critical people better than logic alone (Gilbert); self-affirmation (writing about core values) buffers identity threat, small effect d ≈ 0.4; imagery reinforcing implementation intentions increases habit strength; habit–identity links are robust but mostly correlational.
- Partially supported: mental rehearsal does build motor-cortex circuitry (Pascual-Leone 1995), but Dispenza overstates it; the study itself found mental practice alone was significantly weaker than physical practice and best combined. Meditation produces measurable brain and mood changes; the 2025 Dispenza-affiliated retreat study (Communications Biology) found short-term neural and plasma changes in 20 self-selected participants with no control group, later corrected to "observational." Elevated emotion during visualization is plausible as motivation and encoding aid; "heart–brain coherence" and HeartMath claims are weak.
- Pop-science: quantum field, intention altering DNA, retroactive prayer effects, meditation curing disease. The product must not imply any of this.
- A genuine warning from the research: pure positive fantasizing about an idealized future lowers energy and effort (Kappes & Oettingen). So "visualize the dream" without contrasting it with obstacles and planning the next step is actively counterproductive. Our rehearsal flows always end in an obstacle and a next action.

Concrete features, tagged with science and confidence (High / Medium / Low):

- Morning Rehearsal (3–5 min, voice-guided). Brief settling breath; the app reads back one life goal and one 5-year goal in the user's words (optionally cloned voice), asks them to feel the scene as already true, then shifts to process imagery of today's priority step and one obstacle-plan. Science: mental contrasting + process simulation + implementation intentions + imagery. Confidence: High for the structure; Medium for the "feel it as done" element.
- Future-Self Scenes. Each life goal has a scene card (text, user's recorded voice, optional generated ambient visual). Tapping it plays the scene; the app resurfaces scenes on a spaced schedule. Science: identity-based motivation, imagery, spaced retrieval. Confidence: Medium.
- Catch and Reframe. A one-tap "I'm in my head" entry: speak the thought; the AI labels it (catastrophizing, all-or-nothing, mind-reading), prompts a distanced rewrite ("Julian, what would you tell a friend?") and a compassionate, believable alternative; it links the thought to the goal it is attacking. Science: CBT cognitive restructuring, distanced self-talk, self-compassion. Confidence: High.
- Familiar-Self Map. During onboarding the user names their recurring self-talk patterns and the "familiar self" they produce; later reframes are logged against them so the user sees patterns thinning over months. Science: Dispenza's recognizing/admitting steps, CBT thought records. Confidence: Medium.
- Elevated-Emotion Check-in. Twice daily, a 10-second slider plus one word for the emotion they are living from; the weekly review correlates emotion with priority completion. Science: emotion-as-information, mood tracking as reflection. Confidence: Medium (correlation only; avoid causal claims).
- Values Anchor. Monthly 2-minute self-affirmation: say why one life goal matters to who you are. Science: self-affirmation theory. Confidence: Medium.
- Course, not Streaks. Progress is shown as direction of travel against the monthly goal with a "back on course" action after misses; no streak counters. Science: streak research shows self-attributed breaks cause shame and dropout; self-compassion improves persistence after failure. Confidence: High.
- Evening Close (optional, 60 seconds). "What did you do today that the future you would recognize?" Science: retrieval practice, identity reinforcement. Confidence: Medium.
- Neuroplasticity Program (opt-in, 4 weeks). A structured Dispenza-style meditation sequence framed as practice, not medicine, with plain-language notes on what is and is not established. Confidence: Low–Medium for outcomes; High for user appeal.

## 6. Core loops

- Onboarding (45–60 min, can pause). Voice-first. The app interviews the user through the near-term scene by life area, then the end-of-life scene, then distills: it proposes 10–12 life-goal candidates from the transcript, the user edits and ranks by voice, then the 5-year and 1-year sets, with the want-vs-should and body checks. It ends by recording the user reading their top three scenes aloud (the raw material for rehearsal playback) and setting the weekly planning day.
- Daily recall moment (3–5 min). Morning Rehearsal as above; a lock-screen widget shows the one priority for today and its ancestor goal. Catch and Reframe is available anytime from the widget.
- Weekly priorities and review (10 min, Sunday or Monday). Review last week by priority, not by task count: done / moved / dropped, plus one sentence on what the inner critic said. Then set three priorities for the week, each attached to a monthly goal, each with an if–then plan. The app flags any monthly goal with no priority for two weeks running.
- Monthly and quarterly recalibration (15–20 min). Replay the 1-year goals, mark what changed in life, rewrite stale goals (goals are allowed to dissolve; the email's "the most powerful goals are the ones that dissolve"), reset the three monthly goals. Twice a year, redo the near-term ideal scene; once a year, revisit the end-of-life scene.

## 7. Interaction and design direction

Sleek, minimal, futuristic, calm. Dark-first palette with one luminous accent; large type; generous negative space; motion that breathes rather than bounces. Voice is the primary input and the primary output; the screen supports and visualizes. No dashboards of numbers on the home screen.

Signature moments:

- The Constellation. The home view is the goal hierarchy as a sparse star field: life goals are the brightest points, lower levels orbit them, this week's priorities glow. Pinch to zoom from week to life. Nothing to type here; tap a star to hear it.
- The Scene Player. A full-screen, nearly empty view with a slow ambient visual and a waveform of the user's own voice reading their ideal scene. Haptic pulse on the breath cue. This is what people will show friends.
- Catch and Reframe. Hold the accent orb, speak the thought; it appears as fragile text that dissolves as the reframed sentence forms in its place, with the goal it belongs to lit up below.
- Week Weave. The weekly planning surface: three slots, each drawing a visible thread up to its monthly goal and on up to the life goal. An unattached slot cannot be saved; the thread is the UI constraint.
- Course Line. Progress is a single smooth line over the month showing direction, with gentle "back on course" markers, never a grid of checkboxes.

## 8. Technical direction (brief)

- App: Expo (React Native) + TypeScript, iOS first, Android when ready. Pros: one codebase, fast iteration, EAS builds, mature animation stack (Reanimated, Skia) for the signature visuals. Cons: voice and audio need a development build (no Expo Go), and the most polished audio/haptic work may need small native modules. Alternative: SwiftUI-only if Julian commits to iOS-only and wants the maximum fidelity; costs Android and shared web code.
- Voice: on-device STT via `expo-speech-recognition` (iOS 17+ offline) for private dictation; TTS for playback via ElevenLabs (including optional voice cloning of the user) or OpenAI TTS; for the real-time guided interview either the OpenAI Realtime API behind our own server or ElevenLabs Conversational AI's React Native SDK. Recommendation: start with STT + LLM + TTS as three services (cheaper, provider-swappable, data-residency control), move to full-duplex realtime once the scripts are stable.
- LLM: Anthropic or OpenAI via a thin server (Vercel AI SDK or similar), with strict prompt scaffolds for the method (scene interview, distillation, want-vs-should, reframing). Model outputs are suggestions the user edits; the user's words win.
- Backend: Supabase (Postgres, RLS, auth, storage for audio) is the pragmatic default and matches Julian's existing stack; Convex is the alternative if end-to-end TypeScript reactivity matters more than SQL. Either way, audio and transcripts should be encrypted at rest with a clear path to client-side encryption, since this is the most personal content a person will ever put in an app.
- Notifications and widgets: native lock-screen widget for today's priority; local notifications for the rehearsal and review rituals.

## 9. What gstack is and how we would use it (and the pstack ambiguity)

gstack (github.com/garrytan/gstack) is Garry Tan's MIT-licensed, Markdown-based skill pack that turns a coding agent into a virtual product team via slash commands: `/office-hours` (six forcing questions that produce a design doc), `/plan-ceo-review` (find the 10-star product; expand or cut scope), `/plan-eng-review`, `/plan-design-review`, `/design-shotgun` (4–6 AI mockup variants on a comparison board with taste memory), `/design-html`, `/autoplan` (CEO → design → eng review in one pass), `/review`, `/qa`, `/ship`, `/retro`, `/cso` security audit, plus newer `/ios-qa` for driving a real iPhone. It is built for Claude Code first; Cursor support is officially "experimental" (`./setup --host cursor` installs into `~/.cursor/skills/gstack-*`, safety hooks become advisory). It is very popular (the README reports well over 80K stars).

Evidence Julian means this gstack: the existing repo at `/workspace` already uses it. `apps/website/AGENTS.md` and `claude.md` contain a "gstack" section listing `/office-hours`, `/plan-ceo-review`, `/ship`, and more, `docs/ad-attribution-engine-design.md` is stamped "Generated by /office-hours", and `.gitignore` excludes `.gstack/`.

How we would use it for this product, in order: `/office-hours` on this concept doc to pressure-test the framing; `/plan-ceo-review` to find the 10-star version and decide expansion vs reduction; `/design-shotgun` to explore the five signature moments visually before any code; `/plan-eng-review` on the stack; then `/autoplan` → implement → `/ship` per feature, with `/ios-qa` once there is a device build.

The pstack ambiguity: pstack is a different thing, a Cursor plugin (cursor/plugins, by backnotprop) of rigorous agent workflows (`/poteto-mode`, `/architect`, `/arena`, `/interrogate`) with per-role model configuration via `/setup-pstack`. It is installed in this environment. Given the repo evidence, "gstack" almost certainly means Garry Tan's pack; pstack would be complementary (rigor on individual coding tasks) rather than a substitute (product and design reviews). Worth a one-line confirmation with Julian.

## 10. The existing repo at /workspace

`/workspace` is `julian08988/bem-performance-reporting`, a Bun workspaces monorepo named `zeigen-ai` with `apps/website` (a Next.js 16 / React 19 / Tailwind / shadcn app with Supabase auth and AI SDK + LangGraph agents) and `packages/supabase` (migrations and generated types for a Supabase project). It is Zeigen, an ad-performance and ticket-sales reporting platform for live-event organizers and agencies (Meta/Google/TikTok spend, ticket-report ingestion, attribution). It is unrelated to a goals app. Recommendation: a fresh repo for the Goals App; the only reasons to share would be reusing Supabase conventions and gstack setup, both of which are easy to copy.

## 11. Open questions for Julian

1. iOS-only at launch (allows SwiftUI or Expo with iOS polish first) or iOS and Android from day one?
2. Strictly personal, or should a coach or partner be able to see your hierarchy and weekly priorities? This changes the data model, privacy posture, and monetization.
3. How prescriptive on Dispenza? Options: (a) explicitly branded as his method, (b) inspired by it but framed in evidence-based language, (c) a neutral core with an opt-in Dispenza program. Our draft assumes (c).
4. Voice persona: a single AI guide voice, a choice of voices, or primarily the user's own cloned voice reading their scenes back? Cloning is the most powerful and the most sensitive.
5. Privacy bar: is server-side encryption with strict RLS acceptable for v1, or is client-side end-to-end encryption a launch requirement (which constrains AI features)?
6. Monetization: paid subscription from day one, free core with a paid neuroplasticity program, or no monetization until retention is proven?
7. How much of the onboarding should be a single long session versus spread across the first week? The method wants depth; abandonment data punishes friction.
8. Which life areas are canonical? The template uses eight; do we keep them fixed, user-editable, or inferred?
9. Is the first user Julian alone (build for one, then generalize) or a small cohort of friends and founders from the start?
10. Platform for AI: any preference or constraint on OpenAI vs Anthropic vs ElevenLabs, and on EU data residency?

## 12. Proposed next steps

1. Review this concept with Julian; resolve questions 1–4 (they shape everything else).
2. Run gstack `/office-hours` and `/plan-ceo-review` on this document to stress-test and sharpen scope.
3. Design-language exploration: mood board plus `/design-shotgun` rounds on the Constellation, Scene Player, and Catch and Reframe moments.
4. Script the voice onboarding interview end to end (all prompts and branches) and test it as a plain phone call with 3–5 people before any UI exists.
5. Clickable prototype of onboarding → first Morning Rehearsal; measure whether people finish and whether the playback moment lands.
6. Decide repo and stack; scaffold Expo + Supabase with gstack configured; set up voice spike (STT + TTS + LLM) as the first technical risk to retire.
