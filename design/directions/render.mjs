// Renders the five directions (pair PNG each) and the comparison sheet. Serves design/ and drives local Chrome.
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const out = join(here, 'out');
if (!existsSync(out)) mkdirSync(out);
const { chromium } = createRequire(join(root, 'mockups', 'package.json'))('playwright-core');

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const executablePath = process.env.CHROME_PATH ?? ['/usr/local/bin/google-chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 900, height: 950 }, deviceScaleFactor: 2, colorScheme: 'dark', reducedMotion: 'reduce' });
const settle = async (p) => { await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300); };

for (const d of ['thread', 'orbit', 'horizon', 'stack', 'document']) {
  const page = await ctx.newPage();
  await page.goto(`${base}/directions/?d=${d}`, { waitUntil: 'networkidle' });
  await settle(page);
  await page.locator('#pair').screenshot({ path: join(out, `00b-direction-${d}.png`), animations: 'disabled' });
  console.log('rendered', d);
  await page.close();
}
const sheet = await ctx.newPage();
await sheet.setViewportSize({ width: 1500, height: 1500 });
await sheet.goto(`${base}/directions/sheet.html`, { waitUntil: 'networkidle' });
await settle(sheet);
await sheet.waitForFunction(() => [...document.querySelectorAll('iframe')].every((i) => i.contentDocument?.readyState === 'complete' && i.contentDocument.querySelector('.device')));
await sheet.waitForTimeout(800);
await sheet.locator('#sheet').screenshot({ path: join(out, '00a-directions.png'), animations: 'disabled' });
console.log('rendered sheet');
await browser.close();
server.close();
