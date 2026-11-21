import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {Icon} from '../../icons';
import {Halftone, Grain, PRINT_FILTER} from '../../texture';

/**
 * C20a —— 业内还有别的人（227.009–231.100s / 帧 6811–6933）
 * 念白：Elsewhere in the industry, other individuals are also in the limelight
 *
 * 过渡拍（4s）：不讲具体人，只把「行业里还有别的人」立住，为下一拍换人做铺垫。
 */
const F0 = 6811;

export const C20a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickOp = fadeIn(n - 2, 14);
  const subOp = fadeIn(n - 46, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: kickOp}}>
        <CText cx={960} cy={316} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          ELSEWHERE IN THE INDUSTRY
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 384, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={16} size={96} text="OTHER" color={GREY} />
        <Pressed n={n} delay={26} size={96} text="INDIVIDUALS" />
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: subOp}}>
        <CText cx={960} cy={556} size={40} weight={900} color={PURPLE} letterSpacing={3.4}>
          ALSO IN THE LIMELIGHT
        </CText>
      </div>

      {/* 三个占位人形：暗示「不止一个」 */}
      <div style={{position: 'absolute', left: 0, top: 640, width: 1920, display: 'flex', justifyContent: 'center', gap: 54, opacity: subOp * 0.9}}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{width: 76, height: 76, position: 'relative', opacity: i === 1 ? 1 : 0.45}}>
            <Icon name="user" x={0} y={0} size={76} color={i === 1 ? PURPLE : GREY} sw={2.6} glow={i === 1} />
          </div>
        ))}
      </div>
    </>
  );
};

/**
 * C20b —— Ashwad 从 Astro Awani 去了 RTM（231.100–240.369s / 帧 6934–7211）
 * 念白：Astro Awani lost its young, enterprising Editor-in-Chief Ashwad Ismail
 *       to the national broadcaster RTM as its Director-General of Broadcasting
 *
 * 人事流动：左边原单位、中间人、右边新单位，箭头 draw-on 表示流向。
 * 注意：Ashwad 的素材是三人群像（中间为本人），画面必须标注。
 */
const F0B = 6934;

export const C20b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const cardT = Math.min(1, Math.max(0, (n - 6) / 20));
  const eC = 1 - Math.pow(1 - cardT, 3);
  const arrowT = Math.min(1, Math.max(0, (n - 120) / 26));
  const rightT = fadeIn(n - 152, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={296} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          ASTRO AWANI LOST ITS EDITOR-IN-CHIEF
        </CText>
      </div>

      {/* 左：人 + 原单位 */}
      <div style={{position: 'absolute', left: 168, top: 410, width: 470, opacity: cardT, transform: `translateY(${((1 - eC) * 22).toFixed(1)}px)`}}>
        <div
          style={{
            width: 300,
            height: 216,
            background: '#EFEBE0',
            padding: 8,
            boxSizing: 'border-box',
            borderRadius: 3,
            boxShadow: '0 20px 48px rgba(0,0,0,0.58)',
          }}
        >
          <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
            <Img src={staticFile('assets/malaysia2026/p-ashwad.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: PRINT_FILTER}} />
            <Halftone />
            <Grain />
          </div>
        </div>
        <div style={{marginTop: 20, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 44, letterSpacing: 0.5, color: WHITE}}>ASHWAD ISMAIL</div>
        <div style={{marginTop: 8, fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 21, letterSpacing: 1.6, color: GREY}}>
          GROUP PHOTO · HE IS IN THE CENTRE
        </div>
        <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 16}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 24, letterSpacing: 2.4, color: GREY}}>FROM</span>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 34, letterSpacing: 1, color: WHITE}}>ASTRO AWANI</span>
        </div>
      </div>

      {/* 中：流向箭头 */}
      <div style={{position: 'absolute', left: 700, top: 544, width: arrowT * 240, height: 3, background: PURPLE, opacity: 0.85}} />
      <div style={{position: 'absolute', left: 936, top: 532, width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: `20px solid ${PURPLE}`, opacity: arrowT > 0.92 ? 1 : 0}} />

      {/* 右：新单位与新职位 */}
      <div style={{position: 'absolute', left: 1000, top: 424, width: 760, opacity: rightT, transform: `translateY(${(1 - rightT) * 18}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 24, letterSpacing: 2.4, color: GREY}}>TO</span>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 34, letterSpacing: 1, color: WHITE}}>THE NATIONAL BROADCASTER</span>
        </div>
        <div style={{marginTop: 16, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 96, letterSpacing: 2, color: PURPLE, lineHeight: 1}}>RTM</div>
        <div style={{marginTop: 26, height: 2, width: 520, background: 'rgba(255,255,255,0.24)'}} />
        <div style={{marginTop: 24, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 44, letterSpacing: 0.5, color: WHITE, lineHeight: 1.16}}>
          DIRECTOR-GENERAL
          <br />
          OF BROADCASTING
        </div>
      </div>
    </>
  );
};
