import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { PublicFooter } from "@/components/public-footer";
import { getActiveProducts, getOwnedProducts } from "@/lib/products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export const metadata: Metadata = {
  title: "Trading & Finance IA | TechCash Academy",
  description:
    "Formations TechCash Academy dédiées au trading, à l'investissement, à l'automatisation de portefeuille et aux services finance + IA.",
  alternates: {
    canonical: getAbsoluteUrl("/formations/trading")
  },
  openGraph: {
    title: "Trading & Finance IA | TechCash Academy",
    description:
      "Découvre les formations trading et finance augmentées par IA de TechCash Academy.",
    url: getAbsoluteUrl("/formations/trading")
  }
};

export default async function TradingFormationsPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const [profile, products, owned] = await Promise.all([
    user ? getUserProfile(user.id, supabase) : Promise.resolve(null),
    getActiveProducts(),
    user ? getOwnedProducts(user.id) : Promise.resolve([])
  ]);

  const hasGlobalAccess = Boolean(profile?.is_premium);
  const ownedSlugs = new Set(owned.map((product) => product.slug));
  const tradingProducts = products.filter((product) => product.category === "trading");

  return (
    <main>
      <div className="shell">
        <Navbar brand={siteConfig.brand} isLoggedIn={Boolean(user)} />

        <section className="section section-first">
          <div className="section-title">
            <div className="eyebrow">Trading & Finance</div>
            <h1>L&apos;alliance entre IA, finance et livrables réellement vendables</h1>
            <p>
              Ce catalogue réunit des formations orientées trading, lecture de portefeuille, analyse
              crypto et services financiers augmentés par IA, avec un angle pratique et monétisable.
            </p>
          </div>
          <div className="hero-stat-grid">
            <article className="hero-stat-card">
              <span className="helper">Focus</span>
              <strong>Trading assisté par IA</strong>
              <p>Routine, risque, lecture de marché et automatisation sans promesse illusoire.</p>
            </article>
            <article className="hero-stat-card">
              <span className="helper">Applications</span>
              <strong>Portefeuille, crypto, reporting</strong>
              <p>Des parcours pensés pour apprendre et transformer la compétence en offre utile.</p>
            </article>
            <article className="hero-stat-card">
              <span className="helper">Sortie</span>
              <strong>Un cadre vendable</strong>
              <p>Chaque programme vise une méthode, un livrable et un positionnement plus clairs.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="offer-highlight-grid">
            <article className="offer-highlight-card">
              <span className="eyebrow">Discipline</span>
              <h3>Plus de structure, moins de bruit</h3>
              <p>Les formations s'appuient sur une logique de risque, de lecture et de livrables, pas sur du théâtre marketing.</p>
            </article>
            <article className="offer-highlight-card">
              <span className="eyebrow">Automatisation</span>
              <h3>Des workflows utiles et maintenables</h3>
              <p>APIs financières, synthèse IA, reporting et alertes sont traités comme un vrai système opérationnel.</p>
            </article>
            <article className="offer-highlight-card">
              <span className="eyebrow">Monétisation</span>
              <h3>Un angle clair pour vendre ensuite</h3>
              <p>Les parcours sont conçus pour pouvoir servir à une activité de veille, d'accompagnement ou de reporting premium.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Toutes les formations Trading & Finance IA</h2>
            <p>
              Choisis la porte d&apos;entrée la plus cohérente avec ton niveau et ton objectif :
              comprendre, automatiser, analyser ou vendre un service.
            </p>
          </div>
          <div className="product-grid">
            {tradingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isOwned={hasGlobalAccess || ownedSlugs.has(product.slug)}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="panel">
            <div className="section-title">
              <h2>Pourquoi combiner IA et finance ?</h2>
              <p>
                L&apos;IA est utile quand elle accélère la lecture, clarifie un reporting et renforce la discipline.
                Elle devient dangereuse quand elle prétend remplacer le jugement, le risque ou le cadre commercial.
              </p>
            </div>
            <div className="cta-row">
              <Link href="/formations" className="button-secondary">
                Voir tout le catalogue
              </Link>
              <Link href={user ? "/dashboard/mes-formations" : "/register"} className="button">
                {user ? "Voir mes formations" : "Créer mon accès"}
              </Link>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
