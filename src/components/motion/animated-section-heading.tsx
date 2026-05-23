"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_OUT, VIEWPORT } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type AnimatedSectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: ReactNode;
  subtitleClassName?: string;
  className?: string;
};

export function AnimatedSectionHeading({
  index,
  title,
  subtitle,
  subtitleClassName,
  className,
}: AnimatedSectionHeadingProps) {
  const reduced = useReducedMotion();

  if (reduced) {
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

  return (
    <motion.div
      className={cn("mb-10 md:mb-12", className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      <motion.p
        className="mb-2 font-mono text-xs tracking-widest text-muted-gh uppercase"
        variants={{
          hidden: { opacity: 0, x: -12 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
        }}
      >
        {index}
      </motion.p>
      <motion.h2
        className="text-2xl font-semibold tracking-tight text-fg md:text-3xl"
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
        }}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.div
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-gh md:text-base md:leading-7",
            subtitleClassName
          )}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
          }}
        >
          {subtitle}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
