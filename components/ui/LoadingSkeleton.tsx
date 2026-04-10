export function LoadingSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)]/95 shadow-[var(--shadow)]">
      <div className="h-60 animate-shimmer bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08),rgba(255,255,255,0.02))] bg-[length:200%_100%]" />
      <div className="grid gap-4 p-6">
        <div className="grid gap-3">
          <div className="h-5 w-2/3 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08),rgba(255,255,255,0.02))] bg-[length:200%_100%]" />
          <div className="h-4 w-1/2 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08),rgba(255,255,255,0.02))] bg-[length:200%_100%]" />
        </div>
        <div className="h-4 w-full animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08),rgba(255,255,255,0.02))] bg-[length:200%_100%]" />
        <div className="h-4 w-5/6 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08),rgba(255,255,255,0.02))] bg-[length:200%_100%]" />
        <div className="mt-2 flex gap-3">
          <div className="h-11 w-36 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08),rgba(255,255,255,0.02))] bg-[length:200%_100%]" />
          <div className="h-11 w-28 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08),rgba(255,255,255,0.02))] bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}
