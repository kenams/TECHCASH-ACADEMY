"use client";

import Link from "next/link";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";

type CheckoutPanelProps = {
  email: string;
  isAuthenticated: boolean;
  invalidRequestedSlug?: string | null;
  productSlug: string;
  productName: string;
  productSubtitle: string;
  productDescription: string;
  productThumbnailUrl: string | null;
  formattedPrice: string;
};

export function CheckoutPanel({
  email,
  isAuthenticated,
  invalidRequestedSlug = null,
  productSlug,
  productName,
  productSubtitle,
  productDescription,
  productThumbnailUrl,
  formattedPrice
}: CheckoutPanelProps) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { session }
      } = await supabase.auth.getSession();

      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {})
        },
        body: JSON.stringify({ product: productSlug })
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error || "Impossible de créer la session Stripe.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      console.error(checkoutError);
      setError("Une erreur inattendue est survenue pendant le paiement.");
      setLoading(false);
    }
  }

  if (invalidRequestedSlug) {
    return (
      <section className="grid gap-8 pb-12 pt-2">
        <GlowCard className="mx-auto grid max-w-3xl gap-5 p-8 text-center" glowColor="indigo">
          <Badge variant="warning" className="justify-self-center">
            Produit introuvable
          </Badge>
          <div className="grid gap-3">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              Aucun checkout disponible pour «&nbsp;{invalidRequestedSlug}&nbsp;»
            </h1>
            <p className="text-base leading-8 text-[var(--muted)]">
              Le lien demandé ne correspond à aucune formation active. Repars du catalogue pour choisir un produit valide.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/formations" className={buttonClasses("primary", "md")}>
              Voir le catalogue
            </Link>
            <Link href="/" className={buttonClasses("secondary", "md")}>
              Retour à l'accueil
            </Link>
          </div>
        </GlowCard>
      </section>
    );
  }

  return (
    <section className="grid gap-8 pb-12 pt-2 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
      <GlowCard className="grid gap-6 p-6 md:p-8" glowColor="indigo">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" className="w-fit">
            Résumé de commande
          </Badge>
          <Badge variant="muted">Accès membre inclus</Badge>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-white/5">
          {productThumbnailUrl ? (
            <img
              src={productThumbnailUrl}
              alt={productName}
              className="h-[260px] w-full object-cover object-center"
            />
          ) : (
            <div className="h-[260px] bg-[linear-gradient(180deg,rgba(7,12,24,0.82),rgba(7,12,24,0.98))]" />
          )}
        </div>

        <div className="grid gap-3">
          <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)]">
            {productName}
          </h1>
          <p className="text-lg text-[#dbeafe]">{productSubtitle}</p>
          <p className="text-base leading-8 text-[var(--muted)]">{productDescription}</p>
        </div>

        <div className="checkout-price-card">
          <p className="text-sm text-[var(--muted)]">Prix</p>
          <div className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            {formattedPrice}
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Paiement unique pour débloquer l’espace membre lié à cette formation.
          </p>
        </div>

        <div className="checkout-summary-grid">
          <div className="offer-highlight-card">
            <h3>Accès immédiat</h3>
            <p>La formation s’ouvre dans ton espace membre juste après confirmation du paiement.</p>
          </div>
          <div className="offer-highlight-card">
            <h3>Formats utiles</h3>
            <p>Textes, PDF, ressources et ajouts futurs selon la feuille de route du produit.</p>
          </div>
          <div className="offer-highlight-card">
            <h3>Parcours propre</h3>
            <p>Le compte, l’achat et la page privée restent reliés sans bricolage ni doublon.</p>
          </div>
        </div>

        <div className="checkout-trust-list">
          <div className="luxury-note">
            <strong>🔒 Paiement 100% sécurisé via Stripe</strong>
            <span>Aucune carte n’est stockée côté application. Le paiement passe uniquement par l’infrastructure Stripe.</span>
          </div>
          <div className="confidence-list">
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Lecture claire</strong>
                <p>Tu achètes une formation précise, avec un prix net et un accès membre dédié.</p>
              </div>
            </div>
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Cadre rassurant</strong>
                <p>Le support reste joignable rapidement si un souci de paiement ou d’accès apparaît.</p>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>

      <GlowCard className="grid h-fit gap-6 p-6 md:p-8" glowColor="emerald">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success" className="w-fit">
            Finaliser mon accès
          </Badge>
          <Badge variant={isAuthenticated ? "primary" : "muted"}>
            {isAuthenticated ? "Compte connecté" : "Connexion requise"}
          </Badge>
        </div>

        <div className="grid gap-3">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            {isAuthenticated ? "Confirmer le paiement" : "Connecte-toi pour continuer"}
          </h2>
          <p className="text-base leading-8 text-[var(--muted)]">
            {isAuthenticated
              ? `Tu es connecté avec ${email}. Le paiement débloquera immédiatement cette formation dans ton espace membre.`
              : "Ton accès membre est nécessaire pour rattacher proprement l'achat à ton compte."}
          </p>
        </div>

        <div className="checkout-action-panel">
          <div className="checkout-action-row">
            <span>Formation sélectionnée</span>
            <strong>{productName}</strong>
          </div>
          <div className="checkout-action-row">
            <span>Montant à régler</span>
            <strong>{formattedPrice}</strong>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-[rgba(239,124,131,0.32)] bg-[rgba(239,124,131,0.12)] px-4 py-3 text-sm text-[#fecaca]">
            {error}
          </div>
        ) : null}

        {isAuthenticated ? (
          <Button onClick={startCheckout} loading={loading} className="w-full">
            Payer via Stripe
          </Button>
        ) : (
          <div className="grid gap-3">
            <Link
              href={`/login?next=${encodeURIComponent(`/checkout?product=${productSlug}`)}`}
              className={buttonClasses("primary", "md")}
            >
              Se connecter pour payer
            </Link>
            <Link
              href={`/register?next=${encodeURIComponent(`/checkout?product=${productSlug}`)}`}
              className={buttonClasses("secondary", "md")}
            >
              Créer un compte
            </Link>
          </div>
        )}

        <p className="text-center text-xs text-[var(--muted)]">
          Paiement traité par Stripe. Aucune donnée bancaire n'est stockée sur nos serveurs.
        </p>
      </GlowCard>
    </section>
  );
}