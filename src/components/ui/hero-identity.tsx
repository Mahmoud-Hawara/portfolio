"use client";

import { motion } from "framer-motion";
import { HeroAvatar } from "@/components/ui/hero-avatar";
import { HeroSocialLinks } from "@/components/ui/hero-social-links";
import { heroHighlights, personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type HeroIdentityProps = {
  className?: string;
};

export function HeroIdentity({ className }: HeroIdentityProps) {
  const [firstName, ...rest] = personal.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div
      className={cn(
        "flex items-center gap-3 text-left max-sm:gap-3 sm:gap-8 lg:gap-10",
        className
      )}
    >
      <HeroAvatar className="shrink-0" />

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 sm:gap-3.5 lg:gap-4">
        <div className="space-y-3 sm:space-y-3.5 lg:space-y-4">
          <motion.p
            className="text-sm font-medium tracking-wide text-muted-gh"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Hi, I&apos;m
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <h1 className="flex flex-wrap items-baseline gap-x-1.5 text-[1.65rem] font-bold leading-[1.05] tracking-tight max-[400px]:text-[1.5rem] sm:gap-x-2 sm:text-4xl sm:leading-none lg:text-5xl">
              <span className="text-fg">{firstName}</span>
              {lastName ? (
                <motion.span
                  className="gradient-text inline-block"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {lastName}
                </motion.span>
              ) : null}
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-2.5 lg:gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
          >
            <motion.span
              className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-fg sm:gap-2 sm:px-3 sm:text-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.span
                className="size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
                animate={{ scale: [1, 1.4, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {personal.title}
            </motion.span>
            <span className="font-mono text-xs text-muted-gh sm:text-sm">
              @{personal.handle}
            </span>
          </motion.div>
        </div>

        <div className="flex w-full flex-col items-start gap-2.5 sm:gap-3">
          <div className="flex w-full flex-wrap gap-1.5 lg:gap-2">
            {heroHighlights.map((tag, i) => (
              <motion.span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-gh sm:px-2.5 sm:text-[11px] lg:text-xs"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + i * 0.03,
                  duration: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.06, y: -2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.4 }}
          >
            <HeroSocialLinks />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
