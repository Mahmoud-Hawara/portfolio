"use client";

import { motion } from "framer-motion";
import {
  ExperienceEntryBody,
  ExperienceEntryHeader,
} from "@/components/ui/experience-entry-content";
import type { ExperienceEntry } from "@/data/portfolio";
import { getCompanyBrand } from "@/lib/company-brands";
import { GradientFrame } from "@/components/ui/gradient-frame";
import { cn } from "@/lib/utils";

type ExperienceCardProps = {
  job: ExperienceEntry;
  /** When true, cards share one outer frame on large screens (no double borders). */
  grouped?: boolean;
  /** Animated gradient border — current roles. */
  signature?: boolean;
  className?: string;
};

export function ExperienceCard({
  job,
  grouped = false,
  signature = false,
  className,
}: ExperienceCardProps) {
  const brand = getCompanyBrand(job.company);
  const hasBrandBg = Boolean(brand.cardBg);

  const card = (
    <motion.article
      className={cn(
        "card-hover group/card relative flex h-full min-h-0 flex-col overflow-hidden",
        grouped
          ? [
              "rounded-2xl border border-border/70 shadow-sm",
              "lg:rounded-none lg:border-0 lg:shadow-none",
              "hover:shadow-sm lg:hover:shadow-none",
            ]
          : [
              "rounded-2xl border border-border/70 shadow-sm",
              !signature && brand.accentBorder,
              signature && "border-0 shadow-none",
            ],
        brand.cardBg ?? "bg-surface",
        !grouped && brand.accentHover,
        grouped &&
          "hover:bg-surface/90 dark:hover:bg-surface/80 lg:hover:bg-transparent lg:dark:hover:bg-transparent",
        "transition-all duration-200",
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

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col p-4 sm:p-6">
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

  if (signature && !grouped) {
    return (
      <GradientFrame className={cn("h-full", className)} innerClassName="h-full">
        {card}
      </GradientFrame>
    );
  }

  return card;
}
