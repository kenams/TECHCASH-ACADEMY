import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductHero } from "@/components/product-hero";
import { ProductModulesList } from "@/components/product-modules-list";
import { getOwnedProducts, getProductWithModulesBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductWithModulesBySlug(slug);

  if (!product) {
    return {
      title: "Formation introuvable | TechCash Academy"
    };
  }

  return {
    title: `${product.title} | TechCash Academy`,
    description: product.short_description
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductWithModulesBySlug(slug);

  if (!product) {
    notFound();
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const [profile, ownedProducts] = user
    ? await Promise.all([getUserProfile(user.id, supabase), getOwnedProducts(user.id)])
    : [null, []];
  const isOwned = Boolean(profile?.is_premium) || ownedProducts.some((entry) => entry.slug === product.slug);

  return (
    <main>
      <div className="shell">
        <header className="topbar">
          <div className="brand">{siteConfig.brand}</div>
          <nav className="nav">
            <Link href="/formations" className="button-ghost">
              Retour catalogue
            </Link>
            <Link href={user ? "/dashboard" : "/login"} className="button">
              {user ? "Mon espace" : "Connexion"}
            </Link>
          </nav>
        </header>

        <ProductHero
          product={product}
          isOwned={isOwned}
          detailHref={`/dashboard/formations/${product.slug}`}
        />

        <section className="section">
          <div className="section-title">
            <h2>Ce que tu trouveras dans la formation</h2>
            <p>
              Les modules deja publies sont accessibles immediatement apres achat. Les blocs
              signales comme bientot disponibles apparaissent deja dans la feuille de route.
            </p>
          </div>
          <ProductModulesList modules={product.modules} />
        </section>

        <section className="section">
          <div className="grid-2">
            <article className="card">
              <h3>Ce que cette formation aide a vendre</h3>
              <p>{product.short_description}</p>
            </article>
            <article className="card">
              <h3>Logique d'acces</h3>
              <p>
                L'achat debloque uniquement cette formation, sauf si tu disposes plus tard d'un
                acces premium global. Le dashboard affichera clairement ce que tu possedes.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
