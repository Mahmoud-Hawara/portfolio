"use client";

import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { AchievementCards } from "@/components/ui/achievement-cards";
import { AchievementHighlights } from "@/components/ui/achievement-highlights";
import { achievementHighlights, achievements } from "@/data/portfolio";
import { containerShell, sectionShell } from "@/lib/layout-classes";

export function Achievements() {
  return (
    <section id="achievements" className={sectionShell}>
      <div className={containerShell}>
        <AnimatedSectionHeading
          index="05 — Achievements"
          title="Competitive milestones"
          subtitle="International contest qualifications, national medals, global rankings, and academic distinction — with context you can verify."
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
