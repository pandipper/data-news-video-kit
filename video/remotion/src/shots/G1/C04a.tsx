import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, Box, ArrowH, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {IconCue} from '../../figures/IconCue';

/**
 * C04a —— 法案通过，机构成立（29.317–37.317s / 帧 881–1120）
 * 念白：The passing of the Malaysian Media Council Act saw the establishment of the
 *       Malaysian Media Council or MMC in June 2025
 *
 * 画面关系取自 a2e 模式表「有序过程 → 输入 → 处理器盒 → 输出 + 箭头 draw-on」：
 * 左 ACT 盒（白边，法案）→ 箭头长出 → 右 COUNCIL 盒（琥珀边，机构），下方挂 JUNE 2025。
 */
const F0 = 881;
const TO = 1120;

export const C04a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const leftT = fadeIn(n - 4, 14);
  const arrowP = Math.min(1, Math.max(0, (n - 72) / 26));
  const rightT = fadeIn(n - 100, 16);
  const stampT = fadeIn(n - 187, 16);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      {/* 左：法案 */}
      <div style={{position: 'absolute', inset: 0, opacity: leftT}}>
        <Box x={210} y={430} w={430} h={186} r={4} fill="#0A0A0C" stroke={WHITE} sw={2.5}>
          <div style={{position: 'absolute', left: 26, top: 30, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 34, letterSpacing: 2, color: WHITE, lineHeight: 1.2}}>
            MEDIA COUNCIL
            <br />
            ACT
          </div>
          <div style={{position: 'absolute', left: 26, top: 128, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 21, letterSpacing: 2.6, color: GREY}}>
            PASSED
          </div>
        </Box>
        <IconCue N={N} word="Act" icon="scroll" x={556} y={464} size={72} color={GREY} sw={2.4} after={F0} from="left" />
      </div>

      {/* 中：箭头从法案长向机构 */}
      <ArrowH x={690} y={520} w={500} p={arrowP} color={PURPLE} shaft={3} />

      {/* 右：机构 */}
      <div style={{position: 'absolute', inset: 0, opacity: rightT}}>
        <Box x={1210} y={430} w={500} h={186} r={4} fill="#0A0A0C" stroke={PURPLE} sw={3} glow={`0 0 30px 4px rgba(240,160,48,.28)`}>
          <div style={{position: 'absolute', left: 26, top: 26, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 34, letterSpacing: 2, color: WHITE, lineHeight: 1.2}}>
            MALAYSIAN
            <br />
            MEDIA COUNCIL
          </div>
          <div style={{position: 'absolute', left: 26, top: 128, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 21, letterSpacing: 2.6, color: PURPLE}}>
            MMC · ESTABLISHED
          </div>
        </Box>
        <IconCue N={N} word="establishment" icon="landmark" x={1652} y={464} size={78} color={PURPLE} sw={2.6} glow after={F0} from="left" />
      </div>

      {/* 下方时间戳 */}
      <div style={{position: 'absolute', inset: 0, opacity: stampT}}>
        <CText cx={1490} cy={700} size={54} weight={900} color={PURPLE} letterSpacing={6}>
          JUNE 2025
        </CText>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: leftT}}>
        <CText cx={425} cy={358} size={30} weight={800} color={GREY} letterSpacing={6}>
          THE PASSING OF
        </CText>
      </div>
    </div>
  );
};
