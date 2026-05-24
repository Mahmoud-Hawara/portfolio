"use client";

import { HeartHandshake, MapPin } from "lucide-react";
import { FormattedText } from "@/components/ui/formatted-text";
import { TechItemIcon } from "@/components/ui/tech-item-icon";
import type { VolunteeringEntry } from "@/data/portfolio";
import { softPanel } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

type VolunteeringEntryCardProps = {
  entry: VolunteeringEntry;
  className?: string;
};

export function VolunteeringEntryCard({
  entry,
  className,
}: VolunteeringEntryCardProps) {
  return (
    <article className={cn("card-hover", softPanel, "p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-gradient-to-br from-gh-link/10 to-primary/5 text-gh-link shadow-sm">
            <HeartHandshake className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-fg">
              <span className="text-link">{entry.role}</span>
              <span className="font-normal text-muted-gh"> · </span>
              {entry.organization}
            </h3>
            {entry.category ? (
              <p className="label-soft mt-1">{entry.category}</p>
            ) : null}
            {entry.location ? (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-gh">
                <MapPin className="size-3.5 shrink-0" aria-hidden />
                {entry.location}
              </p>
            ) : null}
          </div>
        </div>
        <p className="highlight-chip shrink-0 px-2.5 py-1 font-mono text-[10px] tabular-nums">
          {entry.period}
        </p>
      </div>

      <ul className="callout-soft mt-4 space-y-2">
        {entry.bullets.map((bullet) => (
          <li key={bullet} className="text-sm leading-relaxed text-muted-gh">
            <FormattedText text={bullet} />
          </li>
        ))}
      </ul>

      {entry.tags && entry.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <li key={tag}>
              <span className="highlight-chip inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-muted-gh">
                <TechItemIcon name={tag} className="size-3 opacity-70" />
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
