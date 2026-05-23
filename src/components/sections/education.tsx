"use client";

import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { EducationList } from "@/components/ui/education-list";
import { educationEntries } from "@/data/portfolio";
import { containerShell, sectionShell } from "@/lib/layout-classes";

export function Education() {
  return (
    <section id="education" className={sectionShell}>
      <div className={containerShell}>
        <AnimatedSectionHeading
          index="01 — Education"
          title="Academic background"
          subtitle={
            <p>
              <span className="font-medium text-fg">98%</span> in high school,
              engineering at{" "}
              <span className="font-medium text-fg">Benha University, Shoubra</span>{" "}
              (5th in department, 89.13% GPA), and a{" "}
              <span className="font-medium text-fg">fully funded</span> Master&apos;s
              scholarship at <span className="font-medium text-fg">GUC</span> in 2025.
            </p>
          }
          subtitleClassName="border-l-2 border-primary/35 pl-3 max-sm:text-sm sm:pl-4"
        />

        <FadeIn className="mt-8 md:mt-10">
          <EducationList entries={educationEntries} />
        </FadeIn>
      </div>
    </section>
  );
}
