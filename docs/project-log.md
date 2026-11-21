# Malaysia Digital News Report 2026 — 重做工程

最后更新 2026-11-20。这份文件是接手入口，读完能直接往下做。

## 一句话现状

骨架已落地并跑通：a2e 模板改成 1920×1080，琥珀强调色，既有 TTS 与 217 条词级字幕已接入，六个章节与 HUD 已配好，片头与章节卡已抽帧验证。
镜头（shots）仍是空的，下一步是按分镜写镜头。

## 与 1118文章 的关系

1118 是旧方案（talkcraft 卡 + 去 Host + 羊皮纸编辑风），方向作废，只搬了不可再生资产。

| 搬过来了 | 没搬 |
|---|---|
| TTS 音轨 audio.mp3（48k 立体声，332.927s） | 旧 Remotion 工程（B1Pilot、九张蒙皮卡、CardTest、MixTest） |
| 词级时间轴四件套（words / phrases / subs / timing + srt） | 两条旧样片、14 张旧抽帧 |
| locked_script.md（权威文案）、termbase.md | _ref 三个库 clone（1.37G，按新选型重新取用） |
| SHOTBOOK.md（Phase 1 分镜，Gate 1 已过） | 对齐模型 1.84G、切段音频 |
| 取证素材（9 张新闻图 / 10 头像 / 8 logo / 原文页长图 + targets） | 顶层 Jho Low 三件（与本片无关） |
| evidence-checklist.md、narration-full.md | 16 岁禁令信息图（用户已决定不入片） |

## 目录地图

```
D:\TK运营\1120文章\
├── README.md                  本文件
├── script\                    文案、时间轴、生成脚本
│   ├── build_timeline.py      从 1118 对齐产物转 timeline.ts / subs.ts
│   ├── locked_script.md       权威文案（画面文字以此为准）
│   ├── termbase.md            术语表
│   ├── words.json             831 词带起止
│   ├── phrases.json subs.json timing.json narration-phrase.srt
│   └── build_timeline.py 生成的产物写到 video/remotion/src/common/
├── assets\                    素材（3.1M）
│   ├── sources.json           ★ 证据出处总表：机构 + 日期 + URL + 事实红线
│   ├── news\                  9 张新闻截图（降级为可选小图）
│   ├── portrait\              11 张（含从 Malay Mail 卡裁出的 rex-tan.jpg）
│   └── logo\                  8 个 + MANIFEST.md 授权表
├── storyboard\SHOTBOOK.md     Phase 1 分镜
├── docs\
│   ├── evidence-checklist.md  取证判定权威文档
│   ├── narration-full.md      831 词口播全文
│   └── page\                  原文页长图 2560×24090 + targets.json
├── video\
│   ├── remotion\              工程（a2e template 派生）
│   ├── qa\                    抽帧
│   └── renders\               成片
├── _libs\shotcraft\           镜头弹药库（152 个可跑 .tsx，待取用）
├── _ref_anything2explainer\   模板源（只读参照）
└── _tools\                    playwright-core 1.65 + 抓取/验证脚本
```

## 工程改造清单（a2e 模板 → 本项目）

| 项 | 模板原值 | 本项目 | 位置 |
|---|---|---|---|
| 画幅 | 1280×720 | **1920×1080** | `common/lib.tsx` W/H，另导出 `K = 1.5` |
| 强调色 | 紫 #6630F8 | **琥珀 #F0A030** | `ui.tsx` 的 PURPLE 系列 + 全部 rgba(102,45,248) 光晕 |
| 字幕 | 44px / top 637 / maxW 1160 | 66px / top 956 / maxW 1740，描边 6px | `common/Subtitle.tsx` |
| 进度条 | BAR_TOP 687 / 24px / 1280 基准 | 1030.5 / 36px / 1920 基准 | `common/ProgressBar.tsx` |
| HUD 胶囊 | y28 h51 w216 | y42 h76.5 w324 | `overlay/Overlay.tsx` |
| 流程轨 | CX 240-1040 / 150×44 | CX 360-1560 / 225×66 | `overlay/Overlay.tsx` |
| 雾底 | top415 bottom687 / 1280 宽 | 622.5 / 1030.5 / 1920 宽 | `common/Fog.tsx` |
| 星点区 | region 0,0,1280,687 | 0,0,1920,1030 | `common/StarField.tsx` |
| Glitch 切片 | 硬编码 720 | 1080 | `common/Glitch.tsx` |
| 图元默认坐标 | cx 640 / cy 331·428 等 | 960 / 496.5·642 等 | `ui.tsx`、`fx.tsx` |
| 配音 | tts_build.py 产出 audio.wav | 既有 TTS 的 audio.mp3 | `config.ts` audioFile + `Main.tsx` |

`_ref_anything2explainer/template/` 是只读源，改工程不要回头改它。

## 时间轴接入（不跑 tts_build.py）

配音与词级对齐 1118 已配好，本片跳过 TTS 环节，只做转写：

```
python script/build_timeline.py
```

产出 `video/remotion/src/common/timeline.ts`（TOTAL_FRAMES / CHAPTER_STARTS / SENTENCES）与 `subs.ts`（217 条）。
帧号规则与 a2e 一致：`from = round(sec*30)+1`，`to = round(end*30)`，1 起含端点。

