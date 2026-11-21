import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, ORANGE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Icon} from '../../icons';

/**
 * 两根对比条：上方是从前、下方是现在，条长按百分比。
 * 数字用 FONT_HEAVY，条体用橙红（下降语义）。
 */
const BarCompare: React.FC<{
  n: number;
  title: string;
  note: string;
  from: number;
  to: number;
  fromLabel: string;
  toLabel: string;
  delay?: number;
  maxW?: number;
}> = ({n, title, note, from, to, fromLabel, toLabel, delay = 20, maxW = 900}) => {
  const t = Math.min(1, Math.max(0, (n - delay) / 28));
  const e = 1 - Math.pow(1 - t, 3);
  const wFrom = (from / 60) * maxW;
  const wTo = (to / 60) * maxW;

  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 348, width: 1920, display: 'flex', justifyContent: 'center', gap: 22, opacity: fadeIn(n - 2, 14)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 56, letterSpacing: 1, color: WHITE}}>{title}</span>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: GREY, alignSelf: 'flex-end', paddingBottom: 10}}>{note}</span>
      </div>

      {/* 从前 */}
      <div style={{position: 'absolute', left: 510, top: 456, opacity: fadeIn(n - delay, 16)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{width: 900 * e, height: 54, background: 'rgba(255,255,255,0.2)', maxWidth: wFrom}} />
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 54, color: WHITE, fontVariantNumeric: 'tabular-nums'}}>{fromLabel}</span>
        </div>
      </div>

      {/* 现在 */}
      <div style={{position: 'absolute', left: 510, top: 552, opacity: fadeIn(n - delay - 22, 18)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{width: Math.max(8, wTo * e), height: 54, background: ORANGE}} />
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 54, color: ORANGE, fontVariantNumeric: 'tabular-nums'}}>{toLabel}</span>
        </div>
      </div>

      {/* 下降箭头 */}
      <div style={{position: 'absolute', left: 448, top: 470, opacity: fadeIn(n - delay - 40, 16)}}>
        <div style={{width: 52, height: 52, position: 'relative'}}>
          <Icon name="trending-down" x={0} y={0} size={52} color={ORANGE} sw={3} />
        </div>
      </div>
    </>
  );
};

/**
 * C24a —— 印刷媒体从 45% 塌到 14%（294.909–299.633s / 帧 8848–8989）
 * 念白：Print has collapsed since 2017 from 45 percent to 14 percent
 */
const F0 = 8848;

export const C24a: React.FC = () => {
  const frame = useCurrentFrame();
  const n = frame;
  return (
    <>
      <BarCompare n={n} title="PRINT" note="SINCE 2017" from={45} to={14} fromLabel="45%" toLabel="14%" delay={26} />
    </>
  );
};

/**
 * C24b —— 电视从 54% 降到 36%（299.633–305.167s / 帧 8990–9145）
 * 念白：Television has also declined from 54 percent to 36 percent over the past decade
 */
const F0B = 8990;

export const C24b: React.FC = () => {
  const frame = useCurrentFrame();
  const n = frame;
  return (
    <>
      <BarCompare n={n} title="TELEVISION" note="OVER THE PAST DECADE" from={54} to={36} fromLabel="54%" toLabel="36%" delay={26} maxW={820} />
    </>
  );
};

/**
 * C24c —— 在线新闻稳步上升（305.167–308.909s / 帧 9146–9267）
 * 念白：Online news and social media for news have risen steadily since 2024
 *
 * 上升不写具体数字（念白没给），只画一条上行的折线 + 年份区间。
 */
const F0C = 9146;

export const C24c: React.FC = () => {
  const frame = useCurrentFrame();
  const n = frame;

  const p = Math.min(1, Math.max(0, (n - 26) / 40));
  const pts = [
    [0, 150],
    [140, 132],
    [280, 106],
    [420, 74],
    [560, 28],
  ];
  const shown = pts.slice(0, Math.max(2, Math.ceil(p * pts.length)));

  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 300, width: 1920, display: 'flex', justifyContent: 'center', gap: 26, opacity: fadeIn(n - 2, 14)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 56, letterSpacing: 1, color: WHITE}}>ONLINE NEWS & SOCIAL MEDIA</span>
      </div>

      <div style={{position: 'absolute', left: 0, top: 388, width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(n - 40, 18)}}>
        <svg width={600} height={220} viewBox="0 0 600 220" fill="none">
          <polyline
            points={shown.map(([x, y]) => `${x + 20},${y}`).join(' ')}
            stroke={PURPLE}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {shown.map(([x, y], i) => (
            <circle key={i} cx={x + 20} cy={y} r={i === shown.length - 1 ? 9 : 6} fill={i === shown.length - 1 ? PURPLE : '#0A0A0C'} stroke={PURPLE} strokeWidth={3} />
          ))}
          <line x1={20} y1={190} x2={580} y2={190} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
        </svg>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 76, 18)}}>
        <CText cx={960} cy={676} size={40} weight={900} color={PURPLE} letterSpacing={2.6}>
          RISEN STEADILY SINCE 2024
        </CText>
      </div>
    </>
  );
};
