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
          <AccessBadge label={isOwned ? "Acces actif" : "Formation digitale"} tone={isOwned ? "success" : "default"} />
        </div>
        <h1>{product.title}</h1>
        <p className="product-hero-subtitle">{product.subtitle}</p>
        <p className="product-hero-description">{product.long_description}</p>
        <div className="hero-assurance-grid">
          <div className="assurance-item">
            <span className="helper">Paiement</span>
            <strong>Checkout Stripe securise</strong>
          </div>
          <div className="assurance-item">
            <span className="helper">Acces</span>
            <strong>Espace membre dedie</strong>
          </div>
          <div className="assurance-item">
            <span className="helper">Formats</span>
            <strong>Texte, PDF, ressources, video</strong>
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
          {detailHref && isOwned ? (
            <a href={detailHref} className="button-secondary">
              Ouvrir l'espace membre
            </a>
          ) : null}
        </div>
      </div>

      <aside className="product-hero-card">
        {product.thumbnail_url ? (
          <div
            className="product-hero-media"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.15), rgba(2,6,23,0.7)), url(${product.thumbnail_url})`
            }}
          />
        ) : (
          <div className="product-hero-media product-thumb-empty" />
        )}
        <div className="product-hero-meta">
          <div className="price-block">
            <span className="helper">Tarif</span>
            <strong>{formatPrice(product.price_cents, product.currency)}</strong>
          </div>
          <div className="luxury-note">
            <strong>Positionnement premium et rassurant</strong>
            <span>
              Un cadre propre pour vendre une compétence utile, sans promesses excessives ni
              tunnel brouillon.
            </span>
          </div>
          <ul className="list product-hero-points">
            <li>Acces immediat a tous les modules publies</li>
            <li>Contenus textes, PDF, ressources et futurs ajouts</li>
            <li>Structuree pour etre utile, vendable et exploitable rapidement</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
