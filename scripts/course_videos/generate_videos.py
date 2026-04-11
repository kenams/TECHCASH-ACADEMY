import argparse
import asyncio
import math
import shutil
import textwrap
import time
import urllib.parse
import urllib.request
from pathlib import Path

import edge_tts
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont
from moviepy import AudioFileClip, ImageClip, concatenate_videoclips

ROOT = Path(__file__).resolve().parents[2]
PUBLIC_VIDEOS_DIR = ROOT / "public" / "videos" / "formations"
PUBLIC_POSTERS_DIR = ROOT / "public" / "videos" / "posters"
PUBLIC_STILLS_DIR = ROOT / "public" / "videos" / "stills"
TMP_DIR = ROOT / "tmp" / "course_videos"
WIDTH = 1280
HEIGHT = 720
FPS = 18
TITLE_FONT = "C:/Windows/Fonts/georgiab.ttf"
BODY_FONT = "C:/Windows/Fonts/segoeui.ttf"
FG = (245, 239, 226)
MUTED = (196, 206, 224)
ACCENT = (215, 184, 122)
VOICE = "fr-FR-DeniseNeural"

COURSES = {
    "freelance-it-30-jours": {
        "title": "Devenir technicien informatique freelance sans diplome en 30 jours",
        "video_title": "Video explicative IA : lancer une activite freelance IT rentable",
        "scene_a": ("Positionnement rentable", "Transformer une competence IT large en offre claire et vendable.", "French freelance IT consultant explaining a simple support offer to a small business owner, realistic, cinematic, premium, dark blue and gold, no text"),
        "scene_b": ("Prospection et execution", "Prendre des contacts, envoyer des devis propres et livrer des missions simples.", "French IT freelancer on site in a small company, laptop, checklist, client discussion, realistic, cinematic, premium, no text"),
        "bullets": ["Positionner une offre IT lisible", "Trouver et qualifier des prospects", "Signer puis fideliser les premiers clients"],
        "narration": [
            "Cette formation te montre comment passer d'une competence informatique generale a une offre freelance rentable, sans promesse floue.",
            "Tu y apprends a te positionner, a lire le marche, a prospecter proprement et a presenter des prestations que de vraies PME comprennent tout de suite.",
            "L'objectif est simple : lancer une activite IT serieuse, signer les premiers clients et construire une base de revenus avec une methode claire."
        ]
    },
    "landing-pages-rentables": {
        "title": "Creer des landing pages qui vendent",
        "video_title": "Video explicative IA : vendre et livrer des landing pages rentables",
        "scene_a": ("Une offre simple a vendre", "Concevoir une landing page claire, orientee conversion, facile a justifier.", "Marketing freelancer presenting a high-converting landing page on a laptop to a client, realistic, modern office, premium SaaS style, no text"),
        "scene_b": ("Structure et livraison", "Promesse, preuve, CTA et checklist de livraison pour un vrai service client.", "Web designer refining a sales landing page with analytics charts and client notes, realistic, premium workspace, cinematic, no text"),
        "bullets": ["Construire une page qui convertit", "Mieux cadrer la livraison client", "Transformer la competence en offre packagable"],
        "narration": [
            "Cette formation t'aide a transformer la landing page en vraie offre claire, packagable et defendable.",
            "Tu y retrouves la structure qui vend, les sections a reutiliser, les preuves qui rassurent et la checklist pour livrer proprement sans perdre du temps.",
            "Au final, tu peux vendre des pages plus lisibles, plus efficaces et plus faciles a reproduire pour tes prochains clients."
        ]
    },
    "sites-web-clients": {
        "title": "Creer des sites web professionnels pour ses clients",
        "video_title": "Video explicative IA : cadrer et livrer un site client propre",
        "scene_a": ("Cadrage sans flou", "Poser le bon perimetre et demander les bons elements avant production.", "Freelance web consultant in meeting with a small business client planning a professional website, realistic, premium office, cinematic, no text"),
        "scene_b": ("Delivery professionnel", "Brief, recette, responsive et passation plus propre pour une offre plus rentable.", "Professional web delivery workflow, designer reviewing a website launch checklist on dual monitors, realistic, premium workspace, no text"),
        "bullets": ["Cadrer le besoin plus vite", "Livrer un site plus proprement", "Ajouter maintenance et evolution sans confusion"],
        "narration": [
            "Ici, l'objectif n'est pas de produire des sites compliques. L'objectif est de vendre et de livrer des sites utiles, lisibles et rentables.",
            "Tu vas voir comment cadrer le projet, structurer un brief, preparer la livraison et fixer les limites qui protegent ton temps et ton image.",
            "Cette formation transforme une prestation web generique en service professionnel, plus simple a vendre et plus propre a transmettre."
        ]
    },
    "outils-pme-glpi": {
        "title": "Creer des outils metier pour PME, support et GLPI",
        "video_title": "Video explicative IA : transformer un besoin PME en outil vendable",
        "scene_a": ("Partir d'un irritant visible", "Identifier un vrai probleme support ou metier avant de proposer un outil.", "IT consultant mapping a simple internal support workflow for a SME team, whiteboard, realistic, business technology scene, cinematic, no text"),
        "scene_b": ("Vendre une solution simple", "Cadrer un mini-outil, definir les etapes utiles et livrer une mission comprehensible.", "Small business support dashboard and workflow discussion between consultant and manager, realistic, premium corporate setting, no text"),
        "bullets": ["Identifier un besoin metier clair", "Cadrer un outil simple et utile", "Transformer le probleme en mission facturable"],
        "narration": [
            "Cette formation t'apprend a partir d'un besoin PME concret, pas d'une envie de technologie abstraite.",
            "Tu vas voir comment reformuler un irritant de support ou de suivi en outil simple, avec un perimetre lisible, des etapes claires et une promesse que le client comprend.",
            "Le resultat, c'est une mission plus facile a vendre, plus rapide a deployer et plus utile des la premiere mise en production."
        ]
    },
    "applications-mobiles-rentables": {
        "title": "Creer des applications mobiles simples et rentables",
        "video_title": "Video explicative IA : cadrer une application mobile rentable",
        "scene_a": ("MVP clair et monnayable", "Passer d'une idee trop large a une app simple, orientee usage, valeur et monetisation.", "Product designer sketching a simple mobile app MVP on tablet and phone mockups, realistic, premium startup workspace, cinematic, no text"),
        "scene_b": ("Produit avant complexite", "Wireframes, logique de monetisation et arbitrages pour lancer sans surproduction.", "Mobile product strategy meeting with app screens, startup founder and freelancer, realistic, premium office, no text"),
        "bullets": ["Cadrer un MVP mobile plus vite", "Choisir le bon flux principal", "Relier produit, usage et monetisation"],
        "narration": [
            "Cette formation montre comment concevoir une application mobile simple et rentable sans te perdre dans une liste infinie de fonctionnalites.",
            "Tu y travailles le cadrage, les wireframes utiles, la logique de monetisation et les decisions qui font la difference entre un MVP lisible et un produit trop lourd.",
            "Le but est de te laisser avec une application plus claire, plus presentable et beaucoup plus facile a lancer ou a vendre."
        ]
    },
    "glpi-support-pme": {
        "title": "Deployer GLPI et structurer un support interne pour PME",
        "video_title": "Video explicative IA : deployer GLPI et structurer un support PME",
        "scene_a": ("Support plus propre", "Transformer les demandes dispersees en portail, categories simples et historique exploitable.", "IT support consultant deploying a clean ticketing system for a SME, dashboard on screen, realistic office scene, cinematic, no text"),
        "scene_b": ("Adoption et reporting", "Faire adopter GLPI sans usine a gaz puis montrer la valeur avec un reporting lisible.", "SME support manager reviewing ticket reports and knowledge base with consultant, realistic, premium office lighting, no text"),
        "bullets": ["Cadrer le support avant l'outil", "Deployer GLPI simplement", "Montrer la valeur au dirigeant"],
        "narration": [
            "Le sujet ici n'est pas seulement GLPI. Le sujet, c'est un support interne plus propre, plus tracable et plus simple a piloter.",
            "La formation t'aide a cadrer le besoin, a configurer un perimetre utile, puis a faire adopter l'outil avec des categories simples, une base de connaissance et un reporting qui parle au client.",
            "Tu peux ainsi vendre un dispositif de support credible, comprehensible et defendable des la premiere semaine."
        ]
    },
    "maintenance-informatique-pme": {
        "title": "Vendre et livrer une offre de maintenance informatique pour PME",
        "video_title": "Video explicative IA : vendre une maintenance informatique recurrente",
        "scene_a": ("Sortir du depannage ponctuel", "Passer d'interventions isolees a un forfait de maintenance clair et repetable.", "IT freelancer presenting a monthly maintenance contract to a small business owner, realistic, premium office, cinematic, no text"),
        "scene_b": ("Routine, reporting, retention", "Onboarding, visites preventives, compte-rendus et renouvellement pour un revenu recurrent propre.", "Technician performing preventive maintenance in a small office with checklist and monthly report, realistic, premium cinematic, no text"),
        "bullets": ["Structurer un forfait de maintenance", "Mieux onboarder et suivre les clients", "Transformer le support en revenu recurrent"],
        "narration": [
            "Cette formation t'aide a construire une vraie offre de maintenance informatique pour PME, au lieu d'enchainer les depannages sans cadre.",
            "Tu y vois comment definir le perimetre, organiser l'onboarding, documenter tes interventions et prouver chaque mois la valeur de ton travail au client.",
            "L'objectif est de te donner une maintenance plus lisible, plus rentable et beaucoup plus facile a renouveler."
        ]
    },
    "apps-metier-supabase": {
        "title": "Creer des applications metier simples avec Supabase",
        "video_title": "Video explicative IA : creer une application metier simple avec Supabase",
        "scene_a": ("Application metier livrable vite", "Cadrer une application utile avec base de donnees, authentification, roles et back-office.", "Developer building a business app dashboard with database schema and auth roles, realistic, premium modern workspace, cinematic, no text"),
        "scene_b": ("Produit, donnees, livraison", "Relier besoin client, structure de donnees et mise en production dans une mission plus propre.", "Freelance developer presenting a simple business application prototype to a SME manager, realistic, premium office scene, no text"),
        "bullets": ["Cadrer une app metier simple", "Structurer donnees et roles", "Livrer une application maintenable"],
        "narration": [
            "Cette formation est concue pour les profils qui veulent livrer des applications metier simples, utiles et maintenables avec Supabase.",
            "Tu y travailles le cadrage produit, la structure des donnees, l'authentification, les roles et la logique de back-office pour aller plus vite sans perdre la lisibilite du projet.",
            "Le resultat, c'est une offre d'application metier plus credible, plus propre a deployer et plus facile a maintenir."
        ]
    },
    "cybersecurite-pme": {
        "title": "Vendre et livrer une mission cybersecurite pour PME",
        "video_title": "Video explicative IA : vendre une mission cybersecurite PME",
        "scene_a": ("Mission cyber concrete", "Audit, EDR, sauvegardes, reprise et sensibilisation : une offre cyber lisible pour une PME.", "Cybersecurity consultant explaining SME risk dashboard, backup strategy and endpoint security, realistic, premium office, cinematic, no text"),
        "scene_b": ("Conformite et protection", "Transformer les risques metier et la securite du terrain en mission vendable des aujourd'hui.", "SME cybersecurity workshop with consultant, secure laptops, backup monitoring screens, realistic, dark blue premium lighting, no text"),
        "bullets": ["Auditer l'existant plus proprement", "Packager EDR, sauvegarde et PRA", "Vendre une offre cyber credible a la PME"],
        "narration": [
            "Cette formation te montre comment structurer une mission cybersecurite concrete pour PME, au-dela des discours techniques vagues.",
            "Tu y relies audit initial, protection poste, sauvegardes chiffrees, plan de reprise et sensibilisation des equipes dans une offre claire et presentable.",
            "Le but est de rendre la cyber plus simple a expliquer, plus serieuse a livrer et plus facile a vendre a un dirigeant."
        ]
    },
    "automatisation-n8n": {
        "title": "Automatiser les taches repetitives des PME avec n8n",
        "video_title": "Video explicative IA : automatiser des taches PME avec n8n",
        "scene_a": ("Workflows utiles et facturables", "Identifier les taches repetitives, synchronisations et alertes qui valent une automatisation.", "Automation consultant building a workflow diagram for a SME using no-code tools, realistic, premium office setup, cinematic, no text"),
        "scene_b": ("n8n deploye proprement", "Relier emails, CRM, tableurs et tableaux de bord dans des workflows stables et vendables.", "No-code automation dashboard on screen with consultant and SME owner reviewing process improvements, realistic, premium cinematic, no text"),
        "bullets": ["Choisir les bons cas d'usage n8n", "Construire des workflows simples", "Facturer l'automatisation sans jargon"],
        "narration": [
            "Cette formation t'aide a transformer des taches repetitives de PME en automatisations utiles avec n8n.",
            "Tu y vois comment choisir les bons cas d'usage, connecter les outils, deployer les workflows proprement et presenter le gain de temps de maniere concrete.",
            "Au final, tu peux vendre des automatisations plus claires, plus utiles et beaucoup plus faciles a maintenir."
        ]
    },
    "microsoft-365-pme": {
        "title": "Deployer et administrer Microsoft 365 pour une PME",
        "video_title": "Video explicative IA : deployer Microsoft 365 pour une PME",
        "scene_a": ("Migration M365 propre", "Auditer un tenant, migrer les emails et structurer Exchange, Teams et SharePoint.", "Microsoft 365 migration consultant helping a small business team, email migration and collaboration tools on screens, realistic, premium office, cinematic, no text"),
        "scene_b": ("Securite et offre MSP", "Azure AD, MFA, licences, support recurrent et devis pour une mission bien payee.", "IT consultant reviewing Microsoft 365 security, teams and sharepoint setup with SME manager, realistic, premium office, no text"),
        "bullets": ["Migrer vers Microsoft 365", "Configurer securite et collaboration", "Construire une offre recurrente autour de M365"],
        "narration": [
            "Cette formation couvre la migration et l'administration Microsoft 365 pour PME, avec une logique de mission claire et monnayable.",
            "Tu y travailles l'audit de tenant, la migration de mails, la securite Azure AD, Teams, SharePoint et la construction d'une offre MSP plus lisible.",
            "L'objectif est de te donner une mission Microsoft 365 complete, serieuse et directement facturable."
        ]
    }
}


