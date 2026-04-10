import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlowColor = "indigo" | "emerald" | "none";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
};

const glowMap: Record<GlowColor, string> = {
  indigo:
    "before:bg-[radial-gradient(circle_at_top_right,rgba(215,184,122,0.18),transparent_52%)] hover:shadow-[0_34px_90px_rgba(2,8,23,0.55)]",
  emerald:
    "before:bg-[radial-gradient(circle_at_top_right,rgba(56,199,147,0.16),transparent_52%)] hover:shadow-[0_34px_90px_rgba(2,8,23,0.55)]",
  none: "before:hidden"
};

export function GlowCard({ children, className, glowColor = "indigo" }: GlowCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-[var(--shadow)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:border after:border-white/10",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-100 before:transition-opacity before:duration-300",
        glowMap[glowColor],
        className
      )}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
