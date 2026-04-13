import Link from "next/link";
import { AccessBadge } from "@/components/access-badge";
import { PurchaseCTA } from "@/components/purchase-cta";
import { formatPrice } from "@/lib/products";
import type { OwnedProductSummary, ProductCardData, ProductProgressSummary } from "@/lib/types";

type MemberProductCardProps = {
  product: ProductCardData | OwnedProductSummary;
  isOwned?: boolean;
  purchaseDate?: string | null;
  progress?: ProductProgressSummary;
};

export function MemberProductCard({
  product,
  isOwned = false,
  purchaseDate,
  progress
}: MemberProductCardProps) {
  const memberHref = isOwned
    ? progress?.nextModuleSlug
      ? `/dashboard/formations/${product.slug}#module-${progress.nextModuleSlug}`
      : `/dashboard/formations/${product.slug}`
    : `/formations/${product.slug}`;

  return (
    <article className="member-product-card">
      <Link href={memberHref} className="member-product-media-wrap">
        {product.thumbnail_url ? (
          <img src={product.thumbnail_url} alt={product.title} className="member-product-media-img" loading="lazy" />
        ) : (
          <div className="product-thumb-empty member-product-media-img" />
        )}
        <div className="member-product-media-overlay" />
        <div className="member-product-media-badges">
          {product.is_featured ? <AccessBadge label="Offre principale" tone="featured" /> : null}
          <AccessBadge
            label={isOwned ? "Formation débloquée" : "Disponible"}
            tone={isOwned ? "success" : "default"}
          />
        </div>
      </Link>
      <div className="member-product-body">
        <div className="member-product-head">
          <div>
            <h3>{product.title}</h3>
            <p className="product-subtitle">{product.subtitle}</p>
          </div>
          <div className="member-product-price-stack">
            <div className="price-chip">{formatPrice(product.price_cents, product.currency)}</div>
            <span className="member-product-price-caption">{isOwned ? "Déjà inclus" : "Accès immédiat"}</span>
          </div>
        </div>

        <p className="product-summary">{product.short_description}</p>

        <div className="product-card-meta">
          <span className="meta-chip">{isOwned ? "Accès actif" : "Disponible à l'achat"}</span>
          <span className="meta-chip">Espace membre dédié</span>
        </div>

        {progress ? (
          <div className="member-card-progress">
            <div className="course-progress-bar-shell">
              <div className="course-progress-bar-track">
                <div className="course-progress-bar-fill" style={{ width: `${progress.percent}%` }} />
              </div>
              <span className="course-progress-label">
                {progress.completedModules}/{progress.totalModules} modules vus
              </span>
            </div>
            {progress.nextModuleTitle ? (
              <p className="member-card-progress-note">
                Reprendre sur : <strong>{progress.nextModuleTitle}</strong>
              </p>
            ) : (
              <p className="member-card-progress-note">
                Parcours terminé : tous les modules suivis sont marqués comme vus.
              </p>
            )}
          </div>
        ) : null}

        <div className="member-product-note">
          <strong>{isOwned ? "Espace prêt" : "Prise en main rapide"}</strong>
          <p>
            {isOwned
              ? "Reprends directement sur la prochaine étape utile. La reprise vidéo et la progression séquentielle restent synchronisées."
              : "Chaque module est conçu pour être lu, appliqué et transformé en offre vendable rapidement."}
          </p>
        </div>

        <div className="cta-row">
          <PurchaseCTA
            productSlug={product.slug}
            priceCents={product.price_cents}
            currency={product.currency}
            isOwned={isOwned}
            dashboardHref={memberHref}
          />
          {purchaseDate ? (
            <span className="helper">
              Acheté le {new Date(purchaseDate).toLocaleDateString("fr-FR")}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
