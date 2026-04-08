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
    'Devenir technicien informatique freelance sans diplome en 30 jours',
    'L''offre principale pour structurer une activite IT rentable et vendable rapidement.',
    'Apprendre a lancer une activite freelance IT rentable sans diplome, avec methode, positionnement, acquisition client et livrables simples.',
    'Une formation orientee terrain pour apprendre a vendre des interventions IT utiles, formuler une offre claire, trouver des prospects et livrer proprement. Le parcours melange strategie, scripts, PDF operationnels et modules publies progressivement.',
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
      'Definir une offre IT simple et vendable',
      'Le cadre pour transformer une competence IT en offre claire et comprehensible.',
      'text',
      null,
      'Commence par une offre simple : un probleme, un livrable, un delai. Dans cette formation, on privilegie les offres faciles a expliquer, faciles a vendre et faciles a livrer. Le but n''est pas de tout faire, mais de devenir immediatement lisible pour un client.',
      true,
      1
    ),
    (
      'freelance-it-30-jours',
      'plan-30-jours-pdf',
      'Plan 30 jours PDF',
      'Un document de route pour lancer ton activite avec un planning clair.',
      'pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      2
    ),
    (
      'freelance-it-30-jours',
      'scripts-prospection',
      'Scripts de prospection et trames email',
      'Des ressources pretes a adapter pour contacter les premiers prospects.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'freelance-it-30-jours',
      'video-introduction',
      'Video explicative : lancer une offre freelance IT',
      'Une capsule d''introduction pour comprendre le positionnement, les clients cibles et la logique de vente.',
      'video',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      null,
      true,
      4
    ),
    (
      'freelance-it-30-jours',
      'cas-clients-a-venir',
      'Etudes de cas freelance',
      'Des cas clients detailles seront ajoutes pour montrer la livraison complete.',
      'coming_soon',
      null,
      null,
      true,
      5
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
