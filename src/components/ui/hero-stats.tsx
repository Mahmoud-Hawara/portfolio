"use client";

import { motion } from "framer-motion";
import { CodeWindow } from "@/components/ui/code-window";
import { stats } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

export function HeroStats({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const content = (
    <CodeWindow
      filename="stats.json"
      className="w-full max-w-xl shadow-sm"
      bodyClassName="!px-3 !py-3 sm:!px-4 sm:!py-3.5"
    >
      <p className="code-comment mb-2.5 text-[11px] sm:text-xs">
        // a few numbers I&apos;m proud of
      </p>
      <ul className="space-y-2 font-mono text-[11px] leading-relaxed sm:text-xs">
        {stats.map((stat) => (
          <li
            key={stat.id}
            className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5"
          >
            <span className="code-keyword">&quot;{stat.id}&quot;</span>
            <span className="text-muted-gh">:</span>
            <span className="code-string font-semibold">{stat.value}</span>
            <span className="code-comment">// {stat.label}</span>
          </li>
        ))}
      </ul>
    </CodeWindow>
  );

  if (reduced) return <div className={className}>{content}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.06, 0.12)}
    >
      <motion.div variants={staggerItem}>{content}</motion.div>
    </motion.div>
  );
}
