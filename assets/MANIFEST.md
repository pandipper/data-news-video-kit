# 素材总清单

最后更新 2026-11-20。逐文件列出来源、授权与用法，与 `sources.json`（按事实组织）互补：本表按文件组织，便于核对"每个 beat 有什么素材"。

素材策略：新闻不用截图原图作主角，标注出处 + 说清事实即是证据。截图降级为可选小图，证据主角是文字排版卡。

## 一 新闻截图 `assets/news/`（9 张，均作可选小图）

| 文件 | 源 | 段落 | 尺寸 | 用法与注意 |
|---|---|---|---|---|
| Malay Mail_Journalist Rex Tan was arrested...jpg | Malay Mail | C06 | 1638×2048 | 社媒卡；左侧 Rex Tan 提问画面已裁出单人头像；标题含 Sedition Act，画面不强调 |
| FMT_AN APOLOGY FROM REX TAN.jpg | Free Malaysia Today | C06 | 1080×1350 | Rex Tan 道歉声明全文；**不是** MMC 表态的证据 |
| The Rakyat Post_Assault on journalist Haresh Deol.jpg | The Rakyat Post | C07-C09 | 495×619 | 社媒卡，分辨率低，只作小图 |
| The Stoly_The FIFA Disciplinary Committee...jpg | The Stoly | C08 | 479×640 | 底部大字 RM1.8 MILLION FINE 是念白外数字，**必须裁掉或遮掉** |
| twentytwo13_Haresh Deol assault suspect pleaded guilty fined RM2000.png | TwentyTwo13 | C10 | 833×752 | 嫌疑人法庭照；只写 RM2,000，不写美元换算 |
| bernama_Online Safety Act 2025.png | Bernama | C11-C12 | 709×674 | ONSA 生效报道，配 MCMC 宣传海报 |
| cijmalaysia_倒数第二段有 the risk of abuse...png | CIJ | C13 | 697×901 | 联合声明网页，逐字含原文那句 |
| article19_Malaysia Online Safety Act's subsidiary instruments...png | ARTICLE 19 | C13 相关 | 889×878 | 2026-04-07 的 OSP 咨询回应，备用 |
| The eage_Malaysiakini management firm files police report after.jpg | The Edge | C14-C16 | 1080×1350 | 社媒卡；图上 between March 2023 and March 2024 是附带信息，不强调 |

## 二 人物 `assets/portrait/`（11 张）

| 文件 | 人物 | 来源 | 尺寸 | 判定 |
|---|---|---|---|---|
| rex-tan.jpg | Rex Tan | 从 Malay Mail 社媒卡裁出 | 470×640 | 单人、无台标、含麦克风与格纹围巾，可作人物卡 |
| khairy-jamaluddin.jpg | Khairy Jamaluddin | Wikipedia infobox / Commons | 500×663 | 单人，可用 |
| rafizi-ramli.jpg | Rafizi Ramli | Wikipedia infobox / Commons | 500×666 | 单人，可用 |
| idris-jala.jpg | Idris Jala | Wikipedia infobox / WEF 2012 | 500×627 | 单人，可用 |
| idris-jala-supplied.jpg | Idris Jala | 用户提供 | 399×501 | 单人，可用 |
| idris-jala-lifestyle.jpg | Idris Jala | FMT lifestyle 专访 | 1080×675 | 单人弹吉他，可用 |
| roshinee-mookaiah.jpg | Roshinee Mookaiah | The Sun 专访 | 800×1000 | 单人，可用 |
| amir-nashrin.jpg | Amir Nashrin | 用户提供 | 633×484 | 单人，分辨率偏低，≤600px 宽 |
| johari-abdul-ghani.jpg | Johari Abdul Ghani | Wikipedia 正文图 | 500×375 | **双人合影**，须标注；分辨率最低 |
| ashwad-ismail.jpg | Ashwad Ismail | Bernama 任命报道 | 1110×694 | **三人群像**，中间为本人，须标注 |
| the-game-of-impossible-leon-idris.jpg | Leon Jala + Idris Jala | 节目官方图（用户提供） | 640×640 | 双人 + 节目，Leon 由此覆盖，须标注 |

## 三 机构标识 `assets/logo/`（8 个 + 授权表）

media-prima.svg（PD）、rtm.svg（PD）、astro-awani.png（CC0）、malaysiakini.svg（PD）、spotify.svg、youtube.svg、instagram.svg、tiktok.svg。
授权明细见 `assets/logo/MANIFEST.md`。用途仅指代品牌，不暗示背书。

不采用：MMC、Media Chinese International、Sin Chew、China Press、Nanyang 的 logo —— 改用文字报头式排版。

## 四 原文页 `docs/page/`

| 文件 | 规格 | 用途 |
|---|---|---|
| page.png | 2560×24090，全页 2 倍 DPR | 原文页长图。新方案下不用于证据巡游，改作数据核对与可选背景 |
| targets.json | 24 个坐标 | 段落与数字大字的 DOM 实测位置，取数核对用 |

来源 https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/malaysia ，抓取 2026-11-19，viewport 1280、dpr 2、pageH 12045。

## 五 按段落核对：每个 beat 有什么

| 段落 | 可用素材 | 是否够 |
|---|---|---|
| C01-C05 | 无图（原文页可用作背景） | 够，纯文字/图元 |
| C06 | rex-tan.jpg + Malay Mail 卡 + FMT 卡 | 够 |
| C07-C09 | Rakyat Post 卡（文字卡为主） | 够，截图仅小图 |
| C08 | The Stoly 卡（须遮金额） | 够 |
| C10 | twentytwo13 卡 | 够 |
| C11-C12 | Bernama 卡 + MCMC 数据（文字卡） | 够 |
| C13 | cijmalaysia 卡 + ARTICLE 19 卡 | 够 |
| C14-C16 | The Edge 卡 | 够 |
| C17 | 无图，数据图（32%） | 够 |
| C18-C19 | 5 张人物 + spotify / youtube / instagram logo | 够 |
| C20 | ashwad-ismail + astro-awani + rtm | 够（须标注群像） |
| C21 | johari + amir + media-prima（须标注双人） | 够，分辨率偏紧 |
| C22 | 无图，数据图（-22% / -9.5% / -39%） | 够 |
| C23 | 无图，文字报头（44%） | 够 |
| C24 | 无图，数据图（45→14 / 54→36） | 够 |
| C25 | 无图，折线图（41→30） | 够 |
| C26 | astro-awani logo | 够 |
| C27 | 无图，片尾卡 | 够 |

结论：**按新策略素材已完备，无阻塞缺口**。唯一需要现场处理的是 The Stoly 卡上的念白外金额（C08）。
