"use client";

import Link from "next/link";
import { WaveBackdrop } from "@/components/background/wave-backdrop";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Monogram } from "@/components/ui/monogram";
import { personal } from "@/data/portfolio";

export function AnimatedFooter() {
  const year = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: personal.links.github },
    { label: "LinkedIn", href: personal.links.linkedin },
    { label: "Codeforces", href: personal.links.codeforces },
    { label: "Email", href: `mailto:${personal.email}` },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-canvas py-12">
      <WaveBackdrop placement="footer" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn direction="up">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <Monogram size="sm" />
              <div>
                <p className="font-semibold text-fg">{personal.name}</p>
                <p className="text-sm text-muted-gh">{personal.title}</p>
                <p className="mt-1 text-xs text-muted-gh/80">
                  Based in Cairo · {personal.availability}
                </p>
              </div>
            </div>
            <Stagger className="flex flex-wrap justify-center gap-2" stagger={0.06}>
              {links.map((link) => (
                <StaggerItem key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      link.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="highlight-chip inline-flex px-3.5 py-1.5 text-sm font-medium text-link transition-transform hover:scale-[1.03]"
                  >
                    {link.label}
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <p className="mt-8 text-center text-xs text-muted-gh">
            © {year} {personal.name} · Thanks for stopping by
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
