import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ContentRenderer } from "@/components/content-renderer";
import { ProductHero } from "@/components/product-hero";
import { ProductModulesList } from "@/components/product-modules-list";
import { getProductWithModulesBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { userHasProductAccess } from "@/lib/access";

type MemberProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: MemberProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductWithModulesBySlug(slug);

  if (!product) {
    return {
      title: "Formation introuvable | TechCash Academy"
    };
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

  if (!access.hasAccess) {
    return (
      <main>
        <div className="shell">
          <header className="topbar">
            <div className="brand">{siteConfig.brand}</div>
            <nav className="nav">
              <Link href="/dashboard" className="button-ghost">
                Retour dashboard
              </Link>
              <Link href={`/checkout?product=${product.slug}`} className="button">
                Acheter la formation
              </Link>
            </nav>
          </header>

          <ProductHero product={product} />

          <section className="section">
            <article className="card empty-state-card">
              <h3>Acces reserve aux membres</h3>
              <p>
                Ton compte existe bien, mais cette formation n'a pas encore ete achetee. Tu peux
                consulter le detail public, puis passer au checkout si le sujet t'interesse.
              </p>
              <div className="cta-row">
                <Link href={`/checkout?product=${product.slug}`} className="button">
                  Debloquer cette formation
                </Link>
                <Link href={`/formations/${product.slug}`} className="button-secondary">
                  Voir la version publique
                </Link>
              </div>
            </article>
          </section>

          <section className="section">
            <div className="section-title">
              <h2>Modules inclus</h2>
              <p>Voici la structure que tu debloqueras apres achat.</p>
            </div>
            <ProductModulesList modules={product.modules} />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-frame">
      <section className="dashboard-hero">
        <div className="max-w-3xl">
          <div className="eyebrow">Formation debloquee</div>
          <h1>{product.title}</h1>
          <p className="lead">{product.long_description}</p>
        </div>
        <div className="cta-row">
          <Link href="/dashboard/mes-formations" className="button-secondary">
            Mes formations
          </Link>
          <Link href="/dashboard" className="button-ghost">
            Dashboard
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Modules et contenus</h2>
          <p>
            Le contenu peut melanger texte, PDF, ressources et modules a venir, sans attendre que
            toute la production video soit terminee.
          </p>
        </div>
        <div className="content-stack">
          {product.modules.map((module) => (
            <ContentRenderer key={module.id} module={module} />
          ))}
        </div>
      </section>
    </main>
  );
}
