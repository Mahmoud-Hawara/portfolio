import { cn } from "@/lib/utils";
import { personal } from "@/data/portfolio";

type MonogramProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: "size-9 text-sm rounded-md",
  md: "size-12 text-base rounded-md",
  lg: "size-20 text-2xl rounded-lg",
  xl: "size-28 text-3xl rounded-lg md:size-32 md:text-4xl",
};

export function Monogram({ size = "md", className }: MonogramProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center border border-border bg-card font-semibold tracking-tight ring-offset-background",
        sizes[size],
        className
      )}
      aria-hidden
    >
      <span className="gradient-text font-bold">{personal.initials}</span>
    </div>
  );
}
