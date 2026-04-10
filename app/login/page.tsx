"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  useEffect(() => {
    if (!errorParam) return;

    if (errorParam === "email_confirmation") {
      setError("Ton e-mail doit être confirmé avant la connexion.");
      return;
    }

    setError("Une action de sécurité est nécessaire avant de continuer.");
  }, [errorParam]);

  async function syncProfileAndRedirect(accessToken: string | undefined) {
    const syncResponse = await fetch("/api/auth/sync-profile", {
      method: "POST",
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
    });

    if (!syncResponse.ok) {
      const syncData = (await syncResponse.json()) as { error?: string };
      setError(syncData.error || "Connexion réussie, mais le profil n'a pas pu être synchronisé.");
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
          setError("Ton e-mail n'est pas encore confirmé. Vérifie ta boîte mail.");
        } else {
          setError("E-mail ou mot de passe incorrect.");
        }
        setLoading(false);
        return;
      }

      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aalData?.nextLevel === "aal2" && aalData.currentLevel !== "aal2") {
        const { data: factorsData } = await supabase.auth.mfa.listFactors();
        const totpFactor = factorsData?.totp?.[0];

        if (totpFactor) {
          const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
            factorId: totpFactor.id
          });

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
    <AuthShell
      eyebrow={step === "mfa" ? "Vérification 2FA" : "Connexion membre"}
      title={step === "mfa" ? "Double authentification" : "Bon retour"}
      subtitle={
        step === "mfa"
          ? "Entre le code à 6 chiffres généré par ton application d'authentification pour ouvrir ton espace membre."
          : "Accède à tes formations, ton tableau de bord et tes ressources sans friction."
      }
      helper={
        step === "credentials" ? (
          <div className="rounded-[24px] border border-[rgba(120,119,198,0.24)] bg-[linear-gradient(135deg,rgba(120,119,198,0.12),rgba(215,184,122,0.08))] p-5 text-left">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <Badge variant="primary">Sécurité du compte</Badge>
              <span className="text-sm text-[var(--foreground)]">2FA disponible</span>
            </div>
            <div className="grid gap-2 text-sm leading-7 text-[var(--muted)]">
              <p>
                Si la double authentification est activée sur ton compte, un second écran te demandera ton code juste après le mot de passe.
              </p>
              <p>
                Tu peux l'activer ensuite depuis <span className="text-[var(--foreground)]">Mon espace &gt; Sécurité 2FA</span>.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-[24px] border border-[rgba(120,119,198,0.24)] bg-[rgba(120,119,198,0.08)] p-5 text-left text-sm leading-7 text-[var(--muted)]">
            Utilise le code généré par Google Authenticator, Authy, 1Password, Bitwarden ou Microsoft Authenticator.
          </div>
        )
      }
      footer={
        step === "mfa" ? (
          <button
            type="button"
            onClick={() => {
              setStep("credentials");
              setMfaCode("");
              setMfaState(null);
              setError("");
            }}
            className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
          >
            Retour à la connexion
          </button>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Pas encore de compte&nbsp;?{" "}
            <Link href={registerHref} className="text-[var(--accent)] transition-colors duration-200 hover:text-[var(--foreground)]">
              Créer mon accès&nbsp;→
            </Link>
          </p>
        )
      }
    >
      {error ? (
        <div className="mb-5 rounded-2xl border border-[rgba(239,124,131,0.32)] bg-[rgba(239,124,131,0.12)] px-4 py-3 text-sm text-[#fecaca]">
          {error}
        </div>
      ) : null}

      {step === "mfa" ? (
        <form className="grid gap-5" onSubmit={handleMfaSubmit}>
          <Input
            ref={mfaInputRef}
            label="Code à 6 chiffres"
            id="mfa-code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoComplete="one-time-code"
            value={mfaCode}
            onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, ""))}
            disabled={loading}
            className="text-center text-xl tracking-[0.45em]"
          />

          <Button type="submit" loading={loading} disabled={mfaCode.length !== 6} className="w-full">
            Valider le code
          </Button>
        </form>
      ) : (
        <form className="grid gap-5" onSubmit={handleCredentialsSubmit}>
          <Input
            label="Adresse e-mail"
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
          />

          <div className="grid gap-2">
            <Input
              label="Mot de passe"
              id="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setPasswordVisible((value) => !value)}
                  className="text-xs font-medium text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                  aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {passwordVisible ? "Masquer" : "Afficher"}
                </button>
              }
            />
            <div className="flex justify-end">
              <a
                href={`mailto:${siteConfig.supportEmail}?subject=Réinitialisation de mot de passe`}
                className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
              >
                Mot de passe oublié&nbsp;?
              </a>
            </div>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Se connecter
          </Button>

          <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
            <span className="h-px flex-1 bg-[rgba(148,163,184,0.18)]" />
            <span>ou</span>
            <span className="h-px flex-1 bg-[rgba(148,163,184,0.18)]" />
          </div>
        </form>
      )}
    </AuthShell>
  );
}
