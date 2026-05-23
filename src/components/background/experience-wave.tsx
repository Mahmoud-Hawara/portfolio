"use client";

import { ExperienceWaveSvg } from "@/components/background/experience-wave-svg";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Waves scoped to the experience card stack — side accents + soft header band.
 * Does not cover the section title so copy stays crisp.
 */
export function ExperienceWave() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden rounded-xl select-none md:block"
      aria-hidden
    >
      {/* Top band — horizontal contour behind "Current positions" */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-36 opacity-[0.11] dark:opacity-[0.16]",
          !reduced && "experience-wave-drift-slow"
        )}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="wave-exp-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--wave-blue)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--wave-blue)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--wave-cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className={cn(!reduced && "experience-wave-line experience-wave-line-2")}
            fill="none"
            stroke="url(#wave-exp-top)"
            strokeWidth="1"
            strokeLinecap="round"
            d="M-40 70 C200 35, 480 90, 720 50 S1080 25, 1320 65 S1480 85, 1520 45"
          />
          <path
            className={cn(!reduced && "experience-wave-line experience-wave-line-3")}
            fill="none"
            stroke="url(#wave-exp-top)"
            strokeWidth="0.85"
            strokeLinecap="round"
            opacity="0.6"
            d="M-20 95 C180 110, 400 60, 620 85 S980 100, 1200 55 S1420 40, 1540 75"
          />
        </svg>
      </div>

      {/* Side washes */}
      <div className="experience-wave-orb experience-wave-orb-blue absolute -left-16 top-1/4 size-56 rounded-full opacity-60 dark:opacity-80" />
      <div className="experience-wave-orb experience-wave-orb-purple absolute -right-12 bottom-1/4 size-48 rounded-full opacity-50 dark:opacity-70" />

      {/* Left / right vertical contours */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-[min(32%,140px)] opacity-[0.14] dark:opacity-[0.2]",
          !reduced && "experience-wave-drift"
        )}
      >
        <ExperienceWaveSvg side="left" className="h-full w-full" />
      </div>
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-[min(32%,140px)] opacity-[0.12] dark:opacity-[0.18]",
          !reduced && "experience-wave-drift experience-wave-drift-reverse"
        )}
      >
        <ExperienceWaveSvg side="right" className="h-full w-full" />
      </div>

      {/* Center stays clear; soft edge vignette only */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_55%,var(--background)_100%)] opacity-80 dark:opacity-90" />
    </div>
  );
}
