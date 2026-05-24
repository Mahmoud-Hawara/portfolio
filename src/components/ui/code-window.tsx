import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CodeWindowProps = {
  children: ReactNode;
  /** Tab label, e.g. stats.json */
  filename?: string;
  className?: string;
  bodyClassName?: string;
  /** Hide macOS-style traffic lights */
  minimal?: boolean;
};

/** Editor / terminal window chrome for coder-themed blocks. */
export function CodeWindow({
  children,
  filename,
  className,
  bodyClassName,
  minimal = false,
}: CodeWindowProps) {
  return (
    <div className={cn("code-window overflow-hidden", className)}>
      {!minimal ? (
        <div className="code-window-titlebar flex items-center gap-2.5 border-b border-border/60 bg-muted/35 px-3 py-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="size-2.5 rounded-full bg-[#28c840]/90" />
          </div>
          {filename ? (
            <span className="truncate font-mono text-[10px] text-muted-gh sm:text-[11px]">
              {filename}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className={cn("code-window-body", bodyClassName)}>{children}</div>
    </div>
  );
}
