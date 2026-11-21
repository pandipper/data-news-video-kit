import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C02b —— MMC 终于在 2025 开始运作（13.680–18.480s / 帧 409–554）
 * 念白：The long-awaited Malaysian Media Council finally became operational in 2025
 *
 * 模式取自 a2e 模式表「出处 / 历史节点 → 大数字 + 机构卡」。
 * 左：机构名（两行，逐词压印）；右：2025 超大数字（Orbitron，琥珀）。
 * 注意 C06a 里另有一条时 JUN 2025 → JAN 2026 的时间轴，这里只立年份，不复用时间轴，避免两拍同构。
 */
const F0 = 409;
const TO = 554;

export const C02b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const kickerOp = fadeIn(n - 2, 14);
  const yearT = Math.min(1, Math.max(0, (n - 103) / 22));
  const subOp = fadeIn(n - 67, 16);
  const ruleW = Math.min(1, Math.max(0, (n - 30) / 24)) * 520;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      {/* 左：机构名 */}
      <div style={{position: 'absolute', left: 120, top: 356, width: 900}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 26, letterSpacing: 7, color: PURPLE, opacity: kickerOp}}>
          THE LONG-AWAITED
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 32}}>
          <div style={{display: 'flex', gap: 24, alignItems: 'baseline'}}>
            <Pressed n={n} delay={16} size={84} text="MALAYSIAN" />
          </div>
          <div style={{display: 'flex', gap: 24, alignItems: 'center'}}>
            <Pressed n={n} delay={34} size={84} text="MEDIA" />
            <Pressed n={n} delay={46} size={84} text="COUNCIL" />
            <IconCue inline N={N} word="operational" icon="landmark" size={64} color={GREY} sw={2.4} after={F0} from="up" />
          </div>
        </div>
        <div style={{height: 2, width: ruleW, background: PURPLE, marginTop: 38}} />
        <div style={{marginTop: 22, opacity: subOp, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: GREY}}>
          BECAME OPERATIONAL
        </div>
      </div>

      {/* 右：2025 大数字 */}
      <div style={{position: 'absolute', left: 1150, top: 424, opacity: yearT}}>
        <div
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: 4,
            color: PURPLE,
            fontVariantNumeric: 'tabular-nums',
            transform: `translateY(${((1 - yearT) * 26).toFixed(1)}px)`,
          }}
        >
          2025
        </div>
      </div>

    </div>
  );
};
