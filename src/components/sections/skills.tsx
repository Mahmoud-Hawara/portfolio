"use client";

import { SectionGlow } from "@/components/background/section-glow";
import { FadeIn } from "@/components/motion/fade-in";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { TechStackManifest } from "@/components/ui/tech-stack-manifest";
import { techStack, techStackSections } from "@/data/portfolio";
import { containerShell, sectionShell } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="tools" className={cn("relative overflow-hidden", sectionShell)}>
      <SectionGlow tint="purple" className="-left-[5%] right-auto" />
      <div className={cn("relative z-[1]", containerShell)}>
        <AnimatedSectionHeading
          index="04 — Tools"
          title="Skills & tech stack"
          subtitle="Languages, frameworks, and the soft skills I lean on day to day."
        />

        <FadeIn delay={0.08} direction="up">
          <TechStackManifest groups={techStack} sections={techStackSections} />
        </FadeIn>
      </div>
    </section>
  );
}
