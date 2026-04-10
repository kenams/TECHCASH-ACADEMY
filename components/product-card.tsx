import Link from "next/link";
import { AccessBadge } from "@/components/access-badge";
import { PurchaseCTA } from "@/components/purchase-cta";
import { formatPrice } from "@/lib/products";
import type { ProductCardData } from "@/lib/types";

type ProductCardProps = {
  product: ProductCardData;
  isOwned?: boolean;
};

export function ProductCard({ product, isOwned = false }: ProductCardProps) {
  return (
    <article className={`product-card ${product.is_featured ? "product-card-featured" : ""}`}>
      <div className="product-thumb-wrap">
        {product.thumbnail_url ? (
          <img src={product.thumbnail_url} alt={product.title} className="product-thumb-img" loading="lazy" />
        ) : (
          <div className="product-thumb-empty product-thumb-img" />
        )}
        <div className="product-thumb-overlay" />
        {product.is_featured ? (
          <div className="product-thumb-badge">
            <AccessBadge label="Offre principale" tone="featured" />
          </div>
        ) : null}
      </div>

      <div className="product-card-body">
        <div className="product-card-top">
          <div>
            <h3>{product.title}</h3>
            <p className="product-subtitle">{product.subtitle}</p>
          </div>
          <div className="price-chip">{formatPrice(product.price_cents, product.currency)}</div>
        </div>

        <p className="product-summary">{product.short_description}</p>

        <div className="product-card-meta">
          <span className="meta-chip">Accès membre immédiat</span>
          <span className="meta-chip">Contenu publiable progressivement</span>
        </div>

        <div className="cta-row">
          <Link href={`/formations/${product.slug}`} className="button-secondary">
            Voir le détail
          </Link>
          <PurchaseCTA productSlug={product.slug} priceCents={product.price_cents} currency={product.currency} isOwned={isOwned} />
        </div>
      </div>
    </article>
  );
}
