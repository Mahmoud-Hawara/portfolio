"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { heroSocials } from "@/data/portfolio";
import { SocialIcon as BrandIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";

const iconBox = "inline-flex size-3.5 shrink-0 items-center justify-center";

function HeroSocialIcon({
  icon,
  className,
}: {
  icon: (typeof heroSocials)[number]["icon"];
  className?: string;
}) {
  if (icon === "mail") {
    return <Mail className={cn("size-3", className)} aria-hidden />;
  }
  return <BrandIcon brand={icon} className={className} />;
}

export function HeroSocialLinks({ className }: { className?: string }) {
  return (
    <nav className={cn(className)} aria-label="Social profiles">
      <ul className="flex flex-wrap items-center justify-start gap-y-1 max-sm:gap-x-0 sm:gap-y-1.5 lg:flex-nowrap">
        {heroSocials.map((social, index) => (
          <li key={social.label} className="flex items-center">
            {index > 0 ? (
              <span
                className="mx-1.5 flex h-5 items-center text-xs leading-none text-muted-gh/35 sm:mx-2.5"
                aria-hidden
              >
                ·
              </span>
            ) : null}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 + index * 0.04, duration: 0.3 }}
            >
              <Link
                href={social.href}
                target={
                  social.href.startsWith("mailto") ? undefined : "_blank"
                }
                rel={
                  social.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="link-slide group inline-flex h-5 items-center gap-1.5 text-xs leading-none text-muted-gh transition-colors hover:text-link lg:text-[13px]"
              >
                <span className={iconBox}>
                  <HeroSocialIcon
                    icon={social.icon}
                    className="opacity-70 transition-opacity group-hover:opacity-100"
                  />
                </span>
                <span className="leading-none">{social.label}</span>
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
