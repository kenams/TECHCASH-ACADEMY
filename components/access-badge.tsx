type AccessBadgeProps = {
  label: string;
  tone?: "default" | "featured" | "success" | "warning";
};

export function AccessBadge({ label, tone = "default" }: AccessBadgeProps) {
  return <span className={`access-badge access-badge-${tone}`}>{label}</span>;
}
