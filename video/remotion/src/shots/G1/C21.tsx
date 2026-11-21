import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Icon} from '../../icons';
import {Halftone, Grain, PRINT_FILTER} from '../../texture';

/** 人物卡：与全片真图同一套纸边 + 网点 */
const Portrait: React.FC<{src: string; x: number; y: number; w: number; h: number; t: number; note?: string}> = ({src, x, y, w, h, t, note}) => {
  const e = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, opacity: Math.min(1, t), transform: `translateY(${((1 - e) * 22).toFixed(1)}px)`}}>
      <div style={{width: w, height: h, background: '#EFEBE0', padding: 7, boxSizing: 'border-box', borderRadius: 3, boxShadow: '0 20px 48px rgba(0,0,0,0.58)'}}>
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
          <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: PRINT_FILTER}} />
          <Halftone />
          <Grain />
        </div>
      </div>
      {note ? (
        <div style={{marginTop: 12, fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 19, letterSpacing: 1.4, color: GREY}}>{note}</div>
      ) : null}
    </div>
  );
};

/**
 * C21a —— 部长本人就是大股东（240.723–250.000s / 帧 7223–7500）
 * 念白：Malaysia's Minister of Investment, Trade and Industry Johari Abdul Ghani,
 *       who is a major shareholder, 25 percent, of media giant Media Prima
 *
 * 人事与持股：左人物、右数字。素材是双人合影，必须标注。
 */
const F0 = 7223;

export const C21a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const cardT = Math.min(1, Math.max(0, (n - 6) / 20));
  const nameOp = fadeIn(n - 40, 18);
  const pctT = Math.min(1, Math.max(0, (n - 176) / 24));

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={250} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          MALAYSIA'S MINISTER OF INVESTMENT, TRADE AND INDUSTRY
        </CText>
      </div>

      <Portrait src="assets/malaysia2026/p-johari.jpg" x={150} y={330} w={380} h={285} t={cardT} note="TWO-PERSON PHOTO · JOHARI ON THE RIGHT" />

      <div style={{position: 'absolute', left: 600, top: 338, width: 620, opacity: nameOp}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 66, letterSpacing: 0.5, color: WHITE, lineHeight: 1.1}}>
          JOHARI
          <br />
          ABDUL GHANI
        </div>
        <div style={{marginTop: 20, height: 2, width: 380, background: 'rgba(255,255,255,0.24)'}} />
        <div style={{marginTop: 20, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 25, letterSpacing: 2.2, color: GREY, lineHeight: 1.5}}>
          A MAJOR SHAREHOLDER
          <br />
          OF MEDIA PRIMA
        </div>
      </div>

      {/* 25% 持股 */}
      <div style={{position: 'absolute', left: 1156, top: 350, opacity: pctT, transform: `translateY(${((1 - pctT) * 20).toFixed(1)}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 134, lineHeight: 1, letterSpacing: -4, color: PURPLE, fontVariantNumeric: 'tabular-nums'}}>25%</span>
          <div style={{width: 74, height: 74, position: 'relative', flexShrink: 0}}>
            <Icon name="chart-pie" x={0} y={0} size={74} color={PURPLE} sw={2.6} glow />
          </div>
        </div>
        <div style={{marginTop: 14, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 34, letterSpacing: 2, color: WHITE}}>MEDIA PRIMA</div>
        <div style={{marginTop: 8, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 22, letterSpacing: 2.6, color: GREY}}>MEDIA GIANT</div>
      </div>
    </>
  );
};

/**
 * C21b —— 儿子也进了股东名单（250.000–257.763s / 帧 7501–7733）
 * 念白：saw his son Amir Nashrin join him on the shareholder list with his own
 *       acquisition of a 7.96 percent share in March
 *
 * 7.96% 按锁定稿写，绝不写成 796。
 */
const F0B = 7501;

export const C21b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const cardT = Math.min(1, Math.max(0, (n - 6) / 20));
  const nameOp = fadeIn(n - 40, 18);
  const pctT = Math.min(1, Math.max(0, (n - 158) / 24));

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 2, 14)}}>
        <CText cx={960} cy={256} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          HIS SON JOINED HIM ON THE SHAREHOLDER LIST
        </CText>
      </div>

      <Portrait src="assets/malaysia2026/p-amir.jpg" x={180} y={336} w={360} h={276} t={cardT} />

      <div style={{position: 'absolute', left: 600, top: 350, width: 560, opacity: nameOp}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 68, letterSpacing: 0.5, color: WHITE, lineHeight: 1.1}}>
          AMIR
          <br />
          NASHRIN
        </div>
        <div style={{marginTop: 20, height: 2, width: 360, background: 'rgba(255,255,255,0.24)'}} />
        <div style={{marginTop: 20, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 26, letterSpacing: 2.6, color: GREY}}>
          HIS OWN ACQUISITION
        </div>
      </div>

      <div style={{position: 'absolute', left: 1150, top: 372, opacity: pctT, transform: `translateY(${((1 - pctT) * 20).toFixed(1)}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 132, lineHeight: 1, letterSpacing: -3, color: PURPLE, fontVariantNumeric: 'tabular-nums'}}>7.96%</span>
          <div style={{width: 68, height: 68, position: 'relative', flexShrink: 0}}>
            <Icon name="chart-pie" x={0} y={0} size={68} color={PURPLE} sw={2.6} glow />
          </div>
        </div>
        <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 18}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 40, letterSpacing: 3, color: WHITE}}>MARCH</span>
          <div style={{width: 54, height: 54, position: 'relative', flexShrink: 0}}>
            <Icon name="calendar" x={0} y={0} size={54} color={GREY} sw={2.4} />
          </div>
        </div>
      </div>
    </>
  );
};
