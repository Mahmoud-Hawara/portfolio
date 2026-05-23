"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CompanyLogo } from "@/components/ui/company-logo";
import { ExperienceEntryLocation } from "@/components/ui/experience-entry-location";
import { ExperienceEntryPhotos } from "@/components/ui/experience-entry-photo";
import { ExperienceEntryTags } from "@/components/ui/experience-entry-tags";
import { ExperienceRolePhases } from "@/components/ui/experience-role-phases";
import { FormattedText } from "@/components/ui/formatted-text";
import { TechItemIcon } from "@/components/ui/tech-item-icon";
import type { ExperienceEntry } from "@/data/portfolio";
import { getCompanyBrand } from "@/lib/company-brands";
import { isCurrentRole } from "@/lib/experience-utils";
import { cn } from "@/lib/utils";

const COLLAPSED_BULLETS = 3;

export function ExperienceEntryHeader({
  job,
  featured = false,
  variant = "default",
}: {
  job: ExperienceEntry;
  featured?: boolean;
  variant?: "featured" | "timeline" | "default";
}) {
  const isTimeline = variant === "timeline";
  const hasPhases = (job.phases?.length ?? 0) > 0;
  const wideLogo = job.logoVariant === "wide";
  const currentPhase = job.phases?.find((phase) =>
    isCurrentRole(phase.period)
  );
  const displayRole = currentPhase?.role ?? job.role;
  const brand = getCompanyBrand(job.company);

  const hasPhotos = (job.photos?.length ?? 0) > 0;

  return (
    <div className="flex gap-3 sm:gap-4">
      <div
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-md border bg-background shadow-sm",
          wideLogo ? "h-12 w-[4.25rem] sm:h-14 sm:w-[5rem]" : "size-12 sm:size-14",
          featured ? brand.accentBorder : "border-border"
        )}
      >
        <CompanyLogo
          company={job.company}
          logo={job.logo}
          logoVariant={job.logoVariant}
          logoClassName={job.logoClassName}
          size="compact"
        />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        {hasPhases ? (
          <>
            <h3
              className={cn(
                "font-semibold leading-snug text-fg",
                featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
              )}
            >
              {job.company}
            </h3>
            <div className="mt-1.5 space-y-1">
              <ExperienceEntryLocation location={job.location} />
              {hasPhotos ? (
                <ExperienceEntryPhotos
                  photos={job.photos!}
                  company={job.company}
                />
              ) : null}
              {!featured ? (
                <p className="text-xs tabular-nums text-muted-gh">
                  <time dateTime={job.period}>{job.period}</time>
                </p>
              ) : null}
              {featured ? (
                <ExperienceEntryTags
                  job={job}
                  period={job.period}
                  className="mt-2"
                />
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(
                "flex items-start justify-between gap-3",
                isTimeline && "gap-4"
              )}
            >
              <div className="min-w-0">
                <h3
                  className={cn(
                    "font-semibold leading-snug text-fg",
                    featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                  )}
                >
                  {displayRole}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-gh-link">
                  {job.company}
                </p>
              </div>
              {isTimeline ? (
                <time
                  className="shrink-0 rounded-md border border-border/80 bg-muted/25 px-2 py-1 text-[10px] font-medium tabular-nums text-muted-gh sm:text-[11px]"
                  dateTime={job.period}
                >
                  {job.period}
                </time>
              ) : null}
            </div>
            <div className="mt-1.5 space-y-1">
              <ExperienceEntryLocation location={job.location} />
              {hasPhotos ? (
                <ExperienceEntryPhotos
                  photos={job.photos!}
                  company={job.company}
                />
              ) : null}
              {featured ? (
                <ExperienceEntryTags job={job} period={job.period} className="mt-2" />
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ExperienceEntryBullets({
  job,
  collapsible = false,
  variant = "default",
  className,
}: {
  job: ExperienceEntry;
  collapsible?: boolean;
  variant?: "featured" | "timeline" | "default";
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = collapsible && job.bullets.length > COLLAPSED_BULLETS;
  const visible =
    hasMore && !expanded ? job.bullets.slice(0, COLLAPSED_BULLETS) : job.bullets;
  const hiddenCount = job.bullets.length - COLLAPSED_BULLETS;

  if (job.bullets.length === 0) return null;

  const isFeatured = variant === "featured";
  const isTimeline = variant === "timeline";

  return (
    <div
      className={cn(
        isFeatured && "space-y-2.5",
        isTimeline && "mt-3 space-y-2",
        !isFeatured && !isTimeline && "mt-3",
        className
      )}
    >
      {isFeatured ? (
        <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-gh">
          What I&apos;m doing
        </p>
      ) : null}
      {isTimeline ? (
        <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-gh">
          Key outcomes
        </p>
      ) : null}
      {isFeatured ? (
        <ul className="space-y-2.5">
          {job.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted-gh">
              <Check
                className="mt-0.5 size-3.5 shrink-0 text-primary/75"
                aria-hidden
              />
              <FormattedText text={bullet} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-gh marker:text-muted-gh/40">
          {visible.map((bullet) => (
            <li key={bullet}>
              <FormattedText text={bullet} />
            </li>
          ))}
        </ul>
      )}
      {!isFeatured && hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-medium text-gh-link hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
          <ChevronDown
            className={cn(
              "ml-0.5 inline size-3.5 align-middle transition-transform",
              expanded && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      ) : null}
    </div>
  );
}

export function ExperienceEntrySkills({
  job,
  variant = "default",
  className,
}: {
  job: ExperienceEntry;
  variant?: "featured" | "timeline" | "default";
  className?: string;
}) {
  if (!job.tags?.length) return null;

  return (
    <div
      className={cn(
        variant === "featured" && "mt-1",
        variant !== "featured" && "mt-3",
        className
      )}
    >
      <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-gh">
        {variant === "featured" ? "Technologies" : "Stack"}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <li key={tag}>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/30 px-2.5 py-0.5 text-[11px] font-medium text-muted-gh transition-colors hover:border-gh-link/25 hover:text-fg">
              <TechItemIcon name={tag} className="size-3 opacity-70" />
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceEntryBody({
  job,
  collapsibleBullets = false,
  variant = "default",
}: {
  job: ExperienceEntry;
  collapsibleBullets?: boolean;
  variant?: "featured" | "timeline" | "default";
}) {
  const hasPhases = (job.phases?.length ?? 0) > 0;

  const isFeatured = variant === "featured";

  return (
    <div
      className={cn(
        isFeatured && "mt-4 flex min-h-0 flex-1 flex-col space-y-5",
        variant === "timeline" && "mt-3",
        variant === "default" && "mt-3"
      )}
    >
      {!isFeatured ? (
        <ExperienceEntryTags
          job={job}
          period={variant === "timeline" ? undefined : hasPhases ? undefined : job.period}
        />
      ) : null}
      {hasPhases ? (
        <ExperienceRolePhases
          job={job}
          phases={job.phases}
          variant={variant}
        />
      ) : null}
      <ExperienceEntryBullets
        job={job}
        collapsible={collapsibleBullets}
        variant={variant}
        className={isFeatured ? "flex-1" : undefined}
      />
      <ExperienceEntrySkills
        job={job}
        variant={variant}
        className={isFeatured ? "mt-auto" : undefined}
      />
    </div>
  );
}