当前值：**9988 帧念白 + 120 帧尾留 = 10108 帧**（336.9s，念白 332.929s）。
尾留 120 帧是给片尾压黑（30 帧）与署名卡（94 帧）用的，不是静音填充错误。

六个章节（按音频间隙切，边界落在 0.65s 段间）：

| 章 | 名称 | 起始帧 | 覆盖 |
|---|---|---|---|
| 1 | THE COUNCIL | 1 | C01-C06 |
| 2 | PRESSURE | 2004 | C07-C12 |
| 3 | BACKLASH | 3949 | C13-C16 |
| 4 | CREATORS | 5453 | C17-C20 |
| 5 | THE MONEY | 7223 | C21-C24 |
| 6 | TRUST | 9292 | C25-C27 |

**本片与模板的两处结构性差异**（都已在代码里处理，改分镜时别忘）：

1. **片头没有留白**。模板假设 tts_build 会在首句前留 LEAD，本片首句从 0.000 开始。
   片头标题改为固定 90 帧（3 s）与首句前段共存，见 `TITLE_RANGE`；HUD 首条延后 89 帧。
2. **章间没有留白**。章间只有约 20 帧，放不下独立章节卡。
   章节卡改为覆盖在章首镜头上，45 帧（1.5 s），见 `CARD_LEN`；章首 HUD 自动延后 44 帧。

## 素材清单与缺口决策

素材策略按用户 2026-11-20 定：**新闻不需要截图原图，标注出处 + 说清事实即是证据**。
于是证据卡从「真图缓推」改成「文字排版卡」，9 张新闻截图降级为可选小图，不再阻塞成片。

`sources.json` 是画面出处的唯一取用口，每条含 kicker（机构）、dateLabel（如 `MALAY MAIL · JAN 2026`）、headline、sources（org + date + url）、media（可用素材）、redline（事实红线）。

27 条事实、34 条出处，已用 `_tools/verify_sources.mjs` 逐条访问核对，仅 ARTICLE 19 一条对 headless 返回 403（Cloudflare），URL 本身有效（搜索结果可证）。

已补齐：

| 缺口 | 处理 |
|---|---|
| Rex Tan 单人头像 | 从 Malay Mail 社媒卡裁出 `assets/portrait/rex-tan.jpg`（470×640，单人、无台标、含麦克风与格纹围巾） |

已决定不补（并记录理由）：

| 缺口 | 决策 |
|---|---|
| Keluar Sekejap / Yang Berhenti Menteri 节目封面 | 不抓。YouTube 频道头像抓取超时且低质；改用人物卡 + 节目名 + 平台标识表达 |
| MMC / Media Chinese International / Sin Chew / China Press / Nanyang logo | 不用 logo。改用文字报头式排版，比贴 logo 更合 code-drawn 语言 |
| 新闻截图分辨率不足（最高 1638px） | 不再是问题：截图只作可选小图，证据主角改文字卡 |

仍存在的软约束：

| 素材 | 分辨率 | 用法建议 |
|---|---|---|
| johari-abdul-ghani.jpg | 500×375，双人合影 | 只能做 ≤500px 宽的人物卡，且必须标注非单人 |
| amir-nashrin.jpg / rafizi-ramli.jpg / khairy-jamaluddin.jpg | 500-633px 宽 | 半幅以内的人物卡可用，不做全屏 |
| ashwad-ismail.jpg | 1110×694，三人群像 | 中间为本人，必须标注 |
| the-game-of-impossible-leon-idris.jpg | 640×640，双人+节目 | Leon 由此覆盖，标注双人 |

## 当前验证状态

- `npx tsc --noEmit` 通过
- 片头满态帧：`video/qa/probe_mid.png`（MALAYSIA 白字琥珀硬投影 + DIGITAL NEWS REPORT 2026 + tagline）
- 章节卡帧：`video/qa/probe_chapter2.png`（02 / PRESSURE / Attacks · Arrests · The Act，居中完整，进度条高亮正确）
- 画面规格：1920×1080，30fps

## 证据图元（已落地，C06b 样板验证通过）

真图不再当全屏主角，改成**画面里的证据块**。这是本次方案的关键转折：截图缩到 320-520px 后，所有源图都是**缩小使用**（缩放比 0.26-0.84），不存在放大糊边，之前判定的「分辨率缺口」在这个用法下不成立。

代码位置：

| 文件 | 内容 |
|---|---|
| `src/figures/EvidenceChip.tsx` | `EvidenceChip`（截图卡）+ `QuoteBlock`（带归属的引语块） |
| `src/texture.tsx` | `Halftone` 半色调网点 + `Grain` 轻噪点 + `PRINT_FILTER` |
| `src/shots/G1/C06b.tsx` | C06b 样板镜头（帧 1673-1877） |

EvidenceChip 规格：

