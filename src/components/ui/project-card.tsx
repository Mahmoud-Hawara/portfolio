"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  title: string;
  description: string;
  impact: string;
  year: string;
  topics: string[];
  href: string;
  highlights?: string[];
  featured?: boolean;
  className?: string;
};

export function ProjectCard({
  title,
  description,
  impact,
  year,
  topics,
  href,
  highlights,
  featured = false,
  className,
}: ProjectCardProps) {
  return (
    <motion.article
      className={cn(
        "card-hover group flex h-full flex-col rounded-md border border-border bg-surface p-4 sm:p-5 md:p-6",
        featured && "md:col-span-2",
        className
      )}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-muted-gh">{year}</p>
          <h3 className="mt-1 text-base font-semibold text-fg transition-colors group-hover:text-link sm:text-lg">
            {title}
          </h3>
        </div>
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-gh transition-colors hover:border-ring hover:text-link"
          aria-label={`View ${title}`}
        >
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-gh">
        {description}
      </p>

      <p className="impact-badge mt-3 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium">
        {impact}
      </p>

      {highlights && highlights.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm text-muted-gh">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2 leading-relaxed">
              <span className="text-accent-brand" aria-hidden>
                •
              </span>
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {topics.map((topic) => (
          <Badge
            key={topic}
            variant="secondary"
            className="card-hover rounded-full border border-border bg-card px-2 py-0 text-[10px] font-normal text-link"
          >
            {topic}
          </Badge>
        ))}
      </div>
    </motion.article>
  );
}
