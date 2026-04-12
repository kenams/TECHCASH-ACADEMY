import argparse
import asyncio
import json
import math
import re
import textwrap
import time
import urllib.parse
import urllib.request
from pathlib import Path

import edge_tts
import requests
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from moviepy import AudioFileClip, ImageClip, concatenate_videoclips

ROOT = Path(__file__).resolve().parents[2]
PUBLIC_VIDEOS_DIR = ROOT / "public" / "videos" / "formations"
PUBLIC_POSTERS_DIR = ROOT / "public" / "videos" / "posters"
PUBLIC_STILLS_DIR = ROOT / "public" / "videos" / "stills"
TMP_DIR = ROOT / "tmp" / "course_videos_rich"
WIDTH = 1280
HEIGHT = 720
FPS = 20
TITLE_FONT = "C:/Windows/Fonts/georgiab.ttf"
BODY_FONT = "C:/Windows/Fonts/segoeui.ttf"
FG = (245, 239, 226)
MUTED = (198, 207, 223)
ACCENT = (215, 184, 122)
ACCENT_ALT = (76, 201, 176)
VOICE = "fr-FR-HenriNeural"

COURSE_THEMES = {
    "freelance-it-30-jours": "French freelance IT consultant building a profitable solo service business for SMEs, premium, realistic, dark blue and gold, cinematic, no text",
    "landing-pages-rentables": "premium landing page design and conversion consulting for small businesses, realistic, modern office, SaaS premium, cinematic, no text",
    "sites-web-clients": "professional freelance website delivery for SME clients, realistic, premium office, structured project workflow, no text",
    "outils-pme-glpi": "business workflow tool design for SME support operations and internal processes, realistic, premium office, no text",
    "applications-mobiles-rentables": "mobile app product strategy, MVP design, monetization planning, realistic, premium startup workspace, no text",
    "glpi-support-pme": "GLPI deployment, internal support operations and ticketing workflows for SMEs, realistic, premium office, no text",
    "maintenance-informatique-pme": "managed IT services and preventive maintenance for SME offices, realistic, premium field support, no text",
    "apps-metier-supabase": "business app delivery with database, dashboard, auth and back office, realistic, premium developer workspace, no text",
    "cybersecurite-pme": "SME cybersecurity audit, endpoint protection, backup strategy and security awareness, realistic, premium office, no text",
    "automatisation-n8n": "no-code workflow automation consulting for SMEs with dashboards and integrations, realistic, premium office, no text",
    "microsoft-365-pme": "Microsoft 365 migration, security and collaboration consulting for SMEs, realistic, premium office, no text"
}


def read_env():
    env = {}
    for line in (ROOT / ".env.local").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        key, value = line.split("=", 1)
        env[key] = value.strip().strip("'").strip('"')
    return env


ENV = read_env()
SUPABASE_URL = ENV["NEXT_PUBLIC_SUPABASE_URL"].rstrip("/")
SUPABASE_KEY = ENV["SUPABASE_SERVICE_ROLE_KEY"]


def api_get(path: str, params: dict[str, str]):
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/{path}",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}"
        },
        params=params,
        timeout=120
    )
    response.raise_for_status()
    return response.json()


def get_courses(selected: set[str] | None = None):
    products = api_get(
        "products",
        {
            "select": "id,slug,title,short_description,long_description",
            "is_active": "eq.true",
            "order": "slug"
        }
    )
    courses = []
    for product in products:
        if selected and product["slug"] not in selected:
            continue
        modules = api_get(
            "product_modules",
            {
                "select": "slug,title,description,content_type,content_body,sort_order",
                "product_id": f"eq.{product['id']}",
                "is_published": "eq.true",
                "order": "sort_order.asc"
            }
        )
        content_modules = [module for module in modules if module["content_type"] != "video"]
        courses.append(
            {
                "slug": product["slug"],
                "title": product["title"],
                "short_description": product["short_description"],
                "long_description": product["long_description"],
                "modules": content_modules
            }
        )
    return courses


