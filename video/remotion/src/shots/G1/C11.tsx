import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';
import {Icon} from '../../icons';

/**
 * C11a —— 网络安全法生效（105.245–112.933s / 帧 3158–3388）
 * 念白：The major recent policy development has been the implementation in January 2026
 *       of the Online Safety Act 2025
 *
 * 法案型镜头：法规名用大字立住，下方挂生效月份，右侧 scroll 图标指代法案本身。
 */
const F0 = 3158;

export const C11a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickOp = fadeIn(n - 4, 14);
  const dateOp = fadeIn(n - 118, 18);
  const ruleW = Math.min(1, Math.max(0, (n - 96) / 26)) * 600;

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: kickOp}}>
        <CText cx={960} cy={286} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          THE MAJOR RECENT POLICY DEVELOPMENT
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 366, width: 1920, display: 'flex', justifyContent: 'center', gap: 26}}>
        <Pressed n={n} delay={22} size={98} text="ONLINE" />
        <Pressed n={n} delay={34} size={98} text="SAFETY" />
        <Pressed n={n} delay={46} size={98} text="ACT" color={PURPLE} />
        <Pressed n={n} delay={58} size={98} text="2025" color={PURPLE} />
      </div>

      <div style={{position: 'absolute', left: 960 - ruleW / 2, top: 512, width: ruleW, height: 2, background: 'rgba(255,255,255,0.26)'}} />

      <div style={{position: 'absolute', left: 0, top: 566, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 44, opacity: dateOp}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 82, letterSpacing: 3, color: WHITE}}>JANUARY 2026</span>
        <IconCue inline N={N} word="January" icon="calendar" size={76} color={PURPLE} sw={2.6} glow after={F0} from="up" />
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 158, 18)}}>
        <CText cx={960} cy={734} size={26} weight={700} color={GREY} letterSpacing={5}>
          CAME INTO FORCE
        </CText>
      </div>

      {/* 法案图标：贴 ACT 2025 右上，作为法规的视觉符号 */}
      <div style={{position: 'absolute', right: 232, top: 452, opacity: fadeIn(n - 62, 16)}}>
        <div style={{width: 88, height: 88, position: 'relative'}}>
          <Icon name="scroll" x={0} y={0} size={88} color="rgba(240,160,48,0.75)" sw={2.4} />
        </div>
      </div>
    </>
  );
};

/**
 * C11b —— 把平台纳入监管（112.933–115.800s / 帧 3389–3474）
 * 念白：which extends regulatory oversight of platforms
 *
 * 短拍（2.9s），只做一件事：把「监管范围扩到平台」视觉化 —— shield 撑开、平台方块进入其内。
 */
const F0B = 3389;

export const C11b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const boxT = Math.min(1, Math.max(0, (n - 6) / 20));
  const eB = 1 - Math.pow(1 - boxT, 3);
  const platT = fadeIn(n - 46, 18);

  return (
    <>
      {/* 监管框：从中心撑开 */}
      <div style={{position: 'absolute', left: 0, top: 372, width: 1920, display: 'flex', justifyContent: 'center'}}>
        <div
          style={{
            width: 300 + 420 * eB,
            height: 300,
            border: `3px solid rgba(240,160,48,${(0.35 + 0.5 * eB).toFixed(2)})`,
            borderRadius: 6,
            position: 'relative',
            boxShadow: '0 0 40px 6px rgba(240,160,48,.22)',
          }}
        >
          <div style={{position: 'absolute', left: 26, top: -22, background: '#0A0A0C', padding: '0 14px', fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 24, letterSpacing: 4, color: PURPLE}}>
            REGULATORY OVERSIGHT
          </div>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, opacity: platT}}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{width: 92, height: 92, position: 'relative', flexShrink: 0}}>
                <Icon name="layout-grid" x={0} y={0} size={92} color={i < 3 ? WHITE : PURPLE} sw={2.6} glow={i === 3} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 70, 18)}}>
        <CText cx={960} cy={742} size={38} weight={900} color={WHITE} letterSpacing={4}>
          PLATFORMS PULLED IN
        </CText>
      </div>
    </>
  );
};

/**
 * C11c —— TikTok 与 Instagram 受马来西亚法律约束（115.800–121.725s / 帧 3475–3652）
 * 念白：It means major platforms such as TikTok and Instagram are now automatically
 *       subject to a wider set of Malaysian laws
 *
 * 两个平台并置 + 下方结论。平台用文字立名（不用第三方 logo，避免暗示背书）。
 */
const F0C = 3475;

export const C11c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0C;
  const n = N - F0C;

  const plT = fadeIn(n - 60, 18);
  const conclT = fadeIn(n - 108, 18);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: fadeIn(n - 4, 14)}}>
        <CText cx={960} cy={340} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          MAJOR PLATFORMS
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 410, width: 1920, display: 'flex', justifyContent: 'center', gap: 40, opacity: plT}}>
        <div
          style={{
            width: 372,
            height: 164,
            background: '#0A0A0C',
            border: '2.5px solid rgba(255,255,255,0.85)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            flexShrink: 0,
          }}
        >
          <div style={{width: 62, height: 62, position: 'relative', flexShrink: 0}}>
            <Icon name="video" x={0} y={0} size={62} color={WHITE} sw={2.6} />
          </div>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 50, letterSpacing: 1, color: WHITE}}>TIKTOK</span>
        </div>
        <div
          style={{
            width: 372,
            height: 164,
            background: '#0A0A0C',
            border: '2.5px solid rgba(255,255,255,0.85)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            flexShrink: 0,
          }}
        >
          <div style={{width: 58, height: 58, position: 'relative', flexShrink: 0}}>
            <Icon name="camera" x={0} y={0} size={58} color={WHITE} sw={2.6} />
          </div>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 46, letterSpacing: 0.5, color: WHITE}}>INSTAGRAM</span>
        </div>
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: conclT}}>
        <CText cx={960} cy={676} size={34} weight={800} color={GREY} letterSpacing={5}>
          NOW AUTOMATICALLY SUBJECT TO
        </CText>
        <CText cx={960} cy={768} size={68} weight={900} color={PURPLE} letterSpacing={1}>
          MALAYSIAN LAWS
        </CText>
      </div>
    </>
  );
};
