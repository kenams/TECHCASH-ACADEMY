import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { SecurityPanel } from "./security-panel";

export const metadata: Metadata = {
  title: "Sécurité | TechCash Academy",
  description: "Gérez la double authentification et la sécurité de ton compte."
};

export default async function SecuritePage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard/securite");
  }

  const { data: factorsData } = await supabase.auth.mfa.listFactors();
  const enrolledTotp = factorsData?.totp?.find((f) => f.status === "verified") ?? null;

  return (
    <main className="dashboard-frame">
      <section className="dashboard-hero">
        <div>
          <div className="eyebrow">Espace membre</div>
          <h1>Sécurité du compte</h1>
          <p className="lead">
            Protège ton compte avec la double authentification (2FA). Une fois activée, un code
            de ton application sera requis à chaque connexion.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="dashboard-nav-grid" style={{ marginBottom: "2.5rem" }}>
          <a href="/dashboard" className="dashboard-nav-link">Vue d&apos;ensemble</a>
          <a href="/dashboard/mes-formations" className="dashboard-nav-link">Mes formations</a>
          <a href="/formations" className="dashboard-nav-link">Catalogue complet</a>
          <a href="/dashboard/securite" className="dashboard-nav-link dashboard-nav-link-active">Sécurité</a>
        </div>

        <SecurityPanel
          email={user.email ?? ""}
          enrolledFactorId={enrolledTotp?.id ?? null}
        />
      </section>
    </main>
  );
}
