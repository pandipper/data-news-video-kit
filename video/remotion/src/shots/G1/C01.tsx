import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C01 —— 开场署名（0.000–7.840s / 帧 1–235）
 * 念白：Malaysia's media landscape in 2026, written by Zaharom Nain and Aril Mikhail,
 *       published on June 16th 2026.
 *
 * 帧 1–90 是片头覆盖层（MALAYSIA / DIGITAL NEWS REPORT 2026 / tagline），本镜头从 91 帧接上，
 * 承担「署名与出处」。模式取自 a2e 模式表「出处 / 历史节点 → 来源卡 + 大数字」。
 *
 * 版式：左侧作者（逐词压印，与念白同步：Zaharom@99、Nain@114、Aril@131、Mikhail@138），
 * 右侧出版信息（16 JUNE 2026，Orbitron 数字），中间一道竖线做编辑分隔。
 */
const F0 = 91;
const TO = 257; // 延到 C02 起帧，段间不留空帧

export const C01: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const kickerOp = fadeIn(n - 2, 12);
  const orgOp = fadeIn(n - 56, 16);
  const dateOp = fadeIn(n - 78, 14);
  const lineH = Math.min(1, Math.max(0, (n - 20) / 26)) * 460;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      {/* 词级图标 cue：user 贴作者名左侧，calendar 贴出版日期下方 */}

      {/* 左侧：署名 */}
      <div style={{position: 'absolute', left: 120, top: 340, width: 900}}>
        <div
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: 7,
            color: PURPLE,
            opacity: kickerOp,
          }}
        >
          WRITTEN BY
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 34}}>
          <div style={{display: 'flex', gap: 24, alignItems: 'center'}}>
            <Pressed n={n} delay={8} size={88} text="ZAHAROM" />
            <Pressed n={n} delay={23} size={88} text="NAIN" />
            <IconCue inline N={N} word="Zaharom" icon="user" size={52} color={GREY} sw={2.2} after={F0} from="left" />
          </div>
          <div style={{display: 'flex', gap: 24, alignItems: 'baseline'}}>
            <Pressed n={n} delay={40} size={88} text="ARIL" />
            <Pressed n={n} delay={47} size={88} text="MIKHAIL" />
          </div>
        </div>

        <div style={{marginTop: 44, opacity: orgOp}}>
          <div style={{height: 2, width: lineH, background: PURPLE}} />
          <div
            style={{
              marginTop: 22,
              fontFamily: FONT_HEAVY,
              fontWeight: 600,
              fontSize: 25,
              letterSpacing: 3.4,
              color: GREY,
            }}
          >
            REUTERS INSTITUTE FOR THE STUDY OF JOURNALISM
          </div>
        </div>
      </div>

      {/* 中间编辑竖线 */}
      <div style={{position: 'absolute', left: 1090, top: 340, width: 2, height: lineH, background: 'rgba(255,255,255,0.22)'}} />

      {/* 右侧：出版信息 */}
      <div style={{position: 'absolute', left: 1150, top: 340, opacity: dateOp}}>
        <div
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: 7,
            color: PURPLE,
          }}
        >
          PUBLISHED
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 96,
            letterSpacing: 2,
            color: WHITE,
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          16 JUNE
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 10}}>
          <span
            style={{
              fontFamily: FONT_HEAVY,
              fontWeight: 900,
              fontSize: 96,
              letterSpacing: 2,
              color: PURPLE,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            2026
          </span>
          <IconCue inline N={N} word="June" icon="calendar" size={56} color={GREY} sw={2.4} after={F0} from="left" />
        </div>
      </div>
    </div>
  );
};
