import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, fadeIn} from '../../ui';
import {FONT_HEAVY, FONT_ORB} from '../../common';
import {EvidenceChip} from '../../figures/EvidenceChip';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';
import {BigNumber} from '../../fx';

/**
 * C08a —— Deol 当时在报道什么（74.428–80.000s / 帧 2234–2400）
 * 念白：Deol had been reporting on the Football Association of Malaysia's heritage-player
 *       document scandal
 *
 * 这一拍回答「他为什么被打」：把报道对象摆出来。右侧用 The Stoly 的报道卡
 * （已裁掉原图底部 "RM1.8 MILLION FINE" —— 那是念白外的数字，铁律不入片）。
 */
const F0 = 2234;
const TO = 2400;

export const C08a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickerOp = fadeIn(n - 6, 14);
  const subOp = fadeIn(n - 92, 16);
  const ruleW = Math.min(1, Math.max(0, (n - 70) / 24)) * 460;

  return (
    <>
      <div style={{position: 'absolute', left: 56, top: 244, width: 2, height: Math.min(1, Math.max(0, n / 22)) * 430, background: 'rgba(240,160,48,0.55)'}} />

      <div style={{position: 'absolute', left: 90, top: 244, width: 980}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE, opacity: kickerOp}}>
          REPORTING ON
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 4, marginTop: 30}}>
          <div style={{display: 'flex', gap: 24}}>
            <Pressed n={n} delay={24} size={118} text="THE DOCUMENT" />
          </div>
          <div style={{display: 'flex', gap: 26, alignItems: 'center'}}>
            <Pressed n={n} delay={44} size={118} text="SCANDAL" color={PURPLE} />
            <IconCue inline N={N} word="document" icon="file-text" size={82} color={PURPLE} sw={2.6} glow after={F0} from="right" />
          </div>
        </div>

        <div style={{marginTop: 40, opacity: subOp}}>
          <div style={{height: 2, width: ruleW, background: PURPLE}} />
          <div style={{marginTop: 20, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 34, letterSpacing: 1.5, color: WHITE, lineHeight: 1.3}}>
            FOOTBALL ASSOCIATION OF MALAYSIA
          </div>
          <div style={{marginTop: 10, fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 25, letterSpacing: 2.4, color: GREY}}>
            HERITAGE-PLAYER ELIGIBILITY FILES
          </div>
        </div>
      </div>

      {/* 词级 cue：document → file-text 已改为行内，贴在 SCANDAL 右侧 */}

      <EvidenceChip
        N={N}
        f0={F0 + 20}
        src="assets/malaysia2026/c08-fifa.jpg"
        x={1138}
        y={214}
        w={450}
        h={458}
        org="THE STOLY"
        dateLabel="SEP 2025"
        tilt={1.1}
        enter={16}
      />
    </>
  );
};

/**
 * C08b —— FIFA 的制裁（80.000–85.148s / 帧 2401–2554）
 * 念白：in which FIFA sanctioned the association and seven players for forgery
 *       and falsification linked to eligibility documents
 *
 * 模式取自 a2e 模式表「量级 / 阈值 → 大数字 + 对照物」：七名球员用 Orbitron 大数字立住，
 * 右侧配「协会」小盒，伪造用 file-x 图标。罚款金额念白没给，不上屏。
 */
const F0B = 2401;
const TOB = 2554;

export const C08b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const t7 = Math.min(1, Math.max(0, (n - 22) / 20));
  const e7 = 1 - Math.pow(1 - t7, 3);
  const assocOp = fadeIn(n - 56, 16);
  const forgOp = fadeIn(n - 82, 18);

  return (
    <>
      <div style={{position: 'absolute', left: 120, top: 258, opacity: fadeIn(n - 4, 14)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE}}>FIFA SANCTIONED</span>
      </div>

      {/* 七名球员：大数字 + 词，横排。用 a2e 的 BigNumber（CText 中心定位，避开行盒裁切） */}
      <BigNumber cx={196} cy={430} value="7" size={196} color={PURPLE} family={FONT_HEAVY} weight={900} shadow="none" opacity={t7} />

      <div style={{position: 'absolute', left: 296, top: 380, opacity: t7}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 76, letterSpacing: -0.5, color: WHITE, lineHeight: 1}}>PLAYERS</div>
        <div style={{marginTop: 12, fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 27, letterSpacing: 3, color: GREY}}>
          PLUS THE ASSOCIATION
        </div>
      </div>

      {/* 协会小盒 */}
      <div style={{position: 'absolute', left: 120, top: 606, opacity: assocOp}}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 26px',
            border: '2.5px solid rgba(255,255,255,0.45)',
            borderRadius: 4,
          }}
        >
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 30, letterSpacing: 3, color: WHITE}}>FAM</span>
          <span style={{width: 2, height: 26, background: 'rgba(255,255,255,0.3)'}} />
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 24, letterSpacing: 2.4, color: GREY}}>THE ASSOCIATION</span>
        </div>
      </div>

      {/* 伪造：图标与文字同一 flex 流，图标在左 */}
      <div style={{position: 'absolute', left: 880, top: 372, display: 'flex', alignItems: 'flex-start', gap: 24, opacity: forgOp}}>
        <div style={{flexShrink: 0, width: 92, height: 92, position: 'relative', marginTop: 6}}>
          <Icon name="file-x" x={0} y={0} size={92} color={PURPLE} sw={2.8} glow />
        </div>
        <div>
          <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 52, letterSpacing: 0.5, color: WHITE, lineHeight: 1.12}}>
            FORGERY AND
            <br />
            FALSIFICATION
          </div>
          <div style={{marginTop: 16, fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 25, letterSpacing: 2.4, color: GREY}}>
            OF ELIGIBILITY DOCUMENTS
          </div>
        </div>
      </div>

      {/* 右上出处 */}
      <div style={{position: 'absolute', right: 120, top: 268, opacity: fadeIn(n - 40, 20), textAlign: 'right'}}>
        <div style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 26, letterSpacing: 4, color: 'rgba(240,160,48,0.8)'}}>SEP 2025</div>
        <div style={{marginTop: 12, fontFamily: FONT_HEAVY, fontWeight: 600, fontSize: 22, letterSpacing: 2, color: GREY, lineHeight: 1.6}}>
          FIFA DISCIPLINARY COMMITTEE
          <br />
          ARTICLE 22 · FORGERY
        </div>
      </div>
    </>
  );
};
