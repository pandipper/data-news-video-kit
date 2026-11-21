import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, ClusterGrid, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';

/**
 * C06a —— MMC 迅速就新闻自由事件表态（51.353–55.433s / 帧 1541–1672）
 * 念白：The MMC has moved quickly to take public positions on press freedom incidents
 *
 * 图元层：底部时间轴（JUN 2025 成立 → JAN 2026 首次公开表态，轴向右生长、末端节点 pulse）
 * ＋ 右侧点阵网格（接连发声的密集感）＋ 上下编辑细线。
 * 时间轴只标两个真实时间点，不写月数 —— 念白没说的数字不上屏。
 * 构图与 C06b（左文右图）相反，保证相邻两拍语言不同。
 */
const F0 = 1541;
const TO = 1672; // 接到 C06b 起帧，段间不留空帧

export const C06a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const lineTop = Math.min(1, Math.max(0, n / 16)) * 470;
  const axisW = Math.min(1, Math.max(0, (n - 58) / 34)) * 1160;
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin((n / 18) * Math.PI));

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      {/* 右侧点阵网格：表态的密集感，读作「接连发声」 */}
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 44, 20) * 0.6}}>
        <ClusterGrid
          x={1650}
          y={300}
          cols={6}
          rows={5}
          cell={16}
          gap={14}
          lit={20 + Math.floor(Math.min(10, n / 6))}
          color="#2A2A2A"
          accent={PURPLE}
          seed={9}
        />
      </div>

      {/* 上细线 */}
      <div style={{position: 'absolute', left: 960 - lineTop / 2, top: 296, width: lineTop, height: 2, background: PURPLE}} />

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 8, 14)}}>
        <CText cx={960} cy={352} size={30} weight={800} color={PURPLE} letterSpacing={7}>
          MALAYSIAN MEDIA COUNCIL
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 404, width: 1920, display: 'flex', justifyContent: 'center', gap: 28}}>
        <Pressed n={n} delay={14} size={128} text="PUBLIC" />
        <Pressed n={n} delay={18} size={128} text="POSITIONS" />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: fadeIn(n - 32, 16),
          transform: `translateY(${(1 - fadeIn(n - 32, 16)) * 16}px)`,
        }}
      >
        <CText cx={960} cy={618} size={52} weight={800} color={WHITE} opacity={0.86} letterSpacing={3}>
          ON PRESS FREEDOM INCIDENTS
        </CText>
      </div>

      {/* 下细线 */}
      <div
        style={{
          position: 'absolute',
          left: 960 - (Math.min(1, Math.max(0, (n - 40) / 16)) * 470) / 2,
          top: 700,
          width: Math.min(1, Math.max(0, (n - 40) / 16)) * 470,
          height: 2,
          background: 'rgba(255,255,255,0.35)',
        }}
      />

      {/* 时间轴图元：JUN 2025 → JAN 2026 */}
      <div style={{position: 'absolute', left: 380, top: 830, width: 1160, opacity: fadeIn(n - 58, 16)}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: axisW, height: 2, background: 'rgba(255,255,255,0.28)'}} />
        {/* 起点：成立 */}
        <div
          style={{
            position: 'absolute',
            left: -8,
            top: -8,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: PURPLE,
            boxShadow: '0 0 18px 4px rgba(240,160,48,0.55)',
          }}
        />
        {/* 终点：首次公开表态，pulse */}
        <div
          style={{
            position: 'absolute',
            left: Math.max(-9, axisW - 9),
            top: -9,
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `3px solid ${PURPLE}`,
            background: '#000',
            opacity: axisW > 40 ? pulse : 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -10,
            top: 34,
            fontFamily: FONT_HEAVY,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 3,
            color: GREY,
            whiteSpace: 'nowrap',
          }}
        >
          JUN 2025
        </div>
        <div
          style={{
            position: 'absolute',
            left: Math.max(-10, axisW - 78),
            top: 34,
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 26,
            letterSpacing: 3,
            color: PURPLE,
            whiteSpace: 'nowrap',
            opacity: axisW > 400 ? 1 : 0,
          }}
        >
          JAN 2026
        </div>
      </div>
    </div>
  );
};
