import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C02c —— 数十年来第一次真正的自我监管（18.480–22.240s / 帧 555–667）
 * 念白：offering the prospect of genuine self-regulation for the first time in decades
 *
 * 这一拍是「希望」的顶点，也是 C03 的转折落点。居中构图，只放一个 shield（自我监管＝自律），
 * 不加第二个图标 —— 抽象词不加图元（规则 2）。
 */
const F0 = 555;
const TO = 678; // 与注册的 to 一致

export const C02c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const kickerOp = fadeIn(n - 4, 14);
  const tailOp = fadeIn(n - 78, 16);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      <div style={{position: 'absolute', inset: 0, opacity: kickerOp}}>
        <CText cx={960} cy={344} size={32} weight={800} color={PURPLE} letterSpacing={7}>
          THE PROSPECT OF
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 402, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={32} size={92} text="GENUINE" />
      </div>
      <div style={{position: 'absolute', left: 0, top: 512, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={44} size={92} text="SELF-REGULATION" color={PURPLE} />
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: tailOp}}>
        <CText cx={960} cy={664} size={38} weight={800} color={WHITE} opacity={0.9} letterSpacing={4}>
          FOR THE FIRST TIME IN DECADES
        </CText>
      </div>

      <IconCue N={N} word="selfregulation" icon="shield" x={392} y={498} size={88} color={PURPLE} sw={2.8} glow after={F0} from="left" />
    </div>
  );
};
