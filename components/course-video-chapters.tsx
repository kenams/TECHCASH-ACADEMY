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
  storageKey?: string;
  completeAtPercent?: number;
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
  storageKey,
  completeAtPercent = 0.9,
  onCompleted
}: CourseVideoChaptersProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completionRef = useRef(false);
  const lastSavedSecondRef = useRef(-1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [resumeAt, setResumeAt] = useState(0);

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
    completionRef.current = false;
    lastSavedSecondRef.current = -1;
    setCurrentTime(0);
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
    setResumeAt(0);
    clearPosition();
  }

  const resumeVisible = resumeAt > 5 && resumeAt < Math.max(duration - 5, 0);

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
          const video = event.currentTarget;
          video.muted = false;
          if (video.volume === 0) {
            video.volume = 1;
          }

          const nextDuration = video.duration || 0;
          setDuration(nextDuration);

          if (resumeAt > 5 && resumeAt < Math.max(nextDuration - 5, 0)) {
            video.currentTime = resumeAt;
            setCurrentTime(resumeAt);
          }
        }}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          setCurrentTime(video.currentTime || 0);

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

      {chapterMarkers.length > 0 ? (
        <div className="course-video-chapters-panel">
          <div className="course-video-chapters-head">
            <strong>Chapitrage vidéo</strong>
            <span>{formatTimestamp(duration || 0)} au total</span>
          </div>
          {resumeVisible ? (
            <button type="button" className="course-video-resume-btn" onClick={() => seekTo(resumeAt)}>
              Reprendre à {formatTimestamp(resumeAt)}
            </button>
          ) : null}
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
