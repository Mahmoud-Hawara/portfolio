"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { TechStackManifest } from "@/components/ui/tech-stack-manifest";
import { techStack, techStackSections } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="tools" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
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
