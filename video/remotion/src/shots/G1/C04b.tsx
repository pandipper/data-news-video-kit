import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY, FONT_ORB} from '../../common';
import {IconBadge} from '../../icons';

/**
 * C04b —— 理事会的六类代表（37.317–46.677s / 帧 1121–1400）
 * 念白：Its elected Governing Board comprises representatives from media companies,
 *       journalists, broadcasters, civil society organisations, academics and government agencies
 *
 * 画面关系取自 a2e 模式表「一个主体 + 若干组成部分 → 左主体图标 + 右侧编号条目逐个填充」。
 * 六类按念白词边界依次入场（1205 / 1236 / 1262 / 1291 / 1344 / 1370），不做平均分配。
 */
const F0 = 1121;
const TO = 1400;

const ROWS: Array<{label: string; at: number}> = [
  {label: 'MEDIA COMPANIES', at: 1205},
  {label: 'JOURNALISTS', at: 1236},
  {label: 'BROADCASTERS', at: 1262},
  {label: 'CIVIL SOCIETY', at: 1291},
  {label: 'ACADEMICS', at: 1344},
  {label: 'GOVERNMENT AGENCIES', at: 1370},
];

export const C04b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const headT = fadeIn(n - 4, 16);
  const badgeT = fadeIn(n - 16, 20);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      <div style={{position: 'absolute', inset: 0, opacity: headT}}>
        <CText cx={600} cy={252} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          ITS ELECTED GOVERNING BOARD
        </CText>
      </div>

      {/* 左：主体徽记 */}
      <div style={{position: 'absolute', inset: 0, opacity: badgeT, transform: `translateY(${(1 - badgeT) * 18}px)`}}>
        <IconBadge name="users" x={330} y={420} box={210} iconRatio={0.5} color={WHITE} accent={PURPLE} sw={3} r={18} glow />
        <CText cx={435} cy={686} size={26} weight={900} color={GREY} letterSpacing={4}>
          MMC BOARD
        </CText>
      </div>

      {/* 右：六类代表，按念白依次入场 */}
      <div style={{position: 'absolute', left: 640, top: 330, width: 1180}}>
        {ROWS.map((r, i) => {
          const t = Math.min(1, Math.max(0, (n - (r.at - F0)) / 14));
          if (t <= 0) return null;
          const e = 1 - Math.pow(1 - t, 3);
          return (
            <div
              key={r.label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 26,
                height: 86,
                opacity: e,
                transform: `translateX(${(1 - e) * 26}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_HEAVY,
                  fontWeight: 900,
                  fontSize: 24,
                  letterSpacing: 2,
                  color: PURPLE,
                  width: 42,
                  flexShrink: 0,
                }}
              >
                {`0${i + 1}`}
              </span>
              <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 46, letterSpacing: 0.5, color: WHITE, whiteSpace: 'nowrap'}}>
                {r.label}
              </span>
              <span
                style={{
                  width: 220,
                  height: 2,
                  background: 'rgba(255,255,255,0.18)',
                  marginBottom: 10,
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
