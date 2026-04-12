"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

const DEV_ACCOUNTS = [
  {
    label: "Admin",
    email: "admin.test@techcash-academy.com",
    password: "TechCash2026!",
    icon: "🧩",
    description: "is_premium · accès global",
    accentColor: "rgba(215,184,122,0.15)",
    borderColor: "rgba(215,184,122,0.35)"
  },
  {
    label: "Membre",
    email: "membre.test@techcash-academy.com",
    password: "TechCash2026!",
    icon: "👤",
    description: "2 formations achetées",
    accentColor: "rgba(56,199,147,0.12)",
    borderColor: "rgba(56,199,147,0.32)"
  }
] as const;

export function DevLogin() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  async function loginAs(email: string, password: string, label: string) {
    setLoading(label);
    setError(null);
    await supabase.auth.signOut();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(null);
      return;
    }
    router.push("/dashboard");
    router.refresh();
    setLoading(null);
  }

  async function logout() {
    setLoading("logout");
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setLoading(null);
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5rem",
        right: "1rem",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
      }}
    >
      {open && (
        <div
          style={{
            display: "grid",
            gap: "0.55rem",
            padding: "1rem",
            borderRadius: "20px",
            background: "rgba(6,9,20,0.97)",
            border: "1px solid rgba(215,184,122,0.22)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 28px 70px rgba(2,8,23,0.6)",
            minWidth: "220px"
          }}
        >
          <p
            style={{
              margin: "0 0 0.35rem",
              fontSize: "0.7rem",
              color: "rgba(162,176,198,0.7)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700
            }}
          >
            ⚡ Connexion rapide DEV
          </p>

          {DEV_ACCOUNTS.map((account) => (
            <button
              key={account.label}
              onClick={() => loginAs(account.email, account.password, account.label)}
              disabled={loading !== null}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.75rem 0.9rem",
                borderRadius: "14px",
                background: loading === account.label ? "rgba(255,255,255,0.06)" : account.accentColor,
                border: `1px solid ${account.borderColor}`,
                color: "#f8f5ee",
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: loading !== null ? "not-allowed" : "pointer",
                opacity: loading !== null && loading !== account.label ? 0.45 : 1,
                transition: "opacity 0.15s ease",
                width: "100%",
                textAlign: "left"
              }}
            >
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{account.icon}</span>
              <span style={{ flex: 1 }}>
                {loading === account.label ? "Connexion…" : account.label}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(162,176,198,0.75)",
                  fontWeight: 400
                }}
              >
                {account.description}
              </span>
            </button>
          ))}

          <div
            style={{
              height: "1px",
              background: "rgba(148,163,184,0.1)",
              margin: "0.1rem 0"
            }}
          />

          <button
            onClick={logout}
            disabled={loading !== null}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.65rem 0.9rem",
              borderRadius: "12px",
              background: "rgba(239,124,131,0.08)",
              border: "1px solid rgba(239,124,131,0.2)",
              color: "#fca5a5",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: loading !== null ? "not-allowed" : "pointer",
              opacity: loading === "logout" ? 0.6 : 1,
              width: "100%",
              textAlign: "left"
            }}
          >
            <span>🚪</span>
            <span>{loading === "logout" ? "Déconnexion…" : "Déconnexion"}</span>
          </button>

          {error && (
            <p
              style={{
                margin: "0.2rem 0 0",
                fontSize: "0.75rem",
                color: "#fca5a5",
                padding: "0.5rem 0.75rem",
                borderRadius: "10px",
                background: "rgba(239,124,131,0.1)",
                border: "1px solid rgba(239,124,131,0.2)"
              }}
            >
              {error}
            </p>
          )}

          <p
            style={{
              margin: "0.2rem 0 0",
              fontSize: "0.69rem",
              color: "rgba(162,176,198,0.45)",
              textAlign: "center",
              letterSpacing: "0.02em"
            }}
          >
            mdp : TechCash2026!
          </p>
        </div>
      )}

      <button
        onClick={() => { setOpen((v) => !v); setError(null); }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.5rem 0.85rem",
          borderRadius: "999px",
          background: open ? "rgba(239,124,131,0.14)" : "rgba(215,184,122,0.14)",
          border: open ? "1px solid rgba(239,124,131,0.32)" : "1px solid rgba(215,184,122,0.32)",
          color: open ? "#fca5a5" : "#f0d6a0",
          fontSize: "0.75rem",
          fontWeight: 800,
          cursor: "pointer",
          letterSpacing: "0.08em",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(2,8,23,0.45)",
          transition: "all 0.15s ease"
        }}
      >
        <span>{open ? "✕" : "⚡"}</span>
        <span>DEV</span>
      </button>
    </div>
  );
}