| 项 | 值 |
|---|---|
| 卡宽 | 320-520px（显示宽 ≤ 源图宽 × 1.2，本片全部满足） |
| 纸边 | 10px `#EFEBE0` 暖白（paper-title-card 纸底同族） |
| 投影 | `0 22px 54px rgba(0,0,0,0.62)`，**全片只允许这一处投影** |
| 出处 tab | 卡外左上，琥珀底黑字，机构 + 日期合并：`MALAY MAIL ｜ 17 JAN 2026` |
| 印刷质感 | `contrast(1.12) saturate(0.58)` + 白色网点 overlay 0.3（dot 4.5px）+ 噪点 overlay 0.07 |
| 入场 | 12 帧：scale 1.06→1 + blur 6px→0 + 淡入（shotcraft paper-title-card 压印配方） |
| 微倾角 | ±1.5°，多张时错开 |

版式约定（C06b 定的基准，后续证据卡沿用）：左侧编辑式大字标题（逐词压印，字号 150/92 两档），右侧证据卡，出处与图始终同框。全片英文一律 Title Case 或 ALL CAPS。

取用素材前先把要入画的截图裁成合适比例（去掉平台台标与原图的渐变边），放在 `public/assets/malaysia2026/`，文件名用段号前缀。

## C06 三拍（已完成，可作为证据段落的模板）

C06 拆成三拍，节奏是「机构姿态 → 具体事件 → 机构表态」，只有中间一拍用图。

| 拍 | 帧 | 念白 | 语言 | 是否用图 |
|---|---|---|---|---|
| C06a | 1541–1672 | The MMC has moved quickly to take public positions on press freedom incidents | 居中文字卡（PUBLIC POSITIONS / ON PRESS FREEDOM INCIDENTS / ESTABLISHED JUNE 2025） | 不用 |
| C06b | 1673–1881 | In January it called the arrest of journalist Rex Tan... | 左文右图证据卡 | Malay Mail 卡 520×584 |
| C06c | 1882–2003 | unnecessary and punitive and demanded his immediate release | 引语块 + 归属 | 不用 |

这条经验值得记住：**不是每个拍子都要图**。C06a 是机构姿态的总括，C06c 是引语，两者都没有对应的新闻图片（现实中也没有），强行配图会与 C06b 的唯一证据卡撞车，反而分散注意力。一张卡的分量来自它是这一段的唯一一张。

相邻两拍构图相反（居中 ↔ 左文右图 ↔ 左对齐引语），这是 SHOTBOOK 里「相邻 beat 首尾语言不同」的落地方式。

## 图元层（每拍必检，C06 三拍已补）

模板的丰富度来自三层，缺一层画面就露陷：

| 层 | 内容 | C06 第一版 |
|---|---|---|
| 排版层 | 字号层级、逐词压印、栏线、分隔线 | 有 |
| **图元层** | icon、节点、网格、光环、仪表、时间轴 | **缺** |
| 运动层 | 相机、视差、glitch、光扫 | 部分（只有入场压印） |

C06 第一版只做了排版层 + 真图层，画面读作「排版」而不是「MG 动画」。原因是把注意力全放在「图与文字怎么咬合」，把 a2e 那 496 行图元（LLMIcon / DBIcon / DocIcon / ClusterGrid / Gauge / TimelineBar / CodeCard / PersonIcon）和 242 行 fx（HaloRing / 光效 / vignette）整个漏掉了。

**规则：每拍至少一个承担信息的图元层，不是装饰。** 抽帧检查时问一句「除了字和真图，有没有图形在说明事情」。

题材图元映射（全部用 a2e 现成件组合，不新画）：

| 抽象概念 | 图元形态 | 用哪个现成件 |
|---|---|---|
| 机构 | 徽记块 + 外环 | `Pill` / `HaloRing` |
| 法规 | 文件页 + 条文条 | `DocIcon` / `TimelineBar` |
| 数据 | 折线 / 柱 / 仪表 / 大数字 | `Gauge` / `BigNumber` / `Counter` |
| 人物 | 圆头像框 + 身份行 | `PersonIcon` / `Pill` |
| 事件 | 时间节点 + 脉冲 | 节点轴（C06a 已固化为写法） |
| 平台 | 方块矩阵 | `ClusterGrid` |
| 流程 | 节点 + 箭头 | `LineArrow` / `ArrowH` |
| 发声 / 声场 | 同心环扩散 | `HaloRing` + ripples |

C06 三拍现在的图元配置：

| 拍 | 图元层 |
|---|---|
| C06a | 时间轴（`JUN 2025 ● ——— ○ JAN 2026`，轴向右生长、末端节点 pulse）+ 右侧点阵网格 + 上下编辑细线 |
| C06b | 左栏竖栏线 + 琥珀横分隔线 + 证据卡本身（纸边、tab、网点） |
| C06c | 双层同心光环（HaloRing，读作公开发声的声场）+ 引语竖棒 |

## 题材图标（48 个已入库，两页探针已渲）

与「背景点阵」是两件不同的事：

| | 背景矩阵 | 题材图标 |
|---|---|---|
| 形态 | 170 个 66px 铺满，灰阶，按节拍点亮 | 单个 40-400px，有明确语义 |
| 作用 | 纹理 / 数量感 | 承担信息：麦克风=提问、法槌=裁决 |
| 规范出处 | `composition-and-light.md:18`（表现「多」用矩阵） | `agent-build-rules.md:16`（图元优先用现成的） |

