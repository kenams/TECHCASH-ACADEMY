"""Re-render all formation videos with crossfade transitions between slides.

Uses existing tmp/ assets (no new images/audio downloaded).
Adds 0.5s crossfade between every slide for a professional mounted feel.
Then burns in SRT subtitles using ffmpeg libass.
"""

import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from moviepy import AudioFileClip, CompositeVideoClip, ImageClip
from moviepy.video.fx import CrossFadeIn

sys.path.insert(0, str(Path(__file__).parent))
from generate_videos import TMP_DIR, PUBLIC_VIDEOS_DIR, ROOT, FPS  # noqa: E402

SUBTITLES_DIR = ROOT / "public" / "videos" / "subtitles"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
CROSSFADE = 0.5  # seconds


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


def clip_for(image_path: Path, audio_path: Path) -> ImageClip:
    audio = AudioFileClip(str(audio_path))
    duration = max(audio.duration + 0.45, 6.0)
    return (
        ImageClip(str(image_path))
        .with_duration(duration)
        .resized(lambda t: 1.0 + 0.018 * (t / duration))
        .with_audio(audio)
    )


def compose_with_crossfades(clips: list) -> CompositeVideoClip:
    """Stack clips with crossfade overlap so they transition smoothly."""
    positioned = []
    t = 0.0
    for i, clip in enumerate(clips):
        if i == 0:
            positioned.append(clip.with_start(0))
            t = clip.duration
        else:
            # Start this clip CROSSFADE seconds before the previous ends
            start = t - CROSSFADE
            faded = clip.with_effects([CrossFadeIn(CROSSFADE)]).with_start(start)
            positioned.append(faded)
            t = start + clip.duration

    total_duration = t
    return CompositeVideoClip(positioned).with_duration(total_duration)


def burn_subtitles(input_mp4: Path, srt_path: Path, output_mp4: Path) -> bool:
    """Burn SRT subtitles into video using ffmpeg libass."""
    if not srt_path.exists():
        return False

    # ffmpeg subtitle filter on Windows: drive colon must be escaped as C\:/...
    srt_str = str(srt_path.resolve())
    # Replace backslashes with forward slashes, then escape the drive colon
    srt_unix = srt_str.replace("\\", "/")
    # Escape drive letter colon: C:/ -> C\:/
    if len(srt_unix) >= 2 and srt_unix[1] == ":":
        srt_unix = srt_unix[0] + "\\:" + srt_unix[2:]

    style = (
        "FontName=Segoe UI,"
        "FontSize=22,"
        "PrimaryColour=&H00FFFFFF,"
        "OutlineColour=&H00000000,"
        "BackColour=&H80000000,"
        "Outline=2,"
        "Shadow=1,"
        "Alignment=2,"
        "MarginV=28"
    )

    # Remove existing output if present
    output_mp4.unlink(missing_ok=True)

    cmd = [
        FFMPEG, "-y",
        "-i", str(input_mp4),
        "-vf", f"subtitles='{srt_unix}':force_style='{style}'",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-b:v", "1400k",
        "-c:a", "aac",
        "-movflags", "+faststart",
        str(output_mp4),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0 and output_mp4.exists()


def enhance_slug(slug: str) -> None:
    workdir = TMP_DIR / slug
    audio_files = sorted(workdir.glob("audio-*.mp3"),
                         key=lambda p: int(p.stem.split("-")[1]))
    slide_files = sorted(workdir.glob("slide-*.jpg"),
                         key=lambda p: int(p.stem.split("-")[1]))

    if not audio_files or not slide_files:
        print(f"  {slug}: missing assets, skipping")
        return

    n = min(len(audio_files), len(slide_files))
    print(f"  {slug}: composing {n} slides with {CROSSFADE}s crossfade…")

    clips = [clip_for(slide_files[i], audio_files[i]) for i in range(n)]
    video = compose_with_crossfades(clips)

    # Write intermediate file (no burned subtitles yet)
    base_path = PUBLIC_VIDEOS_DIR / f"{slug}-overview.mp4"
    tmp_path = PUBLIC_VIDEOS_DIR / f"{slug}-overview-tmp.mp4"

    video.write_videofile(
        str(tmp_path),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        bitrate="1400k",
        ffmpeg_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
        logger=None,
    )
    video.close()
    for clip in clips:
        if clip.audio:
            clip.audio.close()
        clip.close()

    # Burn in subtitles if SRT exists
    srt_path = SUBTITLES_DIR / f"{slug}-overview.srt"
    if srt_path.exists():
        print(f"  {slug}: burning subtitles…")
        ok = burn_subtitles(tmp_path, srt_path, base_path)
        tmp_path.unlink(missing_ok=True)
        if ok:
            print(f"  {slug}: done (with burned subtitles)")
        else:
            # Fallback: move tmp over base
            base_path.unlink(missing_ok=True)
            import shutil
            shutil.move(str(tmp_path), str(base_path))
            print(f"  {slug}: done (subtitle burn failed, using crossfade-only version)")
    else:
        base_path.unlink(missing_ok=True)
        import shutil
        shutil.move(str(tmp_path), str(base_path))
        print(f"  {slug}: done (no SRT found)")


def main() -> None:
    slugs = sorted(d.name for d in TMP_DIR.iterdir() if d.is_dir())
    print(f"Enhancing {len(slugs)} videos with crossfade transitions…")
    for slug in slugs:
        enhance_slug(slug)
    print("\nAll done.")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", action="append", help="Only process this slug (repeatable)")
    args = parser.parse_args()

    if args.slug:
        for s in args.slug:
            enhance_slug(s)
    else:
        main()
