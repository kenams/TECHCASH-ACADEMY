import { cn } from "@/lib/cn";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,rgba(215,184,122,0.18),rgba(255,255,255,0.04))] shadow-[0_12px_35px_rgba(2,8,23,0.3)]">
        <span className="absolute inset-[1px] rounded-[15px] bg-[linear-gradient(180deg,rgba(6,9,20,0.95),rgba(9,17,31,0.88))]" />
        <svg
          viewBox="0 0 32 32"
          className="relative z-[1] h-5 w-5 text-[var(--accent)]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 18.5h4l1.7-5.2a1 1 0 0 1 1.92.06l1.28 4.14h2.4l1.65-3.36a1 1 0 0 1 1.79.9L22.9 21a1 1 0 0 1-.9.55h-4.9a1 1 0 0 1-.96-.7l-.69-2.23-.9 2.65a1 1 0 0 1-.95.68H9a1 1 0 1 1 0-2Z"
            fill="currentColor"
          />
          <path
            d="M10 9.5c1.77-1.37 3.82-2.06 6.16-2.06 2.33 0 4.38.69 6.14 2.06"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity="0.82"
          />
          <path
            d="M7.75 12.5c2.35-2.25 5.16-3.38 8.41-3.38 3.24 0 6.04 1.13 8.39 3.38"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.48"
          />
        </svg>
      </span>
      <span className="grid">
        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]">
          TechCash
        </span>
        {!compact ? (
          <span className="text-sm text-[var(--muted)]">Academy</span>
        ) : null}
      </span>
    </span>
  );
}
