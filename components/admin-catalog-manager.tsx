"use client";

import { useMemo, useState, useTransition } from "react";
import type { ProductContentType, ProductModuleRecord, ProductRecord } from "@/lib/types";

type ProductWithModules = ProductRecord & {
  modules: ProductModuleRecord[];
};

type CatalogSnapshot = {
  source: "database" | "fallback";
  schemaReady: boolean;
  products: ProductWithModules[];
};

type ProductFormState = {
  slug: string;
  title: string;
  subtitle: string;
  short_description: string;
  long_description: string;
  price_cents: string;
  currency: string;
  stripe_price_id: string;
  thumbnail_url: string;
  is_active: boolean;
  is_featured: boolean;
};

type ModuleFormState = {
  product_id: string;
  slug: string;
  title: string;
  description: string;
  content_type: ProductContentType;
  content_url: string;
  content_body: string;
  is_published: boolean;
  sort_order: string;
};

const defaultProductForm: ProductFormState = {
  slug: "",
  title: "",
  subtitle: "",
  short_description: "",
  long_description: "",
  price_cents: "5900",
  currency: "eur",
  stripe_price_id: "",
  thumbnail_url: "",
  is_active: true,
  is_featured: false
};

const defaultModuleForm = (productId = ""): ModuleFormState => ({
  product_id: productId,
  slug: "",
  title: "",
  description: "",
  content_type: "text",
  content_url: "",
  content_body: "",
  is_published: true,
  sort_order: "1"
});

function mapProductToForm(product: ProductRecord): ProductFormState {
  return {
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle,
    short_description: product.short_description,
    long_description: product.long_description,
    price_cents: String(product.price_cents),
    currency: product.currency,
    stripe_price_id: product.stripe_price_id || "",
    thumbnail_url: product.thumbnail_url || "",
    is_active: product.is_active,
    is_featured: product.is_featured
  };
}

function mapModuleToForm(module: ProductModuleRecord): ModuleFormState {
  return {
    product_id: module.product_id,
    slug: module.slug,
    title: module.title,
    description: module.description,
    content_type: module.content_type,
    content_url: module.content_url || "",
    content_body: module.content_body || "",
    is_published: module.is_published,
    sort_order: String(module.sort_order)
  };
}

