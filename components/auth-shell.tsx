import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({ eyebrow, title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(201,169,109,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,109,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(215,184,122,0.12)] blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
        <div className="w-full rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)]/95 p-8 shadow-[var(--shadow)] backdrop-blur-xl animate-fade-up md:p-10">
          <div className="mb-8 grid justify-items-center gap-4 text-center">
            <Link href="/" aria-label="Retour à l'accueil">
              <BrandMark className="justify-center" />
            </Link>
            <div className="grid gap-3">
              <span className="inline-flex justify-center rounded-full border border-[var(--border)] bg-[rgba(215,184,122,0.08)] px-4 py-2 text-sm font-semibold text-[#f2dfbb]">
                {eyebrow}
              </span>
              <div className="grid gap-2">
                <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)]">
                  {title}
                </h1>
                <p className="text-base leading-7 text-[var(--muted)]">{subtitle}</p>
              </div>
            </div>
          </div>

          {children}

          <div className="mt-8 border-t border-[rgba(148,163,184,0.12)] pt-6 text-center">
            {footer}
          </div>
        </div>
      </div>
    </main>
  );
}
