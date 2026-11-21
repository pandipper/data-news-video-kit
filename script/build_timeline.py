# -*- coding: utf-8 -*-
"""
把 1118文章 的对齐产物转成 a2e 模板需要的 timeline.ts / subs.ts。

跳过 tts_build.py：本片的 TTS 与词级对齐已经配齐，不重新配音。
数据源（只读）：
  align/words.json            831 词，{w, s, e, cid}
  align/locked_script.md      27 段权威文案（画面文字以此为准，不用 words.json 裸词）
  align/narration-phrase.srt  217 条短语 cue（字幕基线）

输出（写入 1120文章/video/remotion/src/common/）：
  timeline.ts   TOTAL_FRAMES / CHAPTER_STARTS / SENTENCES
  subs.ts       SUBS

帧号约定与 a2e 一致：from = round(sec*30)+1，to = round(end*30)，1 起含端点。
"""
import json
import re
from pathlib import Path

SRC = Path(r"D:\TK运营\1118文章")
OUT = Path(r"D:\TK运营\1120文章\video\remotion\src\common")
FPS = 30

# 六批次（音频决定，边界落在 0.65s 段间间隙）→ 章名（进度条用，短）
CHAPTERS = [
    (1, "THE COUNCIL", "C01", "C06"),
    (2, "PRESSURE", "C07", "C12"),
    (3, "BACKLASH", "C13", "C16"),
    (4, "CREATORS", "C17", "C20"),
    (5, "THE MONEY", "C21", "C24"),
    (6, "TRUST", "C25", "C27"),
]


def f_from(sec: float) -> int:
    return int(round(sec * FPS)) + 1


def f_to(sec: float) -> int:
    return int(round(sec * FPS))


def load_words():
    return json.loads((SRC / "align" / "words.json").read_text(encoding="utf-8"))


def load_locked():
    """解析 locked_script.md 的 ## C01 (0.000 - 7.840) + 正文行"""
    text = (SRC / "align" / "locked_script.md").read_text(encoding="utf-8")
    out = {}
    cur = None
    buf = []
    for line in text.splitlines():
        m = re.match(r"^##\s+(C\d\d)\s", line)
        if m:
            if cur:
                out[cur] = " ".join(buf).strip()
            cur = m.group(1)
            buf = []
            continue
        if cur:
            s = line.strip()
            if not s or s.startswith("---") or s.startswith("|"):
                continue
            buf.append(s)
    if cur:
        out[cur] = " ".join(buf).strip()
    return out


def load_srt():
    """解析 SRT → [(start, end, text)]"""
    raw = (SRC / "align" / "narration-phrase.srt").read_text(encoding="utf-8-sig")
    cues = []
    blocks = re.split(r"\n\s*\n", raw.strip())
    for b in blocks:
        lines = [x for x in b.splitlines() if x.strip()]
        if len(lines) < 2:
            continue
        tm = re.search(r"(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})", b)
        if not tm:
            continue
        h1, m1, s1, ms1, h2, m2, s2, ms2 = (int(x) for x in tm.groups())
        a = h1 * 3600 + m1 * 60 + s1 + ms1 / 1000
        z = h2 * 3600 + m2 * 60 + s2 + ms2 / 1000
        body = [x.strip() for x in lines if "-->" not in x and not x.strip().isdigit()]
        cues.append((a, z, " ".join(body).strip()))
    return cues


