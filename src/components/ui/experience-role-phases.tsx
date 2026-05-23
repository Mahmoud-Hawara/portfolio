import type { ExperienceEntry, ExperiencePhase } from "@/data/portfolio";
import { isCurrentRole } from "@/lib/experience-utils";
import { cn } from "@/lib/utils";

type ExperienceRolePhasesProps = {
  job: ExperienceEntry;
  phases?: ExperiencePhase[];
  variant?: "featured" | "timeline" | "default";
  className?: string;
};

function formatPhaseMeta(phase: ExperiencePhase, workMode: string) {
  return [phase.type, workMode, phase.period].filter(Boolean).join(" · ");
}

export function ExperienceRolePhases({
  job,
  phases: phasesProp,
  variant = "default",
  className,
}: ExperienceRolePhasesProps) {
  const phases = [...(phasesProp ?? job.phases ?? [])].reverse();
  if (phases.length === 0) return null;

  const defaultWorkMode = job.workMode;
  const isFeatured = variant === "featured";

  if (isFeatured) {
    return (
      <div className={cn("space-y-2", className)}>
        <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-gh">
          Role progression
        </p>
        <ul className="space-y-1.5" aria-label={`${job.company} positions`}>
          {phases.map((phase) => {
            const workMode = phase.workMode ?? defaultWorkMode;
            const role = phase.role ?? job.role;
            const current = isCurrentRole(phase.period);

            return (
              <li
                key={`${phase.type}-${phase.period}-${role}`}
                className={cn(
                  "rounded-md border px-2.5 py-2",
                  current
                    ? "border-gh-link/25 bg-gh-link/5"
                    : "border-border/70 bg-muted/15"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-semibold leading-snug text-fg",
                    current && "text-gh-link"
                  )}
                >
                  {role}
                  {current ? (
                    <span className="ml-1.5 font-mono text-[9px] font-medium uppercase tracking-wide text-gh-link/90">
                      Current
                    </span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-gh">
                  {formatPhaseMeta(phase, workMode)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <ul
      className={cn("mt-3 space-y-3 border-l border-border pl-4", className)}
      aria-label={`${job.company} positions`}
    >
      {phases.map((phase) => {
        const workMode = phase.workMode ?? defaultWorkMode;
        const role = phase.role ?? job.role;
        const current = isCurrentRole(phase.period);

        return (
          <li
            key={`${phase.type}-${phase.period}-${role}`}
            className={cn(
              "relative rounded-md py-1.5 pr-2",
              current && "bg-muted/25"
            )}
          >
            <p
              className={cn(
                "text-sm font-semibold text-fg",
                current && "text-gh-link"
              )}
            >
              {role}
            </p>
            <p
              className={cn(
                "mt-0.5 text-xs text-muted-gh",
                current && "font-medium text-fg/80"
              )}
            >
              {formatPhaseMeta(phase, workMode)}
            </p>
            {phase.note ? (
              <p className="mt-1 text-[11px] text-muted-gh/85">{phase.note}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
