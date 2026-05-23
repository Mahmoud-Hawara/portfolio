import type { EducationMilestone } from "@/lib/education-utils";
import { getEducationBrand } from "@/lib/education-brands";
import { cn } from "@/lib/utils";

function getMilestoneBrand(item: EducationMilestone) {
  if (item.level === "graduate") {
    return getEducationBrand("German University in Cairo");
  }
  if (item.level === "university") {
    return getEducationBrand("Benha University");
  }
  return getEducationBrand("Qalyub Military Secondary School");
}

type EducationMilestoneCardProps = {
  item: EducationMilestone;
  className?: string;
};

export function EducationMilestoneCard({
  item,
  className,
}: EducationMilestoneCardProps) {
  const brand = getMilestoneBrand(item);
  const isCancelled = item.status === "cancelled";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-md border text-center leading-tight transition-colors",
        "px-2 py-1.5 sm:px-2.5 sm:py-2",
        isCancelled
          ? "border-dashed border-border/80 bg-surface/35 hover:bg-surface/50"
          : "border-border/70 bg-surface/45 hover:border-border hover:bg-surface/65",
        className
      )}
    >
      <span
        className={cn("absolute inset-x-0 top-0 h-0.5", brand.accentBar, "opacity-90")}
        aria-hidden
      />

      <div className="flex items-baseline justify-center gap-1 pt-0.5">
        <span className="font-mono text-[8px] tabular-nums text-muted-gh sm:text-[9px]">
          {item.year}
        </span>
        <span
          className={cn(
            "font-mono text-[11px] font-semibold tabular-nums sm:text-xs",
            isCancelled ? "text-muted-gh" : "text-fg"
          )}
        >
          {item.value}
        </span>
      </div>

      <p className="mt-0.5 text-[8px] leading-snug max-sm:whitespace-normal sm:truncate sm:text-[9px]">
        <span className="font-medium text-gh-link">{item.label}</span>
        <span className="text-muted-gh"> · {item.school}</span>
        {item.detail ? (
          <span
            className={cn(
              isCancelled ? "text-amber-600/90 dark:text-amber-400/90" : "text-muted-gh"
            )}
          >
            {" "}
            · {item.detail}
          </span>
        ) : null}
      </p>
    </article>
  );
}
