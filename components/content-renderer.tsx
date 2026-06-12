"use client";

import Link from "next/link";
import { AccessBadge } from "@/components/access-badge";
import { CourseVideoPlayer } from "@/components/course-video-player";
import { ModuleProgressTracker } from "@/components/module-progress-tracker";
import { NarrationPlayer } from "@/components/ui/NarrationPlayer";
import type { ProductModuleRecord } from "@/lib/types";

type ModuleLinkMeta = {
  slug: string;
  title: string;
};

type ContentRendererProps = {
  module: ProductModuleRecord;
  productSlug: string;
  isSeen: boolean;
  isLocked?: boolean;
  requiredModule?: ModuleLinkMeta | null;
  onSeenToggle: (moduleSlug: string) => void;
  previousModule?: ModuleLinkMeta | null;
  nextModule?: ModuleLinkMeta | null;
  readTimeMinutes?: number | null;
  canGoNext?: boolean;
};

type VideoVisualSet = {
  slug: string | null;
  posterUrl: string | null;
};

type InlineNode =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "code"; value: string };

type MarkdownBlock =
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "callout"; content: string }
  | { type: "divider" }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "concept"; emoji: string; content: string }
  | { type: "stat"; value: string; label: string }
  | { type: "paragraph"; content: string };

function isDirectVideoFile(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function getEmbedUrl(url: string): string | null {
  if (url.includes("youtube.com/watch")) {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get("v");
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  }
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  }
  if (url.includes("loom.com/share/")) {
    const shareId = url.split("loom.com/share/")[1]?.split("?")[0];
    return shareId ? `https://www.loom.com/embed/${shareId}` : null;
  }
  if (url.includes("loom.com/embed/")) {
    return url;
  }
  return null;
}

function getVideoVisuals(url: string | null): VideoVisualSet {
  if (!url) return { slug: null, posterUrl: null };
  const match = url.match(/\/videos\/formations\/(.+)-overview\.(mp4|webm|ogg)(\?.*)?$/i);
  if (!match) return { slug: null, posterUrl: null };
  const slug = match[1];
  return { slug, posterUrl: `/videos/posters/${slug}-overview-poster.jpg` };
}

function parseInline(raw: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    if (match.index > cursor) nodes.push({ type: "text", value: raw.slice(cursor, match.index) });
    if (match[0].startsWith("**")) nodes.push({ type: "bold", value: match[2] });
    else nodes.push({ type: "code", value: match[3] });
    cursor = match.index + match[0].length;
  }
  if (cursor < raw.length) nodes.push({ type: "text", value: raw.slice(cursor) });
  return nodes;
}

function renderInline(raw: string, keyPrefix: string) {
  return parseInline(raw).map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    if (node.type === "bold") return <strong key={key}>{node.value}</strong>;
    if (node.type === "code") return <code key={key} className="content-inline-code">{node.value}</code>;
    return <span key={key}>{node.value}</span>;
  });
}

const CONCEPT_EMOJIS = ["💡", "🎯", "⚡", "🔥", "💰", "📊", "🚀", "✅", "🛠", "🧠", "💼", "🌐", "🔑", "📈", "⭐"];

