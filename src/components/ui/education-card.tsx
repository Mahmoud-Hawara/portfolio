"use client";

import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { EducationMetaBadge } from "@/components/ui/education-meta-badge";
import { EducationSchoolMark } from "@/components/ui/education-school-mark";
import { EducationStatusBadge } from "@/components/ui/education-status-badge";
import { FormattedText } from "@/components/ui/formatted-text";
import { TechItemIcon } from "@/components/ui/tech-item-icon";
import type { EducationEntry } from "@/data/portfolio";
import { getEducationBrand } from "@/lib/education-brands";
import {
  getEducationEntryId,
  getEducationLevel,
  getEducationStatus,
  getGradeScore,
  getPeriodEndYear,
} from "@/lib/education-utils";
import { anchorScroll } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

type EducationCardProps = {
  entry: EducationEntry;
  variant?: "featured" | "timeline";
  index?: number;
  className?: string;
};

const levelLabel = {
  university: "Bachelor's",
  graduate: "Master's",
  secondary: "High school",
} as const;

export function EducationCard({
  entry,
  variant = "timeline",
  index = 0,
  className,
}: EducationCardProps) {
  const isFeatured = variant === "featured";
  const level = getEducationLevel(entry);
  const status = getEducationStatus(entry);
  const isCancelled = status === "cancelled";
  const endYear = getPeriodEndYear(entry.period);
  const brand = getEducationBrand(entry.school);
  const hasBrandBg = Boolean(brand.cardBg);
  const useCheckBullets = !isCancelled;

  return (
    <motion.article
      id={getEducationEntryId(entry)}
      className={cn(
        "group/edu relative overflow-hidden rounded-lg border transition-all duration-200",
        anchorScroll,
        isCancelled
          ? "border-dashed border-border/90 bg-surface/30 opacity-95 hover:border-muted-gh/50 hover:bg-muted/15"
          : "border-border/80 bg-surface/40 hover:border-border hover:bg-surface hover:shadow-md",
        hasBrandBg && brand.cardBg,
        isFeatured && !isCancelled && "border-border shadow-sm ring-1 ring-primary/10",
        className
      )}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {isFeatured && !isCancelled ? (
        <span className={cn("block h-1 w-full shrink-0", brand.accentBar)} aria-hidden />
      ) : (
        <span
          className={cn(
            "absolute inset-y-3 left-0 w-[3px] rounded-r-full opacity-0 transition-opacity duration-200 group-hover/edu:opacity-100",
            isCancelled ? "bg-muted-gh/40" : brand.accentBar
          )}
          aria-hidden
        />
      )}

      {hasBrandBg ? (
        <div
          className={cn(
            "pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl transition-opacity duration-300",
            `bg-gradient-to-br ${brand.accentGlow ?? "from-primary/20 via-transparent"}`,
            isCancelled
              ? "opacity-15 group-hover/edu:opacity-25"
              : "opacity-25 group-hover/edu:opacity-45"
          )}
          aria-hidden
        />
      ) : null}

      <div className={cn("relative p-4 sm:p-5", isFeatured && "sm:p-6")}>
        <div className="flex gap-3 sm:gap-4">
          <EducationSchoolMark
            school={entry.school}
            logo={entry.logo}
            logoClassName={entry.logoClassName}
            size={isFeatured ? "large" : "default"}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-gh">
                    {levelLabel[level]}
                  </span>
                  {endYear ? (
                    <span className="font-mono text-[10px] text-muted-gh/80">
                      · Class of {endYear}
                    </span>
                  ) : null}
                  {status !== "completed" ? (
                    <EducationStatusBadge status={status} />
                  ) : null}
                </div>
                <h3
                  className={cn(
                    "mt-1 font-semibold leading-snug",
                    isCancelled ? "text-muted-gh" : "text-fg",
                    isFeatured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                  )}
                >
                  {entry.school}
                </h3>
                <p
                  className={cn(
                    "mt-0.5 font-medium",
                    isCancelled ? "text-muted-gh" : "text-gh-link",
                    isFeatured ? "text-sm sm:text-base" : "text-sm"
                  )}
                >
                  {entry.degree}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <time
                  className={cn(
                    "rounded-md border px-2 py-1 text-[10px] font-medium tabular-nums sm:text-[11px]",
                    isCancelled
                      ? "border-border/60 bg-muted/20 text-muted-gh/80"
                      : "border-border/80 bg-muted/25 text-muted-gh"
                  )}
                  dateTime={entry.period}
                >
                  {entry.period}
                </time>
                <EducationMetaBadge grade={entry.grade} />
              </div>
            </div>

            <div className="mt-2 space-y-1">
              {entry.location ? (
                <p className="flex items-center gap-1.5 text-sm text-muted-gh">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {entry.location}
                </p>
              ) : null}
              {entry.grade && getGradeScore(entry.grade) ? (
                <p className="text-sm text-muted-gh">{entry.grade}</p>
              ) : null}
            </div>
          </div>
        </div>

        {entry.highlights.length > 0 ? (
          <div
            className={cn(
              isFeatured ? "mt-5" : "mt-4",
              isFeatured &&
                !isCancelled &&
                "overflow-hidden rounded-lg border border-border/70 bg-muted/15"
            )}
          >
            {isFeatured && !isCancelled ? (
              <div className="border-b border-border/60 bg-muted/20 px-4 py-2 sm:px-5">
                <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-gh">
                  Academic highlights
                </p>
              </div>
            ) : (
              <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-gh">
                {isCancelled ? "Context" : "Key outcomes"}
              </p>
            )}

            {useCheckBullets ? (
              <ul
                className={cn(
                  "space-y-2.5",
                  isFeatured ? "px-4 py-3 sm:px-5 sm:py-4" : "mt-2"
                )}
              >
                {entry.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-gh"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-primary/75"
                      aria-hidden
                    />
                    <FormattedText text={point} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-gh marker:text-muted-gh/40">
                {entry.highlights.map((point) => (
                  <li key={point}>
                    <FormattedText text={point} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}

        {entry.tags && entry.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <li key={tag}>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px]",
                    isCancelled
                      ? "border-border/60 bg-muted/20 text-muted-gh"
                      : tag === "Fully Funded"
                        ? "border-gh-link/30 bg-gh-link/10 text-gh-link"
                        : "border-border/70 bg-background/60 text-fg/80"
                  )}
                >
                  <TechItemIcon name={tag} className="size-3 opacity-70" />
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}
