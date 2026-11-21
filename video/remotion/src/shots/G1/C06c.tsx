import React from 'react';
import {useCurrentFrame} from 'remotion';
import {fadeIn, PURPLE} from '../../ui';
import {QuoteBlock} from '../../figures/EvidenceChip';
import {HaloRing} from '../../fx';
import {IconCue} from '../../figures/IconCue';

/**
 * C06c —— MMC 的表态：unnecessary and punitive（62.713–65.993s / 帧 1882–2003）
 * 念白：unnecessary and punitive and demanded his immediate release
 *
 * 图元层：右侧同心光环缓慢扩散（HaloRing + ripples），读作「公开发声」的声场，
 * 与左侧引语形成图文两端。引语必须带归属（MMC 说的，不是旁白结论），这是全片事实红线之一。
 */
const F0 = 1882;
const TO = 2003; // 延到下一段起（C07 帧 2004），避免段间留空帧

export const C06c: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;
  const n = N - F0;
  const exit = 1; // 硬切：末帧不淡出，与下一拍直接接上
  const ringIn = fadeIn(n - 10, 26);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: exit}}>
      {/* 词级图标 cue：punitive → 法槌，紧贴第二行 Punitive 的右缘 */}
      <IconCue N={N} word="punitive" icon="gavel" x={1186} y={602} size={86} color={PURPLE} sw={2.8} glow after={F0} from="left" />

      {/* 右侧声场：同心光环扩散 */}
      <div style={{position: 'absolute', inset: 0, opacity: ringIn * 0.9}}>
        <HaloRing cx={1640} cy={556} rxo={196} ryo={196} rxi={146} ryi={146} p={ringIn} fillOp={0.1} phase={n / 30} opacity={0.8} />
        <HaloRing cx={1640} cy={556} rxo={258} ryo={258} rxi={214} ryi={214} p={ringIn} fillOp={0} phase={n / 34} opacity={0.28} />
      </div>

      <QuoteBlock
        N={N}
        f0={F0}
        x={90}
        y={318}
        w={1500}
        size={168}
        text="Unnecessary | and Punitive"
        accent={['unnecessary', 'punitive']}
        by="MALAYSIAN MEDIA COUNCIL · JANUARY 2026"
      />
    </div>
  );
};
