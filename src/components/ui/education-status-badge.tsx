import type { EducationStatus } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  EducationStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className:
      "border-primary/25 bg-primary/10 text-primary",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  "in-progress": {
    label: "In progress",
    className: "border-gh-link/30 bg-gh-link/10 text-gh-link",
  },
};

type EducationStatusBadgeProps = {
  status: EducationStatus;
  className?: string;
};

export function EducationStatusBadge({
  status,
  className,
}: EducationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
