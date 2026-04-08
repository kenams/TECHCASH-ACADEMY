# TechCash Academy

Plateforme de vente et d'acces membre pour plusieurs formations digitales, construite avec `Next.js App Router`, `TypeScript`, `Supabase`, `Stripe` et `Vercel`.

## Objectif produit

Le site vend plusieurs formations digitales autour de competences monetisables :

- `freelance-it-30-jours`
- `landing-pages-rentables`
- `sites-web-clients`
- `outils-pme-glpi`
- `applications-mobiles-rentables`

Le tunnel actuel est :

1. landing page
2. catalogue `/formations`
3. page detail `/formations/[slug]`
4. inscription / connexion
5. checkout Stripe dynamique par produit
6. webhook Stripe
7. dashboard membre
8. acces prive par produit achete

## Stack

- Next.js 15.5.14 App Router
- React 19
- TypeScript strict
- Supabase Auth + Database
- Stripe Checkout + Webhook
- Tailwind / CSS maison
- Vercel

## Architecture principale

### Pages publiques

- `/`
- `/formations`
- `/formations/[slug]`
- `/login`
- `/register`
- `/checkout?product=<slug>`
- `/success`
- `/cancel`

### Pages membres

- `/dashboard`
- `/dashboard/mes-formations`
- `/dashboard/formations/[slug]`

### Routes API

- `/api/auth/register`
- `/api/auth/sync-profile`
- `/api/checkout-session`
- `/api/stripe-webhook`

## Modele de donnees

### `users`

Profil utilisateur synchronise depuis Supabase Auth.

Champs clefs :

- `id`
- `email`
- `is_premium`
- `stripe_customer_id`

### `products`

Catalogue commercial.

Champs clefs :

- `id`
- `slug`
- `title`
- `subtitle`
- `short_description`
- `long_description`
- `price_cents`
- `currency`
- `stripe_price_id`
- `thumbnail_url`
- `is_active`
- `is_featured`

### `product_modules`

Contenu d'une formation.

Champs clefs :

- `product_id`
- `slug`
- `title`
- `description`
- `content_type`
- `content_url`
- `content_body`
- `is_published`
- `sort_order`

Types supportes :

- `text`
- `pdf`
- `resource`
- `video`
- `coming_soon`

### `purchases`

Achats Stripe par produit.

Champs clefs :

- `user_id`
- `product_id`
- `product_name`
- `amount_total`
- `currency`
- `status`
- `stripe_session_id`
- `stripe_payment_intent_id`

## Variables d'environnement

Configurer `.env.local` ou les variables Vercel :

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_EBOOK_URL`

## Base Supabase

Le projet attend maintenant les fichiers suivants :

- [supabase/schema.sql](./supabase/schema.sql)
- [supabase/migrations/001_multi_product_catalog.sql](./supabase/migrations/001_multi_product_catalog.sql)
- [supabase/seed.sql](./supabase/seed.sql)

### Ordre recommande

1. executer `supabase/migrations/001_multi_product_catalog.sql`
2. executer `supabase/seed.sql`

## Stripe

Le checkout est maintenant multi-produits.

### Logique

- le client envoie seulement un `slug` ou un `productId`
- le serveur relit le produit en base
- le prix n'est jamais accepte depuis le client
- `metadata` Stripe contient :
  - `user_id`
  - `product_id`
  - `product_slug`
  - `product_name`

### Webhook

Le webhook :

- verifie la signature Stripe
- recupere le produit depuis la metadata
- cree l'achat en base
- evite les doublons par `stripe_session_id`
- garde la possibilite d'un acces premium global via `users.is_premium`

### Recommandation production

Pour chaque produit, cree un `Price` Stripe et remplis `products.stripe_price_id`.

Le code gere un fallback `price_data`, mais des `Price` persistants sont preferables en production.

## Lancement local

```bash
npm install
npm run build
npm run dev
```

## Deploiement

Le projet est deja lie a Vercel.

Deploy production :

```bash
vercel deploy --prod --yes
```

## Checklist de verification

### Public

1. ouvrir `/`
2. verifier le hero et le catalogue
3. ouvrir `/formations`
4. ouvrir `/formations/[slug]`

### Auth

1. creer un compte sur `/register`
2. se connecter sur `/login`
3. verifier l'acces a `/dashboard`

### Checkout

1. aller sur `/checkout?product=freelance-it-30-jours`
2. verifier le bon titre / prix
3. cliquer sur Stripe Checkout
4. finaliser le paiement
5. verifier la page `/success`

### Dashboard

1. ouvrir `/dashboard`
2. verifier `Mes formations`
3. ouvrir `/dashboard/formations/[slug]`
4. verifier le rendu des modules `text`, `pdf`, `resource`, `video`, `coming_soon`

## Notes importantes

- le systeme gere plusieurs achats par utilisateur
- l'acces global `is_premium` reste possible si vous voulez forcer un compte
- l'acces membre doit surtout etre verifie produit par produit
- les routes serveur ne font jamais confiance au prix envoye par le client
- l'UI est sobre, modulaire et deja prete pour ajouter d'autres produits
