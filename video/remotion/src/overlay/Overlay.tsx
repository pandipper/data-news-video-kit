import React from 'react';
import {useCurrentFrame} from 'remotion';
import {GlitchIn, kf, emphasisPulse, easeInOutPow, SENTENCES, TOTAL_FRAMES, CHAPTER_STARTS, FONT_HEAVY, FONT_WIDE, FONT_ORB, clamp01, SQUEEZE, fitSize, EM_WIDE} from '../common';
import {CText, TechText, TechSub, Pill, TopCapsule, ArrowH, PURPLE, PURPLE_TECH, GREY, GREY_MID, WHITE, GLOW_PURPLE_S, PILL_SHADOW, fadeIn, slideUp} from '../ui';
import {VIDEO} from '../config';
const clampFrames = (n: number, len: number) => clamp01(n / len);

// 1920×1080 版：模板 1280×720 的所有 px 一律 ×1.5（cx 640→960、字号、胶囊、流程轨、片尾卡）。
// ---------- 时间轴查询 ----------
export const S = (id: string) => {
  const s = SENTENCES.find((x) => x.id === id);
  if (!s) throw new Error(`config 引用了不存在的句 id ${id}（请对照 script/timeline.md）`);
  return s;
};

/** 12 帧加速上出：n<0 → 原位；位移 (n/11)^2·660px，透明度 1−(n/11)^1.6 → 末帧 0 */
const exitOut = (n: number) => {
  if (n < 0) return {dy: 0, op: 1};
  const t = Math.min(1, n / 11);
  return {dy: t * t * 660, op: 1 - Math.pow(t, 1.6)};
};

