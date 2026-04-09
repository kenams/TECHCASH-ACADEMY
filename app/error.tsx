"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global app error", error);
  }, [error]);

  return (
    <main className="status-wrap">
      <section className="status-card">
        <p className="eyebrow">Erreur application</p>
        <h1>Une erreur inattendue est survenue</h1>
        <p>Recharge la page ou retourne à l'accueil si le problème persiste.</p>
        <div className="cta-row">
          <button className="button" onClick={reset} type="button">
            Réessayer
          </button>
          <Link href="/" className="button-secondary">
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
