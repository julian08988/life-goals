# Life Goals — Core Product Spec

Status: spec v0.1, 18 Nov 2026. Builds on [`product-concept.md`](product-concept.md) (method §4, loops §6) and [`market-research.md`](market-research.md) (cited as MR §n). [`build-plan.md`](build-plan.md) is aligned to this document. User zero is Julian; everything here is written to be useful to one person first and generalized second.

## 1. What it is

Life Goals is a voice guide that keeps you on course to the life you chose. Once, in a ~45-minute spoken interview, it helps you describe the person you intend to become (an ideal scene near-term and at end of life), distills that into 10–12 life goals and the 5-year, 1-year, 6-month, monthly and weekly layers beneath them, and records three key scenes in your own voice. From then on it holds the whole hierarchy in memory and, out loud, answers the four questions that decide whether you execute: *why am I doing this*, *how should I prioritize my actions*, *how do I stay on course*, *what should I truly work on now*. Every answer threads back to something you said, names where you have drifted, and ends in a next action. The hierarchy is the content, voice is the medium, the Week Weave is how you see your heading; the product is the daily correction. Execution, not manifestation; course, not streaks.

## 2. The killer feature: a guide that keeps you on course

### What the guide knows (memory model)

| Memory | Contents |
| --- | --- |
| Hierarchy | Goals at six levels: parent, verbatim phrasing, source scene passage, want/should and energizes verdicts |
| Scenes | Two ideal-scene transcripts (near-term, end-of-life) split into passages by life area |
| Recordings | Three key scenes in the user's voice; optional per-goal recordings; raw interview audio |
| Conversations | Every session transcript plus extracts: decisions, commitments, next actions, questions raised |
| Weekly outcomes | Per priority: done / moved / dropped, the user's one sentence, course-line markers, neglect flags |
| Recurring thoughts | Reframe log: thought, distortion, the goal it attacked, the accepted reframe; grouped into thought families with counts and last seen |
| Context facts | Name, life context stated in the interview (e.g. "new baby, 3 months"), review day, morning time |

All of it is visible and editable in a "What I know about you" panel. Per turn the guide gets a context pack: the full hierarchy (it is small), the active week, the last three sessions' extracts, reframes linked to any goal in play, and retrieved turns matching the question. It never states a fact it cannot cite to one of these rows (MR §3.1: Stella's uneditable hallucinations collapse the spell). Memory exists to correct course, not to reminisce; every lookup serves a decision about what to do next.

### How it answers the four questions

Persona for the examples: a founder three months into a first baby, called "Sam" only where the guide uses distanced self-talk. All details are invented.

**"Why am I doing this?"** Inputs: the ancestry of the priority in question up to its scene sentence, that scene's recording, prior sessions where the user explained the why. A good answer reads the thread upward in the user's words, offers the recording, checks whether the why still holds, and converts it into one decision so the user can push through or consciously re-plan.

> **User:** Why am I even writing this investor update tonight? I barely saw her today.
> **Guide:** The update is this week's priority "send the October update to every investor", threaded to "close the bridge by December", which serves your one-year goal in your words: "the company funds itself through 2027 so I never choose between payroll and being home." Want to hear that scene?
> **User:** Yeah. (plays 20 s of own recording) OK. It's so I don't have to choose.
> **Guide:** So tonight's update is a being-home move, not a founder move. Two honest options: send it in twenty minutes with the numbers you have, or send it at 7 tomorrow and go hold her now.
> **User:** Tomorrow at 7. Numbers as they are.

**"How should I prioritize my actions?"** Inputs: the candidates the user names, this week's priorities and their monthly parents, open next actions, recent moved/dropped outcomes. A good answer sorts candidates by the goal each serves, names what is unparented, breaks ties with past outcomes, and ends with the first move.