// ---------- 片头 ----------
// 本片音轨由既有 TTS 直出，首句从 0.000 开始，没有 a2e 的 LEAD 片头留白。
// 片头固定占前 90 帧（3 s），与首句前段共存；HUD 首条延后到 90 帧（config.hud[0].fromOffset）。
// 若后续分镜把片头交给 SC01 自己画，就把这里设为 [1,1] 停用它。
const TITLE_FRAMES = 90;
export const TITLE_RANGE: [number, number] = [1, TITLE_FRAMES];
export const Title: React.FC = () => {
  const N = useCurrentFrame() + TITLE_RANGE[0];
  const [a, b] = TITLE_RANGE;
  const exitN = N - (b - 11); // 末 12 帧上摇出画
  const dy = -exitOut(exitN).dy;
  const op = exitOut(exitN).op;
  const glow = 0.5 + 0.5 * Math.sin((N / 30) * Math.PI); // 缓慢呼吸
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translateY(${dy}px)`, opacity: op}}>
      <GlitchIn N={N} f0={a + 11} rgbSplit={6} slices={14} seed={3}>
        <div style={{position: 'absolute', left: 0, top: 402, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 39}}>
          <span style={{fontFamily: FONT_WIDE, fontSize: fitSize(VIDEO.title.big, VIDEO.title.rest ? 930 : 1680, 177, 96, EM_WIDE, 9), color: WHITE, lineHeight: 1, letterSpacing: 9, textShadow: `0 0 ${27 + 21 * glow}px rgba(240,160,48,${0.55 + 0.3 * glow}), 9px 9px 0 ${PURPLE}`}}>{VIDEO.title.big}</span>
          {VIDEO.title.rest ? (
            <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: fitSize(VIDEO.title.rest, 780, 144, 90, 1, 3), color: WHITE, lineHeight: 1, transform: `scaleX(${SQUEEZE})`, transformOrigin: '0 100%', letterSpacing: 3, WebkitTextStroke: '1.5px #000', paintOrder: 'stroke fill'}}>{VIDEO.title.rest}</span>
          ) : null}
        </div>
      </GlitchIn>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(N - (a + 20), 10), transform: `translateY(${slideUp(N - (a + 20), 60, 27)}px)`}}>
        <TechText cx={960} cy={669} text={VIDEO.title.en} fontSize={57} scaleX={0.82} weight={700} />
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(N - (a + 28), 10)}}>
        <CText cx={960} cy={780} size={45} weight={500} color={GREY} letterSpacing={9}>
          {VIDEO.title.tagline}
        </CText>
        <div style={{position: 'absolute', left: 780, top: 744, width: 360, height: 3, background: 'rgba(255,255,255,0.35)', transform: `scaleX(${fadeIn(N - (a + 28), 14)})`}} />
      </div>
    </div>
  );
};

// ---------- 章节卡 ----------
/** 章节卡（第 2 章起）。本片章间只有 0.65 s 间隙（约 20 帧），放不下 a2e 那种「章前空白里的独立章节卡」，
 *  改为覆盖在章首镜头上：从章首句前 2 帧起，持续 45 帧（1.5 s）。章节卡是过渡层，不需要独立时间。 */
const CARD_LEN = 45;
export const CARD_LENGTH = CARD_LEN;
export const CHAPTER_CARDS: Array<{n: number; title: string; tech: string; from: number; to: number}> = CHAPTER_STARTS.slice(1).map((c, i) => {
  const first = SENTENCES.find((x) => x.chapter === c.n)!;
  return {n: c.n, title: c.title, tech: VIDEO.chapterTech[i + 1] ?? '', from: first.from - 2, to: first.from - 2 + CARD_LEN - 1};
});
export const ChapterCard: React.FC<{card: (typeof CHAPTER_CARDS)[number]}> = ({card}) => {
  const N = useCurrentFrame() + card.from;
  const n = N - card.from;
  const exitN = N - (card.to - 11);
  const dy = -exitOut(exitN).dy;
  const op = exitOut(exitN).op;
  const w = kf(n, [[0, 0], [20, 450]], easeInOutPow(2.5));
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translateY(${dy}px)`, opacity: op}}>
      <div style={{position: 'absolute', opacity: fadeIn(n, 8)}}>
        <CText cx={960} cy={402} size={81} weight={700} family={FONT_ORB} color={PURPLE_TECH} letterSpacing={6} shadow="0 0 21px rgba(240,160,48,.6)">{`0${card.n}`}</CText>
      </div>
      <GlitchIn N={N} f0={card.from + 3} rgbSplit={5} seed={card.n}>
        <CText cx={960} cy={558} size={fitSize(card.title, 1650, 120, 69, 1, 4.5)} weight={900} scaleX={SQUEEZE} letterSpacing={4.5} style={{WebkitTextStroke: '1.5px #000', paintOrder: 'stroke fill'}}>{card.title}</CText>
      </GlitchIn>
      <div style={{position: 'absolute', left: 960 - w / 2, top: 642, width: w, height: 4.5, background: WHITE, opacity: 0.85}} />
      {card.tech ? (
        <div style={{position: 'absolute', opacity: fadeIn(n - 10, 10)}}>
          <TechSub cx={960} cy={705} text={card.tech} size={39} />
        </div>
      ) : null}
    </div>
  );
};

