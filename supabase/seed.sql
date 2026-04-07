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
    'L''offre principale pour structurer une activité IT rentable et vendable rapidement.',
    'Apprendre à lancer une activité freelance IT rentable sans diplôme, avec méthode, positionnement, acquisition client et livrables simples.',
    'Une formation orientée terrain pour apprendre à vendre des interventions IT utiles, formuler une offre claire, trouver des prospects et livrer proprement. Le parcours mélange stratégie, scripts, PDF opérationnels et modules progressivement publiés.',
    5900,
    'eur',
    null,
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    true,
    true
  ),
  (
    'landing-pages-rentables',
    'Créer des landing pages qui vendent',
    'Une formation pour designer, vendre et livrer des landing pages efficaces à des clients.',
    'Apprendre à concevoir, vendre et livrer des landing pages professionnelles pour des clients.',
    'Ce programme te montre comment cadrer le besoin, structurer une page de conversion, vendre une prestation simple et éviter les livraisons interminables. Idéal pour proposer une offre web rapide à forte valeur perçue.',
    4900,
    'eur',
    null,
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    true,
    false
  ),
  (
    'sites-web-clients',
    'Créer des sites web professionnels pour ses clients',
    'Le cadre pour vendre des sites sobres, utiles et livrables rapidement.',
    'Apprendre à créer des sites web modernes, simples à vendre et à livrer rapidement.',
    'Tu y trouveras la logique commerciale, les process de cadrage, la structure de projet et les ressources nécessaires pour transformer une prestation site web en offre standardisée et rentable.',
    6900,
    'eur',
    null,
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    true,
    false
  ),
  (
    'outils-pme-glpi',
    'Créer des outils métier pour PME, support et GLPI',
    'Une offre plus technique pour produire des outils utiles et monnayables.',
    'Apprendre à créer des outils concrets pour PME, support informatique et besoins métier internes, comme un outil support GLPI.',
    'Cette formation aide à repérer les besoins métier répétitifs, cadrer un mini-outil interne, vendre sa valeur à une PME et articuler support, automatisation et maintenance simple autour de GLPI et d''usages métier proches.',
    7900,
    'eur',
    null,
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    true,
    false
  ),
  (
    'applications-mobiles-rentables',
    'Créer des applications mobiles simples et rentables',
    'Concevoir une app utile, simple et monétisable sans partir dans une usine à gaz.',
    'Apprendre à concevoir et structurer une application mobile monétisable.',
    'Un programme pensé pour cadrer une idée, définir un MVP mobile crédible, choisir un modèle économique simple et poser une base produit propre, sans se perdre dans une complexité inutile dès le départ.',
    8900,
    'eur',
    null,
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
select p.id, m.slug, m.title, m.description, m.content_type::public.product_content_type, m.content_url, m.content_body, m.is_published, m.sort_order
from public.products p
join (
  values
    (
      'freelance-it-30-jours',
      'positionnement-offre',
      'Définir une offre IT simple et vendable',
      'Le cadre pour transformer une compétence IT en offre claire et compréhensible par un prospect.',
      'text',
      null,
      'Commence par une offre simple : un problème, un livrable, un délai. Dans cette formation, on privilégie les offres faciles à expliquer, faciles à vendre et faciles à livrer. Le but n''est pas de tout faire, mais de devenir immédiatement lisible pour un client.' ,
      true,
      1
    ),
    (
      'freelance-it-30-jours',
      'plan-30-jours-pdf',
      'Plan 30 jours PDF',
      'Un document de route pour lancer ton activité avec un planning clair.',
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
      'Des ressources prêtes à adapter pour contacter les premiers prospects.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'freelance-it-30-jours',
      'cas-clients-a-venir',
      'Études de cas freelance',
      'Des cas clients détaillés seront ajoutés pour montrer la livraison complète.',
      'coming_soon',
      null,
      null,
      true,
      4
    ),
    (
      'landing-pages-rentables',
      'structure-conversion',
      'Structurer une landing page qui convertit',
      'Une méthode sobre pour construire un message clair, une promesse crédible et un CTA fort.',
      'text',
      null,
      'Une landing page vend parce qu''elle clarifie. Le contenu doit parler du problème, de la transformation et de la prochaine action. Dans ce module, on formalise les blocs indispensables et ce qu''il faut supprimer pour garder une page directe.' ,
      true,
      1
    ),
    (
      'landing-pages-rentables',
      'wireframe-client-pdf',
      'Wireframe client PDF',
      'Un support téléchargeable pour cadrer une prestation sans partir dans des maquettes lourdes.',
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
      'Une ressource prête à l’emploi pour sécuriser la livraison et les retours client.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'landing-pages-rentables',
      'atelier-copywriting',
      'Atelier copywriting client',
      'Atelier avancé ajouté prochainement avec exemples avant / après.',
      'coming_soon',
      null,
      null,
      true,
      4
    ),
    (
      'sites-web-clients',
      'cadrage-projet',
      'Cadrer un site client en 30 minutes',
      'Une méthode pour obtenir le bon périmètre sans se perdre dans un cahier des charges flou.',
      'text',
      null,
      'Le cadrage d''un site client commence par une promesse claire, 3 à 5 sections utiles et une date de livraison réaliste. Le but de cette formation est de rendre les projets web plus simples à vendre et plus propres à livrer.' ,
      true,
      1
    ),
    (
      'sites-web-clients',
      'brief-client-pdf',
      'Brief client prêt à envoyer',
      'Un document standard pour éviter les oublis dès la prise de besoin.',
      'pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      2
    ),
    (
      'sites-web-clients',
      'stack-template',
      'Stack et template de démarrage',
      'Une ressource de démarrage pour standardiser les projets web vendus.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'sites-web-clients',
      'video-debrief',
      'Débrief de projet complet',
      'Retour vidéo détaillé ajouté prochainement sur un cas réel de livraison.',
      'coming_soon',
      null,
      null,
      true,
      4
    ),
    (
      'outils-pme-glpi',
      'audit-besoins-metier',
      'Repérer un besoin métier monnayable',
      'Le bon angle pour transformer un irritant métier en mini-outil vendable.',
      'text',
      null,
      'Avant d''écrire la moindre ligne, il faut comprendre le coût de l''irritant métier. Le meilleur outil à vendre n''est pas le plus complexe, c''est celui qui supprime une perte de temps visible pour la PME.' ,
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
      'Pack d’audit interne',
      'Ressources téléchargeables pour préparer un mini-audit support chez un client.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'outils-pme-glpi',
      'integration-avancee',
      'Intégrations avancées et automatisations',
      'Module avancé bientôt disponible avec automatisations et cas support.',
      'coming_soon',
      null,
      null,
      true,
      4
    ),
    (
      'applications-mobiles-rentables',
      'cadrer-un-mvp-mobile',
      'Cadrer un MVP mobile monétisable',
      'Comment réduire l’idée à un produit simple, testable et cohérent côté business.',
      'text',
      null,
      'Le bon MVP mobile n''essaie pas de tout faire. Il doit rendre un service précis, être compréhensible en quelques secondes et proposer une logique de monétisation crédible dès le départ.' ,
      true,
      1
    ),
    (
      'applications-mobiles-rentables',
      'roadmap-produit-pdf',
      'Roadmap produit PDF',
      'Une feuille de route simple pour passer de l’idée au prototype monétisable.',
      'pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      2
    ),
    (
      'applications-mobiles-rentables',
      'modele-economique',
      'Pack modèle économique',
      'Une ressource pour comparer abonnement, one-shot, upsell et offres hybrides.',
      'resource',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      null,
      true,
      3
    ),
    (
      'applications-mobiles-rentables',
      'retours-utilisateurs',
      'Boucle feedback et analytics mobile',
      'Module bientôt disponible sur instrumentation et itérations produit.',
      'coming_soon',
      null,
      null,
      true,
      4
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
