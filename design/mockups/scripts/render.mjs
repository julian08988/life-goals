// Renders every screen in screens/ and the overview (index.html) to PNG at 2x.
// Uses the locally installed Chrome via playwright-core; no browser download needed.
// Usage: node scripts/render.mjs [--serve]   (--serve keeps the static server up for a browser)
import { createServer } from 'node:http';
import { readdirSync, readFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');
if (!existsSync(out)) mkdirSync(out);

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const file = join(root, path === '/' ? 'index.html' : path);
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

if (process.argv.includes('--serve')) {
  console.log(`Serving ${base}`);
} else {
  const executablePath = process.env.CHROME_PATH ?? ['/usr/local/bin/google-chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, colorScheme: 'dark', reducedMotion: 'reduce' });

  const settle = async (page) => {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
  };

  const screens = readdirSync(join(root, 'screens')).filter((f) => f.endsWith('.html')).sort();
  for (const f of screens) {
    const page = await ctx.newPage();
    await page.goto(`${base}/screens/${f}`, { waitUntil: 'networkidle' });
    await settle(page);
    const device = page.locator('.device');
    const file = join(out, f.replace('.html', '.png'));
    await device.screenshot({ path: file, animations: 'disabled' });
    console.log('rendered', file);
    await page.close();
  }

  const overview = await ctx.newPage();
  await overview.setViewportSize({ width: 3680, height: 1100 });
  await overview.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await settle(overview);
  await overview.waitForFunction(() => [...document.querySelectorAll('iframe')].every((i) => i.contentDocument?.readyState === 'complete'));
  await overview.waitForTimeout(600);
  await overview.locator('#board').screenshot({ path: join(out, '00-overview.png'), animations: 'disabled' });
  console.log('rendered', join(out, '00-overview.png'));

  await browser.close();
  server.close();
}
