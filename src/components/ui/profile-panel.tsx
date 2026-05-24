"use client";

import { motion } from "framer-motion";
import { identityPillars, profilePanelTitle } from "@/data/portfolio";
import { fieldLabel, softPanel } from "@/lib/layout-classes";
import { FormattedText } from "@/components/ui/formatted-text";
import { GradientFrame } from "@/components/ui/gradient-frame";
import { cn } from "@/lib/utils";

const accentDot = {
  blue: "bg-[var(--gh-link)]",
  green: "bg-primary",
  amber: "bg-[#bf8700] dark:bg-[#d29922]",
};

export function ProfilePanel({
  className,
  featured = false,
}: {
  className?: string;
  featured?: boolean;
}) {
  const panel = (
    <div className={cn("p-3 sm:p-5 md:p-6 lg:p-7", !featured && softPanel)}>
      <p className={fieldLabel}>{profilePanelTitle}</p>
      <ul className="mt-4 space-y-3">
        {identityPillars.map((pillar, i) => (
          <motion.li
            key={pillar.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="callout-soft group transition-colors hover:bg-muted/55"
          >
            <div className="flex gap-2.5">
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full shadow-[0_0_8px_currentColor]",
                  accentDot[pillar.accent]
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-fg">{pillar.title}</h3>
                <ul className="mt-2 space-y-1.5">
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
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );

  if (featured) {
    return (
      <GradientFrame variant="vivid" className={className} innerClassName="backdrop-blur-sm">
        {panel}
      </GradientFrame>
    );
  }

  return <div className={cn(softPanel, className)}>{panel}</div>;
}
