"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
};

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-[52px] px-6 text-[0.97rem]",
  lg: "min-h-14 px-7 text-base"
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-[#18120a] shadow-[0_18px_45px_rgba(184,139,68,0.28)] hover:scale-[1.02] hover:shadow-[0_24px_58px_rgba(184,139,68,0.38)]",
  secondary:
    "border border-[var(--border)] bg-white/5 text-[var(--foreground)] hover:bg-white/8 hover:border-[rgba(201,169,109,0.3)] hover:scale-[1.02]",
  ghost:
    "after:absolute after:bottom-2 after:left-2 after:h-px after:w-[calc(100%-1rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:text-[var(--foreground)] hover:after:scale-x-100 bg-transparent px-2 text-[var(--muted)]"
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  return cn(baseClasses, sizeClasses[size], variantClasses[variant], className);
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      className={buttonClasses(variant, size, className)}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  );
}
