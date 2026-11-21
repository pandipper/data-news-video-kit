import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, ORANGE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Icon} from '../../icons';

/**
 * C25 —— 信任度四年下滑（309.693–327.053s / 帧 9292–9812）
 * 念白：Peaking at 41 percent in 2021, trust in news stood at 40 percent in 2023,
 *       likely reflecting optimism around a new reformist government, stabilised at
 *       37 percent for two consecutive years, but dropped significantly to 30 percent
 *       this year as the optimism appears to have waned
 *
 * 折线图：四个点按念白节奏逐个落下，最后一段用橙红（显著下跌）。
 * 横轴标签只用念白原话（2021 / 2023 / TWO YEARS / THIS YEAR），不自行补年份。
 */
const F0 = 9292;

// y = 400 - (v - 28) * 23.5，保证 30-42 落在 0-400 的图区内
const yOf = (v: number) => 400 - (v - 28) * 23.5;

const PTS: Array<{v: number; x: number; y: number; label: string; at: number}> = [
  {v: 41, x: 430, y: yOf(41), label: '2021', at: 9304},
  {v: 40, x: 790, y: yOf(40), label: '2023', at: 9409},
  {v: 37, x: 1150, y: yOf(37), label: 'TWO YEARS', at: 9611},
  {v: 30, x: 1510, y: yOf(30), label: 'THIS YEAR', at: 9733},
];

export const C25: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const headOp = fadeIn(n - 2, 14);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: headOp}}>
        <CText cx={960} cy={238} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          TRUST IN NEWS
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 292, width: 1920, display: 'flex', justifyContent: 'center'}}>
        <svg width={1740} height={520} viewBox="0 0 1740 520" fill="none">
          {/* 基线 */}
          <line x1={380} y1={404} x2={1580} y2={404} stroke="rgba(255,255,255,0.16)" strokeWidth={2} />

          {/* 折线：分段绘制，末段橙红 */}
          {PTS.slice(1).map((p, i) => {
            const prev = PTS[i];
            const t = Math.min(1, Math.max(0, (n - (p.at - F0)) / 18));
            if (t <= 0) return null;
            const x2 = prev.x + (p.x - prev.x) * t;
            const y2 = prev.y + (p.y - prev.y) * t;
            const last = i === PTS.length - 2;
            return (
              <line
                key={i}
                x1={prev.x}
                y1={prev.y}
                x2={x2}
                y2={y2}
                stroke={last ? ORANGE : PURPLE}
                strokeWidth={5}
                strokeLinecap="round"
                opacity={0.92}
              />
            );
          })}

          {/* 点与数值 */}
          {PTS.map((p, i) => {
            const t = Math.min(1, Math.max(0, (n - (p.at - F0)) / 14));
            if (t <= 0) return null;
            const e = 1 - Math.pow(1 - t, 3);
            const last = i === PTS.length - 1;
            return (
              <g key={i} opacity={e}>
                <circle cx={p.x} cy={p.y} r={last ? 13 : 9} fill={last ? ORANGE : '#0A0A0C'} stroke={last ? ORANGE : PURPLE} strokeWidth={3} />
                <text
                  x={p.x}
                  y={p.y - 32}
                  textAnchor="middle"
                  fill={last ? ORANGE : WHITE}
                  style={{fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 900, fontSize: 52, fontVariantNumeric: 'tabular-nums'}}
                >
                  {p.v}
                </text>
              </g>
            );
          })}

          {/* 横轴标签 */}
          {PTS.map((p, i) => {
            const t = Math.min(1, Math.max(0, (n - (p.at - F0) - 6) / 14));
            if (t <= 0) return null;
            return (
              <text
                key={i}
                x={p.x}
                y={476}
                textAnchor="middle"
                fill={i === PTS.length - 1 ? ORANGE : GREY}
                opacity={t}
                style={{fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: 2}}
              >
                {p.label}
              </text>
            );
          })}
        </svg>
      </div>

    </>
  );
};

/**
 * C26 —— 广播品牌仍然最受信任（327.405–331.085s / 帧 9823–9933）
 * 念白：Broadcast brands, led by Astro Awani, remain the most trusted
 *
 * 收束前的一记落点：不写数字（念白没给），只把结论与品牌立住。
 */
const F0B = 9823;

export const C26: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const t1 = fadeIn(n - 4, 16);
  const t2 = fadeIn(n - 52, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: t1}}>
        <CText cx={960} cy={318} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          BROADCAST BRANDS REMAIN
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 384, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34}}>
        <div style={{width: 92, height: 92, position: 'relative', flexShrink: 0}}>
          <Icon name="badge-check" x={0} y={0} size={92} color={PURPLE} sw={2.8} glow />
        </div>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 108, letterSpacing: 1, color: WHITE}}>THE MOST TRUSTED</span>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: t2}}>
        <CText cx={960} cy={566} size={34} weight={800} color={GREY} letterSpacing={4}>
          LED BY
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 614, width: 1920, display: 'flex', justifyContent: 'center', opacity: t2}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 82, letterSpacing: 2, color: PURPLE}}>ASTRO AWANI</span>
      </div>
    </>
  );
};

/**
 * C27 —— 收尾（331.729–332.929s / 帧 9953–9988）
 * 念白：Thank you for your listening
 *
 * 全片最后一句话，只占 1.2 秒，随后交给片尾压黑与署名卡（覆盖层处理）。
 * 画面刻意克制：一行字，一个落款，不铺任何图元。
 */
const F0C = 9953;

export const C27: React.FC = () => {
  const frame = useCurrentFrame();
  const n = frame;

  const t = fadeIn(n, 14);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: t}}>
        <CText cx={960} cy={470} size={72} weight={900} color={WHITE} letterSpacing={2}>
          THANK YOU FOR LISTENING
        </CText>
      </div>
      <div style={{position: 'absolute', left: 960 - 90, top: 578, width: 180 * Math.min(1, Math.max(0, (n - 8) / 18)), height: 2, background: PURPLE}} />
    </>
  );
};
