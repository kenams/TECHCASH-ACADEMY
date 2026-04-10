import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { PublicFooter } from "@/components/public-footer";
import { siteConfig } from "@/lib/site";

type LegalPageLayoutProps = {
  title: string;
  eyebrow: string;
  updatedAt: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, eyebrow, updatedAt, children }: LegalPageLayoutProps) {
  return (
    <main>
      <div className="shell">
        <Navbar brand={siteConfig.brand} isLoggedIn={false} />
        <section className="mx-auto max-w-3xl px-1 pb-8 pt-3">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <Link href="/" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Accueil
            </Link>
            <span>›</span>
            <span>{title}</span>
          </div>

          <div className="mb-10 grid gap-4">
            <span className="inline-flex w-fit rounded-full border border-[var(--border)] bg-[rgba(215,184,122,0.08)] px-4 py-2 text-sm font-semibold text-[#f2dfbb]">
              {eyebrow}
            </span>
            <div className="grid gap-3">
              <p className="text-sm text-[var(--muted)]">Dernière mise à jour&nbsp;: {updatedAt}</p>
              <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                {title}
              </h1>
            </div>
          </div>

          <div className="grid gap-5 [&_article]:rounded-[24px] [&_article]:border [&_article]:border-[var(--border)] [&_article]:bg-[var(--surface)]/95 [&_article]:p-6 [&_article]:shadow-[var(--shadow)] [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[var(--accent)] [&_p]:m-0 [&_p]:leading-8 [&_p]:text-[var(--muted)]">
            {children}
          </div>
        </section>
        <PublicFooter />
      </div>
    </main>
  );
}
