import React from 'react';
import {Icon, type IconName} from '../icons';
import {PURPLE, WHITE} from '../ui';
import {WORD_FRAME} from '../common/wordtime';

/**
 * 词级图标 cue：念白念到某个词的那一帧，图标入场。
 *
 * 时间不靠手填秒数，直接查 common/wordtime.ts（由 build_timeline.py 从 831 词的对齐产物生成）。
 * 同一个词全片出现多次，用 after 限定「只取这一拍之后的那次」，避免拿到前一章的同一个词。
 *
 * 入场沿用 shotcraft paper-title-card 的压印配方：scale 1.28→1 + blur 7→0 + 方向位移 24px，12 帧。
 * 退场 8 帧淡出 + 反向位移 12px（hold 到点才有，不传则留到镜头结束）。
 *
 * 使用约束（用户 2026-11-20 定，按优先级）：
 *  1. 图标只贴在「画面上真实出现的那个词」旁边 —— 词在画面上，图标才在画面上。
 *     例：画面上有 ARRESTED，siren 就贴在它右缘；画面上没有的词不出图标。
 *  2. 没有具体实物可指代的抽象词不放图标（public / positions / departure / prospect 一律不用）。
 *     宁可这一拍没有图标，也不要为了「丰富画面」硬塞一个语义牵强的。
 *  3. 一镜最多 3 个 cue，多到 4 个就是图标雨。
 *  4. 入场轨迹不得穿过字幕带（y956 起），顶到 y930 为止。
 */
export type CueFrom = 'up' | 'down' | 'left' | 'right' | 'none';

export type IconCueProps = {
  /** 当前帧（镜头内已加 F0） */
  N: number;
  /** 触发词，大小写与标点都会被归一化 */
  word: string;
  icon: IconName;
  /** inline 模式下不需要 */
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  sw?: number;
  glow?: boolean;
  /** 入场方向，默认从下方浮上 */
  from?: CueFrom;
  /** 只取该帧之后的第一次出现，用来锁定段落 */
  after?: number;
  /** 相对词起点的帧偏移，负数表示提前露头 */
  offset?: number;
  /** 满态停留帧数；不传则留到镜头结束 */
  hold?: number;
  /** 入场帧数，默认 12 */
  enter?: number;
  opacity?: number;
  /**
   * 行内模式：不给绝对坐标，交给父级 flex 排版，图标与文字自动垂直居中对齐。
   * 用于「图标贴在某个词旁边」——绝对坐标会随手算出黏连或高低错位（用户 2026-11-20 反馈）。
   * 用 inline 时 x / y 不生效，父级用 display:flex + align-items:center + gap 控间距。
   */
  inline?: boolean;
  /** 额外样式，行内模式常用 marginTop 微调与文字基线的相对位置 */
  style?: React.CSSProperties;
};

const missing = new Set<string>();
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export const IconCue: React.FC<IconCueProps> = ({
  N,
  word,
  icon,
  x = 0,
  y = 0,
  size = 72,
  color = PURPLE,
  sw = 2.6,
  glow = false,
  from = 'up',
  after,
  offset = 0,
  hold,
  enter = 12,
  opacity = 1,
  inline = false,
  style,
}) => {
  const key = norm(word);
  const frames = WORD_FRAME[key];
  if (!frames || !frames.length) {
    if (!missing.has(key)) {
      missing.add(key);
      console.warn(`[IconCue] 词表里没有 "${word}"（归一化 "${key}"），该 cue 不渲染`);
    }
    return null;
  }
  const hit = after === undefined ? frames[0] : frames.find((f) => f >= after);
  if (hit === undefined) {
    if (!missing.has(key + '@' + after)) {
      missing.add(key + '@' + after);
      console.warn(`[IconCue] "${word}" 在帧 ${after} 之后没有出现`);
    }
    return null;
  }

  const start = hit + offset;
  const n = N - start;
  if (n < 0) return null;

  // 入场
  const t = Math.min(1, n / enter);
  const e = 1 - Math.pow(1 - t, 3);
  const sc = 1.28 - 0.28 * e;
  const blur = (1 - e) * 7;
  const DIST = 24;
  let dx = 0;
  let dy = 0;
  if (from === 'left') dx = -DIST * (1 - e);
  if (from === 'right') dx = DIST * (1 - e);
  if (from === 'up') dy = DIST * (1 - e);
  if (from === 'down') dy = -DIST * (1 - e);

  // 退场
  let outOp = 1;
  if (hold !== undefined) {
    const n2 = n - (enter + hold);
    if (n2 > 0) {
      const k = Math.min(1, n2 / 8);
      outOp = 1 - k;
      dx += (from === 'left' ? -12 : from === 'right' ? 12 : 0) * k;
      dy += (from === 'up' ? -12 : from === 'down' ? 12 : 0) * k;
    }
  }

  const op = opacity * e * outOp;
  if (op <= 0.002) return null;

  const pos: React.CSSProperties = inline
    ? {position: 'relative', display: 'inline-block', flexShrink: 0, width: size, height: size}
    : {position: 'absolute', left: x, top: y};

  return (
    <div
      style={{
        ...pos,
        transform: `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${sc.toFixed(3)})`,
        transformOrigin: '50% 50%',
        opacity: op,
        filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : undefined,
        ...style,
      }}
    >
      <Icon name={icon} x={0} y={0} size={size} color={color} sw={sw} glow={glow} />
    </div>
  );
};

/**
 * 图标 + 文字咬合单元：图标在左、短标签在右，水平居中对齐。
 * 用于「词 + 图标」需要一起读的场合（如 JANUARY · 日历图标）。
 */
export const CueLabel: React.FC<{
  N: number;
  word: string;
  icon: IconName;
  /** inline 模式下不需要 */
  x?: number;
  y?: number;
  label: string;
  size?: number;
  color?: string;
  labelColor?: string;
  labelSize?: number;
  after?: number;
  offset?: number;
  hold?: number;
  opacity?: number;
}> = ({N, word, icon, x, y, label, size = 36, color = PURPLE, labelColor = WHITE, labelSize = 26, after, offset, hold, opacity = 1}) => {
  const key = norm(word);
  const frames = WORD_FRAME[key];
  if (!frames || !frames.length) {
    if (!missing.has(key)) {
      missing.add(key);
      console.warn(`[CueLabel] 词表里没有 "${word}"`);
    }
    return null;
  }
  const hit = after === undefined ? frames[0] : frames.find((f) => f >= after);
  if (hit === undefined) return null;
  const n = N - (hit + (offset ?? 0));
  if (n < 0) return null;

  const t = Math.min(1, n / 12);
  const e = 1 - Math.pow(1 - t, 3);
  let outOp = 1;
  if (hold !== undefined) {
    const n2 = n - (12 + hold);
    if (n2 > 0) outOp = 1 - Math.min(1, n2 / 8);
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: opacity * e * outOp,
        transform: `translateY(${((1 - e) * 12).toFixed(2)}px)`,
      }}
    >
      <Icon name={icon} x={0} y={0} size={size} color={color} sw={2.4} />
      {label ? (
        <span
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 900,
            fontSize: labelSize,
            letterSpacing: 2.4,
            color: labelColor,
            whiteSpace: 'nowrap',
            marginTop: 2,
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};
