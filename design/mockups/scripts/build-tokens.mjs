// Generates tokens.css from tokens.json so the mockups and the Expo theme share one source.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const t = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'));

const kebab = (s) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const lines = [':root {'];

for (const [k, v] of Object.entries(t.color)) lines.push(`  --color-${kebab(k)}: ${v};`);
lines.push(`  --font: '${t.type.family}', ${t.type.familyFallback};`);
for (const [k, v] of Object.entries(t.type.scale)) {
  lines.push(`  --type-${k}-size: ${v.size}px;`);
  lines.push(`  --type-${k}-lh: ${v.lineHeight}px;`);
  lines.push(`  --type-${k}-weight: ${v.weight};`);
  lines.push(`  --type-${k}-ls: ${v.letterSpacing}px;`);
}
for (const [k, v] of Object.entries(t.spacing)) lines.push(`  --space-${kebab(k)}: ${v}px;`);
for (const [k, v] of Object.entries(t.radius)) lines.push(`  --radius-${k}: ${v}px;`);
for (const [k, v] of Object.entries(t.elevation)) lines.push(`  --shadow-${kebab(k)}: ${v};`);
for (const [k, v] of Object.entries(t.motion)) {
  if (typeof v !== 'object') continue;
  lines.push(`  --motion-${kebab(k)}-ms: ${v.duration}ms;`);
  lines.push(`  --motion-${kebab(k)}-ease: ${v.easing};`);
}
lines.push('}');

writeFileSync(join(root, 'tokens.css'), `/* Generated from tokens.json by scripts/build-tokens.mjs. Do not edit. */\n${lines.join('\n')}\n`);
console.log('tokens.css written');
