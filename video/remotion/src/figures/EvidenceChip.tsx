import React from 'react';
import {Img, staticFile} from 'remotion';
import {PURPLE, WHITE, GREY, fadeIn} from '../ui';
import {FONT_HEAVY} from '../common';
import {Halftone, Grain, PRINT_FILTER} from '../texture';

/**
 * 证据截图卡（EvidenceChip）：把新闻截图缩小成画面里的「证据块」，不是全屏主角。
 *
 * 语言来自 shotcraft `document-typewriter-reveal` 的悬浮窗口规格（圆角、亮边、长投影、不铺满）
 * 与 `paper-title-card` 的纸墨配色（暖白纸边），真图之上叠半色调网点 + 轻噪点，读作新闻纸 / 传真件。
 *
 * 三条硬约束：
 *  1. 全片只允许这一处投影（规范：证据卡白边 + 唯一投影）
 *  2. 显示宽 ≤ 源图宽 × 1.2 —— 本片所有截图都是缩小使用，不存在放大糊边
 *  3. 机构名放卡外左上 tab，日期放卡右下角，出处与图始终同框
 */
export type EvidenceChipProps = {
  N: number;
  f0: number;
  /** public 下的相对路径 */
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  org: string;
  dateLabel: string;
  /** 微倾角，多张时错开；-1.5 ~ 1.5 */
  tilt?: number;
  /** 入场帧数，默认 12（配方：12f 淡入 + scale 1.06→1 + blur 6→0） */
  enter?: number;
};

const PAPER = '#EFEBE0'; // 暖白纸边（paper-title-card 的纸底同族）

export const EvidenceChip: React.FC<EvidenceChipProps> = ({N, f0, src, x, y, w, h, org, dateLabel, tilt = 0, enter = 12}) => {
  const n = N - f0;
  if (n < 0) return null;
  const op = fadeIn(n, enter);
  const t = Math.min(1, n / enter);
  const sc = 1.06 - 0.06 * t;
  const blur = (1 - t) * 6;
  const BEZEL = 10;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        opacity: op,
        transform: `rotate(${tilt}deg) scale(${sc.toFixed(3)})`,
        transformOrigin: '50% 60%',
        filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : undefined,
      }}
    >
      {/* 出处 tab：挂在卡外左上，机构 + 日期合并成一条，保证出处与图同框且不压图面 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: -44,
          height: 38,
          padding: '0 16px',
          background: PURPLE,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: FONT_HEAVY,
          fontWeight: 900,
          fontSize: 25,
          letterSpacing: 2.5,
          color: '#0A0A0C',
          whiteSpace: 'nowrap',
        }}
      >
        {org}
        <span style={{width: 2, height: 20, background: 'rgba(10,10,12,0.45)'}} />
        <span style={{fontWeight: 700, letterSpacing: 1.8}}>{dateLabel}</span>
      </div>

      {/* 纸边卡 + 唯一投影 */}
      <div
        style={{
          width: w,
          height: h,
          background: PAPER,
          padding: BEZEL,
          boxSizing: 'border-box',
          boxShadow: '0 22px 54px rgba(0,0,0,0.62)',
          borderRadius: 3,
        }}
      >
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 1, background: PAPER}}>
          <Img
            src={staticFile(src)}
            style={{width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: PRINT_FILTER}}
          />
          <Halftone />
          <Grain />
        </div>
      </div>
    </div>
  );
};

/**
 * 引用块（QuoteBlock）：带归属行的引语，用于「某机构说了什么」的拍子。
 * unnecessary and punitive 这类表态必须带归属，不能写成旁白结论。
 * text 里的 `|` 表示强制换行（引语分两行才有分量）；accent 传小写词，命中即上琥珀色。
 */
export const QuoteBlock: React.FC<{
  x: number;
  y: number;
  w: number;
  text: string;
  accent?: string[];
  by: string;
  sub?: string;
  size?: number;
  N: number;
  f0: number;
}> = ({x, y, w, text, accent = [], by, sub, size = 82, N, f0}) => {
  const n = N - f0;
  if (n < 0) return null;
  const op = fadeIn(n, 14);
  const words = text.split(' ');
  const byOp = fadeIn(n - 18, 14);
  const subOp = fadeIn(n - 30, 14);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, opacity: op}}>
      <div style={{width: 6, height: 58, background: PURPLE}} />
      <div
        style={{
          marginTop: 28,
          fontFamily: FONT_HEAVY,
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.1,
          color: WHITE,
          letterSpacing: -1,
        }}
      >
        {words.map((wt, i) => {
          if (wt === '|') return <br key={i} />;
          const key = wt.replace(/[^a-zA-Z]/g, '').toLowerCase();
          return (
            <span key={i} style={{color: accent.includes(key) ? PURPLE : WHITE}}>
              {wt}
              {i < words.length - 1 && words[i + 1] !== '|' ? ' ' : ''}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 34,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontFamily: FONT_HEAVY,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 2.6,
          color: GREY,
          opacity: byOp,
        }}
      >
        <span style={{width: 52, height: 2, background: GREY, display: 'inline-block'}} />
        {by}
      </div>
      {sub ? (
        <div
          style={{
            marginTop: 22,
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 40,
            letterSpacing: 2,
            color: WHITE,
            opacity: subOp,
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};