function parseMarkdown(text: string): MarkdownBlock[] {
  const lines = text.split("\n");
  const blocks: MarkdownBlock[] = [];
  let listBuffer: string[] = [];
  let stepsBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer] });
      listBuffer = [];
    }
  };
  const flushSteps = () => {
    if (stepsBuffer.length > 0) {
      blocks.push({ type: "steps", items: [...stepsBuffer] });
      stepsBuffer = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("## ")) {
      flushList(); flushSteps();
      blocks.push({ type: "h2", content: line.slice(3) });
    } else if (line.startsWith("### ")) {
      flushList(); flushSteps();
      blocks.push({ type: "h3", content: line.slice(4) });
    } else if (line.startsWith("> ")) {
      flushList(); flushSteps();
      blocks.push({ type: "callout", content: line.slice(2) });
    } else if (line === "---") {
      flushList(); flushSteps();
      blocks.push({ type: "divider" });
    } else if (/^\d+\.\s/.test(line)) {
      flushList();
      stepsBuffer.push(line.replace(/^\d+\.\s/, ""));
    } else if (line.startsWith("- ")) {
      flushSteps();
      listBuffer.push(line.slice(2));
    } else if (line.startsWith("STAT:")) {
      flushList(); flushSteps();
      const rest = line.slice(5).trim();
      const pipeIdx = rest.indexOf("|");
      if (pipeIdx > -1) {
        blocks.push({ type: "stat", value: rest.slice(0, pipeIdx).trim(), label: rest.slice(pipeIdx + 1).trim() });
      } else {
        blocks.push({ type: "paragraph", content: rest });
      }
    } else if (line.trim() === "") {
      flushList(); flushSteps();
    } else {
      const firstChar = line.trim()[0];
      if (firstChar && CONCEPT_EMOJIS.includes(firstChar)) {
        flushList(); flushSteps();
        blocks.push({ type: "concept", emoji: firstChar, content: line.trim().slice(1).trim() });
      } else {
        flushList(); flushSteps();
        blocks.push({ type: "paragraph", content: line });
      }
    }
  }

  flushList();
  flushSteps();
  return blocks;
}

function extractKeyPoints(body: string): string[] {
  const lines = body.split("\n");
  const points: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (points.length >= 3) break;
    if (line.startsWith("- ")) points.push(line.slice(2));
    else if (/^\d+\.\s/.test(line)) points.push(line.replace(/^\d+\.\s/, ""));
  }
  return points;
}

const KEY_ICONS = ["⚡", "🎯", "✅"];

