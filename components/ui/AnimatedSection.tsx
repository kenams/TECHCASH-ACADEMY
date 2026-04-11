"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Direction = "up" | "right" | "fade";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up"
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 20% 0px"
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [visible]);

  const hiddenState =
    direction === "right"
      ? "translate-x-5 opacity-0"
      : direction === "fade"
        ? "opacity-0"
        : "translate-y-5 opacity-0";

  const shownState =
    direction === "fade"
      ? "animate-fade-in"
      : direction === "right"
        ? "translate-x-0 opacity-100 transition-all duration-500"
        : "animate-fade-up";

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", visible ? shownState : hiddenState, className)}
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
