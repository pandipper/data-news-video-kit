# 取证清单 Malaysia Digital News Report 2026

本清单严格按 video-talkcraft 的 SKILL.md §③ 四类素材标注、references/broll-sources.md 的取证机制整理。
四类标注：证据 去截真页或找出处，身份 要头像与账号信息，量化 要图表或数据源，entities 里的人名品牌地点 URL 就是检索词。
本清单只做整理，尚未抓图、尚未写视频代码。

权威原文页 https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/malaysia

## 一 容易取证 项目机制可直接执行

| 取证项 | 覆盖段落 | 项目依据 | 执行动作 |
|---|---|---|---|
| 原文页全页长图 | C01 到 C26 全部论点与数字 | 新闻类话题首选 Playwright 实时抓取真实页面 | fullPage 加 2 倍 DPR 抓原文页，落 public/pages，同一会话写 targets.json 坐标 |
| 量化数据 | C10 C15 C17 C21 C22 C23 C24 C25 | need 是量化的句要图表或数据源 | 从同一张原文页长图取数，代码画数据图，每个数字在 sources.md 挂 URL |
| Logo | C11 C18 C19 C20 C21 C26 | entities 人名品牌为检索词，logo 只取 Iconify logos 或 Wikimedia PD/CC0 | 取真 logo 指代品牌，不暗示背书 |
| 节目与平台页 | C18 C19 | need 是身份的要头像与账号信息 | Playwright 抓 Spotify 与 YouTube 公开节目页 |
| 公众人物头像 | C18 到 C21 | need 是身份的要头像与账号信息 | 八位均为公众人物，Wikipedia 与 Wikimedia Commons 与官方社媒有现成头像，按英文姓名精确匹配即可 |

量化数字明细（全部来自原文页，逐条挂 sources.md）

| 段落 | 数字 |
|---|---|
| C10 | 罚款 2000 令吉 约 500 美元 |
| C15 | 300 万令吉 约 75 万美元 |
| C17 | 32  percent 从创作者获取新闻 |
| C21 | Media Prima 持股 25  percent，Amir Nashrin 购入 7.96  percent |
| C22 | 广告总支出降 22  percent，2026 预计再降 9.5  percent，数字广告降 39  percent |
| C23 | 裁员 44  percent |
| C24 | 印刷 45 到 14  percent，电视 54 到 36  percent |
| C25 | 信任度 41 到 40 到 37 到 30  percent |

## 二 需要手动整理截图

以下是 need 为证据或身份、但原文页只有文字叙述没有配图的段落。
按项目调研记账规矩，这些来源页要逐一截图存档进 sources.md，链接与截图一一对应。
难点在于权威报道页 URL 需要人判断，部分可能是马来语本地媒体，我不自行指定。

| 段落 | 对象 | 需求类型 | 为什么要手动 | 建议取证方向 |
|---|---|---|---|---|
| C06 | Rex Tan 因 Gaza 讲座提问被捕 | 证据 | 原文页仅文字，无可截报道页 | 你确认一条权威报道 URL |
| C10 | 嫌疑人认罪罚款 R Krishnan | 证据 | 原文页仅文字 | 英文检索已命中权威报道，见第三节，你确认用哪一页 |
| C13 | CIJ、Article 19、Sinar Project 三组织声明 | 证据 | 三组织同一份联合声明，需确认取哪一版 | 英文检索已命中原始声明，见第三节 |
| C15 | 300 万令吉被挪用 | 证据 | 原文页仅文字 | 你确认一条权威报道 URL |

C18 到 C21 的八位公众人物头像已按第 1 点移入第一节自动组，不再需要你手动提供。
C07 到 C09 的 Deol 遇袭与 FIFA 制裁，英文检索同样命中报道，关键词见第五节。

## 三 英文检索关键词与实测命中

按项目规则 1，搜索词一律英文。以下关键词已在 2026-11-19 实测，能命中英文权威源。

一 Deol 案嫌疑人认罪罚款 C10

