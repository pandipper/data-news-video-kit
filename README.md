# 数据新闻解释视频 · 模板工程

把一份研究报告做成 5 分半的横版解释视频。**这条片子本身是模板**——所有镜头代码、图元、脚本、时间轴都在仓库里，换一份报告就能重做一条。

基于两个上游项目，本仓库只做「怎么用它们做一条完整片子」的实践沉淀：

- **[anything2explainer](https://github.com/Vincentwei1021/anything2explainer)** — Remotion 模板、镜头语言体系、图元层
- **[shotcraft](https://github.com/Vincentwei1021/shotcraft)** — 分镜方法论、镜头模式表

---

## 这条片子在讲什么

路透社新闻研究所《2026 数字新闻报告》马来西亚篇：一个刚成立的媒体理事会，如何在一年内被现实反复打脸。

| 章节 | 时间 | 内容 |
|---|---|---|
| THE COUNCIL | 0:00 | 媒体理事会成立，法案到机构的落地 |
| PRESSURE | 2:11 | 记者遇袭、罚款、网络安全法生效 |
| BACKLASH | 4:01 | 三家组织联合声明、当今大马的资金挪用 |
| CREATORS | 6:01 | 32% 的人从网红获取新闻 |
| THE MONEY | 7:57 | 股权、广告下滑、AI 裁员 |
| TRUST | 10:29 | 信任度从 41% 跌到 30% |

全片 53 个镜头，217 条词级字幕，六个章节卡。

---

## 目录

```
.
├── remotion/                  Remotion 工程
│   ├── src/
│   │   ├── common/            配色、字体、时间轴（由 script 生成）
│   │   ├── figures/           图元：证据卡、压印字、图标 cue
│   │   ├── icons/             48 个题材图标（Lucide，ISC）
│   │   ├── overlay/           章节卡、进度条、片尾署名
│   │   └── shots/G1/          ★ 53 个镜头，按章节分文件
│   ├── public/fonts/          Noto Sans SC / Exo 2 / Audiowide / Orbitron
│   └── package.json
├── script/
│   ├── locked_script.md       权威文案（画面文字以此为准）
│   ├── termbase.md            术语表（人名、机构名的固定译法）
│   ├── build_timeline.py      词级对齐 → timeline.ts / subs.ts
│   ├── words.json             逐词起止（由 TTS 对齐产出）
│   └── narration-phrase.*.srt 中英文跟读字幕
├── docs/
│   ├── evidence-checklist.md  证据红线清单（哪些数字能上屏）
│   ├── narration-full.md      完整旁白
│   └── project-log.md         这条片子的工程日志（562 行，含全部踩坑）
├── tools/
│   ├── verify_sources.mjs     核对画面数字与原文出处
│   ├── fetch_og.mjs           抓取新闻页 OG 图
│   └── grab_avatar.mjs        抓取人物头像
└── assets/sources.json        ★ 证据出处总表：机构 + 日期 + URL + 红线
```

**不含**：新闻截图、人物照片、播客封面、背景音乐、成片。这些都有第三方版权，见下文「素材与版权」。

---

## 上手：做一条新片子

### 0 前置

```bash
git clone https://github.com/Vincentwei1021/anything2explainer ../_ref_anything2explainer
cd remotion && npm install
```

Node ≥ 20.19（Vite 7 的要求）。Remotion 首次渲染会下载 Chrome Headless Shell。

### 1 写文案

`script/locked_script.md` 是全片的唯一文案源。**画面上的每一个字都从这里来**，包括章节标题、卡片标签、结论行。

写法上有两条约束：

- **一句话一个意思。** 旁白是给耳朵的，画面文字是给眼睛的，两者不必逐字相同，但事实必须同源。
- **数字只写念白里出现过的。** 念白说 `3 million ringgit`，画面就写 `RM 3 MILLION`，不要自己补美元换算；念白说 `sanctioned for forgery`，就不要把罚款金额上屏。

`script/termbase.md` 锁定人名与机构名的写法，避免同一个 `Khairy Jamaluddin` 在片中三种拼法。

### 2 配音（Qwen3-TTS 魔搭 Demo）

旁白用 **Qwen3-TTS**，直接在魔搭的在线 Demo 里跑，不用本地装环境：

👉 https://modelscope.cn/studios/Qwen/Qwen3-TTS

本片是英文旁白，可选音色里 `Ryan`（节奏感强的动态男声）和 `Aiden`（阳光美式男声）最合适。中文片可换 `Vivian` / `Serena` / `Uncle_Fu`。

**分段合成，不要一次喂全文。** 五个原因：

- 长文本容易出现语气漂移（开头严肃、三分钟后变平）
- 某一句读错，只需重跑那一句，不用重跑五分半
- 每段的时长可控，方便对齐章节边界
- 情绪指令（`instruct`）可以按段落分别给
- 段落文件是后续逐词对齐的输入单位

实操上按章节切（本片 27 段），每段 1–3 句。`instruct` 填语气描述，例如：

```
沉稳、克制的新闻播报语调，语速偏慢，句末下沉
```

导出后按顺序拼接，统一转 48kHz：

```bash
# 拼接（先写一个 files.txt，每行一个 wav）
ffmpeg -f concat -safe 0 -i files.txt -c copy joined.wav

# 重采样到工程要求
ffmpeg -i joined.wav -ar 48000 -ac 2 audio.mp3
```

**逐词对齐。** 时间轴精度决定字幕和图标 cue 的精度，推荐两个方案：

| 方案 | 说明 |
|---|---|
| **Qwen3-ForcedAligner** | Qwen3-ASR 配套，词/短语级时间戳，11 种语言，精度优于 MFA/CTC |
| WhisperX | 生态成熟，中文需额外分词处理 |

对齐产物转成 `words.json`（见下节格式）。

> 若想本地部署：`pip install qwen3-tts`，然后 `qwen-tts-demo Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice --port 8000`。1.7B 需 6–8GB 显存，0.6B 需 4–6GB。

### 2.5 时间轴

`words.json` 格式：

```json
[{"w": "Malaysia's", "s": 0.0, "e": 1.52, "cid": "C01"}]
```

`cid` 是镜头编号，词级图标 cue 靠它定位。然后：

```bash
python script/build_timeline.py
```

生成 `remotion/src/common/timeline.ts`（章节边界、镜头区间）和 `subs.ts`（字幕）。

**改了文案或章节表才需要重跑这一步。**

### 3 写镜头

一个镜头一个文件，放在 `remotion/src/shots/G1/`：

```tsx
export const C07: React.FC = () => {
  const frame = useCurrentFrame();
  const N = frame + F0;        // F0 = 本镜头起始帧
  const n = N - F0;            // 相对帧，所有动画都用它
  // ...
};
```

在 `shots/G1/index.ts` 注册：

```ts
{id: 'G1-C07', from: 2004, to: 2233, Comp: C07}
```

**区间必须首尾相接**：上一个 `to` 加一等于下一个 `from`。

写的时候看 `docs/project-log.md`——里面按章节记了每个镜头为什么这么构图、踩了什么坑。

### 4 渲染与合成

```bash
# 抽帧检查（改完必做）
npx remotion still src/index.ts Video ../qa/frame.png --frame=2140

# 分章渲染（每章一个文件，出错只重跑一章）
npx remotion render src/index.ts Video ../renders/ch3.mp4 \
  --frames=3949-5452 --codec=h264 --crf=16

# 合并
ffmpeg -f concat -safe 0 -i list.txt -c copy full.mp4
```

**合并后必须核对帧数**：

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -of csv=p=0 full.mp4
# 必须等于 timeline.ts 里的 TOTAL_FRAMES
```

不等就是镜头区间有重叠或空档，tsc 查不出来。

### 4.5 垫乐选择

垫乐是这条片子最容易被忽视、也最容易翻车的一环。选定前先过五道筛子：

| 筛子 | 标准 | 为什么 |
|---|---|---|
| **长度** | ≥ 片长，一遍覆盖 | 不够就得循环，接缝处必然有断点 |
| **无人声** | 纯器乐 | 有人声采样会和旁白抢注意力 |
| **无强旋律** | 织体为主，旋律线弱 | 强旋律会被记住，反复听就烦 |
| **动态范围** | LRA 5–7 | 太低（<3）闷成一片，太高（>10）忽大忽小 |
| **频段留白** | 200–800Hz 不厚 | 这是人声区，占住了就糊字 |

本片用的是 **PaperClip（回形针）《GOOD SHOW》**（339.07s / 44.1kHz / 24bit / 立体声）：

- 长度 339.07s 对片子 337.19s，**一遍够用，零循环、零接缝**
- LRA 6.00，段落起伏明显（开头弱 4.6 dB → 主体 → 结尾收）
- 本身 Side/Mid 仅 −15.6 dB，立体声宽度够，不需要大改

素材到手先跑三条命令，比听十遍更准：

```bash
# 1 长度与格式
ffprobe -v error -show_entries format=duration -show_entries stream=sample_rate,channels -of default=noprint_wrappers=1 bed.flac

# 2 响度与动态（看 input_lra）
ffmpeg -hide_banner -i bed.flac -af "loudnorm=I=-16:print_format=json" -f null - 2>&1 | grep -A5 input_i

# 3 内部静音断点（若有多段静音，说明是分段作品，循环点要选在乐段结束处）
ffmpeg -hide_banner -i bed.flac -af "silencedetect=noise=-50dB:d=1" -f null - 2>&1 | grep silence
```

选好之后进混音，见下节。

### 5 混音

三条轨：旁白、垫乐、总限幅。目标是旁白 −16 LUFS，垫乐比旁白低 **12 dB**（这是验证过"念白清晰且不单调"的比例）。

```bash
ffmpeg -i bed.wav -i voice.mp3 -filter_complex "
  [0:a]aresample=48000,extrastereo=m=1.4,
       equalizer=f=95:g=2.4,equalizer=f=210:g=-1.6,
       volume=-6.4dB[bed];
  [bed][1:a]sidechaincompress=threshold=0.07:ratio=2.4:attack=15:release=380[ducked];
  [ducked][1:a]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5[out]
" -map "[out]" -ar 48000 mix.flac
```

四处参数的理由：

- `extrastereo=m=1.4` — 垫乐加宽。M/S 矩阵处理，不引入延迟，低频不会相位抵消（**不要用 `stereowiden` 的 delay 做这件事**，它会毁掉低频）
- `equalizer 95Hz +2.4` — 混音后旁白占据中高频，低频会显得薄，补一点超低频细节
- `equalizer 210Hz −1.6` — 给旁白基频（85–180Hz）让位
- `sidechaincompress` — 人声密集处垫乐退让。`attack 15ms` 跟得上起音，`release 380ms` 保证句间短停顿不会让音乐忽上忽下

**验证混音是否合格**，看三个数：

```bash
# 响度与真峰值
ffmpeg -hide_banner -i mix.flac -af "loudnorm=I=-16:TP=-1:print_format=json" -f null - 2>&1 | grep -A4 input_i
# 目标：I ≈ -16，TP ≤ -1

# 削波
ffmpeg -hide_banner -i mix.flac -af volumedetect -f null - 2>&1 | grep max_volume
# 目标：max ≤ -1，且 histogram_0db 为 0

# 分段相对差（旁白 vs 垫乐，抽查 5 处）
# 目标：全片 8–14 dB 之间，任何一段都不低于 6 dB
```

分段相对差是这条片子唯一的硬伤来源。如果某一段旁白本身录得轻（本片 3:50 处就低 4–5 dB），而垫乐保持恒定，那一段会突然"音乐变大"——此时单纯靠闪避补不回来，需要整体降垫乐电平。

替换进视频：

```bash
ffmpeg -i full.mp4 -i mix.flac -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 320k -movflags +faststart final.mp4
```

`-c:v copy` 保证画质零损失。




旁白 −16 LUFS，垫乐比旁白低 12 dB，人声密集处做侧链闪避：

```bash
ffmpeg -i bed.wav -i voice.mp3 -filter_complex "
  [0:a]extrastereo=m=1.4,equalizer=f=95:g=2.4,equalizer=f=210:g=-1.6[bed];
  [bed][1:a]sidechaincompress=threshold=0.07:ratio=2.4:attack=15:release=380[ducked];
  [ducked][1:a]amix=normalize=0,loudnorm=I=-16:TP=-1.5[out]
" -map "[out]" mix.flac
```

替换进视频：

```bash
ffmpeg -i full.mp4 -i mix.flac -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 320k -movflags +faststart final.mp4
```

`-c:v copy` 保证画质零损失。

---

## 七条不能违反的约定

都是踩出来的，`docs/project-log.md` 有完整案例。

**一 镜头区间首尾相接，末帧硬切。**
不要淡入淡出。每拍末尾 `const exit = 1`，直接接下一拍。淡出会让连续片看起来被拉慢。

**二 图标必须行内对齐。**
用 `flex + align-items: center + gap`，不要手算绝对坐标。字宽估算永远差几十像素。

**三 画面上的数字用 `FONT_HEAVY`，不用 Orbitron。**
Orbitron 与 Audiowide 的 `0` 是斜杠零（`2026` 读作 `2Ø26`），`7` 是直角下垂（孤立时像 `⌐`）。

**四 章节卡必须挂在镜头上层。**
a2e 默认把它放在最低层（原设计里章节卡占章前空白）。本片章节卡覆盖在章首镜头上，放低层会被镜头整个盖住。

**五 `Box`、`Icon`、非 inline 的 `IconCue` 都是绝对定位。**
塞进 `position: absolute` 的 flex 容器，偏移会叠加两次。并排盒子用普通 `div`。

**六 念白外的数字不上屏。**
包括：报告里有但旁白没读的、你自己算出来的（如"七年"）、新闻截图上的（裁掉）。

**七 群像素材必须标注谁是谁。**
`GROUP PHOTO · HE IS IN THE CENTRE`。这不是礼貌问题，不标注就构成误认。

---

## 素材与版权

**仓库不含任何第三方图片与音频。** 复用时你需要自己准备：

| 类型 | 来源建议 | 注意 |
|---|---|---|
| 新闻截图 | 原文页面自行截取 | 标注机构与日期，`assets/sources.json` 有格式 |
| 人物头像 | 官方新闻稿 / 维基百科 | 群像必须标注 |
| 播客封面 | 节目官方发布页 | 属于节目方，非你所有 |
| 背景音乐 | 授权曲库 | 本片用的是 PaperClip 的《GOOD SHOW》 |

`assets/sources.json` 是证据出处总表，每条记录包含机构、日期、URL 和事实红线（例如"这里的 796 实际是 7.96%，ASR 拆错了"）。**这份文件比图片重要**——它决定了画面上的每个数字能否站得住。

字体（`remotion/public/fonts/`）均为 SIL Open Font License 1.1，可随仓库分发。

图标来自 [Lucide](https://lucide.dev)（ISC License），见 `tools/LUCIDE_LICENSE.txt`。

---

## 许可证

本仓库的**镜头代码、脚本、文档**采用 [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0)：

> **Required Notice:** Copyright (c) 2026 Vincent Wei (https://github.com/Vincentwei1021/anything2explainer)

因为核心框架来自 anything2explainer，其许可证要求：

- 非商业使用免费，**商业使用需原作者授权**
- 分发时必须保留上述 Required Notice
- 用这套工具做出来的**视频归创作者所有**（不受此限制）

如果你要在商业项目里用，先去 [anything2explainer](https://github.com/Vincentwei1021/anything2explainer) 找作者拿授权。

本片成片（YouTube 上那条）的版权归制作方，与本仓库的代码许可无关。

---

## 致谢

- **Vincent Wei** — [anything2explainer](https://github.com/Vincentwei1021/anything2explainer)、[shotcraft](https://github.com/Vincentwei1021/shotcraft)。镜头语言体系、图元层、分镜方法论都来自这两个项目，本仓库只是把它们用在了具体题材上。
- **Reuters Institute for the Study of Journalism** — 报告原文与数据。
- **Zaharom Nain、Aril Mikhail** — 报告作者。
- **PaperClip（回形针）** — 背景音乐《GOOD SHOW》。