// ---------- 顶部 HUD 胶囊 ----------
export type HudEntry = {from: number; to: number; text: string; tech?: string; w?: number};
/** HUD 条目由 config.hud 的句 id 解析；章首条目从章节卡结束的下一帧开始 */
export const HUD: HudEntry[] = (SENTENCES.length ? VIDEO.hud : []).map((h) => {
  const a = S(h.fromS), b = S(h.toS);
  const isChapterFirst = SENTENCES.find((x) => x.chapter === a.chapter)!.id === a.id && a.chapter > 1;
  const from = a.from + (h.fromOffset ?? (isChapterFirst ? CARD_LEN - 1 : 0));
  const isChapterLast = [...SENTENCES].reverse().find((x) => x.chapter === b.chapter)!.id === b.id;
  const to = b.to + (h.toOffset ?? (isChapterLast ? 2 : 0));
  return {from, to, text: h.text, tech: h.tech, w: h.w};
});
// 同章相邻条目之间不留空档；跨章节卡（间隔 ≥30 帧）保持空档，由章节卡接管
for (let i = 0; i < HUD.length - 1; i++) if (HUD[i + 1].from - HUD[i].to < 30) HUD[i].to = HUD[i + 1].from - 1;
export const HUD_RANGE: [number, number] = HUD.length ? [HUD[0].from, HUD[HUD.length - 1].to] : [0, 0];
const hudW = (h: HudEntry) => h.w ?? Math.max(324, Math.round(h.text.replace(/[^一-龥]/g, '').length * 51 + h.text.replace(/[一-龥\s]/g, '').length * 30 + (h.text.match(/\s/g)?.length ?? 0) * 15 + 90));
export const Hud: React.FC = () => {
  const N = useCurrentFrame() + HUD_RANGE[0];
  const idx = HUD.findIndex((h) => N >= h.from && N <= h.to);
  if (idx < 0) return null;
  const e = HUD[idx];
  // 进章节卡前 HUD 末 8 帧淡出（只对跨章节卡的条目生效）
  const nextGap = idx < HUD.length - 1 ? HUD[idx + 1].from - e.to : 999;
  const fadeTail = nextGap >= 30 ? 1 - clampFrames(N - (e.to - 8), 8) : 1;
  const w = hudW(e);
  // 同章换词：胶囊常驻、宽度 10 帧过渡，旧词 4 帧淡出、新词 SoftIn
  const prev = idx > 0 ? HUD[idx - 1] : undefined;
  const n = N - e.from;
  const sameChapter = !!prev && e.from - prev.to < 30;
  if (sameChapter && prev && n < 10) {
    const t = easeInOutPow(2.5)(clampFrames(n, 10));
    const wNow = hudW(prev) + (w - hudW(prev)) * t;
    const oldOp = 1 - clampFrames(n, 4);
    const newOp = 1 - Math.pow(1 - clampFrames(n - 3, 7), 2.5);
    return (
      <div style={{position: 'absolute', inset: 0, opacity: fadeTail}}>
        <Pill x={960 - wNow / 2} y={42} w={wNow} h={76.5} fill={PURPLE} sw={3} style={{filter: PILL_SHADOW}} />
        {oldOp > 0.01 ? <CText cx={960} cy={80.25} size={49.5} weight={700} letterSpacing={1.5} opacity={oldOp}>{prev.text}</CText> : null}
        <div style={{position: 'absolute', inset: 0, opacity: newOp, transform: `translateY(${((1 - newOp) * 6).toFixed(2)}px)`}}>
          <CText cx={960} cy={80.25} size={49.5} weight={700} letterSpacing={1.5}>{e.text}</CText>
          {e.tech ? <TechSub cx={960} cy={138} text={e.tech} /> : null}
        </div>
      </div>
    );
  }
  // 章首条目（章节卡之后）与过渡结束后：原 TopCapsule，几何与上面一致，无缝
  return <TopCapsule N={N} f0={e.from} text={e.text} w={w} tech={e.tech} opacity={fadeTail} />;
};

