"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  function validatePasswords() {
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setError("");
      setMessage("");

      if (!validatePasswords()) return;

      setLoading(true);

      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const registerData = (await registerResponse.json()) as {
        error?: string;
        requiresEmailConfirmation?: boolean;
      };

      if (!registerResponse.ok) {
        setError(registerData.error || "Impossible de créer le compte.");
        setLoading(false);
        return;
      }

      if (registerData.requiresEmailConfirmation) {
        const verifyHref = `/auth/verify-email?email=${encodeURIComponent(email)}`;
        router.push(verifyHref);
        return;
      }

      setMessage("Compte créé. Redirection en cours…");
      setLoading(false);
      router.push(redirectTarget);
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
                <p>Ton espace membre est actif dès la validation de ton email.</p>
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
            <span className="trust-pill">Email vérifié</span>
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                minLength={8}
                autoComplete="new-password"
                placeholder="Minimum 8 caractères"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="confirm-password">Confirmer le mot de passe</label>
              <input
                id="confirm-password"
                type="password"
                minLength={8}
                autoComplete="new-password"
                placeholder="Répète ton mot de passe"
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword && password !== confirmPassword ? (
                <p className="helper" style={{ color: "var(--error, #f87171)", marginTop: "0.35rem" }}>
                  Les mots de passe ne correspondent pas.
                </p>
              ) : confirmPassword && password === confirmPassword ? (
                <p className="helper" style={{ color: "var(--success, #34d399)", marginTop: "0.35rem" }}>
                  Les mots de passe correspondent.
                </p>
              ) : null}
            </div>

            <button
              className="button button-full"
              type="submit"
              disabled={loading || (confirmPassword.length > 0 && password !== confirmPassword)}
              aria-busy={loading}
            >
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