> **User:** I've got a pile: hire the designer, the pricing page, a podcast invite, daycare tours.
> **Guide:** Three of those attach. Designer and pricing page both serve this month's "v2 in paying customers' hands". Daycare tours thread to your near-term scene: "we had childcare we trusted by spring." The podcast doesn't attach to anything you've set.
> **User:** The podcast would be good exposure, though.
> **Guide:** Exposure for which goal? Name it and we add it; otherwise it waits. And you moved the pricing page in each of the last two weeks, so that goes first: ninety minutes tomorrow morning on the draft?
> **User:** Yes. Podcast waits. Tours in the third slot.

**"How do I stay on course?"** Inputs: the last four to eight weeks of outcomes, course-line markers, the reframe log for the goal in question. A good answer names the pattern plainly, separates drift (a goal you still want, slipping) from recalibration (a goal whose season changed), reuses the user's own reframe rather than inventing one, and offers the smallest step back or an honest re-plan.

> **User:** Third week in a row I did nothing on the book outline. Maybe I'm just not a writer.
> **Guide:** Three weeks moved, that's true. "I'm not a writer" has come up twice before, and both times you reframed it to "Sam is a founder with a newborn who writes in twenty-minute windows." Still accurate?
> **User:** Honestly, yes. There is no twenty-minute window right now.
> **Guide:** Then this is a season, not a verdict. Two true options: move the outline's monthly goal to January and say so out loud, or keep it with one twenty-minute slot during Saturday's nap.
> **User:** January. I'd rather own that than keep failing it. Saturday's nap goes to the pricing page.

**"What should I truly work on now?"** Inputs: today's named thing from Morning Course, this week's priorities, the time and state the user reports, yesterday's outcome. A good answer picks one thing, says which goal it serves, scales it to the time and energy available, and gets the user started before the call ends.

> **User:** She's down. I've got forty minutes. What do I actually do?
> **Guide:** Today's named thing is the pricing draft, for "v2 in paying customers' hands". Your first two minutes were "open the doc, write the three tiers as plain sentences." Does forty minutes of that fit, or are you too fried?
> **User:** Fried. But I could do the tiers.
> **Guide:** Then just the tiers. If she wakes early, the tiers alone count as on course. Say the first one to me now, then go write it; I'll ask how it went tomorrow morning.

### Rules the guide must obey

1. **Thread to the user's words.** Every goal, priority or scene it cites is quoted or played verbatim; model paraphrase is a suggestion the user's edit overwrites.
2. **End in a next action.** No session closes without one saved, concrete, time-bounded action attached to a priority.
3. **No pure positive fantasy.** A scene is never played without an obstacle and a step after it (Kappes & Oettingen; concept §5).
4. **Challenge drift.** When outcomes and words diverge, say so once, plainly, with the data; ask whether it is a choice or a drift; push for the step. No flattery (MR §3.6).
5. **No shame.** Never "you missed", never counts framed as failure, never red. Distanced self-talk by name; a correction is a normal move, and re-plans are legitimate outcomes.
6. **Bounded.** Talk It Through aims to close in five minutes, offers to continue, never assigns homework (MR §3.7).
7. **Never invent.** If memory lacks it, ask.
8. **Not therapy.** No diagnosis or medical claims; on crisis language it hands off and stops coaching.

## 3. Core loop

**(1) Interview** — once; ~45 min, resumable at any question. *Trigger:* first open. *Inputs:* spoken answers; eight fixed life areas. *What happens:* near-term scene (6–9 months, past tense, one question per area, at most one follow-up), then end-of-life scene; the guide proposes 10–12 life goals each tagged to its source passage; the user edits and confirms level by level down to three weekly priorities, with want/should and body checks on 5-year and 1-year goals; records three key scenes aloud; picks review day and morning time. *Outputs:* confirmed hierarchy, two scenes, three recordings. *Memory:* hierarchy, scenes, recordings, context facts, transcript. *Voice-first:* the guide speaks every question; typing is a fallback. *Screen:* live transcript, waveform, area indicator; distillation cards with source quotes; the thread growing as levels confirm. Research tension: long intimate onboarding is the category's top abandonment lever (MR §1, §4); so every answer visibly shapes the next screen, nothing is paywalled, and the first scene playback happens inside the interview.

