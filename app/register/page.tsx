"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { siteConfig } from "@/lib/site";

function resolveRedirectTarget(nextParam: string | null, productParam: string | null) {
  if (nextParam?.startsWith("/")) {
    return nextParam;
  }

  if (productParam) {
    return `/checkout?product=${encodeURIComponent(productParam)}`;
  }

  return "/formations";
}

export default function RegisterPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nextParam = searchParams.get("next")?.trim() || null;
  const productParam = searchParams.get("product")?.trim() || null;
  const redirectTarget = resolveRedirectTarget(nextParam, productParam);
  const loginHref = nextParam
    ? `/login?next=${encodeURIComponent(nextParam)}`
    : productParam
      ? `/login?product=${encodeURIComponent(productParam)}`
      : "/login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");
      setMessage("");

      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!registerResponse.ok) {
        const registerData = (await registerResponse.json()) as { error?: string };
        setError(registerData.error || "Impossible de créer le compte.");
        setLoading(false);
        return;
      }

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
        setError(syncData.error || "Compte créé mais profil introuvable.");
        setLoading(false);
        return;
      }

      if (data.session) {
        setMessage("Compte créé. Redirection en cours…");
        setLoading(false);
        router.push(redirectTarget);
        return;
      }

      setMessage("Compte créé. Connecte-toi pour continuer.");
      setLoading(false);
      router.push(loginHref);
    } catch (registerError) {
      console.error(registerError);
      setError("Une erreur est survenue pendant l'inscription.");
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
            Lance-toi avec une vraie base
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
            Crée ton compte gratuit et accède immédiatement au catalogue de formations pour
            monétiser tes compétences digitales.
          </p>
          <div className="confidence-list">
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Création instantanée</strong>
                <p>Ton espace membre est actif dès la validation.</p>
              </div>
            </div>
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Paiement sécurisé via Stripe</strong>
                <p>Achète uniquement les formations qui t&apos;intéressent.</p>
              </div>
            </div>
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Accès à vie par formation achetée</strong>
                <p>Reviens consulter ton contenu quand tu veux.</p>
              </div>
            </div>
          </div>
          <div className="trust-row" style={{ marginTop: "0.5rem" }}>
            <span className="trust-pill">Gratuit</span>
            <span className="trust-pill">Sans engagement</span>
            <span className="trust-pill">Accès immédiat</span>
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
            Création de compte
          </div>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.75rem" }}>Crée ton accès membre</h1>
          <p style={{ color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
            Gratuit. Ton compte te permettra d&apos;acheter et d&apos;accéder à tes formations
            directement.
          </p>

          {error ? <div className="message error">{error}</div> : null}
          {message ? <div className="message success">{message}</div> : null}

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
                minLength={6}
                autoComplete="new-password"
                placeholder="Minimum 6 caractères"
                disabled={loading}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button className="button button-full" type="submit" disabled={loading} aria-busy={loading}>
              {loading ? "Création en cours…" : "Créer mon compte"}
            </button>
          </form>

          <div className="divider">ou</div>

          <p className="helper" style={{ textAlign: "center" }}>
            Déjà inscrit ?{" "}
            <Link
              className="muted-link"
              href={loginHref}
              style={{ color: "var(--accent)", fontWeight: 600 }}
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
