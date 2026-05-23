"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { TechStackManifest } from "@/components/ui/tech-stack-manifest";
import { techStack, techStackSections } from "@/data/portfolio";
import { containerShell, sectionShell } from "@/lib/layout-classes";

export function Skills() {
  return (
    <section id="tools" className={sectionShell}>
      <div className={containerShell}>
        <AnimatedSectionHeading
          index="04 — Tools"
          title="Skills & tech stack"
          subtitle="Technical tools by category, plus communication and professional strengths. Where each fits in my work is in Experience."
        />

        <FadeIn delay={0.08} direction="up">
          <TechStackManifest groups={techStack} sections={techStackSections} />
        </FadeIn>
      </div>
    </section>
  );
}
