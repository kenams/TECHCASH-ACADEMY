import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="status-wrap">
      <section className="status-card">
        <p className="eyebrow">Paiement reussi</p>
        <h1>Ton acces est en cours d'activation</h1>
        <p>
          Stripe a confirme le paiement. Si l'ecriture en base prend quelques secondes, recharge
          simplement ton dashboard.
        </p>
        <p className="helper">Si l'acces n'apparait pas tout de suite, attends 5 a 10 secondes puis reessaie.</p>
        <div className="cta-row">
          <Link href="/dashboard" className="button">
            Acceder au dashboard
          </Link>
          <Link href="/" className="button-secondary">
            Retour accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
