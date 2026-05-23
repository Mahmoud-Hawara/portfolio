import { EducationGradeBadge } from "@/components/ui/education-grade-badge";
import { getGradeScore } from "@/lib/education-utils";
import { cn } from "@/lib/utils";

type EducationMetaBadgeProps = {
  grade?: string;
  className?: string;
};

export function EducationMetaBadge({ grade, className }: EducationMetaBadgeProps) {
  if (!grade) return null;

  const score = getGradeScore(grade);
  if (score) {
    return <EducationGradeBadge grade={grade} className={className} />;
  }

  const isFunded = /fully funded/i.test(grade);

  return (
    <span
      className={cn(
        "shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide",
        isFunded
          ? "border-gh-link/30 bg-gh-link/10 text-gh-link"
          : "border-border/70 bg-muted/30 text-muted-gh",
        className
      )}
    >
      {isFunded ? "Fully funded" : grade}
    </span>
  );
}
