import { EducationJourney } from "@/components/ui/education-journey";
import type { EducationEntry } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type EducationListProps = {
  entries: EducationEntry[];
  className?: string;
};

export function EducationList({ entries, className }: EducationListProps) {
  return (
    <div className={cn("education-shell p-4 sm:p-6 md:p-8", className)}>
      <EducationJourney entries={entries} />
    </div>
  );
}