def fnt(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def lines(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)


def gradient() -> Image.Image:
    base = Image.new("RGB", (WIDTH, HEIGHT), (7, 12, 24))
    draw = ImageDraw.Draw(base)
    for y in range(HEIGHT):
        blend = y / HEIGHT
        draw.line((0, y, WIDTH, y), fill=(7 + int(5 * blend), 12 + int(6 * blend), 24 + int(18 * blend)))
    return base


def resize_cover(image: Image.Image) -> Image.Image:
    ratio = max(WIDTH / image.width, HEIGHT / image.height)
    size = (math.ceil(image.width * ratio), math.ceil(image.height * ratio))
    resized = image.resize(size, Image.Resampling.LANCZOS)
    left = (resized.width - WIDTH) // 2
    top = (resized.height - HEIGHT) // 2
    return resized.crop((left, top, left + WIDTH, top + HEIGHT))


def render_title(course: dict, output_path: Path) -> None:
    canvas = gradient().convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rounded_rectangle((84, 84, 1196, 636), radius=42, fill=(8, 13, 26, 150), outline=(255, 255, 255, 22), width=2)
    draw.rounded_rectangle((112, 112, 364, 166), radius=22, fill=(215, 184, 122, 26), outline=(215, 184, 122, 56), width=2)
    draw.text((142, 126), "FORMATION EXPLICATIVE IA", fill=(247, 228, 192), font=fnt(BODY_FONT, 24))
    draw.text((110, 212), course["title"], fill=FG, font=fnt(TITLE_FONT, 56))
    y = 366
    for line in lines(course["scene_a"][1], 54)[:3]:
        draw.text((114, y), line, fill=MUTED, font=fnt(BODY_FONT, 30))
        y += 44
    draw.rounded_rectangle((112, 530, 612, 600), radius=26, fill=(255, 255, 255, 12), outline=(255, 255, 255, 24), width=1)
    draw.text((142, 550), "Voix IA • visuels explicatifs • TechCash Academy", fill=FG, font=fnt(BODY_FONT, 22))
    canvas.convert("RGB").save(output_path, quality=92)


def render_scene(course: dict, scene: tuple[str, str, str], background_path: Path, output_path: Path) -> None:
    bg = resize_cover(Image.open(background_path).convert("RGB")).filter(ImageFilter.GaussianBlur(radius=1.4)).convert("RGBA")
    bg = Image.alpha_composite(bg, Image.new("RGBA", (WIDTH, HEIGHT), (3, 8, 20, 138)))
    canvas = gradient().convert("RGBA")
    canvas.alpha_composite(bg, (0, 0))
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rounded_rectangle((64, 64, 1216, 656), radius=42, fill=(8, 13, 26, 122), outline=(255, 255, 255, 26), width=2)
    draw.rounded_rectangle((96, 92, 322, 146), radius=20, fill=(215, 184, 122, 26), outline=(215, 184, 122, 56), width=2)
    draw.text((124, 106), "SCENE EXPLICATIVE", fill=(247, 228, 192), font=fnt(BODY_FONT, 22))
    draw.text((96, 192), scene[0], fill=FG, font=fnt(TITLE_FONT, 48))
    y = 300
    for line in lines(scene[1], 50)[:4]:
        draw.text((100, y), line, fill=MUTED, font=fnt(BODY_FONT, 29))
        y += 42
    for idx, bullet in enumerate(course["bullets"][:3]):
        top = 474 + idx * 58
        draw.rounded_rectangle((98, top, 780, top + 42), radius=18, fill=(255, 255, 255, 10), outline=(255, 255, 255, 18), width=1)
        draw.ellipse((112, top + 9, 136, top + 33), fill=ACCENT + (255,))
        draw.text((146, top + 7), bullet, fill=FG, font=fnt(BODY_FONT, 21))
    canvas.convert("RGB").save(output_path, quality=92)


def render_summary(course: dict, output_path: Path) -> None:
    canvas = gradient().convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rounded_rectangle((84, 84, 1196, 636), radius=42, fill=(8, 13, 26, 156), outline=(255, 255, 255, 22), width=2)
    draw.rounded_rectangle((112, 112, 286, 166), radius=22, fill=(56, 199, 147, 26), outline=(56, 199, 147, 56), width=2)
    draw.text((142, 126), "A RETENIR", fill=(201, 250, 229), font=fnt(BODY_FONT, 24))
    draw.text((110, 208), course["video_title"], fill=FG, font=fnt(TITLE_FONT, 50))
    y = 348
    for bullet in course["bullets"]:
        draw.rounded_rectangle((112, y - 4, 1084, y + 54), radius=24, fill=(255, 255, 255, 10), outline=(255, 255, 255, 18), width=1)
        draw.ellipse((138, y + 12, 162, y + 36), fill=ACCENT + (255,))
        draw.text((180, y + 6), bullet, fill=FG, font=fnt(BODY_FONT, 28))
        y += 88
    draw.text((112, 598), "Vue d'ensemble generee en IA pour introduire la formation.", fill=MUTED, font=fnt(BODY_FONT, 20))
    canvas.convert("RGB").save(output_path, quality=92)


def download_image(prompt: str, output_path: Path, force: bool) -> bool:
    if output_path.exists() and not force:
        return True

    prompts = [
        prompt,
        prompt.replace(", no text", "").replace(", premium", ""),
        prompt[:160]
    ]
    urls: list[str] = []
    for current in prompts:
        encoded = urllib.parse.quote(current)
        urls.append(
            f"https://image.pollinations.ai/prompt/{encoded}?width={WIDTH}&height={HEIGHT}&model=flux&enhance=true&nologo=true"
        )
        urls.append(
            f"https://image.pollinations.ai/prompt/{encoded}?width={WIDTH}&height={HEIGHT}&nologo=true"
        )

    last_error = None
    for index, url in enumerate(urls, start=1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=240) as response:
                output_path.write_bytes(response.read())
                return True
        except Exception as error:
            last_error = error
            if index < len(urls):
                time.sleep(min(12 * index, 45))
    return False


async def tts(text: str, output_path: Path) -> None:
    last_error = None
    for attempt in range(5):
        try:
            if output_path.exists():
                output_path.unlink()
            communicate = edge_tts.Communicate(text, voice=VOICE, rate="-4%")
            await communicate.save(str(output_path))
            return
        except Exception as error:  # noqa: PERF203
            last_error = error
            if attempt < 4:
                await asyncio.sleep(8 * (attempt + 1))
    raise RuntimeError(f"TTS failed for {output_path.name}") from last_error


def clip_for(image_path: Path, audio_path: Path) -> ImageClip:
    audio = AudioFileClip(str(audio_path))
    duration = max(audio.duration + 0.45, 4.8)
    return ImageClip(str(image_path)).with_duration(duration).resized(lambda t: 1.0 + 0.018 * (t / duration)).with_audio(audio)


def valid_audio(path: Path) -> bool:
    if not path.exists() or path.stat().st_size < 4096:
        return False
    try:
        clip = AudioFileClip(str(path))
        clip.close()
        return True
    except Exception:
        return False


def build_course(slug: str, course: dict, force: bool, assets_only: bool = False) -> Path:
    workdir = TMP_DIR / slug
    workdir.mkdir(parents=True, exist_ok=True)
    PUBLIC_VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_POSTERS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_STILLS_DIR.mkdir(parents=True, exist_ok=True)

    bg1 = workdir / "scene-1.jpg"
    bg2 = workdir / "scene-2.jpg"
    if not download_image(course["scene_a"][2], bg1, force):
        raise RuntimeError(f"Impossible de generer le premier visuel IA pour {slug}")
    if not download_image(course["scene_b"][2], bg2, force):
        bg2.write_bytes(bg1.read_bytes())

    title_slide = workdir / "title.jpg"
    slide_a = workdir / "a.jpg"
    slide_b = workdir / "b.jpg"
    summary_slide = workdir / "summary.jpg"
    render_title(course, title_slide)
    render_scene(course, course["scene_a"], bg1, slide_a)
    render_scene(course, course["scene_b"], bg2, slide_b)
    render_summary(course, summary_slide)

    shutil.copy2(title_slide, PUBLIC_POSTERS_DIR / f"{slug}-overview-poster.jpg")
    shutil.copy2(slide_a, PUBLIC_STILLS_DIR / f"{slug}-overview-story-1.jpg")
    shutil.copy2(slide_b, PUBLIC_STILLS_DIR / f"{slug}-overview-story-2.jpg")

    if assets_only:
        return PUBLIC_VIDEOS_DIR / f"{slug}-overview.mp4"

    audio_texts = [
        f"{course['title']}. {course['narration'][0]}",
        course["narration"][1],
        course["narration"][2],
        "Tu trouveras cette video directement dans la formation pour prendre rapidement le bon cap avant de suivre les modules."
    ]
    audio_paths = [workdir / f"audio-{index}.mp3" for index in range(4)]
    for text, audio_path in zip(audio_texts, audio_paths):
        if force or not valid_audio(audio_path):
            asyncio.run(tts(text, audio_path))

    clips = [
        clip_for(title_slide, audio_paths[0]),
        clip_for(slide_a, audio_paths[1]),
        clip_for(slide_b, audio_paths[2]),
        clip_for(summary_slide, audio_paths[3])
    ]
    video = concatenate_videoclips(clips, method="compose")
    output_path = PUBLIC_VIDEOS_DIR / f"{slug}-overview.mp4"
    video.write_videofile(
        str(output_path),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        bitrate="1000k",
        ffmpeg_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
        logger=None
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
    for slug, course in COURSES.items():
        if selected and slug not in selected:
            continue
        print(f"Generating {slug}...")
        output = build_course(slug, course, args.force, args.assets_only)
        if args.assets_only:
            print(f"assets ready for {slug}")
        else:
            print(f"done {output}")


if __name__ == "__main__":
    main()