**(2) Morning Course** — daily, 3 min: set today's heading. *Trigger:* notification at the chosen time. *Inputs:* one life goal and one 5-year goal (rotating), today's priority, yesterday's outcome, the reframe log. *What happens:* settling breath; where you are heading, in your words; name the one thing today and its first two minutes; optional "has your inner critic said anything?" with label, distanced question and believable reframe (skippable, never forced; MR §4 on Stoic's forced negative prompt); if yesterday slipped, one neutral correction: the smallest step back on course. *Outputs:* today's named thing and next action. *Memory:* session, next action, reframe, course marker. *Voice-first:* hands-free end to end. *Screen:* Scene Player: near-empty, slow ambient motion, waveform, the sentence being spoken.

**(3) Talk It Through** — anytime. *Trigger:* the user opens and talks (stuck, doubting, scattered); also the "I'm in my head" entry. *Inputs:* the full context pack plus whatever the user says. *What happens:* the guide maps the ask to one of the four questions (or a reframe) and answers as in §2, naming drift and pushing to a step. *Outputs:* a decision and a next action; sometimes a moved priority or a reframe. *Memory:* transcript, extracts, hierarchy edits. *Voice-first:* streamed speech both ways with automatic end-of-speech; text available. *Screen:* the orb (listening / thinking / speaking), the sentence being spoken, the thread of the goal in play lit beneath.

**(4) Weekly Review** — chosen day (default Sunday), 15 min. *Trigger:* notification. *Inputs:* last week's priorities, their reframes, the monthly goals, neglect flags. *What happens:* close each priority as done / moved / dropped with one sentence, no guilt; hear the monthly goals; pick three priorities each threaded to a monthly goal with an if-then plan; a monthly goal untouched for two weeks is flagged once (re-plan or dissolve); reset the heading by hearing the three priorities and what they serve as one sentence. *Outputs:* next week's Week Weave. *Memory:* outcomes, new priorities, session. *Voice-first:* spoken throughout, tap to confirm. *Screen:* Week Weave, last week fading, next week's threads drawing.

**(5) Monthly Recalibration** — first review after a month boundary, +10 min. *Inputs:* 1-year and 6-month goals, the month's outcomes. *What happens:* replay the 1-year goals, mark what changed in life, rewrite or dissolve goals, set three monthly goals. *Outputs:* refreshed month layer. *Memory:* hierarchy edits with reasons. *Voice-first:* guided conversation. *Screen:* hierarchy browser one level above the week.

The Week Weave (three slots, threads to the scene sentence) and the course line (direction of travel, correction markers, no counters) are present in every step; they are how you see your heading. The conversation that corrects it is why you come back.

## 4. Functional spec

| Feature | v1 | Serves |
| --- | --- | --- |
| Voice interview, two scenes, resumable, typed fallback | Must | Interview |
| Level-by-level distillation with source quotes and parent picker | Must | Interview |
| Want/should and body-check gates (5-year, 1-year) | Must | Interview |
| Three own-voice scene recordings, durable cloud backup | Must | Interview, Morning Course |
| Guide memory: hierarchy, sessions, outcomes, reframes, context facts | Must | All |
| Morning Course script with next action, correction and optional reframe | Must | Morning Course |
| Catch and Reframe (standalone and inside Morning Course / Talk) | Must | Morning Course, Talk |
| Talk It Through: open voice conversation answering the four questions | Must | Talk |
| Week Weave with threads, tap-to-hear, long-press edit | Must | All |
| Course line and correction markers | Must | Morning Course, Review |
| Weekly Review with if-then plans and two-week flag | Must | Review |
| Local notifications, deep links into Morning Course / Review | Must | Morning Course, Review |
| "What I know about you" editable memory panel | Nice | All |
| Monthly Recalibration flow (needed by first month boundary, ~Dec 18) | Nice | Recalibration |
| Per-goal own-voice recordings beyond the three scenes | Nice | Morning Course |
| Full-duplex realtime voice (v1 is streamed three-service with auto end-of-speech) | Nice | Talk |
| Audio and transcript export | Nice | All |
| Lock-screen widget: today's thing, its ancestor, "I'm in my head" | Later | Morning Course, Talk |
| Consented voice cloning; Constellation home | Later | Morning Course; seeing |
| Everything in §7 | Later | — |