**来源**：Lucide 1.76 线性图标，ISC 许可（可商用、无需署名），经 jsDelivr 下载。许可原文 `_tools/LUCIDE_LICENSE.txt`。
选它的原因：24 基准 viewBox + round 线帽 + 纯描边，与 a2e 的白线稿图元同语言，零适配成本。

**颜色可控性已逐个验证**：48 个 SVG 里没有任何硬编码色值，全部 `stroke=currentColor` / `fill=none`；
`vault` 的实心部分也是 `fill=currentColor`。所以传 `color` 即改色，白 / 灰 / 琥珀 / 任意 token 都能直接切，`glow` 走琥珀柔光。

**代码**：`src/icons.tsx`，导出 `Icon`（单图标）与 `IconBadge`（图标 + 描边方框，a2e 的实体图元形态）。
线宽按**视觉像素**给：`sw` 是屏幕上的实际描边宽度，内部换算成 viewBox 单位，size 从 40 放大到 400 线宽不变粗。

**探针**：`IconProbeA`（22 个，媒体 / 法律 / 文书）、`IconProbeB`（24 个，数据 / 平台 / 人物 / 时间）。
抽帧在 `video/qa/icons_a.png`、`video/qa/icons_b.png`，每格三档：大尺寸白线（造型）／小尺寸白线（缩小可辨）／小尺寸琥珀（入片强调态）。

A 页（语义最硬，优先级高）：

| 图标 | 语义 | 覆盖 beat |
|---|---|---|
| `mic` | 提问 / 播客 | C06 C18 C19 |
| `camera` | 袭击被拍摄 | C07 C09 |
| `newspaper` | 媒体机构 / 印刷 | C14 C24 |
| `video` `podcast` `radio` `headphones` `megaphone` `message-square` | 播客 / 广播 / 发声 / 评论 | C06 C13 C18 C19 C20 |
| `gavel` | 法庭 / 罚款 | C10 |
| `shield` | 监管 / 保护 | C03 C11 C12 |
| `stamp` | 公文 / 官方声明 | C04 C08 C13 |
| `scale` | 公正 / 悖论 | C02 C13 |
| `scroll` | 法案 | C04 |
| `fingerprint` `siren` | 身份 / 警察 | C03 C06 |
| `lock` `ban` `eye-off` | 限制 / 禁令 / 审查 | C11 C12 C13 |
| `file-text` `file-x` | 文件 / 伪造 | C04 C08 C15 |
| `quote` | 引语 | C13 |

B 页（辅助）：`chart-pie` `percent` `trending-down` `banknote` `briefcase` `layout-grid` `smartphone` `tv` `globe` `cpu` `bot` `user` `users` `building-2` `landmark` `badge-check` `award` `calendar` `clock` `hourglass` `split` `triangle-alert` `scissors` `vault`

**建议舍弃或降级**（探针看下来的判断，用不用由镜头定）：

| 图标 | 问题 |
|---|---|
| `vault` | 造型像「打叉的方框」，缩到 34px 读不出是保险箱 |
| `split` | 悖论语义偏弱，不如用 `scale` 天平或两个对冲文字 |
| `radio` vs `podcast` | 语义重叠，同片只用其一 |
| `award` vs `badge-check` | 都指「最可信」，同片只用其一 |
| `coins` `sparkles` | 已从探针移除（语义弱 / 与 `bot` 重复），仍留在库里备查 |

**使用原则**（用户 2026-11-20 定）：语义要明确、配色要搭；放不进去的可以不用，不为了凑图元硬塞。图元是信息，不是填空。

## 词级图标 cue（C06 已落地，规则已固化）

念白念到某个词的同一帧，图标入场。时间不手填秒数，查 `common/wordtime.ts`（由 `build_timeline.py` 从 831 词对齐产物生成，468 个词条，每词带全部出现帧）。

**四条规则（用户 2026-11-20 定，按优先级）**：

1. **图标只贴在「画面上真实出现的那个词」旁边。** 画面上有 `ARRESTED`，siren 就贴它右缘；画面上没有这个词，就不出图标。
2. **没有具体实物可指代的抽象词不放图标。** `public` / `positions` / `departure` / `prospect` 一律不用。宁可这一拍没有图标，也不要为了"丰富画面"硬塞语义牵强的。
3. 一镜最多 3 个 cue，4 个就是图标雨。
4. 入场轨迹不得穿过字幕带（y956 起），顶到 y930 为止。

**代码**：`src/figures/IconCue.tsx`（`IconCue` 单图标 cue、`CueLabel` 图标+短标签咬合单元）。
入场用 paper-title-card 的压印配方：scale 1.28→1 + blur 7→0 + 方向位移 24px，12 帧；`hold` 到点后 8 帧淡出。
词表里查不到的词会在终端 warn 一次，不静默失败。

**C06 三拍的 cue 配置**（示范"有就放、没有就不放"）：

