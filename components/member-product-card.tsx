import { AccessBadge } from "@/components/access-badge";
import { PurchaseCTA } from "@/components/purchase-cta";
import { formatPrice } from "@/lib/products";
import type { OwnedProductSummary, ProductCardData } from "@/lib/types";

type MemberProductCardProps = {
  product: ProductCardData | OwnedProductSummary;
  isOwned?: boolean;
  purchaseDate?: string | null;
};

export function MemberProductCard({
  product,
  isOwned = false,
  purchaseDate
}: MemberProductCardProps) {
  return (
    <article className="member-product-card">
      <div className={`member-product-accent ${isOwned ? "member-product-accent-owned" : ""}`} />
      <div className="member-product-head">
        <div>
          <div className="hero-badges">
            {product.is_featured ? <AccessBadge label="Offre principale" tone="featured" /> : null}
            <AccessBadge
              label={isOwned ? "Debloquee" : "Disponible"}
              tone={isOwned ? "success" : "default"}
            />
          </div>
          <h3>{product.title}</h3>
          <p className="product-subtitle">{product.subtitle}</p>
        </div>
        <div className="price-chip">{formatPrice(product.price_cents, product.currency)}</div>
      </div>
      <p className="product-summary">{product.short_description}</p>
      {purchaseDate ? (
        <p className="helper">Achetee le {new Date(purchaseDate).toLocaleDateString("fr-FR")}</p>
      ) : null}
      <div className="cta-row">
        <PurchaseCTA
          productSlug={product.slug}
          priceCents={product.price_cents}
          currency={product.currency}
          isOwned={isOwned}
        />
      </div>
    </article>
  );
}
