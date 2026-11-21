import React from 'react';

/**
 * 印刷质感层：半色调网点 + 轻噪点，叠在真图之上，把低分辨率新闻截图压成「新闻纸 / 传真件」。
 *
 * 参数取 shotcraft `paper-title-card` 与 `document-typewriter-reveal` 的纸墨语言：
 *  - 网点：等距圆点阵，读作 halftone 印刷；用 multiply 压暗，只压 12-16%，避免糊成黑块
 *  - 噪点：与 common/DotFieldBg.tsx 同源的 feTurbulence，叠加时用 overlay 提升质感而不是灰化
 *  - 原图先提对比、降饱和，避免社媒卡的高饱和 UI 色把暗底画面打散
 *
 * 用法：把目标图放在 <div style={{position:'relative'}}> 里，然后叠 <PrintGrain />。
 */
export const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>\")";

/** 半色调网点覆盖层：铺满父容器 */
export const Halftone: React.FC<{dot?: number; opacity?: number; color?: string}> = ({dot = 4.5, opacity = 0.3, color = '#ffffff'}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      mixBlendMode: 'overlay',
      opacity,
      backgroundImage: `radial-gradient(circle, ${color} 1.05px, rgba(0,0,0,0) 1.35px)`,
      backgroundSize: `${dot}px ${dot}px`,
      backgroundPosition: '0 0',
    }}
  />
);

/** 轻噪点覆盖层 */
export const Grain: React.FC<{opacity?: number; scale?: number}> = ({opacity = 0.07, scale = 1}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      mixBlendMode: 'overlay',
      opacity,
      backgroundImage: GRAIN_URL,
      backgroundSize: `${Math.round(180 * scale)}px ${Math.round(180 * scale)}px`,
    }}
  />
);

/** 真图的印刷化处理：提对比、降饱和，让不同来源的截图落在同一个色域里 */
export const PRINT_FILTER = 'contrast(1.12) saturate(0.58) brightness(1.05)';
