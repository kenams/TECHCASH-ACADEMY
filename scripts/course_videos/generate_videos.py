import argparse
import asyncio
import io
import math
import re
import subprocess
import textwrap
import time
from pathlib import Path

import edge_tts
import imageio_ffmpeg
import requests
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from moviepy import AudioFileClip

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
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

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
    "trading-ia-debutant": {
        "visual": "algorithmic trading dashboard, candlestick charts, AI analysis overlay, dark premium studio, cinematic realism",
        "accent": "trading strategy, risk management, AI signals, portfolio",
    },
    "automatisation-portefeuille-ia": {
        "visual": "automated portfolio management dashboard, financial APIs, n8n workflow nodes, premium cinematic realism",
        "accent": "portfolio automation, price alerts, financial reporting, passive income",
    },
    "crypto-analyse-fondamentale-ia": {
        "visual": "cryptocurrency fundamental analysis, blockchain metrics dashboard, on-chain data visualization, premium realism",
        "accent": "crypto analysis, tokenomics, investment thesis, on-chain metrics",
    },
    "vendre-services-finance-ia": {
        "visual": "financial consultant presenting AI-powered investment report to client, premium office, cinematic realism",
        "accent": "financial consulting, AI reports, client acquisition, recurring revenue",
    },
    "ia-revenus-actifs": {
        "visual": "premium independent consultant building a service business with AI dashboards, proposals and recurring revenue charts, cinematic realism",
        "accent": "offer creation, first clients, automation, recurring income",
    },
    "chatbot-client-make-gpt": {
        "visual": "customer support chatbot dashboard with make automation flow and GPT response panels, premium realism",
        "accent": "chatbot deployment, FAQ automation, human escalation",
    },
    "agent-ia-business": {
        "visual": "AI business agent workflow, dashboards, lead scoring, reporting cockpit, premium office realism",
        "accent": "agent AI, lead qualification, reporting, automation",
    },
    "facturation-compta-freelance": {
        "visual": "freelance admin dashboard with invoices, accounting routine, premium desk, cinematic realism",
        "accent": "invoicing, bookkeeping, tax routine, freelance admin",
    },
    "offre-mensuelle-recurrente": {
        "visual": "recurring service business consultant presenting monthly retainer offer to SME client, premium realism",
        "accent": "monthly retainer, client reporting, recurring revenue",
    },
    "pack-it-freelance": {
        "visual": "IT freelance service bundle showcase with support, maintenance and ticketing visuals, premium realism",
        "accent": "freelance IT, maintenance, GLPI support",
    },
    "pack-finance-ia": {
        "visual": "premium finance and AI bundle with portfolio dashboard, crypto analysis and consulting reports, cinematic realism",
        "accent": "finance AI, trading, portfolio automation, consulting",
    },
}

