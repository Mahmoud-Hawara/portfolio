"use client";

import { Fragment } from "react";
import {
  ExperienceLinkedInEntry,
  TIMELINE_SPINE_LEFT,
} from "@/components/ui/experience-linkedin-entry";
import type { ExperienceEntry } from "@/data/portfolio";
import {
  getExperienceYearCaptionShort,
  getPastJobsByYear,
} from "@/lib/experience-utils";
import { cn } from "@/lib/utils";

type ExperiencePriorTimelineProps = {
  jobs: ExperienceEntry[];
  className?: string;
};

export function ExperiencePriorTimeline({
  jobs,
  className,
}: ExperiencePriorTimelineProps) {
  const yearGroups = getPastJobsByYear(jobs);
  const totalJobs = jobs.length;
  let entryIndex = 0;

  return (
    <div className={cn("relative max-sm:pl-0 sm:pl-0", className)}>
      <div
        className={cn(
          "pointer-events-none absolute top-3 bottom-6 hidden w-px sm:block",
          TIMELINE_SPINE_LEFT,
          "bg-gradient-to-b from-primary/45 via-border/90 to-transparent"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute top-3 bottom-6 hidden w-[3px] -translate-x-px sm:block",
          TIMELINE_SPINE_LEFT,
          "bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[1px]"
        )}
        aria-hidden
      />

      <ol className="relative space-y-0">
        {yearGroups.map(([year, groupJobs]) => {
          const caption = getExperienceYearCaptionShort(groupJobs);

          return (
            <Fragment key={year}>
              <li
                className={cn(
                  "relative",
                  "max-sm:mb-1 max-sm:mt-5 max-sm:first:mt-0",
                  "sm:flex sm:min-h-[2rem] sm:items-center sm:pb-1 sm:pt-2"
                )}
                aria-hidden
              >
                <div className="flex items-center gap-2 sm:hidden">
                  <span className="shrink-0 rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums tracking-wide text-fg">
                    {year}
                  </span>
                  <span className="min-w-0 truncate text-[11px] font-medium text-muted-gh">
                    {caption}
                  </span>
                  <span
                    className="h-px min-w-6 flex-1 bg-gradient-to-r from-border/80 to-transparent"
                    aria-hidden
                  />
                </div>

                <span className="absolute left-0 top-1/2 hidden w-11 -translate-y-1/2 text-right font-mono text-[10px] font-semibold tracking-wider text-muted-gh/75 sm:block">
                  {year}
                </span>
                <span
                  className={cn(
                    "absolute top-1/2 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border ring-4 ring-surface/50 sm:block",
                    TIMELINE_SPINE_LEFT
                  )}
                />
              </li>

              {groupJobs.map((job) => {
                const index = entryIndex;
                const isLast = entryIndex === totalJobs - 1;
                entryIndex += 1;

                return (
                  <li key={`${job.company}-${job.period}`}>
                    <ExperienceLinkedInEntry
                      job={job}
                      index={index}
                      isLast={isLast}
                    />
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
