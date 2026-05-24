"use client";

import { motion } from "framer-motion";
import {
  ExperienceEntryBody,
  ExperienceEntryHeader,
} from "@/components/ui/experience-entry-content";
import type { ExperienceEntry } from "@/data/portfolio";
import { getCompanyBrand } from "@/lib/company-brands";
import { cn } from "@/lib/utils";

/** Spine position (aligned with year markers in parent) */
export const TIMELINE_SPINE_LEFT = "left-[1.125rem]";

/** Content offset from spine */
export const TIMELINE_GUTTER = "max-sm:pl-0 sm:pl-14";

type ExperienceLinkedInEntryProps = {
  job: ExperienceEntry;
  index?: number;
  isLast?: boolean;
  className?: string;
};

export function ExperienceLinkedInEntry({
  job,
  index = 0,
  isLast = false,
  className,
}: ExperienceLinkedInEntryProps) {
  const brand = getCompanyBrand(job.company);

  return (
    <motion.article
      className={cn(
        "group/entry relative",
        TIMELINE_GUTTER,
        !isLast && "pb-8",
        className
      )}
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <span
        className={cn(
          "absolute top-7 z-10 hidden size-3 -translate-x-1/2 rounded-full border-2 bg-background ring-4 ring-surface/80 transition-all duration-200 sm:block",
          TIMELINE_SPINE_LEFT,
          brand.accentBorder,
          "group-hover/entry:scale-125 group-hover/entry:shadow-[0_0_0_4px] group-hover/entry:shadow-black/5 dark:group-hover/entry:shadow-black/25"
        )}
        aria-hidden
      />

      <span
        className={cn(
          "absolute top-[1.65rem] z-0 hidden h-px w-5 bg-border/80 transition-colors duration-200 sm:block",
          brand.accentLineHover,
          TIMELINE_SPINE_LEFT,
          "translate-x-[calc(50%+2px)]"
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 p-3.5 shadow-sm backdrop-blur-[2px] sm:p-5",
          "transition-all duration-200",
          "hover:bg-surface/90 hover:shadow-md",
          brand.accentHover
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover/entry:opacity-100",
            `bg-gradient-to-br ${brand.accentGlow}`
          )}
          aria-hidden
        />
        <span
          className={cn(
            "absolute inset-y-3 left-0 w-[3px] rounded-r-full opacity-0 transition-opacity duration-200 group-hover/entry:opacity-100",
            brand.accentBar
          )}
          aria-hidden
        />

        <div className="relative z-[1]">
          <ExperienceEntryHeader job={job} variant="timeline" />
          <ExperienceEntryBody
            job={job}
            variant="timeline"
            collapsibleBullets={job.collapsibleBullets !== false}
          />
        </div>
      </div>
    </motion.article>
  );
}
