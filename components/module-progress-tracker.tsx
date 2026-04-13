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
      onClick={() => {
        if (!seen) {
          onToggle();
        }
      }}
      aria-pressed={seen}
      disabled={seen}
    >
      <span aria-hidden="true">{seen ? "✓" : "○"}</span>
      <span>{seen ? "Module validé" : "Valider ce module"}</span>
    </button>
  );
}
