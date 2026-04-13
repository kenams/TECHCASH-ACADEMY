import { AccessBadge } from "@/components/access-badge";
import { CourseVideoPlayer } from "@/components/course-video-player";
import { PurchaseCTA } from "@/components/purchase-cta";
import { formatPrice } from "@/lib/products";
import type { ProductRecord } from "@/lib/types";

type ProductHeroProps = {
  product: ProductRecord;
  isOwned?: boolean;
  detailHref?: string;
};

function getVideoUrl(slug: string): string {
  return `/videos/formations/${slug}-overview.mp4`;
}

function getPosterUrl(slug: string): string {
  return `/videos/posters/${slug}-overview-poster.jpg`;
}

export function ProductHero({ product, isOwned = false, detailHref }: ProductHeroProps) {
  const videoUrl = getVideoUrl(product.slug);
  const posterUrl = getPosterUrl(product.slug);

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
            <strong>Vidéo, PDF, ressources, texte</strong>
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
        <div className="product-video-preview">
          <div className="product-video-preview-label">Aperçu gratuit</div>
          <CourseVideoPlayer src={videoUrl} poster={posterUrl} subtitleSlug={product.slug} />
        </div>
        <div className="product-hero-meta">
          <div className="price-block">
            <span className="helper">Tarif</span>
            <strong>{formatPrice(product.price_cents, product.currency)}</strong>
          </div>
          <div className="luxury-note">
            <strong>Vidéo tutorielle incluse</strong>
            <span>
              Chaque formation inclut une vidéo guidée complète, des modules texte, des PDF et des ressources téléchargeables.
            </span>
          </div>
          <ul className="list product-hero-points">
            <li>Vidéo tutorielle guidée avec voix IA</li>
            <li>Modules texte structurés, PDF et ressources</li>
            <li>Accès immédiat après paiement</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
