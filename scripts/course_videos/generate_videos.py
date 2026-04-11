import argparse
import asyncio
import io
import math
import re
import textwrap
import time
from pathlib import Path

import edge_tts
import requests
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from moviepy import AudioFileClip, ImageClip, concatenate_videoclips

ROOT = Path(__file__).resolve().parents[2]
PUBLIC_VIDEOS_DIR = ROOT / "public" / "videos" / "formations"
PUBLIC_POSTERS_DIR = ROOT / "public" / "videos" / "posters"
PUBLIC_STILLS_DIR = ROOT / "public" / "videos" / "stills"
TMP_DIR = ROOT / "tmp" / "course_videos"
ENV_PATH = ROOT / ".env.local"

WIDTH = 1280
HEIGHT = 720
FPS = 18
TITLE_FONT = "C:/Windows/Fonts/georgiab.ttf"
BODY_FONT = "C:/Windows/Fonts/segoeui.ttf"
VOICE = "fr-FR-DeniseNeural"

FG = (245, 239, 226)
MUTED = (196, 206, 224)
ACCENT = (215, 184, 122)
CARD = (13, 20, 37, 198)

THEMES = {
    "freelance-it-30-jours": {
        "visual": "French freelance IT consultant, premium dark blue and gold, small business office, cinematic realism",
        "accent": "freelance activity, first mission, SME client relationship",
    },
    "landing-pages-rentables": {
        "visual": "premium conversion landing page designer, SaaS style, analytics, client presentation, cinematic realism",
        "accent": "conversion, promesse claire, page qui vend",
    },
    "sites-web-clients": {
        "visual": "professional website consultant for SME clients, polished workspace, premium studio lighting, cinematic realism",
        "accent": "brief client, delivery web, passation propre",
    },
    "outils-pme-glpi": {
        "visual": "IT workflow consultant for SME support operations, dashboards and team workflow, cinematic realism",
        "accent": "business tool, internal support, simple workflow",
    },
    "applications-mobiles-rentables": {
        "visual": "mobile app product strategist, phone mockups, startup studio, premium cinematic realism",
        "accent": "mobile MVP, core usage, monetization",
    },
    "glpi-support-pme": {
        "visual": "IT support consultant deploying ticketing system in SME, dashboard, knowledge base, cinematic realism",
        "accent": "GLPI, support, reporting, base de connaissance",
    },
    "maintenance-informatique-pme": {
        "visual": "IT maintenance consultant for small business, preventive visit, monthly reporting, premium cinematic realism",
        "accent": "recurring maintenance, preventive visits, renewal",
    },
    "apps-metier-supabase": {
        "visual": "developer building business application with database, authentication, dashboard, premium cinematic realism",
        "accent": "business app, data, roles, back office",
    },
    "cybersecurite-pme": {
        "visual": "SME cybersecurity consultant, endpoint security, backups, risk workshop, premium cinematic realism",
        "accent": "cybersecurity, audit, backup, recovery plan",
    },
    "automatisation-n8n": {
        "visual": "no-code automation consultant building workflows for SME, diagrams, productivity dashboards, cinematic realism",
        "accent": "automatisation, workflow, n8n, gain de temps",
    },
    "microsoft-365-pme": {
        "visual": "Microsoft 365 consultant for SME migration and security, exchange teams sharepoint, premium realism",
        "accent": "Microsoft 365, mail migration, security, collaboration",
    },
}


def load_env() -> dict[str, str]:
    env: dict[str, str] = {}
    for raw in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        env[key] = value.strip().strip("\"'")
    return env


ENV = load_env()
SUPABASE_URL = ENV["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = ENV["SUPABASE_SERVICE_ROLE_KEY"]


def api_get(path: str, params: dict[str, str]) -> list[dict]:
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/{path}",
        params=params,
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        },
        timeout=120,
    )
    response.raise_for_status()
    return response.json()


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def wrap(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)


def gradient() -> Image.Image:
    base = Image.new("RGB", (WIDTH, HEIGHT), (6, 10, 20))
    draw = ImageDraw.Draw(base)
    for y in range(HEIGHT):
        blend = y / HEIGHT
        r = 6 + int(8 * blend)
        g = 10 + int(8 * blend)
        b = 20 + int(26 * blend)
        draw.line((0, y, WIDTH, y), fill=(r, g, b))
    return base


def resize_cover(image: Image.Image) -> Image.Image:
    ratio = max(WIDTH / image.width, HEIGHT / image.height)
    size = (math.ceil(image.width * ratio), math.ceil(image.height * ratio))
    resized = image.resize(size, Image.Resampling.LANCZOS)
    left = (resized.width - WIDTH) // 2
    top = (resized.height - HEIGHT) // 2
    return resized.crop((left, top, left + WIDTH, top + HEIGHT))


