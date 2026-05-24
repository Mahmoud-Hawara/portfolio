"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
};

export function NavLink({
  href,
  label,
  active,
  onClick,
  className,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "font-medium text-fg"
          : "text-muted-gh hover:bg-muted/50 hover:text-fg",
        className
      )}
      aria-current={active ? "location" : undefined}
    >
      {active ? (
        <motion.span
          layoutId="main-nav-active"
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-muted/90 to-primary/[0.06] shadow-sm ring-1 ring-border/60"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : null}
      <span className="relative z-[1]">{label}</span>
    </Link>
  );
}
