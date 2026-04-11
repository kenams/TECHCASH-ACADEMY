import Link from "next/link";
import { AccessBadge } from "@/components/access-badge";
import { PurchaseCTA } from "@/components/purchase-cta";
import { formatPrice } from "@/lib/products";
import type { OwnedProductSummary, ProductCardData } from "@/lib/types";

type MemberProductCardProps = {
  product: ProductCardData | OwnedProductSummary;
  isOwned?: boolean;
  purchaseDate?: string | null;
};

export function MemberProductCard({ product, isOwned = false, purchaseDate }: MemberProductCardProps) {
  return (
    <article className="member-product-card">
      <Link href={isOwned ? `/dashboard/formations/${product.slug}` : `/formations/${product.slug}`} className="member-product-media-wrap">
        {product.thumbnail_url ? (
          <img src={product.thumbnail_url} alt={product.title} className="member-product-media-img" loading="lazy" />
        ) : (
          <div className="product-thumb-empty member-product-media-img" />
        )}
        <div className="member-product-media-overlay" />
        <div className="member-product-media-badges">
          {product.is_featured ? <AccessBadge label="Offre principale" tone="featured" /> : null}
          <AccessBadge label={isOwned ? "Formation débloquée" : "Disponible"} tone={isOwned ? "success" : "default"} />
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

        <div className="member-product-note">
          <strong>{isOwned ? "Espace prêt" : "Prise en main rapide"}</strong>
          <p>
            {isOwned
              ? "Le bon contenu, les bons modules et le bon accès sont déjà en place dans ton espace membre."
              : "La fiche formation, le checkout et l’espace membre restent alignés dans un parcours simple et propre."}
          </p>
        </div>

        {purchaseDate ? <p className="helper">Achetée le {new Date(purchaseDate).toLocaleDateString("fr-FR")}</p> : null}

        <div className="cta-row member-product-cta-row">
          <PurchaseCTA productSlug={product.slug} priceCents={product.price_cents} currency={product.currency} isOwned={isOwned} />
        </div>
      </div>
    </article>
  );
}
