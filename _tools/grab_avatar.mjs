import {chromium} from 'playwright-core';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const targets = [
  ['https://www.youtube.com/@KeluarSekejap', '../assets/programs/keluar-sekejap.png'],
  ['https://www.youtube.com/@YangBerhentiMenteri', '../assets/programs/yang-berhenti-menteri.png'],
  ['https://www.youtube.com/@ybmenteri', '../assets/programs/ybm-alt.png'],
];
const b = await chromium.launch({executablePath: EDGE, headless: true});
const c = await b.newContext({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0', viewport:{width:1440,height:900}, locale:'en-US'});
for (const [url, out] of targets) {
  const p = await c.newPage();
  try {
    const r = await p.goto(url, {waitUntil:'domcontentloaded', timeout:40000});
    await p.waitForTimeout(3000);
    const t = await p.title();
    if (r.status() >= 400 || /404/.test(t)) { console.log(`skip ${url} -> ${t}`); await p.close(); continue; }
    const el = await p.$('#avatar img, yt-img-shadow#avatar img, #channel-header-container img');
    if (el) { await el.screenshot({path: out}); console.log(`saved ${out}  title=${t}`); }
    else console.log(`no avatar ${url}`);
  } catch(e) { console.log(`FAIL ${url} ${String(e).slice(0,90)}`); }
  await p.close();
}
await b.close();
