# Concept: goal agent

A second, deliberately different concept to compare with the Horizon flow in `../prototype/`. The user states **one goal with a date**; the app builds a dedicated agent for it (why, deadline and constraints, obstacles, the person's own failure pattern), proposes a plan, and from then on runs as a relentless operator for that goal: daily demands, check-ins it initiates, evidence or no tick, honest status, drift → choice, replan when reality changes, a clear finish line. Several goals mean several agents, each with its own character and cadence.

Same design language as Horizon (ice blue on near-black, halo = voice, one idea per screen). The visual signature is the **distance line**: start → finish, a hollow dot where the plan says you should be, a lit dot where you are; the dashed gap between them is the honest status.

Persona: Tomás Ferreira, chemistry teacher in Lisbon (invented). Goal: half marathon under 2:00 on 15 March. Agent: "Sub-two". Second agent: "Card clear" (pay off a €6,400 card by 30 June).

## Run

```sh
cd design && python3 -m http.server 4174
# open http://127.0.0.1:4174/concept-agent/
```

Left rail lists the screens; `?bare=1` hides it. `#/route?done=1` renders the end state of screens that type in a spoken answer.

## Render

```sh
node scripts/render.mjs      # out/01-…22-….png and out/00-flow-overview.png
```

## Routes

| Route | Screen |
| --- | --- |
| `/state`, `/goal` | State the goal, the finish line |
| `/build/{why,constraints,obstacles,patterns}` | Building the agent |
| `/plan`, `/commit` | Proposed plan, commitment (character, cadence, evidence, stake) |
| `/home`, `/home/on` | Agent home (behind / on plan) |
| `/checkin/lock`, `/checkin` | Agent-initiated check-in |
| `/evidence`, `/evidence/ok` | Evidence capture (photo, numbers, voice), accepted |
| `/drift`, `/recommit`, `/replan` | Drift, recommit, replan |
| `/review` | Weekly accountability review |
| `/agents`, `/agent/card` | Agent switcher, second agent |
| `/finish` | Finish line |
| `/settings` | Settings: intensity, cadence, proof and stakes |
