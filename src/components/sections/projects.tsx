"use client";

import { SectionGlow } from "@/components/background/section-glow";
import { WaveBackdrop } from "@/components/background/wave-backdrop";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/portfolio";
import { containerShell, sectionShell } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className={cn("relative overflow-hidden", sectionShell)}>
      <SectionGlow tint="blue" />
      <WaveBackdrop placement="section" />
      <div className={cn("relative z-[1]", containerShell)}>
        <AnimatedSectionHeading
          index="03 — Projects"
          title="Selected work"
          subtitle="Things I've built that real people use — and how they turned out."
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
