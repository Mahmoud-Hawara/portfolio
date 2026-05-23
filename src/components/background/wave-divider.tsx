import { WaveSvg } from "@/components/background/wave-svg";
import { cn } from "@/lib/utils";

/** Thin wave band between sections — static, no parallax */
export function WaveDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none relative -my-px hidden h-10 w-full overflow-hidden opacity-[0.14] dark:opacity-[0.22] md:block",
        className
      )}
      aria-hidden
    >
      <WaveSvg gradientId="wave-divider" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}
