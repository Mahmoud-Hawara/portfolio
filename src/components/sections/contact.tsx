"use client";

import {
  ArrowUpRight,
  Briefcase,
  Clock,
  FileDown,
  Globe,
  Languages,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { LinkButton } from "@/components/ui/link-button";
import { AnimatedSectionHeading } from "@/components/motion/animated-section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SocialIcon } from "@/components/ui/social-icon";
import {
  contactMeta,
  contactOpenTo,
  personal,
} from "@/data/portfolio";

const socialLinks = [
  { label: "GitHub", href: personal.links.github, brand: "github" as const },
  { label: "LinkedIn", href: personal.links.linkedin, brand: "linkedin" as const },
  {
    label: "Codeforces",
    href: personal.links.codeforces,
    brand: "codeforces" as const,
  },
  { label: "ICPC", href: personal.links.icpc, brand: "icpc" as const },
];

const metaRows = [
  { label: "Current role", value: contactMeta.currentRole, icon: Briefcase },
  { label: "Timezone", value: contactMeta.timezone, icon: Globe },
  { label: "Response time", value: contactMeta.responseTime, icon: Clock },
  { label: "Languages", value: contactMeta.languages, icon: Languages },
];

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <AnimatedSectionHeading
          index="07 — Contact"
          title="Let's connect"
          subtitle="Open to engineering roles, collaborations, and mentoring."
        />

        <FadeIn delay={0.08} direction="up">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-[var(--gh-link)]/5 px-6 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  {personal.availability}
                </span>
                <span className="text-sm text-muted-gh">{personal.location}</span>
              </div>
              <nav aria-label="Social profiles">
                <ul className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-hover inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-3 py-1.5 text-sm font-medium text-link backdrop-blur-sm"
                      >
                        <SocialIcon brand={link.brand} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <Stagger className="grid gap-6 p-6 md:p-8 lg:grid-cols-2 lg:gap-8" stagger={0.1}>
              <StaggerItem className="card-hover flex h-full flex-col rounded-lg border border-border bg-card/50 p-5 md:p-6">
                <p className="font-mono text-[11px] font-medium tracking-widest text-muted-gh uppercase">
                  Open to
                </p>
                <ul className="mt-4 space-y-2.5 border-l-2 border-primary pl-4 md:pl-5">
                  {contactOpenTo.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-muted-gh md:text-[0.9375rem]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-border/60 pt-6">
                  <p className="font-mono text-[11px] font-medium tracking-widest text-muted-gh uppercase">
                    Reach me
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-gh">
                    Best via email — I typically reply within a couple of days.
                  </p>
                  <LinkButton
                    href={`mailto:${personal.email}`}
                    className="btn-primary-gh mt-4 inline-flex h-11 w-full items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Mail className="size-4" aria-hidden />
                    Send email
                  </LinkButton>
                  <div className="card-hover mt-3 flex items-center gap-2 rounded-md border border-border bg-surface/80 px-3 py-2.5">
                    <a
                      href={`mailto:${personal.email}`}
                      className="min-w-0 flex-1 truncate font-mono text-xs text-link sm:text-sm"
                    >
                      {personal.email}
                    </a>
                    <CopyEmailButton className="shrink-0 border-0 bg-transparent px-1 py-0.5" />
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/30 p-5">
                  <p className="font-mono text-[11px] font-medium tracking-widest text-muted-gh uppercase">
                    At a glance
                  </p>
                  <dl className="mt-4 space-y-3.5">
                    {metaRows.map((row) => {
                      const Icon = row.icon;
                      return (
                        <div key={row.label} className="flex gap-3">
                          {Icon ? (
                            <Icon
                              className="mt-0.5 size-4 shrink-0 text-muted-gh"
                              aria-hidden
                            />
                          ) : (
                            <span className="size-4 shrink-0" aria-hidden />
                          )}
                          <div>
                            <dt className="text-xs text-muted-gh">{row.label}</dt>
                            <dd className="mt-0.5 text-sm font-medium text-fg">
                              {row.value}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>
                </div>

                <div className="grid gap-2">
                  <a
                    href={`tel:${personal.phone.replace(/\s/g, "")}`}
                    className="card-hover group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Phone className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-gh">Phone</p>
                      <p className="truncate text-sm font-medium text-fg">
                        {personal.phone}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-gh transition-transform group-hover:text-link group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={personal.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <span className="flex size-9 items-center justify-center rounded-md bg-[var(--gh-link)]/10 text-link">
                      <FileDown className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-gh">Résumé</p>
                      <p className="text-sm font-medium text-fg">Download CV</p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-gh transition-transform group-hover:text-link group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
