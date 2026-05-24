import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientFrameProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Stronger animated border (hero / featured blocks). */
  variant?: "default" | "vivid";
};

export function GradientFrame({
  children,
  className,
  innerClassName,
  variant = "default",
}: GradientFrameProps) {
  return (
    <div
      className={cn(
        "gradient-frame rounded-[1.15rem] p-[1.5px]",
        variant === "vivid" && "gradient-frame-vivid",
        className
      )}
    >
      <div
        className={cn(
          "gradient-frame-inner h-full overflow-hidden rounded-[1.05rem]",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
