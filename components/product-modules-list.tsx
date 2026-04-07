import { AccessBadge } from "@/components/access-badge";
import type { ProductModuleRecord } from "@/lib/types";

type ProductModulesListProps = {
  modules: ProductModuleRecord[];
  showContentTypes?: boolean;
};

function getModuleTone(contentType: ProductModuleRecord["content_type"]) {
  switch (contentType) {
    case "coming_soon":
      return "warning" as const;
    case "resource":
    case "pdf":
    case "text":
    case "video":
      return "success" as const;
    default:
      return "default" as const;
  }
}

function getModuleLabel(contentType: ProductModuleRecord["content_type"]) {
  switch (contentType) {
    case "pdf":
      return "PDF";
    case "video":
      return "Video";
    case "text":
      return "Texte";
    case "resource":
      return "Ressource";
    case "coming_soon":
      return "Bientot disponible";
    default:
      return "Module";
  }
}

export function ProductModulesList({
  modules,
  showContentTypes = true
}: ProductModulesListProps) {
  if (!modules.length) {
    return (
      <article className="card empty-state-card">
        <h3>Aucun module public pour le moment</h3>
        <p>Le contenu sera publie progressivement dans l'espace membre.</p>
      </article>
    );
  }

  return (
    <div className="product-modules-grid">
      {modules.map((module) => (
        <article className="product-module-card" key={module.id}>
          <div className="product-module-head">
            <div>
              <p className="product-module-order">Module {module.sort_order}</p>
              <h3>{module.title}</h3>
            </div>
            {showContentTypes ? (
              <AccessBadge
                label={getModuleLabel(module.content_type)}
                tone={getModuleTone(module.content_type)}
              />
            ) : null}
          </div>
          <p>{module.description}</p>
          <div className="product-module-footer">
            {module.content_type === "coming_soon" ? (
              <span className="helper">
                Le module est deja structure et sera alimente prochainement.
              </span>
            ) : (
              <span className="helper">
                {module.content_url
                  ? "Contenu accessible dans l'espace membre."
                  : "Contenu integre directement dans la plateforme."}
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
