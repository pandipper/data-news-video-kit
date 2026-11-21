import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C16 —— 十多年的储备（175.822–180.942s / 帧 5276–5428）
 * 念白：The funds represented a significant part of the company's reserves,
 *       built up over more than a decade
 *
 * 第 3 章收束。用一条十格刻度带把「more than a decade」变成可见的长度，
 * 与 C05 的 26 格刻度带同族但更短、更密（十年 vs 数十年）。
 */
const F0 = 5276;
const TO = 5452; // 接到第 4 章章节卡（5451）之前

const TICKS = 11;

export const C16: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const headOp = fadeIn(n - 4, 14);
  const bandT = Math.min(1, Math.max(0, (n - 34) / 32));

  return (
    <div style={{opacity: 1}}>
      <div style={{position: 'absolute', inset: 0, opacity: headOp}}>
        <CText cx={960} cy={300} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          A SIGNIFICANT PART OF THE COMPANY'S RESERVES
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 366, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={22} size={112} text="BUILT UP OVER" color={GREY} />
      </div>

      <div style={{position: 'absolute', left: 0, top: 472, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
        <Pressed n={n} delay={44} size={112} text="MORE THAN A DECADE" color={WHITE} />
        <IconCue inline N={N} word="decade" icon="hourglass" size={92} color={PURPLE} sw={2.8} glow after={F0} from="up" />
      </div>

      {/* 十格刻度带：一年一格，把「十几年」变成可见长度 */}
      <div style={{position: 'absolute', left: 510, top: 656, width: 900, height: 52, opacity: fadeIn(n - 34, 18)}}>
        {Array.from({length: TICKS}).map((_, i) => {
          const x = (i / (TICKS - 1)) * 900;
          const on = (i / (TICKS - 1)) <= bandT;
          const last = i === TICKS - 1;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x - 2,
                top: 0,
                width: last ? 6 : 4,
                height: last ? 52 : 32,
                background: on ? (last ? WHITE : PURPLE) : 'rgba(255,255,255,0.14)',
                opacity: on ? (last ? 1 : 0.82) : 1,
              }}
            />
          );
        })}
      </div>

    </div>
  );
};
