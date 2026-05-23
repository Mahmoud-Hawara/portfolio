"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { ExperienceCard } from "@/components/ui/experience-card";
import { ExperiencePriorTimeline } from "@/components/ui/experience-prior-timeline";
import { ExperienceSectionLabel } from "@/components/ui/experience-section-label";
import { ExperienceCurrentBackdrop } from "@/components/background/experience-current-backdrop";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { experience } from "@/data/portfolio";
import { isCurrentRole, sortCurrentJobs } from "@/lib/experience-utils";
import { anchorScroll, containerShell, sectionShell } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export function Experience() {
  const currentJobs = sortCurrentJobs(
    experience.filter((job) => isCurrentRole(job.period))
  );
  const pastJobs = experience.filter((job) => !isCurrentRole(job.period));
  return (
    <section id="experience" className={sectionShell}>
      <div className={containerShell}>
        <AnimatedSectionHeading
            index="02 — Experience"
            title="Professional experience"
            subtitle={
              <>
                <p>
                  I split my time between shipping backend systems at{" "}
                  <span className="font-medium text-fg">noon</span> and{" "}
                  <span className="font-medium text-fg">Microsoft</span>, and
                  teaching data structures and algorithms to hundreds of students
                  at the{" "}
                  <span className="font-medium text-fg">
                    German University in Cairo
                  </span>
                  .
                </p>
                <p className="mt-3 hidden text-sm leading-relaxed text-muted-gh/90 sm:block md:text-[15px]">
                  Below: what I&apos;m doing now, then earlier roles in
                  engineering, competitive programming, and academia — each with
                  scope, stack, and outcomes.
                </p>
              </>
            }
            subtitleClassName="border-l-2 border-primary/35 pl-4"
          />

        <div className="relative mt-8">
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm dark:bg-card/90">
          {currentJobs.length > 0 ? (
            <div
              id="experience-active"
              className={cn(
                "relative overflow-hidden px-3 py-5 sm:px-6 sm:py-8",
                pastJobs.length > 0 && "border-b border-border",
                anchorScroll
              )}
            >
              <ExperienceCurrentBackdrop />

              <div className="relative z-[1]">
                <ExperienceSectionLabel
                  title="Current positions"
                  description="Active roles in software engineering and academia."
                  count={currentJobs.length}
                  className="mb-5 border-b border-border/70 border-l-0 pb-4 pl-0"
                />

                <div
                  className={cn(
                    "grid items-stretch gap-4",
                    currentJobs.length > 1 &&
                      "lg:grid-cols-2 lg:gap-0 lg:overflow-hidden lg:rounded-lg lg:border lg:border-border/80"
                  )}
                >
                  {currentJobs.map((job, index) => (
                    <FadeIn
                      key={`${job.company}-${job.period}-featured`}
                      className="h-full min-w-0"
                      delay={0.08 + index * 0.04}
                    >
                      <ExperienceCard
                        job={job}
                        grouped={currentJobs.length > 1}
                        className={cn(
                          "h-full bg-card/90 backdrop-blur-sm dark:bg-card/80",
                          currentJobs.length > 1 &&
                            index === 0 &&
                            "lg:border-r lg:border-border/80"
                        )}
                      />
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {pastJobs.length > 0 ? (
            <div
              id="experience-timeline"
              className={cn(
                "bg-gradient-to-b from-surface/30 to-surface/60 px-3 py-5 sm:px-6 sm:py-8",
                anchorScroll
              )}
            >
              <FadeIn delay={0.1}>
                <ExperienceSectionLabel
                  title="Prior experience"
                  description="Earlier roles in reverse chronological order."
                  count={pastJobs.length}
                  className="mb-4 border-b-0 border-l-0 pb-0 pl-0"
                />

                <ExperiencePriorTimeline jobs={pastJobs} />
              </FadeIn>
            </div>
          ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
