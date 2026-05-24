"use client";

import { SectionGlow } from "@/components/background/section-glow";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { VolunteeringEntryCard } from "@/components/ui/volunteering-entry";
import { volunteering } from "@/data/portfolio";
import { containerShell, sectionShell } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export function Volunteering() {
  return (
    <section
      id="volunteering"
      className={cn("relative overflow-hidden", sectionShell)}
    >
      <SectionGlow tint="purple" />
      <div className={cn("relative z-[1]", containerShell)}>
        <AnimatedSectionHeading
          index="06 — Volunteering"
          title="Community & outreach"
          subtitle="Leadership roles that grew competitive programming culture at Benha University — training students, running contests, and mentoring teams."
        />

        <Stagger className="space-y-4" stagger={0.08}>
          {volunteering.map((entry) => (
            <StaggerItem key={`${entry.organization}-${entry.period}`}>
              <VolunteeringEntryCard entry={entry} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
