import Link from "next/link";
import { redirect } from "next/navigation";
import { getPublishedModules } from "@/lib/modules";
import { getLatestPurchase } from "@/lib/purchases";
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, purchase, modules] = await Promise.all([
    getUserProfile(user.id, supabase),
    getLatestPurchase(user.id, supabase),
    getPublishedModules()
  ]);

  if (!profile?.is_premium || !purchase) {
    redirect("/checkout");
  }

  return (
    <main className="dashboard-frame">
      <section className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="eyebrow">Espace membre premium</div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-50">
            Bienvenue dans ton espace de formation
          </h1>
          <p className="mt-4 text-slate-300">
            Connecte avec {profile.email}. Ton acces premium est actif et l'ensemble du contenu
            est disponible immediatement.
          </p>
        </div>
        <form action="/auth/sign-out" method="post">
          <button className="button-ghost" type="submit">
            Deconnexion
          </button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-50">Compte</h2>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
              Premium actif
            </span>
          </div>
          <dl className="mt-5 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt>Email</dt>
              <dd className="font-medium text-slate-100">{profile.email}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt>Produit</dt>
              <dd className="font-medium text-slate-100">{purchase.product_name}</dd>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt>Paiement</dt>
              <dd className="font-medium text-slate-100">
                {(purchase.amount / 100).toFixed(2)} {purchase.currency.toUpperCase()}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="button" href={siteConfig.ebookUrl} target="_blank" rel="noreferrer">
              Telecharger l'ebook PDF
            </a>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
          <h2 className="text-xl font-semibold text-slate-50">Bonus inclus</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              CV pret a l'emploi
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Script pour trouver des clients
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Methodes concretes
            </li>
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Modules video</h2>
          <p>Les modules sont charges depuis Supabase et disponibles selon ton acces premium.</p>
        </div>
        <div className="grid gap-4">
          {modules.length ? (
            modules.map((module) => (
              <article
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow"
                key={module.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                        Module {module.position}
                      </p>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                        Debloque
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-slate-50">{module.title}</h3>
                    <p className="mt-3 text-slate-300">{module.description}</p>
                  </div>
                  <a
                    className="button-secondary"
                    href={module.video_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir la video
                  </a>
                </div>
              </article>
            ))
          ) : (
            <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
              <h3 className="text-xl font-semibold text-slate-50">Contenu en preparation</h3>
              <p className="mt-3 text-slate-300">
                Aucun module n'est publie pour le moment dans Supabase.
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <h3>Besoin de revenir a la landing page ?</h3>
          <div className="cta-row">
            <Link href="/" className="button-secondary">
              Voir la page de vente
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
