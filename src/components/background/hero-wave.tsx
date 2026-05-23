"use client";

import { useEffect, useRef } from "react";
import { HeroWaveSvg } from "@/components/background/hero-wave-svg";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Enhanced hero waves — soft mesh, slow drift, gentle parallax.
 * Kept local to hero so the rest of the page stays calm.
 */
export function HeroWave() {
  const reduced = useReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !parallaxRef.current) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    if (!desktop.matches) return;

    const el = parallaxRef.current;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      el.style.setProperty("--hero-wave-x", `${x}px`);
      el.style.setProperty("--hero-wave-y", `${y}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[min(58%,440px)] overflow-hidden select-none opacity-[0.1] dark:opacity-[0.17] md:block"
      aria-hidden
    >
      {/* Ambient color orbs */}
      <div className="hero-wave-orb hero-wave-orb-cyan absolute -left-[10%] top-[5%] size-[min(55vw,420px)] rounded-full" />
      <div className="hero-wave-orb hero-wave-orb-purple absolute -right-[8%] top-[18%] size-[min(45vw,360px)] rounded-full" />

      <div
        ref={parallaxRef}
        className={cn(
          "hero-wave-parallax absolute inset-0 -inset-y-[8%]",
          !reduced && "hero-wave-drift"
        )}
      >
        <HeroWaveSvg className="min-h-full min-w-[108%] -translate-x-[4%] translate-y-4" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/25 to-background" />
    </div>
  );
}
