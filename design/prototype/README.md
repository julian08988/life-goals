# UI flow prototype v1 — Horizon

Clickable, phone-width HTML prototype of the whole Life Goals journey. No build step, no dependencies beyond the shared design system in `../mockups/` (tokens, `shared.css`).

Direction: **Horizon**. Time runs left to right on a strip (Today · Week · Month · 1 yr · 5 yr · 10 yr · Life); each life goal is a lane. One horizon or one goal is in focus at a time; everything else is one tap away. Home opens at *Life*.

## Run

```sh
cd design && python3 -m http.server 4173
# open http://127.0.0.1:4173/prototype/
```

Or `node scripts/render.mjs --serve` (prints the URL). The page must be served from `design/` so `../mockups/shared.css` resolves.

- Left rail lists every screen in journey order; the phone is live and clickable.
- `?bare=1` hides the rail (used for renders). `#/route?done=1` renders the end state of screens that type in a spoken answer; `?live=1` the mid-answer state; `?edit=1` the editing state on a distilling screen.

## Render

```sh
node scripts/render.mjs
```

Writes `out/01-….png` … `out/35-….png` (device at 2x) and `out/00-flow-overview.png` (from `flow.html`). Uses `playwright-core` from `../mockups/node_modules` and local Chrome (`CHROME_PATH` to override).

## Routes

| Route | Screen |
| --- | --- |
| `/welcome` | Welcome |
| `/interview/start` | Interview start |
| `/interview/scene/1..3` | Scenes (Work, Relationships, Body); life goal lands as a lane |
| `/interview/life-goals` | Three lanes, three sentences |
| `/interview/level/{ten_year,five_year,one_year,month,week}` | Distilling, far to near |
| `/interview/set` | Map set |
| `/map`, `/map/<horizon>` | Map home (Life) and horizon in focus |
| `/goal/<L1-L3>/<horizon>` | Goal in focus |
| `/document` | The record |
| `/morning/1..4` | Morning course |
| `/week` | Week |
| `/talk`, `/talk/{now,why,first,course}` | Talk it through |
| `/reviews`, `/review/1..3`, `/quarter` | Review cadences, weekly review, quarterly review |
| `/settings` | Settings |
| `/empty/map`, `/empty/week` | First run |
| `/nudge/lock`, `/nudge/inapp` | Nudges |

Persona and hierarchy live in `data.js` (Noor Haddad, invented).
