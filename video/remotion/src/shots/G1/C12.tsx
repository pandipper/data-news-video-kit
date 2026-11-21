import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';

/**
 * C12 —— 政府给的三点理由（122.158–130.958s / 帧 3666–3929）
 * 念白：The government has said that with the rapid expansion of digital media,
 *       the Act will enhance the protection of children, prevent online scams,
 *       and help in combating fraud
 *
 * 画面关系取自 a2e 模式表「两组并列清单」的三栏变体：
 * 三条理由按念白词边界依次入场（children@3827 / scams@3870 / fraud@3918），
 * 每条一个图标，图标与文字行内对齐。三栏都带政府归属（画面顶端声明），不让它读成旁白结论。
 */
const F0 = 3666;

type Reason = {label: string; at: number; icon: 'shield' | 'ban' | 'triangle-alert'};

const REASONS: Reason[] = [
  {label: 'PROTECT CHILDREN', at: 3827, icon: 'shield'},
  {label: 'STOP ONLINE SCAMS', at: 3870, icon: 'ban'},
  {label: 'COMBAT FRAUD', at: 3918, icon: 'triangle-alert'},
];

export const C12: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickOp = fadeIn(n - 4, 14);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: kickOp}}>
        <CText cx={960} cy={264} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          THE GOVERNMENT SAYS
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 320, width: 1920, display: 'flex', justifyContent: 'center', gap: 24}}>
        <Pressed n={n} delay={16} size={84} text="THE" color={GREY} />
        <Pressed n={n} delay={22} size={84} text="ACT" color={GREY} />
        <Pressed n={n} delay={30} size={84} text="WILL" color={GREY} />
      </div>

      {/* 三条理由：纵向堆叠，每条按念白入场 */}
      <div style={{position: 'absolute', left: 660, top: 496, width: 660, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 26}}>
        {REASONS.map((r, i) => {
          const t = Math.min(1, Math.max(0, (n - (r.at - F0)) / 14));
          if (t <= 0) return null;
          const e = 1 - Math.pow(1 - t, 3);
          return (
            <div
              key={r.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 30,
                opacity: e,
                transform: `translateX(${(1 - e) * 24}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_HEAVY,
                  fontWeight: 900,
                  fontSize: 22,
                  letterSpacing: 2,
                  color: PURPLE,
                  width: 34,
                }}
              >
                {`0${i + 1}`}
              </span>
              <div style={{width: 68, height: 68, position: 'relative', flexShrink: 0}}>
                <Icon name={r.icon} x={0} y={0} size={68} color={PURPLE} sw={2.6} glow />
              </div>
              <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 62, letterSpacing: 0.5, color: WHITE, whiteSpace: 'nowrap'}}>
                {r.label}
              </span>
            </div>
          );
        })}
      </div>

    </>
  );
};
