import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function PublicFooter() {
  return (
    <footer className="footer footer-rich">
      <div className="footer-grid">
        <div className="footer-column">
          <div className="brand">{siteConfig.brand}</div>
          <p className="footer-meta">
            Plateforme de formations digitales pour structurer une activite vendable, livrable et
            durable.
          </p>
          <div className="footer-trust-row">
            <span className="meta-chip">Paiement securise</span>
            <span className="meta-chip">Acces membre</span>
            <span className="meta-chip">Catalogue evolutif</span>
          </div>
          <p className="footer-meta">
            Editeur : {siteConfig.legalEntity}
            <br />
            Contact : {siteConfig.supportEmail}
          </p>
        </div>

        <div className="footer-column">
          <h3>Navigation</h3>
          <div className="footer-links">
            <Link href="/">Accueil</Link>
            <Link href="/formations">Formations</Link>
            <Link href="/register">Creer un compte</Link>
            <Link href="/login">Connexion</Link>
          </div>
        </div>

        <div className="footer-column">
          <h3>Cadre legal</h3>
          <div className="footer-links">
            <Link href="/mentions-legales">Mentions legales</Link>
            <Link href="/politique-confidentialite">Politique de confidentialite</Link>
            <Link href="/conditions-utilisation">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-meta">
          Paiement securise via Stripe. Authentification et base de donnees gerees avec Supabase.
          Site deploye sur Vercel.
        </p>
      </div>
    </footer>
  );
}