搜索词
`Haresh Deol assault suspect pleaded guilty fined RM2000 criminal intimidation`
`delivery man fined RM2000 assaulting senior journalist Haresh Deol`
`R Krishnan pleaded guilty Section 323 Haresh Deol November 2025`

实测命中
The Star 2026-01-22 Delivery man fined RM2,000 for assaulting senior journalist
https://www.thestar.com.my/news/nation/2026/01/22/delivery-man-fined-rm2000-for-assaulting-senior-journalist
New Straits Times Journalist assault case sparks renewed calls to protect media practitioners
https://www.nst.com.my/news/nation/2026/01/1363118/journalist-assault-case-sparks-renewed-calls-protect-media
Scoop Deliveryman fined RM2,000 for assaulting journalist Haresh Deol
https://www.scoop.my/?p=280222

事实核对点：原文说罚款 2000 令吉约 500 美元，英文源写的是 RM2,000，金额一致。原文说 charged with assault and criminal intimidation，英文源 R Krishnan 是依刑法 323 条文 voluntarily causing hurt 认罪，最高罚 RM2000 或一年监禁，另有一名嫌疑人在逃。措辞略有出入但事件一致。成片只写念白里出现的 RM2,000，不自行补美元换算或在逃嫌疑人细节。

二 三组织联合声明 C13

关键事实：这三家是同一份联合声明，不是三份独立声明。原文用的是单数 a lengthy statement。

搜索词
`Centre for Independent Journalism ARTICLE 19 Sinar Project joint statement Online Safety Act 2025`
`ARTICLE 19 Malaysia halt hasty imposition mandatory electronic verification`
`CIJ ARTICLE 19 Sinar Project e-KYC statement Onsa`
`site:article19.org Malaysia Online Safety Act joint statement CIJ Sinar`

实测命中
ARTICLE 19 原始声明 Malaysia Halt hasty imposition of mandatory electronic verification
https://www.article19.org/resources/malaysia-halt-hasty-imposition-of-mandatory-electronic-verification
CIJ 声明 PDF 2025-10-04 CIJ A19 Sinar Project Have Concerns About E-KYC
https://cijmalaysia.net/wp-content/uploads/2025/10/Press-statement-on-eKYC.pdf
IFEX 镜像 Groups express concern over mandatory electronic Know-Your-Customer verification
https://ifex.org/?p=359935/

措辞对应：原文 C13 的 the risk of abuse and selective enforcement is high, with growing evidence of targeted suppression or arbitrary takedowns 与这份 e-KYC 联合声明逐字一致。这是原文所指的那份。

另有两份后续联合声明，是同一三组织但主题不同，取用前需判断原文讲的是哪一份
Draft Online Safety Plan 提交 2026-04-01 https://www.article19.org/resources/malaysia-online-safety-act
反对 16 岁以下社媒禁令 2026-05-29 https://www.article19.org/resources/malaysia-mandatory-age-verification-undermines-privacy-and-free-expression/

## 四 记账要求

sources.md 每条登记 检索词、源站、素材 ID 或 URL、授权、真实尺寸。
网页长图另登记 URL、抓取时间、长图路径与 targets.json 路径。
来源页逐一截图存档，禁止只存链接不留证据。

## 五 用户提供的新闻截图登记 2026-11-19

位置 D:\TK运营\1118文章\news picture，前缀即新闻源，共 9 张。
这些是新闻证据截图，按项目 SKILL.md 调研记账处理，sources.md 登记源站与用途，与免署名 B-roll 是两套账。

