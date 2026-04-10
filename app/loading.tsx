import { BrandMark } from "@/components/ui/BrandMark";

export default function GlobalLoading() {
  return (
    <main className="status-wrap">
      <section className="status-card status-card-rich">
        <div className="grid gap-6">
          <div className="mx-auto">
            <BrandMark />
          </div>
          <div className="grid gap-2 text-center">
            <p className="eyebrow">Chargement</p>
            <h1>Préparation de ton espace</h1>
            <p>La page se met en place. Le contenu arrive dans un cadre propre et stable.</p>
          </div>
          <div className="loading-stack">
            <span className="loading-bar" />
            <div className="loading-grid">
              <span className="loading-card" />
              <span className="loading-card" />
              <span className="loading-card" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
