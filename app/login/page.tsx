"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
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

type Step = "credentials" | "mfa";

type MfaState = {
  factorId: string;
  challengeId: string;
};

export default function LoginPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaState, setMfaState] = useState<MfaState | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mfaInputRef = useRef<HTMLInputElement>(null);

  const nextParam = searchParams.get("next")?.trim() || null;
  const productParam = searchParams.get("product")?.trim() || null;
  const errorParam = searchParams.get("error");
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

  useEffect(() => {
    if (step === "mfa" && mfaInputRef.current) {
      mfaInputRef.current.focus();
    }
  }, [step]);

  async function syncProfileAndRedirect(accessToken: string | undefined) {
    const syncResponse = await fetch("/api/auth/sync-profile", {
      method: "POST",
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
    });

    if (!syncResponse.ok) {
      const syncData = (await syncResponse.json()) as { error?: string };
      setError(syncData.error || "Connexion réussie mais profil introuvable.");
      setLoading(false);
      return;
    }

    router.push(redirectTarget);
  }

  async function handleCredentialsSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        if (signInError.message.toLowerCase().includes("email not confirmed")) {
          setError(
            "Ton email n'est pas encore confirmé. Vérifie ta boîte mail et clique sur le lien de confirmation."
          );
        } else {
          setError("Email ou mot de passe incorrect.");
        }
        setLoading(false);
        return;
      }

      // Check if MFA is required
      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aalData?.nextLevel === "aal2" && aalData.currentLevel !== "aal2") {
        const { data: factorsData } = await supabase.auth.mfa.listFactors();
        const totpFactor = factorsData?.totp?.[0];

        if (totpFactor) {
          const { data: challengeData, error: challengeError } =
            await supabase.auth.mfa.challenge({ factorId: totpFactor.id });

          if (challengeError || !challengeData) {
            setError("Impossible de démarrer la vérification 2FA. Réessaie.");
            setLoading(false);
            return;
          }

          setMfaState({ factorId: totpFactor.id, challengeId: challengeData.id });
          setStep("mfa");
          setLoading(false);
          return;
        }
      }

      await syncProfileAndRedirect(data.session?.access_token);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue pendant la connexion.");
      setLoading(false);
    }
  }

  async function handleMfaSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      if (!mfaState) return;

      setLoading(true);
      setError("");

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: mfaState.factorId,
        challengeId: mfaState.challengeId,
        code: mfaCode.trim()
      });

      if (verifyError) {
        setError("Code invalide. Vérifie ton application d'authentification et réessaie.");
        setMfaCode("");
        setLoading(false);
        return;
      }

      const {
        data: { session }
      } = await supabase.auth.getSession();
      await syncProfileAndRedirect(session?.access_token);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue pendant la vérification 2FA.");
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
          {step === "mfa" ? (
            <>
              <h2 style={{ margin: 0, fontSize: "1.6rem", lineHeight: 1.2 }}>
                Double authentification
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
                Ton compte est protégé par une double authentification. Ouvre ton application
                d&apos;authentification (Google Authenticator, Authy…) et entre le code à 6
                chiffres affiché.
              </p>
              <div className="confidence-list">
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Code valide 30 secondes</strong>
                    <p>Le code change toutes les 30 secondes. Utilise le code actuel.</p>
                  </div>
                </div>
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Application requise</strong>
                    <p>Google Authenticator, Authy ou toute app compatible TOTP.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
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

          {step === "mfa" ? (
            <>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>
                Vérification 2FA
              </div>
              <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.75rem" }}>
                Entre ton code d&apos;authentification
              </h1>
              <p style={{ color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
                Ouvre ton application d&apos;authentification et entre le code à 6 chiffres.
              </p>

              {error ? <div className="message error">{error}</div> : null}

              <form onSubmit={handleMfaSubmit}>
                <div className="field">
                  <label htmlFor="mfa-code">Code à 6 chiffres</label>
                  <input
                    id="mfa-code"
                    ref={mfaInputRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    autoComplete="one-time-code"
                    placeholder="000000"
                    disabled={loading}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                    required
                    style={{ fontSize: "1.5rem", letterSpacing: "0.3em", textAlign: "center" }}
                  />
                </div>

                <button
                  className="button button-full"
                  type="submit"
                  disabled={loading || mfaCode.length !== 6}
                  aria-busy={loading}
                >
                  {loading ? "Vérification…" : "Valider le code"}
                </button>
              </form>

              <p className="helper" style={{ textAlign: "center", marginTop: "1rem" }}>
                <button
                  className="muted-link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                    fontSize: "inherit",
                    padding: 0
                  }}
                  onClick={() => {
                    setStep("credentials");
                    setMfaState(null);
                    setMfaCode("");
                    setError("");
                  }}
                >
                  ← Retour à la connexion
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>
                Connexion membre
              </div>
              <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.75rem" }}>
                Accède à ton espace
              </h1>
              <p style={{ color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
                Connecte-toi pour retrouver tes formations, tes ressources et ton accès après
                achat.
              </p>

              {errorParam === "lien-invalide" && (
                <div className="message error">
                  Le lien de confirmation est invalide ou expiré. Crée un nouveau compte ou
                  contacte le support.
                </div>
              )}
              {error ? <div className="message error">{error}</div> : null}

              <form onSubmit={handleCredentialsSubmit}>
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
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="button button-full"
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                >
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}