| 拍 | cue | 理由 |
|---|---|---|
| C06a | **0 个** | 画面是 `PUBLIC POSITIONS` / `ON PRESS FREEDOM INCIDENTS`，全是抽象概念，没有任何实物可指代。硬配扩音器和警告三角属于"无意义展示"，已删除 |
| C06b | 3 个：`January`→`calendar`（贴 JANUARY 2026 右缘）、`arrest`→`siren`（贴 ARRESTED 右缘）、`question`→`message-square`（贴说明行右缘） | 三个词都在画面上，三个图标都直接指代 |
| C06c | 1 个：`punitive`→`gavel`（贴 Punitive 右缘） | 引语本身力量足够，只补一个，不加第二个 |

这张表也是后续 50 镜的判据：先看画面上有哪些具体词，再决定放不放图标。

## 第 1 章进度（THE COUNCIL，0–66.8s）

镜头已排到「连续可看」的程度，帧区间首尾相接、无空帧：

| 拍 | 帧 | 时长 | 念白 | 画面语言 |
|---|---|---|---|---|
| 片头 | 1–90 | 3s | — | MALAYSIA / DIGITAL NEWS REPORT 2026 / tagline（覆盖层） |
| C01 | 91–257 | 5.6s | 作者与出版 | 左署名（逐词压印）+ 右出版日期（Orbitron）+ 编辑竖线 |
| C02a | 258–408 | 5.0s | sharp paradox | 顶标签逐词浮现 + A SHARP PARADOX + 两条对冲线 + 天平 |
| C02b | 409–554 | 4.9s | MMC 2025 运作 | 左机构名 + 右 2025 超大数字（Orbitron）+ landmark |
| C02c | 555–678 | 4.1s | self-regulation | 居中 GENUINE / SELF-REGULATION + shield |
| C03 | 679–880 | 6.7s | 事件冲击 | 两行事件（左竖线 + 图标 + 引线）+ HOPES TESTED |
| C04a | 881–1120 | 8.0s | 法案 → 机构 | 左 ACT 盒 → 箭头 draw-on → 右 COUNCIL 盒（琥珀光）+ JUNE 2025 |
| C04b | 1121–1400 | 9.3s | 六类代表 | 左 MMC 徽记 + 右六条编号条目按念白依次入场 |
| C05 | 1412–1540 | 4.3s | 告别政府主导 | 整幕压深 + A DEPARTURE + 数十年刻度带（26 格渐变灰化） |
| C06a | 1541–1672 | 4.4s | MMC 迅速表态 | 居中 PUBLIC POSITIONS + 时间轴（JUN 2025 → JAN 2026）+ 点阵 |
| C06b | 1673–1881 | 7.0s | Rex Tan 被捕 | 左编辑大字 + 右 Malay Mail 证据卡 + 3 个词级 cue |
| C06c | 1882–2003 | 4.1s | unnecessary and punitive | 引语块 + 归属 + 双层光环 + gavel |

两条已渲片段：

- `video/renders/opening-30s.mp4` —— 0–30 秒（片头 + C01 + C02 三段 + C03）
- `video/renders/c06-sequence.mp4` —— 51–67 秒（C06 三拍，图元层补完前渲染，需重渲）

**C07 之后尚未开始。**

## 已知待办

| 项 | 说明 |
|---|---|
| 镜头转场 | 每拍末尾都有 exit 淡出 + 下一拍淡入，会出现短暂暗场。需要逐段确认是否改成硬切（a2e 多数拍是硬切，只有章界与让位才淡出） |
| C02a 开场 | 已改为顶标签逐词浮现填掉 3.5 秒空窗，需重渲确认 |
| 刻度带 | C05 的 26 格刻度带读作「时间跨度」，与 C06a 的节点轴不冲突（一个讲长，一个讲点），但要确认视觉上不重复 |

## 第 2 章进度（PRESSURE，66.8s 起）

| 拍 | 帧 | 念白 | 画面语言 |
|---|---|---|---|
| 章节卡 | 2002–2046 | — | 02 / PRESSURE / Attacks · Arrests · The Act，覆盖在 C07 上 |
| C07 | 2004–2233 | Deol 白天遇袭 | 左 ATTACKED IN DAYLIGHT + HARESH DEOL + 右 Rakyat Post 卡（438×548）+ 2 个 cue |
| C08a | 2234–2400 | 报道 FAM 文件丑闻 | 左 THE DOCUMENT SCANDAL + FAM 全称 + 右 The Stoly 卡（450×458）+ file-text |
| C08b | 2401–2554 | FIFA 制裁七人 | 大数字 7 + PLAYERS + FAM 盒 + FORGERY AND FALSIFICATION（file-x）+ 右上出处 |

C09–C12（2555–3948）尚未开始。

## 两条已固化的工程规则

**一 镜头末帧一律硬切。** 用户 2026-11-20 定：结尾不要淡入淡出，保持连贯性。
十拍全部改成 `const exit = 1`，转到下一拍不出现暗场。

**二 章节卡必须挂在镜头上层。** 这条是踩坑修来的：

a2e 原设计里章节卡占「章前空白」，所以它被放在 `SHOTS_OVERLAY`（层序最低）。
本片章间只有 20 帧、章节卡改成「覆盖在章首镜头上」，如果还留在最低层，就会被 `SHOTS_G1`–`G8` 的镜头整个盖住。
已移到 `SHOTS_OVERLAY_TOP`（片尾压黑之下、进度条之上）。

## 字形相关的坑（两条）

