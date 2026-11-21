import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, Box, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C09a —— 两人动手，第三人拍摄（85.516–89.048s / 帧 2566–2671）
 * 念白：Deol said two men attacked him while a third filmed the incident
 *
 * 画面关系：两个并置的盒（人 / 相机），中间留空形成「两件事同时发生」的对照。
 * 与 C07/C08 的左文右图不同构，避免连续三拍同一版式。
 */
const F0 = 2566;

export const C09a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickOp = fadeIn(n - 4, 12);
  const leftT = fadeIn(n - 16, 16);
  const rightT = fadeIn(n - 62, 16);
  const linkT = Math.min(1, Math.max(0, (n - 76) / 20));

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: kickOp}}>
        <CText cx={960} cy={268} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          DEOL SAID
        </CText>
      </div>

      {/* 左盒：两个人 */}
      <div style={{position: 'absolute', inset: 0, opacity: leftT, transform: `translateY(${(1 - leftT) * 18}px)`}}>
        <Box x={252} y={362} w={452} h={300} r={4} fill="#0A0A0C" stroke={WHITE} sw={2.5}>
          <div style={{position: 'absolute', left: 34, top: 30, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 132, lineHeight: 1, color: WHITE}}>
            2
          </div>
          <div style={{position: 'absolute', left: 158, top: 74, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 46, letterSpacing: 2, color: WHITE}}>
            MEN
          </div>
          <div style={{position: 'absolute', left: 34, top: 196, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 28, letterSpacing: 2.4, color: GREY, lineHeight: 1.5}}>
            ATTACKED HIM
            <br />
            IN THE STREET
          </div>
        </Box>
      </div>

      {/* 右盒：一台相机 */}
      <div style={{position: 'absolute', inset: 0, opacity: rightT, transform: `translateY(${(1 - rightT) * 18}px)`}}>
        <Box x={1216} y={362} w={452} h={300} r={4} fill="#0A0A0C" stroke={PURPLE} sw={3} glow="0 0 30px 4px rgba(240,160,48,.26)">
          <div style={{position: 'absolute', left: 34, top: 26, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 132, lineHeight: 1, color: PURPLE}}>
            1
          </div>
          <div style={{position: 'absolute', left: 34, top: 196, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 28, letterSpacing: 2.4, color: GREY, lineHeight: 1.5}}>
            A THIRD MAN
            <br />
            FILMED IT
          </div>
          <div style={{position: 'absolute', right: 30, top: 52}}>
            <IconCue inline N={N} word="filmed" icon="camera" size={96} color={PURPLE} sw={2.8} glow after={F0} from="up" />
          </div>
        </Box>
      </div>

      {/* 中间连接：一条细线 + 「同时」 */}
      <div style={{position: 'absolute', left: 704, top: 508, width: Math.min(1, Math.max(0, (n - 76) / 20)) * 512, height: 2, background: 'rgba(255,255,255,0.22)'}} />
      <div style={{position: 'absolute', inset: 0, opacity: linkT * 0.9}}>
        <CText cx={960} cy={478} size={26} weight={800} color={GREY} letterSpacing={5}>
          WHILE
        </CText>
      </div>
    </>
  );
};

/**
 * C09b —— 媒体自由组织的担忧（89.048–94.316s / 帧 2672–2829）
 * 念白：prompting concern among media freedom groups such as Gerakan Media Merdeka
 *       about possible intimidation
 *
 * 居中构图，把组织名立成主体，intimidation 用琥珀 + triangle-alert 收在下方。
 */
const F0B = 2672;

export const C09b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const kickOp = fadeIn(n - 4, 14);
  const orgOp = fadeIn(n - 74, 18);
  const intiT = fadeIn(n - 122, 18);
  const ruleW = Math.min(1, Math.max(0, (n - 96) / 24)) * 560;

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: kickOp}}>
        <CText cx={960} cy={300} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          MEDIA FREEDOM GROUPS
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 372, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={20} size={96} text="GERAKAN" />
        <Pressed n={n} delay={34} size={96} text="MEDIA" />
        <Pressed n={n} delay={46} size={96} text="MERDEKA" />
      </div>

      <div style={{position: 'absolute', left: 960 - ruleW / 2, top: 512, width: ruleW, height: 2, background: 'rgba(255,255,255,0.28)'}} />

      <div style={{position: 'absolute', inset: 0, opacity: intiT}}>
        <CText cx={960} cy={586} size={28} weight={800} color={GREY} letterSpacing={6}>
          RAISED CONCERN ABOUT
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 640, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
        <Pressed n={n} delay={128} size={92} text="POSSIBLE" color={GREY} />
        <Pressed n={n} delay={140} size={92} text="INTIMIDATION" color={PURPLE} />
        <IconCue inline N={N} word="intimidation" icon="triangle-alert" size={72} color={PURPLE} sw={2.6} glow after={F0B} from="up" />
      </div>
    </>
  );
};
