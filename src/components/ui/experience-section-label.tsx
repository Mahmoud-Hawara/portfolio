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
        "mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border/80 pb-4 pl-3",
        "border-l-2 border-l-primary/60",
        className
      )}
    >
      <div className="min-w-0">
        <h3 className="text-sm font-semibold tracking-tight text-fg">{title}</h3>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-gh">
            {description}
          </p>
        ) : null}
      </div>
      {count !== undefined ? (
        <span className="shrink-0 rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] tabular-nums text-muted-gh">
          {count} {count === 1 ? "role" : "roles"}
        </span>
      ) : null}
    </div>
  );
}
