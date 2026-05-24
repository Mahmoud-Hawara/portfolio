import { countBadge } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

type ExperienceSectionLabelProps = {
  title: string;
  description?: string;
  count?: number;
  className?: string;
};

export function ExperienceSectionLabel({
  title,
  description,
  count,
  className,
}: ExperienceSectionLabelProps) {
  return (
    <div
      className={cn(
        "mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-4",
        className
      )}
    >
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-fg">{title}</h3>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-gh">
            {description}
          </p>
        ) : null}
      </div>
      {count !== undefined ? (
        <span className={countBadge}>
          {count} {count === 1 ? "role" : "roles"}
        </span>
      ) : null}
    </div>
  );
}
