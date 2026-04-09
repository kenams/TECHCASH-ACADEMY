"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resent, setResent] = useState(false);

  return (
    <main className="auth-wrap-split">
      <div className="auth-side-brand">
        <Link href="/" className="brand">
          {siteConfig.brand}
        </Link>
        <div className="stack">
          <h2 style={{ margin: 0, fontSize: "1.6rem", lineHeight: 1.2 }}>
            Vérifie ta boîte mail
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
            Un email de confirmation a été envoyé à ton adresse. Clique sur le lien pour activer
            ton compte et accéder à l&apos;espace membre.
          </p>
          <div className="confidence-list">
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Lien valide 24h</strong>
                <p>Le lien de confirmation expire après 24 heures.</p>
              </div>
            </div>
            <div className="confidence-item">
              <span className="confidence-dot" />
              <div>
                <strong>Vérifie les spams</strong>
                <p>L&apos;email peut parfois atterrir dans les courriers indésirables.</p>
              </div>
            </div>
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

          <div style={{ textAlign: "center", padding: "2rem 0 1.5rem" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "var(--surface)",
                border: "2px solid var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "1.75rem"
              }}
            >
              ✉
            </div>
            <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.75rem" }}>Email envoyé !</h1>
            <p style={{ color: "var(--muted)", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
              {email ? (
                <>
                  Un lien de confirmation a été envoyé à{" "}
                  <strong style={{ color: "var(--foreground)" }}>{email}</strong>.
                </>
              ) : (
                "Un lien de confirmation a été envoyé à ton adresse email."
              )}
              <br />
              Clique sur ce lien pour activer ton compte.
            </p>
          </div>

          <div className="message" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "1rem", marginBottom: "1.5rem" }}>
            <strong>Que faire maintenant ?</strong>
            <ol style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", lineHeight: 1.8 }}>
              <li>Ouvre ta boîte mail</li>
              <li>Cherche un email de <strong>{siteConfig.brand}</strong></li>
              <li>Clique sur le bouton &quot;Confirmer mon email&quot;</li>
              <li>Tu seras automatiquement connecté</li>
            </ol>
          </div>

          {resent ? (
            <div className="message success">
              Nouveau lien envoyé. Vérifie ta boîte mail.
            </div>
          ) : null}

          <div className="cta-row" style={{ flexDirection: "column", gap: "0.75rem" }}>
            <Link href={`/login${email ? `?email=${encodeURIComponent(email)}` : ""}`} className="button button-full">
              Aller à la connexion
            </Link>
            <Link href="/register" className="button-secondary button-full" style={{ textAlign: "center", display: "block" }}>
              Créer un autre compte
            </Link>
          </div>

          <p className="helper" style={{ textAlign: "center", marginTop: "1.5rem" }}>
            Tu n&apos;as pas reçu l&apos;email ?{" "}
            <button
              className="muted-link"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontWeight: 600, fontSize: "inherit", padding: 0 }}
              onClick={() => setResent(true)}
            >
              Contacte le support
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
