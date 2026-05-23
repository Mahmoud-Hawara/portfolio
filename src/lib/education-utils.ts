import type { EducationEntry, EducationLevel, EducationStatus } from "@/data/portfolio";

export function getEducationLevel(entry: EducationEntry): EducationLevel {
  return entry.level ?? "university";
}

export function getEducationStatus(entry: EducationEntry): EducationStatus {
  return entry.status ?? "completed";
}

export function getPeriodStartYear(period: string): string | null {
  const years = period.match(/\b20\d{2}\b/g);
  return years?.[0] ?? null;
}

/** End year from period, e.g. "Sep 2019 – Jul 2024" → "2024" */
export function getPeriodEndYear(period: string): string | null {
  const years = period.match(/\b20\d{2}\b/g);
  return years?.at(-1) ?? null;
}

export function getGradeScore(grade?: string): string | null {
  if (!grade) return null;
  const match = grade.match(/\d{2,3}(?:\.\d+)?%/);
  return match?.[0] ?? null;
}

/** Newest → oldest (by start year, then end year) */
export function sortEducationChronological(entries: EducationEntry[]) {
  return [...entries].sort((a, b) => {
    const startA = Number(getPeriodStartYear(a.period) ?? 0);
    const startB = Number(getPeriodStartYear(b.period) ?? 0);
    if (startA !== startB) return startB - startA;
    const endA = Number(getPeriodEndYear(a.period) ?? 0);
    const endB = Number(getPeriodEndYear(b.period) ?? 0);
    return endB - endA;
  });
}

/** Canonical list for UI — newest first */
export function getSortedEducationEntries(entries: EducationEntry[]) {
  return sortEducationChronological(entries);
}

/** Year groups for timeline (oldest first), grouped by graduation / end year */
export function getEducationByYear(entries: EducationEntry[]) {
  const sorted = sortEducationChronological(entries);
  const groups: [string, EducationEntry[]][] = [];

  for (const entry of sorted) {
    const year = getPeriodEndYear(entry.period) ?? getPeriodStartYear(entry.period) ?? "Earlier";
    const last = groups.at(-1);
    if (last && last[0] === year) {
      last[1].push(entry);
    } else {
      groups.push([year, [entry]]);
    }
  }

  return groups;
}

export function getEducationCardVariant(
  entry: EducationEntry
): "featured" | "timeline" {
  return getEducationLevel(entry) === "university" &&
    getEducationStatus(entry) === "completed"
    ? "featured"
    : "timeline";
}

const yearCaptions: Record<EducationLevel, string> = {
  secondary: "High school",
  university: "Bachelor's · Shoubra",
  graduate: "Master's scholarship",
};

export function getEducationYearCaption(entry: EducationEntry): string {
  const level = getEducationLevel(entry);
  const status = getEducationStatus(entry);
  if (status === "cancelled") return "Master's · cancelled";
  return yearCaptions[level];
}

/** Compact label for mobile timeline year markers */
export function getEducationYearCaptionShort(entry: EducationEntry): string {
  const level = getEducationLevel(entry);
  const status = getEducationStatus(entry);
  const school = getEducationSchoolShort(entry.school);

  if (status === "cancelled") return `${school} · Cancelled`;
  if (level === "secondary") return "High school";
  if (level === "university") return "Benha · Shoubra";
  return school;
}

export function getEducationSchoolShort(school: string): string {
  if (school.includes("German University")) return "GUC";
  if (school.includes("Qalyub") || school.includes("Military Secondary")) {
    return "Qalyub Military";
  }
  if (school === "High School") return "High School";
  if (school.includes("Benha")) return "Benha · Shoubra";
  return school.replace(" University", "");
}

export type EducationMilestone = {
  year: string;
  label: string;
  value: string;
  detail?: string;
  school: string;
  level: EducationLevel;
  status: EducationStatus;
};

/** Summary strip: oldest → newest (left to right on desktop) */
export function getEducationSummaryMilestones(
  entries: EducationEntry[]
): EducationMilestone[] {
  const sorted = getSortedEducationEntries(entries);
  return [...sorted].reverse().map((entry) => buildEducationMilestone(entry));
}

function buildEducationMilestone(entry: EducationEntry): EducationMilestone {
  const year = getPeriodEndYear(entry.period) ?? "";
  const level = getEducationLevel(entry);
  const status = getEducationStatus(entry);
  const score = getGradeScore(entry.grade);

  const label =
    level === "secondary"
      ? "Secondary"
      : level === "university"
        ? "B.Eng."
        : "M.Sc.";

  let value = score ?? "—";
  let detail: string | undefined;

  if (level === "graduate" && status === "cancelled") {
    value = "Fully funded";
    detail = "Cancelled";
  } else if (!score && entry.grade) {
    value = entry.grade.length > 24 ? "Honors" : entry.grade;
    } else if (level === "university" && entry.grade) {
      detail = "5th in department";
    }

  return {
    year,
    label,
    value,
    detail,
    school: getEducationSchoolShort(entry.school),
    level,
    status,
  };
}

export function getEducationMilestones(
  entries: EducationEntry[]
): EducationMilestone[] {
  return sortEducationChronological(entries).map((entry) =>
    buildEducationMilestone(entry)
  );
}

export function getEducationEntryId(entry: EducationEntry): string {
  const slug = entry.school
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `education-${slug}`;
}