**一 Orbitron 与 Audiowide 的 `0` 都是斜杠零。**
`lessons.md:63` 只记了「孤立 0 会读成 Ø」，实测**多位数里同样是 Ø**：`2026` 上屏读作 `2Ø26`，`2025` 读作 `2Ø25`。
同一族字体还有造型问题：Orbitron 的 `7` 是「横杠 + 直角下垂」，孤立时像 `⌐`；Audiowide 的 `J` 是方角。

结论：**画面上的数字一律用 `FONT_HEAVY`**（Noto Sans SC，标准字形），靠字重 900 + 字距补回重量感。
`FONT_ORB` / `FONT_WIDE` 只用于纯装饰性、不承载数字的场合。

**二 图标必须行内排版，不能用绝对坐标对。**
用户 2026-11-20 指出 C07 的图标「和文字、横线黏在一起，还高一点低一点」。

根因是我用手算坐标对齐 —— 字宽估算永远差几十像素，字号一变就偏。已给 `IconCue` 加 `inline` 模式：

```tsx
<div style={{display: 'flex', alignItems: 'center', gap: 26}}>
  <span>NOVEMBER 2025</span>
  <IconCue inline N={N} word="November" icon="calendar" size={44} ... />
</div>
```

flex 自动垂直居中、`gap` 控间距，文字改字号或改内容都不会错位。`inline` 模式下 `x` / `y` 不生效，图标尺寸即盒子尺寸。

**规则：图标贴文字一律走 inline + flex；绝对坐标只用于贴卡片边缘（出处 tab、角落标记）。**

已改行内的：C01（user / calendar）、C02b（landmark）、C03（camera / siren）、C06b（calendar / siren / message-square）、C07（calendar / user）、C08a（file-text）。

## 素材处理：念白外数字必须裁掉

The Stoly 的 FIFA 卡底部原有大字 **「FIFA SLAPS FAM WITH RM1.8 MILLION FINE」**，而念白 C08 只说 `sanctioned for forgery and falsification`，没给罚款金额。
按铁律「念白没说的数字不上屏」，用 ffmpeg 裁到 `crop=478:486:0:0`，只留球队照 + FIFA Media Release 卡，金额彻底不入片。

## 顶部 HUD 已移除（用户 2026-11-20 定）

原来顶部挂一条琥珀胶囊写当前小节名（`PRESSURE` / `THE COUNCIL`），底下还跟一行 tech 副标。
用户指出：**底部进度条已经高亮当前章名，顶部再挂一次是重复**，不必黄标。

处理：`config.ts` 的 `hud` 置空，`SHOTS_OVERLAY` 按 `HUD_RANGE` 无效自动不注册。
章节转场时的「02 / PRESSURE」章节卡保留 —— 那是过渡卡，不是常驻标。

移除后画面顶部空出来，内容重心可以整体上移。

## 第 2 章完整（PRESSURE，66.8–131.0s）

| 拍 | 帧 | 念白 | 画面语言 |
|---|---|---|---|
| 章节卡 | 2002–2046 | — | 02 / PRESSURE / Attacks · Arrests · The Act |
| C07 | 2004–2233 | Deol 白天遇袭 | 左 ATTACKED IN DAYLIGHT + 右 Rakyat Post 卡 |
| C08a | 2234–2400 | 报道 FAM 文件丑闻 | 左 THE DOCUMENT SCANDAL + 右 The Stoly 卡 |
| C08b | 2401–2554 | FIFA 制裁七人 | 大数字 7 + FAM 盒 + FORGERY（file-x） |
| C09a | 2566–2671 | 两人动手一人拍 | 两个并置盒（2 MEN / 1 + camera）+ WHILE |
| C09b | 2672–2841 | 媒体自由组织担忧 | 居中 GERAKAN MEDIA MERDEKA + POSSIBLE INTIMIDATION |
| C10a | 2842–2994 | 被捕与起诉 | ARRESTED A SUSPECT + CHARGED WITH |
| C10b | 2995–3157 | 认罪罚 RM2,000 | FINED + RM2,000 大字 + gavel |
| C11a | 3158–3388 | OSA 生效 | ONLINE SAFETY ACT 2025 + JANUARY 2026 + scroll |
| C11b | 3389–3474 | 监管扩到平台 | 监管框撑开 + 四个平台方块 |
| C11c | 3475–3652 | TikTok 与 Instagram | 两个平台盒 + MALAYSIAN LAWS |
| C12 | 3666–3948 | 政府的三个理由 | 三条编号理由（shield / ban / alert） |

成片片段：`video/renders/ch1-ch2.mp4`（0–131 秒，第 1 章 + 第 2 章完整）。

## 新踩的坑：a2e 的 Box 是绝对定位组件

`Box` 的 `x` / `y` 是相对画布的绝对坐标。把它放进 `position:absolute` 的 flex 容器里，偏移会叠加两次 —— C11c 的两个平台盒因此飞出原位，压在结论文字上。

需要并排盒子时用普通 `div` + `width` / `height` / `border`，不要用 `Box`。
同理，任何 `position:absolute` 的图元（`Box`、`Icon`、`IconCue` 非 inline 模式）都不能直接塞进 flex 流，否则脱离排版压住相邻文字。

