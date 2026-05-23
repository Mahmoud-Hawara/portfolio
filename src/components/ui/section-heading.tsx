import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: ReactNode;
  subtitleClassName?: string;
  className?: string;
};

export function SectionHeading({
  index,
  title,
  subtitle,
  subtitleClassName,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-12", className)}>
      <p className="mb-2 font-mono text-xs tracking-widest text-muted-gh uppercase">
        {index}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <div
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-gh md:text-base md:leading-7",
            subtitleClassName
          )}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
