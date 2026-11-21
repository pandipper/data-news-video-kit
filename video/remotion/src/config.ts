/**
 * 片子级配置（唯一需要按主题改的文件之一；另一个是 script/build_timeline.py 的章节表）。
 * 句 id（C01…C27）来自 script/build_timeline.py 转写的 timeline.ts（源为 1118文章 的词级对齐产物）。
 *
 * 本片与 a2e 模板的差异：
 *  - 画幅 1920×1080（模板 1280×720），共享层已按 ×1.5 重算；
 *  - 不跑 tts_build.py，配音用既有 TTS（assets/<slug>/audioFile），时间轴由 build_timeline.py 转写；
 *  - 主强调色为琥珀 #F0A030（模板为胶囊紫），见 src/ui.tsx。
 */
export type HudEntry = {fromS: string; toS: string; text: string; tech?: string; fromOffset?: number; toOffset?: number; w?: number};
export type RailSpec = {steps: string[]; switchS: string[]; fromS: string; toS: string};
export const VIDEO = {
  slug: 'malaysia2026', // 素材目录 public/assets/<slug>/
  /** 配音文件名（相对 public/assets/<slug>/）。本片是既有 TTS 的 mp3，不走 tts_build.py 的 audio.wav。 */
  audioFile: 'audio.mp3',
  /** 'en' 英文片：不压窄、不预扣基线、宽度兜底走 fitSize。 */
  lang: 'en' as 'zh' | 'en',
  /** 幕底：'dots' 点阵波（默认）｜'stars' 星点 + 雾底渐变。本片用点阵波，与琥珀强调色同一套深底语言。 */
  bg: 'dots' as 'stars' | 'dots',
  /** 片头：英文片 rest 留空（不显示），big 放主词，en 放全称，tagline 一句话钩子。 */
  title: {big: 'MALAYSIA', rest: '', en: 'DIGITAL NEWS REPORT 2026', tagline: 'A Year That Tested the Promise'},
  /** 片尾署名卡（内容压黑 + 末句字幕结束后 ≈2 s，aboveBar）。 */
  credit: {
    kicker: 'BASED ON',
    title: 'Malaysia — Digital News Report 2026',
    byline: 'Zaharom Nain · Aril Mikhail · Reuters Institute',
    note: 'Report imagery credited on screen',
  } as {kicker: string; title: string; byline: string; note: string} | null,
  /** 片尾署名行（默认开）。本片不署工具名，留空。 */
  builtBy: '',
  /** 章节英文副标（顺序对应 CHAPTER 1..6；章节卡从第 2 章起显示，索引 0 不用）。 */
  chapterTech: [
    'Chapter One',
    'Attacks · Arrests · The Act',
    'Three Organisations · One Portal',
    'Podcasts · Platforms',
    'Shareholders · Advertising · AI',
    'Trust Falls',
  ],
  /** 顶部 HUD 胶囊（当前小节名）：按句 id 区间；相邻条目自动无空档；跨章节卡自动淡出。 */
  /**
   * 顶部 HUD 胶囊：本片不用（用户 2026-11-20 定）。
   * 理由：底部进度条已经高亮当前章名，顶部再挂一次是重复；副标信息量也不足以占一条常驻胶囊。
   * 留空即不渲染（overlay/index.ts 按 HUD_RANGE 是否有效决定注册）。
   */
  hud: [] as HudEntry[],
  /** 流程轨（可选）：本片暂不给，等分镜定 B1 的 Act → Council 是否上轨。 */
  rails: [] as RailSpec[],
  /** 片尾压黑帧数 */
  endingFade: 30,
};
