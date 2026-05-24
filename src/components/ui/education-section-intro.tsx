"use client";

import Image from "next/image";
import { Building2, GraduationCap, Sparkles } from "lucide-react";
import { educationEntries } from "@/data/portfolio";
import { getEducationBrand } from "@/lib/education-brands";
import type { EducationLevel } from "@/data/portfolio";
import {
  getEducationEntryId,
  getEducationPeriodRange,
  getEducationSchoolShort,
  getEducationStatus,
  getSortedEducationEntries,
} from "@/lib/education-utils";
import { anchorScroll } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

const stageIcon: Record<EducationLevel, typeof GraduationCap> = {
  secondary: GraduationCap,
  university: Building2,
  graduate: Sparkles,
};

function scrollToEntry(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function EducationSectionIntro({ className }: { className?: string }) {
  const stages = [...getSortedEducationEntries(educationEntries)].reverse();

  return (
    <div className={cn("space-y-4", className)}>
      <p>
        From{" "}
        <span className="font-medium text-fg">secondary school in Qalyub</span>{" "}
        through{" "}
        <span className="font-medium text-fg">engineering at Benha, Shoubra</span>,
        to a{" "}
        <span className="font-medium text-fg">fully funded Master&apos;s</span> at
        GUC — tap a stage to jump to details.
      </p>

      <ul className="grid gap-2 sm:grid-cols-3">
        {stages.map((entry) => {
          const level = entry.level ?? "university";
          const isCancelled = getEducationStatus(entry) === "cancelled";
          const brand = getEducationBrand(entry.school);
          const Icon = stageIcon[level];
          const entryId = getEducationEntryId(entry);

          return (
            <li key={`${entry.school}-${entry.period}`}>
              <button
                type="button"
                onClick={() => scrollToEntry(entryId)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl border border-border/60 bg-background/60 px-2.5 py-2.5 text-left transition-all",
                  "hover:border-primary/35 hover:bg-background/90 hover:shadow-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isCancelled && "border-dashed opacity-90",
                  anchorScroll
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-card",
                    brand.accentBorder
                  )}
                >
                  {entry.logo ? (
                    <Image
                      src={entry.logo}
                      alt=""
                      width={28}
                      height={28}
                      className={cn("size-7 object-contain", entry.logoClassName)}
                    />
                  ) : (
                    <Icon className="size-4 text-primary" aria-hidden />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-fg">
                    {getEducationSchoolShort(entry.school)}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] tabular-nums text-muted-gh">
                    {getEducationPeriodRange(entry.period)}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