## 第 3 章 / 第 4 章进度

**第 3 章 BACKLASH（131.6–181.0s）** —— `video/renders/ch3.mp4`，1504 帧 / 50.18s

| 拍 | 帧 | 内容 | 画面 |
|---|---|---|---|
| C13a | 3949–4205 | 三个组织 | 三行并列 + users + `ONE JOINT STATEMENT · NOT THREE SEPARATE ONES` |
| C13b | 4206–4272 | 发长声明 | ISSUED A LENGTHY STATEMENT + stamp |
| C13c | 4273–4511 | 滥用风险高 | 引语大字 + 三组织归属 + CIJ 声明卡 |
| C14 | 4512–4669 | Malaysiakini 艰难一年 | newspaper + A TROUBLED YEAR |
| C15a | 4670–4890 | 2024 裁员 → 2026 三月 | 左右并置 + 时间线 |
| C15b | 4891–5051 | 三百万令吉被挪用 | RM 3 MILLION + The Edge 卡 |
| C15c | 5052–5275 | 前员工 → 非法投资计划 | 三段流程 + 两个 draw-on 箭头 |
| C16 | 5276–5452 | 十多年的储备 | MORE THAN A DECADE + 十一格刻度带 |

**第 4 章 CREATORS（181.7–240.4s）** —— `video/renders/ch4.mp4`，1759 帧 / 58.6s

| 拍 | 帧 | 内容 | 画面 |
|---|---|---|---|
| C17a | 5453–5676 | 32% 从创作者取新闻 | 32% 超大数字 + OF MALAYSIANS |
| C17b | 5677–5809 | 网红是政治家与活动家 | 两栏并列（users / megaphone） |
| C18a | 5810–6135 | Keluar Sekejap + The Game of Impossible | 两张播客封面并置（纸边 + 网点）+ 播主行 |
| C18b | 6136–6246 | 都在 Spotify | podcast 图标 + SPOTIFY |
| C18c | 6247–6360 | Roshinee 在 Instagram | 头像卡 + INSTAGRAM |
| C19a | 6361–6532 | Rafizi 的 Yang Berhenti Menteri | YM 封面 + RAFIZI RAMLI + YOUTUBE |
| C19b | 6533–6810 | 解读与评论 | REFRESHING / INDEPENDENT / ENTERTAINING 三栏 |
| C20a | 6811–6933 | 业内还有别人 | OTHER INDIVIDUALS + 三个人形占位 |
| C20b | 6934–7211 | Ashwad 去 RTM | 左人像卡 + 箭头 → RTM + DIRECTOR-GENERAL |

人物与节目封面沿用证据卡同一套处理（`#EFEBE0` 纸边 + `Halftone` 网点 + `Grain` 噪点 + 唯一投影），全片真图只有一种质感。
群像素材必须标注：Ashwad 的三人群像在画面里写明 `GROUP PHOTO · HE IS IN THE CENTRE`。

**剩余：第 5 章 THE MONEY（C21–C24）、第 6 章 TRUST（C25–C27）尚未开始。**

## 第 5 章 / 第 6 章进度

**第 5 章 THE MONEY（240.7–309.7s）** —— `video/renders/ch5.mp4`，2080 帧 / 69.3s

| 拍 | 帧 | 内容 | 画面 |
|---|---|---|---|
| C21a | 7223–7500 | 部长本人是 Media Prima 大股东 | 人物卡（双人，已标注）+ 25% + MEDIA PRIMA |
| C21b | 7501–7756 | 儿子也进了股东名单 | AMIR NASHRIN + 7.96% + MARCH |
| C22a | 7757–7898 | 总广告 2025 降 22% | -22% + DECLINED IN 2025 |
| C22b | 7899–8013 | 2026 预计再降 9.5% | -9.5% + EXPECTED IN 2026 |
| C22c | 8014–8310 | 数字广告降 39% | -39% + 三个竞争来源 |
| C23a | 8311–8413 | AI 加剧压力 | ARTIFICIAL INTELLIGENCE + `ALLEGEDLY · NOT ESTABLISHED` |
| C23b | 8414–8646 | 三家中文报的母公司 | MCI + 三个报头（文字排版，不贴 logo） |
| C23c | 8647–8847 | 裁员 44% | 44% + scissors + MID 2025 |
| C24a | 8848–8989 | 印刷 45% → 14% | 双条对比 + trending-down |
| C24b | 8990–9145 | 电视 54% → 36% | 双条对比 |
| C24c | 9146–9291 | 在线新闻稳步上升 | 折线图（不标数字，念白没给） |

**第 6 章 TRUST（309.7–333.0s）** —— `video/renders/ch6.mp4`，697 帧 / 23.2s

| 拍 | 帧 | 内容 | 画面 |
|---|---|---|---|
| C25 | 9292–9812 | 信任度 41→40→37→30 | 折线图，四点按念白落下，末段橙红 |
| C26 | 9823–9952 | 广播品牌最受信任 | THE MOST TRUSTED + ASTRO AWANI |
| C27 | 9953–9988 | 收尾 | THANK YOU FOR LISTENING |

## 片尾压黑起点修正

