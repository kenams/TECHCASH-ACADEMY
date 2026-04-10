"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: ReactNode;
  endAdornment?: ReactNode;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, icon, endAdornment, className, wrapperClassName, id, value, defaultValue, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasValue = typeof value === "string" ? value.length > 0 : typeof defaultValue === "string" ? defaultValue.length > 0 : false;

  return (
    <label className={cn("grid gap-2", wrapperClassName)} htmlFor={inputId}>
      <span className="sr-only">{label}</span>
      <span
        className={cn(
          "group relative flex min-h-[58px] items-center rounded-[18px] border bg-white/5 px-4 transition-all duration-200",
          error
            ? "border-[rgba(239,124,131,0.4)]"
            : "border-[var(--border)] focus-within:border-sky focus-within:bg-white/7"
        )}
      >
        {icon ? <span className="mr-3 text-[var(--muted)]">{icon}</span> : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "peer h-full w-full border-none bg-transparent pb-1 pt-5 text-[var(--foreground)] outline-none placeholder:text-transparent",
            endAdornment ? "pr-10" : "",
            icon ? "" : "pl-0",
            className
          )}
          placeholder={label}
          value={value}
          defaultValue={defaultValue}
          {...rest}
        />
        <span
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)] transition-all duration-200",
            icon ? "left-11" : "left-4",
            hasValue
              ? "top-3 translate-y-0 text-[11px] uppercase tracking-[0.18em]"
              : "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.18em]"
          )}
        >
          {label}
        </span>
        {endAdornment ? (
          <span className="absolute right-4 top-1/2 z-[1] -translate-y-1/2 text-[var(--muted)]">
            {endAdornment}
          </span>
        ) : null}
      </span>
      {error ? <span className="text-sm text-[var(--danger)]">{error}</span> : null}
    </label>
  );
});
