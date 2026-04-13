"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type VideoChapter = {
  title: string;
};

type CourseVideoChaptersProps = {
  src: string;
  poster?: string;
  subtitleSlug?: string | null;
  className?: string;
  chapters: VideoChapter[];
  onCompleted?: () => void;
};

function formatTimestamp(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const remaining = safe % 60;
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export function CourseVideoChapters({
  src,
  poster,
  subtitleSlug,
  className,
  chapters,
  onCompleted
}: CourseVideoChaptersProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const chapterMarkers = useMemo(() => {
    if (chapters.length === 0 || duration <= 0) {
      return chapters.map((chapter) => ({ ...chapter, startAt: 0 }));
    }

    const segment = duration / chapters.length;
    return chapters.map((chapter, index) => ({
      ...chapter,
      startAt: segment * index
    }));
  }, [chapters, duration]);

  const activeChapterIndex = useMemo(() => {
    if (chapterMarkers.length === 0) {
      return 0;
    }

    let active = 0;
    for (let index = 0; index < chapterMarkers.length; index += 1) {
      if (currentTime >= chapterMarkers[index].startAt) {
        active = index;
      }
    }
    return active;
  }, [chapterMarkers, currentTime]);

  useEffect(() => {
    setCurrentTime(0);
  }, [src]);

  function seekTo(seconds: number) {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = seconds;
    void video.play().catch(() => {
      video.pause();
    });
  }

  function resetToStart() {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    setCurrentTime(0);
  }

  return (
    <div className="course-video-chapters-shell">
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
          setDuration(event.currentTarget.duration || 0);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime || 0);
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

      {chapterMarkers.length > 0 ? (
        <div className="course-video-chapters-panel">
          <div className="course-video-chapters-head">
            <strong>Chapitrage vidéo</strong>
            <span>{formatTimestamp(duration || 0)} au total</span>
          </div>
          <div className="course-video-chapters-list">
            {chapterMarkers.map((chapter, index) => (
              <button
                key={`${chapter.title}-${index}`}
                type="button"
                className={`course-video-chapter-btn ${index === activeChapterIndex ? "active" : ""}`}
                onClick={() => seekTo(chapter.startAt)}
              >
                <span className="course-video-chapter-time">{formatTimestamp(chapter.startAt)}</span>
                <span className="course-video-chapter-title">{chapter.title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
