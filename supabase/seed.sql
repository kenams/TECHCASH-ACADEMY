insert into public.products (
  slug,
  title,
  subtitle,
  short_description,
  long_description,
  price_cents,
  currency,
  stripe_price_id,
  thumbnail_url,
  is_active,
  is_featured
)
values
  (
    'freelance-it-30-jours',
    'Devenir technicien informatique freelance sans diplôme en 30 jours',
    'L''offre principale pour lancer une activité IT rentable sans théâtre',
    'Apprendre à lancer une activité freelance IT rentable sans diplôme, avec méthode, positionnement, acquisition client et livrables simples.',
    'Cette formation principale t''aide à structurer une activité freelance IT vendable rapidement. Tu y trouves le positionnement, les prestations les plus faciles à vendre, la manière de parler à un client PME et des ressources concrètes pour passer de l''idée à une offre qui tient la route.',
    5900,
    'eur',
    'price_1TJrENGSZgm5QCNLNNJSXbQS',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    true,
    true
  ),
  (
    'landing-pages-rentables',
    'Creer des landing pages qui vendent',
    'Une formation pour designer, vendre et livrer des landing pages efficaces a des clients.',
    'Apprendre a concevoir, vendre et livrer des landing pages professionnelles pour des clients.',
    'Ce programme montre comment cadrer le besoin, structurer une page de conversion, vendre une prestation simple et eviter les livraisons interminables. Ideal pour proposer une offre web rapide a forte valeur percue.',
    4900,
    'eur',
    'price_1TJrEOGSZgm5QCNLeTwUULYt',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    true,
    false
  ),
  (
    'sites-web-clients',
    'Creer des sites web professionnels pour ses clients',
    'Le cadre pour vendre des sites sobres, utiles et livrables rapidement.',
    'Apprendre a creer des sites web modernes, simples a vendre et a livrer rapidement.',
    'Tu y trouveras la logique commerciale, les process de cadrage, la structure de projet et les ressources necessaires pour transformer une prestation site web en offre standardisee et rentable.',
    5400,
    'eur',
    'price_1TJrEPGSZgm5QCNLEAP6iWha',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    true,
    false
  ),
  (
    'outils-pme-glpi',
    'Creer des outils metier pour PME, support et GLPI',
    'Une offre plus technique pour produire des outils utiles et monnayables.',
    'Apprendre a creer des outils concrets pour PME, support informatique et besoins metier internes, comme un outil support GLPI.',
    'Cette formation aide a reperer les besoins metier repetitifs, cadrer un mini-outil interne, vendre sa valeur a une PME et articuler support, automatisation et maintenance simple autour de GLPI et d''usages metier proches.',
    6900,
    'eur',
    'price_1TJrEQGSZgm5QCNLSgVsDabX',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    true,
    false
  ),
  (
    'applications-mobiles-rentables',
    'Creer des applications mobiles simples et rentables',
    'Concevoir une app utile, simple et monnayable sans partir dans une usine a gaz.',
    'Apprendre a concevoir et structurer une application mobile monnayable.',
    'Un programme pense pour cadrer une idee, definir un MVP mobile credible, choisir un modele economique simple et poser une base produit propre, sans se perdre dans une complexite inutile des le depart.',
    6200,
    'eur',
    'price_1TJrERGSZgm5QCNLa5B2Z3BH',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    true,
    false
  )
on conflict (slug) do update
set
  title = excluded.title,
  subtitle = excluded.subtitle,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  price_cents = excluded.price_cents,
  currency = excluded.currency,
  stripe_price_id = excluded.stripe_price_id,
  thumbnail_url = excluded.thumbnail_url,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured;

insert into public.product_modules (
  product_id,
  slug,
  title,
  description,
  content_type,
  content_url,
  content_body,
  is_published,
  sort_order
)
select
  p.id,
  m.slug,
  m.title,
  m.description,
  m.content_type::public.product_content_type,
  m.content_url,
  m.content_body,
  m.is_published,
  m.sort_order
