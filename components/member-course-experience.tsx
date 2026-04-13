"use client";

import { useEffect, useMemo, useState } from "react";
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

type ModuleLinkMeta = {
  slug: string;
  title: string;
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

function isTrackableModule(module: ProductModuleRecord) {
  return module.is_published && module.content_type !== "coming_soon";
}

export function MemberCourseExperience({ product, initialProgress }: MemberCourseExperienceProps) {
  const [completedSlugs, setCompletedSlugs] = useState(initialProgress.completedModuleSlugs);
  const [lastCompletedAt, setLastCompletedAt] = useState(initialProgress.lastCompletedAt);
  const [activeModuleSlug, setActiveModuleSlug] = useState<string>("overview-video");

  const heroVideo = getHeroVideoModule(product.modules);
  const visibleModules = product.modules.filter((module) => module.id !== heroVideo?.id);
  const trackableModules = product.modules.filter(isTrackableModule);
  const completedSet = useMemo(() => new Set(completedSlugs), [completedSlugs]);
  const firstIncompleteTrackable = trackableModules.find((module) => !completedSet.has(module.slug)) ?? null;

  const unlockedTrackableSlugs = useMemo(() => {
    const allowed = new Set<string>();
    let lockedEncountered = false;

    for (const module of trackableModules) {
      if (completedSet.has(module.slug)) {
        allowed.add(module.slug);
        continue;
      }

      if (!lockedEncountered) {
        allowed.add(module.slug);
        lockedEncountered = true;
      }
    }

    return allowed;
  }, [completedSet, trackableModules]);

  const summary = buildProductProgressSummary(
    product.slug,
    product.modules,
    completedSlugs.map((moduleSlug) => ({
      product_slug: product.slug,
      module_slug: moduleSlug,
      completed_at: lastCompletedAt ?? new Date().toISOString()
    }))
  );

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

  useEffect(() => {
    const sectionIds = [
      heroVideo ? "module-overview-video" : null,
      ...visibleModules.map((module) => `module-${module.slug}`)
    ].filter(Boolean) as string[];

    if (sectionIds.length === 0) {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry?.target?.id) {
          return;
        }

        const nextActive = visibleEntry.target.id === "module-overview-video"
          ? "overview-video"
          : visibleEntry.target.id.replace("module-", "");

        setActiveModuleSlug(nextActive);
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.7]
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [heroVideo, visibleModules]);

  async function persistProgress(moduleSlug: string) {
    try {
      await fetch("/api/progress", {
        method: "POST",
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
    if (completedSet.has(moduleSlug)) {
      return;
    }

    setCompletedSlugs((current) => Array.from(new Set([...current, moduleSlug])));
    setLastCompletedAt(new Date().toISOString());
    void persistProgress(moduleSlug);
  }

  function isModuleUnlocked(module: ProductModuleRecord) {
    if (!isTrackableModule(module)) {
      return true;
    }

    return unlockedTrackableSlugs.has(module.slug);
  }

  function getRequiredModule(module: ProductModuleRecord): ModuleLinkMeta | null {
    const trackableIndex = trackableModules.findIndex((candidate) => candidate.slug === module.slug);
    if (trackableIndex <= 0) {
      return heroVideo ? { slug: "overview-video", title: heroVideo.title } : null;
    }

    const previous = trackableModules[trackableIndex - 1];
    return previous ? { slug: previous.slug, title: previous.title } : null;
  }

  return (
    <div className="grid gap-8">
      {heroVideo?.content_url ? (
        <section className="course-hero-video-shell">
          <div className="course-hero-video-header">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success">
                  Formation débloquée · {summary.completedModules}/{summary.totalModules} modules validés
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
                {summary.completedModules}/{summary.totalModules} modules validés
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
              La progression est séquentielle : valide chaque étape pour débloquer proprement la suivante et garder un vrai rythme d’apprentissage.
            </p>
          </div>
          {visibleModules.map((module, index) => {
            const unlocked = isModuleUnlocked(module);
            const nextModule = index < visibleModules.length - 1
              ? { slug: visibleModules[index + 1].slug, title: visibleModules[index + 1].title }
              : null;

            return (
              <div key={module.id} id={`module-${module.slug}`}>
                <ContentRenderer
                  module={module}
                  productSlug={product.slug}
                  isSeen={completedSet.has(module.slug)}
                  isLocked={!unlocked}
                  requiredModule={!unlocked ? getRequiredModule(module) : null}
                  onSeenToggle={handleSeenToggle}
                  readTimeMinutes={module.content_type === "text" ? estimateReadTime(module.content_body) : null}
                  previousModule={
                    index > 0
                      ? { slug: visibleModules[index - 1].slug, title: visibleModules[index - 1].title }
                      : heroVideo
                        ? { slug: "overview-video", title: heroVideo.title }
                        : null
                  }
                  nextModule={nextModule}
                  canGoNext={completedSet.has(module.slug)}
                />
              </div>
            );
          })}
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
            {firstIncompleteTrackable ? (
              <p className="course-toc-note">
                Valide <strong>{firstIncompleteTrackable.title}</strong> pour ouvrir la suite.
              </p>
            ) : (
              <p className="course-toc-note">Toutes les étapes disponibles sont validées.</p>
            )}
            <nav className="course-toc-list" aria-label="Navigation des modules">
              {heroVideo ? (
                <a
                  href="#module-overview-video"
                  className={`course-toc-link ${completedSet.has(heroVideo.slug) ? "seen" : ""} ${activeModuleSlug === "overview-video" ? "active" : ""}`}
                  aria-current={activeModuleSlug === "overview-video" ? "true" : undefined}
                >
                  <span className="course-toc-link-state">{completedSet.has(heroVideo.slug) ? "✓" : "○"}</span>
                  <span>{heroVideo.title}</span>
                </a>
              ) : null}
              {visibleModules.map((module) => {
                const unlocked = isModuleUnlocked(module);
                const seen = completedSet.has(module.slug);

                return (
                  <a
                    key={module.id}
                    href={unlocked ? `#module-${module.slug}` : "#"}
                    className={`course-toc-link ${seen ? "seen" : ""} ${activeModuleSlug === module.slug ? "active" : ""} ${!unlocked ? "locked" : ""}`}
                    aria-current={activeModuleSlug === module.slug ? "true" : undefined}
                    aria-disabled={!unlocked}
                    onClick={(event) => {
                      if (!unlocked) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <span className="course-toc-link-state">{seen ? "✓" : unlocked ? "○" : "🔒"}</span>
                    <span>{module.title}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>
      </section>
    </div>
  );
}
