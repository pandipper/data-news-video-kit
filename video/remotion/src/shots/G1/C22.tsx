import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, ORANGE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';

/**
 * 下跌数字组件：数字用白、符号与箭头用橙红（ORANGE），不引入新色系。
 * 全片只有白/灰/琥珀/橙红四色，橙红专用于「下降 / 损失」语义。
 */
const Drop: React.FC<{n: number; value: string; label: string; delay?: number; size?: number}> = ({n, value, label, delay = 20, size = 210}) => {
  const t = Math.min(1, Math.max(0, (n - delay) / 22));
  const e = 1 - Math.pow(1 - t, 3);
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 348, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 12}}>
        <span
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: size,
            lineHeight: 1,
            color: ORANGE,
            opacity: t,
            transform: `translateY(${((1 - e) * 24).toFixed(1)}px)`,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </span>
      </div>
      <div style={{position: 'absolute', left: 0, top: 566, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, opacity: fadeIn(n - delay - 42, 18)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 38, letterSpacing: 2.6, color: WHITE}}>{label}</span>
        <div style={{width: 56, height: 56, position: 'relative', flexShrink: 0}}>
          <Icon name="trending-down" x={0} y={0} size={56} color={ORANGE} sw={2.8} />
        </div>
      </div>
    </>
  );
};

/**
 * C22a —— 总广告支出 2025 年降 22%（258.545–263.100s / 帧 7757–7893）
 * 念白：Total advertising expenditure declined by 22 percent in 2025
 */
const F0 = 7757;

export const C22a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={266} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          TOTAL ADVERTISING EXPENDITURE
        </CText>
      </div>
      <Drop n={n} value="-22%" label="DECLINED IN 2025" />
    </>
  );
};

/**
 * C22b —— 2026 年预计再降 9.5%（263.100–267.100s / 帧 7899–8013）
 * 念白：and is expected to shrink a further 9.5 percent in 2026
 *
 * 9.5% 按锁定稿写，绝不写成 95。
 */
const F0B = 7899;

export const C22b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={266} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          EXPECTED TO SHRINK FURTHER
        </CText>
      </div>
      <Drop n={n} value="-9.5%" label="EXPECTED IN 2026" />
    </>
  );
};

/**
 * C22c —— 数字广告 2025 年骤降 39%（267.100–276.385s / 帧 8014–8292）
 * 念白：Digital advertising expenditure plunged 39 percent in 2025 amid intensifying
 *       competition from social media, search engines and live commerce platforms
 *
 * 三段竞争来源在下方依次入场，不占主视觉。
 */
const F0C = 8014;

const RIVALS: Array<{label: string; at: number; icon: 'message-square' | 'globe' | 'layout-grid'}> = [
  {label: 'SOCIAL MEDIA', at: 8199, icon: 'message-square'},
  {label: 'SEARCH ENGINES', at: 8228, icon: 'globe'},
  {label: 'LIVE COMMERCE', at: 8257, icon: 'layout-grid'},
];

export const C22c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0C;
  const n = N - F0C;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={252} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          DIGITAL ADVERTISING EXPENDITURE
        </CText>
      </div>

      <Drop n={n} value="-39%" label="PLUNGED IN 2025" />

      <div style={{position: 'absolute', left: 0, top: 672, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26, opacity: fadeIn(n - 170, 18)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: GREY}}>COMPETITION FROM</span>
      </div>

      <div style={{position: 'absolute', left: 0, top: 738, width: 1920, display: 'flex', justifyContent: 'center', gap: 40}}>
        {RIVALS.map((r) => {
          const t = Math.min(1, Math.max(0, (n - (r.at - F0C)) / 14));
          if (t <= 0) return null;
          const e = 1 - Math.pow(1 - t, 3);
          return (
            <div key={r.label} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: e, transform: `translateY(${(1 - e) * 14}px)`}}>
              <div style={{width: 40, height: 40, position: 'relative', flexShrink: 0}}>
                <Icon name={r.icon} x={0} y={0} size={40} color={GREY} sw={2.4} />
              </div>
              <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 26, letterSpacing: 2.4, color: WHITE, whiteSpace: 'nowrap'}}>{r.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
