"use client";

import { SectionGlow } from "@/components/background/section-glow";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { EducationList } from "@/components/ui/education-list";
import { EducationSectionIntro } from "@/components/ui/education-section-intro";
import { educationEntries } from "@/data/portfolio";
import { containerShell, sectionShell, subtitleCallout } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <section id="education" className={cn("relative overflow-hidden", sectionShell)}>
      <SectionGlow tint="purple" className="left-[-10%] right-auto top-6 opacity-80" />
      <div className={cn("relative z-[1]", containerShell)}>
        <AnimatedSectionHeading
          index="01 — Education"
          title="Academic background"
          subtitle={<EducationSectionIntro />}
          subtitleClassName={subtitleCallout}
        />

        <FadeIn className="mt-6 md:mt-8">
          <EducationList entries={educationEntries} />
        </FadeIn>
      </div>
    </section>
  );
}
