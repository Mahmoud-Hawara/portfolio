import { cn } from "@/lib/utils";

type SectionGlowProps = {
  tint?: "green" | "blue" | "purple";
  className?: string;
};

const tintClass = {
  green: "bg-primary/10",
  blue: "bg-gh-link/8",
  purple: "bg-[var(--wave-purple)]/10",
};

export function SectionGlow({ tint = "green", className }: SectionGlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -right-[8%] top-0 size-[min(480px,65vw)] rounded-full blur-3xl",
        tintClass[tint],
        className
      )}
      aria-hidden
    />
  );
}