// ---------- 流程轨（只在 config.rails 标了轨的章出现）----------
export type RailSpec = {steps: string[]; switches: number[]; from: number; to: number};
export const RAILS: RailSpec[] = (SENTENCES.length ? VIDEO.rails : []).map((r) => ({steps: r.steps, switches: r.switchS.map((id) => S(id).from), from: S(r.fromS).from - 8, to: S(r.toS).to + 2}));
const RAIL_CX = [360, 660, 960, 1260, 1560];
const RAIL_W = 225, RAIL_H = 66, RAIL_Y = 177;
export const Rail: React.FC<{spec: RailSpec}> = ({spec}) => {
  const N = useCurrentFrame() + spec.from;
  let active = -1;
  spec.switches.forEach((f, i) => { if (N >= f) active = i; });
  const railOut = 1 - clampFrames(N - (spec.to - 8), 8); // 末 8 帧淡出
  return (
    <div style={{position: 'absolute', inset: 0, opacity: railOut}}>
      {spec.steps.map((t, i) => {
        const state = i === active ? 'active' : i < active ? 'done' : 'todo';
        const pulse = i === active ? emphasisPulse(N - spec.switches[i], {peak: 1.1, up: 10, hold: 3, down: 10}) : 1;
        const fill = state === 'active' ? PURPLE : state === 'done' ? '#2A2A2A' : '#000';
        const stroke = state === 'active' ? WHITE : state === 'done' ? GREY_MID : GREY;
        const color = state === 'todo' ? GREY : WHITE;
        return (
          <React.Fragment key={t}>
            <div style={{position: 'absolute', left: RAIL_CX[i] - RAIL_W / 2, top: RAIL_Y + slideUp(N - (spec.from + i * 2), 40, 24), width: RAIL_W, height: RAIL_H, transform: `scale(${pulse})`, opacity: fadeIn(N - (spec.from + i * 2), 8)}}>
              <Pill x={0} y={0} w={RAIL_W} h={RAIL_H} fill={fill} stroke={stroke} sw={3} text={t} fontSize={36} weight={700} color={color} letterSpacing={1.5} textDy={-2.25} glow={state === 'active' ? GLOW_PURPLE_S : undefined} />
            </div>
            {i < spec.steps.length - 1 ? (
              <ArrowH x={RAIL_CX[i] + RAIL_W / 2 + 9} y={RAIL_Y + RAIL_H / 2 - 13.5} w={57} h={27} p={clampFrames(N - (spec.from + 4 + i * 2), 10)} color={i < active ? WHITE : GREY} shaft={3} />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ---------- 片尾 ----------
const LAST_TO = SENTENCES[SENTENCES.length - 1]?.to ?? TOTAL_FRAMES - 60;
// 压黑从末句结束开始（原 a2e 是 LAST_TO - endingFade，会让最后一拍的收尾字被压暗）。
// 本片末句就是「THANK YOU FOR LISTENING」，需要完整 1.2 s 的可见时间。
export const ENDING_RANGE: [number, number] = [LAST_TO, TOTAL_FRAMES];
export const Ending: React.FC = () => {
  const N = useCurrentFrame() + ENDING_RANGE[0];
  const n = N - ENDING_RANGE[0];
  const op = fadeIn(n, VIDEO.endingFade);
  return <div style={{position: 'absolute', inset: 0, background: '#000', opacity: op}} />;
};
/** 片尾署名（压黑之后、进度条压黑之前）：完整书名 / 作者 / 出处，停 ≈3 s */
export const END_CREDIT_RANGE: [number, number] = [LAST_TO + VIDEO.endingFade + 1, TOTAL_FRAMES - 20];
export const EndCredit: React.FC = () => {
  const N = useCurrentFrame() + END_CREDIT_RANGE[0];
  const n = N - END_CREDIT_RANGE[0];
  const op = Math.min(fadeIn(n, 8), 1 - clampFrames(N - (END_CREDIT_RANGE[1] - 8), 8));
  const c = VIDEO.credit;
  const by = VIDEO.builtBy;
  if (!c && !by) return null;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: op}}>
      {c ? (
        <>
          <CText cx={960} cy={450} size={39} weight={500} color={GREY} letterSpacing={6}>{c.kicker}</CText>
          <CText cx={960} cy={528} size={60} weight={700} color={WHITE}>{c.title}</CText>
          <CText cx={960} cy={606} size={39} weight={500} color={GREY}>{c.byline}</CText>
          <div style={{position: 'absolute', left: 840, top: 660, width: 240, height: 3, background: 'rgba(255,255,255,0.35)', transform: `scaleX(${fadeIn(n - 6, 16)})`}} />
          <CText cx={960} cy={714} size={33} weight={500} color={GREY}>{c.note}</CText>
        </>
      ) : null}
      {by ? <CText cx={960} cy={c ? 786 : 576} size={33} weight={500} color={GREY_MID} letterSpacing={3}>{by}</CText> : null}
    </div>
  );
};
// 进度条不能在画面全黑后孤悬 2 s → 进度条随 endingFade 一起压黑（aboveBar 层），署名卡在其上
export const ENDING_TOP_RANGE: [number, number] = [LAST_TO, TOTAL_FRAMES];
export const EndingTop: React.FC = () => {
  const N = useCurrentFrame() + ENDING_TOP_RANGE[0];
  const op = fadeIn(N - ENDING_TOP_RANGE[0], VIDEO.endingFade);
  return <div style={{position: 'absolute', inset: 0, background: '#000', opacity: op}} />;
};
