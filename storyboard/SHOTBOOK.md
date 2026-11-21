# SHOTBOOK — Malaysia Digital News Report 2026

Phase 1 分镜，Gate 1 待签。签字前不建任何 Remotion 组件。

## 基础事实

| 项 | 值 |
|---|---|
| 主音轨 | full-narration.mp3，48kHz 立体声，332.927s |
| 对齐 | Qwen3-ForcedAligner-0.6B，831 词，words.json |
| 字幕基线 | narration-phrase.srt，217 个短语 cue |
| 画幅 | 横屏 1920×1080 @30fps（用户 2026-11-19 定） |
| 风格 | 项目派生风格档（用户 2026-11-19 定） |
| 卡源码 | 直接复用 video-talkcraft 卡（用户已选，PolyForm NC 商业需授权） |

## G0 风格档

方向：Reuters Institute Editorial Heritage——取自原文页视觉语言，风格与证据同源。

领域：财经 · 商业 · 数据解读 + 新闻解读。依据：全稿 15 个数据点、多家机构引用、口吻是解读而非教学。

配色 token（用户 2026-11-19 定版，来自 Reuters Institute 官网截图）：

| 用途 | 色值 | 说明 |
|---|---|---|
| 主背景 | #F0EBDD 暖羊皮纸 | 不用纯白 |
| 表面 | #F8F5ED 软象牙 | 卡片、区块底 |
| 主强调 | #B2135F raspberry magenta | 全片唯一看这里色：链接、栏目名、人名、关键数字 |
| 辅助机构色 | #002147 Oxford navy | 只做机构署名细节（Reuters / Oxford / 作者机构），不做强调 |
| 正文 | #252525 炭黑 | |
| 反差幕 | #191D25 深墨 | 转折幕整幕切换 |
| 反转文字 | #F0EBDD | 深墨幕上的字 |

- 字体：大标题 Georgia / Baskerville 编辑感衬线；正文与元数据 clean sans-serif；数字 tabular-nums
- 材质卡：细黑编辑分隔线，不用彩色卡、不用投影；证据截图白边卡 + 唯一投影（白底截图靠白边卡过渡，避免与羊皮纸底打架）
- 图表：坐标轴 + 刻度齐全，折线 3px magenta，数字等宽，单位后置；涨跌语义色只进图表
- 素材：新闻截图、原文页长图、人物头像；底床用极轻静态 vignette
- 能量：低中。不做：纯白背景、渐变、彩色卡、光泽、装饰性 UI、第二强调色、手绘圈注；运动做减法

## 五种图形语言

| 代号 | 语言 | 用途 |
|---|---|---|
| L1 | 数据图 | 坐标轴折线、柱状、数字滚动，用真实比例，强调放大数字不拉长条 |
| L2 | 文字卡 | 报纸感标题 + 纸卡，用于论断、定义、归属语句 |
| L3 | 证据巡游 | Playwright 全页长图，滚巡放大划四种拍法，带白边卡与唯一投影 |
| L4 | 人物卡 | 头像 + 姓名 + 身份行，一卡一人，合影需标注 |
| L5 | 流程结构图 | 机构关系、时间轴、治理构成，节点 + 箭头 |

相邻 beat 首尾语言不同。语言跟语气不跟数字大小。

## 批次划分（音频决定，不圆整）

| 批次 | 起止 | 时长 | 段落 |
|---|---|---|---|
| B1 | 0.000 - 66.127 | 66.127s | C01-C06 |
| B2 | 66.777 - 130.947 | 64.170s | C07-C12 |
| B3 | 131.597 - 181.015 | 49.418s | C13-C16 |
| B4 | 181.665 - 240.343 | 58.678s | C17-C20 |
| B5 | 240.643 - 308.963 | 68.320s | C21-C24 |
| B6 | 309.613 - 332.927 | 23.314s | C25-C27 |

