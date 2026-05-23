"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { HeroWave } from "@/components/background/hero-wave";
import { FadeIn } from "@/components/motion/fade-in";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { HeroActions } from "@/components/ui/hero-actions";
import { HeroIdentity } from "@/components/ui/hero-identity";
import { HeroStats } from "@/components/ui/hero-stats";
import { ProfilePanel } from "@/components/ui/profile-panel";
import { personal } from "@/data/portfolio";

const roles = [
  "Software Engineer",
  "Competitive Programmer",
  "Teaching Assistant",
  "Problem Setter",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-x-hidden pt-[4.75rem] pb-10 sm:pt-28 sm:pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-pattern opacity-30"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <HeroWave />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-3.5 sm:px-6 md:px-10 lg:max-w-[90rem] lg:px-14 xl:px-20">
        <div className="flex flex-col gap-5 sm:gap-5 lg:grid lg:items-center lg:grid-cols-[auto_minmax(360px,460px)] lg:justify-center lg:gap-5 xl:grid-cols-[auto_minmax(400px,500px)] xl:gap-6">
          <div className="flex min-w-0 flex-col gap-4 sm:gap-4 lg:order-1">
            <FadeIn>
              <HeroIdentity />
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="tagline-accent max-w-xl text-sm leading-relaxed text-muted-gh sm:text-base md:text-lg">
                {personal.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-gh">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  {personal.location}
                </span>
                <span className="hidden text-border sm:inline" aria-hidden>
                  |
                </span>
                <CopyEmailButton />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="card-hover flex h-9 w-full min-w-0 max-w-xl items-center overflow-hidden rounded-md border border-border bg-surface/80 px-2.5 font-mono text-[11px] text-link sm:h-8 sm:px-3 sm:text-sm">
                <TypingRoles roles={roles} />
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <HeroStats />
            </FadeIn>

            <FadeIn delay={0.3}>
              <HeroActions />
            </FadeIn>
          </div>

          <FadeIn delay={0.12} className="lg:order-2">
            <ProfilePanel className="w-full lg:max-w-none" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function TypingRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => (i + 1) % roles.length);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles]);

  return (
    <span aria-live="polite">
      <span className="text-muted-gh">$ focus -- </span>
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-0.5 animate-pulse bg-primary" />
    </span>
  );
}
