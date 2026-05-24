"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const sparks = [
  { left: "8%", top: "18%", size: 4, delay: 0 },
  { left: "88%", top: "12%", size: 3, delay: 0.4 },
  { left: "72%", top: "42%", size: 5, delay: 0.8 },
  { left: "15%", top: "55%", size: 3, delay: 1.1 },
  { left: "92%", top: "68%", size: 4, delay: 0.2 },
  { left: "45%", top: "8%", size: 2, delay: 1.4 },
  { left: "55%", top: "78%", size: 3, delay: 0.6 },
];

export function FloatingSparks({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {sparks.map((spark, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary/70 to-gh-link/50 shadow-[0_0_12px_rgba(26,127,55,0.35)] dark:from-primary/50 dark:to-gh-link/40"
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
          }}
          animate={{
            y: [0, -12, 4, 0],
            opacity: [0.35, 0.85, 0.5, 0.35],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: spark.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
