import { Check, Rocket } from "lucide-react";
import { FormattedText } from "@/components/ui/formatted-text";
import { cn } from "@/lib/utils";

function isCapstoneHighlight(text: string): boolean {
  return /graduation project|online judge|thesis|capstone/i.test(text);
}

type EducationHighlightItemProps = {
  text: string;
  className?: string;
};

export function EducationHighlightItem({
  text,
  className,
}: EducationHighlightItemProps) {
  const isCapstone = isCapstoneHighlight(text);

  if (isCapstone) {
    return (
      <li className={cn("list-none", className)}>
        <div className="overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border/60">
          <div
            className="h-0.5 bg-gradient-to-r from-primary via-gh-link/80 to-primary/20"
            aria-hidden
          />
          <div className="flex gap-3 p-4">
            <Rocket
              className="mt-0.5 size-4 shrink-0 text-primary"
              strokeWidth={2}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Capstone project
              </p>
              <p className="text-sm leading-relaxed text-muted-gh">
                <FormattedText text={text} />
              </p>
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li
      className={cn(
        "flex gap-2.5 text-sm leading-relaxed text-muted-gh",
        className
      )}
    >
      <Check
        className="mt-0.5 size-3.5 shrink-0 text-primary/80"
        strokeWidth={2.5}
        aria-hidden
      />
      <span className="min-w-0">
        <FormattedText text={text} />
      </span>
    </li>
  );
}