a2e 原设计是 `ENDING_RANGE = [LAST_TO - endingFade, TOTAL_FRAMES]`，即最后 30 帧开始压黑。
本片末句就是「THANK YOU FOR LISTENING」，只占 1.2 秒 —— 按原设计会被压黑盖掉一半，抽帧时整屏是暗的。

已改成**从末句结束（`LAST_TO`）才开始压黑**，署名卡顺延到压黑完成后：

| 区间 | 原 | 现 |
|---|---|---|
| 压黑 | 9958–10108 | 9988–10108 |
| 署名卡 | 9989–10082 | 10019–10088 |

这样末句有完整 1.2 秒的可见时间，压黑与署名各占其后 1 秒与 2.3 秒。

## 颜色语义（第 5 章新增）

全片只用四色：白（主体）、灰（次要）、琥珀 `#F0A030`（强调 / 当前）、橙红 `#F05F41`（下降 / 损失）。
橙红从 `ui.tsx` 的 `ORANGE` 取，与琥珀同属暖色系，不会读成另一套设计语言。

## 成片（全片完成）

`video/renders/full-malaysia-2026.mp4` —— **337.19 秒 / 5 分 37 秒 / 10108 帧 / 1920×1080 / 48k 立体声**

六章 53 个镜头，与 `timeline.ts` 的 `TOTAL_FRAMES = 10108` 逐帧对齐。

分章片段（同一套编码参数，可直接拼）：

| 文件 | 帧数 | 时长 | 章节 |
|---|---|---|---|
| `ch1-ch2.mp4` | 3948 | 131.6s | 片头 + THE COUNCIL + PRESSURE |
| `ch3.mp4` | 1504 | 50.2s | BACKLASH |
| `ch4.mp4` | 1768 | 58.9s | CREATORS |
| `ch5.mp4` | 2071 | 69.0s | THE MONEY |
| `ch6.mp4` | 697 | 23.3s | TRUST |
| `ch6-end.mp4` | 119 | 4.0s | 压黑 + 署名卡 |

合并方式：`ffmpeg -f concat -safe 0 -i list.txt -c copy full-malaysia-2026.mp4`（`list.txt` 里是上面六个文件的相对路径）。

## 两处衔接修复（合并时才发现）

**一 第 5 章开头 9 帧空窗。** C20b 结束在 7211，C21a 从 7223 才入场，中间 12 帧没有任何镜头 —— 抽帧看是纯背景 + 进度条。已把 C20b 延到 7220（`to: 7220`）。

**二 修完第一处后，第 4、5 章重叠了 9 帧。** ch4 扩到 7220，而 ch5 仍从 7212 起，合并后总帧变成 10117（应为 10108），表现为同一段画面重复、音频卡顿一下。已把 ch5 的重渲起点改到 7221。

这类错误 tsc 查不出来，只能靠**合并后核对总帧数**发现。规则：每次改镜头边界，都要 `ffprobe` 核对成片帧数是否仍等于 `TOTAL_FRAMES`。

## 下一步

1. **分镜落表**：把 SHOTBOOK 的 B1 十拍翻成 a2e 的 ShotDef 表（`{id, from, to, Comp}`），帧号直接用 timeline.ts 的句边界。
2. **先出一个镜头样本**：挑 C06（Rex Tan 逮捕，证据卡最典型），按 Gate 2 的规矩先给一帧，确认卡片语言后再批量。
3. 批量写镜头：证据卡 20 / 数据图 8 / 人物卡 7 / 概念流程 10 / 转场 6，约 51 镜。
4. 全片渲染 → 帧 QA → 成片进 `video/renders`。

shotcraft 的可跑卡在 `_libs/shotcraft/demos/`（226 个 .tsx，其中 `_legacy/` 68 个为旧版；
分类计数 typography 25、ui-entrance 25、effects 23、transition 18、camera 14、interaction 13、opening 10、rhythm 8、data 9、outro 7），
配方说明在 `_libs/shotcraft/references/shots/`（124 张 .md，含意图 / 动作阶段 / 参数表 / 已知坑）。取用时带 `demos/_fixtures/` 六个文件（Fixtures / Polish / Look / Brand / Motion / PageCam2D）。

## 常用命令

```
# 时间轴重建（改了 locked_script 或章节表才需要跑）
cd "D:\TK运营\1120文章"
python script/build_timeline.py

# 类型检查与抽帧
cd "D:\TK运营\1120文章\video\remotion"
npx tsc --noEmit
npx remotion still src/index.ts Video ../qa/x.png --frame=2020 --log=error

# 渲染
npx remotion render src/index.ts Video ../renders/malaysia2026.mp4 --codec=h264 --crf=18 --log=error
```

ffmpeg 在 `D:\Program Files\ffmpeg\bin`。

## 环境坑

- **Remotion 自带 Chromium 下载被网络挡**。`remotion.config.ts` 已自动回退到系统 Edge（`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`），删掉那段会直接渲染失败。
- **Wikipedia / Wikimedia / Iconify 的 curl 或 headless 抓取多半被挡**，抓素材一律走 `_tools/` 里的 playwright-core + Edge。
- 中文路径在 Git Bash 下正常，但 npm / remotion 命令要在 `video/remotion` 里跑。
