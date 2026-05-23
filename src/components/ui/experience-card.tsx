"use client";

import { motion } from "framer-motion";
import {
  ExperienceEntryBody,
  ExperienceEntryHeader,
} from "@/components/ui/experience-entry-content";
import type { ExperienceEntry } from "@/data/portfolio";
import { getCompanyBrand } from "@/lib/company-brands";
import { cn } from "@/lib/utils";

type ExperienceCardProps = {
  job: ExperienceEntry;
  className?: string;
};

export function ExperienceCard({ job, className }: ExperienceCardProps) {
  const brand = getCompanyBrand(job.company);
  const hasBrandBg = Boolean(brand.cardBg);

  return (
    <motion.article
      className={cn(
        "card-hover group/card relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg border",
        brand.cardBg ?? "bg-surface",
        brand.accentBorder,
        brand.accentHover,
        "transition-all duration-200 hover:shadow-sm",
        className
      )}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span
        className={cn("block h-1 w-full shrink-0", brand.accentBar)}
        aria-hidden
      />

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        {hasBrandBg ? (
          <>
            <div
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 size-44 rounded-full blur-3xl",
                `bg-gradient-to-br ${brand.accentGlow}`,
                "opacity-30 transition-opacity duration-300 group-hover/card:opacity-55"
              )}
              aria-hidden
            />
            <div
              className={cn(
                "pointer-events-none absolute -bottom-14 -left-10 size-36 rounded-full blur-3xl",
                `bg-gradient-to-tr ${brand.accentGlow}`,
                "opacity-15 transition-opacity duration-300 group-hover/card:opacity-30"
              )}
              aria-hidden
            />
          </>
        ) : (
          <div
            className={cn(
              "pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover/card:opacity-100",
              `bg-gradient-to-br ${brand.accentGlow}`
            )}
            aria-hidden
          />
        )}
        <ExperienceEntryHeader job={job} featured />
        <ExperienceEntryBody job={job} variant="featured" />
      </div>
    </motion.article>
  );
}
