"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { EducationSchoolMark } from "@/components/ui/education-school-mark";
import { EducationStatusBadge } from "@/components/ui/education-status-badge";
import { EducationHighlightItem } from "@/components/ui/education-highlight-item";
import type { EducationEntry } from "@/data/portfolio";
import { getEducationBrand } from "@/lib/education-brands";
import {
  getEducationEntryId,
  getEducationLevel,
  getEducationStatus,
  getPeriodEndYear,
} from "@/lib/education-utils";
import { anchorScroll } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

type EducationJourneyStepProps = {
  entry: EducationEntry;
  index: number;
  totalSteps: number;
  isLast?: boolean;
  className?: string;
};

function YearMarker({
  endYear,
  brandAccentBorder,
  layout,
}: {
  endYear: string;
  brandAccentBorder: string;
  layout: "row" | "column";
}) {
  return (
    <div
      className={cn(
        "education-year-marker flex items-center justify-center",
        layout === "row" && "education-year-marker--row",
        brandAccentBorder
      )}
    >
      <span className="font-mono text-[11px] font-bold tabular-nums leading-none text-fg">
        {endYear}
      </span>
    </div>
  );
}

export function EducationJourneyStep({
  entry,
  index,
  totalSteps,
  isLast = false,
  className,
}: EducationJourneyStepProps) {
  const level = getEducationLevel(entry);
  const status = getEducationStatus(entry);
  const isCancelled = status === "cancelled";
  const isFeatured = level === "university" && status === "completed";
  const brand = getEducationBrand(entry.school);
  const endYear = getPeriodEndYear(entry.period) ?? "—";
  const stepNum = String(index + 1).padStart(2, "0");
  const totalLabel = String(totalSteps).padStart(2, "0");

  return (
    <motion.li
      id={getEducationEntryId(entry)}
      className={cn(
        "group/step relative flex flex-col gap-2 sm:flex-row sm:gap-5",
        anchorScroll,
        className
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="sr-only">
        Stage {index + 1} of {totalSteps}, {endYear}
      </span>

      {/* Phone: year + step above the card */}
      <div className="flex items-center gap-3 sm:hidden">
        <YearMarker
          endYear={endYear}
          brandAccentBorder={brand.accentBorder}
          layout="row"
        />
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-gh">
          {stepNum}
          <span className="text-muted-gh/50"> / </span>
          {totalLabel}
        </span>
        {!isLast ? (
          <div className="education-year-connector-h min-w-6 flex-1" aria-hidden />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 sm:gap-5">
        {/* Desktop: year rail beside the card */}
        <div className="hidden w-14 shrink-0 flex-col items-center sm:flex">
          <YearMarker
            endYear={endYear}
            brandAccentBorder={brand.accentBorder}
            layout="column"
          />
          {!isLast ? (
            <div className="education-year-connector" aria-hidden />
          ) : null}
        </div>

        <article
          className={cn(
            "education-card relative w-full min-w-0 overflow-hidden",
            isCancelled && "border-dashed opacity-95",
            isFeatured && "ring-1 ring-primary/15 dark:ring-primary/25"
          )}
        >
          {isCancelled ? (
            <div className="border-b border-dashed border-amber-500/25 bg-gradient-to-r from-amber-500/12 to-transparent px-4 py-2.5 text-xs font-medium tracking-wide text-amber-900/90 dark:text-amber-200/90">
              Fully funded scholarship — chose industry over completing the program
            </div>
          ) : (
            <span className={cn("block h-1 w-full", brand.accentBar)} aria-hidden />
          )}

          {isFeatured && brand.accentGlow ? (
            <div
              className={cn(
                "pointer-events-none absolute -right-24 -top-24 size-56 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover/step:opacity-35",
                `bg-gradient-to-br ${brand.accentGlow}`
              )}
              aria-hidden
            />
          ) : null}

          <div className="relative p-4 sm:p-5 md:p-6">
            <div className="flex gap-4 sm:gap-5">
              <EducationSchoolMark
                school={entry.school}
                logo={entry.logo}
                logoClassName={cn(
                  entry.logoClassName,
                  "rounded-xl ring-1 ring-border/50"
                )}
                size={isFeatured ? "large" : "default"}
              />
              <header className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <time
                    className="rounded-md bg-muted/50 px-2 py-0.5 font-mono text-[11px] tabular-nums text-muted-gh"
                    dateTime={entry.period}
                  >
                    {entry.period}
                  </time>
                  {status === "completed" && !isCancelled ? (
                    <EducationStatusBadge status="completed" />
                  ) : null}
                  {isCancelled ? (
                    <EducationStatusBadge status="cancelled" />
                  ) : null}
                  <span className="hidden font-mono text-[10px] tabular-nums text-muted-gh/80 sm:inline">
                    · {stepNum}/{totalLabel}
                  </span>
                </div>
                <h3
                  className={cn(
                    "mt-2 font-semibold leading-snug tracking-tight text-fg",
                    isFeatured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                  )}
                >
                  {entry.school}
                </h3>
                <p className="mt-1 text-sm font-medium text-gh-link sm:text-[15px]">
                  {entry.degree}
                </p>
                {entry.location ? (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-gh">
                    <MapPin className="size-3.5 shrink-0 opacity-70" aria-hidden />
                    {entry.location}
                  </p>
                ) : null}
                {entry.grade && !isCancelled ? (
                  <p className="mt-3 inline-flex">
                    <span className="highlight-chip px-3 py-1 text-xs font-semibold tabular-nums text-fg">
                      {entry.grade}
                    </span>
                  </p>
                ) : null}
              </header>
            </div>

            {entry.highlights.length > 0 ? (
              <ul
                className={cn(
                  "mt-6",
                  isFeatured ? "space-y-3" : "space-y-2.5"
                )}
              >
                {entry.highlights.map((point) => (
                  <EducationHighlightItem key={point} text={point} />
                ))}
              </ul>
            ) : null}

            {entry.tags?.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {entry.tags
                  .filter(
                    (tag) =>
                      !(isCancelled && /fully funded|cancelled/i.test(tag))
                  )
                  .map((tag) => (
                    <li key={tag}>
                      <span className="highlight-chip px-2.5 py-1 text-[11px] font-medium text-muted-gh">
                        {tag}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : null}
          </div>
        </article>
      </div>
    </motion.li>
  );
}
