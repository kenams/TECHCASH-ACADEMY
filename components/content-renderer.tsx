import { AccessBadge } from "@/components/access-badge";
import type { ProductModuleRecord } from "@/lib/types";

type ContentRendererProps = {
  module: ProductModuleRecord;
};

export function ContentRenderer({ module }: ContentRendererProps) {
  switch (module.content_type) {
    case "text":
      return (
        <article className="content-card">
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="Texte" tone="success" />
          </div>
          <p className="content-card-description">{module.description}</p>
          <div className="content-rich-text">
            {module.content_body?.split("\n").map((line) => (
              <p key={`${module.id}-${line}`}>{line}</p>
            ))}
          </div>
        </article>
      );
    case "pdf":
      return (
        <article className="content-card">
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="PDF" tone="success" />
          </div>
          <p className="content-card-description">{module.description}</p>
          <div className="cta-row">
            {module.content_url ? (
              <a className="button" href={module.content_url} target="_blank" rel="noreferrer">
                Ouvrir le PDF
              </a>
            ) : null}
          </div>
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
          <div className="cta-row">
            {module.content_url ? (
              <a className="button" href={module.content_url} target="_blank" rel="noreferrer">
                Acceder a la ressource
              </a>
            ) : null}
          </div>
        </article>
      );
    case "video":
      return (
        <article className="content-card">
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="Video" tone="success" />
          </div>
          <p className="content-card-description">{module.description}</p>
          {module.content_url ? (
            <div className="video-placeholder">
              <p>La video est disponible en externe pour l'instant.</p>
              <a className="button" href={module.content_url} target="_blank" rel="noreferrer">
                Voir la video
              </a>
            </div>
          ) : (
            <div className="video-placeholder">
              <p>La video sera integree ici des que la production est prete.</p>
            </div>
          )}
        </article>
      );
    case "coming_soon":
      return (
        <article className="content-card content-card-coming-soon">
          <div className="content-card-head">
            <h3>{module.title}</h3>
            <AccessBadge label="Bientot disponible" tone="warning" />
          </div>
          <p className="content-card-description">{module.description}</p>
          <p className="helper">
            Le plan de ce module est pret. Le contenu sera ajoute sans action supplementaire de
            votre part.
          </p>
        </article>
      );
    default:
      return null;
  }
}
