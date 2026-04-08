"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { siteConfig } from "@/lib/site";

function resolveRedirectTarget(nextParam: string | null, productParam: string | null) {
  if (nextParam?.startsWith("/")) {
    return nextParam;
  }

  if (productParam) {
    return `/checkout?product=${encodeURIComponent(productParam)}`;
  }

  return "/dashboard";
}

export default function LoginPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nextParam = searchParams.get("next")?.trim() || null;
  const productParam = searchParams.get("product")?.trim() || null;
  const redirectTarget = resolveRedirectTarget(nextParam, productParam);
  const registerHref = nextParam
    ? `/register?next=${encodeURIComponent(nextParam)}`
    : productParam
      ? `/register?product=${encodeURIComponent(productParam)}`
      : "/register";

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session) {
        router.replace(redirectTarget);
      }
    }

    void checkSession();
  }, [redirectTarget, router, supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      const syncResponse = await fetch("/api/auth/sync-profile", {
        method: "POST",
        headers: data.session?.access_token
          ? {
              Authorization: `Bearer ${data.session.access_token}`
            }
          : undefined
      });

      if (!syncResponse.ok) {
        const syncData = (await syncResponse.json()) as { error?: string };
        setError(syncData.error || "Connexion réussie mais profil introuvable.");
        setLoading(false);
        return;
      }

      router.push(redirectTarget);
    } catch (loginError) {
      console.error(loginError);
      setError("Une erreur est survenue pendant la connexion.");
      setLoading(false);
    }
  }

  return (
    <main className="auth-wrap-split">
      <div className="auth-side-brand">
        <Link href="/" className="brand">
          {siteConfig.brand}
        </Link>
        <div className="stack">
          <h2 style={{ margin: 0, fontSize: "1.6rem", lineHeight: 1.2 }}>
            Reprends là où tu t&apos;es arrêté
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
            Ton espace membre t&apos;attend avec toutes les formations que tu as débloquées.
          </p>
          <div className="confidence-list">
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Accès immédiat à tes formations</strong>
                <p>Retrouve tous tes modules et ressources disponibles.</p>
              </div>
            </div>
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Dashboard personnel</strong>
                <p>Un espace propre qui liste exactement ce que tu possèdes.</p>
              </div>
            </div>
          </div>
          <div className="trust-row" style={{ marginTop: "0.5rem" }}>
            <span className="trust-pill">Stripe sécurisé</span>
            <span className="trust-pill">Espace membre dédié</span>
          </div>
        </div>
      </div>

      <div className="auth-side-form">
        <div className="auth-form-inner">
          <Link
            href="/"
            className="brand"
            style={{ display: "block", marginBottom: "2rem", fontSize: "1rem" }}
          >
            ← {siteConfig.brand}
          </Link>

          <div className="eyebrow" style={{ marginBottom: "1rem" }}>
            Connexion membre
          </div>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.75rem" }}>Accède à ton espace</h1>
          <p style={{ color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
            Connecte-toi pour retrouver tes formations, tes ressources et ton accès après achat.
          </p>

          {error ? <div className="message error">{error}</div> : null}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="toi@exemple.com"
                disabled={loading}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                disabled={loading}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button className="button button-full" type="submit" disabled={loading} aria-busy={loading}>
              {loading ? "Connexion en cours…" : "Se connecter"}
            </button>
          </form>

          <div className="divider">ou</div>

          <p className="helper" style={{ textAlign: "center" }}>
            Pas encore de compte ?{" "}
            <Link
              className="muted-link"
              href={registerHref}
              style={{ color: "var(--accent)", fontWeight: 600 }}
            >
              Créer un compte gratuit
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
