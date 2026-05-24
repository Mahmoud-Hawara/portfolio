"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type ScrollHintProps = {
  href?: string;
  className?: string;
};

export function ScrollHint({ href = "#education", className }: ScrollHintProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("flex justify-center pt-2 sm:pt-4", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.45 }}
    >
      <Link
        href={href}
        className="group inline-flex flex-col items-center gap-1 text-xs text-muted-gh transition-colors hover:text-gh-link"
      >
        <span className="font-medium">Explore below</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex size-8 items-center justify-center rounded-full border border-border/70 bg-card/60 ring-1 ring-border/40 backdrop-blur-sm transition-colors group-hover:border-primary/30 group-hover:bg-primary/5"
        >
          <ChevronDown className="size-4" aria-hidden />
        </motion.span>
      </Link>
    </motion.div>
  );
}
