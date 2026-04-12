"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getCatalogModuleCount, getCatalogThemeForProduct, getEstimatedVideoMinutes, type CatalogTheme } from "@/lib/catalog-ui";
import type { ProductCardData } from "@/lib/types";

type FormationsCatalogProps = {
  ownedSlugs: string[];
  products: ProductCardData[];
  userHasGlobalAccess: boolean;
};

const themeTabs: Array<{ id: CatalogTheme; label: string }> = [
  { id: "all", label: "Tout" },
  { id: "it-freelance", label: "IT & Freelance" },
  { id: "web-dev", label: "Web & Dev" },
  { id: "support-infra", label: "Support & Infra" },
  { id: "finance-trading", label: "Finance & Trading" }
];

export function FormationsCatalog({
  ownedSlugs,
  products,
  userHasGlobalAccess
}: FormationsCatalogProps) {
  const [activeTheme, setActiveTheme] = useState<CatalogTheme>("all");
  const filteredProducts =
    activeTheme === "all"
      ? products
      : products.filter((product) => getCatalogThemeForProduct(product) === activeTheme);
  const totalMinutes = products.reduce((sum, product) => sum + getEstimatedVideoMinutes(product), 0);
  const totalModules = products.reduce((sum, product) => sum + getCatalogModuleCount(product), 0);

  return (
    <>
      <section className="section section-first">
        <div className="section-title">
          <div className="eyebrow">Catalogue des formations</div>
          <h1>Choisis la compétence digitale la plus rentable pour ton contexte</h1>
          <p>
            Chaque formation correspond à une offre claire à vendre. Tu peux acheter une seule
            formation ou construire ton catalogue de compétences pas à pas.
          </p>
        </div>

        <div className="hero-stat-grid">
          <article className="hero-stat-card">
            <span className="helper">Catalogue</span>
            <strong>{products.length} formations</strong>
            <p>Des parcours pensés pour transformer une compétence en offre vendable.</p>
          </article>
          <article className="hero-stat-card">
            <span className="helper">Contenu</span>
            <strong>~{totalMinutes} min guidés</strong>
            <p>Des vidéos et modules déjà structurés pour accélérer la compréhension.</p>
          </article>
          <article className="hero-stat-card">
            <span className="helper">Programme</span>
            <strong>{totalModules} modules publiés</strong>
            <p>Lecture directe, ressources intégrées et accès immédiat côté membre.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="catalog-filter-tabs" role="tablist" aria-label="Filtrer les formations">
          {themeTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`catalog-filter-tab ${activeTheme === tab.id ? "active" : ""}`}
              onClick={() => setActiveTheme(tab.id)}
              role="tab"
              aria-selected={activeTheme === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>
            {activeTheme === "all"
              ? "Toutes les formations disponibles"
              : `Formations : ${themeTabs.find((tab) => tab.id === activeTheme)?.label}`}
          </h2>
          <p>
            {activeTheme === "finance-trading"
              ? "Des formations orientées finance, trading et services augmentés par IA."
              : "Explore le catalogue complet et choisis la porte d'entrée la plus adaptée à ton activité, ton niveau actuel et ton objectif commercial."}
          </p>
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isOwned={userHasGlobalAccess || ownedSlugs.includes(product.slug)}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <div className="section-title">
            <h2>Construire une présence plus premium</h2>
            <p>
              Le catalogue n&apos;est pas seulement une liste de produits. Il sert aussi de vitrine
              crédible pour montrer que ton offre est claire, structurée et sérieuse.
            </p>
          </div>
          <div className="cta-row">
            <Link href={ownedSlugs.length || userHasGlobalAccess ? "/dashboard/mes-formations" : "/register"} className="button">
              {ownedSlugs.length || userHasGlobalAccess ? "Voir mes formations" : "Créer mon accès"}
            </Link>
            <Link href="/formations/trading" className="button-secondary">
              Explorer le catalogue trading
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
