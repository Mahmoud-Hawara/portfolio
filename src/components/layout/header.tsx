"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "@/components/ui/nav-link";
import { useActiveSection } from "@/hooks/use-active-section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_OUT } from "@/lib/motion-presets";
import { Monogram } from "@/components/ui/monogram";
import { LinkButton } from "@/components/ui/link-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks, personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const activeSection = useActiveSection(sectionIds);

  const activeHref = useMemo(
    () => `#${activeSection}`,
    [activeSection]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-shadow duration-300",
        scrolled
          ? "glass-panel border-b border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]"
          : "bg-transparent"
      )}
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3.5 sm:h-16 sm:px-4 md:px-6">
        <Link
          href="#hero"
          className="group flex items-center gap-3 text-fg"
          aria-label="Back to top"
        >
          <span className="transition-transform duration-300 group-hover:scale-105">
            <Monogram size="sm" />
          </span>
          <span className="hidden font-semibold sm:inline">{personal.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.35, ease: EASE_OUT }}
            >
              <NavLink
                href={link.href}
                label={link.label}
                active={activeHref === link.href}
              />
            </motion.div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <LinkButton
            href="#contact"
            size="sm"
            className="btn-primary-gh rounded-xl shadow-sm"
          >
            Let&apos;s talk
          </LinkButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-xl p-2 text-foreground hover:bg-muted/60"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="glass-panel overflow-hidden border-t border-border px-4 py-4 md:hidden"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    href={link.href}
                    label={link.label}
                    active={activeHref === link.href}
                    onClick={() => setOpen(false)}
                    className="block w-full"
                  />
                </motion.li>
              ))}
              <motion.li
                className="pt-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <LinkButton
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl btn-primary-gh"
                >
                  Let&apos;s talk
                </LinkButton>
              </motion.li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
