// Renders every screen of the goal-agent concept and the flow overview to PNG at 2x.
// Serves design/ (so the prototype can load ../mockups/shared.css) and drives local Chrome via playwright-core.
// Usage: node scripts/render.mjs            render to out/
//        node scripts/render.mjs --serve    keep the static server up (prints the URL)
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const proto = join(here, '..');
const root = join(proto, '..'); // design/
const out = join(proto, 'out');
if (!existsSync(out)) mkdirSync(out);

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  res.end(readFileSync(file));
});
const port = Number(process.env.PORT || 0);
await new Promise((r) => server.listen(port, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

// Screens in journey order. `done=1` renders the end state of screens that animate.
const SCREENS = [
  ['01-state-the-goal', '/state?done=1'],
  ['02-finish-line-as-stated', '/goal'],
  ['03-two-sources', '/build'],
  ['04-you-time-money-research-in-progress', '/build/time?live=1'],
  ['05-you-time-money', '/build/time?done=1'],
  ['06-you-audience-network', '/build/reach?done=1'],
  ['07-you-abilities-pattern', '/build/ship?done=1'],
  ['08-record-cases', '/record'],
  ['09-record-path-numbers', '/record/path'],
  ['10-record-failure-modes', '/record/fails'],
  ['11-record-experts-sources', '/record/experts'],
  ['12-confront-your-date', '/confront/deadline'],
  ['13-confront-your-pattern', '/confront/pattern'],
  ['14-plan-with-origins', '/plan'],
  ['15-plan-step-1-market', '/plan/step/1'],
  ['16-plan-step-2-presell-gate', '/plan/step/2'],
  ['17-plan-step-4-listing', '/plan/step/4'],
  ['18-plan-step-6-paid', '/plan/step/6'],
  ['19-plan-gates-kill-criteria', '/plan/gates'],
  ['20-commit', '/commit'],
  ['21-agent-home', '/home'],
  ['22-checkin-lock-screen', '/checkin/lock'],
  ['23-checkin', '/checkin'],
  ['24-evidence', '/evidence'],
  ['25-evidence-captured', '/evidence?done=1'],
  ['26-evidence-accepted', '/evidence/ok'],
  ['27-drift', '/drift'],
  ['28-recommit', '/recommit'],
  ['29-replan-gate-fired', '/replan'],
  ['30-weekly-review', '/review'],
  ['31-agents', '/agents'],
  ['32-second-agent', '/agent/second'],
  ['33-finish-line', '/finish'],
  ['34-settings-intensity', '/settings'],
];


if (process.argv.includes('--serve')) {
  console.log(`Serving ${base}/concept-agent/`);
} else {
  // playwright-core is installed once, in ../mockups.
  const { createRequire } = await import('node:module');
  const { chromium } = createRequire(join(root, 'mockups', 'package.json'))('playwright-core');
  const executablePath = process.env.CHROME_PATH ?? ['/usr/local/bin/google-chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, colorScheme: 'dark', reducedMotion: 'reduce' });
  const settle = async (page) => { await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(300); };

  for (const [name, hash] of SCREENS) {
    const page = await ctx.newPage();
    await page.goto(`${base}/concept-agent/?bare=1#${hash}`, { waitUntil: 'networkidle' });
    await settle(page);
    const file = join(out, `${name}.png`);
    await page.locator('.device').screenshot({ path: file, animations: 'disabled' });
    console.log('rendered', file);
    await page.close();
  }

  const flow = await ctx.newPage();
  await flow.setViewportSize({ width: 2700, height: 2900 });
  await flow.goto(`${base}/concept-agent/flow.html`, { waitUntil: 'networkidle' });
  await settle(flow);
  await flow.waitForFunction(() => [...document.querySelectorAll('iframe')].every((i) => i.contentDocument?.readyState === 'complete' && i.contentDocument.querySelector('#screen > *')));
  await flow.waitForTimeout(800);
  await flow.locator('#flow').screenshot({ path: join(out, '00-flow-overview.png'), animations: 'disabled' });
  console.log('rendered', join(out, '00-flow-overview.png'));

  await browser.close();
  server.close();
}
