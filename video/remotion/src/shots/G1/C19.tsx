import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {Icon} from '../../icons';
import {Halftone, Grain, PRINT_FILTER} from '../../texture';

/**
 * C19a —— Rafizi 的 Yang Berhenti Menteri（212.033–217.733s / 帧 6361–6532）
 * 念白：Together with former minister Rafizi Ramli and with his Yang Berhenti Menteri
 *       podcast on YouTube
 *
 * 人物 + 节目并置：左封面卡，右身份与平台。
 */
const F0 = 6361;

export const C19a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const cardT = Math.min(1, Math.max(0, (n - 34) / 22));
  const eC = 1 - Math.pow(1 - cardT, 3);
  const infoOp = fadeIn(n - 30, 18);
  const ytOp = fadeIn(n - 140, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={264} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          TOGETHER WITH
        </CText>
      </div>

      {/* 封面卡：与 C18 同一套纸边 + 网点 */}
      <div
        style={{
          position: 'absolute',
          left: 292,
          top: 338,
          width: 400,
          height: 400,
          background: '#EFEBE0',
          padding: 9,
          boxSizing: 'border-box',
          borderRadius: 3,
          opacity: cardT,
          transform: `rotate(-1.2deg) translateY(${((1 - eC) * 24).toFixed(1)}px)`,
          boxShadow: '0 22px 54px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
          <Img src={staticFile('assets/malaysia2026/c19-ybm.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: PRINT_FILTER}} />
          <Halftone />
          <Grain />
        </div>
      </div>

      <div style={{position: 'absolute', left: 776, top: 372, width: 900, opacity: infoOp}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 30, letterSpacing: 5, color: PURPLE}}>FORMER MINISTER</div>
        <div style={{marginTop: 18, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 84, letterSpacing: 0.5, color: WHITE, lineHeight: 1.08}}>
          RAFIZI RAMLI
        </div>
        <div style={{marginTop: 26, height: 2, width: 420, background: 'rgba(255,255,255,0.24)'}} />
        <div style={{marginTop: 24, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 46, letterSpacing: 0.5, color: WHITE, lineHeight: 1.15}}>
          YANG BERHENTI
          <br />
          MENTERI
        </div>
      </div>

      <div style={{position: 'absolute', left: 780, top: 704, display: 'flex', alignItems: 'center', gap: 20, opacity: ytOp}}>
        <div style={{width: 60, height: 60, position: 'relative', flexShrink: 0}}>
          <Icon name="video" x={0} y={0} size={60} color={PURPLE} sw={2.6} glow />
        </div>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 42, letterSpacing: 2, color: WHITE}}>YOUTUBE</span>
      </div>
    </>
  );
};

/**
 * C19b —— 他们提供的解读（217.733–226.305s / 帧 6533–6789）
 * 念白：these influencers, sometimes with invited guests, provide interpretations
 *       and commentary on current news, which many consider refreshing, independent
 *       and entertaining
 *
 * 三栏并列：评价用了三个词，各占一栏，依次点亮。
 */
const F0B = 6533;

const WORDS: Array<{label: string; at: number}> = [
  {label: 'REFRESHING', at: 6730},
  {label: 'INDEPENDENT', at: 6749},
  {label: 'ENTERTAINING', at: 6773},
];

export const C19b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const headOp = fadeIn(n - 4, 16);
  const midOp = fadeIn(n - 56, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: headOp}}>
        <CText cx={960} cy={300} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          INTERPRETATIONS AND COMMENTARY
        </CText>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: midOp}}>
        <CText cx={960} cy={382} size={34} weight={800} color={GREY} letterSpacing={4}>
          ON CURRENT NEWS · SOMETIMES WITH INVITED GUESTS
        </CText>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: midOp}}>
        <CText cx={960} cy={502} size={28} weight={700} color={GREY} letterSpacing={4}>
          WHICH MANY CONSIDER
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 566, width: 1920, display: 'flex', justifyContent: 'center', gap: 60}}>
        {WORDS.map((w, i) => {
          const t = Math.min(1, Math.max(0, (n - (w.at - F0B)) / 14));
          if (t <= 0) return null;
          const e = 1 - Math.pow(1 - t, 3);
          return (
            <div key={w.label} style={{opacity: e, transform: `translateY(${(1 - e) * 20}px)`, textAlign: 'center'}}>
              <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 62, letterSpacing: 0.5, color: WHITE, lineHeight: 1.1}}>
                {w.label}
              </div>
              <div style={{margin: '14px auto 0', width: Math.min(1, Math.max(0, (n - (w.at - F0B) - 8) / 18)) * 150, height: 3, background: PURPLE, opacity: 0.8}} />
            </div>
          );
        })}
      </div>
    </>
  );
};
