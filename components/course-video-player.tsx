"use client";

import { useEffect, useRef, useState } from "react";

type CourseVideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
  subtitleSlug?: string | null;
  storageKey?: string;
  completeAtPercent?: number;
  onCompleted?: () => void;
};

export function CourseVideoPlayer({
  src,
  poster,
  className,
  subtitleSlug,
  storageKey,
  completeAtPercent = 0.9,
  onCompleted
}: CourseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completionRef = useRef(false);
  const lastSavedSecondRef = useRef(-1);
  const [resumeAt, setResumeAt] = useState(0);

  useEffect(() => {
    completionRef.current = false;
    lastSavedSecondRef.current = -1;
    setResumeAt(0);

    if (!storageKey || typeof window === "undefined") {
      return;
    }

    const saved = Number(window.localStorage.getItem(storageKey) || "0");
    if (Number.isFinite(saved) && saved > 0) {
      setResumeAt(saved);
    }
  }, [src, storageKey]);

  function persistPosition(seconds: number) {
    if (!storageKey || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(storageKey, String(seconds));
  }

  function clearPosition() {
    if (!storageKey || typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(storageKey);
  }

  function completeIfNeeded(video: HTMLVideoElement) {
    if (completionRef.current || !video.duration) {
      return;
    }

    const ratio = video.currentTime / video.duration;
    if (ratio >= completeAtPercent) {
      completionRef.current = true;
      clearPosition();
      onCompleted?.();
    }
  }

  function resetToStart() {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    setResumeAt(0);
    clearPosition();
  }

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      preload="metadata"
      playsInline
      poster={poster}
      onLoadedMetadata={(event) => {
        const video = event.currentTarget;
        video.muted = false;
        if (video.volume === 0) {
          video.volume = 1;
        }

        if (resumeAt > 5 && resumeAt < Math.max((video.duration || 0) - 5, 0)) {
          video.currentTime = resumeAt;
        }
      }}
      onTimeUpdate={(event) => {
        const video = event.currentTarget;
        const rounded = Math.floor(video.currentTime);

        if (rounded !== lastSavedSecondRef.current && rounded % 5 === 0) {
          lastSavedSecondRef.current = rounded;
          if (video.duration && video.currentTime < video.duration - 2) {
            persistPosition(video.currentTime);
          }
        }

        completeIfNeeded(video);
      }}
      onEnded={(event) => {
        completeIfNeeded(event.currentTarget);
        resetToStart();
      }}
    >
      <source src={src} type="video/mp4" />
      {subtitleSlug ? (
        <>
          <track kind="subtitles" src={`/videos/subtitles/${subtitleSlug}-overview.vtt`} srcLang="fr" label="Français" />
          <track kind="chapters" src={`/videos/subtitles/${subtitleSlug}-chapters.vtt`} srcLang="fr" />
        </>
      ) : null}
      Votre navigateur ne supporte pas la lecture vidéo.
    </video>
  );
}
