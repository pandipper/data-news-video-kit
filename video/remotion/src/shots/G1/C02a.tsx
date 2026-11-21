import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C02a —— 悖论（8.560–13.680s / 帧 258–408）
 * 念白：Malaysia's contemporary media landscape is currently characterised by a sharp paradox
 *
 * 画面关系取自 a2e 模式表「取舍 / 权衡 → 天平」的变体：两条水平线从左右两端向中央生长、
 * 在 PARADOX 两侧停住不接触 —— 「对冲」而不是「汇合」，正是悖论的形状。
 */
const F0 = 258;
const TO = 408;

export const C02a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const subOp = fadeIn(n - 6, 16);
  const lineL = Math.min(1, Math.max(0, (n - 20) / 30)) * 580;
  const lineR = Math.min(1, Math.max(0, (n - 26) / 30)) * 580;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      {/* 顶标签按念白逐词浮现（258 / 272 / 291 / 301），避免开场三秒只有一个静态行 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 312,
          width: 1920,
          display: 'flex',
          justifyContent: 'center',
          gap: 18,
          fontFamily: FONT_HEAVY,
          fontWeight: 800,
          fontSize: 36,
          letterSpacing: 6,
          color: GREY,
        }}
      >
        {[
          ['MALAYSIA\u2019S', 0],
          ['CONTEMPORARY', 14],
          ['MEDIA', 33],
          ['LANDSCAPE', 43],
        ].map(([w, d]) => {
          const t = Math.min(1, Math.max(0, (n - (d as number)) / 12));
          return (
            <span key={w as string} style={{opacity: t, transform: `translateY(${(1 - t) * 10}px)`}}>
              {w as string}
            </span>
          );
        })}
      </div>

      {/* 两条对冲线：各自从画外生长、在中央留下缺口，「对冲」而不是「汇合」 */}
      <div style={{position: 'absolute', left: 200, top: 540, width: lineL, height: 3, background: PURPLE, opacity: 0.72}} />
      <div style={{position: 'absolute', left: 1720 - lineR, top: 540, width: lineR, height: 3, background: PURPLE, opacity: 0.72}} />
      <div style={{position: 'absolute', left: 200 + lineL, top: 522, width: 3, height: 39, background: PURPLE, opacity: lineL > 500 ? 1 : 0}} />
      <div style={{position: 'absolute', left: 1720 - lineR - 3, top: 522, width: 3, height: 39, background: PURPLE, opacity: lineR > 500 ? 1 : 0}} />

      <div style={{position: 'absolute', left: 0, top: 404, width: 1920, display: 'flex', justifyContent: 'center', gap: 30}}>
        <Pressed n={n} delay={105} size={104} text="A SHARP" color="#CFCFD4" />
        <Pressed n={n} delay={117} size={104} text="PARADOX" color={WHITE} />
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 96, 16)}}>
        <CText cx={960} cy={626} size={34} weight={700} color={GREY} letterSpacing={4}>
          TWO FORCES PULLING THE SAME STORY APART
        </CText>
      </div>

      {/* scale 天平贴 PARADOX 右下 */}
      <IconCue N={N} word="paradox" icon="scale" x={1452} y={396} size={96} color={PURPLE} sw={2.8} glow after={F0} from="up" />
    </div>
  );
};
