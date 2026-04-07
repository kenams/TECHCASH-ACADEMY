"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(registerData.error || "Impossible de creer le compte.");
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
        setError(syncData.error || "Compte cree mais profil introuvable.");
        setLoading(false);
        return;
      }

      if (data.session) {
        setMessage("Compte cree. Tu peux maintenant passer au paiement.");
        setLoading(false);
        router.push("/checkout");
        return;
      }

      setMessage("Compte cree. Connecte-toi pour continuer.");
      setLoading(false);
      router.push("/login");
    } catch (registerError) {
      console.error(registerError);
      setError("Une erreur est survenue pendant l'inscription.");
      setLoading(false);
    }
  }

  return (
    <main className="auth-wrap">
      <section className="auth-card">
        <p className="eyebrow">Creation de compte</p>
        <h1>Prepare ton acces instantane</h1>
        <p>Cree ton compte pour debloquer le paiement et recevoir ton contenu juste apres.</p>

        {error ? <div className="message error">{error}</div> : null}
        {message ? <div className="message success">{message}</div> : null}

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
              minLength={6}
              autoComplete="new-password"
              disabled={loading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="button" type="submit" disabled={loading} aria-busy={loading}>
            {loading ? "Creation..." : "Creer mon compte"}
          </button>
        </form>

        <p className="helper">
          Deja inscrit ?{" "}
          <Link className="muted-link" href="/login">
            Se connecter
          </Link>
        </p>
      </section>
    </main>
  );
}
