import { cn } from "@/lib/utils";

type HeroWaveSvgProps = {
  className?: string;
};

/** Richer hero contour lines — gradient stroke + soft glow */
export function HeroWaveSvg({ className }: HeroWaveSvgProps) {
  const id = "wave-hero";

  return (
    <svg
      className={cn("h-full w-full", className)}
      viewBox="0 0 1440 280"
      preserveAspectRatio="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--wave-cyan)" stopOpacity="0" />
          <stop offset="20%" stopColor="var(--wave-cyan)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--wave-blue)" stopOpacity="1" />
          <stop offset="78%" stopColor="var(--wave-purple)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--wave-purple)" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
        </filter>
      </defs>

      {/* Glow pass */}
      <g
        fill="none"
        stroke={`url(#${id}-stroke)`}
        strokeLinecap="round"
        filter={`url(#${id}-glow)`}
        opacity="0.35"
      >
        <path
          className="hero-wave-line hero-wave-line-1"
          d="M-40 95 C180 55, 360 125, 540 80 S920 40, 1100 95 S1340 130, 1520 70"
          strokeWidth="1.8"
        />
        <path
          className="hero-wave-line hero-wave-line-2"
          d="M-60 165 C140 200, 320 130, 500 175 S860 215, 1040 150 S1280 125, 1540 170"
          strokeWidth="1.5"
        />
      </g>

      {/* Primary strokes */}
      <g fill="none" stroke={`url(#${id}-stroke)`} strokeLinecap="round">
        <path
          className="hero-wave-line hero-wave-line-1"
          d="M-40 95 C180 55, 360 125, 540 80 S920 40, 1100 95 S1340 130, 1520 70"
          strokeWidth="1"
        />
        <path
          className="hero-wave-line hero-wave-line-2"
          d="M-60 165 C140 200, 320 130, 500 175 S860 215, 1040 150 S1280 125, 1540 170"
          strokeWidth="0.9"
        />
        <path
          className="hero-wave-line hero-wave-line-3"
          d="M-20 210 C200 240, 420 185, 640 220 S1000 255, 1200 195 S1400 175, 1520 205"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <path
          className="hero-wave-line hero-wave-line-4"
          d="M720 30 C780 75, 830 130, 890 185 S960 250, 1000 265"
          strokeWidth="0.7"
          strokeDasharray="4 8"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}