def compact(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def strip_markdown(text: str) -> str:
    cleaned = text or ""
    cleaned = re.sub(r"`([^`]+)`", r"\1", cleaned)
    cleaned = re.sub(r"\*\*([^*]+)\*\*", r"\1", cleaned)
    cleaned = re.sub(r"^#+\s*", "", cleaned, flags=re.MULTILINE)
    cleaned = cleaned.replace("> ", "")
    cleaned = cleaned.replace("---", " ")
    return compact(cleaned)


def first_paragraph(text: str) -> str:
    raw = (text or "").strip()
    if not raw:
        return ""
    chunks = [chunk.strip() for chunk in re.split(r"\n\s*\n", raw) if chunk.strip()]
    for chunk in chunks:
        candidate = strip_markdown(chunk)
        if candidate and not candidate.startswith("-") and not candidate.startswith("###"):
            return candidate
    return strip_markdown(raw)[:260]


def extract_bullets(content_body: str, fallback: str) -> list[str]:
    values: list[str] = []
    for line in (content_body or "").splitlines():
        cleaned = line.strip()
        if cleaned.startswith("- "):
            values.append(strip_markdown(cleaned[2:]))
        elif re.match(r"^\d+\.\s", cleaned):
            values.append(strip_markdown(re.sub(r"^\d+\.\s*", "", cleaned)))
        if len(values) >= 3:
            break
    if not values:
        values = wrap(compact(fallback), 42)[:3]
    return [value[:88] for value in values if value]


def subtitle_text(text: str) -> str:
    normalized = compact(text)
    if len(normalized) <= 112:
        return normalized
    cut = normalized[:112].rsplit(" ", 1)[0].strip()
    return f"{cut}..."


def clip_audio_excerpt(text: str) -> str:
    normalized = compact(text)
    if len(normalized) <= 160:
        return normalized
    cut = normalized[:160].rsplit(" ", 1)[0].strip()
    return f"{cut}..."


def summarize_for_voice(module: dict) -> str:
    paragraph = first_paragraph(module.get("content_body") or "")
    desc = compact(module.get("description") or "")
    base = paragraph or desc
    if len(base) < 80 and desc and desc not in base:
        base = f"{base} {desc}".strip()
    return base[:340]


def course_price(product: dict) -> str:
    cents = int(product.get("price_cents") or 0)
    return f"{cents / 100:.2f} EUR".replace(".", ",")


def fetch_courses(selected: set[str]) -> list[dict]:
    params = {
        "select": "id,slug,title,subtitle,short_description,long_description,price_cents,thumbnail_url",
        "is_active": "eq.true",
        "order": "title.asc",
    }
    if selected:
        quoted = ",".join(f'"{slug}"' for slug in sorted(selected))
        params["slug"] = f"in.({quoted})"
    products = api_get("products", params)
    courses: list[dict] = []
    for product in products:
        modules = api_get(
            "product_modules",
            {
                "select": "title,slug,description,content_type,content_body,content_url,sort_order",
                "product_id": f"eq.{product['id']}",
                "order": "sort_order.asc",
            },
        )
        modules = [module for module in modules if module.get("content_type") != "video"]
        if not modules:
            continue
        courses.append({"product": product, "modules": modules})
    return courses


def image_prompt(slug: str, title: str, description: str, step: int, total: int) -> str:
    theme = THEMES.get(slug, {"visual": "premium business training scene, cinematic realism", "accent": "formation digitale"})
    return (
        f"{theme['visual']}, scene {step} of {total}, module about {title}, {description}, "
        f"focus on {theme['accent']}, clear action, premium, cinematic, realistic, no text, no watermark"
    )


def slide_plan(course: dict) -> list[dict]:
    product = course["product"]
    modules = course["modules"]
    intro_bullets = [module["title"] for module in modules[:3]]
    slides = [
        {
            "kind": "intro",
            "label": "Vue d'ensemble",
            "title": product["title"],
            "summary": compact(product.get("long_description") or product.get("short_description") or ""),
            "bullets": intro_bullets,
            "narration": (
                f"{product['title']}. {compact(product.get('long_description') or product.get('short_description') or '')} "
                f"Dans cette formation, tu avances module par module pour pouvoir vendre et livrer une offre claire."
            ),
            "prompt": image_prompt(product["slug"], product["title"], product.get("subtitle") or "", 1, len(modules) + 2),
            "eyebrow": course_price(product),
        }
    ]
    total = len(modules) + 2
    for index, module in enumerate(modules, start=2):
        summary = compact(module.get("description") or first_paragraph(module.get("content_body") or ""))
        bullets = extract_bullets(module.get("content_body") or "", summary)
        narration = (
            f"Module {index - 1}. {module['title']}. "
            f"{summarize_for_voice(module)} "
            "L'objectif est de te donner une methode simple, directement exploitable sur le terrain."
        )
        slides.append(
            {
                "kind": "module",
                "label": f"Module {index - 1}",
                "title": module["title"],
                "summary": summary,
                "bullets": bullets,
                "narration": narration,
                "prompt": image_prompt(product["slug"], module["title"], summary, index, total),
                "eyebrow": module["content_type"].upper(),
            }
        )
    slides.append(
        {
            "kind": "outro",
            "label": "Passage a l'action",
            "title": "Plan de progression recommande",
            "summary": "Regarde la video une premiere fois en continu, puis ouvre chaque module pour appliquer la methode avec tes propres outils, documents et clients.",
            "bullets": [
                "Prendre des notes module par module",
                "Construire une offre ou un livrable concret",
                "Passer rapidement a une premiere application terrain",
            ],
            "narration": (
                f"Tu as maintenant une vue d'ensemble de {product['title'].lower()}. "
                "Le plus important est d'appliquer chaque module sur un cas reel, meme simple, pour transformer la formation en offre vendable."
            ),
            "prompt": image_prompt(product["slug"], "application terrain", product.get("subtitle") or "", total, total),
            "eyebrow": "Action",
        }
    )
    return slides


def download_image(prompt: str, output_path: Path, force: bool) -> None:
    if output_path.exists() and not force:
        try:
            Image.open(output_path).load()
            return
        except Exception:
            output_path.unlink(missing_ok=True)
    urls = [
        f"https://image.pollinations.ai/prompt/{requests.utils.quote(prompt)}?width={WIDTH}&height={HEIGHT}&model=flux&enhance=true&nologo=true",
        f"https://image.pollinations.ai/prompt/{requests.utils.quote(prompt)}?width={WIDTH}&height={HEIGHT}&nologo=true",
    ]
    last_error = None
    for attempt, url in enumerate(urls * 3, start=1):
        try:
            response = requests.get(url, timeout=240, headers={"User-Agent": "Mozilla/5.0"})
            response.raise_for_status()
            image = Image.open(io.BytesIO(response.content))
            image.load()
            image = image.convert("RGB")
            image.save(output_path, quality=92)
            return
        except Exception as error:  # noqa: PERF203
            last_error = error
            if attempt < len(urls) * 3:
                time.sleep(min(8 * attempt, 36))
    raise RuntimeError(f"Impossible de generer un visuel IA pour {output_path.name}") from last_error


def render_slide(slide: dict, background_path: Path, output_path: Path) -> None:
    bg = resize_cover(Image.open(background_path).convert("RGB")).filter(ImageFilter.GaussianBlur(radius=1.2)).convert("RGBA")
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (4, 8, 18, 146))
    bg = Image.alpha_composite(bg, overlay)

    canvas = gradient().convert("RGBA")
    canvas.alpha_composite(bg, (0, 0))

    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rounded_rectangle((56, 56, 1224, 664), radius=42, fill=CARD, outline=(255, 255, 255, 18), width=2)
    draw.rounded_rectangle((86, 84, 320, 140), radius=24, fill=(215, 184, 122, 28), outline=(215, 184, 122, 60), width=2)
    draw.text((114, 100), slide["label"].upper(), fill=(247, 228, 192), font=font(BODY_FONT, 22))
    draw.rounded_rectangle((1044, 84, 1160, 138), radius=22, fill=(56, 199, 147, 26), outline=(56, 199, 147, 62), width=2)
    draw.text((1072, 99), slide["eyebrow"], fill=(217, 246, 236), font=font(BODY_FONT, 20))

    title_font = font(TITLE_FONT, 44 if len(slide["title"]) < 66 else 38)
    y = 186
    for line in wrap(slide["title"], 32):
        draw.text((92, y), line, fill=FG, font=title_font)
        y += 50

    y += 12
    for line in wrap(slide["summary"], 58)[:4]:
        draw.text((96, y), line, fill=MUTED, font=font(BODY_FONT, 28))
        y += 40

    bullet_top = 466
    for idx, bullet in enumerate(slide["bullets"][:3]):
        top = bullet_top + idx * 58
        draw.rounded_rectangle((94, top, 842, top + 42), radius=18, fill=(9, 14, 27, 188), outline=(255, 255, 255, 20), width=1)
        draw.ellipse((110, top + 10, 132, top + 32), fill=ACCENT + (255,))
        draw.text((146, top + 8), bullet, fill=FG, font=font(BODY_FONT, 22))

    caption = subtitle_text(slide["narration"])
    draw.rounded_rectangle((94, 612, 1186, 652), radius=18, fill=(6, 10, 20, 182), outline=(255, 255, 255, 14), width=1)
    draw.text((120, 621), caption, fill=FG, font=font(BODY_FONT, 20))

    canvas.convert("RGB").save(output_path, quality=92)


