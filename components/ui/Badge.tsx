import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "primary" | "success" | "warning" | "muted";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  primary: "border-[rgba(215,184,122,0.22)] bg-[rgba(215,184,122,0.1)] text-[#f7e4c0]",
  success: "border-[rgba(52,211,153,0.22)] bg-[rgba(52,211,153,0.14)] text-[#c8fae5]",
  warning: "border-[rgba(245,158,11,0.24)] bg-[rgba(245,158,11,0.14)] text-[#fde68a]",
  muted: "border-[rgba(148,163,184,0.16)] bg-[rgba(148,163,184,0.12)] text-[#dbeafe]"
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-[0.85rem] font-semibold leading-[1.15]",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
