"use client";

import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Props = {
  email: string;
  enrolledFactorId: string | null;
};

type PanelStep = "idle" | "enrolling" | "verifying" | "success" | "unenrolling";

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

    // Create a challenge immediately so the user can verify right away
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
      setError("Impossible de désactiver la 2FA. Tu dois peut-être te reconnecter d'abord.");
      setLoading(false);
      return;
    }

    setFactorId(null);
    setEnrollData(null);
    setVerifyCode("");
    setStep("idle");
    setLoading(false);
  }

  // 2FA already enrolled and active
  if (factorId && step !== "success") {
    return (
      <div style={{ maxWidth: 560 }}>
        <article className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span
              style={{
                display: "inline-flex",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(52, 211, 153, 0.12)",
                border: "1.5px solid #34d399",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                flexShrink: 0
              }}
            >
              ✓
            </span>
            <div>
              <strong>Double authentification activée</strong>
              <p className="helper" style={{ margin: 0 }}>
                Ton compte est protégé. Un code TOTP est requis à chaque connexion.
              </p>
            </div>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "0.75rem 1rem",
              marginBottom: "1rem"
            }}
          >
            <p className="helper" style={{ margin: "0 0 0.25rem" }}>Application requise</p>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              Google Authenticator, Authy, 1Password ou toute app compatible TOTP.
            </p>
          </div>

          {error ? <div className="message error" style={{ marginBottom: "1rem" }}>{error}</div> : null}

          {step === "unenrolling" ? (
            <div>
              <div className="message" style={{ background: "rgba(248, 113, 113, 0.08)", border: "1px solid rgba(248, 113, 113, 0.3)", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                <strong>Désactiver la 2FA ?</strong>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem" }}>
                  Ton compte sera moins sécurisé. Confirme pour continuer.
                </p>
              </div>
              <div className="cta-row">
                <button
                  className="button"
                  style={{ background: "rgba(248, 113, 113, 0.15)", color: "#f87171", border: "1px solid rgba(248, 113, 113, 0.4)" }}
                  onClick={handleUnenroll}
                  disabled={loading}
                >
                  {loading ? "Désactivation…" : "Confirmer la désactivation"}
                </button>
                <button
                  className="button-ghost"
                  onClick={() => { setStep("idle"); setError(""); }}
                  disabled={loading}
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <button
              className="button-ghost"
              style={{ fontSize: "0.875rem", color: "var(--muted)" }}
              onClick={() => setStep("unenrolling")}
              disabled={loading}
            >
              Désactiver la double authentification
            </button>
          )}
        </article>
      </div>
    );
  }

  // After successful enrollment
  if (step === "success") {
    return (
      <div style={{ maxWidth: 560 }}>
        <article className="card">
          <div style={{ textAlign: "center", padding: "1.5rem 0 1rem" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(52, 211, 153, 0.12)",
                border: "2px solid #34d399",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.5rem"
              }}
            >
              ✓
            </div>
            <h2 style={{ margin: "0 0 0.5rem" }}>2FA activée avec succès !</h2>
            <p style={{ color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
              Ton compte est maintenant protégé. À chaque connexion, tu devras entrer le code
              à 6 chiffres de ton application d&apos;authentification.
            </p>
            <a href="/dashboard" className="button">
              Retour au dashboard
            </a>
          </div>
        </article>
      </div>
    );
  }

  // Enrolling — show QR code
  if (step === "enrolling" && enrollData) {
    return (
      <div style={{ maxWidth: 560 }}>
        <article className="card">
          <h2 style={{ margin: "0 0 0.5rem" }}>Scanne le QR code</h2>
          <p style={{ color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
            Ouvre ton application d&apos;authentification (Google Authenticator, Authy…) et
            scanne ce QR code. Ensuite, entre le code à 6 chiffres affiché pour confirmer.
          </p>

          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.5rem",
              maxWidth: 200,
              margin: "0 auto 1.5rem"
            }}
          >
            {/* Supabase returns totp.qr_code as a data URL SVG */}
            <img
              src={enrollData.qrCode}
              alt="QR code pour scanner avec votre application 2FA"
              style={{ width: 160, height: 160, display: "block" }}
            />
          </div>

          <details style={{ marginBottom: "1.5rem" }}>
            <summary
              style={{
                cursor: "pointer",
                color: "var(--muted)",
                fontSize: "0.875rem",
                userSelect: "none"
              }}
            >
              Je ne peux pas scanner le QR code — voir la clé manuelle
            </summary>
            <div
              style={{
                marginTop: "0.75rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "0.75rem 1rem"
              }}
            >
              <p className="helper" style={{ margin: "0 0 0.5rem" }}>Clé secrète</p>
              <code
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  wordBreak: "break-all",
                  color: "var(--foreground)"
                }}
              >
                {enrollData.secret}
              </code>
            </div>
          </details>

          {error ? <div className="message error" style={{ marginBottom: "1rem" }}>{error}</div> : null}

          <form onSubmit={handleVerify}>
            <div className="field">
              <label htmlFor="verify-code">Code à 6 chiffres</label>
              <input
                id="verify-code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                autoComplete="one-time-code"
                placeholder="000000"
                disabled={loading}
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ""))}
                required
                style={{ fontSize: "1.5rem", letterSpacing: "0.3em", textAlign: "center" }}
              />
            </div>

            <div className="cta-row">
              <button
                className="button"
                type="submit"
                disabled={loading || verifyCode.length !== 6}
                aria-busy={loading}
              >
                {loading ? "Vérification…" : "Activer la 2FA"}
              </button>
              <button
                type="button"
                className="button-ghost"
                onClick={() => {
                  setStep("idle");
                  setEnrollData(null);
                  setVerifyCode("");
                  setError("");
                }}
                disabled={loading}
              >
                Annuler
              </button>
            </div>
          </form>
        </article>
      </div>
    );
  }

  // Default — no 2FA enrolled
  return (
    <div style={{ maxWidth: 560 }}>
      <article className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <span
            style={{
              display: "inline-flex",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0
            }}
          >
            🔒
          </span>
          <div>
            <strong>Double authentification désactivée</strong>
            <p className="helper" style={{ margin: 0 }}>
              Ton compte est protégé uniquement par ton mot de passe.
            </p>
          </div>
        </div>

        <p style={{ color: "var(--muted)", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
          La double authentification (2FA) ajoute une couche de sécurité supplémentaire. Même
          si ton mot de passe est compromis, personne ne pourra accéder à ton compte sans le
          code de ton application.
        </p>

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem"
          }}
        >
          <p className="helper" style={{ margin: "0 0 0.25rem" }}>Applications compatibles</p>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Google Authenticator, Authy, 1Password, Bitwarden, Microsoft Authenticator
          </p>
        </div>

        {error ? <div className="message error" style={{ marginBottom: "1rem" }}>{error}</div> : null}

        <button className="button" onClick={handleEnroll} disabled={loading} aria-busy={loading}>
          {loading ? "Initialisation…" : "Activer la double authentification"}
        </button>
      </article>

      <article className="card">
        <h3 style={{ margin: "0 0 0.5rem" }}>Informations du compte</h3>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "0.75rem 1rem"
          }}
        >
          <p className="helper" style={{ margin: "0 0 0.25rem" }}>Adresse email</p>
          <p style={{ margin: 0 }}>{email}</p>
        </div>
      </article>
    </div>
  );
}