export function AdminCatalogManager({ initialSnapshot }: { initialSnapshot: CatalogSnapshot }) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [selectedProductId, setSelectedProductId] = useState(initialSnapshot.products[0]?.id || "");
  const [productForm, setProductForm] = useState<ProductFormState>(defaultProductForm);
  const [moduleForm, setModuleForm] = useState<ModuleFormState>(defaultModuleForm(initialSnapshot.products[0]?.id || ""));
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const selectedProduct = useMemo(
    () => snapshot.products.find((product) => product.id === selectedProductId) || null,
    [snapshot.products, selectedProductId]
  );

  async function refreshCatalog() {
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    const payload = (await response.json()) as CatalogSnapshot & { error?: string };

    if (!response.ok) {
      throw new Error(payload.error || "Impossible de recharger le catalogue.");
    }

    setSnapshot(payload);

    if (!selectedProductId && payload.products[0]) {
      setSelectedProductId(payload.products[0].id);
      setModuleForm(defaultModuleForm(payload.products[0].id));
    }
  }

  function runAction(task: () => Promise<void>) {
    startTransition(async () => {
      setMessage("");
      setError("");

      try {
        await task();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      }
    });
  }

  function beginProductEdit(product: ProductRecord) {
    setEditingProductId(product.id);
    setProductForm(mapProductToForm(product));
  }

  function beginModuleEdit(module: ProductModuleRecord) {
    setEditingModuleId(module.id);
    setModuleForm(mapModuleToForm(module));
    setSelectedProductId(module.product_id);
  }

  async function submitProduct() {
    const url = editingProductId ? `/api/admin/products/${editingProductId}` : "/api/admin/products";
    const method = editingProductId ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...productForm,
        price_cents: Number(productForm.price_cents)
      })
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(payload.error || "Impossible d'enregistrer la formation.");
    }

    await refreshCatalog();
    setProductForm(defaultProductForm);
    setEditingProductId(null);
    setMessage(editingProductId ? "Formation mise à jour." : "Formation créée.");
  }

  async function removeProduct(productId: string) {
    const response = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(payload.error || "Impossible de supprimer la formation.");
    }

    await refreshCatalog();
    setEditingProductId(null);
    setProductForm(defaultProductForm);
    if (selectedProductId === productId) {
      const nextId = snapshot.products.find((product) => product.id !== productId)?.id || "";
      setSelectedProductId(nextId);
      setModuleForm(defaultModuleForm(nextId));
    }
    setMessage("Formation supprimée.");
  }

  async function submitModule() {
    const url = editingModuleId ? `/api/admin/modules/${editingModuleId}` : "/api/admin/modules";
    const method = editingModuleId ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...moduleForm,
        sort_order: Number(moduleForm.sort_order)
      })
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(payload.error || "Impossible d'enregistrer le module.");
    }

    await refreshCatalog();
    setEditingModuleId(null);
    setModuleForm(defaultModuleForm(selectedProductId));
    setMessage(editingModuleId ? "Module mis à jour." : "Module créé.");
  }

  async function removeModule(moduleId: string) {
    const response = await fetch(`/api/admin/modules/${moduleId}`, { method: "DELETE" });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(payload.error || "Impossible de supprimer le module.");
    }

    await refreshCatalog();
    if (editingModuleId === moduleId) {
      setEditingModuleId(null);
      setModuleForm(defaultModuleForm(selectedProductId));
    }
    setMessage("Module supprimé.");
  }

  return (
    <div className="stack">
      {!snapshot.schemaReady ? (
        <article className="message error">
          Le schéma `products` / `product_modules` n'est pas encore appliqué sur Supabase. Le
          catalogue affiché ici vient du fallback code. Les actions d'édition ne seront pas
          persistées tant que la migration SQL n'est pas exécutée.
        </article>
      ) : null}

      {message ? <article className="message success">{message}</article> : null}
      {error ? <article className="message error">{error}</article> : null}

      <section className="admin-grid">
        <article className="card admin-list">
          <div className="section-title">
            <h2>Catalogue actuel</h2>
            <p>{snapshot.products.length} formation(s) disponibles dans l'administration.</p>
          </div>

          <div className="stack compact-list">
            {snapshot.products.map((product) => (
              <button
                key={product.id}
                type="button"
                className={`admin-product-item ${selectedProductId === product.id ? "admin-product-item-active" : ""}`}
                onClick={() => {
                  setSelectedProductId(product.id);
                  setModuleForm((previous) => ({ ...previous, product_id: product.id }));
                }}
              >
                <div className="admin-product-copy">
                  <strong>{product.title}</strong>
                  <span>{product.slug}</span>
                </div>
                <div className="cta-row">
                  {product.is_featured ? <span className="pill">Offre principale</span> : null}
                  {!product.is_active ? <span className="access-badge access-badge-warning">Inactive</span> : null}
                </div>
              </button>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="section-title">
            <h2>{editingProductId ? "Modifier la formation" : "Nouvelle formation"}</h2>
            <p>Slug, prix, thumbnail, CTA Stripe et texte marketing principal.</p>
          </div>

          <div className="admin-form-grid">
            <label className="field">
              <span>Slug</span>
              <input value={productForm.slug} onChange={(event) => setProductForm((prev) => ({ ...prev, slug: event.target.value }))} />
            </label>
            <label className="field">
              <span>Titre</span>
              <input value={productForm.title} onChange={(event) => setProductForm((prev) => ({ ...prev, title: event.target.value }))} />
            </label>
            <label className="field">
              <span>Sous-titre</span>
              <input value={productForm.subtitle} onChange={(event) => setProductForm((prev) => ({ ...prev, subtitle: event.target.value }))} />
            </label>
            <label className="field">
              <span>Prix en centimes</span>
              <input value={productForm.price_cents} onChange={(event) => setProductForm((prev) => ({ ...prev, price_cents: event.target.value }))} />
            </label>
            <label className="field">
              <span>Devise</span>
              <input value={productForm.currency} onChange={(event) => setProductForm((prev) => ({ ...prev, currency: event.target.value }))} />
            </label>
            <label className="field">
              <span>Stripe price id</span>
              <input value={productForm.stripe_price_id} onChange={(event) => setProductForm((prev) => ({ ...prev, stripe_price_id: event.target.value }))} />
            </label>
            <label className="field field-span-2">
              <span>Thumbnail URL</span>
              <input value={productForm.thumbnail_url} onChange={(event) => setProductForm((prev) => ({ ...prev, thumbnail_url: event.target.value }))} />
            </label>
            <label className="field field-span-2">
              <span>Description courte</span>
              <textarea value={productForm.short_description} onChange={(event) => setProductForm((prev) => ({ ...prev, short_description: event.target.value }))} rows={3} />
            </label>
            <label className="field field-span-2">
              <span>Description longue</span>
              <textarea value={productForm.long_description} onChange={(event) => setProductForm((prev) => ({ ...prev, long_description: event.target.value }))} rows={5} />
            </label>
          </div>

          <div className="cta-row admin-checks">
            <label className="admin-check">
              <input
                type="checkbox"
                checked={productForm.is_active}
                onChange={(event) => setProductForm((prev) => ({ ...prev, is_active: event.target.checked }))}
              />
              Formation active
            </label>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={productForm.is_featured}
                onChange={(event) => setProductForm((prev) => ({ ...prev, is_featured: event.target.checked }))}
              />
              Offre principale
            </label>
          </div>

          <div className="cta-row">
            <button className="button" type="button" disabled={isPending} onClick={() => runAction(submitProduct)}>
              {editingProductId ? "Enregistrer la formation" : "Créer la formation"}
            </button>
            <button
              className="button-secondary"
              type="button"
              disabled={isPending}
              onClick={() => {
                setEditingProductId(null);
                setProductForm(defaultProductForm);
              }}
            >
              Réinitialiser
            </button>
          </div>
        </article>
      </section>

      {selectedProduct ? (
        <section className="admin-grid">
          <article className="card admin-list">
            <div className="section-title">
              <h2>Modules de la formation</h2>
              <p>{selectedProduct.title}</p>
            </div>

            <div className="stack compact-list">
              {selectedProduct.modules.map((module) => (
                <div className="admin-module-item" key={module.id}>
                  <div className="admin-module-copy">
                    <strong>
                      {module.sort_order}. {module.title}
                    </strong>
                    <span>
                      {module.slug} · {module.content_type} · {module.is_published ? "publié" : "brouillon"}
                    </span>
                  </div>
                  <div className="cta-row">
                    <button className="button-secondary" type="button" onClick={() => beginModuleEdit(module)}>
                      Modifier
                    </button>
                    <button className="button-ghost" type="button" onClick={() => runAction(() => removeModule(module.id))}>
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cta-row admin-inline-actions">
              <button className="button-secondary" type="button" onClick={() => beginProductEdit(selectedProduct)}>
                Modifier la formation
              </button>
              <button className="button-ghost" type="button" onClick={() => runAction(() => removeProduct(selectedProduct.id))}>
                Supprimer la formation
              </button>
            </div>
          </article>

          <article className="card">
            <div className="section-title">
              <h2>{editingModuleId ? "Modifier le module" : "Nouveau module"}</h2>
              <p>Texte, PDF, ressource, vidéo ou module à venir.</p>
            </div>

            <div className="admin-form-grid">
              <label className="field">
                <span>Slug</span>
                <input value={moduleForm.slug} onChange={(event) => setModuleForm((prev) => ({ ...prev, slug: event.target.value }))} />
              </label>
              <label className="field">
                <span>Titre</span>
                <input value={moduleForm.title} onChange={(event) => setModuleForm((prev) => ({ ...prev, title: event.target.value }))} />
              </label>
              <label className="field field-span-2">
                <span>Description</span>
                <textarea value={moduleForm.description} onChange={(event) => setModuleForm((prev) => ({ ...prev, description: event.target.value }))} rows={3} />
              </label>
              <label className="field">
                <span>Type</span>
                <select value={moduleForm.content_type} onChange={(event) => setModuleForm((prev) => ({ ...prev, content_type: event.target.value as ProductContentType }))}>
                  <option value="text">Texte</option>
                  <option value="pdf">PDF</option>
                  <option value="resource">Ressource</option>
                  <option value="video">Vidéo</option>
                  <option value="coming_soon">Bientôt disponible</option>
                </select>
              </label>
              <label className="field">
                <span>Ordre</span>
                <input value={moduleForm.sort_order} onChange={(event) => setModuleForm((prev) => ({ ...prev, sort_order: event.target.value }))} />
              </label>
              <label className="field field-span-2">
                <span>Content URL</span>
                <input value={moduleForm.content_url} onChange={(event) => setModuleForm((prev) => ({ ...prev, content_url: event.target.value }))} />
              </label>
              <label className="field field-span-2">
                <span>Content body</span>
                <textarea value={moduleForm.content_body} onChange={(event) => setModuleForm((prev) => ({ ...prev, content_body: event.target.value }))} rows={6} />
              </label>
            </div>

            <div className="cta-row admin-checks">
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={moduleForm.is_published}
                  onChange={(event) => setModuleForm((prev) => ({ ...prev, is_published: event.target.checked }))}
                />
                Module publié
              </label>
            </div>

            <div className="cta-row">
              <button className="button" type="button" disabled={isPending || !selectedProduct} onClick={() => runAction(submitModule)}>
                {editingModuleId ? "Enregistrer le module" : "Créer le module"}
              </button>
              <button
                className="button-secondary"
                type="button"
                disabled={isPending}
                onClick={() => {
                  setEditingModuleId(null);
                  setModuleForm(defaultModuleForm(selectedProductId));
                }}
              >
                Réinitialiser
              </button>
            </div>
          </article>
        </section>
      ) : null}
    </div>
  );
}
