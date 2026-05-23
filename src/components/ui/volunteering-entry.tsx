"use client";

import { HeartHandshake, MapPin } from "lucide-react";
import { FormattedText } from "@/components/ui/formatted-text";
import { TechItemIcon } from "@/components/ui/tech-item-icon";
import type { VolunteeringEntry } from "@/data/portfolio";
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
    <article
      className={cn(
        "card-hover rounded-lg border border-border bg-card/60 p-5 transition-colors hover:bg-card/80 sm:p-6",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-gh-link">
            <HeartHandshake className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-fg">
              <span className="text-link">{entry.role}</span>
              <span className="font-normal text-muted-gh"> · </span>
              {entry.organization}
            </h3>
            {entry.category ? (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-gh">
                {entry.category}
              </p>
            ) : null}
            {entry.location ? (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-gh">
                <MapPin className="size-3.5 shrink-0" aria-hidden />
                {entry.location}
              </p>
            ) : null}
          </div>
        </div>
        <p className="shrink-0 rounded-md border border-border bg-muted/30 px-2 py-1 font-mono text-[10px] text-muted-gh">
          {entry.period}
        </p>
      </div>

      <ul className="mt-4 space-y-2 border-l-2 border-gh-link/30 pl-4">
        {entry.bullets.map((bullet) => (
          <li
            key={bullet}
            className="text-sm leading-relaxed text-muted-gh"
          >
            <FormattedText text={bullet} />
          </li>
        ))}
      </ul>

      {entry.tags && entry.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-fg/80">
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
