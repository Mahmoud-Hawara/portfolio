"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

export function HeroStats({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "card-hover w-full max-w-xl rounded-md border border-border bg-surface/80 px-3 py-3 font-mono text-sm",
        className
      )}
    >
      <p className="text-muted-gh">
        <span>$ </span>
        <span className="text-link">stats</span>
        <span> --json</span>
      </p>
      {reduced ? (
        <ul className="mt-2.5 space-y-1 border-l-2 border-primary/50 pl-3">
          {stats.map((stat) => (
            <li
              key={stat.id}
              className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5"
            >
              <span className="text-primary">&quot;{stat.id}&quot;:</span>
              <span className="font-medium text-fg">{stat.value}</span>
              <span className="text-xs text-muted-gh">// {stat.label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <motion.ul
          className="mt-2.5 space-y-1 border-l-2 border-primary/50 pl-3"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1, 0.2)}
        >
          {stats.map((stat) => (
            <motion.li
              key={stat.id}
              className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5"
              variants={staggerItem}
            >
              <span className="text-primary">&quot;{stat.id}&quot;:</span>
              <span className="font-medium text-fg">{stat.value}</span>
              <span className="text-xs text-muted-gh">// {stat.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
