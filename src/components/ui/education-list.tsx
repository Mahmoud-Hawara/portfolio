"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { EducationPathway } from "@/components/ui/education-pathway";
import { EducationSectionLabel } from "@/components/ui/education-section-label";
import { EducationTimeline } from "@/components/ui/education-timeline";
import type { EducationEntry } from "@/data/portfolio";
import {
  getEducationSummaryMilestones,
  getSortedEducationEntries,
} from "@/lib/education-utils";
import { cn } from "@/lib/utils";

type EducationListProps = {
  entries: EducationEntry[];
  className?: string;
};

export function EducationList({ entries, className }: EducationListProps) {
  const sorted = getSortedEducationEntries(entries);
  const milestones = getEducationSummaryMilestones(sorted);

  return (
    <div
      className={cn(
        "card-hover relative overflow-hidden rounded-xl border border-border bg-card/85 shadow-sm ring-1 ring-border/50 backdrop-blur-sm dark:bg-card/75",
        className
      )}
    >
      <div className="relative bg-gradient-to-b from-primary/[0.04] via-muted/15 to-surface px-4 py-6 sm:px-6 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.12]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-primary/5 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <EducationSectionLabel
            title="Academic timeline"
            description={
              <>
                Newest first:{" "}
                <span className="font-medium text-fg">GUC Master&apos;s scholarship</span> (2025),{" "}
                <span className="font-medium text-fg">Benha Engineering at Shoubra</span>, then
                high school.
              </>
            }
            descriptionMobile={
              <>
                Newest first:{" "}
                <span className="font-medium text-fg">GUC</span>
                <span className="text-muted-gh/60"> · </span>
                <span className="font-medium text-fg">Benha</span>
                <span className="text-muted-gh/60"> · </span>
                high school
              </>
            }
            count={sorted.length}
            className="mb-0 border-b-0 border-l-0 pb-0 pl-0"
          />

          <EducationPathway milestones={milestones} className="mt-3" />

          <FadeIn delay={0.05}>
            <EducationTimeline entries={sorted} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
