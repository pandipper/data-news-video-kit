import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';
import {EvidenceChip} from '../../figures/EvidenceChip';

/**
 * C13a —— 三个组织（131.597–140.167s / 帧 3949–4205）
 * 念白：However, at least three media freedom organisations — the Centre for Independent Journalism,
 *       Article 19, and Sinar Project
 *
 * 第 3 章第一拍，章节卡覆盖 3947–3991，本拍内容从 3991 起入场接上。
 * 三家是并列关系，用等宽三行列出，按念白词边界依次点亮（4043 / 4095 / 4136）。
 * 注意：原文用的是单数 a lengthy statement —— 三家是同一份联合声明，不是三份（见 sources.json 红线）。
 */
const F0 = 3949;

const ORGS: Array<{name: string; sub: string; at: number}> = [
  {name: 'CENTRE FOR INDEPENDENT JOURNALISM', sub: 'CIJ', at: 4043},
  {name: 'ARTICLE 19', sub: 'A19', at: 4095},
  {name: 'SINAR PROJECT', sub: 'SINAR', at: 4136},
];

export const C13a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickOp = fadeIn(n - 40, 14);
  const noteOp = fadeIn(n - 224, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: kickOp}}>
        <CText cx={960} cy={258} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          AT LEAST THREE MEDIA FREEDOM ORGANISATIONS
        </CText>
      </div>

      <div style={{position: 'absolute', left: 470, top: 342, width: 980, display: 'flex', flexDirection: 'column', gap: 22}}>
        {ORGS.map((o, i) => {
          const t = Math.min(1, Math.max(0, (n - (o.at - F0)) / 14));
          if (t <= 0) return null;
          const e = 1 - Math.pow(1 - t, 3);
          return (
            <div
              key={o.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                opacity: e,
                transform: `translateX(${(1 - e) * 26}px)`,
              }}
            >
              <span style={{width: 6, height: 44, background: PURPLE, flexShrink: 0}} />
              <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 46, letterSpacing: 0.5, color: WHITE, whiteSpace: 'nowrap'}}>
                {o.name}
              </span>
              <span style={{fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 22, letterSpacing: 2.4, color: GREY, paddingTop: 6}}>
                {o.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* 联合声明不是三份，这句必须挂在画面上 */}
      <div style={{position: 'absolute', inset: 0, opacity: noteOp}}>
        <CText cx={960} cy={706} size={26} weight={700} color={GREY} letterSpacing={3.4}>
          ONE JOINT STATEMENT · NOT THREE SEPARATE ONES
        </CText>
      </div>

      <IconCue N={N} word="organisations" icon="users" x={352} y={340} size={84} color={GREY} sw={2.4} after={F0} from="left" hold={190} />
    </>
  );
};

/**
 * C13b —— 发了一份长声明（140.167–142.400s / 帧 4206–4272）
 * 念白：issued a lengthy statement decrying this latest move by the government
 *
 * 短拍（2.2s）：声明这件事用 stamp 立住，DECRYING 用琥珀收尾。
 */
const F0B = 4206;

export const C13b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 336, width: 1920, display: 'flex', justifyContent: 'center', gap: 24}}>
        <Pressed n={n} delay={4} size={92} text="ISSUED A LENGTHY" />
      </div>

      <div style={{position: 'absolute', left: 0, top: 456, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
        <Pressed n={n} delay={16} size={92} text="STATEMENT" color={PURPLE} />
        <IconCue inline N={N} word="statement" icon="stamp" size={84} color={PURPLE} sw={2.8} glow after={F0B} from="up" />
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 34, 16)}}>
        <CText cx={960} cy={626} size={34} weight={800} color={GREY} letterSpacing={5}>
          DECRYING THIS LATEST MOVE BY THE GOVERNMENT
        </CText>
      </div>
    </>
  );
};

/**
 * C13c —— 他们给出的判断（142.400–149.677s / 帧 4273–4490）
 * 念白：For them, the risk of abuse and selective enforcement is high,
 *       with growing evidence of targeted suppression or arbitrary takedowns
 *
 * 引语型镜头：主句立成大字，归属挂下方（这段话是三家组织的判断，不是旁白结论）。
 * 右侧 CIJ 声明原页截图作为证据卡 —— 这一句逐字出自该声明（sources.json 已核对）。
 */
const F0C = 4273;

export const C13c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0C;
  const n = N - F0C;

  const kickOp = fadeIn(n - 4, 14);
  const subOp = fadeIn(n - 96, 18);

  return (
    <>
      <div style={{position: 'absolute', left: 90, top: 268, width: 900}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 28, letterSpacing: 6, color: PURPLE, opacity: kickOp}}>
          FOR THEM
        </div>

        <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 6}}>
          <Pressed n={n} delay={26} size={74} text="THE RISK OF" color={GREY} />
          <div style={{display: 'flex', gap: 22, alignItems: 'center'}}>
            <Pressed n={n} delay={40} size={74} text="ABUSE" color={PURPLE} />
            <Pressed n={n} delay={52} size={74} text="AND" color={GREY} />
            <Pressed n={n} delay={60} size={74} text="SELECTIVE" color={PURPLE} />
          </div>
          <Pressed n={n} delay={74} size={74} text="ENFORCEMENT IS HIGH" color={PURPLE} />
        </div>

        <div style={{marginTop: 40, opacity: subOp}}>
          <div style={{height: 2, width: 420, background: 'rgba(255,255,255,0.24)'}} />
          <div style={{marginTop: 20, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 26, letterSpacing: 1.6, color: GREY, lineHeight: 1.5}}>
            GROWING EVIDENCE OF TARGETED SUPPRESSION
            <br />
            OR ARBITRARY TAKEDOWNS
          </div>
          <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 16}}>
            <span style={{width: 46, height: 2, background: GREY}} />
            <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 24, letterSpacing: 2.4, color: GREY}}>
              CIJ · ARTICLE 19 · SINAR PROJECT
            </span>
          </div>
        </div>
      </div>

      <EvidenceChip
        N={N}
        f0={F0C + 24}
        src="assets/malaysia2026/c13-cij.png"
        x={1088}
        y={236}
        w={430}
        h={556}
        org="CIJ"
        dateLabel="OCT 2025"
        tilt={-1.1}
        enter={16}
      />
    </>
  );
};
