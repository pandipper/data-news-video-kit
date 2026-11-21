// 用系统 Edge 抓 og:image 与页面元信息（Wikipedia / YouTube / 机构站在 curl 下多被墙或 403）。
// 用法: node fetch_og.mjs <outDir> <url> [<url> ...]
import {chromium} from 'playwright-core';
import {writeFileSync, mkdirSync} from 'node:fs';
import {join} from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const [outDir, ...urls] = process.argv.slice(2);
mkdirSync(outDir, {recursive: true});

const browser = await chromium.launch({executablePath: EDGE, headless: true});
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
  viewport: {width: 1440, height: 900},
  locale: 'en-US',
});

for (const url of urls) {
  const page = await ctx.newPage();
  try {
    const r = await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 45000});
    await page.waitForTimeout(2500);
    const info = await page.evaluate(`(() => {
      const g = (p) => document.querySelector(p)?.getAttribute('content') || '';
      return {
        title: document.title,
        ogImage: g('meta[property="og:image"]') || g('meta[name="twitter:image"]'),
        ogTitle: g('meta[property="og:title"]'),
        desc: g('meta[property="og:description"]').slice(0,180),
        h1: document.querySelector('h1')?.innerText?.trim().slice(0,120) || '',
      };
    })()`);
    console.log(`\n[${r?.status()}] ${url}`);
    console.log(`  title: ${info.title}`);
    console.log(`  h1: ${info.h1}`);
    console.log(`  og: ${info.ogTitle}`);
    console.log(`  img: ${info.ogImage}`);

    if (info.ogImage) {
      const buf = await ctx.request.get(info.ogImage, {timeout: 30000}).then((x) => x.body());
      if (buf && buf.length > 3000) {
        const name = url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 60);
        const p = join(outDir, `${name}.jpg`);
        writeFileSync(p, buf);
        console.log(`  saved: ${p} (${(buf.length / 1024).toFixed(0)}KB)`);
      } else {
        console.log(`  img too small or empty: ${buf?.length ?? 0}`);
      }
    }
  } catch (e) {
    console.log(`\nFAIL ${url}\n  ${String(e).slice(0, 160)}`);
  }
  await page.close();
}
await browser.close();
