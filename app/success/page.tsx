import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="status-wrap">
      <section className="status-card status-card-rich">
        <div className="status-icon status-icon-success">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="eyebrow">Paiement confirmé</p>
        <h1>Ton accès est activé</h1>
        <p>
          Stripe a confirmé ton paiement. La formation est maintenant disponible dans ton espace membre avec un accès immédiat aux modules déjà publiés.
        </p>

        <div className="status-steps">
          <div className="status-step">
            <span className="status-step-dot" />
            <p>Ton accès est débloqué. Tu retrouves la formation dans « Mes formations ».</p>
          </div>
          <div className="status-step">
            <span className="status-step-dot" />
            <p>Les modules publiés sont accessibles immédiatement, sans action supplémentaire.</p>
          </div>
          <div className="status-step">
            <span className="status-step-dot" />
            <p>Les modules à venir apparaîtront automatiquement dans ton espace au fur et à mesure.</p>
          </div>
        </div>

        <p className="helper">Si l'accès n'apparaît pas tout de suite, attends 5 à 10 secondes puis recharge la page.</p>

        <div className="cta-row">
          <Link href="/dashboard/mes-formations" className="button">
            Accéder à mes formations
          </Link>
          <Link href="/dashboard" className="button-secondary">
            Mon tableau de bord
          </Link>
        </div>
      </section>
    </main>
  );
}
