import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {IconCue} from '../../figures/IconCue';

/**
 * C03 —— 希望被一连串事件考验（22.595–28.595s / 帧 679–858）
 * 念白：Yet a succession of incidents: physical attacks on journalists
 *       and arrests linked to reporting have tested those hopes
 *
 * 画面关系取自 a2e 模式表「两组并列清单」：两条事件各自成行、左图右文、中间细线分隔，
 * 按念白节奏依次入场（attacks@739、arrests@777），最后 「HOPES TESTED」 收束。
 * 这是全片第一次出现「具体事件」，也是第一次用图标承担语义。
 */
const F0 = 679;
const TO = 880; // 与注册的 to 一致（延到 C04 起帧前）

type Row = {label: string; sub: string; at: number; icon: 'camera' | 'siren'};

const ROWS: Row[] = [
  {label: 'PHYSICAL ATTACKS', sub: 'ON JOURNALISTS', at: 739, icon: 'camera'},
  {label: 'ARRESTS', sub: 'LINKED TO REPORTING', at: 777, icon: 'siren'},
];

export const C03: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const headOp = fadeIn(n - 4, 14);
  const tailOp = fadeIn(n - 150, 18);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      <div style={{position: 'absolute', inset: 0, opacity: headOp}}>
        <CText cx={960} cy={286} size={32} weight={800} color={PURPLE} letterSpacing={7}>
          A SUCCESSION OF INCIDENTS
        </CText>
      </div>

      {ROWS.map((r, i) => {
        const t = Math.min(1, Math.max(0, (n - (r.at - F0)) / 14));
        if (t <= 0) return null;
        const e = 1 - Math.pow(1 - t, 3);
        const y = 384 + i * 208;
        return (
          <div key={r.label} style={{position: 'absolute', left: 0, top: y, width: 1920, opacity: e}}>
            {/* 行左端短竖线：栏目标记 */}
            <div style={{position: 'absolute', left: 300, top: 6, width: 4, height: 96, background: PURPLE, opacity: 0.85}} />
            <div style={{position: 'absolute', left: 336, top: 0}}>
              <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 76, letterSpacing: -0.5, color: WHITE, lineHeight: 1}}>
                {r.label}
              </div>
              <div style={{marginTop: 12, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 30, letterSpacing: 3.4, color: GREY}}>
                {r.sub}
              </div>
            </div>
            {/* 行右端细线，指向画面右侧 */}
            <div style={{position: 'absolute', left: 1120, top: 44, width: Math.min(1, Math.max(0, (n - (r.at - F0) - 8) / 22)) * 240, height: 2, background: 'rgba(255,255,255,0.22)'}} />
            <div style={{position: 'absolute', left: 1408, top: 14}}>
              <IconCue N={N} word={i === 0 ? 'attacks' : 'arrests'} icon={r.icon} x={0} y={0} size={88} color={PURPLE} sw={2.8} glow after={F0} from="right" />
            </div>
          </div>
        );
      })}

      <div style={{position: 'absolute', inset: 0, opacity: tailOp}}>
        <CText cx={960} cy={808} size={44} weight={900} color={PURPLE} letterSpacing={6}>
          HOPES TESTED
        </CText>
      </div>
    </div>
  );
};
