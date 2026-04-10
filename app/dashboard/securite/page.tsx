import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { SecurityPanel } from "./security-panel";

export const metadata: Metadata = {
  title: "Sécurité | TechCash Academy",
  description: "Gère la double authentification et la sécurité de ton compte."
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
    <div className="grid gap-8">
      <AnimatedSection className="grid gap-5">
        <Badge variant="primary">Sécurité du compte</Badge>
        <GlowCard className="grid gap-4 p-8">
          <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
            Protège ton accès membre
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
            Active la double authentification 2FA pour renforcer la sécurité de ton compte et garder un accès propre à tes formations.
          </p>
        </GlowCard>
      </AnimatedSection>

      <AnimatedSection delay={80}>
        <SecurityPanel email={user.email ?? ""} enrolledFactorId={enrolledTotp?.id ?? null} />
      </AnimatedSection>
    </div>
  );
}
