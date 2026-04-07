import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="status-wrap">
      <section className="status-card">
        <p className="eyebrow">Paiement annule</p>
        <h1>Tu peux reprendre quand tu veux</h1>
        <p>La commande n'a pas ete finalisee. Ton compte reste disponible pour retenter l'achat.</p>
        <div className="cta-row">
          <Link href="/formations" className="button">
            Revenir aux formations
          </Link>
          <Link href="/" className="button-secondary">
            Retour accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
