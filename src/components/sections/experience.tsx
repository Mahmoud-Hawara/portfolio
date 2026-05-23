"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { ExperienceCard } from "@/components/ui/experience-card";
import { ExperiencePriorTimeline } from "@/components/ui/experience-prior-timeline";
import { ExperienceSectionLabel } from "@/components/ui/experience-section-label";
import { ExperienceCurrentBackdrop } from "@/components/background/experience-current-backdrop";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { experience } from "@/data/portfolio";
import { isCurrentRole, sortCurrentJobs } from "@/lib/experience-utils";
import { cn } from "@/lib/utils";

export function Experience() {
  const currentJobs = sortCurrentJobs(
    experience.filter((job) => isCurrentRole(job.period))
  );
  const pastJobs = experience.filter((job) => !isCurrentRole(job.period));
  return (
    <section id="experience" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
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
                <p className="mt-3 text-sm leading-relaxed text-muted-gh/90 md:text-[15px]">
                  Below: what I&apos;m doing now, then earlier roles in
                  engineering, competitive programming, and academia — each with
                  scope, stack, and outcomes.
                </p>
              </>
            }
            subtitleClassName="border-l-2 border-primary/35 pl-4"
          />

        <div className="relative mt-8">
          <div className="card-hover relative overflow-hidden rounded-xl border border-border bg-card/85 shadow-sm ring-1 ring-border/50 backdrop-blur-sm dark:bg-card/75">
          {currentJobs.length > 0 ? (
            <div
              id="experience-active"
              className="relative scroll-mt-28 overflow-hidden border-b border-border px-4 py-6 sm:px-6 sm:py-8"
            >
              <ExperienceCurrentBackdrop />

              <div className="relative z-[1]">
                <ExperienceSectionLabel
                  title="Current positions"
                  description="Active roles in software engineering and academia."
                  count={currentJobs.length}
                  className="mb-5 border-b-0 border-l-0 pb-0 pl-0"
                />

                <div
                  className={cn(
                    "grid items-stretch gap-5",
                    currentJobs.length > 1 && "lg:grid-cols-2"
                  )}
                >
                  {currentJobs.map((job, index) => (
                    <FadeIn
                      key={`${job.company}-${job.period}-featured`}
                      className="h-full"
                      delay={0.08 + index * 0.04}
                    >
                      <ExperienceCard
                        job={job}
                        className="h-full bg-card/80 shadow-md ring-1 ring-border/60 backdrop-blur-md dark:bg-card/70"
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
              className="scroll-mt-28 bg-gradient-to-b from-surface/30 to-surface/60 px-4 py-6 sm:px-6 sm:py-8"
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
