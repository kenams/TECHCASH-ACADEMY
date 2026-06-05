import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { userHasProductAccess } from "@/lib/access";
import { getUserModuleProgressRows, buildProductProgressSummary, getTrackableModules } from "@/lib/progress";
import { getProductWithModulesBySlug } from "@/lib/products";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ productSlug: string }> }
) {
  const { productSlug } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Non authentifié", { status: 401 });
  }

  const access = await userHasProductAccess(user.id, productSlug);
  if (!access.hasAccess) {
    return new Response("Accès refusé", { status: 403 });
  }

  const product = await getProductWithModulesBySlug(productSlug);
  if (!product) return new Response("Formation introuvable", { status: 404 });

  const rows = await getUserModuleProgressRows(user.id, productSlug);
  const summary = buildProductProgressSummary(productSlug, product.modules, rows);

  if (summary.percent < 100) {
    return new Response("Formation non complétée", { status: 400 });
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Apprenant";
  const completedDate = summary.lastCompletedAt
    ? new Date(summary.lastCompletedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "848px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0f1424 50%, #0a0a0f 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Bordure dorée */}
        <div style={{ position: "absolute", inset: "20px", border: "2px solid rgba(212,175,55,0.4)", borderRadius: "16px", display: "flex" }} />
        <div style={{ position: "absolute", inset: "26px", border: "1px solid rgba(212,175,55,0.15)", borderRadius: "12px", display: "flex" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #d4af37, #f0d060)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "24px", fontWeight: "900", color: "#0a0a0f" }}>T</span>
          </div>
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#d4af37", letterSpacing: "0.15em", textTransform: "uppercase" }}>TechCash Academy</span>
        </div>

        {/* Titre certificat */}
        <div style={{ fontSize: "13px", fontWeight: "400", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,175,55,0.7)", marginBottom: "20px", display: "flex" }}>
          Certificat de complétion
        </div>

        {/* Décoratif */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
          <div style={{ width: "80px", height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5))", display: "flex" }} />
          <span style={{ color: "#d4af37", fontSize: "22px" }}>✦</span>
          <div style={{ width: "80px", height: "1px", background: "linear-gradient(to left, transparent, rgba(212,175,55,0.5))", display: "flex" }} />
        </div>

        {/* Nom */}
        <div style={{ fontSize: "52px", fontWeight: "700", color: "#ffffff", marginBottom: "12px", textAlign: "center", display: "flex" }}>
          {userName}
        </div>

        <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginBottom: "32px", display: "flex" }}>
          a complété avec succès la formation
        </div>

        {/* Nom formation */}
        <div style={{
          fontSize: "30px", fontWeight: "700", color: "#d4af37",
          textAlign: "center", marginBottom: "32px",
          background: "rgba(212,175,55,0.08)",
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: "12px", padding: "16px 32px", display: "flex"
        }}>
          {product.title}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "48px", marginBottom: "40px" }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff" }}>{summary.completedModules}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>modules</span>
          </div>
          <div style={{ width: "1px", background: "rgba(212,175,55,0.2)", display: "flex" }} />
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "28px", fontWeight: "700", color: "#d4af37" }}>100%</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>complétion</span>
          </div>
          <div style={{ width: "1px", background: "rgba(212,175,55,0.2)", display: "flex" }} />
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>{completedDate}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>date</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", display: "flex" }}>
          techcash-academy.vercel.app · Formation certifiée
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 848,
    }
  );
}