| 文件名 | 源 | 对应段落 | 尺寸 | 画面判定 |
|---|---|---|---|---|
| FMT_AN APOLOGY FROM REX TAN.jpg | Free Malaysia Today | C06 | 1080×1350 | Rex Tan 本人道歉声明全文，讲座日期写 January 12 2026 |
| Malay Mail_Journalist Rex Tan was arrested....jpg | Malay Mail | C06 | 1638×2048 | 社媒新闻卡，标题写 arrested under Sedition Act，配两张人物照 |
| The Rakyat Post_Assault on journalist Haresh Deol.jpg | The Rakyat Post | C07 | 495×619 | 社媒新闻卡，Deol 两张头像，Bangsar 光天化日遇袭 |
| The Stoly_The FIFA Disciplinary Committee....jpg | The Stoly | C08 | 479×640 | FIFA 纪律声明截图，底部大字 RM1.8 MILLION FINE |
| The eage_Malaysiakini management firm files police report after.jpg | The Edge | C14 C15 | 1080×1350 | 社媒新闻卡，RM3m 挪用，正文写 between March 2023 and March 2024 |
| article19_Malaysia Online Safety Act's subsidiary instruments....png | ARTICLE 19 | C13 相关 | 889×878 | 网页截图，2026-04-07 发布的 OSP 咨询回应 |
| bernama_Online Safety Act 2025.png | Bernama | C11 C12 | 709×674 | 报道截图，ONSA 生效，配 MCMC 官方宣传海报 |
| cijmalaysia_倒数第二段有 the risk of abuse and selective enforcement is high.png | CIJ | C13 | 697×901 | 联合声明网页截图，2025-10-04，逐字含原文那句，用户已标注 |
| twentytwo13_Haresh Deol assault suspect pleaded guilty fined RM2000.png | TwentyTwo13 | C10 | 833×752 | 网页截图，嫌疑人 R Krishnan 法庭照，罚 RM2,000 |

覆盖结论：第二节手动组四条（C06、C07 到 C10、C13、C15）全部已覆盖，另有 C11 C12 政府说法与 C08 FIFA 两张富余。手动组不再缺图。

事实核对点（念白是 baseline，铁律 2 与 28）

The Stoly 图上 RM1.8 MILLION FINE：念白 C08 只说 sanctioned for forgery and falsification，没有罚款金额。截图自带的大字若原样入片，画面会出现念白外的数字。用前须裁掉或遮掉这一行。

The Edge 图上 between March 2023 and March 2024：念白 C15 说的是 2026 年 3 月发现挪用 3 million ringgit，没有给出案发时间区间。RM3m 金额一致，时间区间是图上附带信息，不强调即可。

Malay Mail 标题 arrested under Sedition Act：念白 C06 只说 deemed racially sensitive，没有点名煽动法令。作为报道标题入卡可接受，但成片不单独强调法令名。

FMT 那张是 Rex Tan 本人道歉声明：念白 C06 讲的是 MMC 称逮捕不必要并要求立即释放，两者相关但不是同一件事。不要把道歉声明当成 MMC 表态的字面证据。

分辨率硬约束

项目规则：素材分辨率 ≥ 画幅 × 最大缩放，1920 横屏缓推 1.15 要求宽 ≥ 2208px。
这 9 张最高 1638px（Malay Mail），其余 479 到 1080px，全部不达缓推下限。
后果：按项目规则它们不能当缓推或放大镜主角，只能作配角小图或静态入卡加 Ken Burns。
这些是社媒卡片与网页截图，不是 Playwright 全页 2 倍长图，滚巡放大划四种网页拍法用不上。
若要按项目规格做证据巡游，需从各源站页面用 Playwright 重抓全页 2 倍长图加坐标 JSON，版权属新闻源，仅作新闻评论证据使用。是否重抓由你决定。

## 六 项目硬规

实拍素材是必需项，全片零 B-roll 或图片会 FAIL。证据类题材以截图为主，需在 SHOTBOOK 给出依据。
只收免署名源，CC BY 系 Dareful、Wikimedia 视频、Vecteezy、Openverse 全部排除。
logo 只做指代品牌的新闻评论合理使用，不暗示背书。
网页在成片里用滚巡放大划四种拍法，不贴静态截图，拍摄由 Remotion 在长图上完成。
真图上的标注坐标一律 Playwright DOM 实测，禁目测。
全部素材落盘 local public，禁止渲染时拉远程。

## 七 自动抓取补齐的资料 2026-11-19

