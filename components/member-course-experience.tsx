"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentRenderer } from "@/components/content-renderer";
import { CourseVideoPlayer } from "@/components/course-video-player";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { buildProductProgressSummary } from "@/lib/progress";
import type { ProductModuleRecord, ProductProgressSummary, ProductWithModules } from "@/lib/types";

type MemberCourseExperienceProps = {
  product: ProductWithModules;
  initialProgress: ProductProgressSummary;
};

function getHeroVideoModule(modules: ProductModuleRecord[]) {
  const hero = modules.find((module) => module.content_type === "video" && module.sort_order === 0);
  return hero ?? modules.find((module) => module.content_type === "video") ?? null;
}

function estimateReadTime(content: string | null) {
  if (!content) {
    return null;
  }

  const plainText = content.replace(/[#>*`-]/g, " ").replace(/\s+/g, " ").trim();
  if (!plainText) {
    return null;
  }

  return Math.max(1, Math.ceil(plainText.split(" ").length / 200));
}

export function MemberCourseExperience({ product, initialProgress }: MemberCourseExperienceProps) {
  const [completedSlugs, setCompletedSlugs] = useState(initialProgress.completedModuleSlugs);
  const [lastCompletedAt, setLastCompletedAt] = useState(initialProgress.lastCompletedAt);

  const heroVideo = getHeroVideoModule(product.modules);
  const visibleModules = product.modules.filter((module) => module.id !== heroVideo?.id);
  const summary = buildProductProgressSummary(
    product.slug,
    product.modules,
    completedSlugs.map((moduleSlug) => ({
      product_slug: product.slug,
      module_slug: moduleSlug,
      completed_at: lastCompletedAt ?? new Date().toISOString()
    }))
  );
  const completedSet = new Set(completedSlugs);

  useEffect(() => {
    let cancelled = false;

    async function refreshProgress() {
      try {
        const response = await fetch(`/api/progress?productSlug=${encodeURIComponent(product.slug)}`, {
          cache: "no-store"
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { completedAt?: string[]; moduleSlugs?: string[] };

        if (!cancelled && Array.isArray(payload.moduleSlugs)) {
          setCompletedSlugs(payload.moduleSlugs);
          setLastCompletedAt(payload.completedAt?.[0] ?? null);
        }
      } catch {
        // Silent fallback: initial server-side progress remains displayed.
      }
    }

    refreshProgress();

    return () => {
      cancelled = true;
    };
  }, [product.slug]);

  async function persistProgress(nextSeen: boolean, moduleSlug: string) {
    const method = nextSeen ? "POST" : "DELETE";

    try {
      await fetch("/api/progress", {
        method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          productSlug: product.slug,
          moduleSlug
        })
      });
    } catch {
      // Silent failure. The page remains usable even if persistence is temporarily unavailable.
    }
  }

  function handleSeenToggle(moduleSlug: string) {
    const alreadySeen = completedSet.has(moduleSlug);
    const nextSeen = !alreadySeen;

    setCompletedSlugs((current) =>
      nextSeen ? Array.from(new Set([...current, moduleSlug])) : current.filter((item) => item !== moduleSlug)
    );
    setLastCompletedAt(nextSeen ? new Date().toISOString() : lastCompletedAt);
    void persistProgress(nextSeen, moduleSlug);
  }

  return (
    <div className="grid gap-8">
      {heroVideo?.content_url ? (
        <section className="course-hero-video-shell">
          <div className="course-hero-video-header">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success">
                  Formation débloquée · {summary.completedModules}/{summary.totalModules} modules vus
                </Badge>
                <Badge variant="primary">Vidéo tutorielle</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/dashboard/mes-formations" className={buttonClasses("secondary", "sm")}>
                  Mes formations
                </Link>
                <Link href={`/formations/${product.slug}`} className={buttonClasses("ghost", "sm")}>
                  Page publique
                </Link>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-4xl">
                {product.title}
              </h1>
              <p className="text-base leading-7 text-[var(--muted)]">{product.short_description}</p>
            </div>
            <div className="course-progress-bar-shell">
              <div className="course-progress-bar-track">
                <div className="course-progress-bar-fill" style={{ width: `${summary.percent}%` }} />
              </div>
              <span className="course-progress-label">
                {summary.completedModules}/{summary.totalModules} modules vus
              </span>
            </div>
          </div>
          <div className="course-hero-video-player" id="module-overview-video">
            <CourseVideoPlayer
              className="course-main-video"
              src={heroVideo.content_url}
              poster={`/videos/posters/${product.slug}-overview-poster.jpg`}
              subtitleSlug={product.slug}
              onCompleted={() => {
                if (!completedSet.has(heroVideo.slug)) {
                  handleSeenToggle(heroVideo.slug);
                }
              }}
            />
          </div>
          <div className="course-hero-video-stats">
            <div className="course-stat">
              <strong>{summary.totalModules}</strong>
              <span>modules suivis</span>
            </div>
            <div className="course-stat">
              <strong>
                {product.modules.filter((module) => module.content_type === "resource" || module.content_type === "pdf").length}
              </strong>
              <span>ressources directes</span>
            </div>
            <div className="course-stat">
              <strong>{product.modules.filter((module) => module.content_type === "coming_soon").length}</strong>
              <span>modules à venir</span>
            </div>
            <div className="course-stat">
              <strong>{summary.nextModuleTitle ?? "Parcours terminé"}</strong>
              <span>prochaine étape</span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Badge variant="success">Modules et contenus</Badge>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              Tout le contenu disponible
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
              Parcours les modules dans l&apos;ordre pour une progression optimale, ou accède directement aux ressources dont tu as besoin.
            </p>
          </div>
          {visibleModules.map((module, index) => (
            <div key={module.id} id={`module-${module.slug}`}>
              <ContentRenderer
                module={module}
                productSlug={product.slug}
                isSeen={completedSet.has(module.slug)}
                onSeenToggle={handleSeenToggle}
                readTimeMinutes={module.content_type === "text" ? estimateReadTime(module.content_body) : null}
                previousModule={
                  index > 0
                    ? { slug: visibleModules[index - 1].slug, title: visibleModules[index - 1].title }
                    : heroVideo
                      ? { slug: "overview-video", title: heroVideo.title }
                      : null
                }
                nextModule={
                  index < visibleModules.length - 1
                    ? { slug: visibleModules[index + 1].slug, title: visibleModules[index + 1].title }
                    : null
                }
              />
            </div>
          ))}
        </div>

        <aside className="course-toc-sidebar">
          <div className="course-toc-card">
            <div className="course-toc-head">
              <strong>Table des matières</strong>
              <span>{summary.percent}% terminé</span>
            </div>
            <div className="course-progress-bar-track">
              <div className="course-progress-bar-fill" style={{ width: `${summary.percent}%` }} />
            </div>
            <nav className="course-toc-list" aria-label="Navigation des modules">
              {heroVideo ? (
                <a
                  href="#module-overview-video"
                  className={`course-toc-link ${completedSet.has(heroVideo.slug) ? "seen" : ""}`}
                >
                  <span>{completedSet.has(heroVideo.slug) ? "✓" : "○"}</span>
                  <span>{heroVideo.title}</span>
                </a>
              ) : null}
              {visibleModules.map((module) => (
                <a
                  key={module.id}
                  href={`#module-${module.slug}`}
                  className={`course-toc-link ${completedSet.has(module.slug) ? "seen" : ""}`}
                >
                  <span>{completedSet.has(module.slug) ? "✓" : "○"}</span>
                  <span>{module.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </section>
    </div>
  );
}
