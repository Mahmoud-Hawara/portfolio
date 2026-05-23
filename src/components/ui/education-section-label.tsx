import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EducationSectionLabelProps = {
  title: string;
  description?: ReactNode;
  descriptionMobile?: ReactNode;
  count?: number;
  className?: string;
};

export function EducationSectionLabel({
  title,
  description,
  descriptionMobile,
  count,
  className,
}: EducationSectionLabelProps) {
  const mobileDescription = descriptionMobile ?? description;
  const countLabel =
    count !== undefined ? `${count} ${count === 1 ? "degree" : "degrees"}` : null;

  return (
    <div
      className={cn(
        "mb-5 flex flex-col gap-3 border-b border-border/80 pb-4 pl-3",
        "border-l-2 border-l-primary/60",
        "sm:flex-row sm:flex-wrap sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold tracking-tight text-fg">{title}</h3>
          {countLabel ? (
            <span className="shrink-0 rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] tabular-nums text-muted-gh sm:hidden">
              {countLabel}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="mt-1.5 hidden max-w-2xl text-sm leading-relaxed text-muted-gh sm:block">
            {description}
          </p>
        ) : null}
        {mobileDescription ? (
          <div className="mt-2 sm:hidden">
            <p className="border-l-2 border-primary/35 pl-2.5 text-xs leading-relaxed text-muted-gh">
              {mobileDescription}
            </p>
          </div>
        ) : null}
      </div>
      {countLabel ? (
        <span className="hidden shrink-0 rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] tabular-nums text-muted-gh sm:inline-flex">
          {countLabel}
        </span>
      ) : null}
    </div>
  );
}
