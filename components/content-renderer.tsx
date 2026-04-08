import { AccessBadge } from "@/components/access-badge";
import type { ProductModuleRecord } from "@/lib/types";

type ContentRendererProps = {
  module: ProductModuleRecord;
};

function isDirectVideoFile(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  if (url.includes("youtube.com/watch")) {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get("v");
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  }

  // Vimeo
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  }

  // Loom
  if (url.includes("loom.com/share/")) {
    const shareId = url.split("loom.com/share/")[1]?.split("?")[0];
    return shareId ? `https://www.loom.com/embed/${shareId}` : null;
  }

  // Loom embed direct
  if (url.includes("loom.com/embed/")) {
    return url;
  }

  return null;
}

function TextModule({ module }: { module: ProductModuleRecord }) {
  return (
    <article className="content-card">
      <div className="content-card-head">
        <h3>{module.title}</h3>
        <AccessBadge label="Texte" tone="success" />
      </div>
      <p className="content-card-description">{module.description}</p>
      {module.content_body ? (
        <div className="content-rich-text">
          {module.content_body.split("\n").map((line, i) =>
            line.trim() === "" ? (
              <br key={i} />
            ) : (
              <p key={i}>{line}</p>
            )
          )}
        </div>
      ) : null}
    </article>
  );
}

function VideoModule({ module }: { module: ProductModuleRecord }) {
  if (!module.content_url) {
    return (
      <article className="content-card">
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label="Vidéo" tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        <div className="video-placeholder">
          <p>La vidéo sera intégrée ici dès que la production est prête.</p>
        </div>
      </article>
    );
  }

  if (isDirectVideoFile(module.content_url)) {
    return (
      <article className="content-card">
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label="Vidéo" tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        <video className="video-embed" controls preload="metadata">
          <source src={module.content_url} />
          Votre navigateur ne supporte pas la lecture vidéo intégrée.
        </video>
      </article>
    );
  }

  const embedUrl = getEmbedUrl(module.content_url);

  if (embedUrl) {
    return (
      <article className="content-card">
        <div className="content-card-head">
          <h3>{module.title}</h3>
          <AccessBadge label="Vidéo" tone="success" />
        </div>
        <p className="content-card-description">{module.description}</p>
        <div className="video-frame">
          <iframe
            src={embedUrl}
            title={module.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </article>
    );
  }

  return (
    <article className="content-card">
      <div className="content-card-head">
        <h3>{module.title}</h3>
        <AccessBadge label="Vidéo" tone="success" />
      </div>
      <p className="content-card-description">{module.description}</p>
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