边界全部落在 0.65s 段间间隙。B3 与 B6 偏短，等整片排版时再定是否并入邻批。

---

# B1 分镜（0.000 - 66.127）

## 逐 beat 时间线

时刻取真实词边界，三位小数。念白只写 SRT 里实际念出的词。

| 时刻 | 念白 | 画面事件 |
|---|---|---|
| 0.000 | Malaysia's media landscape in 2026 | 语言 L2。标题卡入场：论文标题 Malaysia 报纸感衬线大字从下方 24px 上浮，8 帧淡入；副行 2026 以 accent 墨蓝在标题下定稿；右上小字 Digital News Report 来源行淡入。同期作者两人名以小卡从两侧错峰滑入并停在标题下方。入口无旁白空窗，标题与副行同时落地。 |
| 8.560 | Malaysia's contemporary media landscape is currently characterised by a sharp paradox | 语言 L5。paradox 以两条对冲的结构线呈现：一条自左上、一条自右下在画面中央交错后定格，交点放大；中央 paradox 一词 accent 描边落在交点上。上一 beat 标题卡整体上移淡出，退场在下一次切镜前 30 帧完成。 |
| 13.600 | The long-awaited Malaysian Media Council finally became operational in 2025 | 语言 L1。时间轴从 2025 节点生长，节点圆点 pulse 一次，2025 以 tabular 等宽数字放大定格；MMC 全称以标签挂在节点上。六个构成类别不在本 beat 展开，留给 35.397。 |
| 18.480 | offering the prospect of genuine self-regulation for the first time in decades | 语言 L4。self-regulation 作为一条独立监管的机构卡入场：卡片上方 genuine 以 accent 标签点亮，卡内是留白的治理结构轮廓（机构独立于政府的表意），不用对比条。上一 beat 的结构线退场。 |
| 22.595 | Yet a succession of incidents physical attacks on journalists and arrests linked to reporting have tested those hopes | 语言 L3。原文页长图入场，相机从段落顶部缓缓下滚，停在含 physical attacks / arrests 的段落，白边卡 + 唯一投影；两个关键词以 accent 荧光笔各扫一次。滚速约 10% 页高每秒。 |
| 29.317 | The passing of the Malaysian Media Council Act saw the establishment of the Malaysian Media Council or MMC in June 2025 | 语言 L5。法案到机构的流程箭头：Act → Council，两节点依次入场，June 2025 时间戳挂在 Council 节点下；MMC 缩写以 accent 标签压在节点右上角。 |
| 35.397 | Its elected Governing Board comprises representatives from media companies journalists broadcasters civil society organisations academics and government agencies | 语言 L2。六类代表以报纸栏目式的文字区块排成两列，每类一行，无图标无卡片底；用字号与细分割线做层级，落位后整体轻微 punch 一次。与 13.600 的六 chip 详略不同、构图不同。 |
| 37.317 | This marks a departure from decades of government-led media oversight | 语言 L1。深墨底反差幕切入，以一条时间带呈现 decades 的跨度，末端 government-led 灰色段淡出、留白接入下一段；底色由羊皮纸切到深墨，本身作分隔符。 |
| 47.029 | The MMC has moved quickly to take public positions on press freedom incidents | 语言 L2。深底幕延续，press freedom incidents 以三行报纸式标题条目依次入场，条目间细分割线，无卡片无投影；每行只放关键词不放整句。 |
| 51.353 | In January it called the arrest of journalist Rex Tan for asking a question deemed racially sensitive at a public lecture on Gaza unnecessary and punitive and demanded his immediate release | 主语言 L3。Malay Mail 被捕社媒卡以证据卡入场（白边 + 唯一投影 + 轻微 Ken Burns）；Rex Tan 头像是证据卡内的组成部分，不单列人物卡，保证一镜一主语言。unnecessary and punitive 以 MMC 归属行挂在证据卡下方，保留归属不改成事实。Sedition Act 标题不遮，按用户定。 |
| 55.753 | The MMC has moved quickly...（承接镜头，无新念白锚） | 延续 L3。证据卡背景极缓推近 1.05，不动元素，然后整组在下一 beat 前让位淡出。此为本 beat 的收尾让位，不单列新语言。 |

