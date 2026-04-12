import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MemberCourseExperience } from "@/components/member-course-experience";
import { MemberProductCard } from "@/components/member-product-card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { buttonClasses } from "@/components/ui/Button";
import { userHasProductAccess } from "@/lib/access";
import { getProductSupplement, getRelatedLocalProducts } from "@/lib/catalog";
import { getUserModuleProgress } from "@/lib/progress";
import { getOwnedProducts, getProductWithModulesBySlug } from "@/lib/products";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type MemberProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: MemberProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductWithModulesBySlug(slug);

  if (!product) {
    return { title: "Formation introuvable | Espace membre" };
  }

  return {
    title: `${product.title} | Espace membre`,
    description: product.short_description
  };
}

export default async function MemberProductPage({ params }: MemberProductPageProps) {
  const { slug } = await params;
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const access = await userHasProductAccess(user.id, slug);

  if (!access.product) {
    notFound();
  }

  const product = await getProductWithModulesBySlug(access.product.slug);

  if (!product) {
    notFound();
  }

  const [ownedProducts, progress] = await Promise.all([
    getOwnedProducts(user.id),
    getUserModuleProgress(user.id, product)
  ]);

  const supplement = getProductSupplement(product.slug);
  const recommendedProducts = getRelatedLocalProducts(product.slug, 2).filter(
    (candidate) => !ownedProducts.some((owned) => owned.slug === candidate.slug)
  );

  if (!access.hasAccess) {
    return (
      <div className="grid gap-8">
        <AnimatedSection className="grid gap-5">
          <Badge variant="warning">Accès réservé</Badge>
          <GlowCard className="grid gap-5 p-8">
            <div className="grid gap-3">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                Cette formation n&apos;est pas encore débloquée
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
                Ton compte existe bien, mais cette formation n&apos;a pas encore été achetée. Tu peux
                consulter la version publique ou passer au checkout.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/checkout?product=${product.slug}`} className={buttonClasses("primary", "md")}>
                Débloquer cette formation
              </Link>
              <Link href={`/formations/${product.slug}`} className={buttonClasses("secondary", "md")}>
                Voir la page publique
              </Link>
            </div>
          </GlowCard>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <AnimatedSection>
        <MemberCourseExperience product={product} initialProgress={progress} />
      </AnimatedSection>

      {supplement ? (
        <AnimatedSection delay={80} className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <GlowCard className="grid gap-5">
            <Badge variant="primary">Ce que tu vas vraiment en tirer</Badge>
            <div className="grid gap-3">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {supplement.pitch}
              </h2>
              <ul className="grid gap-3">
                {supplement.outcomes.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-4 text-sm leading-7 text-[var(--foreground)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </GlowCard>
          <GlowCard className="grid gap-4">
            <Badge variant="muted">Pour qui cette formation est idéale</Badge>
            <ul className="grid gap-3">
              {supplement.bestFor.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-4 text-sm leading-7 text-[var(--foreground)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </GlowCard>
        </AnimatedSection>
      ) : null}

      {recommendedProducts.length ? (
        <AnimatedSection delay={220} className="grid gap-5">
          <div className="grid gap-2">
            <Badge variant="muted">Aller plus loin</Badge>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              Des formations qui complètent bien celle-ci
            </h2>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {recommendedProducts.map((candidate) => (
              <MemberProductCard key={candidate.id} product={candidate} />
            ))}
          </div>
        </AnimatedSection>
      ) : null}
    </div>
  );
}
