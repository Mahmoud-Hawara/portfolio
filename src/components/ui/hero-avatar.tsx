"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type HeroAvatarProps = {
  className?: string;
};

export function HeroAvatar({ className }: HeroAvatarProps) {
  return (
    <motion.div
      className={cn("relative shrink-0 self-center sm:self-center", className)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="group/avatar relative w-[6.25rem] min-[400px]:w-28 sm:w-[8.75rem] md:w-40 lg:w-44"
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <div
          className="pointer-events-none absolute -inset-3 rounded-[1.4rem] bg-gradient-to-br from-primary/18 via-transparent to-gh-link/14 blur-2xl transition-all duration-500 group-hover/avatar:from-primary/24 group-hover/avatar:to-gh-link/20"
          aria-hidden
        />

        <div className="avatar-portrait-mat relative rounded-[1.2rem] p-[3px] transition-shadow duration-500">
          <div className="relative rounded-[1.05rem] bg-gradient-to-b from-surface-elevated to-card p-[5px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] dark:from-[#1c2128] dark:to-card dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <div className="relative overflow-hidden rounded-[0.9rem] bg-muted/20">
              <div className="aspect-[4/5] w-full">
                {personal.avatar ? (
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    width={360}
                    height={450}
                    className="size-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover/avatar:scale-[1.035]"
                    sizes="(max-width:640px) 112px, 176px"
                    priority
                  />
                ) : (
                  <span className="flex size-full items-center justify-center gradient-text text-3xl font-bold sm:text-4xl">
                    {personal.initials}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <motion.span
          className="absolute -bottom-1 -right-1 z-30 flex items-center gap-0.5 rounded-full border border-border/90 bg-card py-px pr-1 pl-0.5 shadow-md ring-1 ring-background backdrop-blur-md sm:-bottom-2.5 sm:-right-2.5 sm:gap-1.5 sm:py-1 sm:pr-2.5 sm:pl-1.5 sm:shadow-lg sm:ring-2"
          title={personal.availability}
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50 opacity-60" />
            <span className="relative size-2 rounded-full bg-primary" />
          </span>
          <span className="text-[9px] font-medium text-fg sm:text-xs">Available</span>
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
