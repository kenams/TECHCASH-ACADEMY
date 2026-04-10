"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
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

  const passwordChecks = useMemo(
    () => [
      password.length >= 8,
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ],
    [password]
  );
  const passwordStrength = passwordChecks.filter(Boolean).length;
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  function validatePasswords() {
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return false;
    }
    if (!acceptedTerms) {
      setError("Tu dois accepter les conditions d'utilisation.");
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
        router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
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
    <AuthShell
      eyebrow="Création de compte"
      title="Créer mon accès"
      subtitle="Rejoins TechCash Academy et commence à apprendre avec un espace membre propre dès la première connexion."
      helper={
        <div className="rounded-[24px] border border-[rgba(120,119,198,0.24)] bg-[rgba(120,119,198,0.08)] p-5 text-left">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Badge variant="muted">Sécurité</Badge>
            <span className="text-sm text-[var(--foreground)]">Activation 2FA ensuite</span>
          </div>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Une fois ton compte créé, tu pourras activer la double authentification depuis l'espace membre dans la section «&nbsp;Sécurité 2FA&nbsp;».
          </p>
        </div>
      }
      footer={
        <p className="text-sm text-[var(--muted)]">
          Déjà inscrit&nbsp;?{" "}
          <Link href={loginHref} className="text-[var(--accent)] transition-colors duration-200 hover:text-[var(--foreground)]">
            Se connecter&nbsp;→
          </Link>
        </p>
      }
    >
      {error ? (
        <div className="mb-5 rounded-2xl border border-[rgba(239,124,131,0.32)] bg-[rgba(239,124,131,0.12)] px-4 py-3 text-sm text-[#fecaca]">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="mb-5 rounded-2xl border border-[rgba(56,199,147,0.32)] bg-[rgba(56,199,147,0.12)] px-4 py-3 text-sm text-[#bbf7d0]">
          {message}
        </div>
      ) : null}

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <Input
          label="Adresse e-mail"
          id="register-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
        />

        <div className="grid gap-3">
          <Input
            label="Mot de passe"
            id="register-password"
            type={passwordVisible ? "text" : "password"}
            autoComplete="new-password"
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

          <div className="grid gap-2">
            <div className="grid grid-cols-4 gap-2">
              {passwordChecks.map((passed, index) => (
                <span
                  key={index}
                  className={[
                    "h-2 rounded-full transition-colors duration-200",
                    passwordStrength === 0
                      ? "bg-white/8"
                      : passed
                        ? passwordStrength <= 2
                          ? "bg-[#ef7c83]"
                          : passwordStrength === 3
                            ? "bg-[#f4b860]"
                            : "bg-[#38c793]"
                        : "bg-white/8"
                  ].join(" ")}
                />
              ))}
            </div>
            <p className="text-sm text-[var(--muted)]">
              Force du mot de passe&nbsp;:{" "}
              <span className="text-[var(--foreground)]">
                {passwordStrength <= 1
                  ? "faible"
                  : passwordStrength === 2
                    ? "correcte"
                    : passwordStrength === 3
                      ? "bonne"
                      : "forte"}
              </span>
            </p>
          </div>
        </div>

        <Input
          label="Confirmation du mot de passe"
          id="register-confirm-password"
          type={confirmVisible ? "text" : "password"}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          disabled={loading}
          error={confirmPassword.length > 0 && !passwordsMatch ? "Les mots de passe ne correspondent pas." : undefined}
          endAdornment={
            <button
              type="button"
              onClick={() => setConfirmVisible((value) => !value)}
              className="text-xs font-medium text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
              aria-label={confirmVisible ? "Masquer la confirmation" : "Afficher la confirmation"}
            >
              {confirmVisible ? "Masquer" : "Afficher"}
            </button>
          }
        />

        {passwordsMatch ? <p className="text-sm text-[#bbf7d0]">Les mots de passe correspondent.</p> : null}

        <label className="flex items-start gap-3 rounded-[20px] border border-[var(--border)] bg-white/5 px-4 py-4 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[var(--border)] bg-transparent accent-[var(--accent)]"
          />
          <span>
            J'accepte les{" "}
            <Link href="/conditions-utilisation" className="text-[var(--accent)] transition-colors duration-200 hover:text-[var(--foreground)]">
              conditions d'utilisation
            </Link>
            .
          </span>
        </label>

        <Button type="submit" loading={loading} className="w-full" disabled={confirmPassword.length > 0 && !passwordsMatch}>
          Créer mon accès
        </Button>
      </form>
    </AuthShell>
  );
}
