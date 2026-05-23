"use client";

import { useEffect, useRef } from "react";
import { WaveSvg } from "@/components/background/wave-svg";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type WaveBackdropProps = {
  /** section = subtle behind content; footer = bottom accent */
  placement?: "section" | "footer";
  /** Gentle mouse parallax (hero only recommended) */
  parallax?: boolean;
  className?: string;
};

const opacity: Record<NonNullable<WaveBackdropProps["placement"]>, string> = {
  section: "opacity-[0.12] dark:opacity-[0.18]",
  footer: "opacity-[0.16] dark:opacity-[0.24]",
};

export function WaveBackdrop({
  placement = "section",
  parallax = false,
  className,
}: WaveBackdropProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !parallax || !ref.current) return;

    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.setProperty("--wave-px", `${x}px`);
      el.style.setProperty("--wave-py", `${y}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, parallax]);

  const animate = !reduced;

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 hidden overflow-hidden select-none md:block",
        opacity[placement],
        className
      )}
      aria-hidden
    >
      {/* Soft color wash — no layout impact */}
      <div
        className={cn(
          "absolute inset-0",
          placement === "footer" && "wave-mesh-footer",
          placement === "section" && "wave-mesh-section"
        )}
      />

      <div className="wave-parallax absolute inset-0 -inset-y-[10%]">
        <div className={cn("h-full w-full", animate && "wave-drift")}>
          <WaveSvg
            gradientId={`wave-${placement}`}
            className="min-h-full min-w-[110%] -translate-x-[5%]"
          />
        </div>
      </div>

      {/* Fade edges so lines never compete with text */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70 dark:from-background/60 dark:to-background/80" />
    </div>
  );
}
