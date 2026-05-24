"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Cloud,
  Code2,
  Container,
  Database,
  FlaskConical,
  Globe,
  Layers,
  LayoutTemplate,
  MessageCircle,
  Search,
  Server,
  Sparkles,
  Target,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { TechGroup, TechStackSection } from "@/data/portfolio";
import { TechItemIcon } from "@/components/ui/tech-item-icon";
import { anchorScroll } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

const groupIcons: Record<string, LucideIcon> = {
  "programming-languages": Code2,
  "spoken-languages": Globe,
  backend: Server,
  frontend: LayoutTemplate,
  gcp: Cloud,
  azure: Cloud,
  data: Database,
  devops: Container,
  qa: FlaskConical,
  fundamentals: Blocks,
  communication: MessageCircle,
  leadership: Users,
  workstyle: Target,
};

const sectionIcons: Record<string, LucideIcon> = {
  application: Layers,
  cloud: Cloud,
  platform: Container,
  core: Blocks,
  personal: Sparkles,
};

const PERSONAL_SECTION_ID = "personal";

function isPersonalSection(sectionId: string) {
  return sectionId === PERSONAL_SECTION_ID;
}

type TechStackManifestProps = {
  groups: TechGroup[];
  sections: TechStackSection[];
};

function countTechnologies(groups: TechGroup[]) {
  return groups.reduce((sum, group) => sum + group.items.length, 0);
}

function countSectionTools(section: TechStackSection, groups: TechGroup[]) {
  return section.groupIds.reduce((sum, id) => {
    const group = groups.find((g) => g.id === id);
    return sum + (group?.items.length ?? 0);
  }, 0);
}

function groupMatchesQuery(group: TechGroup, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (group.label.toLowerCase().includes(q)) return true;
  return group.items.some((item) => item.toLowerCase().includes(q));
}

function filterItems(group: TechGroup, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return group.items;
  if (group.label.toLowerCase().includes(q)) return group.items;
  return group.items.filter((item) => item.toLowerCase().includes(q));
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  if (!q) return <>{text}</>;

  const lower = text.toLowerCase();
  const index = lower.indexOf(q);
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-primary/15 px-0.5 text-gh-link">
        {text.slice(index, index + q.length)}
      </mark>
      {text.slice(index + q.length)}
    </>
  );
}

