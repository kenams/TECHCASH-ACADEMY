"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "loading" | "playing" | "paused" | "error";

type NarrationPlayerProps = {
  text: string;
  label?: string;
};

export function NarrationPlayer({ text, label = "Écouter ce module" }: NarrationPlayerProps) {
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      audioRef.current?.pause();
    };
  }, []);

  async function load() {
    setState("loading");
    try {
      const res = await fetch("/api/narration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Erreur API");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener("timeupdate", () => {
        setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
      });
      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
      audio.addEventListener("ended", () => {
        setState("paused");
        setProgress(100);
      });

      await audio.play();
      setState("playing");
    } catch {
      setState("error");
    }
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) {
      load();
      return;
    }
    if (state === "playing") {
      audio.pause();
      setState("paused");
    } else {
      audio.play();
      setState("playing");
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
    setProgress(ratio * 100);
  }

  function formatTime(s: number) {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  const currentTime = duration ? (progress / 100) * duration : 0;

  return (
    <div className="narration-player" data-state={state}>
      <button
        className="narration-btn"
        onClick={toggle}
        disabled={state === "loading"}
        aria-label={state === "playing" ? "Pause narration" : label}
      >
        {state === "loading" ? (
          <span className="narration-spinner" />
        ) : state === "playing" ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
        <span className="narration-btn-label">
          {state === "loading"
            ? "Génération…"
            : state === "error"
              ? "Réessayer"
              : state === "playing"
                ? "Pause"
                : state === "paused"
                  ? "Reprendre"
                  : label}
        </span>
        {state === "playing" && <span className="narration-wave"><Wave /></span>}
      </button>

      {(state === "playing" || state === "paused") && duration > 0 && (
        <div className="narration-progress-wrap">
          <div className="narration-progress-bar" onClick={seek} role="slider" aria-valuenow={progress}>
            <div className="narration-progress-fill" style={{ width: `${progress}%` }} />
            <div className="narration-progress-thumb" style={{ left: `${progress}%` }} />
          </div>
          <div className="narration-times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {state === "error" && (
        <span className="narration-error">Narration indisponible</span>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="2" width="4" height="12" rx="1" />
      <rect x="9" y="2" width="4" height="12" rx="1" />
    </svg>
  );
}

function Wave() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="currentColor">
      <rect x="0" y="6" width="3" height="4" rx="1.5" className="narration-bar bar1" />
      <rect x="5" y="3" width="3" height="10" rx="1.5" className="narration-bar bar2" />
      <rect x="10" y="0" width="3" height="16" rx="1.5" className="narration-bar bar3" />
      <rect x="15" y="3" width="3" height="10" rx="1.5" className="narration-bar bar2" />
      <rect x="20" y="6" width="3" height="4" rx="1.5" className="narration-bar bar1" />
    </svg>
  );
}
