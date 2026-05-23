import { cn } from "@/lib/utils";

type ExperienceWaveSvgProps = {
  side: "left" | "right";
  className?: string;
};

/** Side-framed contours — keeps the card center clear for readability */
export function ExperienceWaveSvg({ side, className }: ExperienceWaveSvgProps) {
  const id = `wave-exp-${side}`;
  const flip = side === "right";

  return (
    <svg
      className={cn("h-full w-full", flip && "-scale-x-100", className)}
      viewBox="0 0 320 800"
      preserveAspectRatio="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--wave-cyan)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--wave-blue)" stopOpacity="1" />
          <stop offset="70%" stopColor="var(--wave-purple)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--wave-purple)" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-15%" y="-5%" width="130%" height="110%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <g
        fill="none"
        stroke={`url(#${id}-stroke)`}
        strokeLinecap="round"
        filter={`url(#${id}-glow)`}
        opacity="0.4"
      >
        <path
          className="experience-wave-line experience-wave-line-1"
          d="M40 60 C80 120, 60 220, 100 320 S140 480, 90 580 S50 680, 110 760"
          strokeWidth="1.4"
        />
      </g>

      <g fill="none" stroke={`url(#${id}-stroke)`} strokeLinecap="round">
        <path
          className="experience-wave-line experience-wave-line-1"
          d="M40 60 C80 120, 60 220, 100 320 S140 480, 90 580 S50 680, 110 760"
          strokeWidth="1"
        />
        <path
          className="experience-wave-line experience-wave-line-2"
          d="M20 140 C55 200, 35 340, 75 440 S110 560, 70 660 S30 720, 85 790"
          strokeWidth="0.85"
          opacity="0.75"
        />
        <path
          className="experience-wave-line experience-wave-line-3"
          d="M70 100 C95 180, 85 280, 120 380 S155 500, 125 600"
          strokeWidth="0.75"
          strokeDasharray="5 9"
          opacity="0.55"
        />
        <path
          className="experience-wave-line experience-wave-line-4"
          d="M10 400 C45 430, 55 520, 90 560 S130 640, 100 720"
          strokeWidth="0.7"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}
