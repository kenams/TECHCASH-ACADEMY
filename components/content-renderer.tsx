import { AccessBadge } from "@/components/access-badge";
import type { ProductModuleRecord } from "@/lib/types";

type ContentRendererProps = {
  module: ProductModuleRecord;
};

type VideoVisualSet = {
  slug: string | null;
  posterUrl: string | null;
  coverUrl: string | null;
  storyUrls: string[];
};

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
  if (!url) {
    return { slug: null, posterUrl: null, coverUrl: null, storyUrls: [] };
  }

  const match = url.match(/\/videos\/formations\/(.+)-overview\.(mp4|webm|ogg)(\?.*)?$/i);
  if (!match) {
    return { slug: null, posterUrl: null, coverUrl: null, storyUrls: [] };
  }

  const slug = match[1];
  return {
    slug,
    posterUrl: `/videos/posters/${slug}-overview-poster.jpg`,
    coverUrl: `/visuals/formations/${slug}-cover.svg`,
    storyUrls: [
      `/videos/stills/${slug}-overview-story-1.jpg`,
      `/videos/stills/${slug}-overview-story-2.jpg`
    ]
  };
}

type InlineNode =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "code"; value: string };

function parseInline(raw: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > cursor) {
      nodes.push({ type: "text", value: raw.slice(cursor, match.index) });
    }
    if (match[0].startsWith("**")) {
      nodes.push({ type: "bold", value: match[2] });
    } else {
      nodes.push({ type: "code", value: match[3] });
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < raw.length) {
    nodes.push({ type: "text", value: raw.slice(cursor) });
  }

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

type MarkdownBlock =
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "callout"; content: string }
  | { type: "divider" }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; content: string };

function parseMarkdown(text: string): MarkdownBlock[] {
  const lines = text.split("\n");
  const blocks: MarkdownBlock[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer] });
      listBuffer = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", content: line.slice(3) });
    } else if (line.startsWith("### ")) {
      flushList();
      blocks.push({ type: "h3", content: line.slice(4) });
    } else if (line.startsWith("> ")) {
      flushList();
      blocks.push({ type: "callout", content: line.slice(2) });
    } else if (line === "---") {
      flushList();
      blocks.push({ type: "divider" });
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      blocks.push({ type: "paragraph", content: line });
    }
  }

  flushList();
  return blocks;
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
              {renderInline(block.content, key)}
            </div>
          );
        }

        if (block.type === "divider") {
          return <hr key={key} className="content-divider" />;
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="content-list">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-li-${itemIndex}`)}</li>
              ))}
            </ul>
          );
        }

        return <p key={key} className="content-p">{renderInline(block.content, key)}</p>;
      })}
    </div>
  );
}

function TextModule({ module }: { module: ProductModuleRecord }) {
  return (
    <article className="content-card">
      <div className="content-card-head">
        <h3>{module.title}</h3>
        <AccessBadge label="Texte" tone="success" />
      </div>
      <p className="content-card-description">{module.description}</p>
      {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
    </article>
  );
}

function VideoModule({ module }: { module: ProductModuleRecord }) {
  const visuals = getVideoVisuals(module.content_url);
  const videoBadge = visuals.slug ? "Vidéo IA" : "Vidéo";

  if (!module.content_url) {
    return (
      <article className="content-card">
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label={videoBadge} tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
        <div className="video-placeholder">
          <p>La vidéo sera intégrée ici dès que la production finale sera prête.</p>
        </div>
      </article>
    );
  }

  if (isDirectVideoFile(module.content_url)) {
    return (
      <article className="content-card">
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label={videoBadge} tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        <div className="video-player-shell">
          <div className="video-player-meta">
            <span>Lecture intégrée</span>
            <strong>Vidéo explicative disponible immédiatement</strong>
          </div>
          <video
            className="video-embed"
            controls
            preload="metadata"
            playsInline
            poster={visuals.posterUrl ?? undefined}
          >
            <source src={module.content_url} />
            {visuals.slug ? (
              <>
                <track kind="subtitles" src={`/videos/subtitles/${visuals.slug}-overview.vtt`} srcLang="fr" label="Français" default />
                <track kind="chapters" src={`/videos/subtitles/${visuals.slug}-chapters.vtt`} srcLang="fr" />
              </>
            ) : null}
            Votre navigateur ne supporte pas la lecture vidéo intégrée.
          </video>
        </div>
        {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
      </article>
    );
  }

  const embedUrl = getEmbedUrl(module.content_url);

  if (embedUrl) {
    return (
      <article className="content-card">
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label={videoBadge} tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
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
        {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
      </article>
    );
  }

  return (
    <article className="content-card">
      <div className="content-card-head">
        <h3>{module.title}</h3>
        <AccessBadge label={videoBadge} tone="success" />
      </div>
      <p className="content-card-description">{module.description}</p>
      {module.content_body ? <MarkdownBody body={module.content_body} /> : null}
      <div className="video-placeholder">
        <p>La vidéo est disponible via le lien ci-dessous.</p>
        <a className="button" href={module.content_url} target="_blank" rel="noreferrer">
          Voir la vidéo
        </a>
      </div>
    </article>
  );
}

export function ContentRenderer({ module }: ContentRendererProps) {
  switch (module.content_type) {
    case "text":
      return <TextModule module={module} />;

    case "video":
      return <VideoModule module={module} />;

    case "pdf":
      return (
        <article className="content-card">
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="PDF" tone="success" />
          </div>
          <p className="content-card-description">{module.description}</p>
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
        </article>
      );

    case "resource":
      return (
        <article className="content-card">
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="Ressource" tone="success" />
          </div>
          <p className="content-card-description">{module.description}</p>
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
          <p className="helper">
            Ce module est planifié. Le contenu sera ajouté automatiquement sans action de ta part.
          </p>
        </article>
      );

    default:
      return null;
  }
}
