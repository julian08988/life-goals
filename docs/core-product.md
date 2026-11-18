# Life Goals — Core Product Spec

Status: spec v0.3, 18 Nov 2026. Builds on [`product-concept.md`](product-concept.md) (method §4, loops §6) and [`market-research.md`](market-research.md) (cited as MR §n). [`build-plan.md`](build-plan.md) is aligned to this document. User zero is Julian; everything here is written to be useful to one person first and generalized second.

## 1. What it is

Life Goals is a goal-setting method with a voice guide that applies it every day. The method is built from behavior-change techniques with published evidence (§7). Once, in a ~45-minute spoken interview, the guide takes you through it: describe what you want in concrete terms (an ideal scene at 6–9 months and at end of life), distill that into 10–12 life goals and the 5-year, 1-year, 6-month, monthly and weekly layers beneath them, and record three key scenes in your own voice. From then on the guide holds the whole hierarchy in memory and, out loud, answers the four questions that decide whether you execute: *why am I doing this*, *how should I prioritize my actions*, *how do I stay on course*, *what should I truly work on now*. Every answer quotes your own words, names where you have drifted, and ends in a next action. Every step shows why it works and how strong the evidence is. The hierarchy is the content, voice is the medium, the Week Weave shows where you stand; the product is the daily correction. No streaks, no scores, no mysticism.

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

All of it is visible and editable in a "What I know about you" panel. Per turn the guide gets a context pack: the full hierarchy (it is small), the active week, the last three sessions' extracts, reframes linked to any goal in play, and retrieved turns matching the question. It never states a fact it cannot cite to one of these rows (MR §3.1: Stella's uneditable hallucinations are its top content complaint). Memory exists to correct course; every lookup serves a decision about what to do next.

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
> **Guide:** Then this is a timing problem, not a talent problem. Two options: move the outline's monthly goal to January and say so out loud, or keep it with one twenty-minute slot during Saturday's nap.
> **User:** January. I'd rather own that than keep failing it. Saturday's nap goes to the pricing page.

**"What should I truly work on now?"** Inputs: today's named thing from Morning Course, this week's priorities, the time and state the user reports, yesterday's outcome. A good answer picks one thing, says which goal it serves, scales it to the time and energy available, and gets the user started before the call ends.

> **User:** She's down. I've got forty minutes. What do I actually do?
> **Guide:** Today's named thing is the pricing draft, for "v2 in paying customers' hands". Your first two minutes were "open the doc, write the three tiers as plain sentences." Does forty minutes of that fit, or are you too fried?
> **User:** Fried. But I could do the tiers.
> **Guide:** Then just the tiers. If she wakes early, the tiers alone count as on course. Say the first one out loud now; stating a step aloud makes it easier to recall and start, strong evidence. Then go write it. I'll ask how it went tomorrow morning.

### Rules the guide must obey

1. **Thread to the user's words.** Every goal, priority or scene it cites is quoted or played verbatim; model paraphrase is a suggestion the user's edit overwrites.
2. **End in a next action.** No session closes without one saved, concrete, time-bounded action attached to a priority.
3. **No pure positive fantasy.** A scene is never played without an obstacle and a step after it (Kappes & Oettingen; concept §5).
4. **Challenge drift.** When outcomes and words diverge, say so once, plainly, with the data; ask whether it is a choice or a drift; push for the step. No flattery (MR §3.6).
5. **No shame.** Never "you missed", never counts framed as failure, never red. Distanced self-talk by name; a correction is a normal move, and re-plans are legitimate outcomes.
6. **Bounded.** Talk It Through aims to close in five minutes, offers to continue, never assigns homework (MR §3.7).
7. **Never invent.** If memory lacks it, ask.
8. **Not therapy.** No diagnosis or medical claims; on crisis language it hands off and stops coaching.
9. **Cite the method.** When it asks the user to do something, it names the reason and the confidence in one clause (§8): "Say it out loud. Hearing yourself state the goal strengthens recall; strong evidence."

