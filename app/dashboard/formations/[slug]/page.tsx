import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ContentRenderer } from "@/components/content-renderer";
import { MemberProductCard } from "@/components/member-product-card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { buttonClasses } from "@/components/ui/Button";
import { userHasProductAccess } from "@/lib/access";
import { getProductSupplement, getRelatedLocalProducts } from "@/lib/catalog";
import { getOwnedProducts, getProductWithModulesBySlug } from "@/lib/products";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import type { ProductModuleRecord } from "@/lib/types";

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

function getVideoModuleFromList(modules: ProductModuleRecord[]): ProductModuleRecord | null {
  // Video with sort_order = 0 = main tutorial video (hero)
  const hero = modules.find((m) => m.content_type === "video" && m.sort_order === 0);
  if (hero) return hero;
  return modules.find((m) => m.content_type === "video") ?? null;
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

  const ownedProducts = await getOwnedProducts(user.id);
  const supplement = getProductSupplement(product.slug);
  const publishedModules = product.modules.filter((module) => module.is_published).length;
  const comingSoonModules = product.modules.filter((module) => module.content_type === "coming_soon").length;
  const directResources = product.modules.filter(
    (module) => module.content_type === "resource" || module.content_type === "pdf"
  ).length;
  const recommendedProducts = getRelatedLocalProducts(product.slug, 2).filter(
    (candidate) => !ownedProducts.some((owned) => owned.slug === candidate.slug)
  );

  // Separate hero video from other modules
  const heroVideo = getVideoModuleFromList(product.modules);
  const otherModules = heroVideo
    ? product.modules.filter((m) => m.id !== heroVideo.id)
    : product.modules;

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

      {/* ── HERO VIDEO SECTION ─────────────────────────────────────────────── */}
      {heroVideo?.content_url ? (
        <AnimatedSection>
          <div className="course-hero-video-shell">
            <div className="course-hero-video-header">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="success">Formation débloquée</Badge>
                  <Badge variant="primary">Vidéo tutorielle</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/dashboard/mes-formations" className={buttonClasses("secondary", "sm")}>
                    Mes formations
                  </Link>
                  <Link href={`/formations/${product.slug}`} className={buttonClasses("ghost", "sm")}>
                    Page publique
                  </Link>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-4xl">
                  {product.title}
                </h1>
                <p className="text-base leading-7 text-[var(--muted)]">{product.short_description}</p>
              </div>
            </div>
            <div className="course-hero-video-player">
              <video
                className="course-main-video"
                controls
                preload="metadata"
                playsInline
                poster={`/videos/posters/${product.slug}-overview-poster.jpg`}
              >
                <source src={heroVideo.content_url} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
            <div className="course-hero-video-stats">
              <div className="course-stat">
                <strong>{publishedModules}</strong>
                <span>modules disponibles</span>
              </div>
              <div className="course-stat">
                <strong>{directResources}</strong>
                <span>ressources téléchargeables</span>
              </div>
              <div className="course-stat">
                <strong>{comingSoonModules}</strong>
                <span>modules à venir</span>
              </div>
              <div className="course-stat">
                <strong>{product.is_featured ? "Principale" : "Spécialisée"}</strong>
                <span>formation</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ) : (
        /* Fallback header without video */
        <AnimatedSection className="grid gap-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="grid gap-3">
              <Badge variant="success">Formation débloquée</Badge>
              <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                {product.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{product.long_description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/mes-formations" className={buttonClasses("secondary", "sm")}>
                Mes formations
              </Link>
              <Link href={`/formations/${product.slug}`} className={buttonClasses("ghost", "sm")}>
                Page publique
              </Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <GlowCard>
              <p className="text-sm text-[var(--muted)]">Modules publiés</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{publishedModules}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Des ressources déjà accessibles dans ton espace membre.</p>
            </GlowCard>
            <GlowCard>
              <p className="text-sm text-[var(--muted)]">Ressources directes</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{directResources}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">PDF et ressources téléchargeables disponibles immédiatement.</p>
            </GlowCard>
            <GlowCard glowColor="emerald">
              <p className="text-sm text-[var(--muted)]">Bientôt disponible</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{comingSoonModules}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">La roadmap reste visible, même si tout n&apos;est pas encore publié.</p>
            </GlowCard>
            <GlowCard>
              <p className="text-sm text-[var(--muted)]">Positionnement</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{product.is_featured ? "Principal" : "Spécialisé"}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Une offre pensée pour s&apos;intégrer dans un catalogue de services vendables.</p>
            </GlowCard>
          </div>
        </AnimatedSection>
      )}

      {/* ── PITCH SUPPLEMENT ───────────────────────────────────────────────── */}
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
            <Badge variant="muted">Pour qui ce module est idéal</Badge>
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

      {/* ── MODULES & CONTENT ──────────────────────────────────────────────── */}
      <AnimatedSection delay={140} className="grid gap-5">
        <div className="grid gap-2">
          <Badge variant="success">Modules et contenus</Badge>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Tout le contenu disponible
          </h2>
          <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
            Parcours les modules dans l&apos;ordre pour une progression optimale, ou accède directement aux ressources dont tu as besoin.
          </p>
        </div>
        <div className="grid gap-5">
          {otherModules.map((module) => (
            <div key={module.id} id={`module-${module.id}`}>
              <ContentRenderer module={module} />
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── RECOMMENDATIONS ────────────────────────────────────────────────── */}
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
