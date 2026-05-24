"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Slow-moving color washes behind the whole page. */
export function AmbientMesh({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
          className
        )}
        aria-hidden
      >
        <div className="absolute -left-[20%] top-[-10%] size-[55vw] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-[15%] top-[20%] size-[45vw] rounded-full bg-gh-link/10 blur-[90px]" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <motion.div
        className="absolute -left-[22%] top-[-12%] size-[58vw] max-w-[720px] rounded-full bg-primary/12 blur-[110px] dark:bg-primary/10"
        animate={{ x: [0, 40, -20, 0], y: [0, 30, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[18%] top-[8%] size-[50vw] max-w-[640px] rounded-full bg-gh-link/12 blur-[100px] dark:bg-gh-link/8"
        animate={{ x: [0, -35, 25, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[20%] size-[42vw] max-w-[520px] rounded-full bg-[var(--wave-purple)]/10 blur-[95px]"
        animate={{ x: [0, 30, -25, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[10%] size-[28vw] max-w-[380px] rounded-full bg-[#FEEE00]/8 blur-[80px] dark:bg-[#FEEE00]/5"
        animate={{ x: [0, -20, 15, 0], y: [0, 18, -10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
