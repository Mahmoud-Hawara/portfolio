import { EducationJourneyStep } from "@/components/ui/education-journey-step";
import type { EducationEntry } from "@/data/portfolio";
import { getSortedEducationEntries } from "@/lib/education-utils";
import { cn } from "@/lib/utils";

type EducationJourneyProps = {
  entries: EducationEntry[];
  className?: string;
};

export function EducationJourney({ entries, className }: EducationJourneyProps) {
  const sorted = getSortedEducationEntries(entries);

  if (sorted.length === 0) return null;

  return (
    <ol className={cn("relative space-y-6 sm:space-y-8", className)}>
      {sorted.map((entry, index) => (
        <EducationJourneyStep
          key={`${entry.school}-${entry.period}`}
          entry={entry}
          index={index}
          totalSteps={sorted.length}
          isLast={index === sorted.length - 1}
        />
      ))}
    </ol>
  );
}
