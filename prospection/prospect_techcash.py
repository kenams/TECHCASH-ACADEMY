"""
Prospection TechCash Academy — formations IT sans diplôme
Cible : reconversion pro, freelances IT débutants, autodidactes
Sources : Malt (profils juniors), forums reconversion, LinkedIn public
Envoi : 20/jour via Brevo API
"""
import os, json, urllib.request, csv, time, re
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright

BREVO_API_KEY = os.environ.get("BREVO_API_KEY", "")
FROM_EMAIL    = "contact@kah-digital.ch"
FROM_NAME     = "Kenams — TechCash Academy"
APP_URL       = "https://techcash-academy.vercel.app"
MAX_PER_RUN   = 20

LEADS_CSV = Path(__file__).parent / "techcash_leads.csv"
SENT_LOG  = Path(__file__).parent / "techcash_sent.csv"
FIELDS    = ["nom", "email", "profil_url", "source"]

MALT_QUERIES = ["informatique débutant", "freelance it junior", "technicien informatique", "développeur web junior"]
PJ_QUERIES   = [("formation informatique", "Paris"), ("reconversion professionnelle IT", "Lyon")]


def extract_email(text: str) -> str:
    m = re.search(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}", text)
    return m.group(0) if m else ""


def scrape_malt(page) -> list[dict]:
    results = []
    for q in MALT_QUERIES:
        try:
            url = f"https://www.malt.fr/s?q={urllib.parse.quote(q)}&l=France"
            page.goto(url, wait_until="domcontentloaded", timeout=20000)
            time.sleep(2)
            try:
                page.click("button:has-text('Accepter')", timeout=3000)
            except Exception:
                pass
            cards = page.locator("a[href*='/profile/']").all()
            for card in cards[:8]:
                href = card.get_attribute("href") or ""
                name = card.inner_text(timeout=1000).strip().split("\n")[0]
                if href and name and len(name) > 2:
                    results.append({
                        "nom": name,
                        "email": "",
                        "profil_url": f"https://www.malt.fr{href}" if href.startswith("/") else href,
                        "source": "malt"
                    })
                    print(f"    ✓ Malt: {name[:30]}")
        except Exception as e:
            print(f"  Malt erreur {q}: {e}")
        time.sleep(1.5)
    return results


def scrape_pages_jaunes(page) -> list[dict]:
    import urllib.parse
    results = []
    for q, ville in PJ_QUERIES:
        try:
            url = f"https://www.pagesjaunes.fr/recherche/{urllib.parse.quote(q)}/{urllib.parse.quote(ville)}"
            page.goto(url, wait_until="domcontentloaded", timeout=20000)
            time.sleep(2)
            try:
                page.click("button#didomi-notice-agree-button", timeout=3000)
            except Exception:
                pass
            cards = page.locator("article.bi-content").all()
            for card in cards[:8]:
                name = ""
                try:
                    name = card.locator("a.bi-denomination").inner_text(timeout=2000).strip()
                except Exception:
                    pass
                site = ""
                try:
                    site = card.locator("a.bi-website").first.get_attribute("href", timeout=1000) or ""
                except Exception:
                    pass
                email = ""
                if site:
                    try:
                        page.goto(site, wait_until="domcontentloaded", timeout=10000)
                        email = extract_email(page.locator("body").inner_text(timeout=3000))
                        page.go_back()
                    except Exception:
                        pass
                if name:
                    results.append({"nom": name, "email": email, "profil_url": site, "source": "pages_jaunes"})
                    print(f"    ✓ PJ: {name[:30]} | {email or '-'}")
        except Exception as e:
            print(f"  PJ erreur: {e}")
        time.sleep(1.5)
    return results


