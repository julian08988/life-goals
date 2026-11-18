# Life Goals — v1 mockups

High-fidelity static mockups of the five moments, rendered at iPhone 15 Pro dimensions (393 × 852 logical, PNG at 2x). Plain HTML/CSS; no framework.

- `tokens.json` — the design tokens (color, type, spacing, radii, elevation, motion, haptics, component specs). This is the file the Expo build adopts; `src/ui/theme.ts` should mirror it.
- `tokens.css` — generated from `tokens.json` by `scripts/build-tokens.mjs`. Do not edit by hand.
- `shared.css` — device frame and the components: halo (voice element), thread, level rail, Why-this-step note, buttons, chips, switch, tab bar, course line.
- `screens/*.html` — one file per screen, each a complete 393 × 852 device.
- `index.html` — the overview board with all screens side by side.
- `out/*.png` — rendered output; `00-overview.png` is the board.

Sample content is the invented "Sam" hierarchy from the app's demo seed (a product designer: studio, training, sailing). Nothing here comes from a real person.

## Render

```bash
cd design/mockups
npm install
npm run render     # builds tokens.css, renders screens/ and the overview to out/
npm run serve      # serves the board at http://127.0.0.1:<port> for a browser
```

Rendering uses the locally installed Chrome through `playwright-core` (set `CHROME_PATH` if it is somewhere unusual). Inter is loaded from Google Fonts with a local fallback.
