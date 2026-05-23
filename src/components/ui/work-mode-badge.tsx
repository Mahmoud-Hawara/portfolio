import { Building2, Globe, Shuffle } from "lucide-react";
import type { WorkMode } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const workModeBadgeStyles: Record<WorkMode, string> = {
  Remote: "border-gh-link/30 bg-gh-link/8 text-gh-link",
  "On-site": "border-border bg-muted/50 text-muted-gh",
  Hybrid: "border-gh-award/35 bg-gh-award/10 text-gh-award",
};

const workModeInlineStyles: Record<WorkMode, string> = {
  Remote: "text-gh-link",
  "On-site": "text-muted-gh",
  Hybrid: "text-gh-award",
};

const workModeIcons = {
  Remote: Globe,
  "On-site": Building2,
  Hybrid: Shuffle,
} as const;

type WorkModeBadgeProps = {
  mode: WorkMode;
  variant?: "badge" | "inline";
  showIcon?: boolean;
  className?: string;
};

const employmentTypeBadgeStyles: Record<string, string> = {
  "Full-time": "border-emerald-500/25 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400",
  "Part-time": "border-border bg-muted/40 text-muted-gh",
  Contract: "border-gh-link/30 bg-gh-link/8 text-gh-link",
};

function employmentTypeStyle(type: string) {
  if (employmentTypeBadgeStyles[type]) return employmentTypeBadgeStyles[type];
  if (type.includes("Full-time") || type.includes("Part-time")) {
    return "border-amber-500/25 bg-amber-500/8 text-amber-700 dark:text-amber-400";
  }
  return "border-border bg-muted/40 text-muted-gh";
}

type EmploymentTypeBadgeProps = {
  type: string;
  className?: string;
};

export function EmploymentTypeBadge({ type, className }: EmploymentTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium",
        employmentTypeStyle(type),
        className
      )}
    >
      {type}
    </span>
  );
}

export function PresentBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary",
        className
      )}
    >
      Present
    </span>
  );
}

export function WorkModeBadge({
  mode,
  variant = "badge",
  showIcon = false,
  className,
}: WorkModeBadgeProps) {
  const Icon = workModeIcons[mode];

  if (variant === "inline") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 font-medium",
          workModeInlineStyles[mode],
          className
        )}
      >
        {showIcon ? <Icon className="size-3 shrink-0 opacity-80" aria-hidden /> : null}
        {mode}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium",
        workModeBadgeStyles[mode],
        className
      )}
    >
      {showIcon ? <Icon className="size-3 shrink-0 opacity-80" aria-hidden /> : null}
      {mode}
    </span>
  );
}
