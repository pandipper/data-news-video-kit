import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';
import {EvidenceChip} from '../../figures/EvidenceChip';

/**
 * C15b —— 三百万令吉被挪用（163.000–168.367s / 帧 4891–5051）
 * 念白：by the discovery that 3 million ringgit, approximately 750,000 US dollars,
 *       had been diverted from its subsidiaries
 *
 * 量级型：RM3 MILLION 立成主体，右侧 The Edge 报道卡作为证据。
 * 画面只写 RM3 MILLION —— 美元换算是念白的口头补充，交给字幕（证据清单的保守取值）。
 */
const F0 = 4891;

export const C15b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const numT = Math.min(1, Math.max(0, (n - 18) / 22));
  const eN = 1 - Math.pow(1 - numT, 3);
  const subOp = fadeIn(n - 52, 16);

  return (
    <>
      <div style={{position: 'absolute', left: 110, top: 268, opacity: fadeIn(n - 2, 14)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE}}>THE DISCOVERY</span>
      </div>

      <div style={{position: 'absolute', left: 110, top: 336, display: 'flex', alignItems: 'center', gap: 34}}>
        <span
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 68,
            letterSpacing: 0,
            color: GREY,
            opacity: numT,
          }}
        >
          RM
        </span>
        <span
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 148,
            lineHeight: 1.16,
            letterSpacing: -3,
            color: PURPLE,
            opacity: numT,
            transform: `translateY(${((1 - eN) * 26).toFixed(1)}px)`,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          3 MILLION
        </span>
      </div>

      <div style={{position: 'absolute', left: 116, top: 604, opacity: subOp}}>
        <div style={{height: 2, width: 460, background: 'rgba(255,255,255,0.26)'}} />
        <div style={{marginTop: 22, display: 'flex', alignItems: 'center', gap: 24}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 40, letterSpacing: 0.5, color: WHITE}}>DIVERTED FROM SUBSIDIARIES</span>
          <IconCue inline N={N} word="diverted" icon="banknote" size={64} color={PURPLE} sw={2.6} glow after={F0} from="up" />
        </div>
      </div>

      <EvidenceChip
        N={N}
        f0={F0 + 26}
        src="assets/malaysia2026/c15-edge.jpg"
        x={1152}
        y={228}
        w={430}
        h={537}
        org="THE EDGE"
        dateLabel="MAR 2026"
        tilt={1.2}
        enter={16}
      />
    </>
  );
};

/**
 * C15c —— 前员工把钱转去了哪里（168.367–175.472s / 帧 5052–5264）
 * 念白：by former employees to entities suspected by the company of running unlicensed
 *       investment schemes
 *
 * 流程型：三人 → 箭头 → 实体 → 定性。三段横排，箭头 draw-on。
 */
const F0B = 5052;

export const C15c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const srcT = fadeIn(n - 4, 16);
  const arrow1 = Math.min(1, Math.max(0, (n - 62) / 24));
  const midT = fadeIn(n - 92, 18);
  const arrow2 = Math.min(1, Math.max(0, (n - 132) / 24));
  const endT = fadeIn(n - 156, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={272} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          THE MONEY WENT
        </CText>
      </div>

      {/* 起点：前员工 */}
      <div style={{position: 'absolute', left: 150, top: 420, width: 380, opacity: srcT, transform: `translateY(${(1 - srcT) * 16}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div style={{width: 72, height: 72, position: 'relative', flexShrink: 0}}>
            <Icon name="user" x={0} y={0} size={72} color={WHITE} sw={2.6} />
          </div>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 44, letterSpacing: 0.5, color: WHITE, lineHeight: 1.1}}>
            FORMER
            <br />
            EMPLOYEES
          </span>
        </div>
      </div>

      {/* 箭头 1 */}
      <div style={{position: 'absolute', left: 556, top: 462, width: arrow1 * 148, height: 2, background: 'rgba(240,160,48,0.7)'}} />
      <div style={{position: 'absolute', left: 700, top: 452, width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: `16px solid rgba(240,160,48,${(0.7 * arrow1).toFixed(2)})`, opacity: arrow1 > 0.9 ? 1 : 0}} />

      {/* 中：实体 */}
      <div style={{position: 'absolute', left: 730, top: 420, width: 400, opacity: midT, transform: `translateY(${(1 - midT) * 16}px)`}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 44, letterSpacing: 0.5, color: WHITE, lineHeight: 1.14}}>
          ENTITIES
          <br />
          SUSPECTED OF
        </div>
      </div>

      {/* 箭头 2 */}
      <div style={{position: 'absolute', left: 1150, top: 462, width: arrow2 * 128, height: 2, background: 'rgba(240,160,48,0.7)'}} />
      <div style={{position: 'absolute', left: 1274, top: 452, width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: `16px solid rgba(240,160,48,${(0.7 * arrow2).toFixed(2)})`, opacity: arrow2 > 0.9 ? 1 : 0}} />

      {/* 终点：非法投资计划 */}
      <div style={{position: 'absolute', left: 1304, top: 404, width: 520, opacity: endT, transform: `translateY(${(1 - endT) * 16}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div style={{width: 76, height: 76, position: 'relative', flexShrink: 0}}>
            <Icon name="triangle-alert" x={0} y={0} size={76} color={PURPLE} sw={2.8} />
          </div>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 44, letterSpacing: 0.5, color: PURPLE, lineHeight: 1.14}}>
            UNLICENSED
            <br />
            INVESTMENT SCHEMES
          </span>
        </div>
      </div>

      {/* 归属：这个判断来自公司本身 */}
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 186, 18)}}>
        <CText cx={960} cy={700} size={26} weight={700} color={GREY} letterSpacing={3.4}>
          AS SUSPECTED BY THE COMPANY
        </CText>
      </div>
    </>
  );
};
