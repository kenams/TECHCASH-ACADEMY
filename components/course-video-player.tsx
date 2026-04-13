"use client";

import { useRef } from "react";

type CourseVideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
  subtitleSlug?: string | null;
  onCompleted?: () => void;
};

export function CourseVideoPlayer({
  src,
  poster,
  className,
  subtitleSlug,
  onCompleted
}: CourseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function resetToStart() {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
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
        event.currentTarget.muted = false;
        if (event.currentTarget.volume === 0) {
          event.currentTarget.volume = 1;
        }
      }}
      onEnded={() => {
        onCompleted?.();
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