位置 D:/TK运营/1118文章/news picture 下三个子文件夹 web / portrait / logo。
工具链：Node 22 + playwright-core 1.65.1 + 本机 Edge。Wikipedia 与 Wikimedia 的 curl 不通，全部走 Edge；Iconify 被 Cloudflare 拦，logo 改走 simple-icons via jsDelivr 与 Commons。

网页长图 web/reuters-malaysia/

| 文件 | 来源 | 规格 | 用途 |
|---|---|---|---|
| page.png | Reuters Institute 原文页 | 2560×24090，全页 2 倍 DPR | 全文证据巡游底图，覆盖 C02 到 C25 全部段落 |
| targets.json | 同一会话 DOM 实测 | 24 个目标坐标 | 数字大字 18/39/30/95、章节标题、12 个关键段落的停点与放大坐标 |

原文页 URL https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/malaysia
抓取时 pageH=12045，viewport=1280，dpr=2，含清场（懒加载触发、粘性元素改 static、等字体）。
念白里 41→40→37→30 信任度、45→14 印刷、54→36 电视这些数字在正文段落或图表，不在大字区，坐标已含对应段落。

公众人物头像 portrait/

| 文件 | 人物 | 来源 | 判定 |
|---|---|---|---|
| khairy-jamaluddin.jpg | Khairy Jamaluddin | Wikipedia infobox，Commons 图 | 单人肖像，可用 |
| rafizi-ramli.jpg | Rafizi Ramli | Wikipedia infobox，Commons 图 | 单人肖像，可用 |
| idris-jala.jpg | Idris Jala | Wikipedia infobox，WEF 2012 | 单人肖像，可用 |
| idris-jala-lifestyle.jpg | Idris Jala | FMT lifestyle 专访 | 单人弹吉他，可用，非 Leon |
| johari-abdul-ghani.jpg | Johari Abdul Ghani | Wikipedia 正文图 | 双人合影，Johari 为主，标注非单人 |
| roshinee-mookaiah.jpg | Roshinee Mookaiah | The Sun 专访 | 单人肖像，可用 |
| ashwad-ismail.jpg | Ashwad Ismail | Bernama 任命报道 | 三人群像，中间为 Ashwad，标注非单人 |
| amir-nashrin.jpg | Amir Nashrin | 用户提供 | 单人肖像，可用 |
| idris-jala-supplied.jpg | Idris Jala | 用户提供 | 单人肖像，可用 |
| the-game-of-impossible-leon-idris.jpg | Leon Jala 与 Idris Jala | 用户提供，节目官方图 | 两位主持人加节目，Leon 由此覆盖，标注双人 |

八位人物现已全部有图，无缺口。三张用户提供的图 2026-11-19 已归位到 portrait 目录。

组织与平台 logo logo/

| 文件 | 来源 | 授权 |
|---|---|---|
| tiktok.svg instagram.svg spotify.svg youtube.svg | simple-icons v16 via jsDelivr | CC0，项目授权红线允许 |
| media-prima.svg rtm.svg malaysiakini.svg | Wikimedia Commons | Public domain |
| astro-awani.png | Wikimedia Commons | CC0 |
| MANIFEST.md | 四个组织 logo 的来源授权表 | 详见该文件 |

FIFA 与 Malaysian Media Council 无可靠组织主标（Commons 只有赛事 logo 或搜不到），按项目用文字卡处理。

用户 2026-11-19 确认的取证结论：C06 用 Malay Mail 被捕卡即可（投案无抓捕画面），Sedition Act 标题不遮；C15 权威 URL 用 The Edge https://theedgemalaysia.com/node/795120（配图来源），FMT 那条仅作交叉印证、不记双源；C13 用 cijmalaysia 联合声明，article19 的 OSP 声明不用。八位人物头像全部到位，无缺口。

词级对齐：采用 Qwen3-ForcedAligner-0.6B，本地模型（ModelScope 下载，1.84GB），ModelScope 域名通、HuggingFace 被挡。对齐产物 words.json 落在 align/。HF Space 可用但 ZeroGPU 免费额度不足，已弃用。