from public.products p
join (
  values
    (
      'freelance-it-30-jours',
      'positionnement-offre',
      'Positionnement et offre commerciale',
      'Construire une offre IT lisible et vendable dès le premier contact client. Les 3 formats qui se signent le plus vite et comment rédiger ta phrase de positionnement.',
      'text',
      null,
      $$## Construire une offre IT vendable en 2026

Le problème de la plupart des techniciens freelance est simple : ils proposent "tout". Réseau, dev, téléphonie, cybersécurité, support... Le client ne retient rien et ne rappelle pas.

**La règle d'or** : une offre qui tient en une phrase se signe. Une offre qui demande une explication se perd.

### Les 3 offres qui se signent le plus vite

- **Dépannage urgent** : intervention dans les 4h, facturation à la demi-journée, clientèle : TPE et indépendants
- **Audit poste de travail** : 90 minutes sur site, livrable écrit, prix fixe entre 180 € et 290 €
- **Maintenance préventive mensuelle** : forfait 150–350 €/mois par site, 3–5 visites annuelles + support à distance

> Ces 3 formats couvrent 80 % des demandes réelles que tu recevras de PME et TPE en 2026.

### Rédiger ta phrase de positionnement

Voici le modèle à remplir :

**"Je [service principal] pour [type de client] à [zone géographique], [promesse différenciante]."**

Exemples concrets :
- "Je dépanne et optimise les postes de travail des artisans et commerces de ma ville, avec une intervention garantie sous 4h."
- "J'installe et maintiens les infrastructures réseau des cabinets médicaux en région, avec un contrat de maintenance simple et lisible."

---

### Ce que tu dois décider avant de prospecter

Avant de contacter le moindre client, fixe ces 4 points :

- **Secteur principal** : généraliste ou spécialisé (médical, bâtiment, restauration...)
- **Zone géographique** : 30 km maximum pour démarrer, on élargit ensuite
- **Format de facturation** : TJM ou forfait ? Les deux marchent, mais le forfait rassure plus les PME
- **Canal de contact** : email à froid, LinkedIn, bouche-à-oreille, annuaire local

### Chiffres de référence 2026

- TJM technicien IT généraliste (province) : **280–420 €/jour**
- TJM technicien IT spécialisé (médical, juridique) : **380–560 €/jour**
- Forfait maintenance mensuelle PME 10 postes : **200–450 €/mois**
- Ticket de dépannage urgent (demi-journée) : **150–280 €**

> Ne bradez pas dès le départ. Un prix trop bas signale un problème de confiance, pas un avantage commercial.$$,
      true,
      1
    ),
    (
      'freelance-it-30-jours',
      'video-introduction',
      'Le marché IT freelance en France en 2026',
      'Chiffres clés, secteurs porteurs, directive NIS2, migration Windows 10/11 — comprendre pourquoi la demande n''a jamais été aussi forte pour les techniciens indépendants.',
      'text',
      null,
      $$## Le marché IT freelance en France en 2026

### Un marché en croissance structurelle

La demande de support IT externalisé n'a jamais été aussi forte dans les TPE et PME. Trois facteurs structurels expliquent cette tendance :

- **La numérisation forcée post-Covid** : des dizaines de milliers de commerces et artisans ont adopté des outils digitaux sans les maîtriser
- **Le coût d'un salarié IT interne** : entre 42 000 € et 65 000 € chargés par an, inaccessible pour une structure de moins de 20 personnes
- **La cybersécurité devenue obligatoire** : la directive NIS2 (entrée en vigueur en 2024) contraint les entreprises à sécuriser leur infrastructure, même petite

> En 2026, 7 PME sur 10 en France n'ont aucun référent IT interne. C'est ton marché.

### Les secteurs les plus accessibles

- **Artisans et commerçants** (plombiers, électriciens, boulangers, coiffeurs) : 2–4 postes, besoin de maintenance simple et rapide
- **Professions libérales** (médecins, notaires, comptables) : besoin fort de conformité RGPD et de sauvegarde sécurisée
- **Restauration et hôtellerie** : caisse enregistreuse, réseau Wi-Fi, TPE, écrans de commande
- **Petites agences** (communication, immobilier) : 5–15 postes, outils cloud, accès à distance

### Ce que les clients veulent vraiment

Pas le technicien le plus compétent. Celui qui :

- **Répond vite** : le premier à répondre signe souvent le devis
- **Explique simplement** : pas de jargon, un problème = une solution = un prix
- **Revient** : la fidélisation d'un client IT coûte 5x moins cher que d'en acquérir un nouveau
- **Facture clairement** : un devis en 2 lignes vaut mieux qu'un document de 6 pages

---

### Les demandes les plus fréquentes en 2026

- **Windows 11** : migration depuis Windows 10 (fin de support en octobre 2025, vague de demandes massive en cours)
- **Microsoft 365** : installation, migration boîtes mail, partage de fichiers SharePoint
- **NAS Synology / QNAP** : sauvegarde locale + cloud pour remplacer les disques USB
- **Pare-feu pfSense / OPNsense** : sécurisation des réseaux PME
- **Antivirus EDR** : remplacement des antivirus classiques (Bitdefender GravityZone, SentinelOne)

> La migration Windows 10 → Windows 11 représente à elle seule des millions de postes à traiter en France en 2025–2026. C'est une opportunité massive pour démarrer maintenant.

### Freelance vs DSI externalisée : où tu te positionnes

Une DSI externalisée classique facture 600–1 200 €/mois pour une PME. Elle répond en 48h et dépêche un technicien junior.

Toi, tu factures moins, tu réponds en 2h, et tu es sur place le jour même. Pour une PME de 10 personnes, tu gagnes à tous les niveaux. **C'est cet écart de réactivité que tu dois vendre.**$$,
      true,
      2
    ),
    (
      'freelance-it-30-jours',
      'plan-30-jours-pdf',
      'Plan d''action 30 jours — semaine par semaine',
      'Le programme complet pour passer de zéro à tes premiers clients en 30 jours : structure légale, identité commerciale, prospection, premières missions et fidélisation.',
      'text',
      null,
      $$## Plan d'action 30 jours : de zéro à tes premiers clients IT

Ce plan est conçu pour être exécuté en parallèle d'une autre activité. Il ne demande pas 8h/jour — il demande de la régularité sur 4 semaines.

---

### Semaine 1 — Poser les bases légales et commerciales

**Jour 1–2 : Structure juridique**
- Créer sa micro-entreprise sur `autoentrepreneur.urssaf.fr` (10 minutes, gratuit)
- Code APE recommandé : **6209Z** (autres activités informatiques)
- Franchise de TVA si CA < 37 500 €/an — sinon opter pour la TVA dès le départ

**Jour 3–4 : Identité commerciale**
- Choisir un nom commercial simple (ex : "TechSupport Prénom" ou "Ville IT Services")
- Créer une adresse email professionnelle (Zoho Mail, 2 €/mois)
- Ouvrir un compte bancaire professionnel (Shine, Qonto ou Revolut Business)

**Jour 5–7 : Tarifs et outils de facturation**
- Fixer son TJM et ses tarifs forfaitaires (voir module Tarification)
- Créer un compte sur **Indy** ou **Facture.net** pour les devis et factures conformes
- Préparer un devis modèle en PDF

> À la fin de la semaine 1, tu as une structure légale, une identité et un outil de facturation. Tu peux signer un client.

---

### Semaine 2 — Premiers contacts et prospection

**Jour 8–9 : Ton réseau proche**
- Lister 20 personnes dans ton entourage qui ont ou connaissent des TPE
- Envoyer un message simple : "Je lance une activité de support IT pour les petites entreprises. Tu connais quelqu'un qui aurait besoin d'aide ?"

**Jour 10–11 : Prospection locale physique**
- Identifier 30 commerces et artisans dans un rayon de 5 km
- Passer les voir avec une carte de visite et une phrase d'accroche (voir module Scripts)
- Objectif : 5 rendez-vous pris, pas 5 ventes signées

**Jour 12–14 : Présence en ligne minimale**
- Profil LinkedIn complet avec ton positionnement en titre
- Fiche Google Business (gratuit, 15 minutes) pour apparaître dans les recherches locales
- Optionnel : une page Malt pour les demandes entrantes

---

### Semaine 3 — Premiers devis et premières missions

**Jour 15–17 : Qualifier les prospects**
- Appeler les contacts pris en semaine 2
- Poser 3 questions : Quel est le problème ? Combien de postes ? Quel est le budget approximatif ?
- Envoyer un devis dans les 24h après chaque entretien

**Jour 18–20 : Exécuter ta première mission**
- Arriver à l'heure, en tenue propre
- Documenter ce que tu fais (photos avant/après, liste des actions)
- Livrer un compte-rendu écrit d'une page, même pour une intervention simple

**Jour 21 : Demander un témoignage**
- "Est-ce que tu serais d'accord pour laisser un avis Google ?"
- 80 % des clients satisfaits acceptent si tu le demandes dans la foulée

---

### Semaine 4 — Ancrer les habitudes et préparer la suite

**Jour 22–24 : Systèmes et process**
- Créer un tableau de suivi client simple (Notion ou Google Sheets)
- Règle de relance : tout devis non signé après 5 jours = un appel
- Configurer des rappels de maintenance préventive pour tes premiers clients

**Jour 25–27 : Développer le bouche-à-oreille**
- Rejoindre 2–3 groupes Facebook locaux de commerçants / entrepreneurs
- Proposer un bilan rapide gratuit (15 min) à un client satisfait pour encourager la recommandation

**Jour 28–30 : Bilan et ajustements**
- Compter tes devis envoyés, signés, perdus
- Identifier ce qui a le mieux fonctionné pour prospecter
- Fixer tes objectifs du mois 2 : CA cible, nombre de clients récurrents

---

> **Objectif réaliste mois 1** : 2 à 4 clients, 800 € à 2 000 € de CA. Ce n'est pas un revenu de remplacement — c'est une base solide pour le mois 2.$$,
      true,
      3
    ),
    (
      'freelance-it-30-jours',
      'scripts-prospection',
      'Scripts de prospection et qualification',
      'Textes testés sur le terrain pour prendre contact, qualifier au téléphone et gérer les 5 objections les plus fréquentes. Adaptables à ta région et ton style.',
      'text',
      null,
      $$## Scripts de prospection et qualification

Ces scripts ont été testés sur le terrain. Adapte-les à ta région et ton style — l'important est la structure, pas les mots exacts.

---

### Script de prise de contact physique (commerce / artisan)

**Contexte** : tu entres dans un commerce local pour te présenter.

> "Bonjour, je me permets de passer rapidement — je suis technicien informatique indépendant, je travaille avec des commerces et artisans de la région pour dépanner les postes, les caisses et les réseaux. Je laisse ma carte. Si un jour vous avez un souci informatique, appelez-moi directement, j'interviens en général dans la journée."

**Ce qui fonctionne dans ce script** :
- Court (20 secondes maximum)
- Pas de question intrusive
- La carte de visite laisse une trace physique
- "dans la journée" = réactivité, c'est le vrai différenciateur

---

### Script email à froid (PME, professions libérales)

**Objet** : Support informatique pour [Nom de l'entreprise]

> Bonjour [Prénom],
>
> Je suis technicien IT freelance basé à [Ville]. Je travaille avec des [type d'entreprise] pour assurer le support informatique de proximité : dépannage rapide, maintenance préventive, sécurisation des postes et des sauvegardes.
>
> Seriez-vous disponible 15 minutes cette semaine pour échanger ? Je peux me déplacer ou faire un appel selon votre préférence.
>
> [Ton prénom] — [Numéro de téléphone]

**Taux de réponse constaté** : 8 à 15 % selon le secteur. Les professions libérales répondent mieux que les artisans à l'email.

---

### Script de qualification au téléphone

Quand un prospect rappelle ou accepte un appel, pose ces 4 questions dans cet ordre :

**1. "Qu'est-ce qui se passe en ce moment côté informatique ?"**
— Laisse-le parler. Note les mots qu'il utilise.

**2. "Vous avez combien de postes en tout ?"**
— En dessous de 5 : dépannage ponctuel. Au-dessus : penser forfait maintenance.

**3. "Est-ce que vous avez déjà travaillé avec un technicien informatique ?"**
— Si oui : "Qu'est-ce qui s'est bien passé ? Moins bien ?" — tu sauras exactement ce qu'il veut.
— Si non : rassurer et éduquer sur le format d'intervention.

**4. "Quel est votre timing ?"**
— "C'est urgent" → propose une intervention demain. Prix majoré OK.
— "Pas pressé" → propose un rendez-vous de diagnostic.

> Ne parle pas de prix pendant la qualification. Le prix vient après avoir compris le besoin — jamais avant.

---

### Gérer les 5 objections les plus fréquentes

**"C'est trop cher."**
— "Par rapport à quoi exactement ? Si vous comparez à quelqu'un qui facture moins, la question c'est : est-ce qu'il intervient le jour même quand votre système tombe ?"

**"On a déjà quelqu'un."**
— "Très bien. Est-ce qu'il est disponible rapidement en cas d'urgence ? Je peux être un backup si besoin."

**"Je vais y réfléchir."**
— "Bien sûr. Juste pour mieux revenir vers vous : c'est plutôt une question de timing ou de budget ?"

**"On se débrouille tout seuls."**
— "Je comprends. La plupart de mes clients me disaient la même chose avant leur première panne. Je vous laisse ma carte pour ce jour-là."

**"Envoyez-moi un email."**
— Envoie dans les 2h. Relance 5 jours après si pas de réponse.$$,
      true,
      4
    ),
    (
      'freelance-it-30-jours',
      'tarification-devis',
      'Tarification, devis et facturation',
      'Grille tarifaire complète 2026, structure d''un devis professionnel, outils de facturation recommandés et techniques pour défendre ton prix sans brader.',
      'text',
      null,
      $$## Tarification, devis et facturation

### Fixer ses tarifs : la bonne logique

Ne fixe pas tes tarifs en fonction de ce que tu "mérites" — fixe-les en fonction de ce que le client perd s'il n'a pas de solution.

Une PME qui perd sa connexion internet un jeudi matin perd en moyenne 800 € à 2 000 € de productivité par heure. Ton intervention à 280 € est une évidence.

---

### Grille tarifaire de référence 2026

**Dépannage à distance**
- Durée : 30–60 minutes
- Tarif : 65–95 € l'heure, minimum de facturation 1h

**Dépannage sur site (demi-journée)**
- Durée : 3–4 heures
- Tarif : 180–280 € selon zone et complexité
- Frais de déplacement si > 15 km : 0,45 €/km

**Audit informatique**
- Durée : 90 minutes sur site + livrable écrit
- Tarif : 220–350 €
- Ce qui le justifie : rapport de 2–3 pages avec priorités et recommandations chiffrées

**Installation poste de travail**
- Installation OS + logiciels métier + configuration : 120–180 €/poste
- Migration Windows 10 → Windows 11 : 95–150 €/poste

**Forfait maintenance mensuelle**
- 1 à 5 postes : 90–180 €/mois
- 6 à 15 postes : 200–420 €/mois
- Inclut : 1 visite préventive/trimestre + support à distance illimité + rapport mensuel

> **Règle d'or** : un forfait maintenance doit couvrir au minimum 1,5 jours de travail par mois. En dessous, tu travailles à perte.

---

### Structure d'un devis professionnel

Un bon devis tient sur une page. Voici la structure :

- **En-tête** : ton nom/société, SIRET, adresse, email, téléphone
- **Coordonnées client** : nom, adresse
- **Numéro et date du devis**
- **Objet** : une ligne claire ("Intervention dépannage réseau — 1 demi-journée")
- **Détail des prestations** : ligne par ligne, quantité × prix unitaire
- **Total HT** + mention TVA (ou "TVA non applicable — article 293B du CGI" si franchise)
- **Conditions de paiement** : 30 % à la commande recommandé pour les missions > 300 €
- **Validité** : 30 jours

**Outils recommandés** :
- **Indy** : idéal auto-entrepreneur, comptabilité intégrée, 9,99 €/mois
- **Facture.net** : gratuit, simple, conforme
- **Pennylane** : si tu veux déléguer la comptabilité plus tard

---

### Défendre ton prix sans brader

**Ne pas brader les premières missions.** Un premier client payé 50 % moins cher que ton tarif normal n'attendra pas ton tarif normal — il demandera la même remise la prochaine fois.

Si un client hésite :
- Proposer un paiement en 2 fois sans frais
- Réduire le périmètre (pas le prix) : "Je peux faire uniquement les 3 postes prioritaires cette semaine."
- Offrir une garantie de résultat : "Si le problème revient sous 30 jours, j'interviens sans frais supplémentaires."$$,
      true,
      5
    ),
    (
      'freelance-it-30-jours',
      'outils-technicien-2026',
      'Les outils indispensables du technicien IT en 2026',
      'Stack complète testée : accès à distance, gestion des tickets, cybersécurité EDR, sauvegarde NAS/cloud, facturation et image professionnelle. Ce que tu dois avoir avant ta première mission.',
      'text',
      null,
      $$## Les outils indispensables du technicien IT freelance en 2026

Un bon technicien IT freelance travaille avec des outils professionnels. Voici la stack complète recommandée, testée sur le terrain.

---

### Accès à distance

**AnyDesk** (recommandé)
- Gratuit en usage personnel, 14,90 €/mois en professionnel
- Plus rapide que TeamViewer sur connexions lentes
- Sessions non surveillées avec mot de passe permanent

**Remote Desktop (RDP) natif Windows**
- Gratuit, intégré à Windows Pro
- À configurer avec un VPN — ne jamais ouvrir le port 3389 directement sur internet
- Idéal pour les clients sur Microsoft 365 avec Azure AD

> Ne jamais ouvrir le port RDP (3389) directement sur internet. Toujours passer par un VPN ou un tunnel SSH.

---

### Gestion des tickets et suivi client

**Freshdesk** (gratuit jusqu'à 10 agents)
- Centralise toutes les demandes par email
- Envoie des rapports d'intervention automatiques
- Interface propre et intuitive pour les clients

**Notion** (pour démarrer)
- Tableau de suivi client simple
- Templates pour les rapports d'intervention
- Gratuit jusqu'à usage personnel

---

### Cybersécurité et diagnostic

**Bitdefender GravityZone** (EDR PME)
- Console cloud centralisée pour gérer plusieurs clients
- Licence revendeur disponible : 8–12 €/poste/an
- Indispensable pour remplacer les antivirus classiques

**CrystalDiskInfo**
- Diagnostic santé des disques durs et SSD
- Gratuit et portable (pas d'installation requise)
- À lancer systématiquement lors de tout audit poste

**HWiNFO64**
- Relevé complet matériel : CPU, RAM, températures, SMART
- Gratuit et portable
- Indispensable pour les rapports d'audit

---

### Sauvegarde et récupération

**Synology DiskStation** (NAS sur site)
- Gamme DS223 ou DS423+ recommandée pour les PME 5–20 postes
- Combine sauvegarde locale + Synology C2 Cloud
- Prix matériel : 300–600 €, disques en supplément

**Veeam Agent for Windows** (gratuit)
- Sauvegarde complète ou incrémentale du système
- Restore bare-metal en cas de panne totale
- Compatible avec les NAS Synology

**Backblaze B2**
- Stockage cloud à 6 $/To/mois (10x moins cher que AWS S3)
- S'intègre à Veeam et à la plupart des solutions de backup

---

### Facturation et paiement

**Indy** (anciennement Georges)
- Comptabilité automatisée pour auto-entrepreneurs
- Catégorisation automatique des dépenses
- 9,99 €/mois

**SumUp** (paiement sur site)
- Lecteur de carte physique à 39 €
- 1,69 % par transaction, sans abonnement
- Idéal pour les interventions chez les artisans

---

### Image professionnelle

**Zoho Mail** (2,70 €/mois)
- Adresse email toi@tondomaine.fr
- Indispensable pour paraître professionnel dès le premier email

**Google Business Profile** (gratuit)
- Fiche entreprise sur Google Maps
- Permet aux clients de te trouver et de laisser des avis
- Référencement local : essentiel en 2026

**Canva** (gratuit)
- Créer une carte de visite en 15 minutes
- Impression via Vistaprint : 250 cartes pour 15 €

> **À retenir** : investis dans les outils avant d'investir dans la communication. Un technicien bien outillé résout 2x plus vite, fidélise mieux, et inspire plus confiance au premier rendez-vous.$$,
      true,
      6
    ),
    (
      'freelance-it-30-jours',
      'cas-clients-a-venir',
      'Cas clients terrain et gestion des objections avancées',
      'Études de cas réels, scénarios de mission complexe, gestion des clients difficiles et stratégies pour fidéliser sur le long terme. Module en cours de production.',
      'coming_soon',
      null,
      null,
      true,
      7
    ),
    (
      'landing-pages-rentables',
      'structure-conversion',
      'Structurer une landing page qui convertit',
      'Une methode sobre pour construire un message clair, une promesse credible et un CTA fort.',
      'text',
      null,
      'Une landing page vend parce qu''elle clarifie. Le contenu doit parler du probleme, de la transformation et de la prochaine action. Dans ce module, on formalise les blocs indispensables et ce qu''il faut supprimer pour garder une page directe.',
      true,
      1
    ),
    (
      'landing-pages-rentables',
      'wireframe-client-pdf',
      'Wireframe client PDF',
      'Un support telechargeable pour cadrer une prestation sans partir dans des maquettes lourdes.',
      'pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      2
    ),
    (
      'landing-pages-rentables',
      'checklist-livraison',
      'Checklist de livraison',
      'Une ressource prete a l''emploi pour securiser la livraison et les retours client.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'landing-pages-rentables',
      'video-introduction',
      'Video explicative : vendre une landing page rentable',
      'Une capsule pour poser la promesse, la structure attendue et la logique de livraison.',
      'video',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      null,
      true,
      4
    ),
    (
      'landing-pages-rentables',
      'atelier-copywriting',
      'Atelier copywriting client',
      'Atelier avance ajoute prochainement avec exemples avant / apres.',
      'coming_soon',
      null,
      null,
      true,
      5
    ),
    (
      'sites-web-clients',
      'cadrage-projet',
      'Cadrer un site client en 30 minutes',
      'Une methode pour obtenir le bon perimetre sans se perdre dans un cahier des charges flou.',
      'text',
      null,
      'Le cadrage d''un site client commence par une promesse claire, 3 a 5 sections utiles et une date de livraison realiste. Le but de cette formation est de rendre les projets web plus simples a vendre et plus propres a livrer.',
      true,
      1
    ),
    (
      'sites-web-clients',
      'brief-client-pdf',
      'Brief client pret a envoyer',
      'Un document standard pour eviter les oublis des la prise de besoin.',
      'pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      2
    ),
    (
      'sites-web-clients',
      'stack-template',
      'Stack et template de demarrage',
      'Une ressource de demarrage pour standardiser les projets web vendus.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'sites-web-clients',
      'video-introduction',
      'Video explicative : cadrer et vendre un site client',
      'Une capsule pour comprendre le type de projet, la sobriete attendue et la logique de livraison.',
      'video',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      null,
      true,
      4
    ),
    (
      'sites-web-clients',
      'video-debrief',
      'Debrief de projet complet',
      'Retour video detaille ajoute prochainement sur un cas reel de livraison.',
      'coming_soon',
      null,
      null,
      true,
      5
    ),
    (
      'outils-pme-glpi',
      'audit-besoins-metier',
      'Reperer un besoin metier monnayable',
      'Le bon angle pour transformer un irritant metier en mini-outil vendable.',
      'text',
      null,
      'Avant d''ecrire la moindre ligne, il faut comprendre le cout de l''irritant metier. Le meilleur outil a vendre n''est pas le plus complexe, c''est celui qui supprime une perte de temps visible pour la PME.',
      true,
      1
    ),
    (
      'outils-pme-glpi',
      'support-glpi-pdf',
      'Guide support et GLPI',
      'Un PDF pour cadrer une offre autour du support, du ticketing et des processus simples.',
      'pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      2
    ),
    (
      'outils-pme-glpi',
      'ressources-audit',
      'Pack d''audit interne',
      'Ressources telechargeables pour preparer un mini-audit support chez un client.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'outils-pme-glpi',
      'video-introduction',
      'Video explicative : transformer un irritant PME en outil',
      'Une capsule pour voir comment partir d''un besoin support ou GLPI et le traduire en mission facturable.',
      'video',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      null,
      true,
      4
    ),
    (
      'outils-pme-glpi',
      'integration-avancee',
      'Integrations avancees et automatisations',
      'Module avance bientot disponible avec automatisations et cas support.',
      'coming_soon',
      null,
      null,
      true,
      5
    ),
    (
      'applications-mobiles-rentables',
      'cadrer-un-mvp-mobile',
      'Cadrer un MVP mobile monnayable',
      'Comment reduire l''idee a un produit simple, testable et coherent cote business.',
      'text',
      null,
      'Le bon MVP mobile n''essaie pas de tout faire. Il doit rendre un service precis, etre comprehensible en quelques secondes et proposer une logique de monnayage credible des le depart.',
      true,
      1
    ),
    (
      'applications-mobiles-rentables',
      'roadmap-produit-pdf',
      'Roadmap produit PDF',
      'Une feuille de route simple pour passer de l''idee au prototype monnayable.',
      'pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      2
    ),
    (
      'applications-mobiles-rentables',
      'modele-economique',
      'Pack modele economique',
      'Une ressource pour comparer abonnement, one-shot, upsell et offres hybrides.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'applications-mobiles-rentables',
      'video-introduction',
      'Video explicative : cadrer une application mobile rentable',
      'Une capsule pour comprendre le type de MVP vise, la monetisation et le niveau de simplicite recherche.',
      'video',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      null,
      true,
      4
    ),
    (
      'applications-mobiles-rentables',
      'retours-utilisateurs',
      'Boucle feedback et analytics mobile',
      'Module bientot disponible sur instrumentation et iterations produit.',
      'coming_soon',
      null,
      null,
      true,
      5
    )
) as m(product_slug, slug, title, description, content_type, content_url, content_body, is_published, sort_order)
  on p.slug = m.product_slug
on conflict (product_id, slug) do update
set
  title = excluded.title,
  description = excluded.description,
  content_type = excluded.content_type,
  content_url = excluded.content_url,
  content_body = excluded.content_body,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order;

update public.purchases
set product_id = products.id
from public.products
where purchases.product_id is null
  and products.slug = 'freelance-it-30-jours';
