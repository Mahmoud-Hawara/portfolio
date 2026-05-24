"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionKicker } from "@/components/ui/section-kicker";
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

  const titleClass =
    "text-xl font-semibold tracking-tight text-fg sm:text-2xl md:text-3xl";
  const subtitleClass = cn(
    "mt-3 max-w-2xl text-sm leading-relaxed text-muted-gh sm:mt-4 sm:text-[15px] md:text-base md:leading-7",
    subtitleClassName
  );

  if (reduced) {
    return (
      <div className={cn("mb-7 sm:mb-10 md:mb-12", className)}>
        <SectionKicker index={index} />
        <h2 className={titleClass}>{title}</h2>
        {subtitle ? <div className={subtitleClass}>{subtitle}</div> : null}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("mb-7 sm:mb-10 md:mb-12", className)}
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
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -8 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
        }}
      >
        <SectionKicker index={index} />
      </motion.div>
      <motion.h2
        className={titleClass}
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
        }}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.div
          className={subtitleClass}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
          }}
        >
          {subtitle}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
