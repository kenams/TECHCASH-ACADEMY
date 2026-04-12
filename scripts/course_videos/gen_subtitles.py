"""Generate SRT + VTT subtitle files for all formation overview videos.

Uses existing tmp/ audio files for timing and slide_plan() narration text.
Outputs to public/videos/subtitles/{slug}-overview.{srt,vtt}
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from generate_videos import (  # noqa: E402
    TMP_DIR,
    ROOT,
    clip_audio_excerpt,
    compact,
    fetch_courses,
    slide_plan,
)

from moviepy import AudioFileClip  # noqa: E402

PUBLIC_SUBTITLES_DIR = ROOT / "public" / "videos" / "subtitles"


# ---------------------------------------------------------------------------
# Timing helpers
# ---------------------------------------------------------------------------


def get_audio_duration(path: Path) -> float:
    if not path.exists() or path.stat().st_size < 1024:
        return 8.0
    try:
        clip = AudioFileClip(str(path))
        duration = max(clip.duration + 0.45, 6.0)
        clip.close()
        return duration
    except Exception:
        return 8.0


def split_sentences(text: str) -> list[str]:
    """Split text into sentences, merging very short fragments."""
    raw = re.split(r"(?<=[.!?])\s+", compact(text))
    merged: list[str] = []
    carry = ""
    for s in raw:
        s = s.strip()
        if not s:
            continue
        combined = f"{carry} {s}".strip() if carry else s
        if len(combined) < 60 and len(combined) < len(s) + 40:
            carry = combined
        else:
            if carry:
                merged.append(carry)
            carry = s
    if carry:
        merged.append(carry)
    return merged or [text[:120]]


def make_cues(narration: str, slide_start: float, slide_duration: float) -> list[tuple[float, float, str]]:
    """Return list of (abs_start, abs_end, text) for a slide narration."""
    sentences = split_sentences(clip_audio_excerpt(narration))
    total_chars = max(sum(len(s) for s in sentences), 1)
    cues: list[tuple[float, float, str]] = []
    t = slide_start
    for sentence in sentences:
        seg_dur = (len(sentence) / total_chars) * slide_duration
        seg_dur = max(seg_dur, 1.2)
        end = t + seg_dur
        # Keep cue text to 2 lines max (~80 chars each)
        if len(sentence) > 82:
            mid = len(sentence) // 2
            cut = sentence.rfind(" ", 0, mid + 10)
            if cut > 0:
                line = f"{sentence[:cut].rstrip()}\n{sentence[cut+1:].lstrip()}"
            else:
                line = sentence[:82]
        else:
            line = sentence
        cues.append((t, end, line))
        t = end
    return cues


# ---------------------------------------------------------------------------
# Timestamp formatting
# ---------------------------------------------------------------------------


def fmt_srt(secs: float) -> str:
    h = int(secs // 3600)
    m = int((secs % 3600) // 60)
    s = int(secs % 60)
    ms = int(round((secs % 1) * 1000))
    if ms >= 1000:
        ms = 999
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def fmt_vtt(secs: float) -> str:
    h = int(secs // 3600)
    m = int((secs % 3600) // 60)
    s = int(secs % 60)
    ms = int(round((secs % 1) * 1000))
    if ms >= 1000:
        ms = 999
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"


# ---------------------------------------------------------------------------
# Main generation
# ---------------------------------------------------------------------------


def generate_subtitles_for(slug: str, slides: list[dict]) -> None:
    workdir = TMP_DIR / slug
    PUBLIC_SUBTITLES_DIR.mkdir(parents=True, exist_ok=True)

    all_cues: list[tuple[float, float, str]] = []
    cumulative = 0.0

    for i, slide in enumerate(slides, start=1):
        audio_path = workdir / f"audio-{i}.mp3"
        dur = get_audio_duration(audio_path)
        cues = make_cues(slide["narration"], cumulative, dur)
        all_cues.extend(cues)
        cumulative += dur

    # --- SRT ---
    srt_lines: list[str] = []
    for idx, (start, end, text) in enumerate(all_cues, start=1):
        srt_lines.append(str(idx))
        srt_lines.append(f"{fmt_srt(start)} --> {fmt_srt(end)}")
        srt_lines.append(text)
        srt_lines.append("")

    srt_path = PUBLIC_SUBTITLES_DIR / f"{slug}-overview.srt"
    srt_path.write_text("\n".join(srt_lines), encoding="utf-8")

    # --- VTT ---
    vtt_lines: list[str] = ["WEBVTT", ""]
    for idx, (start, end, text) in enumerate(all_cues, start=1):
        vtt_lines.append(f"cue-{idx}")
        vtt_lines.append(f"{fmt_vtt(start)} --> {fmt_vtt(end)}")
        vtt_lines.append(text)
        vtt_lines.append("")

    vtt_path = PUBLIC_SUBTITLES_DIR / f"{slug}-overview.vtt"
    vtt_path.write_text("\n".join(vtt_lines), encoding="utf-8")

    # --- Chapter VTT ---
    # One chapter per slide (label from slide plan)
    chap_lines: list[str] = ["WEBVTT", ""]
    cumulative_chap = 0.0
    for i, slide in enumerate(slides, start=1):
        audio_path = workdir / f"audio-{i}.mp3"
        dur = get_audio_duration(audio_path)
        chap_start = cumulative_chap
        chap_end = cumulative_chap + dur
        label = slide.get("label") or slide.get("title") or f"Partie {i}"
        chap_lines.append(f"{fmt_vtt(chap_start)} --> {fmt_vtt(chap_end)}")
        chap_lines.append(label)
        chap_lines.append("")
        cumulative_chap = chap_end

    chapters_path = PUBLIC_SUBTITLES_DIR / f"{slug}-chapters.vtt"
    chapters_path.write_text("\n".join(chap_lines), encoding="utf-8")

    print(f"  {slug}: {len(all_cues)} cues -> {srt_path.name} + {vtt_path.name} + {chapters_path.name}")


def main() -> None:
    print("Fetching courses from Supabase…")
    courses = fetch_courses(set())
    if not courses:
        raise SystemExit("No courses found")

    print(f"Found {len(courses)} courses. Generating subtitles…")
    for course in courses:
        slug = course["product"]["slug"]
        slides = slide_plan(course)
        generate_subtitles_for(slug, slides)

    print(f"\nDone. Subtitle files in: {PUBLIC_SUBTITLES_DIR}")


if __name__ == "__main__":
    main()
