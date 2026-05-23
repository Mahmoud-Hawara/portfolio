"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  EASE_OUT,
  fadeIn,
  fadeUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  VIEWPORT,
} from "@/lib/motion-presets";

type FadeDirection = "up" | "down" | "left" | "right" | "scale" | "none";

const variantMap: Record<FadeDirection, Variants> = {
  up: fadeUp,
  down: fadeUp,
  left: slideInLeft,
  right: slideInRight,
  scale: scaleIn,
  none: fadeIn,
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: FadeDirection;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
}: FadeInProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const variants = variantMap[direction];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
