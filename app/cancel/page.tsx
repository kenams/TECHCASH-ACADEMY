import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="status-wrap">
      <section className="status-card status-card-rich">
        <div className="status-icon status-icon-cancel">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="eyebrow">Paiement annulé</p>
        <h1>Tu peux reprendre quand tu veux</h1>
        <p>
          La commande n'a pas été finalisée. Aucun montant n'a été débité. Ton compte reste disponible pour relancer l'achat plus tard dans de bonnes conditions.
        </p>

        <div className="status-steps">
          <div className="status-step">
            <span className="status-step-dot" style={{ background: "rgba(148, 163, 184, 0.6)" }} />
            <p>Aucun paiement n'a été prélevé sur cette tentative.</p>
          </div>
          <div className="status-step">
            <span className="status-step-dot" style={{ background: "rgba(148, 163, 184, 0.6)" }} />
            <p>Ton compte est conservé, tu peux te reconnecter et reprendre plus tard.</p>
          </div>
          <div className="status-step">
            <span className="status-step-dot" style={{ background: "rgba(148, 163, 184, 0.6)" }} />
            <p>La formation reste disponible dans le catalogue avec le même parcours d'accès.</p>
          </div>
        </div>

        <div className="cta-row">
          <Link href="/formations" className="button">
            Retourner aux formations
          </Link>
          <Link href="/" className="button-secondary">
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
