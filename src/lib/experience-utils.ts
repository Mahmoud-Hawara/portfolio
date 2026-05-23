import type { ExperienceEntry } from "@/data/portfolio";

export function isCurrentRole(period: string) {
  return /\bpresent\b/i.test(period);
}

export function getPeriodStartYear(period: string) {
  const match = period.match(/\d{4}/);
  return match?.[0] ?? "";
}

export function groupExperienceByStartYear(jobs: ExperienceEntry[]) {
  const groups = new Map<string, ExperienceEntry[]>();

  for (const job of jobs) {
    const year = getPeriodStartYear(job.period) || "Earlier";
    const list = groups.get(year) ?? [];
    list.push(job);
    groups.set(year, list);
  }

  return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
}

export function sortPastJobs(jobs: ExperienceEntry[]) {
  return groupExperienceByStartYear(jobs).flatMap(([, list]) => list);
}

/** Year groups for timeline rendering (newest first). */
export function getPastJobsByYear(jobs: ExperienceEntry[]) {
  return groupExperienceByStartYear(jobs);
}

/** Compact label for mobile prior-role year markers */
export function getExperienceYearCaptionShort(jobs: ExperienceEntry[]): string {
  if (jobs.length === 1) return jobs[0]!.company;
  return `${jobs.length} roles`;
}

export function sortCurrentJobs(jobs: ExperienceEntry[]) {
  return [...jobs].sort(
    (a, b) => (b.tags?.length ?? 0) - (a.tags?.length ?? 0)
  );
}