async def tts(text: str, output_path: Path) -> None:
    last_error = None
    for attempt in range(5):
        try:
            if output_path.exists():
                output_path.unlink()
            communicate = edge_tts.Communicate(text, voice=VOICE, rate="-2%")
            await communicate.save(str(output_path))
            return
        except Exception as error:  # noqa: PERF203
            last_error = error
            if attempt < 4:
                await asyncio.sleep(7 * (attempt + 1))
    raise RuntimeError(f"TTS failed for {output_path.name}") from last_error


def ensure_audio(text: str, output_path: Path, force: bool) -> None:
    if not force and valid_audio(output_path):
        return
    last_error = None
    for attempt in range(4):
        try:
            asyncio.run(tts(text, output_path))
            if valid_audio(output_path):
                return
            output_path.unlink(missing_ok=True)
            last_error = RuntimeError(f"Invalid audio generated for {output_path.name}")
        except Exception as error:  # noqa: PERF203
            output_path.unlink(missing_ok=True)
            last_error = error
            if attempt < 3:
                time.sleep(4 * (attempt + 1))
    raise RuntimeError(f"Audio pipeline failed for {output_path.name}") from last_error


def valid_audio(path: Path) -> bool:
    if not path.exists() or path.stat().st_size < 4096:
        return False
    try:
        clip = AudioFileClip(str(path))
        clip.close()
        return True
    except Exception:
        return False


