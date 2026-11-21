import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, ORANGE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';

/**
 * C23a —— AI 加剧了这些压力（277.007–280.467s / 帧 8311–8413）
 * 念白：Artificial intelligence has allegedly compounded these pressures
 *
 * 注意 allegedly —— 这是「据称」，不是断言。画面必须保留这层语义。
 */
const F0 = 8311;

export const C23a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 316, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, opacity: fadeIn(n - 2, 14)}}>
        <div style={{width: 96, height: 96, position: 'relative', flexShrink: 0}}>
          <Icon name="bot" x={0} y={0} size={96} color={PURPLE} sw={2.8} glow />
        </div>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 82, letterSpacing: 1, color: WHITE}}>ARTIFICIAL INTELLIGENCE</span>
      </div>

      <div style={{position: 'absolute', left: 0, top: 470, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={44} size={88} text="HAS COMPOUNDED" color={GREY} />
      </div>

      <div style={{position: 'absolute', left: 0, top: 578, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={62} size={88} text="THESE PRESSURES" color={ORANGE} />
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 92, 18)}}>
        <CText cx={960} cy={716} size={26} weight={800} color={GREY} letterSpacing={5}>
          ALLEGEDLY · NOT ESTABLISHED
        </CText>
      </div>
    </>
  );
};

/**
 * C23b —— 三家中文报的母公司（280.467–288.200s / 帧 8414–8646）
 * 念白：with Media Chinese International Limited, parent company of the main
 *       Chinese-language media, Sin Chew Daily, China Press and Nanyang Siang Pau
 *
 * 报头用文字排版，不贴第三方 logo（与 C11c 的处理一致，避免暗示背书）。
 */
const F0B = 8414;

const PAPERS = ['SIN CHEW DAILY', 'CHINA PRESS', 'NANYANG SIANG PAU'];

export const C23b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const headOp = fadeIn(n - 2, 14);
  const rowOp = fadeIn(n - 150, 20);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: headOp}}>
        <CText cx={960} cy={332} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          PARENT COMPANY OF THE MAIN CHINESE-LANGUAGE MEDIA
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 392, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={20} size={88} text="MEDIA" />
        <Pressed n={n} delay={30} size={88} text="CHINESE" />
        <Pressed n={n} delay={40} size={88} text="INTERNATIONAL" color={PURPLE} />
      </div>

      {/* 三个报头：竖排并列，像报摊上的三份报纸 */}
      <div style={{position: 'absolute', left: 0, top: 556, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 56, opacity: rowOp}}>
        {PAPERS.map((p, i) => {
          const t = Math.min(1, Math.max(0, (n - 150 - i * 18) / 16));
          const e = 1 - Math.pow(1 - t, 3);
          return (
            <div
              key={p}
              style={{
                opacity: e,
                transform: `translateY(${(1 - e) * 18}px)`,
                borderTop: `3px solid ${i === 0 ? PURPLE : 'rgba(255,255,255,0.3)'}`,
                paddingTop: 16,
                width: 300,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <div style={{width: 34, height: 34, position: 'relative', flexShrink: 0}}>
                  <Icon name="newspaper" x={0} y={0} size={34} color={i === 0 ? PURPLE : GREY} sw={2.4} />
                </div>
                <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 24, letterSpacing: 1.4, color: WHITE, lineHeight: 1.24, whiteSpace: 'nowrap'}}>
                  {p}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

/**
 * C23c —— 裁员 44%（288.200–294.207s / 帧 8647–8826）
 * 念白：retrenching 44 percent of its workforce in mid 2025 as it integrated AI
 *       across its operations
 */
const F0C = 8647;

export const C23c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0C;
  const n = N - F0C;

  const numT = Math.min(1, Math.max(0, (n - 112) / 24));
  const e = 1 - Math.pow(1 - numT, 3);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={268} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          RETRENCHING ITS WORKFORCE
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 338, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, opacity: numT}}>
        <span
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 212,
            lineHeight: 1.06,
            letterSpacing: -5,
            color: ORANGE,
            transform: `translateY(${((1 - e) * 24).toFixed(1)}px)`,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          44%
        </span>
        <div style={{width: 96, height: 96, position: 'relative', flexShrink: 0}}>
          <IconCue N={N} word="retrenching" icon="scissors" x={0} y={0} size={96} color={ORANGE} sw={2.8} after={F0C} from="up" />
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 150, 18)}}>
        <CText cx={960} cy={628} size={40} weight={900} color={WHITE} letterSpacing={2.6}>
          OF ITS WORKFORCE · MID 2025
        </CText>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 168, 18)}}>
        <CText cx={960} cy={706} size={26} weight={700} color={GREY} letterSpacing={3.4}>
          AS IT INTEGRATED AI ACROSS ITS OPERATIONS
        </CText>
      </div>
    </>
  );
};
