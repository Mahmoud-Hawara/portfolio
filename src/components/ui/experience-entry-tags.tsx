import {
  EmploymentTypeBadge,
  WorkModeBadge,
} from "@/components/ui/work-mode-badge";
import type { ExperienceEntry } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ExperienceEntryTagsProps = {
  job: ExperienceEntry;
  /** Plain date shown after badges (single-role entries) */
  period?: string;
  className?: string;
};

export function ExperienceEntryTags({
  job,
  period,
  className,
}: ExperienceEntryTagsProps) {
  return (
    <div
      className={cn(
        "mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5",
        className
      )}
      aria-label="Work arrangement"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <EmploymentTypeBadge type={job.type} />
        <WorkModeBadge mode={job.workMode} showIcon />
      </div>
      {period ? (
        <>
          <span className="text-muted-gh/40" aria-hidden>
            ·
          </span>
          <time
            className="text-xs tabular-nums text-muted-gh"
            dateTime={period}
          >
            {period}
          </time>
        </>
      ) : null}
    </div>
  );
}