def email_techcash(nom: str) -> tuple[str, str, str]:
    prenom = nom.split()[0].capitalize() if nom else "Bonjour"
    subject = f"{prenom}, technicien IT freelance sans diplôme — c'est possible"
    html = f"""<html><body style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111;">
<div style="background:#0f172a;padding:24px;border-radius:12px;margin-bottom:20px;">
  <h1 style="color:#f59e0b;margin:0;font-size:22px;">TechCash Academy</h1>
  <p style="color:#94a3b8;margin:6px 0 0;font-size:14px;">Formations IT courtes, monétisables, sans diplôme</p>
</div>
<p>Bonjour {prenom},</p>
<p>En France, des milliers de personnes gagnent leur vie en tant que techniciens IT freelance
— sans diplôme, sans école, juste avec les bonnes compétences et les bons clients.</p>
<p><strong>Ce qu'on apprend chez TechCash :</strong></p>
<ul style="line-height:2;">
  <li>🖥️ Créer des sites web pour des clients locaux</li>
  <li>🤖 Installer des chatbots IA pour des PME</li>
  <li>🔧 Support informatique freelance en 30 jours</li>
  <li>📱 Développer des apps mobiles monétisables</li>
</ul>
<p>Formations courtes, livrables concrets, clients réels dès la fin du module.</p>
<p style="text-align:center;margin:28px 0;">
  <a href="{APP_URL}" style="background:#f59e0b;color:#000;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:900;font-size:15px;">Voir les formations →</a>
</p>
<p>Kenams<br><strong>TechCash Academy</strong> — <a href="{APP_URL}">{APP_URL}</a></p>
<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
<p style="font-size:11px;color:#999;"><a href="mailto:{FROM_EMAIL}?subject=Desabonnement">Me désabonner</a></p>
</body></html>"""
    text = f"""Bonjour {prenom},

Des milliers de personnes gagnent leur vie en tant que techniciens IT freelance — sans diplôme.

TechCash Academy : formations courtes, livrables concrets, clients réels dès la fin.

Sites web, chatbots IA, support IT, apps mobiles.

{APP_URL}

Kenams — TechCash Academy"""
    return subject, html, text


def send(to_email: str, to_name: str, subject: str, html: str, text: str) -> bool:
    if not BREVO_API_KEY:
        print(f"  [DRY] {to_email} — {subject[:50]}")
        return True
    try:
        payload = json.dumps({
            "sender": {"name": FROM_NAME, "email": FROM_EMAIL},
            "to": [{"email": to_email, "name": to_name}],
            "replyTo": {"email": FROM_EMAIL},
            "subject": subject,
            "htmlContent": html,
            "textContent": text,
        }).encode()
        req = urllib.request.Request(
            "https://api.brevo.com/v3/smtp/email",
            data=payload,
            headers={"api-key": BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json"},
            method="POST"
        )
        urllib.request.urlopen(req)
        return True
    except Exception as e:
        print(f"  ERR {to_email}: {e}")
        return False


def load_sent() -> set[str]:
    if not SENT_LOG.exists():
        return set()
    with open(SENT_LOG, encoding="utf-8") as f:
        return {r["email"] for r in csv.DictReader(f) if r.get("email")}

def mark_sent(email: str):
    mode = "a" if SENT_LOG.exists() else "w"
    with open(SENT_LOG, mode, newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["email", "sent_at"])
        if mode == "w":
            w.writeheader()
        w.writerow({"email": email, "sent_at": datetime.now(timezone.utc).isoformat()})


def run():
    import urllib.parse
    print(f"[TechCash Prospection] {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    sent = load_sent()

    existing = []
    if LEADS_CSV.exists():
        with open(LEADS_CSV, encoding="utf-8") as f:
            existing = list(csv.DictReader(f))

    available = [r for r in existing if r.get("email") and r["email"] not in sent]

    if len(available) < MAX_PER_RUN:
        print("  Scraping nouveaux leads...")
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                locale="fr-FR", viewport={"width": 1280, "height": 800}
            ).new_page()
            new_leads = scrape_malt(page) + scrape_pages_jaunes(page)
            browser.close()

        seen_names = {r.get("nom") for r in existing}
        mode = "a" if LEADS_CSV.exists() else "w"
        with open(LEADS_CSV, mode, newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=FIELDS)
            if mode == "w":
                w.writeheader()
            for lead in new_leads:
                if lead["nom"] not in seen_names:
                    w.writerow(lead)
                    if lead.get("email"):
                        available.append(lead)

    sent_count = failed = 0
    for lead in available[:MAX_PER_RUN]:
        nom   = lead.get("nom", "")
        email = lead["email"].strip()
        subject, html, text = email_techcash(nom)
        ok = send(email, nom, subject, html, text)
        print(f"  [{'OK' if ok else 'KO'}] {nom[:30]:<30} {email}")
        if ok:
            mark_sent(email)
            sent_count += 1
        else:
            failed += 1
        time.sleep(1.2)

    print(f"\n  {sent_count} envoyés / {failed} échecs")


if __name__ == "__main__":
    run()