function ModuleKeyPoints({ body }: { body: string }) {
  const points = extractKeyPoints(body);
  if (points.length < 2) return null;
  return (
    <div className="module-key-points">
      <div className="module-key-points-label">Ce que tu vas apprendre</div>
      <div className="module-key-points-grid">
        {points.map((pt, i) => (
          <div key={i} className="module-key-point-card">
            <span className="mkp-icon">{KEY_ICONS[i] ?? "→"}</span>
            <span className="mkp-text">{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkdownBody({ body }: { body: string }) {
  const blocks = parseMarkdown(body);

  return (
    <div className="content-rich-text">
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.type === "h2") {
          return <h2 key={key} className="content-h2">{renderInline(block.content, key)}</h2>;
        }

        if (block.type === "h3") {
          return <h3 key={key} className="content-h3">{renderInline(block.content, key)}</h3>;
        }

        if (block.type === "callout") {
          return (
            <div key={key} className="content-callout">
              <span className="callout-icon">💡</span>
              <span>{renderInline(block.content, key)}</span>
            </div>
          );
        }

        if (block.type === "divider") {
          return <hr key={key} className="content-divider" />;
        }

        if (block.type === "steps") {
          return (
            <ol key={key} className="content-steps">
              {block.items.map((item, i) => (
                <li key={`${key}-${i}`} className="content-step-item">
                  <span className="step-number">{i + 1}</span>
                  <span className="step-text">{renderInline(item, `${key}-s-${i}`)}</span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="content-checklist">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`} className="content-checklist-item">
                  <span className="checklist-icon">✓</span>
                  <span>{renderInline(item, `${key}-li-${itemIndex}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "concept") {
          return (
            <div key={key} className="content-concept-card">
              <span className="concept-emoji">{block.emoji}</span>
              <span className="concept-text">{renderInline(block.content, key)}</span>
            </div>
          );
        }

        if (block.type === "stat") {
          return (
            <div key={key} className="content-stat-card">
              <span className="stat-value">{block.value}</span>
              <span className="stat-label">{block.label}</span>
            </div>
          );
        }

        return <p key={key} className="content-p">{renderInline(block.content, key)}</p>;
      })}
    </div>
  );
}

function LockedModuleNotice({ requiredModule }: { requiredModule?: ModuleLinkMeta | null }) {
  return (
    <div className="content-lock-notice">
      <strong>Validation requise avant de continuer</strong>
      <p>
        {requiredModule
          ? (<>Termine d&apos;abord <a href={`#module-${requiredModule.slug}`}>{requiredModule.title}</a> pour débloquer ce module.</>)
          : "Valide le module précédent pour débloquer cette étape."}
      </p>
    </div>
  );
}

function ModuleFooter({
  isSeen, isLocked, onSeenToggle, module, previousModule, nextModule, readTimeMinutes, canGoNext
}: {
  isSeen: boolean; isLocked?: boolean; onSeenToggle: (moduleSlug: string) => void;
  module: ProductModuleRecord; previousModule?: ModuleLinkMeta | null;
  nextModule?: ModuleLinkMeta | null; readTimeMinutes?: number | null; canGoNext?: boolean;
}) {
  const nextHref = nextModule
    ? nextModule.slug === "overview-video" ? "#module-overview-video" : `#module-${nextModule.slug}`
    : null;
  const previousHref = previousModule
    ? previousModule.slug === "overview-video" ? "#module-overview-video" : `#module-${previousModule.slug}`
    : null;

  return (
    <div className="content-module-footer">
      <div className="content-module-footer-meta">
        {readTimeMinutes ? <span className="module-read-time">~{readTimeMinutes} min</span> : null}
        {module.content_type !== "coming_soon" && !isLocked ? (
          <ModuleProgressTracker seen={isSeen} onToggle={() => onSeenToggle(module.slug)} />
        ) : null}
      </div>
      <div className="content-module-nav">
        {previousModule && previousHref ? (
          <Link href={previousHref} className="content-module-nav-link">← {previousModule.title}</Link>
        ) : <span />}
        {nextModule && nextHref ? (
          canGoNext ? (
            <Link href={nextHref} className="content-module-nav-link">{nextModule.title} →</Link>
          ) : (
            <span className="content-module-nav-link disabled">Valide ce module pour continuer →</span>
          )
        ) : null}
      </div>
    </div>
  );
}

function TextModule(props: ContentRendererProps) {
  const { module, isLocked, requiredModule } = props;

  return (
    <article className={`content-card ${isLocked ? "content-card-locked" : ""}`}>
      <div className="content-card-head">
        <h3>{module.title}</h3>
        <AccessBadge label="Texte" tone="success" />
      </div>
      <p className="content-card-description">{module.description}</p>
      {isLocked ? (
        <LockedModuleNotice requiredModule={requiredModule} />
      ) : (
        <>
          {module.content_body ? <ModuleKeyPoints body={module.content_body} /> : null}
          {module.content_body ? <NarrationPlayer text={module.content_body} /> : null}
          {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
        </>
      )}
      <ModuleFooter {...props} />
    </article>
  );
}

function VideoModule(props: ContentRendererProps) {
  const { module, isSeen, isLocked, requiredModule, onSeenToggle } = props;
  const visuals = getVideoVisuals(module.content_url ?? "");
  const videoBadge = visuals.slug ? "Vidéo tutorielle" : "Vidéo";

  if (!module.content_url) {
    return (
      <article className={`content-card ${isLocked ? "content-card-locked" : ""}`}>
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label={videoBadge} tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        {isLocked ? <LockedModuleNotice requiredModule={requiredModule} /> : (
          <div className="video-placeholder"><p>La vidéo sera intégrée ici dès que la production finale sera prête.</p></div>
        )}
        <ModuleFooter {...props} />
      </article>
    );
  }

  if (isDirectVideoFile(module.content_url)) {
    return (
      <article className={`content-card ${isLocked ? "content-card-locked" : ""}`}>
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label={videoBadge} tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        {isLocked ? (
          <LockedModuleNotice requiredModule={requiredModule} />
        ) : (
          <div className="video-player-shell">
            <div className="video-player-meta">
              <span>Lecture intégrée</span>
              <strong>Vidéo explicative disponible immédiatement</strong>
            </div>
            <CourseVideoPlayer
              className="video-embed"
              src={module.content_url}
              poster={visuals.posterUrl ?? undefined}
              subtitleSlug={visuals.slug}
              storageKey={`techcash:video:${props.productSlug}:${module.slug}`}
              completeAtPercent={0.9}
              onCompleted={() => { if (!isSeen) onSeenToggle(module.slug); }}
            />
          </div>
        )}
        {!isLocked && module.content_body ? <MarkdownBody body={module.content_body} /> : null}
        <ModuleFooter {...props} />
      </article>
    );
  }

  const embedUrl = getEmbedUrl(module.content_url);

  if (embedUrl) {
    return (
      <article className={`content-card ${isLocked ? "content-card-locked" : ""}`}>
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label={videoBadge} tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        {isLocked ? (
          <LockedModuleNotice requiredModule={requiredModule} />
        ) : (
          <div className="video-player-shell">
            <div className="video-player-meta">
              <span>Lecture embarquée</span>
              <strong>Le player reste intégré dans la formation</strong>
            </div>
            <div className="video-frame">
              <iframe
                src={embedUrl}
                title={module.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        )}
        {!isLocked && module.content_body ? <MarkdownBody body={module.content_body} /> : null}
        <ModuleFooter {...props} />
      </article>
    );
  }

  return (
    <article className={`content-card ${isLocked ? "content-card-locked" : ""}`}>
      <div className="content-card-head">
        <h3>{module.title}</h3>
        <AccessBadge label={videoBadge} tone="success" />
      </div>
      <p className="content-card-description">{module.description}</p>
      {isLocked ? (
        <LockedModuleNotice requiredModule={requiredModule} />
      ) : (
        <>
          {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
          <div className="video-placeholder">
            <p>La vidéo est disponible via le lien ci-dessous.</p>
            <a className="button" href={module.content_url} target="_blank" rel="noreferrer">Voir la vidéo</a>
          </div>
        </>
      )}
      <ModuleFooter {...props} />
    </article>
  );
}

export function ContentRenderer(props: ContentRendererProps) {
  const { module, isLocked, requiredModule } = props;

  switch (module.content_type) {
    case "text":
      return <TextModule {...props} />;

    case "video":
      return <VideoModule {...props} />;

    case "pdf":
      return (
        <article className={`content-card ${isLocked ? "content-card-locked" : ""}`}>
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="PDF" tone="success" />
          </div>
          <p className="content-card-description">{module.description}</p>
          {isLocked ? (
            <LockedModuleNotice requiredModule={requiredModule} />
          ) : (
            <>
              {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
              {module.content_url ? (
                <div className="cta-row">
                  <a className="button" href={module.content_url} target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 16l-4-4h2.5V4h3v8H16l-4 4zM4 20h16v2H4v-2z" fill="currentColor" />
                    </svg>
                    Télécharger le PDF
                  </a>
                </div>
              ) : null}
            </>
          )}
          <ModuleFooter {...props} />
        </article>
      );

    case "resource":
      return (
        <article className={`content-card ${isLocked ? "content-card-locked" : ""}`}>
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="Ressource" tone="success" />
          </div>
          <p className="content-card-description">{module.description}</p>
          {isLocked ? (
            <LockedModuleNotice requiredModule={requiredModule} />
          ) : (
            <>
              {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
              {module.content_url ? (
                <div className="cta-row">
                  <a className="button" href={module.content_url} target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 16l-4-4h2.5V4h3v8H16l-4 4zM4 20h16v2H4v-2z" fill="currentColor" />
                    </svg>
                    Accéder à la ressource
                  </a>
                </div>
              ) : null}
            </>
          )}
          <ModuleFooter {...props} />
        </article>
      );

    case "coming_soon":
      return (
        <article className="content-card content-card-coming-soon">
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="Bientôt disponible" tone="warning" />
          </div>
          <p className="content-card-description">{module.description}</p>
          <p className="helper">Ce module est planifié. Le contenu sera ajouté automatiquement sans action de ta part.</p>
          <ModuleFooter {...props} />
        </article>
      );

    default:
      return null;
  }
}
