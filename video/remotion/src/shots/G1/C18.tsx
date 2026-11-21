import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';
import {Halftone, Grain, PRINT_FILTER} from '../../texture';

/**
 * C18b —— 两个节目都在 Spotify（204.500–208.200s / 帧 6136–6246）
 * 念白：Both use Spotify as their platform
 *
 * 短拍（3.7s）：平台标识居中，两个节目名收在两侧。
 */
const F0 = 6136;

export const C18b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const logoOp = fadeIn(n - 10, 18);
  const sideOp = fadeIn(n - 44, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={300} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          BOTH USE ONE PLATFORM
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 386, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, opacity: logoOp}}>
        <div style={{width: 108, height: 108, position: 'relative', flexShrink: 0}}>
          <Icon name="podcast" x={0} y={0} size={108} color={PURPLE} sw={2.8} glow />
        </div>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 96, letterSpacing: 2, color: WHITE}}>SPOTIFY</span>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: sideOp}}>
        <CText cx={960} cy={566} size={30} weight={700} color={GREY} letterSpacing={3.4}>
          KELUAR SEKEJAP　·　THE GAME OF IMPOSSIBLE
        </CText>
      </div>
    </>
  );
};

/**
 * C18c —— Roshinee 在 Instagram 上的批评立场（208.200–211.633s / 帧 6247–6349）
 * 念白：Activist Roshinee Mookaiah provides a more critical stance on Instagram
 *
 * 人物卡：头像方框 + 名字 + 立场，右侧挂平台标识。
 */
const F0B = 6247;

export const C18c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const cardT = Math.min(1, Math.max(0, (n - 8) / 20));
  const eC = 1 - Math.pow(1 - cardT, 3);
  const venT = fadeIn(n - 54, 18);

  return (
    <>
      <div style={{position: 'absolute', left: 420, top: 392, display: "flex", alignItems: "flex-start", gap: 44}}>
        {/* 头像：与证据卡同族的纸边 + 网点 */}
        <div
          style={{
            width: 268,
            height: 268,
            background: '#EFEBE0',
            padding: 8,
            boxSizing: 'border-box',
            borderRadius: 3,
            opacity: cardT,
            transform: `translateY(${((1 - eC) * 22).toFixed(1)}px)`,
            boxShadow: '0 20px 48px rgba(0,0,0,0.58)',
          }}
        >
          <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
            <Img
              src={staticFile('assets/malaysia2026/p-roshinee.jpg')}
              style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: PRINT_FILTER}}
            />
            <Halftone />
            <Grain />
          </div>
        </div>

        <div style={{paddingTop: 6}}>
          <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 68, letterSpacing: 0.5, color: WHITE, lineHeight: 1.1, opacity: cardT}}>
            ROSHINEE
            <br />
            MOOKAIAH
          </div>
          <div style={{marginTop: 16, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: GREY, opacity: venT}}>
            ACTIVIST
          </div>
          <div style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 20, opacity: venT}}>
            <div style={{width: 62, height: 62, position: 'relative', flexShrink: 0}}>
              <Icon name="layout-grid" x={0} y={0} size={62} color={PURPLE} sw={2.6} glow />
            </div>
            <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 44, letterSpacing: 1.5, color: WHITE}}>INSTAGRAM</span>
          </div>
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 76, 18)}}>
        <CText cx={700} cy={700} size={40} weight={900} color={PURPLE} letterSpacing={1.5}>
          A MORE CRITICAL STANCE
        </CText>
      </div>
    </>
  );
};
