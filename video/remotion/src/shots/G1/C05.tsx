import React from 'react';
import {useCurrentFrame} from 'remotion';
import {WHITE, GREY, PURPLE, CText, fadeIn} from '../../ui';
import {FONT_HEAVY} from '../../common';
import {Pressed} from '../../figures/PressWord';
import {IconCue} from '../../figures/IconCue';

/**
 * C05 —— 与数十年的政府主导告别（47.029–50.549s / 帧 1412–1540）
 * 念白：This marks a departure from decades of government-led media oversight
 *
 * 这一拍是第 1 章的收束，也是全片第一次「幕色变化」：整幕压深一层，
 * 用一条数十年跨度的刻度带把「decades」变成可见的长度，末端 government-led 灰化、留白交给下一章。
 * 刻度带不复用 C06a 的节点轴（那条讲两个时间点），这条只讲「长」。
 */
const F0 = 1412;
const TO = 1540; // 接到 C06a 起帧，段间不留空帧

const TICKS = 26;

export const C05: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;

  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const dim = fadeIn(n - 2, 18) * 0.62; // 整幕压深
  const headOp = fadeIn(n - 6, 14);
  const bandW = Math.min(1, Math.max(0, (n - 34) / 34)) * 1180;
  const tailOp = fadeIn(n - 72, 18);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      {/* 幕色：整幕压深一层，作为章节分隔 */}
      <div style={{position: 'absolute', inset: 0, background: '#050507', opacity: dim}} />

      <div style={{position: 'absolute', inset: 0, opacity: headOp}}>
        <CText cx={960} cy={318} size={30} weight={800} color={PURPLE} letterSpacing={7}>
          THIS MARKS
        </CText>
      </div>

      <div style={{position: 'absolute', left: 0, top: 386, width: 1920, display: 'flex', justifyContent: 'center', gap: 28}}>
        <Pressed n={n} delay={17} size={118} text="A" color={GREY} />
        <Pressed n={n} delay={21} size={118} text="DEPARTURE" color={WHITE} />
      </div>

      {/* 数十年刻度带：把「decades」变成可见的长度，末端灰化 */}
      <div style={{position: 'absolute', left: 370, top: 606, width: 1180, height: 46, opacity: fadeIn(n - 34, 18)}}>
        {Array.from({length: TICKS}).map((_, i) => {
          const x = (i / (TICKS - 1)) * 1180;
          const on = x <= bandW;
          const fade = i / (TICKS - 1); // 越靠右越暗，末段灰化
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x - 1,
                top: i % 5 === 0 ? 0 : 12,
                width: i % 5 === 0 ? 3 : 2,
                height: i % 5 === 0 ? 46 : 22,
                background: on ? `rgba(240,160,48,${(1 - fade * 0.75).toFixed(2)})` : 'rgba(255,255,255,0.12)',
              }}
            />
          );
        })}
      </div>

      <div style={{position: 'absolute', inset: 0, opacity: tailOp}}>
        <CText cx={960} cy={700} size={40} weight={800} color={GREY} letterSpacing={3.4}>
          FROM DECADES OF GOVERNMENT-LED OVERSIGHT
        </CText>
      </div>

      <IconCue N={N} word="decades" icon="hourglass" x={276} y={592} size={76} color={GREY} sw={2.4} after={F0} from="left" />
    </div>
  );
};
