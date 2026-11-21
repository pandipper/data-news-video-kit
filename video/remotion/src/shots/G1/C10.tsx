import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C10a —— 嫌疑人被捕并被起诉（94.686–99.833s / 帧 2842–2994）
 * 念白：Police subsequently arrested a suspect who was charged with assault
 *       and criminal intimidation
 *
 * 纵向三段时间线式的陈述：ARRESTED → CHARGED WITH。不用证据卡（这一段没有对应报道图）。
 */
const F0 = 2842;

export const C10a: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const kickOp = fadeIn(n - 4, 14);
  const chargeOp = fadeIn(n - 76, 18);
  const ruleW = Math.min(1, Math.max(0, (n - 56) / 24)) * 520;

  return (
    <>
      <div style={{position: 'absolute', left: 130, top: 300}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, opacity: kickOp}}>
          <span style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: PURPLE}}>
            POLICE SUBSEQUENTLY
          </span>
          <IconCue inline N={N} word="Police" icon="siren" size={48} color={GREY} sw={2.2} after={F0} from="left" hold={100} />
        </div>

        <div style={{marginTop: 26, display: 'flex', gap: 26, alignItems: 'center'}}>
          <Pressed n={n} delay={24} size={116} text="ARRESTED" />
          <Pressed n={n} delay={42} size={116} text="A SUSPECT" color={PURPLE} />
        </div>

        <div style={{height: 2, width: ruleW, background: 'rgba(255,255,255,0.26)', marginTop: 46}} />

        <div style={{marginTop: 34, opacity: chargeOp}}>
          <div style={{fontFamily: FONT_HEAVY, fontWeight: 800, fontSize: 28, letterSpacing: 6, color: GREY}}>CHARGED WITH</div>
          <div style={{marginTop: 20, fontFamily: FONT_HEAVY, fontWeight: 900, fontSize: 72, letterSpacing: -0.5, color: WHITE, lineHeight: 1.16}}>
            ASSAULT AND
            <br />
            CRIMINAL INTIMIDATION
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * C10b —— 认罪，罚款 2,000 令吉（99.833–104.606s / 帧 2995–3138）
 * 念白：pleaded guilty and was later fined 2000 ringgit, about 500 US dollars
 *
 * 量级型镜头：RM2,000 用大字号立住，gavel 贴 FINE。
 * 画面只写 RM2,000 —— 念白里的美元换算是补充说明，交给字幕，不重复上屏（证据清单的保守取值）。
 */
const F0B = 2995;

export const C10b: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0B;
  const n = N - F0B;

  const guiltOp = fadeIn(n - 4, 14);
  const fineT = Math.min(1, Math.max(0, (n - 96) / 22));
  const eF = 1 - Math.pow(1 - fineT, 3);

  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: guiltOp}}>
        <CText cx={960} cy={266} size={30} weight={800} color={PURPLE} letterSpacing={6}>
          PLEADED GUILTY
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 336, width: 1920, display: 'flex', justifyContent: 'center', gap: 24}}>
        <Pressed n={n} delay={22} size={96} text="FINED" color={GREY} />
      </div>

      <div style={{position: 'absolute', left: 0, top: 452, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
        <span
          style={{
            fontFamily: FONT_HEAVY,
            fontWeight: 900,
            fontSize: 176,
            lineHeight: 1,
            letterSpacing: -2,
            color: PURPLE,
            opacity: fineT,
            transform: `translateY(${((1 - eF) * 22).toFixed(1)}px)`,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          RM2,000
        </span>
        <IconCue inline N={N} word="fined" icon="gavel" size={104} color={PURPLE} sw={2.8} glow after={F0B} from="up" />
      </div>

      <div style={{position: 'absolute', left: 0, top: 686, width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(n - 130, 18)}}>
        <span style={{fontFamily: FONT_HEAVY, fontWeight: 700, fontSize: 28, letterSpacing: 3.4, color: GREY}}>ON A CRIMINAL INTIMIDATION CHARGE</span>
      </div>
    </>
  );
};
