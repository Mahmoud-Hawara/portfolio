import { cn } from "@/lib/utils";

type WaveSvgProps = {
  className?: string;
  /** Unique id for gradient defs when multiple SVGs are on the page */
  gradientId?: string;
  /** Slightly denser paths for hero */
  dense?: boolean;
  /** Two quiet lines, no pulse animation */
  minimal?: boolean;
};

/**
 * Static SVG contour lines — no JS animation here; parent handles motion via CSS.
 */
export function WaveSvg({
  className,
  gradientId = "wave-stroke",
  dense = false,
  minimal = false,
}: WaveSvgProps) {
  if (minimal) {
    return (
      <svg
        className={cn("h-full w-full", className)}
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--wave-blue)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--wave-blue)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--wave-cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke={`url(#${gradientId})`} strokeLinecap="round">
          <path
            d="M-40 100 C200 70, 400 130, 640 95 S1000 60, 1320 110 S1480 130, 1520 85"
            strokeWidth="0.9"
          />
          <path
            d="M-60 150 C180 180, 420 120, 700 155 S1100 190, 1400 140 S1520 160, 1540 145"
            strokeWidth="0.75"
            opacity="0.65"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className={cn("h-full w-full", className)}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--wave-cyan)" stopOpacity="0" />
          <stop offset="25%" stopColor="var(--wave-cyan)" stopOpacity="1" />
          <stop offset="55%" stopColor="var(--wave-blue)" stopOpacity="1" />
          <stop offset="80%" stopColor="var(--wave-purple)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--wave-purple)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="none" stroke={`url(#${gradientId})`} strokeLinecap="round">
        <path
          className="wave-line wave-line-1"
          d="M-40 140 C160 100, 320 180, 500 130 S860 90, 1040 150 S1280 190, 1520 120"
          strokeWidth="1"
        />
        <path
          className="wave-line wave-line-2"
          d="M-60 200 C120 240, 300 170, 480 210 S820 250, 1000 180 S1240 160, 1540 200"
          strokeWidth="0.9"
        />
        <path
          className="wave-line wave-line-3"
          d="M-20 90 C200 60, 420 120, 640 85 S980 50, 1180 100 S1380 130, 1520 75"
          strokeWidth="0.85"
          strokeDasharray="4 7"
        />
        {dense ? (
          <>
            <path
              className="wave-line wave-line-4"
              d="M200 250 C340 220, 480 270, 620 240 S900 200, 1060 260 S1220 280, 1380 250"
              strokeWidth="0.75"
            />
            <path
              className="wave-line wave-line-5"
              d="M680 40 C740 90, 800 150, 860 210 S940 280, 980 300"
              strokeWidth="0.7"
              strokeDasharray="3 6"
            />
          </>
        ) : null}
      </g>
    </svg>
  );
}
