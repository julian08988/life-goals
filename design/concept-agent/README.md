# Concept: goal agent

A second, deliberately different concept to compare with the Horizon flow in `../prototype/`. The user states **one goal with a date**; the app builds a dedicated agent for it, proposes a plan, and from then on runs as a relentless operator for that goal: daily demands, check-ins it initiates, evidence or no tick, honest status, drift → choice, replan when a gate fires, a clear finish line. Several goals mean several agents.

Same design language as Horizon (ice blue on near-black, halo = voice, one idea per screen). The visual signature is the **distance line**: start → finish, a hollow dot where the plan says you should be, a lit dot where you are; the dashed gap between them is the honest status.

## Build phase: two sources that converge

The agent is built from **you** and **the record**.

- **You** – three spoken answers: time and money, audience and network, abilities and the pattern of your last attempts. Each answer is reduced to kept facts shown under the question.
- **The record** – a dossier researched for this exact goal *while* you are interviewed (a live ticker at the bottom of every interview screen): ten real cases with numbers, the common path and timeline, the failure modes ranked by frequency, what experts add, sources. By the third answer the agent is already answering with the record ("the record has a name for that").
- **Confront** – your answer and the record side by side; the gap produces the next question, as a forced choice with the record's odds attached.
- **The plan** – every step carries its origin: *The record* (which case or failure mode), *You* (the fact about you that selected it), *Not that* (the alternative, struck through, and why not), *Gate* (decision point with criteria, or a kill rule, with a date).

Persona: Lena Varga, 33, backend engineer at a Vienna insurer, full-time job, no audience, no influencer network (invented). Goal: "Build an app that makes $10k a month." Agent: "Ten-k". Second agent: "Sub-fifty" (10 km under 50:00). Dossier figures are rounded from founders' public posts and revenue pages and labelled as such in the prototype; the live agent re-sources them.

## Run

```sh
cd design && python3 -m http.server 4174
# open http://127.0.0.1:4174/concept-agent/
```

Left rail lists the screens; `?bare=1` hides it. `#/route?done=1` renders the end state of screens that type in a spoken answer; `?live=1` renders mid-answer (research still running).

## Render

```sh
node scripts/render.mjs      # out/01-…34-….png and out/00-flow-overview.png
```

## Routes

| Route | Screen |
| --- | --- |
| `/state`, `/goal` | State the goal, the finish line as stated |
| `/build` | Two sources |
| `/build/{time,reach,ship}` | You: time and money, audience and network, abilities and pattern (research ticker below) |
| `/record`, `/record/{path,fails,experts}` | The record: cases, path and numbers, failure modes, experts and sources |
| `/confront/{deadline,pattern}` | Your answer against the record, the next question from the gap |
| `/plan`, `/plan/step/1–6`, `/plan/gates` | The plan with origins, why this not that per step, decision points and kill criteria |
| `/commit` | Commitment (character, cadence, evidence, stake) |
| `/home`, `/home/on` | Agent home (behind / on plan) |
| `/checkin/lock`, `/checkin` | Agent-initiated check-in |
| `/evidence`, `/evidence/ok` | Evidence capture (screenshot, numbers, voice), accepted |
| `/drift`, `/recommit`, `/replan` | Drift, recommit, replan when a gate fires |
| `/review` | Weekly accountability review |
| `/agents`, `/agent/second` | Agent switcher, second agent |
| `/finish` | Finish line |
| `/settings` | Settings: intensity, cadence, proof and stakes |
