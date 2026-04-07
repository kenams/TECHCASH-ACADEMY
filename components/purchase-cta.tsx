import Link from "next/link";
import { formatPrice } from "@/lib/products";

type PurchaseCTAProps = {
  productSlug: string;
  priceCents: number;
  currency: string;
  isOwned?: boolean;
  dashboardHref?: string;
  className?: string;
};

export function PurchaseCTA({
  productSlug,
  priceCents,
  currency,
  isOwned = false,
  dashboardHref,
  className
}: PurchaseCTAProps) {
  if (isOwned) {
    return (
      <Link href={dashboardHref || `/dashboard/formations/${productSlug}`} className={className || "button"}>
        Acceder a la formation
      </Link>
    );
  }

  return (
    <Link href={`/checkout?product=${productSlug}`} className={className || "button"}>
      Acheter {formatPrice(priceCents, currency)}
    </Link>
  );
}
