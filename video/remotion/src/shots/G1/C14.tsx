import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';

/**
 * C14 —— Malaysiakini 的艰难一年（150.379–155.259s / 帧 4512–4658）
 * 念白：Malaysiakini, the country's oldest independent news portal, endured a troubled year
 *
 * 站点登场：名字立成主体，身份与结论各一行。这一拍不用图（没有对应报道图，且下一拍才出挪用细节）。
 */
const F0 = 4512;

export const C14: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickOp = fadeIn(n - 2, 14);
  const idOp = fadeIn(n - 44, 16);
  const ruleW = Math.min(1, Math.max(0, (n - 62) / 24)) * 620;

  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 296, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, opacity: kickOp}}>
        <div style={{width: 96, height: 96, position: 'relative', flexShrink: 0}}>
          <Icon name="newspaper" x={0} y={0} size={96} color={PURPLE} sw={2.6} glow />
        </div>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 76, letterSpacing: 1, color: WHITE}}>MALAYSIAKINI</span>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: idOp}}>
        <CText cx={960} cy={430} size={32} weight={800} color={GREY} letterSpacing={4.4}>
          THE COUNTRY'S OLDEST INDEPENDENT NEWS PORTAL
        </CText>
      </div>

      <div style={{position: 'absolute', left: 960 - ruleW / 2, top: 486, width: ruleW, height: 2, background: 'rgba(240,160,48,0.55)'}} />

      <div style={{position: 'absolute', left: 0, top: 536, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={100} size={104} text="A TROUBLED" color={WHITE} />
        <Pressed n={n} delay={112} size={104} text="YEAR" color={PURPLE} />
      </div>

    </>
  );
};

/**
 * C15a —— 先裁员，再被挪用（155.632–163.000s / 帧 4670–4890）
 * 念白：Having already laid off staff as part of a restructuring exercise announced in 2024,
 *       it was rocked in March 2026
 *
 * 两段时间：2024 的重组 → 2026 年 3 月的发现。左右并置，中间一条时间线连起来。
 */
const F0B = 4670;

export const C15a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const leftT = fadeIn(n - 4, 16);
  const lineT = Math.min(1, Math.max(0, (n - 132) / 26));
  const rightT = fadeIn(n - 156, 18);

  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 268, width: 1920, display: 'flex', justifyContent: 'center'}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE, opacity: leftT}}>
          HAVING ALREADY
        </span>
      </div>

      {/* 左：2024 重组 */}
      <div style={{position: 'absolute', inset: 0, opacity: leftT, transform: `translateY(${(1 - leftT) * 16}px)`}}>
        <div style={{position: 'absolute', left: 300, top: 356}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 72, letterSpacing: 0.5, color: WHITE}}>LAID OFF STAFF</span>
            <IconCue inline N={N} word="laid" icon="scissors" size={72} color={GREY} sw={2.6} after={F0B} from="left" hold={180} />
          </div>
          <div style={{marginTop: 22, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 28, letterSpacing: 1.6, color: GREY, lineHeight: 1.5}}>
            RESTRUCTURING EXERCISE
            <br />
            ANNOUNCED IN 2024
          </div>
        </div>
      </div>

      {/* 中：时间线 */}
      <div style={{position: 'absolute', left: 300, top: 664, width: Math.min(1, Math.max(0, (n - 132) / 26)) * 820, height: 2, background: 'rgba(240,160,48,0.5)'}} />

      {/* 右：2026 年 3 月 */}
      <div style={{position: 'absolute', inset: 0, opacity: rightT, transform: `translateY(${(1 - rightT) * 16}px)`}}>
        <div style={{position: 'absolute', left: 1140, top: 396}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 72, letterSpacing: 0.5, color: PURPLE}}>MARCH 2026</span>
            <IconCue inline N={N} word="March" icon="calendar" size={68} color={PURPLE} sw={2.6} glow after={F0B} from="up" />
          </div>
          <div style={{marginTop: 22, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 28, letterSpacing: 1.6, color: GREY, lineHeight: 1.5}}>
            ROCKED BY THE DISCOVERY
          </div>
        </div>
      </div>

      {/* 起点与终点节点 */}
      <div style={{position: 'absolute', left: 296, top: 657, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.5)'}} />
      <div
        style={{
          position: 'absolute',
          left: 1096 + lineT * 24,
          top: 655,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: PURPLE,
          opacity: lineT > 0.95 ? 1 : 0,
          boxShadow: '0 0 18px 4px rgba(240,160,48,.5)',
        }}
      />
    </>
  );
};
