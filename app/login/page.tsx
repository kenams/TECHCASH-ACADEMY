"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard");
      }
    }

    void checkSession();
  }, [router, supabase]);

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
        setError(syncData.error || "Connexion reussie mais profil introuvable.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (loginError) {
      console.error(loginError);
      setError("Une erreur est survenue pendant la connexion.");
      setLoading(false);
    }
  }

  return (
    <main className="auth-wrap">
      <section className="auth-card">
        <p className="eyebrow">Connexion membre</p>
        <h1>Accede a ton espace de formation</h1>
        <p>Connecte-toi pour retrouver ton ebook, tes videos et ton acces apres achat.</p>

        {error ? <div className="message error">{error}</div> : null}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
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
              disabled={loading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="button" type="submit" disabled={loading} aria-busy={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="helper">
          Pas encore de compte ?{" "}
          <Link className="muted-link" href="/register">
            Creer un compte
          </Link>
        </p>
      </section>
    </main>
  );
}
