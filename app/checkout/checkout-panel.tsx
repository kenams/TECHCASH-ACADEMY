"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type CheckoutPanelProps = {
  email: string;
  productName: string;
  formattedPrice: string;
};

export function CheckoutPanel({
  email,
  productName,
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
          ...(session?.access_token
            ? { Authorization: `Bearer ${session.access_token}` }
            : {})
        }
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error || "Impossible de creer la session Stripe.");
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

  return (
    <main className="checkout-wrap">
      <section className="checkout-card">
        <p className="eyebrow">Paiement securise</p>
        <h1>Active ton acces complet</h1>
        <p>
          Tu es connecte avec <strong>{email}</strong>. Le paiement unique debloque le dashboard,
          l'ebook PDF et les 6 modules video.
        </p>

        {error ? <div className="message error">{error}</div> : null}

        <div className="panel">
          <h3>{productName}</h3>
          <p>Pack complet ebook + videos + bonus.</p>
          <div className="price">{formattedPrice}</div>
          <p className="helper">Tu seras redirige vers Stripe pour finaliser le paiement en securite.</p>
          <div className="cta-row">
            <button
              className="button"
              type="button"
              onClick={startCheckout}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Redirection..." : "Payer avec Stripe"}
            </button>
            <a href="/" className="button-secondary">
              Retour a l'offre
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