LOCAL_COURSE_OVERRIDES = {
    "trading-ia-debutant": {
        "product": {
            "id": "local-trading-ia-debutant",
            "slug": "trading-ia-debutant",
            "title": "Comprendre et utiliser l'IA pour trader sans se ruiner",
            "subtitle": "Routine, risque et lecture de marché assistée",
            "short_description": "Une initiation structurée au trading assisté par IA, avec outils gratuits, risque et méthode.",
            "long_description": "Une formation pour poser une vraie méthode de trading assisté par IA sans confusion ni promesse creuse.",
            "price_cents": 5900,
            "thumbnail_url": "/visuals/formations/trading-ia-debutant-cover.svg",
        },
        "modules": [
            {"title": "Les bases du trading IA", "slug": "bases-trading-ia", "description": "Poser le rôle réel de l'IA dans ta routine.", "content_body": "## Ce que tu vas apprendre\n- cadrer l'usage de l'IA\n- bâtir une routine simple"},
            {"title": "Analyse technique assistée", "slug": "analyse-technique-ia", "description": "Lire le marché avec structure et scénarios.", "content_body": "## Ce que tu vas apprendre\n- décrire un contexte\n- structurer un plan de lecture"},
            {"title": "Backtesting sans code", "slug": "backtesting-no-code", "description": "Tester une idée avant de l'exécuter.", "content_body": "## Ce que tu vas apprendre\n- transformer une intuition en protocole\n- archiver les résultats"},
            {"title": "Capital et risque", "slug": "capital-risque", "description": "Rester en jeu plus longtemps que l'émotion.", "content_body": "## Ce que tu vas apprendre\n- sizing\n- limites de perte"},
            {"title": "Première stratégie", "slug": "strategie-personnelle", "description": "Assembler une méthode claire.", "content_body": "## Ce que tu vas apprendre\n- choisir un setup\n- documenter la stratégie"},
            {"title": "Ressources et alertes", "slug": "ressources-alertes", "description": "Créer une stack légère de travail.", "content_body": "## Ce que tu vas apprendre\n- outils gratuits\n- alertes utiles"},
        ],
    },
    "automatisation-portefeuille-ia": {
        "product": {
            "id": "local-automatisation-portefeuille-ia",
            "slug": "automatisation-portefeuille-ia",
            "title": "Automatiser la gestion de son portefeuille avec l'IA",
            "subtitle": "Alerts, reporting et pilotage propre",
            "short_description": "APIs financières, n8n, alertes et rapports pour un portefeuille mieux suivi.",
            "long_description": "Une formation pour automatiser le suivi portefeuille et en faire un système défendable ou un service vendable.",
            "price_cents": 6800,
            "thumbnail_url": "/visuals/formations/automatisation-portefeuille-ia-cover.svg",
        },
        "modules": [
            {"title": "Comprendre les APIs financières", "slug": "apis-financieres", "description": "Choisir des sources fiables.", "content_body": "## Ce que tu vas apprendre\n- sélectionner les bonnes données\n- créer un schéma stable"},
            {"title": "Scraping légal complémentaire", "slug": "scraping-legal", "description": "Compléter sans salir la qualité du système.", "content_body": "## Ce que tu vas apprendre\n- collecter proprement\n- documenter les sources"},
            {"title": "Dashboard portefeuille", "slug": "dashboard-portefeuille", "description": "Construire un cockpit utile.", "content_body": "## Ce que tu vas apprendre\n- choisir les métriques\n- guider la décision"},
            {"title": "Alertes de prix automatiques", "slug": "alertes-prix", "description": "Être alerté sans vivre dans le bruit.", "content_body": "## Ce que tu vas apprendre\n- déclencheurs utiles\n- messages lisibles"},
            {"title": "Reporting hebdomadaire", "slug": "reporting-hebdo", "description": "Créer un livrable que quelqu'un lit vraiment.", "content_body": "## Ce que tu vas apprendre\n- assembler les données\n- produire un rapport propre"},
            {"title": "Offre de service portefeuille IA", "slug": "offre-service", "description": "Transformer la stack en service vendable.", "content_body": "## Ce que tu vas apprendre\n- cadrer l'offre\n- présenter un livrable crédible"},
        ],
    },
    "crypto-analyse-fondamentale-ia": {
        "product": {
            "id": "local-crypto-analyse-fondamentale-ia",
            "slug": "crypto-analyse-fondamentale-ia",
            "title": "Analyser les cryptos avec l'IA et construire une thèse d'investissement",
            "subtitle": "Tokenomics, on-chain et conviction structurée",
            "short_description": "Une méthode pour lire des projets crypto avec plus de rigueur et moins de bruit.",
            "long_description": "Une formation qui combine lecture de whitepapers, métriques on-chain et thèse structurée avec aide IA.",
            "price_cents": 5400,
            "thumbnail_url": "/visuals/formations/crypto-analyse-fondamentale-ia-cover.svg",
        },
        "modules": [
            {"title": "Bases de l'analyse fondamentale", "slug": "bases-analyse-fondamentale", "description": "Poser une grille simple et robuste.", "content_body": "## Ce que tu vas apprendre\n- lire un projet\n- structurer une première thèse"},
            {"title": "Lire les whitepapers avec l'IA", "slug": "whitepapers-ia", "description": "Synthétiser plus vite sans perdre le sens.", "content_body": "## Ce que tu vas apprendre\n- découper un document\n- faire ressortir les angles morts"},
            {"title": "Métriques on-chain", "slug": "metriques-onchain", "description": "Sélectionner quelques indicateurs utiles.", "content_body": "## Ce que tu vas apprendre\n- choisir de bonnes métriques\n- relier les signaux à une question"},
            {"title": "Construire une thèse d'investissement", "slug": "these-investissement", "description": "Assembler projet, signaux et risques.", "content_body": "## Ce que tu vas apprendre\n- écrire une thèse\n- nommer les invalidations"},
            {"title": "Présenter une recommandation", "slug": "presentation-recommandation", "description": "Restituer de manière claire et responsable.", "content_body": "## Ce que tu vas apprendre\n- structurer une présentation\n- garder un ton défendable"},
        ],
    },
    "vendre-services-finance-ia": {
        "product": {
            "id": "local-vendre-services-finance-ia",
            "slug": "vendre-services-finance-ia",
            "title": "Vendre des services de conseil financier IA à des PME et particuliers",
            "subtitle": "Offre, prospection, reporting et récurrence",
            "short_description": "Un programme business pour transformer finance + IA en offre de service.",
            "long_description": "Une formation pour cadrer une offre de veille et rapport financier augmentée par IA, sans posture floue.",
            "price_cents": 7200,
            "thumbnail_url": "/visuals/formations/vendre-services-finance-ia-cover.svg",
        },
        "modules": [
            {"title": "Cadre légal minimal", "slug": "cadre-legal", "description": "Poser les limites et le bon vocabulaire.", "content_body": "## Ce que tu vas apprendre\n- cadrer le périmètre\n- éviter les ambiguïtés"},
            {"title": "Construire l'offre", "slug": "offre-veille-rapport", "description": "Créer un service lisible et récurrent.", "content_body": "## Ce que tu vas apprendre\n- choisir un angle de service\n- fixer le format du livrable"},
            {"title": "Prospection et acquisition", "slug": "prospection-acquisition", "description": "Trouver les bons clients avec un discours clair.", "content_body": "## Ce que tu vas apprendre\n- ouvrir une conversation\n- qualifier un besoin"},
            {"title": "Livrer un rapport pro", "slug": "livrer-rapport-pro", "description": "Créer un document qui donne confiance.", "content_body": "## Ce que tu vas apprendre\n- structurer le rapport\n- renforcer la perception de valeur"},
            {"title": "Tarification et positionnement", "slug": "tarification-positionnement", "description": "Fixer un prix et un niveau de service crédibles.", "content_body": "## Ce que tu vas apprendre\n- relier prix et livrable\n- garder une rentabilité saine"},
        ],
    },
    "ia-revenus-actifs": {
        "product": {
            "id": "local-ia-revenus-actifs",
            "slug": "ia-revenus-actifs",
            "title": "IA & Revenus Actifs - Le programme complet",
            "subtitle": "De la compétence brute à une offre de service vendable en 30 jours",
            "short_description": "Le programme flagship pour structurer une offre, trouver ses premiers clients et mettre en place une activité rentable.",
            "long_description": "Une formation complète pour transformer une compétence existante en activité indépendante claire, vendable et livrable avec méthode.",
            "price_cents": 9700,
            "thumbnail_url": "/visuals/formations/ia-revenus-actifs-cover.svg",
        },
        "modules": [
            {"title": "Positionnement rentable", "slug": "positionnement-rentable", "description": "Choisir une offre lisible et défendable.", "content_body": "## Ce que tu vas apprendre\n- choisir une offre claire\n- nommer un résultat concret\n- éviter les positionnements vagues"},
            {"title": "Construire une offre", "slug": "construire-offre", "description": "Passer du service flou à un package vendable.", "content_body": "## Ce que tu vas apprendre\n- cadrer le périmètre\n- fixer le livrable\n- annoncer une promesse crédible"},
            {"title": "Prospection simple", "slug": "prospection-simple", "description": "Ouvrir des conversations et obtenir des rendez-vous.", "content_body": "## Ce que tu vas apprendre\n- cibler les bons prospects\n- écrire un message court\n- relancer sans bruit"},
            {"title": "Livrer proprement", "slug": "livrer-proprement", "description": "Organiser sa livraison et rassurer le client.", "content_body": "## Ce que tu vas apprendre\n- structurer la livraison\n- poser les limites\n- renforcer la perception de valeur"},
            {"title": "Automatiser la base", "slug": "automatiser-base", "description": "Gagner du temps sans usine à gaz.", "content_body": "## Ce que tu vas apprendre\n- choisir quelques automatisations utiles\n- documenter ton système\n- gagner en régularité"},
            {"title": "Installer la récurrence", "slug": "installer-recurrence", "description": "Transformer un premier client en revenu récurrent.", "content_body": "## Ce que tu vas apprendre\n- proposer un suivi mensuel\n- formuler un forfait simple\n- créer un revenu plus stable"},
        ],
    },
    "chatbot-client-make-gpt": {
        "product": {
            "id": "local-chatbot-client-make-gpt",
            "slug": "chatbot-client-make-gpt",
            "title": "Créer un chatbot client avec Make et GPT",
            "subtitle": "Un assistant automatisé opérationnel en moins d'une journée",
            "short_description": "Une formation no-code pour concevoir, déployer et vendre un chatbot client utile à une PME.",
            "long_description": "Un programme pratique pour bâtir un chatbot Make + GPT, le connecter à une base de connaissances et le vendre comme offre de service.",
            "price_cents": 6800,
            "thumbnail_url": "/visuals/formations/chatbot-client-make-gpt-cover.svg",
        },
        "modules": [
            {"title": "Comprendre le chatbot client", "slug": "comprendre-chatbot", "description": "Définir le bon périmètre d'un assistant no-code.", "content_body": "## Ce que tu vas apprendre\n- choisir un vrai cas d'usage\n- éviter les attentes irréalistes\n- formuler la bonne promesse"},
            {"title": "Architecture Make + GPT", "slug": "architecture-make-gpt", "description": "Assembler le schéma qui fonctionne.", "content_body": "## Ce que tu vas apprendre\n- brancher l'entrée utilisateur\n- injecter du contexte\n- orchestrer la réponse"},
            {"title": "Déployer sur un canal réel", "slug": "deployer-chatbot", "description": "Mettre le chatbot sur un site, WhatsApp ou email.", "content_body": "## Ce que tu vas apprendre\n- choisir le bon canal\n- tester 10 cas réels\n- sécuriser l'escalade humaine"},
            {"title": "Packager et vendre", "slug": "packager-vendre", "description": "Transformer le chatbot en prestation claire.", "content_body": "## Ce que tu vas apprendre\n- fixer un forfait\n- présenter le gain de temps\n- vendre maintenance et supervision"},
            {"title": "Extensions avancées", "slug": "extensions-avancees", "description": "Ajouter qualification, rendez-vous et CRM.", "content_body": "## Ce que tu vas apprendre\n- enrichir le chatbot\n- connecter un CRM\n- augmenter la valeur du projet"},
        ],
    },
    "agent-ia-business": {
        "product": {
            "id": "local-agent-ia-business",
            "slug": "agent-ia-business",
            "title": "Créer un agent IA pour son business",
            "subtitle": "Automatiser ses tâches les plus chronophages avec un agent autonome",
            "short_description": "Une formation pour concevoir un agent IA utile à son activité ou à celle d'un client.",
            "long_description": "Un programme pour comprendre, concevoir et vendre un agent IA qui automatise veille, prospection, rédaction et reporting.",
            "price_cents": 7900,
            "thumbnail_url": "/visuals/formations/agent-ia-business-cover.svg",
        },
        "modules": [
            {"title": "Comprendre l'agent IA", "slug": "comprendre-agent-ia", "description": "Distinguer chatbot, workflow et agent.", "content_body": "## Ce que tu vas apprendre\n- cadrer l'autonomie\n- nommer le bon objectif\n- limiter le périmètre"},
            {"title": "Construire l'agent avec n8n", "slug": "construire-agent-n8n", "description": "Assembler un agent utile et stable.", "content_body": "## Ce que tu vas apprendre\n- créer un workflow\n- appeler GPT proprement\n- gérer les erreurs"},
            {"title": "Prospection automatisée", "slug": "prospection-automatisee", "description": "Qualifier des leads et produire un message pertinent.", "content_body": "## Ce que tu vas apprendre\n- scorer un prospect\n- générer un message propre\n- valider avant envoi"},
            {"title": "Reporting et veille", "slug": "reporting-veille", "description": "Faire travailler l'agent sur des livrables réels.", "content_body": "## Ce que tu vas apprendre\n- surveiller des sources\n- générer une synthèse\n- envoyer un reporting lisible"},
            {"title": "Vendre un agent à un client", "slug": "vendre-agent-client", "description": "Tarifer, cadrer et livrer la prestation.", "content_body": "## Ce que tu vas apprendre\n- vendre un gain de temps\n- cadrer la maintenance\n- proposer un accompagnement récurrent"},
        ],
    },
    "facturation-compta-freelance": {
        "product": {
            "id": "local-facturation-compta-freelance",
            "slug": "facturation-compta-freelance",
            "title": "Facturer et gérer sa compta freelance sans comptable",
            "subtitle": "Les bases légales, fiscales et pratiques pour encaisser proprement",
            "short_description": "Une formation pratique pour rester dans les clous sur la micro, la TVA et la routine administrative.",
            "long_description": "Un programme clair pour créer sa structure, facturer proprement, suivre ses charges et garder une comptabilité légère mais solide.",
            "price_cents": 5900,
            "thumbnail_url": "/visuals/formations/facturation-compta-freelance-cover.svg",
        },
        "modules": [
            {"title": "Créer sa micro-entreprise", "slug": "creer-micro-entreprise", "description": "Poser la structure la plus simple pour démarrer.", "content_body": "## Ce que tu vas apprendre\n- choisir le bon statut\n- ouvrir les bons outils\n- préparer les documents utiles"},
            {"title": "Facturation et TVA", "slug": "facturation-tva", "description": "Émettre des factures conformes et comprendre la TVA.", "content_body": "## Ce que tu vas apprendre\n- faire une facture complète\n- gérer la franchise TVA\n- provisionner ses charges"},
            {"title": "Outils et routine mensuelle", "slug": "outils-routine", "description": "Garder une compta simple mais propre.", "content_body": "## Ce que tu vas apprendre\n- choisir un outil léger\n- faire une routine mensuelle\n- archiver correctement"},
            {"title": "Protection sociale", "slug": "protection-sociale", "description": "Comprendre ce qui te couvre et ce qui manque.", "content_body": "## Ce que tu vas apprendre\n- lire ta couverture actuelle\n- compléter avec mutuelle et prévoyance\n- préparer la suite"},
            {"title": "Optimisation légale", "slug": "optimisation-legale", "description": "Réduire le chaos administratif et fiscal.", "content_body": "## Ce que tu vas apprendre\n- éviter les erreurs coûteuses\n- choisir un bon rythme de déclaration\n- gagner en sérénité"},
        ],
    },
    "offre-mensuelle-recurrente": {
        "product": {
            "id": "local-offre-mensuelle-recurrente",
            "slug": "offre-mensuelle-recurrente",
            "title": "Créer une offre mensuelle récurrente pour PME",
            "subtitle": "Transformer des missions ponctuelles en contrats stables",
            "short_description": "Un programme pour bâtir un forfait mensuel simple à vendre et à livrer.",
            "long_description": "Une formation orientée terrain pour sortir des missions one-shot et bâtir une activité récurrente avec des PME.",
            "price_cents": 6900,
            "thumbnail_url": "/visuals/formations/offre-mensuelle-recurrente-cover.svg",
        },
        "modules": [
            {"title": "Pourquoi la récurrence change tout", "slug": "pourquoi-recurrence", "description": "Comprendre le levier de stabilité qu'apporte le mensuel.", "content_body": "## Ce que tu vas apprendre\n- comparer ponctuel et récurrent\n- poser un objectif de stabilité\n- voir la valeur long terme"},
            {"title": "Formats de forfaits", "slug": "formats-forfaits", "description": "Choisir un service continu facile à packager.", "content_body": "## Ce que tu vas apprendre\n- sélectionner un besoin continu\n- nommer le forfait\n- poser les inclusions et exclusions"},
            {"title": "Pitcher et signer", "slug": "pitcher-signer", "description": "Présenter le contrat et obtenir l'accord du client.", "content_body": "## Ce que tu vas apprendre\n- choisir le bon moment\n- formuler le pitch\n- structurer le contrat"},
            {"title": "Livrer et renouveler", "slug": "livrer-renouveler", "description": "Donner de la valeur visible chaque mois.", "content_body": "## Ce que tu vas apprendre\n- faire un rapport simple\n- éviter les résiliations\n- préparer la révision de prix"},
            {"title": "Passer à l'échelle", "slug": "passer-echelle", "description": "Gérer plusieurs forfaits sans se noyer.", "content_body": "## Ce que tu vas apprendre\n- standardiser la livraison\n- prioriser les clients\n- garder une marge saine"},
        ],
    },
    "pack-it-freelance": {
        "product": {
            "id": "local-pack-it-freelance",
            "slug": "pack-it-freelance",
            "title": "Pack IT Freelance - 3 formations essentielles",
            "subtitle": "Tout pour lancer, vendre et maintenir une activité IT indépendante",
            "short_description": "Le bundle IT qui combine offre, maintenance et support structuré.",
            "long_description": "Un pack conçu pour accélérer le lancement d'une activité freelance IT avec une logique d'offre, de récurrence et de support propre.",
            "price_cents": 14900,
            "thumbnail_url": "/visuals/formations/pack-it-freelance-cover.svg",
        },
        "modules": [
            {"title": "Ce que contient le pack", "slug": "contenu-pack", "description": "Comprendre la logique d'ensemble du bundle.", "content_body": "## Ce que tu vas apprendre\n- articuler les trois formations\n- choisir un ordre de travail\n- viser un premier revenu rapidement"},
            {"title": "Parcours recommandé", "slug": "parcours-recommande", "description": "Suivre un ordre logique pour avancer sans dispersion.", "content_body": "## Ce que tu vas apprendre\n- démarrer par l'offre\n- installer la maintenance\n- structurer le support ensuite"},
        ],
    },
    "pack-finance-ia": {
        "product": {
            "id": "local-pack-finance-ia",
            "slug": "pack-finance-ia",
            "title": "Pack Finance IA - 4 formations complètes",
            "subtitle": "De la lecture de marché à la vente de services financiers augmentés",
            "short_description": "Le bundle finance pour comprendre, automatiser et monétiser l'IA appliquée aux marchés.",
            "long_description": "Un pack qui regroupe les quatre formations finance IA pour passer de la compréhension du marché à la création de services vendables.",
            "price_cents": 19700,
            "thumbnail_url": "/visuals/formations/pack-finance-ia-cover.svg",
        },
        "modules": [
            {"title": "Ce que contient le pack", "slug": "contenu-pack", "description": "Comprendre les quatre briques du bundle.", "content_body": "## Ce que tu vas apprendre\n- relier trading, portefeuille, crypto et conseil\n- choisir un angle prioritaire\n- bâtir un plan de montée en compétence"},
            {"title": "Parcours recommandé", "slug": "parcours-recommande", "description": "Avancer avec une logique plus simple qu'un empilement de contenus.", "content_body": "## Ce que tu vas apprendre\n- démarrer par la lecture du marché\n- automatiser ensuite\n- monétiser à la fin"},
        ],
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


def fallback_visual(prompt: str, output_path: Path) -> None:
    canvas = gradient().convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.ellipse((-120, 420, 420, 940), fill=(56, 199, 147, 38))
    draw.ellipse((860, -140, 1460, 420), fill=(215, 184, 122, 40))
    draw.rounded_rectangle((72, 72, 1208, 648), radius=44, fill=(11, 17, 32, 168), outline=(255, 255, 255, 18), width=2)
    draw.line((110, 170, 1170, 170), fill=(255, 255, 255, 18), width=2)
    draw.line((110, 510, 1170, 510), fill=(255, 255, 255, 12), width=1)
    for idx in range(5):
        top = 220 + idx * 48
        draw.rounded_rectangle((120, top, 860, top + 24), radius=12, fill=(255, 255, 255, 10))
    snippet = wrap(strip_markdown(prompt), 42)[:3]
    y = 548
    for line in snippet:
        draw.text((120, y), line, fill=(206, 215, 231), font=font(BODY_FONT, 20))
        y += 28
    canvas.convert("RGB").save(output_path, quality=92)


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
    if len(normalized) <= 300:
        return normalized
    cut = normalized[:300].rsplit(" ", 1)[0].strip()
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


def parse_sections(content_body: str) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {"__intro__": []}
    current = "__intro__"
    for raw in (content_body or "").splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith("### "):
            current = strip_markdown(line[4:]).lower()
            sections[current] = []
            continue
        if line.startswith("## "):
            continue
        sections.setdefault(current, []).append(line)
    return sections


def paragraph_from_lines(lines_: list[str]) -> str:
    text = strip_markdown(" ".join(lines_))
    if not text:
        return ""
    return text[:320]


def bullets_from_lines(lines_: list[str], fallback: str) -> list[str]:
    text = "\n".join(lines_)
    return extract_bullets(text, fallback)


def get_section(sections: dict[str, list[str]], prefix: str) -> list[str]:
    prefix = prefix.lower()
    for key, value in sections.items():
        if key.startswith(prefix):
            return value
    return []


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
    for slug in sorted(selected):
        if any(course["product"]["slug"] == slug for course in courses):
            continue
        local_course = LOCAL_COURSE_OVERRIDES.get(slug)
        if local_course:
            modules = []
            for index, module in enumerate(local_course["modules"], start=1):
                modules.append(
                    {
                        "content_type": module.get("content_type", "text"),
                        "sort_order": module.get("sort_order", index),
                        **module,
                    }
                )
            courses.append({"product": local_course["product"], "modules": modules})
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
                f"Bienvenue sur la vidéo tutorielle : {product['title'].lower()}. "
                f"{compact(product.get('long_description') or product.get('short_description') or '')} "
                "Dans cette vidéo, je vais te montrer la logique complète de la formation, ce que tu dois préparer, comment avancer module par module, et comment transformer le contenu en offre ou en méthode de travail réellement exploitable, même si tu débutes encore sur le sujet."
            ),
            "prompt": image_prompt(product["slug"], product["title"], product.get("subtitle") or "", 1, len(modules) * 2 + 2),
            "eyebrow": course_price(product),
        }
    ]
    total = len(modules) * 2 + 2
    step = 2
    for index, module in enumerate(modules, start=1):
        sections = parse_sections(module.get("content_body") or "")
        summary = compact(module.get("description") or first_paragraph(module.get("content_body") or ""))
        intro_text = paragraph_from_lines(sections.get("__intro__", []))
        understand_text = paragraph_from_lines(get_section(sections, "ce que tu dois comprendre"))
        tools_bullets = bullets_from_lines(get_section(sections, "outils"), summary)
        steps_bullets = bullets_from_lines(get_section(sections, "methode"), summary)
        checklist_bullets = bullets_from_lines(get_section(sections, "verification"), summary)
        behavior_bullets = bullets_from_lines(get_section(sections, "comportement"), summary)
        deliverables_bullets = bullets_from_lines(get_section(sections, "livrables"), summary)

        concept_narration = (
            f"Module {index}. {module['title']}. "
            f"{intro_text or summary} "
            f"{understand_text or 'Ce module sert à comprendre la logique avant de passer à l’exécution.'} "
            "Si tu es débutant, retiens surtout l’idée centrale du module, le résultat attendu, et le vocabulaire minimum à maîtriser pour être crédible face à un client ou dans une vraie mission."
        )
        slides.append(
            {
                "kind": "module-concept",
                "label": f"Module {index}",
                "title": module["title"],
                "summary": compact(" ".join(part for part in [intro_text, understand_text] if part)) or summary,
                "bullets": tools_bullets[:3],
                "narration": concept_narration,
                "prompt": image_prompt(product["slug"], module["title"], f"{summary} preparation and explanation", step, total),
                "eyebrow": module["content_type"].upper(),
                "background_key": f"module-{index}",
                "background_prompt": image_prompt(product["slug"], module["title"], f"{summary} preparation and explanation", index, len(modules)),
            }
        )
        step += 1
        action_narration = (
            f"Passons maintenant à l’application du module {index}. "
            f"Pour avancer proprement, prépare d’abord les éléments suivants : {', '.join(tools_bullets[:3]) if tools_bullets else 'les bons outils et un cadre clair'}. "
            f"Ensuite, suis cette logique de mise en œuvre : {', '.join(steps_bullets[:3]) if steps_bullets else 'avance étape par étape sans vouloir tout faire d’un coup'}. "
            f"Sur le terrain, adopte aussi une posture simple et professionnelle : {', '.join(behavior_bullets[:2]) if behavior_bullets else 'reste clair, concret et rassurant'}. "
            f"À la fin du module, tu dois pouvoir produire ou montrer quelque chose de tangible, par exemple : {', '.join(deliverables_bullets[:2]) if deliverables_bullets else 'un livrable propre ou une preuve de travail'}. "
            f"Avant de passer au module suivant, vérifie enfin ceci : {', '.join(checklist_bullets[:2]) if checklist_bullets else 'que le résultat soit compréhensible et réutilisable'}."
        )
        slides.append(
            {
                "kind": "module-action",
                "label": f"Module {index} · application",
                "title": f"Appliquer {module['title'].lower()}",
                "summary": "Préparation, exécution, posture terrain et vérification finale.",
                "bullets": (steps_bullets or checklist_bullets or tools_bullets)[:3],
                "narration": action_narration,
                "prompt": image_prompt(product["slug"], module["title"], f"{summary} execution and delivery", step, total),
                "eyebrow": "Action",
                "background_key": f"module-{index}",
                "background_prompt": image_prompt(product["slug"], module["title"], f"{summary} execution and delivery", index, len(modules)),
            }
        )
        step += 1
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
                f"Tu as maintenant une vue d'ensemble tutorielle de {product['title'].lower()}. "
                "Le bon usage de cette formation, ce n’est pas de tout regarder passivement. C’est de reprendre chaque module, de préparer les outils, de rédiger les documents utiles, puis de tester la méthode sur un cas réel, même simple. "
                "C’est comme ça que tu transformes la formation en compétence vendable, puis en prestation ou en système de travail durable."
            ),
            "prompt": image_prompt(product["slug"], "application terrain", product.get("subtitle") or "", total, total),
            "eyebrow": "Action",
            "background_key": "outro",
            "background_prompt": image_prompt(product["slug"], "application terrain", product.get("subtitle") or "", total, total),
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
    fallback_visual(prompt, output_path)


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