## 5. Data model sketch

- **user** — name, review_day, morning_time.
- **scene** — kind (near_term | end_of_life), transcript, audio; **scene_passage** — scene, life_area, text, order.
- **goal** — level (life … weekly), parent_goal (NOT NULL unless life), scene_passage (NOT NULL when life), text (verbatim), source_quote, want_or_should, energizes, status (active | dissolved), confirmed_at.
- **weekly_priority** — goal (monthly), week_start, text, if_then, status (open | done | moved | dropped), closing_sentence.
- **next_action** — weekly_priority, text, due_at, session, status.
- **session** — kind (interview | morning | talk | review | recalibration), transcript, summary, extracts.
- **reframe** — session, goal, thought, distortion, reframe_text, accepted, thought_family.
- **recording** — target (scene_passage | goal), audio, duration, transcript.
- **memory_fact** — key, value, source session, user_edited.

**Invariant:** nothing is saved without a parent up to an ideal-scene sentence. Every goal's ancestry terminates in a `scene_passage`; a weekly priority points at a monthly goal, a next action at a weekly priority, a reframe at a goal. Enforced three times: NOT NULL parent plus a level ↔ parent-level check constraint; a trigger rejecting any row whose ancestry does not resolve; and the UI, where the parent picker is step one of creating anything. Dissolving a goal re-parents or dissolves its children explicitly.

## 6. Positioning and the three lines we say out loud

The position is achieving yourself and staying on course: becoming the person in your ideal scene, with the app as the thing that keeps you on course toward it day to day. Correction, not recall; execution, not manifestation. We set aside research's "future self, in your voice" demo hook (MR §5 option 2): own-voice recordings stay as a feature, but the manifestation-audio shelf (Stella, Aya, Manifest) is crowded and sells a feeling without a plan, and pure positive fantasy lowers effort (Kappes & Oettingen; MR §1, §3.1).

Three candidate lead lines, with the research behind each:

1. **"Stay on course to the life you chose."** Recommended headline. *The life you chose* is the ideal scene and the ownership of having distilled it yourself; *stay on course* is the daily job. Hierarchy apps without a daily ritual died (Dreamfora, Lifetick), and even in trackers the praised feature is "ahead or behind pace", not the log (MR §3.10, §4).
2. **"Become who you set out to be."** The identity line, used as the sentence under the headline. Identity framing lands (MyFutureSelf's "crazy powerful", Finch's "changed my life"; MR §3.5, §3.11) but alone says nothing about mechanism and drifts toward the self-help shelf.
3. **"It knows your whole plan and tells you what to do now."** The functional line for the store subtitle and the evidence-minded buyer who pays for mechanism over mood (Waking Up, MR §5). In AI products "it remembers" is the top praise and "generic" the kill word (MR §1, §3.6); here memory is pointed at the next action, which no journal does.

The three lines we say out loud: line 1, line 2, and **"Course, not streaks."** Streak guilt is complained about in every app sampled, including Streaks and Finch, and no app offers a direction-of-travel model; "a real, unoccupied position" (MR §1, §4).

Known risk: planning is a harder ten-second demo than audio (MR §5). Our demo is a Talk It Through exchange: "forty minutes, what do I do?" answered with one step threaded to the user's own goal.

## 7. Not in v1

Payments or paywall; voice cloning; widgets; Constellation home; full-duplex realtime voice (streamed three-service pipeline instead); Evening Close, emotion check-in, familiar-self map; the Dispenza-style program; coach or partner sharing; social features; calendar or task integrations; web or tablet; export beyond delete-my-data; languages other than English; any medical claim.
