import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="not-found-wrap">
      <div className="stack" style={{ maxWidth: "480px", textAlign: "center", gap: "1.5rem" }}>
        <Link href="/" className="brand" style={{ justifyContent: "center" }}>
          {siteConfig.brand}
        </Link>

        <p className="not-found-code">404</p>

        <div className="stack" style={{ gap: "0.75rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem" }}>Page introuvable</h1>
          <p style={{ color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>
            Cette page n'existe pas ou a été déplacée. Retourne au catalogue pour
            trouver ce que tu cherches.
          </p>
        </div>

        <div className="cta-row" style={{ justifyContent: "center" }}>
          <Link href="/formations" className="button">
            Voir le catalogue
          </Link>
          <Link href="/" className="button-secondary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
