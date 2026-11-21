import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Icon, type IconName} from './icons';
import {PURPLE, GREY, WHITE} from './ui';
import {FONT_HEAVY} from './common';

/**
 * 图标探针：一帧看全，验收语义、造型、线宽。
 * 不参与正片，独立 composition（IconProbeA / IconProbeB）。
 * 照 lessons.md:175 的做法：派单前先探针渲图元，一帧看完再批量用，零返工。
 *
 * 每格三档：大尺寸白线（造型）／小尺寸白线（缩小可辨）／小尺寸琥珀（入片强调态）。
 */

type Item = {name: IconName; label: string; beats: string};

/** A 页：语义最硬的 22 个（媒体与现场 / 法律与监管 / 文书与引语） */
const PAGE_A: Item[] = [
  {name: 'mic', label: 'MIC', beats: 'C06 C18 C19'},
  {name: 'camera', label: 'CAMERA', beats: 'C07 C09'},
  {name: 'newspaper', label: 'NEWSPAPER', beats: 'C14 C24'},
  {name: 'video', label: 'VIDEO', beats: 'C19'},
  {name: 'podcast', label: 'PODCAST', beats: 'C18 C19'},
  {name: 'radio', label: 'RADIO', beats: 'C20 C24'},
  {name: 'megaphone', label: 'MEGAPHONE', beats: 'C06 C13'},
  {name: 'headphones', label: 'HEADPHONES', beats: 'C18'},
  {name: 'message-square', label: 'COMMENT', beats: 'C19'},
  {name: 'gavel', label: 'GAVEL', beats: 'C10'},
  {name: 'shield', label: 'SHIELD', beats: 'C03 C11 C12'},
  {name: 'stamp', label: 'STAMP', beats: 'C04 C08 C13'},
  {name: 'scale', label: 'SCALE', beats: 'C02 C13'},
  {name: 'scroll', label: 'ACT', beats: 'C04'},
  {name: 'fingerprint', label: 'IDENTITY', beats: 'C03 C06'},
  {name: 'siren', label: 'POLICE', beats: 'C03 C06'},
  {name: 'lock', label: 'LOCK', beats: 'C11'},
  {name: 'eye-off', label: 'SUPPRESS', beats: 'C13'},
  {name: 'ban', label: 'BAN', beats: 'C12'},
  {name: 'file-text', label: 'DOCUMENT', beats: 'C04 C15'},
  {name: 'file-x', label: 'FORGERY', beats: 'C08'},
  {name: 'quote', label: 'QUOTE', beats: 'C13'},
];

/** B 页：辅助语义 26 个（数据 / 平台 / 人物 / 时间 / 风险） */
const PAGE_B: Item[] = [
  {name: 'chart-pie', label: 'SHARE', beats: 'C21'},
  {name: 'percent', label: 'PERCENT', beats: 'C17 C22 C25'},
  {name: 'trending-down', label: 'DECLINE', beats: 'C22'},
  {name: 'banknote', label: 'MONEY', beats: 'C10 C15'},
  {name: 'vault', label: 'RESERVES', beats: 'C16'},
  {name: 'briefcase', label: 'BUSINESS', beats: 'C21'},
  {name: 'layout-grid', label: 'PLATFORM', beats: 'C11'},
  {name: 'smartphone', label: 'MOBILE', beats: 'C09 C17 C24'},
  {name: 'tv', label: 'TV', beats: 'C20 C24'},
  {name: 'globe', label: 'ONLINE', beats: 'C24'},
  {name: 'cpu', label: 'TECH', beats: 'C23'},
  {name: 'bot', label: 'AI', beats: 'C23'},
  {name: 'user', label: 'PERSON', beats: 'C20 C21'},
  {name: 'users', label: 'BOARD', beats: 'C04 C13'},
  {name: 'building-2', label: 'AGENCY', beats: 'C04 C11'},
  {name: 'landmark', label: 'GOVERNMENT', beats: 'C05'},
  {name: 'badge-check', label: 'TRUSTED', beats: 'C26'},
  {name: 'award', label: 'AWARD', beats: 'C26'},
  {name: 'calendar', label: 'DATE', beats: 'C06 C21'},
  {name: 'clock', label: 'TODAY', beats: 'C01'},
  {name: 'hourglass', label: 'DECADES', beats: 'C05 C16'},
  {name: 'split', label: 'PARADOX', beats: 'C02'},
  {name: 'triangle-alert', label: 'RISK', beats: 'C02 C13'},
  {name: 'scissors', label: 'CUTS', beats: 'C23'},
];

const PAGE_W = 1920;

const ProbePage: React.FC<{
  items: Item[];
  cols: number;
  cellW: number;
  rowH: number;
  y0: number;
  big: number;
  title: string;
  sub: string;
}> = ({items, cols, cellW, rowH, y0, big, title, sub}) => {
  const totalW = cols * cellW;
  const x0 = (PAGE_W - totalW) / 2;
  return (
    <AbsoluteFill style={{background: '#0A0A0C'}}>
      <div style={{position: 'absolute', left: 100, top: 96, width: 1720, height: 2, background: 'rgba(255,255,255,0.16)'}} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 50,
          width: PAGE_W,
          textAlign: 'center',
          fontFamily: FONT_HEAVY,
          fontWeight: 900,
          fontSize: 30,
          letterSpacing: 9,
          color: PURPLE,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 118,
          width: PAGE_W,
          textAlign: 'center',
          fontFamily: FONT_HEAVY,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: 5,
          color: GREY,
        }}
      >
        {sub}
      </div>

      {items.map((it, i) => {
        const cx = x0 + cellW * (i % cols) + cellW / 2;
        const ry = y0 + rowH * Math.floor(i / cols);
        const small = Math.round(big * 0.42);
        return (
          <div key={it.name}>
            <Icon name={it.name} x={cx - big / 2} y={ry} size={big} color={WHITE} sw={3} />
            <Icon name={it.name} x={cx - small - 10} y={ry + big + 14} size={small} color={GREY} sw={2.4} />
            <Icon name={it.name} x={cx + 10} y={ry + big + 14} size={small} color={PURPLE} sw={2.4} glow />
            <div
              style={{
                position: 'absolute',
                left: cx,
                top: ry + big + 14 + small + 10,
                transform: 'translateX(-50%)',
                fontFamily: FONT_HEAVY,
                fontWeight: 900,
                fontSize: 21,
                letterSpacing: 3,
                color: WHITE,
                whiteSpace: 'nowrap',
              }}
            >
              {it.label}
            </div>
            <div
              style={{
                position: 'absolute',
                left: cx,
                top: ry + big + 14 + small + 38,
                transform: 'translateX(-50%)',
                fontFamily: FONT_HEAVY,
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: 1.6,
                color: 'rgba(240,160,48,0.78)',
                whiteSpace: 'nowrap',
              }}
            >
              {it.beats}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const IconProbeA: React.FC = () => (
  <ProbePage
    items={PAGE_A}
    cols={6}
    cellW={300}
    rowH={214}
    y0={172}
    big={92}
    title="SUBJECT ICONS · A"
    sub="MEDIA · LAW · DOCUMENT · 22 CANDIDATES (LARGE 92 / SMALL 39)"
  />
);

export const IconProbeB: React.FC = () => (
  <ProbePage
    items={PAGE_B}
    cols={6}
    cellW={300}
    rowH={200}
    y0={170}
    big={80}
    title="SUBJECT ICONS · B"
    sub="DATA · PLATFORM · PEOPLE · TIME · 24 CANDIDATES (LARGE 80 / SMALL 34)"
  />
);
