import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {Icon} from '../../icons';

/** 印刷质感：与 EvidenceChip 同一套网点 + 噪点，保持全片真图语言一致 */
import {Halftone, Grain, PRINT_FILTER} from '../../texture';

/**
 * C17a —— 三分之一的人从创作者那里获取新闻（181.745–189.200s / 帧 5453–5676）
 * 念白：Around a third, 32 percent, of Malaysians now access content from influencers
 *       and content creators who are focused on the news
 *
 * 量级型：32% 立成主体。数字用 FONT_HEAVY（Orbitron 的 0 是斜杠零，不用）。
 */
const F0 = 5453;

export const C17a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const numT = Math.min(1, Math.max(0, (n - 26) / 22));
  const eN = 1 - Math.pow(1 - numT, 3);
  const subOp = fadeIn(n - 74, 16);

  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 278, width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(n - 2, 14)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE}}>AROUND A THIRD</span>
      </div>

      <div style={{position: 'absolute', left: 0, top: 348, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 36}}>
        <span
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 236,
            lineHeight: 1,
            letterSpacing: -6,
            color: PURPLE,
            opacity: numT,
            transform: `translateY(${((1 - eN) * 26).toFixed(1)}px)`,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          32%
        </span>
        <div style={{paddingBottom: 42, textAlign: 'left'}}>
          <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 54, letterSpacing: 0.5, color: WHITE, lineHeight: 1.1}}>
            OF MALAYSIANS
          </div>
          <div style={{marginTop: 10, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 28, letterSpacing: 2.6, color: GREY}}>
            GET NEWS FROM CREATORS
          </div>
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: subOp}}>
        <CText cx={960} cy={696} size={30} weight={800} color={GREY} letterSpacing={2.4}>
          INFLUENCERS AND CONTENT CREATORS FOCUSED ON THE NEWS
        </CText>
      </div>

    </>
  );
};

/**
 * C17b —— 这些网红是谁（189.200–193.345s / 帧 5677–5800）
 * 念白：The major influencers are popular, often youngish politicians and activists
 *
 * 两栏并列：POLITICIANS / ACTIVISTS，都用 user 图标占位（这里讲的是人群而非具体人）。
 */
const F0B = 5677;

export const C17b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const lT = fadeIn(n - 4, 16);
  const rT = fadeIn(n - 60, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={312} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          THE MAJOR INFLUENCERS
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 404, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 96}}>
        <div style={{opacity: lT, transform: `translateY(${(1 - lT) * 18}px)`}}>
          <div style={{width: 88, height: 88, position: 'relative'}}>
            <Icon name="users" x={0} y={0} size={88} color={PURPLE} sw={2.8} glow />
          </div>
          <div style={{marginTop: 26, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 64, letterSpacing: 1, color: WHITE}}>POLITICIANS</div>
          <div style={{marginTop: 12, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: GREY}}>POPULAR · YOUNGISH</div>
        </div>

        <div style={{width: 2, height: 220, background: 'rgba(255,255,255,0.18)', marginTop: 10}} />

        <div style={{opacity: rT, transform: `translateY(${(1 - rT) * 18}px)`}}>
          <div style={{width: 88, height: 88, position: 'relative'}}>
            <Icon name="megaphone" x={0} y={0} size={88} color={PURPLE} sw={2.8} glow />
          </div>
          <div style={{marginTop: 26, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 64, letterSpacing: 1, color: WHITE}}>ACTIVISTS</div>
          <div style={{marginTop: 12, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: GREY}}>CAMPAIGNING VOICES</div>
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 100, 16)}}>
        <CText cx={960} cy={760} size={28} weight={700} color={GREY} letterSpacing={3.4}>
          NOT TRADITIONAL NEWSROOMS
        </CText>
      </div>
    </>
  );
};

/**
 * C18a —— 两个周更播客（193.633–204.500s / 帧 5810–6135）
 * 念白：Former UMNO youth head Khairy Jamaluddin has his weekly Keluar Sekejap podcast,
 *       and retired politician and technocrat Idris Jala and his son Leon also have
 *       a weekly podcast, The Game of Impossible
 *
 * 人物密集段：两张节目封面并置，各挂播主。封面走 EvidenceChip 同族处理（纸边 + 网点），
 * 但 origin tab 换成播主身份行，避免两套标签打架。
 */
const F0C = 5810;

const PosterCard: React.FC<{
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tilt: number;
  t: number;
  label: string;
  sub: string;
}> = ({src, x, y, w, h, tilt, t, label, sub}) => {
  const e = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  const BEZEL = 9;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        opacity: Math.min(1, t),
        transform: `rotate(${tilt}deg) translateY(${((1 - e) * 26).toFixed(1)}px)`,
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          background: '#EFEBE0',
          padding: BEZEL,
          boxSizing: 'border-box',
          borderRadius: 3,
          boxShadow: '0 22px 54px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 1, background: '#EFEBE0'}}>
          <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: PRINT_FILTER}} />
          <Halftone />
          <Grain />
        </div>
      </div>
      <div style={{marginTop: 24, width: 430}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 38, letterSpacing: 1, color: WHITE, lineHeight: 1.1, whiteSpace: 'nowrap'}}>{label}</div>
        <div style={{marginTop: 10, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 23, letterSpacing: 2, color: GREY, whiteSpace: 'nowrap'}}>{sub}</div>
      </div>
    </div>
  );
};

export const C18a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0C;
  const n = N - F0C;

  const lT = Math.min(1, Math.max(0, (n - 14) / 20));
  const rT = Math.min(1, Math.max(0, (n - 128) / 22));
  const spotOp = fadeIn(n - 216, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={252} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          WEEKLY PODCASTS
        </CText>
      </div>

      <PosterCard src="assets/malaysia2026/c18-keluar.jpg" x={342} y={310} w={356} h={356} tilt={-1.4} t={lT} label="KELUAR SEKEJAP" sub="KHAIRY JAMALUDDIN · FORMER UMNO YOUTH HEAD" />

      <PosterCard src="assets/malaysia2026/c18-game.jpg" x={1222} y={310} w={356} h={356} tilt={1.3} t={rT} label="THE GAME OF IMPOSSIBLE" sub="IDRIS JALA & LEON JALA" />

      <div style={{position: 'absolute', inset: 0, opacity: spotOp}}>
        <CText cx={960} cy={470} size={26} weight={800} color={PURPLE} letterSpacing={5}>
          BOTH ON SPOTIFY
        </CText>
      </div>
    </>
  );
};