### Product voice

Plain and confident. Short declarative sentences. Say what to do, then why, then how strong the evidence is. No metaphors of journeys, stars or futures; no mysticism; no promises of outcomes. "Proven" is used only for techniques with strong evidence; "moderate" and "emerging" are said as written. Numbers appear when we have them. The guide sounds like a competent coach reading from the research, not a narrator.

## 3. Core loop

**(1) Interview** — once; ~45 min, resumable at any question. *Trigger:* first open. *Inputs:* spoken answers; eight fixed life areas. *What happens:* near-term scene (6–9 months, past tense, one question per area, at most one follow-up), then end-of-life scene; the guide proposes 10–12 life goals each tagged to its source passage; the user edits and confirms level by level down to three weekly priorities, with want/should and body checks on 5-year and 1-year goals; records three key scenes aloud; picks review day and morning time. *Outputs:* confirmed hierarchy, two scenes, three recordings. *Memory:* hierarchy, scenes, recordings, context facts, transcript. *Voice-first:* the guide speaks every question; typing is a fallback. *Screen:* live transcript, waveform, area indicator; distillation cards with source quotes; the thread growing as levels confirm. Research tension: long intimate onboarding is the category's top abandonment lever (MR §1, §4); so every answer visibly shapes the next screen, nothing is paywalled, and the first scene playback happens inside the interview.

