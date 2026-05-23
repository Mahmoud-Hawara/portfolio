import { getGradeScore } from "@/lib/education-utils";
import { cn } from "@/lib/utils";

type EducationGradeBadgeProps = {
  grade?: string;
  className?: string;
};

export function EducationGradeBadge({ grade, className }: EducationGradeBadgeProps) {
  const score = getGradeScore(grade);
  if (!score) return null;

  return (
    <span
      className={cn(
        "shrink-0 rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium tabular-nums text-primary",
        className
      )}
    >
      {score}
    </span>
  );
}
