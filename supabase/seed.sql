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
    '/visuals/formations/freelance-it-30-jours-cover.svg',
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
    '/visuals/formations/landing-pages-rentables-cover.svg',
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
    '/visuals/formations/sites-web-clients-cover.svg',
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
    '/visuals/formations/outils-pme-glpi-cover.svg',
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
    '/visuals/formations/applications-mobiles-rentables-cover.svg',
    true,
    false
  ),
  (
    'glpi-support-pme',
    'Déployer GLPI et structurer un support interne pour PME',
    'Installer un support propre, simple à vendre et utile dès la première semaine',
    'Apprendre à cadrer, déployer et faire adopter GLPI dans une PME sans transformer le projet en usine à gaz.',
    'Cette formation te montre comment transformer un besoin flou de support interne en dispositif clair : tickets, catégories, SLA simples, base de connaissances, automatisations utiles et reporting compréhensible par le dirigeant.',
    6500,
    'eur',
    null,
    '/visuals/formations/glpi-support-pme-cover.svg',
    true,
    false
  ),
  (
    'maintenance-informatique-pme',
    'Vendre et livrer une offre de maintenance informatique pour PME',
    'Forfaits, routines, reporting et rétention sans improviser',
    'Apprendre à vendre une maintenance claire à des TPE/PME et à la livrer de manière répétable.',
    'Le programme structure une vraie offre de maintenance : promesse commerciale, périmètre, onboarding, visites préventives, reporting, relances et renouvellement. L''objectif est de créer un revenu récurrent propre et défendable.',
    5800,
    'eur',
    null,
    '/visuals/formations/maintenance-informatique-pme-cover.svg',
    true,
    false
  ),
  (
    'apps-metier-supabase',
    'Créer des applications métier simples avec Supabase',
    'Des apps utiles, livrables vite et faciles à maintenir',
    'Apprendre à cadrer et produire une application métier simple avec base de données, auth, rôles et livraison propre.',
    'Cette formation s''adresse aux profils qui veulent livrer des apps métier crédibles sans partir sur une architecture trop lourde. Tu y trouves le cadrage, le schéma de données, l''authentification, les rôles, le back-office et la logique de mise en production.',
    6800,
    'eur',
    null,
    '/visuals/formations/apps-metier-supabase-cover.svg',
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
      null,
      $$## Wireframe de cadrage client

Le wireframe ne sert pas a impressionner. Il sert a **fixer la structure** avant d'ouvrir Figma ou ton builder.

### Ce que ton wireframe doit montrer

- le titre principal
- la preuve ou reurance immediate
- l'offre et ses benefices
- le CTA principal
- les blocs secondaires utiles

### Ce qu'il ne faut pas faire

- multiplier les variantes trop tot
- passer du temps sur le design final
- remplir la page avec du lorem ipsum inutile

### Validation client

Le client doit pouvoir valider :
- la promesse
- l'ordre des blocs
- les informations obligatoires
- la prochaine action attendue

> Si le wireframe est valide, la production devient beaucoup plus rapide et les retours sont mieux cadres.$$,
      true,
      2
    ),
    (
      'landing-pages-rentables',
      'checklist-livraison',
      'Checklist de livraison',
      'Une ressource prete a l''emploi pour securiser la livraison et les retours client.',
      'resource',
      null,
      $$## Checklist de livraison d'une landing page

Avant d'envoyer une page au client, verifie :

- hero clair et comprehensible
- CTA visible en haut
- preuves bien placees
- formulaire teste
- affichage mobile propre
- meta title et meta description renseignes

### A remettre avec la livraison

- lien live
- recapitulatif des blocs livres
- points a tester sur 7 jours
- recommandations d'optimisation

### Regle simple

Une page livree doit etre comprenable par le client, actionnable par le prospect, et modifiable sans tout casser.$$,
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
      $$## Comment utiliser la video

La video doit t'aider a voir :

- comment la promesse est formulee
- ou la preuve doit arriver
- comment le CTA est repete
- quels blocs sont accessoires

### Juste apres le visionnage

- reprends une page deja faite
- coupe 20 % du texte inutile
- renforce un seul CTA
- ajoute une preuve concrete proche du hero$$,
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
      null,
      $$## Brief client pret a envoyer

Le brief doit clarifier 6 choses :

- l'objectif principal du site
- les pages indispensables
- la cible prioritaire
- le ton souhaite
- les contenus deja disponibles
- la date de livraison attendue

### Assets a demander

- logo
- photos
- textes existants
- mentions legales
- acces domaine / hebergement si existants

### Limites a poser

- nombre de pages
- nombre d'allers-retours
- contenu fourni par qui
- maintenance incluse ou non$$,
      true,
      2
    ),
    (
      'sites-web-clients',
      'stack-template',
      'Stack et template de demarrage',
      'Une ressource de demarrage pour standardiser les projets web vendus.',
      'resource',
      null,
      $$## Stack et template de demarrage

Pour standardiser un site client, prepare toujours :

- une base de layout
- une structure de sections reutilisable
- une checklist SEO minimale
- une checklist responsive
- une structure de livraison

### Process de recette

- verifier navigation
- verifier formulaires
- verifier affichage mobile
- verifier performances de base
- verifier contenus legaux

### Maintenance a proposer

- mises a jour
- petits ajustements
- sauvegarde / reprise
- ajout de contenus simples$$,
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
      $$## Ce que la video doit appuyer

La video renforce les points du texte :

- le bon niveau de simplicite
- les pages vraiment utiles
- la limite entre site initial et options
- la logique de livraison propre

### Exercice

Reprends un ancien projet et note :
- ce qui aurait pu etre retire
- ce qui devait rester en option
- ce qui aurait du etre valide plus tot$$,
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
      null,
      $$## Guide de cadrage support et GLPI

Avant de deployer un outil, clarifie :

- qui ouvre les demandes
- quels incidents reviennent
- qui traite
- quels delais sont realistes
- quel reporting le dirigeant attend

### Perimetre de depart recommande

- categories limitees
- priorites simples
- 1 tableau de bord
- 1 base de connaissances
- 1 responsable par sujet

### Ce que tu vends

Tu vends de la clarte, de la tracabilite et moins de temps perdu. Pas seulement un logiciel.$$,
      true,
      2
    ),
    (
      'outils-pme-glpi',
      'ressources-audit',
      'Pack d''audit interne',
      'Ressources telechargeables pour preparer un mini-audit support chez un client.',
      'resource',
      null,
      $$## Pack d'audit support interne

Ce pack doit couvrir :

- categories de tickets de depart
- checklist d'audit support
- modele de compte-rendu
- structure de base de connaissances
- reporting mensuel type

### Objectif

Transformer un besoin flou en mission claire, puis en process repetable.

> Un bon audit support montre ou l'entreprise perd du temps et ce qui peut etre resolu vite.$$,
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
      $$## Ce que la video doit renforcer

Observe :

- comment on reformule le probleme client
- quel flux minimal suffit
- comment la valeur est expliquee
- pourquoi la simplicite vend mieux qu'un gros projet

### A faire ensuite

reprends 3 demandes client et reformule-les en :
- probleme
- utilisateur
- action
- resultat$$,
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
      null,
      $$## Roadmap produit pour MVP mobile

La roadmap initiale doit tenir sur peu d'etapes :

- probleme cible
- flux principal
- premier ecran critique
- mode de monetisation
- test utilisateur
- mise en ligne minimale

### Ce que tu repousses

- options rares
- analytics avancees
- personnalisation trop fine
- fonctions secondaires

### Regle produit

Si la roadmap depasse deja 2 ou 3 lots avant lancement, tu es probablement sorti du MVP.$$,
      true,
      2
    ),
    (
      'applications-mobiles-rentables',
      'modele-economique',
      'Pack modele economique',
      'Une ressource pour comparer abonnement, one-shot, upsell et offres hybrides.',
      'resource',
      null,
      $$## Comparer les modeles economiques

Les 4 modeles les plus simples a evaluer :

- abonnement
- achat one-shot
- freemium
- licence B2B

### Questions a se poser

- quand la valeur est-elle percue ?
- a quelle frequence l'utilisateur revient-il ?
- qui paie vraiment ?
- quel prix peut etre annonce des la pre-vente ?

### Test minimal

- une page de presentation
- une promesse claire
- un prix annonce
- quelques entretiens cibles
- une mesure d'interet reelle$$,
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
      $$## Ce que la video doit t'aider a arbitrer

La video appuie 4 decisions :

- quelles fonctions garder
- lesquelles repousser
- comment la monetisation influence le produit
- quel niveau de finition suffit pour lancer

### Exercice rapide

ecris ton application en une phrase :
- pour qui
- pour quoi
- contre quel resultat
- avec quel mode de paiement$$,
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
    ),
    (
      'glpi-support-pme',
      'cadrer-support-interne',
      'Cadrer le besoin support avant d''ouvrir GLPI',
      'Identifier les vrais irritants, choisir le bon périmètre, éviter le projet trop large et vendre un premier cadrage simple.',
      'text',
      null,
      $$## Cadrer un projet support sans partir trop large

Avant de parler de GLPI, il faut clarifier **ce qu'on veut résoudre** : demandes IT, demandes internes, suivi matériel, validation managériale ou simple traçabilité.

### Les 4 questions à poser au client

- **Qui ouvre les demandes aujourd'hui ?** salariés, managers, support externe
- **Quels sujets reviennent le plus souvent ?** poste, accès, mails, imprimantes, achats, arrivée/départ collaborateur
- **Qui traite ?** une seule personne, un prestataire, plusieurs niveaux
- **Quel niveau de suivi est attendu ?** simple historique ou vrai reporting mensuel

> Un bon projet GLPI commence rarement par “on veut un outil de ticketing”. Il commence par “on perd du temps et personne ne sait qui fait quoi”.

### Périmètre recommandé pour une PME de 5 à 50 personnes

- portail de demande unique
- 5 à 8 catégories maximum
- 2 niveaux de priorité
- 1 SLA simple
- 1 tableau de bord dirigeant

### Ce que tu vends vraiment

Tu ne vends pas GLPI. Tu vends :
- moins de messages WhatsApp ou appels perdus
- une priorisation visible
- un historique des demandes
- une base pour professionnaliser le support$$,
      true,
      1
    ),
    (
      'glpi-support-pme',
      'deploiement-glpi-propre',
      'Déployer GLPI proprement et le faire adopter',
      'Installation, catégories, profils, notifications et bonnes pratiques pour que l''outil soit utilisé dès la mise en ligne.',
      'text',
      null,
      $$## Déployer GLPI sans décourager les équipes

Le premier enjeu n'est pas technique. C'est l'adoption.

### Configuration minimale qui fonctionne

- **Profils** : demandeur, technicien, manager
- **Catégories** : matériel, comptes, réseau, applications, achats, onboarding
- **Priorités** : normale et urgente suffisent au départ
- **Notifications** : confirmation d'ouverture + résolution
- **Templates** : titre, description, capture, impact métier

### Ce qu'il ne faut pas faire au démarrage

- ouvrir 30 catégories
- créer des workflows de validation trop tôt
- tout connecter à l'AD, l'inventaire et les plugins dès la semaine 1
- promettre un “ITSM complet” à une PME de 12 postes

### Plan de lancement en 7 jours

- Jour 1 : cadrage et choix du périmètre
- Jour 2 : installation et branding basique
- Jour 3 : catégories, profils, droits
- Jour 4 : formulaires et notifications
- Jour 5 : test avec 3 utilisateurs pilotes
- Jour 6 : corrections et base de connaissances
- Jour 7 : mise en service + mini formation équipe$$,
      true,
      2
    ),
    (
      'glpi-support-pme',
      'sla-base-connaissance',
      'SLA simples, base de connaissances et reporting dirigeant',
      'Mettre en place des délais crédibles, une base de réponses utiles et un reporting qui parle au patron.',
      'text',
      null,
      $$## Structurer le support après la mise en ligne

Une fois GLPI installé, la vraie valeur vient du process.

### SLA simples que tu peux assumer

- **Urgent** : prise en charge sous 2h ouvrées
- **Normal** : prise en charge sous 8h ouvrées
- **Faible** : traitement sous 2 jours ouvrés

### Base de connaissances utile

Crée d'abord 6 à 10 articles maximum :
- réinitialiser son mot de passe
- ajouter une imprimante
- accéder au Wi-Fi invité
- configurer Outlook ou Microsoft 365
- demander un nouveau matériel
- procédure d'arrivée / départ collaborateur

### Reporting mensuel lisible

Le dirigeant veut 3 choses :
- nombre de tickets ouverts / fermés
- sujets les plus fréquents
- temps moyen de résolution

> Si ton reporting tient sur une page et montre une tendance claire, tu augmentes fortement les chances de renouvellement.$$,
      true,
      3
    ),
    (
      'glpi-support-pme',
      'checklist-lancement-glpi',
      'Checklist de lancement et modèle de gouvernance',
      'Une ressource réutilisable pour lancer GLPI, animer les rôles et cadrer les points de suivi avec le client.',
      'resource',
      null,
      $$## Ce que contient la ressource

- checklist de lancement GLPI en 30 points
- modèle de réunion de cadrage support
- structure de com interne pour annoncer l'outil
- modèle de compte-rendu mensuel dirigeant

Utilise cette ressource comme base de delivery pour standardiser ton offre GLPI.$$,
      true,
      4
    ),
    (
      'glpi-support-pme',
      'automatisations-glpi-a-venir',
      'Automatisations, inventaire et extensions avancées',
      'La suite du programme couvrira l''inventaire, les plugins utiles, les workflows plus poussés et les connexions annexes.',
      'coming_soon',
      null,
      null,
      true,
      5
    ),
    (
      'maintenance-informatique-pme',
      'offre-maintenance-qui-se-vend',
      'Construire une offre de maintenance qui se vend',
      'Positionner ton forfait, éviter le support illimité mal cadré et rendre la promesse simple pour une PME.',
      'text',
      null,
      $$## Construire une offre de maintenance lisible

Une offre de maintenance doit rassurer sans devenir une promesse impossible à tenir.

### Ce que ton forfait peut inclure au départ

- support à distance sur horaires ouvrés
- 1 visite préventive mensuelle ou trimestrielle
- supervision légère ou checklist de contrôle
- sauvegarde et sécurité de base
- reporting synthétique

### Ce qu'il faut exclure noir sur blanc

- développement spécifique
- interventions hors horaires sans majoration
- remplacement matériel inclus
- assistance illimitée sur tout et n'importe quoi

### Formule simple qui se vend

**“Je maintiens vos postes, vos accès et vos sauvegardes avec un point régulier, un support réactif et un historique clair des interventions.”**$$,
      true,
      1
    ),
    (
      'maintenance-informatique-pme',
      'onboarding-client-maintenance',
      'Onboarding, checklists et première visite',
      'Structurer l''entrée du client, sécuriser les accès et démarrer la maintenance sans dépendre de ta mémoire.',
      'text',
      null,
      $$## Réussir l'onboarding d'un nouveau client maintenance

Le premier mois décide souvent si le contrat sera reconduit.

### À récupérer dès le départ

- liste des postes et utilisateurs
- accès routeur, NAS, Microsoft 365, antivirus, sauvegardes
- historique des incidents connus
- personnes à contacter selon les sujets

### Première visite type

- état des postes critiques
- vérification sauvegarde
- audit comptes admin et mots de passe partagés
- antivirus / EDR en place
- documentation minimale

### Livrable attendu

Un document court avec :
- les priorités immédiates
- les risques visibles
- ce qui a été fait
- la suite recommandée sur 30 jours$$,
      true,
      2
    ),
    (
      'maintenance-informatique-pme',
      'reporting-renouvellement',
      'Reporting mensuel, relances et renouvellement',
      'Montrer la valeur tous les mois, préparer les relances et transformer la maintenance en revenu récurrent durable.',
      'text',
      null,
      $$## Garder le client grâce à un reporting utile

Un client renouvelle quand il comprend ce que tu fais, même quand rien ne casse.

### Ton reporting mensuel doit contenir

- interventions réalisées
- incidents évités ou sécurisés
- points de vigilance du mois suivant
- recommandations simples avec coût estimé

### Les 3 relances qui marchent

- relance devis d'amélioration après 5 jours
- point trimestriel de prévention
- proposition de montée de forfait quand la volumétrie augmente

> La maintenance ne se défend pas par la technique. Elle se défend par la tranquillité qu'elle apporte au client.$$,
      true,
      3
    ),
    (
      'maintenance-informatique-pme',
      'pack-contrat-maintenance',
      'Pack contrat, reporting et compte-rendu de visite',
      'Des modèles réutilisables pour cadrer le forfait, documenter les interventions et préparer les renouvellements.',
      'resource',
      null,
      $$## Contenu du pack maintenance

- trame de contrat ou lettre de mission
- modèle de reporting mensuel
- checklist de visite préventive
- modèle de compte-rendu d'intervention
- structure de proposition d'évolution

Le but est d'avoir une base de delivery réutilisable sur chaque client.$$,
      true,
      4
    ),
    (
      'maintenance-informatique-pme',
      'cas-clients-maintenance-a-venir',
      'Cas clients, upsell et gestion des urgences',
      'Ce module ajoutera plusieurs cas réels de maintenance, de rétention et de montée en gamme chez des PME.',
      'coming_soon',
      null,
      null,
      true,
      5
    ),
    (
      'apps-metier-supabase',
      'cadrer-application-metier',
      'Cadrer une application métier avant de coder',
      'Choisir le bon périmètre, le bon utilisateur cible et le bon MVP pour éviter les projets trop gros ou trop flous.',
      'text',
      null,
      $$## Cadrer une application métier qui reste livrable

Une app métier rentable commence par un flux clair, pas par 25 écrans.

### Les questions à poser

- qui utilise l'outil chaque semaine ?
- quelle action doit être plus rapide ou mieux tracée ?
- quelle donnée est centrale ?
- quel résultat visible le client attend-il en 30 jours ?

### Les MVP qui se vendent bien

- suivi de demandes ou interventions
- app de collecte terrain
- back-office simple avec rôles
- portail client avec historique et documents

> Si le client ne peut pas résumer l'app en une phrase, le cadrage n'est pas fini.$$,
      true,
      1
    ),
    (
      'apps-metier-supabase',
      'schema-donnees-supabase',
      'Schéma de données, rôles et sécurité de base',
      'Poser une base Supabase propre: tables, relations, auth, rôles et règles simples de sécurité.',
      'text',
      null,
      $$## Poser une base Supabase propre

Supabase te fait gagner du temps si la structure est simple et lisible.

### Base recommandée pour une app métier

- table `profiles`
- table métier principale (`tickets`, `missions`, `reports`, `clients`...)
- table `attachments` ou `notes` si nécessaire
- statuts limités et normalisés
- rôles simples: admin, opérateur, client

### Règles utiles

- l'utilisateur ne voit que ses données
- l'admin voit tout
- le client externe ne modifie que ce qui lui appartient
- les pièces jointes sont isolées par dossier logique

### Ce que tu évites

- 15 tables dès le départ
- rôles trop fins
- logique métier critique uniquement côté front$$,
      true,
      2
    ),
    (
      'apps-metier-supabase',
      'ux-flux-et-delivery',
      'Flux UX, back-office et livraison au client',
      'Concevoir les écrans utiles, le back-office minimum et une livraison rassurante pour un client métier.',
      'text',
      null,
      $$## Construire un flux produit simple

Une app métier doit être comprise vite par quelqu'un qui n'est pas technique.

### Les écrans qui suffisent souvent au départ

- connexion
- tableau de bord
- liste filtrable
- fiche détail
- formulaire de création / mise à jour
- espace documents ou historique

### Livraison propre

- environnement de prod séparé
- accès admin remis au client
- mini formation utilisateur
- documentation de reprise
- plan d'évolution par lot

> Une bonne livraison ne dépend pas d'un long manuel. Elle dépend d'une interface claire et d'un passage de relais propre.$$,
      true,
      3
    ),
    (
      'apps-metier-supabase',
      'starter-kit-app-metier',
      'Starter kit Supabase, rôles et déploiement',
      'Une ressource pour démarrer plus vite avec structure de tables, rôles, vues clés et checklist de mise en ligne.',
      'resource',
      null,
      $$## Ce que contient le starter kit

- structure de tables de départ
- checklist auth / rôles / permissions
- modèle de back-office minimal
- checklist de mise en production
- logique de reprise et maintenance

Utilise ce starter kit pour standardiser tes premières apps métier sans repartir de zéro.$$,
      true,
      4
    ),
    (
      'apps-metier-supabase',
      'facturation-evolution-a-venir',
      'Facturation, maintenance et feuille de route produit',
      'Le module final couvrira la tarification projet, la maintenance et la gestion des évolutions après livraison.',
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
