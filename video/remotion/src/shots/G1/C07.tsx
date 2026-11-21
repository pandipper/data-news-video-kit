import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {EvidenceChip} from '../../figures/EvidenceChip';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C07 —— Haresh Deol 白天遇袭（66.777–74.057s / 帧 2004–2222）
 * 念白：Events such as a daytime attack on sports journalist Haresh Deol in November 2025
 *       have caused further unease among journalists
 *
 * 第 2 章第一拍。章节卡覆盖 2002–2046（CARD_LENGTH=45），所以本镜头的内容从 2040 起入场，
 * 章节卡退场时正好接上，硬切不留暗场。
 * 语言沿用 C06b 的证据卡（左文右图），但左侧更简：只留「事件 / 人 / 时间」三行，结论单独一行收在底部。
 */
const F0 = 2004;
const TO = 2233; // 接到 C08 起帧

export const C07: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickerOp = fadeIn(n - 36, 14);
  const nameOp = fadeIn(n - 80, 16);
  const ruleW = Math.min(1, Math.max(0, (n - 96) / 26)) * 400;

  return (
    <>
      {/* 左栏竖线（与 C06b 同一版式语言） */}
      <div style={{position: 'absolute', left: 56, top: 240, width: 2, height: Math.min(1, Math.max(0, (n - 36) / 22)) * 420, background: 'rgba(240,160,48,0.55)'}} />

      <div style={{position: 'absolute', left: 90, top: 240, width: 940}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 26, opacity: kickerOp}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE}}>
            NOVEMBER 2025
          </span>
          <IconCue inline N={N} word="November" icon="calendar" size={44} color={GREY} sw={2.2} after={F0} from="left" hold={110} />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 4, marginTop: 30}}>
          <div style={{display: 'flex', gap: 24}}>
            <Pressed n={n} delay={44} size={132} text="ATTACKED" />
          </div>
          <div style={{display: 'flex', gap: 24, alignItems: 'baseline'}}>
            <Pressed n={n} delay={54} size={86} text="IN" />
            <Pressed n={n} delay={58} size={86} text="DAYLIGHT" />
          </div>
        </div>

        <div style={{marginTop: 36, opacity: nameOp}}>
          <div style={{height: 2, width: ruleW, background: PURPLE}} />
          <div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 26}}>
            <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 38, letterSpacing: 3, color: WHITE}}>
              HARESH DEOL
            </span>
            <IconCue inline N={N} word="Haresh" icon="user" size={46} color={GREY} sw={2.2} after={F0} from="left" />
          </div>
          <div style={{marginTop: 8, fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 26, letterSpacing: 2.2, color: GREY}}>
            SPORTS JOURNALIST · TWENTYTWO13
          </div>
        </div>
      </div>

      {/* 词级 cue 已改为行内排版（见上，flex + align-items:center），不再用绝对坐标 */}
      {/* 右侧证据卡 */}
      <EvidenceChip
        N={N}
        f0={F0 + 28}
        src="assets/malaysia2026/c07-rakyatpost.jpg"
        x={1150}
        y={218}
        w={438}
        h={548}
        org="THE RAKYAT POST"
        dateLabel="NOV 2025"
        tilt={-1.3}
        enter={16}
      />
    </>
  );
};
