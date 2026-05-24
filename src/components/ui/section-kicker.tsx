import { cn } from "@/lib/utils";

type SectionKickerProps = {
  /** e.g. "02 — Experience" */
  index: string;
  className?: string;
};

export function SectionKicker({ index, className }: SectionKickerProps) {
  const [num, ...rest] = index.split("—").map((part) => part.trim());
  const label = rest.join("—") || num;

  return (
    <p className={cn("mb-3 flex flex-wrap items-center gap-2.5", className)}>
      {num && rest.length > 0 ? (
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-gh-link/15 text-[11px] font-semibold tabular-nums text-primary shadow-sm ring-1 ring-primary/20">
          {num.replace(/\D/g, "") || num}
        </span>
      ) : null}
      <span className="flex items-center gap-2 text-sm font-medium text-muted-gh">
        <span className="text-primary/60" aria-hidden>
          ✦
        </span>
        {label}
      </span>
    </p>
  );
}