def audio_duration(path: Path) -> float:
    clip = AudioFileClip(str(path))
    duration = max(clip.duration + 0.45, 6.0)
    clip.close()
    return duration


def write_concat_manifest(paths: list[Path], output_path: Path) -> None:
    output_path.write_text(
        "".join(f"file '{path.resolve().as_posix()}'\n" for path in paths),
        encoding="utf-8",
    )


def write_slide_manifest(slide_paths: list[Path], audio_paths: list[Path], output_path: Path) -> None:
    lines: list[str] = []
    for slide_path, audio_path in zip(slide_paths, audio_paths):
        lines.append(f"file '{slide_path.resolve().as_posix()}'\n")
        lines.append(f"duration {audio_duration(audio_path):.3f}\n")
    if slide_paths:
        lines.append(f"file '{slide_paths[-1].resolve().as_posix()}'\n")
    output_path.write_text("".join(lines), encoding="utf-8")


def run_ffmpeg(command: list[str]) -> None:
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr or result.stdout or "ffmpeg failed")


def render_video_with_ffmpeg(slide_paths: list[Path], audio_paths: list[Path], output_path: Path, workdir: Path) -> None:
    slide_manifest = workdir / "slides.txt"
    audio_manifest = workdir / "audio_concat.txt"
    joined_audio = workdir / "joined-audio.mp3"
    silent_video = workdir / "silent-video.mp4"

    write_slide_manifest(slide_paths, audio_paths, slide_manifest)
    write_concat_manifest(audio_paths, audio_manifest)

    run_ffmpeg(
        [
            FFMPEG,
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(audio_manifest),
            "-af",
            "loudnorm=I=-16:TP=-1.5:LRA=11",
            "-c:a",
            "mp3",
            str(joined_audio),
        ]
    )

    run_ffmpeg(
        [
            FFMPEG,
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(slide_manifest),
            "-vf",
            f"fps={FPS},format=yuv420p",
            "-c:v",
            "libx264",
            "-movflags",
            "+faststart",
            "-an",
            str(silent_video),
        ]
    )

    run_ffmpeg(
        [
            FFMPEG,
            "-y",
            "-i",
            str(silent_video),
            "-i",
            str(joined_audio),
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-movflags",
            "+faststart",
            "-shortest",
            str(output_path),
        ]
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
    background_cache: dict[str, Path] = {}
    for index, slide in enumerate(slides, start=1):
        background_key = slide.get("background_key", f"slide-{index}")
        background_path = background_cache.get(background_key)
        if background_path is None:
            background_path = workdir / f"{background_key}.jpg"
            download_image(slide.get("background_prompt") or slide["prompt"], background_path, force)
            background_cache[background_key] = background_path
        slide_path = workdir / f"slide-{index}.jpg"
        audio_path = workdir / f"audio-{index}.mp3"
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

    output_path = PUBLIC_VIDEOS_DIR / f"{slug}-overview.mp4"
    render_video_with_ffmpeg(rendered_slides, audio_paths, output_path, workdir)
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