**(2) Morning Course** — daily, 3 min: set today's priority and correct yesterday's drift. *Trigger:* notification at the chosen time. *Inputs:* one life goal and one 5-year goal (rotating), today's priority, yesterday's outcome, the reframe log. *What happens:* settling breath; one life goal and one 5-year goal, in your words; name the one thing today and its first two minutes; optional "has your inner critic said anything?" with label, distanced question and believable reframe (skippable, never forced; MR §4 on Stoic's forced negative prompt); if yesterday slipped, one neutral correction: the smallest step back on course. *Outputs:* today's named thing and next action. *Memory:* session, next action, reframe, course marker. *Voice-first:* hands-free end to end. *Screen:* Scene Player: near-empty, slow ambient motion, waveform, the sentence being spoken.

**(3) Talk It Through** — anytime. *Trigger:* the user opens and talks (stuck, doubting, scattered); also the "I'm in my head" entry. *Inputs:* the full context pack plus whatever the user says. *What happens:* the guide maps the ask to one of the four questions (or a reframe) and answers as in §2, naming drift and pushing to a step. *Outputs:* a decision and a next action; sometimes a moved priority or a reframe. *Memory:* transcript, extracts, hierarchy edits. *Voice-first:* streamed speech both ways with automatic end-of-speech; text available. *Screen:* the orb (listening / thinking / speaking), the sentence being spoken, the thread of the goal in play lit beneath.

**(4) Weekly Review** — chosen day (default Sunday), 15 min. *Trigger:* notification. *Inputs:* last week's priorities, their reframes, the monthly goals, neglect flags. *What happens:* close each priority as done / moved / dropped with one sentence, no guilt; hear the monthly goals; pick three priorities each threaded to a monthly goal with an if-then plan; a monthly goal untouched for two weeks is flagged once (re-plan or dissolve); close by hearing the three priorities and what they serve as one sentence. *Outputs:* next week's Week Weave. *Memory:* outcomes, new priorities, session. *Voice-first:* spoken throughout, tap to confirm. *Screen:* Week Weave, last week fading, next week's threads drawing.

**(5) Monthly Recalibration** — first review after a month boundary, +10 min. *Inputs:* 1-year and 6-month goals, the month's outcomes. *What happens:* replay the 1-year goals, mark what changed in life, rewrite or dissolve goals, set three monthly goals. *Outputs:* refreshed month layer. *Memory:* hierarchy edits with reasons. *Voice-first:* guided conversation. *Screen:* hierarchy browser one level above the week.

The Week Weave (three slots, threads to the scene sentence) and the course line (direction of travel, correction markers, no counters) are present in every step; they show where you stand. Each step carries a "Why this step" note (§8). The conversation that corrects course is why you come back.

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
| "Why this step" micro-notes with confidence tag and expandable source (§8) | Must | All |
| Guide cites method and confidence when asking for an action (§2 rule 9) | Must | All |
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

The position is matter-of-fact: this is the right way to set goals and reach them, applied daily, with the reasons shown. The product gives the user confidence because every step names the technique it uses, why it works, and how strong the evidence is. We do not lead with feeling (research's "future self, in your voice" hook, MR §5 option 2); that shelf is crowded (Stella, Aya, Manifest), sells a mood without a plan, and pure positive fantasy lowers effort (Kappes & Oettingen; MR §1, §3.1). Own-voice recordings stay as a feature because the evidence for them is real (§7); they are not the pitch.

Three candidate lead lines:

1. **"Set goals the proven way. Stay on course every day."** Recommended. Two declaratives covering both halves of the product: the method (interview and hierarchy) and the daily application (Morning Course, Talk It Through, Weekly Review). "Proven way" is defensible because each step cites a technique with published evidence (§7), and it says execution, which is where the market is empty: hierarchy apps without a daily ritual died (Dreamfora, Lifetick) and the praised feature in trackers is "ahead or behind pace", not the log (MR §3.10, §4).
2. **"A proven method to set goals and reach them."** Simplest and most searchable. Risk: "reach them" reads as an outcome promise, which we cannot make and store review may question. Use as a subtitle variant in a market where the first line has been understood.
3. **"Goal-setting that works, with the reasons shown."** The differentiator line for the evidence-minded buyer who pays for mechanism over mood (Waking Up at $150/yr, Balance's "education of the effects"; MR §5). Weaker as a headline because "works" is vague; strong as the second sentence on the store page.

The three lines we say out loud:

1. **"Set goals the proven way. Stay on course every day."** The headline, for the reasons above.
2. **"Every step shows why it works and how strong the evidence is."** No app in the set does this; the nearest (Balance, Waking Up) explain meditation, not goal execution (MR §5), and "generic" is the kill word for AI products (MR §1, §3.6).
3. **"No streaks. A missed day gets a correction, not a penalty."** Streak guilt is complained about in every app sampled, including Streaks and Finch, and no app offers a direction-of-travel model (MR §1, §4).

Known risk: planning is a harder ten-second demo than audio (MR §5). Our demo is a Talk It Through exchange: "forty minutes, what do I do?" answered with one step, its goal, and the reason.

## 7. Methods and evidence

The techniques the app uses, in the order a user meets them. Confidence is our reading of the literature: **strong** = meta-analytic support or many replications; **moderate** = replicated but smaller, narrower or with mixed replications; **emerging** = plausible mechanism, thin or mixed human evidence. We do not claim the combination has been tested; it has not.

| Method | What the user does | Why it works | Confidence | Source |
| --- | --- | --- | --- | --- |
| Speaking goals aloud (production effect, self-explanation) | Answers the interview and confirms each goal by saying it | Words spoken aloud are remembered better than words read silently; explaining a goal in your own words exposes vague ones | Strong for memory; moderate for goal pursuit | MacLeod et al. 2010; Chi et al. 1989; Bisra et al. 2018 meta-analysis |
| Writing goals down and reporting progress | Hierarchy is saved in the user's words; weekly outcomes recorded | Written, specific goals with progress reports outperformed unwritten goals in a 4-week study; the effect is commitment and accountability more than the ink | Moderate. Matthews 2015: n=267, self-report, four weeks, not a large replicated trial. The "Harvard 3% study" is a myth | Matthews 2015 (Dominican University); Locke & Latham 2002 for goal specificity (strong) |
| Proximal subgoals (goal hierarchy) | Every goal has a parent; weekly priorities thread to monthly goals | Near-term subgoals tied to a distal goal raise persistence and self-efficacy more than distal goals alone | Strong | Bandura & Schunk 1981; Locke & Latham 2002 |
| Self-concordant goals (want vs should) | Answers "desire or should?" and "does saying it energize or drain you?" | Goals pursued for autonomous reasons get sustained effort and better attainment than goals pursued from pressure | Moderate | Sheldon & Elliot 1999; Koestner et al. 2002 |
| Implementation intentions | States an if-then plan for each weekly priority and each next action | Pre-deciding when, where and how an action happens makes the cue trigger it; d ≈ 0.65 across 94 studies | Strong | Gollwitzer 1999; Gollwitzer & Sheeran 2006 |
| Mental contrasting with implementation intentions (WOOP) | Names the wish, imagines the outcome, names the obstacle, plans the step | Contrasting the wish with the obstacle converts fantasy into effort; positive fantasy alone lowers energy | Strong for MCII (g ≈ 0.34); strong for the fantasy warning | Oettingen 2012; Kappes & Oettingen 2011; Wang et al. 2021 meta-analysis |
| Process vs outcome simulation | Walks through the first two minutes of today's step rather than the finished result | Rehearsing the process raised studying and grades; rehearsing the outcome did not | Moderate | Pham & Taylor 1999; Taylor et al. 1998 |
| Retrieval practice and spacing | Hears one life goal and one 5-year goal each morning on a rotating schedule and says the thread back | Recalling an item strengthens it more than re-reading it; spacing the recalls beats massing them | Strong for memory; moderate for keeping goals salient | Roediger & Karpicke 2006; Cepeda et al. 2006; Dunlosky et al. 2013 |
| Distanced self-talk | Reframes a negative thought in the third person or by name | Addressing yourself by name regulates emotion without extra cognitive effort | Moderate | Kross et al. 2014; Moser et al. 2017; Orvell et al. 2021 |
| Cognitive restructuring (labeling distortions) | Hears the distortion named and offers a believable alternative | Core CBT technique; identifying the distortion weakens its automaticity | Strong | Beck 1979; Hofmann et al. 2012 meta-analysis |
| Self-compassion after setbacks | Closes a missed priority with one neutral sentence and a correction | Self-compassion after failure increases motivation to improve and persistence; self-criticism reduces both | Moderate | Breines & Chen 2012; Neff 2003; Ferrari et al. 2019 meta-analysis |
| Self-affirmation (values) | End-of-life scene and the monthly "why this goal matters to who I am" | Writing about core values buffers identity threat and improves follow-through in some settings; large-scale replications are mixed | Moderate | Cohen & Sherman 2014; Hanselman et al. 2017 (mixed) |
| Own-voice playback | Records three scenes and hears them in Morning Course | Hearing your own voice state a goal is rated more believable than a stranger's; a self-reference effect is plausible | Emerging. Review evidence (ThinkUp, Stella; MR §3.1, §3.8) and self-reference memory effects, no direct trial | Symons & Johnson 1997 (self-reference); MR §3.8 |
| Mental rehearsal and "cells that fire together wire together" | Rehearses the step as the person who already does it | Mental practice improves later performance, mostly on cognitive tasks, and is weaker than physical practice; the Hebbian line is a popular framing of synaptic plasticity, not a goal-pursuit finding. Dispenza's broader claims (elevated emotion changing biology) are not established | Emerging / mixed. Moderate for mental practice itself | Hebb 1949; Pascual-Leone et al. 1995; Driskell et al. 1994 meta-analysis; concept §5 |

## 8. "Why this step" guidance in the app

Every interview step and every daily or weekly moment carries a one-sentence note with a confidence tag, expandable to the source row in §7. The guide also says the reason aloud when it asks for an action (§2 rule 9). Content is a versioned file in the repo (`content/method-notes.json`), keyed by step; the build agent implements the table below verbatim.

| Moment / step | Method | One-line note | Confidence | Source |
| --- | --- | --- | --- | --- |
| Interview: opening | Speaking aloud | Answer out loud. Spoken answers are remembered better and expose vague goals. | Strong | MacLeod 2010; Chi 1989 |
| Interview: near-term scene | Process simulation; mental contrasting setup | Describe a concrete day, not a result. Concrete scenes become plans; vague wishes do not. | Moderate | Pham & Taylor 1999; Oettingen 2012 |
| Interview: end-of-life scene | Self-affirmation (values) | This names what matters to you. Stating core values helps you hold to them under pressure. | Moderate | Cohen & Sherman 2014 |
| Interview: life-goal distillation | Writing goals down | Each goal is saved in your words and tied to your own sentence. Written, specific goals are acted on more. | Moderate | Matthews 2015; Locke & Latham 2002 |
| Interview: parent picker | Proximal subgoals | Every goal needs a parent. Near goals tied to far goals keep you going longer. | Strong | Bandura & Schunk 1981 |
| Interview: want vs should, body check | Self-concordant goals | Goals you want outlast goals you should. Say it; if it drains you, rewrite it. | Moderate | Sheldon & Elliot 1999 |
| Interview: weekly priorities | Implementation intentions | Add when and where. If-then plans roughly double follow-through. | Strong | Gollwitzer & Sheeran 2006 |
| Interview: record three scenes | Own-voice playback | Record it yourself. People rate goals in their own voice as more believable. | Emerging | MR §3.8; Symons & Johnson 1997 |
| Morning Course: hear two goals | Retrieval practice and spacing | Say the thread back. Recalling a goal keeps it active; re-reading does not. | Strong | Roediger & Karpicke 2006 |
| Morning Course: first two minutes | Process simulation | Picture the first two minutes, not the finish. Process rehearsal raises follow-through. | Moderate | Pham & Taylor 1999 |
| Morning Course: obstacle and if-then | WOOP | Name the obstacle, then the plan. Wish plus obstacle plus plan beats wishing alone. | Strong | Oettingen 2012; Wang 2021 |
| Morning Course: reframe | Distanced self-talk; cognitive restructuring | Use your name. Talking to yourself by name lowers the heat without extra effort. | Moderate | Kross 2014 |
| Morning Course: correction after a miss | Self-compassion | A miss gets a step, not a verdict. Self-compassion after failure raises persistence. | Moderate | Breines & Chen 2012 |
| Talk It Through: opening | Self-explanation | Say the problem out loud. Explaining it exposes the real question. | Moderate | Chi 1989 |
| Talk It Through: closing | Implementation intentions | Every talk ends in one step with a time. Decided steps get done. | Strong | Gollwitzer 1999 |
| Weekly Review: close last week | Self-compassion | One sentence per priority, no guilt. Neutral review keeps you in the game. | Moderate | Breines & Chen 2012 |
| Weekly Review: pick three | Proximal subgoals | Three priorities, each tied to a monthly goal. Subgoals with a parent get done. | Strong | Bandura & Schunk 1981 |
| Weekly Review: if-then plans | Implementation intentions | Say when and where. If-then plans roughly double follow-through. | Strong | Gollwitzer & Sheeran 2006 |
| Monthly Recalibration | Goal adjustment | Rewrite or drop stale goals. Letting go of unreachable goals and re-engaging protects effort and wellbeing. | Moderate | Wrosch et al. 2003 |
| Scene playback (anywhere) | Mental rehearsal; fantasy warning | Rehearse, then plan. Picturing the result alone lowers effort; always end with the obstacle and the step. | Strong for the warning; emerging for rehearsal | Kappes & Oettingen 2011; Driskell 1994 |

## 9. Not in v1

Payments or paywall; voice cloning; widgets; Constellation home; full-duplex realtime voice (streamed three-service pipeline instead); Evening Close, emotion check-in, familiar-self map; the Dispenza-style program; coach or partner sharing; social features; calendar or task integrations; web or tablet; export beyond delete-my-data; languages other than English; any medical claim.
