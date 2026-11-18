// Renders every screen of the prototype and the flow overview to PNG at 2x.
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
  ['01-welcome', '/welcome'],
  ['02-interview-start', '/interview/start'],
  ['03-interview-listening', '/interview/scene/1?live=1'],
  ['04-interview-scene-work', '/interview/scene/1?done=1'],
  ['05-interview-scene-relationships', '/interview/scene/2?done=1'],
  ['06-interview-scene-body', '/interview/scene/3?done=1'],
  ['07-interview-life-goals-lanes', '/interview/life-goals'],
  ['08-interview-10-year', '/interview/level/ten_year'],
  ['09-interview-5-year', '/interview/level/five_year'],
  ['10-interview-1-year', '/interview/level/one_year'],
  ['11-interview-month', '/interview/level/month'],
  ['12-interview-month-editing', '/interview/level/month?edit=1'],
  ['13-interview-week', '/interview/level/week'],
  ['14-interview-map-set', '/interview/set'],
  ['15-map-home-life', '/map'],
  ['16-map-horizon-week', '/map/week'],
  ['17-goal-in-focus', '/goal/L1/week'],
  ['18-record', '/document'],
  ['19-morning-hear', '/morning/1'],
  ['20-morning-correction', '/morning/2'],
  ['21-morning-heading', '/morning/3?done=1'],
  ['22-morning-set', '/morning/4'],
  ['23-week', '/week'],
  ['24-talk', '/talk'],
  ['25-talk-answer', '/talk/now'],
  ['26-reviews', '/reviews'],
  ['27-review-close', '/review/1'],
  ['28-review-pick-orphan-gate', '/review/2'],
  ['29-review-set', '/review/3'],
  ['30-quarterly-review', '/quarter'],
  ['31-settings', '/settings'],
  ['32-first-run-empty-map', '/empty/map'],
  ['33-first-run-empty-week', '/empty/week'],
  ['34-nudge-lock-screen', '/nudge/lock'],
  ['35-nudge-in-app', '/nudge/inapp'],
];
writeFileSync(join(proto, 'screens.json'), JSON.stringify(SCREENS, null, 2) + '\n');

if (process.argv.includes('--serve')) {
  console.log(`Serving ${base}/prototype/`);
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
    await page.goto(`${base}/prototype/?bare=1#${hash}`, { waitUntil: 'networkidle' });
    await settle(page);
    const file = join(out, `${name}.png`);
    await page.locator('.device').screenshot({ path: file, animations: 'disabled' });
    console.log('rendered', file);
    await page.close();
  }

  const flow = await ctx.newPage();
  await flow.setViewportSize({ width: 2700, height: 2900 });
  await flow.goto(`${base}/prototype/flow.html`, { waitUntil: 'networkidle' });
  await settle(flow);
  await flow.waitForFunction(() => [...document.querySelectorAll('iframe')].every((i) => i.contentDocument?.readyState === 'complete' && i.contentDocument.querySelector('#screen > *')));
  await flow.waitForTimeout(800);
  await flow.locator('#flow').screenshot({ path: join(out, '00-flow-overview.png'), animations: 'disabled' });
  console.log('rendered', join(out, '00-flow-overview.png'));

  await browser.close();
  server.close();
}
