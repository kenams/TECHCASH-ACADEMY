"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { Input } from "@/components/ui/Input";

type Props = {
  email: string;
  enrolledFactorId: string | null;
};

type PanelStep = "idle" | "enrolling" | "success" | "unenrolling";

type EnrollData = {
  factorId: string;
  qrCode: string;
  secret: string;
  challengeId: string;
};

export function SecurityPanel({ email, enrolledFactorId }: Props) {
  const supabase = getSupabaseBrowserClient();

  const [step, setStep] = useState<PanelStep>("idle");
  const [enrollData, setEnrollData] = useState<EnrollData | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(enrolledFactorId);

  async function handleEnroll() {
    setLoading(true);
    setError("");

    const { data, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: `TechCash Academy — ${email}`
    });

    if (enrollError || !data) {
      setError("Impossible de démarrer l'activation 2FA. Réessaie.");
      setLoading(false);
      return;
    }

    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: data.id
    });

    if (challengeError || !challengeData) {
      setError("Erreur lors de la création du défi 2FA.");
      setLoading(false);
      return;
    }

    setEnrollData({
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      challengeId: challengeData.id
    });
    setStep("enrolling");
    setLoading(false);
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enrollData) return;

    setLoading(true);
    setError("");

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: enrollData.factorId,
      challengeId: enrollData.challengeId,
      code: verifyCode.trim()
    });

    if (verifyError) {
      setError("Code invalide. Vérifie ton application d'authentification et réessaie.");
      setVerifyCode("");
      setLoading(false);
      return;
    }

    setFactorId(enrollData.factorId);
    setStep("success");
    setLoading(false);
  }

  async function handleUnenroll() {
    if (!factorId) return;

    setLoading(true);
    setError("");

    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId });

    if (unenrollError) {
      setError("Impossible de désactiver la 2FA. Reconnecte-toi puis réessaie.");
      setLoading(false);
      return;
    }

    setFactorId(null);
    setEnrollData(null);
    setVerifyCode("");
    setStep("idle");
    setLoading(false);
  }

  if (step === "success") {
    return (
      <GlowCard className="grid max-w-2xl gap-6 p-8 text-center" glowColor="emerald">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(56,199,147,0.28)] bg-[rgba(56,199,147,0.14)] text-2xl text-[#bbf7d0]">
          ✓
        </div>
        <div className="grid gap-2">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Double authentification activée
          </h2>
          <p className="text-base leading-8 text-[var(--muted)]">
            Ton compte est maintenant protégé. À chaque connexion, un code à 6 chiffres sera demandé.
          </p>
        </div>
        <div className="flex justify-center">
          <a href="/dashboard" className="button">
            Retour au tableau de bord
          </a>
        </div>
      </GlowCard>
    );
  }

  if (step === "enrolling" && enrollData) {
    return (
      <GlowCard className="grid max-w-2xl gap-6 p-8">
        <div className="grid gap-3">
          <Badge variant="primary" className="w-fit">
            Configuration 2FA
          </Badge>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">Scanne le QR code</h2>
          <p className="text-base leading-8 text-[var(--muted)]">
            Ouvre ton application d'authentification, scanne ce QR code puis saisis le code affiché pour confirmer l'activation.
          </p>
        </div>

        <div className="mx-auto rounded-[24px] bg-white p-4 shadow-[0_20px_40px_rgba(2,8,23,0.24)]">
          <img src={enrollData.qrCode} alt="QR code pour l'activation de la double authentification" className="h-44 w-44" />
        </div>

        <details className="rounded-[20px] border border-[var(--border)] bg-white/5 p-4 text-sm text-[var(--muted)]">
          <summary className="cursor-pointer font-medium text-[var(--foreground)]">Je ne peux pas scanner le QR code</summary>
          <div className="mt-3 grid gap-2">
            <p>Entre cette clé manuelle dans ton application&nbsp;:</p>
            <code className="break-all rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-[var(--foreground)]">
              {enrollData.secret}
            </code>
          </div>
        </details>

        {error ? (
          <div className="rounded-2xl border border-[rgba(239,124,131,0.32)] bg-[rgba(239,124,131,0.12)] px-4 py-3 text-sm text-[#fecaca]">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleVerify} className="grid gap-5">
          <Input
            label="Code à 6 chiffres"
            id="verify-code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoComplete="one-time-code"
            value={verifyCode}
            onChange={(event) => setVerifyCode(event.target.value.replace(/\D/g, ""))}
            disabled={loading}
            className="text-center text-xl tracking-[0.45em]"
          />

          <div className="flex flex-wrap gap-3">
            <Button type="submit" loading={loading} disabled={verifyCode.length !== 6}>
              Activer la 2FA
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setStep("idle");
                setEnrollData(null);
                setVerifyCode("");
                setError("");
              }}
            >
              Annuler
            </Button>
          </div>
        </form>
      </GlowCard>
    );
  }

  if (factorId) {
    return (
      <GlowCard className="grid max-w-2xl gap-6 p-8" glowColor="emerald">
        <div className="grid gap-3">
          <Badge variant="success" className="w-fit">
            Protection active
          </Badge>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Double authentification activée
          </h2>
          <p className="text-base leading-8 text-[var(--muted)]">
            Ton compte est protégé. Un code TOTP est requis à chaque connexion.
          </p>
        </div>

        <div className="rounded-[20px] border border-[var(--border)] bg-white/5 p-5">
          <p className="text-sm text-[var(--muted)]">Applications compatibles</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
            Google Authenticator, Authy, 1Password, Bitwarden, Microsoft Authenticator.
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-[rgba(239,124,131,0.32)] bg-[rgba(239,124,131,0.12)] px-4 py-3 text-sm text-[#fecaca]">
            {error}
          </div>
        ) : null}

        {step === "unenrolling" ? (
          <div className="grid gap-4 rounded-[20px] border border-[rgba(239,124,131,0.3)] bg-[rgba(239,124,131,0.08)] p-5">
            <div className="grid gap-2">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Désactiver la 2FA&nbsp;?</h3>
              <p className="text-sm leading-7 text-[var(--muted)]">
                Ton compte sera moins sécurisé. Confirme seulement si c'est bien intentionnel.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" loading={loading} onClick={handleUnenroll}>
                Confirmer la désactivation
              </Button>
              <Button type="button" variant="ghost" onClick={() => setStep("idle")}>
                Annuler
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="ghost" onClick={() => setStep("unenrolling")} className="justify-start">
            Désactiver la double authentification
          </Button>
        )}
      </GlowCard>
    );
  }

  return (
    <div className="grid max-w-2xl gap-6">
      <GlowCard className="grid gap-6 p-8">
        <div className="grid gap-3">
          <Badge variant="muted" className="w-fit">
            2FA inactive
          </Badge>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Active une couche de sécurité supplémentaire
          </h2>
          <p className="text-base leading-8 text-[var(--muted)]">
            Même si ton mot de passe est compromis, personne ne pourra accéder à ton compte sans le code généré par ton application.
          </p>
        </div>

        <div className="rounded-[20px] border border-[var(--border)] bg-white/5 p-5">
          <p className="text-sm text-[var(--muted)]">Applications compatibles</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
            Google Authenticator, Authy, 1Password, Bitwarden, Microsoft Authenticator.
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-[rgba(239,124,131,0.32)] bg-[rgba(239,124,131,0.12)] px-4 py-3 text-sm text-[#fecaca]">
            {error}
          </div>
        ) : null}

        <Button type="button" loading={loading} onClick={handleEnroll} className="w-fit">
          Activer la double authentification
        </Button>
      </GlowCard>

      <GlowCard className="grid gap-3 p-6" glowColor="none">
        <p className="text-sm text-[var(--muted)]">Compte concerné</p>
        <p className="text-base text-[var(--foreground)]">{email}</p>
      </GlowCard>
    </div>
  );
}
