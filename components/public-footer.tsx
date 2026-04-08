import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function PublicFooter() {
  return (
    <footer className="footer footer-rich">
      <div className="footer-grid">
        <div className="footer-column">
          <div className="brand">{siteConfig.brand}</div>
          <p className="footer-meta">
            Plateforme de formations digitales pour structurer une activité vendable, livrable et
            durable.
          </p>
          <div className="footer-trust-row">
            <span className="meta-chip">Paiement sécurisé</span>
            <span className="meta-chip">Accès membre</span>
            <span className="meta-chip">Catalogue évolutif</span>
          </div>
          <p className="footer-meta">
            Éditeur : {siteConfig.legalEntity}
            <br />
            Contact : {siteConfig.supportEmail}
          </p>
        </div>

        <div className="footer-column">
          <h3>Navigation</h3>
          <div className="footer-links">
            <Link href="/">Accueil</Link>
            <Link href="/formations">Formations</Link>
            <Link href="/register">Créer un compte</Link>
            <Link href="/login">Connexion</Link>
          </div>
        </div>

        <div className="footer-column">
          <h3>Cadre légal</h3>
          <div className="footer-links">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Politique de confidentialité</Link>
            <Link href="/conditions-utilisation">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-meta">
          Paiement sécurisé via Stripe. Authentification et base de données gérées avec Supabase.
          Site déployé sur Vercel.
        </p>
      </div>
    </footer>
  );
}
