"use client";

import { motion } from "framer-motion";
import { identityPillars, profilePanelTitle } from "@/data/portfolio";
import { FormattedText } from "@/components/ui/formatted-text";
import { cn } from "@/lib/utils";

const accentBorder = {
  blue: "border-[var(--gh-link)]",
  green: "border-primary",
  amber: "border-[#bf8700] dark:border-[#d29922]",
};

export function ProfilePanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "card-hover rounded-lg border border-border bg-card/70 p-3 backdrop-blur-sm sm:p-5 md:p-6 lg:p-7 dark:bg-card/55",
        className
      )}
    >
      <p className="font-mono text-[11px] font-medium tracking-widest text-muted-gh uppercase">
        {profilePanelTitle}
      </p>
      <ul className="mt-4 space-y-0">
        {identityPillars.map((pillar, i) => (
          <motion.li
            key={pillar.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className={cn(
              "group rounded-sm py-3.5 transition-colors hover:bg-muted/30 sm:py-5",
              i > 0 && "border-t border-border/60"
            )}
          >
            <div
              className={cn(
                "border-l-2 pl-4 transition-[border-color] duration-200 group-hover:border-[var(--gh-link)] md:pl-5",
                accentBorder[pillar.accent]
              )}
            >
              <h3 className="font-mono text-[11px] font-medium tracking-widest text-muted-gh uppercase">
                {pillar.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {pillar.lines.map((line) => (
                  <li
                    key={line}
                    className="text-sm leading-relaxed text-muted-gh md:text-[0.9375rem]"
                  >
                    <FormattedText text={line} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