def clip_for(image_path: Path, audio_path: Path) -> ImageClip:
    audio = AudioFileClip(str(audio_path))
    duration = max(audio.duration + 0.45, 6.0)
    return (
        ImageClip(str(image_path))
        .with_duration(duration)
        .resized(lambda t: 1.0 + 0.018 * (t / duration))
        .with_audio(audio)
    )


def build_course(course: dict, force: bool, assets_only: bool = False) -> Path:
    product = course["product"]
    slug = product["slug"]
    slides = slide_plan(course)

    workdir = TMP_DIR / slug
    workdir.mkdir(parents=True, exist_ok=True)
    PUBLIC_VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_POSTERS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_STILLS_DIR.mkdir(parents=True, exist_ok=True)

    rendered_slides: list[Path] = []
    audio_paths: list[Path] = []
    for index, slide in enumerate(slides, start=1):
        background_path = workdir / f"scene-{index}.jpg"
        slide_path = workdir / f"slide-{index}.jpg"
        audio_path = workdir / f"audio-{index}.mp3"
        download_image(slide["prompt"], background_path, force)
        render_slide(slide, background_path, slide_path)
        rendered_slides.append(slide_path)
        audio_paths.append(audio_path)

    poster_path = PUBLIC_POSTERS_DIR / f"{slug}-overview-poster.jpg"
    Image.open(rendered_slides[0]).convert("RGB").save(poster_path, quality=92)
    for still_index, slide_path in enumerate(rendered_slides[1:3], start=1):
        Image.open(slide_path).convert("RGB").save(PUBLIC_STILLS_DIR / f"{slug}-overview-story-{still_index}.jpg", quality=92)

    if assets_only:
        return PUBLIC_VIDEOS_DIR / f"{slug}-overview.mp4"

    for slide, audio_path in zip(slides, audio_paths):
        ensure_audio(clip_audio_excerpt(slide["narration"]), audio_path, force=force)

    clips = [clip_for(slide_path, audio_path) for slide_path, audio_path in zip(rendered_slides, audio_paths)]
    video = concatenate_videoclips(clips, method="compose")
    output_path = PUBLIC_VIDEOS_DIR / f"{slug}-overview.mp4"
    video.write_videofile(
        str(output_path),
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
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", action="append")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--assets-only", action="store_true")
    args = parser.parse_args()

    selected = set(args.slug or [])
    courses = fetch_courses(selected)
    if not courses:
        raise SystemExit("No courses found")

    for course in courses:
        slug = course["product"]["slug"]
        print(f"Generating {slug}...")
        output = build_course(course, force=args.force, assets_only=args.assets_only)
        if args.assets_only:
            print(f"assets ready for {slug}")
        else:
            print(f"done {output}")


if __name__ == "__main__":
    main()
