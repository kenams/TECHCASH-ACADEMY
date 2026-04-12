"use client";

type ModuleProgressTrackerProps = {
  seen: boolean;
  onToggle: () => void;
};

export function ModuleProgressTracker({ seen, onToggle }: ModuleProgressTrackerProps) {
  return (
    <button
      type="button"
      className={`module-seen-btn ${seen ? "seen" : ""}`}
      onClick={onToggle}
      aria-pressed={seen}
    >
      <span aria-hidden="true">{seen ? "✓" : "○"}</span>
      <span>{seen ? "Module vu" : "Marquer comme vu"}</span>
    </button>
  );
}
