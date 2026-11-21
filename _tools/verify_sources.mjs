// 遍历 assets/sources.json 里的所有 URL，用系统 Edge 打开，打印标题、h1、页面内可见日期，
// 用于核对「机构 + 日期」是否与来源页一致。
import {chromium} from 'playwright-core';
import {readFileSync} from 'node:fs';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const src = JSON.parse(readFileSync('../assets/sources.json', 'utf8'));

const urls = [];
for (const [cid, f] of Object.entries(src.facts)) {
  for (const s of f.sources || []) {
    if (s.url) urls.push({cid, org: s.org, want: s.date, url: s.url});
  }
}
console.log(`待验证 ${urls.length} 条`);

const browser = await chromium.launch({executablePath: EDGE, headless: true});
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
  viewport: {width: 1440, height: 900},
  locale: 'en-US',
});

const bad = [];
for (const u of urls) {
  const page = await ctx.newPage();
  try {
    const r = await page.goto(u.url, {waitUntil: 'domcontentloaded', timeout: 40000});
    await page.waitForTimeout(1800);
    const info = await page.evaluate(`(() => {
      const g = (p) => document.querySelector(p)?.getAttribute('content') || '';
      const time = [...document.querySelectorAll('time')].map(t=>t.getAttribute('datetime')||t.innerText).slice(0,2).join(' | ');
      const body = document.body.innerText.slice(0, 4000);
      const dm = body.match(/(\\d{1,2}\\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\s+20\\d\\d)/i);
      return {title: document.title.slice(0,110), og: g('meta[property="article:published_time"]') || g('meta[property="og:updated_time"]'), time, dm: dm?dm[1]:''};
    })()`);
    const st = r?.status();
    const okDate = info.og || info.time || info.dm;
    console.log(`\n[${st}] ${u.cid} ${u.org}  want=${u.want}`);
    console.log(`   ${info.title}`);
    console.log(`   meta时间: ${info.og || '-'} | time标签: ${info.time || '-'} | 正文: ${info.dm || '-'}`);
    if (st && st >= 400) bad.push(`${u.cid} ${u.org} HTTP ${st}`);
  } catch (e) {
    console.log(`\nFAIL ${u.cid} ${u.org} ${u.url}\n   ${String(e).slice(0, 120)}`);
    bad.push(`${u.cid} ${u.org} 打不开`);
  }
  await page.close();
}
await browser.close();
console.log(`\n===== 问题 ${bad.length} 条 =====`);
bad.forEach((b) => console.log(' - ' + b));