注：55.753 是段内副句间隙，作为上一 beat 内部的元素让位点，不单列新 beat。B1 实际 10 个 beat，平均 6.6s。

## 事实红线

1. 数字只写念白里的。C10 的 2,000 ringgit 与约 500 美元，成片只写 RM2,000；美元换算不单独上屏。
2. C06 的 unnecessary and punitive 是 MMC 表态，必须带归属，不改成旁白结论。
3. C06 标题 Sedition Act 出现在证据图里，用户已确认保留不遮；但旁白不额外强调该法令名。
4. 专有名词按 termbase：Zaharom Nain、Aril Mikhail、Malaysian Media Council / MMC、Rex Tan。
5. 对齐器裸词 796 / 95 / 2000 禁止上屏，按锁定稿写 7.96 / 9.5 / 2,000。
6. 图形语言跟语气不跟数字大小；比例条不表示真实数值，只表示结构变化。

## 否决测试

1. 任一 beat 开场 0.7-0.9s 只有标题、无其他元素落地 → 否决。
2. 相邻两 beat 首语言相同 → 否决。
3. 同一内容（2025 成立节点与六类代表）在 13.600 与 35.397 构图重复 → 否决（前者只立时间轴，后者只列构成）。
4. 证据卡没有白边或出现第二个投影 → 否决。
5. 深墨幕里出现 accent 之外的第二个强调色 → 否决。
6. 人物卡出现两人以上却未标注 → 否决。
7. beat 最后一个动画后不足 30 帧就切镜 → 否决。
8. 画面元素穿过字幕带（底部 100px）→ 否决。
9. 用对齐器裸词或念白外数字 → 否决。
10. 空帧收尾（无元素 carry over）→ 否决。

## 检查帧

| 帧时刻 | 检查点 |
|---|---|
| 4.000 | 标题与作者小卡是否同时落地，无空窗 |
| 13.600 | paradox 卡退场是否干净，时间轴入场是否接上 |
| 29.317 | 长图证据卡是否带白边与唯一投影，关键词扫词是否套住目标 |
| 47.029 | 羊皮纸到深墨的幕切换是否完成，是否靠底色分隔而非线条 |
| 55.753 | Rex Tan 卡是否单人，归属行是否在，Sedition Act 是否保留 |

## 自检到绿

- 所有时刻三位小数且为真实词边界：是，取自 words.json
- 所有念白来自 SRT：是，取自 narration-phrase.srt 对应 cue
- 五种语言相邻不同：是，序列 L2 L5 L1 L4 L3 L5 L2 L1 L2 L3，相邻均不同；五种语言全部出现
- 引用的素材都存在：Malay Mail 卡、原文页长图、Rex Tan 头像均在 news picture 目录
- 图形动作是可执行描述（元素+位置+运动+时长）：是

---

# B2-B6 划分框架（待 B1 签字后展开）

| 批次 | 段落 | 主导内容 | 主证据素材 |
|---|---|---|---|
| B2 | C07-C12 | Deol 案、FIFA 制裁、认罪罚款、OSA 实施 | The Rakyat Post、The Stoly、twentytwo13、bernama |
| B3 | C13-C16 | 三组织声明、Malaysiakini 资金案 | cijmalaysia 联合声明、The Edge |
| B4 | C17-C20 | 网红播客、业界人物 | 人物卡、平台 logo、节目图 |
| B5 | C21-C24 | 股东结构、广告下滑、AI 裁员、媒介消长 | Media Prima logo、原文页数据图 |
| B6 | C25-C27 | 信任度曲线、最可信品牌、致谢 | 原文页信任度段落、Astro Awani logo |
