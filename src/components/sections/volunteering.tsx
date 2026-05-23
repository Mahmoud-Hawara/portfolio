"use client";

import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { VolunteeringEntryCard } from "@/components/ui/volunteering-entry";
import { volunteering } from "@/data/portfolio";

export function Volunteering() {
  return (
    <section
      id="volunteering"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
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
