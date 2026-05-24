"use client";

import { SectionGlow } from "@/components/background/section-glow";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { AchievementCards } from "@/components/ui/achievement-cards";
import { AchievementHighlights } from "@/components/ui/achievement-highlights";
import { achievementHighlights, achievements } from "@/data/portfolio";
import { containerShell, sectionShell } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export function Achievements() {
  return (
    <section
      id="achievements"
      className={cn("relative overflow-hidden", sectionShell)}
    >
      <SectionGlow tint="green" />
      <div className={cn("relative z-[1]", containerShell)}>
        <AnimatedSectionHeading
          index="05 — Achievements"
          title="Competitive milestones"
          subtitle="Contest results and rankings I'm proud of — with a bit of context so it all makes sense."
        />

        <FadeIn delay={0.06} direction="up">
          <AchievementHighlights
            highlights={achievementHighlights}
            className="mb-8"
          />
        </FadeIn>

        <FadeIn delay={0.1} direction="up">
          <AchievementCards items={achievements} />
        </FadeIn>
      </div>
    </section>
  );
}
