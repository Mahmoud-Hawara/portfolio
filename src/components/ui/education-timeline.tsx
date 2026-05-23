"use client";

import { Fragment } from "react";
import { EducationCard } from "@/components/ui/education-card";
import type { EducationEntry } from "@/data/portfolio";
import { getEducationBrand } from "@/lib/education-brands";
import {
  getEducationByYear,
  getEducationCardVariant,
  getEducationYearCaption,
  getEducationYearCaptionShort,
} from "@/lib/education-utils";
import { cn } from "@/lib/utils";

export const EDUCATION_TIMELINE_SPINE_LEFT = "left-[1.125rem] sm:left-[1.125rem]";
export const EDUCATION_TIMELINE_GUTTER = "max-sm:pl-0 sm:pl-14";

type EducationTimelineProps = {
  entries: EducationEntry[];
  className?: string;
};

export function EducationTimeline({ entries, className }: EducationTimelineProps) {
  const yearGroups = getEducationByYear(entries);
  const totalEntries = entries.length;
  let entryIndex = 0;

  if (totalEntries === 0) return null;

  return (
    <div className={cn("relative max-sm:pl-0 sm:pl-0", className)}>
      <div
        className={cn(
          "pointer-events-none absolute top-3 bottom-6 hidden w-px sm:block",
          EDUCATION_TIMELINE_SPINE_LEFT,
          "bg-gradient-to-b from-border/60 via-primary/35 to-primary/50"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute top-3 bottom-6 hidden w-[3px] -translate-x-px sm:block",
          EDUCATION_TIMELINE_SPINE_LEFT,
          "bg-gradient-to-b from-border/20 via-primary/10 to-primary/15 blur-[1px]"
        )}
        aria-hidden
      />

      <ol className="relative space-y-0">
        {yearGroups.map(([year, groupEntries]) => {
          const entry = groupEntries[0]!;
          const caption = getEducationYearCaption(entry);
          const captionShort = getEducationYearCaptionShort(entry);

          return (
            <Fragment key={year}>
              <li
                className={cn(
                  "relative",
                  "max-sm:mb-1 max-sm:mt-5 max-sm:first:mt-0",
                  "sm:flex sm:min-h-[2.75rem] sm:items-center sm:pb-1 sm:pt-2"
                )}
                aria-hidden
              >
                <div className="flex items-center gap-2 sm:hidden">
                  <span className="shrink-0 rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums tracking-wide text-fg">
                    {year}
                  </span>
                  <span className="min-w-0 truncate text-[11px] font-medium text-muted-gh">
                    {captionShort}
                  </span>
                  <span
                    className="h-px min-w-6 flex-1 bg-gradient-to-r from-border/80 to-transparent"
                    aria-hidden
                  />
                </div>

                <div className="absolute left-0 top-1/2 hidden w-12 -translate-y-1/2 text-right sm:block">
                  <span className="block font-mono text-[11px] font-semibold tabular-nums tracking-wider text-fg">
                    {year}
                  </span>
                  <span className="mt-0.5 block text-[10px] leading-snug text-muted-gh">
                    {caption}
                  </span>
                </div>
                <span
                  className={cn(
                    "absolute top-1/2 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/80 ring-4 ring-surface/60 sm:block",
                    EDUCATION_TIMELINE_SPINE_LEFT
                  )}
                />
              </li>

              {groupEntries.map((entry) => {
                const index = entryIndex;
                const isLast = entryIndex === totalEntries - 1;
                entryIndex += 1;
                const brand = getEducationBrand(entry.school);

                return (
                  <li
                    key={`${entry.school}-${entry.period}`}
                    className={cn("relative", EDUCATION_TIMELINE_GUTTER, !isLast && "pb-5 sm:pb-6")}
                  >
                    <span
                      className={cn(
                        "absolute top-7 z-10 hidden size-3 -translate-x-1/2 rounded-full border-2 bg-background ring-4 ring-surface/80 transition-all duration-200 group-hover/edu:scale-110 sm:block",
                        EDUCATION_TIMELINE_SPINE_LEFT,
                        brand.accentBorder
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "absolute top-[1.65rem] z-0 hidden h-px w-5 bg-border/80 transition-colors group-hover/edu:bg-border sm:block",
                        EDUCATION_TIMELINE_SPINE_LEFT,
                        "translate-x-[calc(50%+2px)]"
                      )}
                      aria-hidden
                    />

                    <EducationCard
                      entry={entry}
                      variant={getEducationCardVariant(entry)}
                      index={index}
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
