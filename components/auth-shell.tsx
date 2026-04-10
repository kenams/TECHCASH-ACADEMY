import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  helper?: ReactNode;
};

export function AuthShell({ eyebrow, title, subtitle, children, footer, helper }: AuthShellProps) {
  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(201,169,109,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,109,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.12),transparent_72%)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(215,184,122,0.12)] blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[560px] items-center">
        <div className="w-full rounded-[30px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(10,16,31,0.97),rgba(6,9,20,0.96))] p-7 shadow-[var(--shadow)] backdrop-blur-xl animate-fade-up md:p-10">
          <div className="mb-8 grid gap-5 text-center">
            <Link href="/" aria-label="Retour à l'accueil" className="justify-self-center">
              <BrandMark className="justify-center" compact />
            </Link>

            <div className="grid gap-4">
              <span className="inline-flex min-h-11 justify-center rounded-full border border-[var(--border)] bg-[rgba(215,184,122,0.08)] px-5 py-3 text-sm font-semibold text-[#f2dfbb]">
                {eyebrow}
              </span>

              <div className="grid gap-2">
                <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-[2.8rem] leading-[0.98] tracking-[-0.045em] text-[var(--foreground)] md:text-[3.2rem]">
                  {title}
                </h1>
                <p className="mx-auto max-w-[32rem] text-base leading-7 text-[var(--muted)]">{subtitle}</p>
              </div>
            </div>
          </div>

          {children}

          {helper ? <div className="mt-6">{helper}</div> : null}

          <div className="mt-8 border-t border-[rgba(148,163,184,0.12)] pt-6 text-center">{footer}</div>
        </div>
      </div>
    </main>
  );
}