export function TechStackManifest({ groups, sections }: TechStackManifestProps) {
  const [query, setQuery] = useState("");

  const globalIndexById = useMemo(
    () => new Map(groups.map((group, index) => [group.id, index + 1])),
    [groups]
  );

  const totalTechnologies = countTechnologies(groups);
  const hasQuery = query.trim().length > 0;

  const visibleGroups = useMemo(
    () => groups.filter((group) => groupMatchesQuery(group, query)),
    [groups, query]
  );

  const visibleTechnologies = useMemo(
    () =>
      countTechnologies(
        visibleGroups.map((group) => ({
          ...group,
          items: filterItems(group, query),
        }))
      ),
    [visibleGroups, query]
  );

  const visibleSections = useMemo(
    () =>
      sections.filter((section) =>
        section.groupIds.some((id) =>
          visibleGroups.some((group) => group.id === id)
        )
      ),
    [sections, visibleGroups]
  );

  function scrollToSection(sectionId: string) {
    document
      .getElementById(`tech-section-${sectionId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToGroup(groupId: string) {
    document
      .getElementById(`tech-${groupId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="mt-8 sm:mt-10">
      <div className="mb-5 flex flex-col gap-3 rounded-lg border border-border bg-card/40 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 md:px-5">
        <p className="font-mono text-xs text-muted-gh" aria-live="polite">
          <span className="font-semibold text-fg tabular-nums">
            {hasQuery ? visibleGroups.length : groups.length}
          </span>{" "}
          categories ·{" "}
          <span className="font-semibold text-fg tabular-nums">
            {hasQuery ? visibleTechnologies : totalTechnologies}
          </span>{" "}
          skills
        </p>

        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-gh"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            className="h-9 w-full rounded-md border border-border bg-background py-2 pr-9 pl-9 text-sm text-fg placeholder:text-muted-gh focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
            aria-label="Search skills"
          />
          {hasQuery ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-0.5 text-muted-gh hover:text-fg"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {visibleGroups.length > 0 && !hasQuery ? (
        <nav className="mb-4 space-y-2.5 text-[11px]" aria-label="Jump to skills">
          <p className="flex flex-wrap items-center gap-x-1 gap-y-1 text-muted-gh">
            <span className="text-muted-gh">Jump to</span>
            {visibleSections.map((section, index) => (
              <span key={section.id} className="inline-flex items-center gap-1">
                {index > 0 ? <span aria-hidden>·</span> : null}
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="text-gh-link hover:text-fg hover:underline"
                >
                  {section.label}
                </button>
              </span>
            ))}
          </p>

          <div
            className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
              {groups.map((group) => {
                const isVisible = visibleGroups.some((g) => g.id === group.id);
                const TagIcon = groupIcons[group.id];
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => scrollToGroup(group.id)}
                    disabled={!isVisible}
                    className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border/70 bg-muted/40 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-fg/90 transition-colors hover:border-primary/30 hover:bg-muted/70 hover:text-gh-link disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {TagIcon ? (
                      <TagIcon
                        className="size-3 shrink-0 opacity-70"
                        aria-hidden
                      />
                    ) : null}
                    {group.label}
                  </button>
                );
              })}
          </div>
        </nav>
      ) : null}

      {visibleGroups.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-10 text-center text-sm text-muted-gh">
          No match for &ldquo;{query}&rdquo;.{" "}
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-gh-link hover:underline"
          >
            Clear search
          </button>
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <dl>
            {sections.map((section) => {
              const sectionGroups = section.groupIds
                .map((id) => groups.find((group) => group.id === id))
                .filter((group): group is TechGroup => Boolean(group))
                .filter((group) => groupMatchesQuery(group, query));

              if (sectionGroups.length === 0) return null;

              const SectionIcon = sectionIcons[section.id];
              const sectionToolCount = countSectionTools(section, groups);
              const personal = isPersonalSection(section.id);
              const itemLabel = personal ? "skills" : "tools";

              return (
                <div
                  key={section.id}
                  id={`tech-section-${section.id}`}
                  className={anchorScroll}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between gap-3 border-b border-l-2 border-border bg-muted/15 px-4 py-2.5 md:px-5",
                      personal ? "border-l-gh-link/50" : "border-l-primary/40"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {SectionIcon ? (
                        <SectionIcon
                          className="size-3.5 text-gh-link"
                          aria-hidden
                        />
                      ) : null}
                      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-gh">
                        {section.label}
                      </p>
                    </div>
                    <p className="font-mono text-[9px] tabular-nums text-muted-gh/70">
                      {sectionToolCount} {itemLabel}
                    </p>
                  </div>

                  {sectionGroups.map((group) => {
                    const Icon = groupIcons[group.id];
                    const globalIndex = globalIndexById.get(group.id) ?? 0;
                    const rowIndex = String(globalIndex).padStart(2, "0");
                    const items = filterItems(group, query);
                    const rowPersonal = personal;

                    return (
                      <motion.div
                        key={group.id}
                        id={`tech-${group.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "group/row relative grid gap-x-4 gap-y-2 border-b border-l-2 border-border py-4 pl-3 transition-colors duration-200 sm:py-5 sm:pl-4",
                          anchorScroll,
                          rowPersonal
                            ? "hover:border-l-gh-link hover:bg-muted/25 focus-within:border-l-gh-link"
                            : "hover:border-l-primary hover:bg-muted/25 focus-within:border-l-primary",
                          "focus-within:bg-muted/20",
                          "sm:grid-cols-[2.25rem_minmax(9rem,12.5rem)_1fr] sm:items-start sm:gap-y-0 sm:py-6 md:gap-x-6"
                        )}
                      >
                        <span
                          className="font-mono text-[10px] tabular-nums text-muted-gh/45 sm:pt-0.5"
                          aria-hidden
                        >
                          {rowIndex}
                        </span>

                        <dt className="flex items-start gap-2 sm:pt-0.5">
                          {Icon ? (
                            <Icon
                              className="mt-0.5 size-3.5 shrink-0 text-muted-gh transition-colors group-hover/row:text-gh-link group-focus-within/row:text-gh-link"
                              aria-hidden
                            />
                          ) : null}
                          <div>
                            <span className="font-mono text-[11px] font-medium uppercase tracking-wide text-gh-link">
                              <HighlightMatch
                                text={group.label}
                                query={query}
                              />
                            </span>
                            <span className="mt-0.5 block font-mono text-[9px] tabular-nums text-muted-gh/60">
                              {items.length}{" "}
                              {items.length === 1 ? itemLabel.slice(0, -1) : itemLabel}
                            </span>
                          </div>
                        </dt>

                        <dd className="col-span-full sm:col-span-1 sm:col-start-3 sm:pt-0.5">
                          <ul className="flex flex-wrap gap-2">
                            {items.map((item) => (
                              <li key={item}>
                                <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background/60 px-1.5 py-0.5 text-xs text-fg transition-colors hover:border-border hover:bg-background sm:gap-1.5 sm:px-2 sm:py-1 sm:text-sm">
                                  <TechItemIcon name={item} />
                                  <HighlightMatch
                                    text={item}
                                    query={query}
                                  />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </dl>
        </div>
      )}
    </div>
  );
}
