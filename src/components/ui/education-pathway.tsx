import { EducationMilestoneCard } from "@/components/ui/education-milestone-card";
import type { EducationMilestone } from "@/lib/education-utils";
import { cn } from "@/lib/utils";

type EducationPathwayProps = {
  milestones: EducationMilestone[];
  className?: string;
};

export function EducationPathway({ milestones, className }: EducationPathwayProps) {
  if (milestones.length === 0) return null;

  const firstYear = milestones[0]?.year;
  const lastYear = milestones.at(-1)?.year;

  return (
    <div className={cn("mb-4 border-b border-border/70 pb-3.5 sm:pb-4", className)}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[9px] font-medium uppercase tracking-wide text-muted-gh">
          Academic pathway
        </p>
        {firstYear && lastYear ? (
          <p className="font-mono text-[9px] tabular-nums text-muted-gh">
            <span className="text-fg/80">{firstYear}</span>
            <span className="mx-1 text-primary/60">→</span>
            <span className="text-fg/80">{lastYear}</span>
          </p>
        ) : null}
      </div>

      <ul className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {milestones.map((item) => (
          <li key={`${item.year}-${item.school}`}>
            <EducationMilestoneCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