def fnt(path: str, size: int):
    return ImageFont.truetype(path, size=size)


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    text = value
    text = re.sub(r"#+\s*", "", text)
    text = re.sub(r"\*\*|\*|`|>", "", text)
    text = re.sub(r"\[(.*?)\]\((.*?)\)", r"\1", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def first_sentence(text: str, fallback: str) -> str:
    cleaned = clean_text(text)
    if not cleaned:
        return fallback
    parts = re.split(r"(?<=[.!?])\s+", cleaned)
    return parts[0][:220]


def lines(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)


def gradient():
    base = Image.new("RGB", (WIDTH, HEIGHT), (7, 12, 24))
    draw = ImageDraw.Draw(base)
    for y in range(HEIGHT):
        blend = y / HEIGHT
        draw.line((0, y, WIDTH, y), fill=(7 + int(6 * blend), 12 + int(8 * blend), 24 + int(22 * blend)))
    return base


def resize_cover(image: Image.Image) -> Image.Image:
    ratio = max(WIDTH / image.width, HEIGHT / image.height)
    size = (math.ceil(image.width * ratio), math.ceil(image.height * ratio))
    resized = image.resize(size, Image.Resampling.LANCZOS)
    left = (resized.width - WIDTH) // 2
    top = (resized.height - HEIGHT) // 2
    return resized.crop((left, top, left + WIDTH, top + HEIGHT))


def subtitle_block(draw: ImageDraw.ImageDraw, text: str):
    x1, y1, x2, y2 = 72, 528, 1208, 664
    draw.rounded_rectangle((x1, y1, x2, y2), radius=28, fill=(6, 12, 24, 205), outline=(255, 255, 255, 24), width=1)
    draw.text((102, 546), "SOUS-TITRES", fill=(ACCENT_ALT[0], ACCENT_ALT[1], ACCENT_ALT[2]), font=fnt(BODY_FONT, 18))
    y = 578
    for line in lines(text, 68)[:3]:
        draw.text((102, y), line, fill=FG, font=fnt(BODY_FONT, 26))
        y += 34


def card_frame(draw: ImageDraw.ImageDraw):
    draw.rounded_rectangle((58, 58, 1222, 662), radius=42, fill=(7, 13, 27, 112), outline=(255, 255, 255, 24), width=2)


def render_intro(course: dict, output_path: Path):
    canvas = gradient().convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    card_frame(draw)
    draw.rounded_rectangle((92, 94, 356, 146), radius=22, fill=(215, 184, 122, 28), outline=(215, 184, 122, 58), width=2)
    draw.text((122, 108), "FORMATION PREMIUM IA", fill=(247, 228, 192), font=fnt(BODY_FONT, 22))
    draw.text((92, 188), course["title"], fill=FG, font=fnt(TITLE_FONT, 54))
    y = 322
    for line in lines(clean_text(course["short_description"]), 54)[:3]:
        draw.text((96, y), line, fill=MUTED, font=fnt(BODY_FONT, 30))
        y += 42
    draw.rounded_rectangle((92, 468, 402, 520), radius=24, fill=(255, 255, 255, 10), outline=(255, 255, 255, 18), width=1)
    draw.text((124, 482), f"{len(course['modules'])} modules pratiques", fill=FG, font=fnt(BODY_FONT, 22))
    subtitle_block(draw, f"Bienvenue dans {course['title']}. Cette video tutorielle te montre la logique complete de la formation, module par module.")
    canvas.convert("RGB").save(output_path, quality=92)


def render_module_slide(course: dict, module: dict, index: int, background_path: Path, subtitle: str, output_path: Path):
    bg = resize_cover(Image.open(background_path).convert("RGB")).filter(ImageFilter.GaussianBlur(radius=0.8)).convert("RGBA")
    bg = Image.alpha_composite(bg, Image.new("RGBA", (WIDTH, HEIGHT), (3, 8, 20, 145)))
    canvas = gradient().convert("RGBA")
    canvas.alpha_composite(bg, (0, 0))
    draw = ImageDraw.Draw(canvas, "RGBA")
    card_frame(draw)
    draw.rounded_rectangle((92, 90, 246, 140), radius=20, fill=(215, 184, 122, 34), outline=(215, 184, 122, 72), width=2)
    draw.text((118, 103), f"MODULE {index:02d}", fill=(247, 228, 192), font=fnt(BODY_FONT, 20))
    draw.text((92, 178), module["title"], fill=FG, font=fnt(TITLE_FONT, 42))
    y = 284
    summary = clean_text(module["description"])
    for line in lines(summary, 52)[:3]:
        draw.text((98, y), line, fill=MUTED, font=fnt(BODY_FONT, 28))
        y += 38
    draw.rounded_rectangle((92, 430, 356, 482), radius=24, fill=(56, 199, 147, 24), outline=(56, 199, 147, 56), width=2)
    draw.text((120, 444), course["slug"].replace("-", " ").upper()[:22], fill=(201, 250, 229), font=fnt(BODY_FONT, 20))
    subtitle_block(draw, subtitle)
    canvas.convert("RGB").save(output_path, quality=92)


def render_outro(course: dict, output_path: Path):
    canvas = gradient().convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    card_frame(draw)
    draw.rounded_rectangle((92, 94, 258, 146), radius=22, fill=(56, 199, 147, 24), outline=(56, 199, 147, 58), width=2)
    draw.text((124, 108), "A RETENIR", fill=(201, 250, 229), font=fnt(BODY_FONT, 22))
    draw.text((92, 186), course["title"], fill=FG, font=fnt(TITLE_FONT, 46))
    y = 312
    bullets = [
        "Tu peux suivre la formation comme debutant et la transformer en offre vendable.",
        "Chaque module te donne un ordre logique : cadrer, outiller, produire, vendre, livrer.",
        "La video te sert de repere rapide. Les modules ecrits te servent de methode complete."
    ]
    for bullet in bullets:
        draw.rounded_rectangle((92, y - 6, 1128, y + 44), radius=22, fill=(255, 255, 255, 10), outline=(255, 255, 255, 18), width=1)
        draw.ellipse((114, y + 10, 136, y + 32), fill=ACCENT + (255,))
        draw.text((164, y + 5), bullet, fill=FG, font=fnt(BODY_FONT, 24))
        y += 74
    subtitle_block(draw, f"Tu as maintenant une vue claire de la formation {course['title']}. Passe aux modules pour appliquer la methode sur le terrain.")
    canvas.convert("RGB").save(output_path, quality=92)


def ai_prompt(course: dict, module: dict) -> str:
    theme = COURSE_THEMES.get(course["slug"], "premium business training scene, realistic, no text")
    summary = clean_text(module["description"])
    return f"{theme}, concept: {module['title']}, context: {summary}, explicit illustrative visual, realistic, premium, cinematic lighting, no text"


def download_image(prompt: str, output_path: Path, force: bool):
    if output_path.exists() and not force:
        return True
    encoded = urllib.parse.quote(prompt)
    urls = [
        f"https://image.pollinations.ai/prompt/{encoded}?width={WIDTH}&height={HEIGHT}&model=flux&enhance=true&nologo=true",
        f"https://image.pollinations.ai/prompt/{encoded}?width={WIDTH}&height={HEIGHT}&nologo=true"
    ]
    for index, url in enumerate(urls, start=1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=240) as response:
                output_path.write_bytes(response.read())
                return True
        except Exception:
            if index < len(urls):
                time.sleep(10 * index)
    return False


async def tts(text: str, output_path: Path):
    communicate = edge_tts.Communicate(text, voice=VOICE, rate="-6%")
    await communicate.save(str(output_path))


def clip_for(image_path: Path, audio_path: Path):
    audio = AudioFileClip(str(audio_path))
    duration = max(audio.duration + 0.4, 5.4)
    clip = ImageClip(str(image_path)).with_duration(duration).resized(lambda t: 1.0 + 0.024 * (t / duration)).with_audio(audio)
    return clip


def narration_for(course: dict, module: dict, index: int) -> str:
    summary = first_sentence(module.get("content_body") or "", clean_text(module["description"]))
    return f"Module {index}. {module['title']}. {clean_text(module['description'])} {summary}"


def build_course(course: dict, force: bool):
    workdir = TMP_DIR / course["slug"]
    workdir.mkdir(parents=True, exist_ok=True)
    PUBLIC_VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_POSTERS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_STILLS_DIR.mkdir(parents=True, exist_ok=True)

    slides: list[Path] = []
    audios: list[Path] = []
    narrations: list[str] = []

    intro_slide = workdir / "00-intro.jpg"
    render_intro(course, intro_slide)
    slides.append(intro_slide)
    narrations.append(f"{course['title']}. {clean_text(course['short_description'])}")

    for index, module in enumerate(course["modules"], start=1):
        background = workdir / f"{index:02d}-bg.jpg"
        prompt = ai_prompt(course, module)
        if not download_image(prompt, background, force):
            raise RuntimeError(f"Impossible de generer le visuel du module {module['slug']} pour {course['slug']}")
        slide_path = workdir / f"{index:02d}-slide.jpg"
        subtitle = narration_for(course, module, index)
        render_module_slide(course, module, index, background, subtitle, slide_path)
        slides.append(slide_path)
        narrations.append(subtitle)

    outro_slide = workdir / "99-outro.jpg"
    render_outro(course, outro_slide)
    slides.append(outro_slide)
    narrations.append(f"Tu as maintenant une vue claire de {course['title']}. Passe aux modules ecrits pour appliquer la methode sur le terrain.")

    for index, text in enumerate(narrations):
        audio_path = workdir / f"audio-{index:02d}.mp3"
        if force or not audio_path.exists() or audio_path.stat().st_size < 4096:
            asyncio.run(tts(text, audio_path))
        audios.append(audio_path)

    clips = [clip_for(slide, audio) for slide, audio in zip(slides, audios)]
    video = concatenate_videoclips(clips, method="compose")

    output_path = PUBLIC_VIDEOS_DIR / f"{course['slug']}-overview.mp4"
    video.write_videofile(
        str(output_path),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        bitrate="1400k",
        ffmpeg_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
        logger=None
    )

    video.close()
    for clip in clips:
        if clip.audio:
            clip.audio.close()
        clip.close()

    PUBLIC_POSTERS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_STILLS_DIR.mkdir(parents=True, exist_ok=True)
    Image.open(intro_slide).save(PUBLIC_POSTERS_DIR / f"{course['slug']}-overview-poster.jpg", quality=92)
    if len(slides) > 2:
        Image.open(slides[1]).save(PUBLIC_STILLS_DIR / f"{course['slug']}-overview-story-1.jpg", quality=92)
        Image.open(slides[2]).save(PUBLIC_STILLS_DIR / f"{course['slug']}-overview-story-2.jpg", quality=92)

    return output_path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", action="append")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    selected = set(args.slug or [])
    courses = get_courses(selected or None)
    for course in courses:
        print(f"Generating rich video for {course['slug']}...")
        output = build_course(course, args.force)
        print(f"done {output}")


if __name__ == "__main__":
    main()
