"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Background for the "Current positions" block only — mesh glow, grid, soft waves.
 * Kept behind cards (z-0); no center vignette so cards stay crisp.
 */
export function ExperienceCurrentBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-[var(--gh-link)]/[0.04] to-surface/80" />

      {/* Grid — matches education section */}
      <div className="absolute inset-0 grid-pattern opacity-[0.14] dark:opacity-[0.1]" />

      {/* Brand-adjacent glows: GUC (link) left, noon (yellow) right */}
      <div className="absolute -left-24 top-0 size-80 rounded-full bg-gh-link/12 blur-3xl dark:bg-gh-link/10" />
      <div className="absolute -right-20 top-1/4 size-72 rounded-full bg-[#FEEE00]/10 blur-3xl dark:bg-[#FEEE00]/[0.07]" />
      <div className="absolute bottom-0 left-1/2 size-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />

      {/* Top contour band */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-40 opacity-[0.14] dark:opacity-[0.2]",
          !reduced && "experience-wave-drift-slow"
        )}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="wave-exp-current-top"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="var(--wave-green)" stopOpacity="0" />
              <stop
                offset="35%"
                stopColor="var(--wave-blue)"
                stopOpacity="0.9"
              />
              <stop
                offset="65%"
                stopColor="var(--wave-cyan)"
                stopOpacity="0.85"
              />
              <stop offset="100%" stopColor="var(--wave-green)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className={cn(!reduced && "experience-wave-line experience-wave-line-2")}
            fill="none"
            stroke="url(#wave-exp-current-top)"
            strokeWidth="1.25"
            strokeLinecap="round"
            d="M-40 75 C220 40, 500 95, 760 55 S1120 30, 1360 70 S1500 90, 1540 50"
          />
          <path
            className={cn(!reduced && "experience-wave-line experience-wave-line-3")}
            fill="none"
            stroke="url(#wave-exp-current-top)"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.55"
            d="M-20 105 C200 120, 420 65, 640 90 S1000 108, 1220 58 S1440 42, 1560 80"
          />
        </svg>
      </div>

      {/* Bottom fade into prior experience */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface/90 to-transparent" />

      {/* Accent edge */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent sm:inset-x-8" />
    </div>
  );
}
