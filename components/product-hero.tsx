import { AccessBadge } from "@/components/access-badge";
import { PurchaseCTA } from "@/components/purchase-cta";
import { formatPrice } from "@/lib/products";
import type { ProductRecord } from "@/lib/types";

type ProductHeroProps = {
  product: ProductRecord;
  isOwned?: boolean;
  detailHref?: string;
};

export function ProductHero({ product, isOwned = false, detailHref }: ProductHeroProps) {
  return (
    <section className="product-hero">
      <div className="product-hero-copy">
        <div className="hero-badges">
          {product.is_featured ? <AccessBadge label="Offre principale" tone="featured" /> : null}
          <AccessBadge label={isOwned ? "Accès actif" : "Formation digitale"} tone={isOwned ? "success" : "default"} />
        </div>
        <h1>{product.title}</h1>
        <p className="product-hero-subtitle">{product.subtitle}</p>
        <p className="product-hero-description">{product.long_description}</p>
        <div className="hero-assurance-grid">
          <div className="assurance-item">
            <span className="helper">Paiement</span>
            <strong>Checkout Stripe sécurisé</strong>
          </div>
          <div className="assurance-item">
            <span className="helper">Accès</span>
            <strong>Espace membre dédié</strong>
          </div>
          <div className="assurance-item">
            <span className="helper">Formats</span>
            <strong>Texte, PDF, ressources, vidéo</strong>
          </div>
        </div>
        <div className="cta-row">
          <PurchaseCTA
            productSlug={product.slug}
            priceCents={product.price_cents}
            currency={product.currency}
            isOwned={isOwned}
            dashboardHref={detailHref}
          />
          {!isOwned ? (
            <a href={`/formations/${product.slug}`} className="button-secondary">
              Voir le programme
            </a>
          ) : null}
        </div>
      </div>

      <aside className="product-hero-card">
        <div className="product-hero-media-wrap">
          {product.thumbnail_url ? (
            <img src={product.thumbnail_url} alt={product.title} className="product-hero-media-img" />
          ) : (
            <div className="product-hero-media-empty" />
          )}
          <div className="product-hero-media-overlay" />
        </div>
        <div className="product-hero-meta">
          <div className="price-block">
            <span className="helper">Tarif</span>
            <strong>{formatPrice(product.price_cents, product.currency)}</strong>
          </div>
          <div className="luxury-note">
            <strong>Positionnement premium et rassurant</strong>
            <span>Un cadre propre pour vendre une compétence utile, sans promesses excessives ni tunnel brouillon.</span>
          </div>
          <ul className="list product-hero-points">
            <li>Accès immédiat à tous les modules publiés</li>
            <li>Contenus textes, PDF, ressources et futurs ajouts</li>
            <li>Structurée pour être utile, vendable et exploitable rapidement</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