def main():
    words = load_words()
    locked = load_locked()
    cues = load_srt()

    total_sec = max(w["e"] for w in words)
    # 尾部留白：a2e 的片尾压黑 + 署名卡需要末句之后约 4 s（压黑 30 帧 + 署名 94 帧）。
    # 本片音轨在末句即结束，不额外加音频，只让视频比音频长 120 帧（静默收尾）。
    TAIL_FRAMES = 120
    total_frames = f_to(total_sec) + TAIL_FRAMES

    # 段级：按 cid 聚合首词 start / 末词 end
    order = []
    span = {}
    for w in words:
        cid = w["cid"]
        if cid not in span:
            span[cid] = {"s": w["s"], "e": w["e"]}
            order.append(cid)
        else:
            span[cid]["e"] = w["e"]

    ch_of = {}
    ch_starts = []
    for n, title, c_from, c_to in CHAPTERS:
        for cid in order:
            if c_from <= cid <= c_to:
                ch_of[cid] = n
        ch_starts.append((n, title, f_from(span[c_from]["s"])))

    lines_s = []
    for cid in order:
        ch = ch_of.get(cid)
        txt = locked.get(cid, "")
        if not txt:
            raise SystemExit(f"locked_script.md 缺 {cid} 的正文")
        txt = txt.replace('"', '\\"')
        lines_s.append(
            f'  {{id: "{cid}", chapter: {ch}, from: {f_from(span[cid]["s"])}, to: {f_to(span[cid]["e"])}, text: "{txt}"}},'
        )

    tl = [
        "// 由 script/build_timeline.py 生成（源：1118文章 的词级对齐产物）。帧号 1 起含端点。",
        "// 本片不跑 tts_build.py：TTS 与词级对齐已配齐，此文件是转写产物。",
        f"export const TOTAL_FRAMES = {total_frames};",
        "export const CHAPTER_STARTS: Array<{n: number; title: string; from: number}> = [",
        *[f'  {{n: {n}, title: "{t}", from: {f}}},' for n, t, f in ch_starts],
        "];",
        "export type Sentence = {id: string; chapter: number; from: number; to: number; text: string};",
        "export const SENTENCES: Sentence[] = [",
        *lines_s,
        "];",
        "",
    ]
    (OUT / "timeline.ts").write_text("\n".join(tl), encoding="utf-8")

    subs = []
    for a, z, txt in cues:
        f0 = f_from(a)
        f1 = max(f0, f_to(z))
        txt = txt.replace('"', '\\"')
        subs.append(f'  {{from: {f0}, to: {f1}, text: "{txt}"}},')
    sb = [
        "// 由 script/build_timeline.py 生成（源：align/narration-phrase.srt，217 条短语 cue）。帧号 1 起含端点。",
        "export type SubEntry = {from: number; to: number; text: string};",
        "export const SUBS: SubEntry[] = [",
        *subs,
        "];",
        "",
    ]
    (OUT / "subs.ts").write_text("\n".join(sb), encoding="utf-8")

    # 词 → 起始帧（供 IconCue 做词级同步）。同一个词可能出现多次，全部保留成数组。
    # key 归一化：小写、去标点，与 IconCue 的 normalize 保持一致。
    wmap = {}
    for w in words:
        key = re.sub(r"[^a-z0-9]", "", w["w"].lower())
        if not key:
            continue
        wmap.setdefault(key, []).append(f_from(w["s"]))
    for k in wmap:
        wmap[k] = sorted(wmap[k])
    wt = [
        "// 由 script/build_timeline.py 生成。词（小写去标点）→ 该词每次出现的起始帧。",
        "// 供 figures/IconCue.tsx 做「念到这个词就弹图标」的词级同步；查找用 after 参数限定段落。",
        "export const WORD_FRAME: Record<string, number[]> = {",
        *[f'  "{k}": [{", ".join(str(x) for x in v)}],' for k, v in sorted(wmap.items())],
        "};",
        "",
    ]
    (OUT / "wordtime.ts").write_text("\n".join(wt), encoding="utf-8")

    print(f"句子 {len(lines_s)} 段 / 字幕 {len(subs)} 条 / 词表 {len(wmap)} 个 / 总帧 {total_frames}（{total_sec:.3f}s）")
    for n, t, f in ch_starts:
        print(f"  章{n} {t:12s} from {f}")
    # 校验：段落无缝隙、章边界落在段间
    prev_to = 0
    for cid in order:
        f0, f1 = f_from(span[cid]["s"]), f_to(span[cid]["e"])
        if f0 <= prev_to:
            print(f"  ⚠ {cid} 与前段重叠: from {f0} <= prev {prev_to}")
        prev_to = f1


if __name__ == "__main__":
    main()
