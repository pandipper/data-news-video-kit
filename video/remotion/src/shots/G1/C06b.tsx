import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {EvidenceChip} from '../../figures/EvidenceChip';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C06b —— Rex Tan 因一个提问被捕（55.753–62.553s / 帧 1673–1877）
 * 念白：In January it called the arrest of journalist Rex Tan for asking a question
 *       deemed racially sensitive at a public lecture on Gaza
 *
 * 版式：左侧编辑式大字标题（逐词压印，shotcraft paper-title-card 配方），右侧 Malay Mail 证据卡。
 * 归属：本拍只陈述「被捕」与「因何被捕」，MMC 的 unnecessary and punitive 留给 C06c，不提前给结论。
 *
 * 词级 cue（3 个，符合一镜上限）：
 *   January  → calendar      kicker 上方，小尺寸灰，作时间锚的图注
 *   arrest   → siren         与大字 ARRESTED 右缘咬合，琥珀 + 柔光
 *   question → message-square 与说明行右侧咬合，小尺寸灰
 * 全片有证据卡的镜头，cue 也照样放 —— 用户 2026-11-20 确认不抢戏。
 */
const F0 = 1673;

export const C06b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickerOp = fadeIn(n - 6, 12);
  const nameOp = fadeIn(n - 40, 14);
  const lineW = Math.min(1, Math.max(0, (n - 52) / 26)) * 420;
  const subOp = fadeIn(n - 62, 14);

  return (
    <>
      {/* 左栏竖栏线（报纸版式的栏线，图元层最轻的一档） */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          top: 232,
          width: 2,
          height: Math.min(1, Math.max(0, n / 20)) * 612,
          background: 'rgba(240,160,48,0.55)',
        }}
      />

      {/* 左侧编辑版式 */}
      <div style={{position: 'absolute', left: 90, top: 232, width: 900}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            opacity: kickerOp,
            marginBottom: 30,
          }}
        >
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE}}>JANUARY 2026</span>
          <IconCue inline N={N} word="January" icon="calendar" size={44} color="#B8B8BC" sw={2.2} after={F0} from="left" hold={120} />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <div style={{display: 'flex', gap: 28, alignItems: 'center'}}>
            <Pressed n={n} delay={8} size={150} text="ARRESTED" />
            <IconCue inline N={N} word="arrest" icon="siren" size={92} color={PURPLE} sw={2.8} glow after={F0} from="left" />
          </div>
          <div style={{display: 'flex', gap: 24, alignItems: 'baseline'}}>
            <Pressed n={n} delay={16} size={92} text="OVER" />
            <Pressed n={n} delay={20} size={92} text="A" />
            <Pressed n={n} delay={24} size={92} text="QUESTION" />
          </div>
        </div>

        <div style={{marginTop: 40, opacity: nameOp}}>
          <div style={{height: 2, width: lineW, background: PURPLE}} />
          <div
            style={{
              marginTop: 22,
              fontFamily: FONT_HEAVY,
              fontWeight: 900,
              fontSize: 40,
              letterSpacing: 3,
              color: WHITE,
            }}
          >
            REX TAN
          </div>
          <div style={{marginTop: 10, fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 27, letterSpacing: 2, color: GREY}}>
            JOURNALIST · FREE MALAY TODAY
          </div>
        </div>

        <div style={{marginTop: 44, opacity: subOp, display: 'flex', alignItems: 'flex-start', gap: 24}}>
          <div
            style={{
              fontFamily: FONT_HEAVY,
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: 1.6,
              color: GREY,
              maxWidth: 760,
              lineHeight: 1.45,
            }}
          >
            A QUESTION DEEMED RACIALLY SENSITIVE,
            <br />
            AT A PUBLIC LECTURE ON GAZA
          </div>
            <IconCue inline N={N} word="question" icon="message-square" size={52} color="#B8B8BC" sw={2.4} after={F0} from="left" hold={95} style={{marginTop: -6}} />
        </div>
      </div>

      {/* 右侧证据卡 */}
      <EvidenceChip
        N={N}
        f0={F0}
        src="assets/malaysia2026/c06-malaymail.jpg"
        x={1180}
        y={210}
        w={520}
        h={584}
        org="MALAY MAIL"
        dateLabel="17 JAN 2026"
        tilt={1.2}
      />
    </>
  );
};
