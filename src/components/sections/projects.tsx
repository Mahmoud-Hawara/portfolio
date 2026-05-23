"use client";

import { WaveBackdrop } from "@/components/background/wave-backdrop";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden border-t border-border py-20 md:py-28">
      <WaveBackdrop placement="section" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 md:px-6">
        <AnimatedSectionHeading
          index="03 — Projects"
          title="Selected work"
          subtitle="Products and systems built for real users — with measurable outcomes."
        />

        <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.1}>
          {projects.map((project, i) => (
            <StaggerItem
              key={project.title}
              className={i === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard {...project} featured={i === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
