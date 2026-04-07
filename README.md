# TechCash Academy MVP

Plateforme de vente de formation digitale avec `Next.js App Router`, `Supabase`, `Stripe` et deploiement `Vercel`.

## Ce qui a ete finalise

- Auth Supabase avec session SSR
- Protection des routes `dashboard` et `checkout` via middleware
- Synchronisation serveur du profil utilisateur
- Checkout Stripe securise cote serveur
- Webhook Stripe avec activation `is_premium = true`
- Dashboard branche sur de vraies donnees Supabase
- Modules de formation stockes en base
- Gestion d'erreurs globale et logs serveur
- Configuration Tailwind ajoutee pour une UI plus propre

## Variables d'environnement

Renseigne [`.env.local`](/c:/Users/KEITKE/Documents/TechCash%20Academy/.env.local) ou copie le contenu de [`.env.example`](/c:/Users/KEITKE/Documents/TechCash%20Academy/.env.example).

Variables requises :

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_EBOOK_URL`

## Base Supabase

Execute le script SQL de [schema.sql](/c:/Users/KEITKE/Documents/TechCash%20Academy/supabase/schema.sql) dans l'editeur SQL Supabase.

Ce script :

- ajoute `is_premium` et `stripe_customer_id` aux utilisateurs
- ajoute les colonnes Stripe aux achats
- cree la table `modules`
- seed les 6 modules de formation
- active les policies RLS utiles

## Lancement local

1. Installe Node.js 20+.
2. Installe les dependances :

```bash
npm install
```

3. Lance le projet :

```bash
npm run dev
```

## Configuration Stripe

1. Cree un webhook Stripe vers :

```txt
https://ton-domaine.com/api/stripe-webhook
```

2. En local avec Stripe CLI :

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

3. Copie le secret retourne par Stripe CLI dans `STRIPE_WEBHOOK_SECRET`.

## Deploiement Vercel

1. Push le repo sur GitHub.
2. Importe le projet dans Vercel.
3. Ajoute toutes les variables d'environnement suivantes dans Vercel :
   `NEXT_PUBLIC_SITE_URL`
   `NEXT_PUBLIC_SUPABASE_URL`
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   `SUPABASE_SERVICE_ROLE_KEY`
   `STRIPE_SECRET_KEY`
   `STRIPE_WEBHOOK_SECRET`
   `NEXT_PUBLIC_EBOOK_URL`
4. Definis `NEXT_PUBLIC_SITE_URL` avec l'URL Vercel de production.
5. Mets a jour le webhook Stripe avec l'URL de production.
6. Redeploie.

## Test manuel rapide

Objectif : verifier le flow complet en moins de 10 minutes.

1. Ouvre la landing page.
   Verifier : la page charge, les modules s'affichent, le bouton `Acheter maintenant` est visible.
2. Va sur `/dashboard` sans etre connecte.
   Verifier : redirection vers `/login`.
3. Cree un compte sur `/register`.
   Verifier : inscription reussie, puis redirection vers `/checkout` ou `/login` si confirmation email activee.
4. Connecte-toi sur `/login` si necessaire.
   Verifier : pas d'erreur, session active, acces a `/checkout`.
5. Lance le checkout Stripe.
   Verifier : redirection vers Stripe Checkout.
6. Paie avec une carte de test Stripe.
   Verifier : redirection vers `/success`.
7. Controle le webhook Stripe.
   Verifier : l'endpoint `/api/stripe-webhook` recoit bien `checkout.session.completed` ou `checkout.session.async_payment_succeeded`.
8. Verifie Supabase.
   Verifier :
   `public.users.is_premium = true`
   une ligne existe dans `public.purchases`
   `stripe_checkout_session_id` est rempli
9. Recharge `/dashboard`.
   Verifier : acces autorise, email visible, statut premium visible, modules debloques, ebook accessible.
10. Clique sur `Deconnexion`.
   Verifier : retour a l'accueil puis acces bloque a `/dashboard`.

## Validation post-deploiement

1. Ouvrir la landing publique.
   Verifier : chargement sans erreur et modules visibles.
2. Creer un compte de test puis se connecter.
   Verifier : redirection correcte vers `checkout` si compte non premium.
3. Lancer un paiement Stripe test.
   Verifier : redirection vers `success` puis acces au dashboard.
4. Verifier Supabase.
   Verifier : `users.is_premium = true` et une ligne `purchases` existe.
5. Se deconnecter puis se reconnecter.
   Verifier : le statut premium et les modules restent accessibles.

## Incidents frequents et diagnostic rapide

- Dashboard inaccessible
  Verifier : session Supabase presente, ligne `users` existante, `is_premium = true`, ligne `purchases` en `paid`.
- Checkout refuse
  Verifier : utilisateur bien connecte, variables Stripe presentes, pas de ligne `purchases` existante pour ce compte.
- Webhook non recu
  Verifier : URL Stripe correcte, `STRIPE_WEBHOOK_SECRET` correcte, logs Vercel de la route `/api/stripe-webhook`.
- Premium non active
  Verifier : metadata `user_id` dans Stripe Checkout, event `checkout.session.completed` ou `async_payment_succeeded`, insertion dans `purchases`.
- Modules absents
  Verifier : table `modules` seedee, `is_published = true`, policy RLS modules active.
- Variables d'environnement manquantes
  Verifier : toutes les variables de `.env.example` sont definies aussi dans Vercel.

## Checklist de test et verification

1. Inscription utilisateur
2. Connexion utilisateur
3. Redirection vers `checkout` si non premium
4. Paiement Stripe reussi
5. Reception du webhook Stripe
6. Champ `users.is_premium` passe a `true`
7. Creation de la ligne dans `purchases`
8. Acces autorise au dashboard

## Notes

- L'API `checkout-session` ne lit plus l'identite depuis le client.
- Les secrets restent cote serveur.
- Les modules affiches sur la landing et le dashboard viennent de Supabase.
- Les lectures de profil et d'achat passent par la session utilisateur, pas par le `service role`.
- Les modules publics sont lus via la cle anon et une policy RLS dediee.
- Je n'ai pas pu executer `npm install`, `npm run build` ni un test end-to-end ici car `node` et `npm` ne sont pas installes dans cet environnement.
