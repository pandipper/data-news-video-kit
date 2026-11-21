import React from 'react';
import {WHITE} from '../ui';
import {FONT_HEAVY} from '../common';

/**
 * 逐词压印：scale 1.28→1 + blur 7px→0 + 淡入，delay 按词序错开。
 * 语言取自 shotcraft `paper-title-card`（letterpress 压印配方：scale 起点 1.28 是「压印」读感的甜点）。
 * 用法：<Pressed n={n} delay={8} size={150} text="ARRESTED" />
 */
export const Pressed: React.FC<{n: number; delay: number; size: number; text: string; color?: string; len?: number}> = ({
  n,
  delay,
  size,
  text,
  color = WHITE,
  len = 9,
}) => {
  const t = Math.min(1, Math.max(0, (n - delay) / len));
  if (t <= 0) return null;
  const e = 1 - Math.pow(1 - t, 3); // 近似 bezier(0.2,0.75,0.3,1)
  return (
    <span
      style={{
        fontFamily: FONT_HEAVY,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        color,
        letterSpacing: -1.5,
        display: 'inline-block',
        opacity: e,
        transform: `scale(${(1.28 - 0.28 * e).toFixed(3)})`,
        filter: `blur(${((1 - e) * 7).toFixed(2)}px)`,
        transformOrigin: '0% 60%',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
};
