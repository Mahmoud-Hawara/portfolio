import type { AchievementHighlight } from "@/data/portfolio";
import {
  achievementAccentBar,
  achievementAccentHover,
  achievementAccentValue,
} from "@/lib/achievement-accents";
import { cn } from "@/lib/utils";

type AchievementHighlightsProps = {
  highlights: AchievementHighlight[];
  className?: string;
};

export function AchievementHighlights({
  highlights,
  className,
}: AchievementHighlightsProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card",
        className
      )}
      role="list"
      aria-label="Achievement highlights"
    >
      <ul
        className={cn(
          "grid grid-cols-2 divide-border sm:grid-cols-3 lg:grid-cols-6",
          "divide-x divide-y lg:divide-y-0"
        )}
      >
        {highlights.map((item) => (
          <li
            key={item.id}
            role="listitem"
            className={cn(
              "relative flex flex-col items-center justify-center px-2 py-4 text-center transition-all duration-200 hover:bg-muted/25 sm:px-3 sm:py-6",
              achievementAccentHover[item.accent]
            )}
          >
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-0.5",
                achievementAccentBar[item.accent]
              )}
              aria-hidden
            />
            <span
              className={cn(
                "font-mono text-xl font-semibold tracking-tight tabular-nums sm:text-2xl sm:text-[1.65rem]",
                achievementAccentValue[item.accent]
              )}
            >
              {item.value}
            </span>
            <span className="mt-2 max-w-[9.5rem] text-[10px] leading-snug font-medium text-fg sm:text-[11px]">
              {item.label}
            </span>
            {item.sublabel ? (
              <span className="mt-1 font-mono text-[10px] text-muted-gh">
                {item.sublabel}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
