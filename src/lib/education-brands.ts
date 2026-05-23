import { getCompanyBrand } from "@/lib/company-brands";

export type EducationBrand = {
  initials: string;
  className: string;
  accentBar: string;
  accentBorder: string;
  accentGlow?: string;
  cardBg?: string;
};

const defaultBrand: EducationBrand = {
  initials: "ED",
  className: "bg-muted text-xs font-semibold text-fg",
  accentBar: "bg-primary",
  accentBorder: "border-border",
  accentGlow: "from-primary/20 via-primary/5",
};

const schoolBrandOverrides: Record<string, Partial<EducationBrand>> = {
  "Benha University": {
    initials: "BU",
    className: "bg-[#1a4b8c]/12 text-xs font-semibold text-[#1a4b8c] dark:text-[#5b8fd4]",
    accentBar: "bg-[#1a4b8c]",
    accentBorder: "border-[#1a4b8c]/35",
    accentGlow: "from-[#1a4b8c]/20 via-[#1a4b8c]/5",
    cardBg:
      "bg-gradient-to-br from-[#1a4b8c]/10 via-surface/50 to-surface dark:from-[#1a4b8c]/8 dark:via-surface/50 dark:to-surface",
  },
  "High School": {
    initials: "HS",
    className: "bg-muted text-[10px] font-semibold text-muted-gh",
    accentBar: "bg-muted-gh/60",
    accentBorder: "border-border",
    accentGlow: "from-muted/30 via-transparent",
  },
  "Qalyub Military Secondary School": {
    initials: "QM",
    className: "bg-muted text-[10px] font-semibold text-muted-gh",
    accentBar: "bg-muted-gh/60",
    accentBorder: "border-border",
    accentGlow: "from-muted/30 via-transparent",
  },
};

export function getEducationBrand(school: string): EducationBrand {
  const override = schoolBrandOverrides[school];
  if (override) {
    return { ...defaultBrand, ...override };
  }

  const company = getCompanyBrand(school);
  return {
    initials: company.initials,
    className: company.className,
    accentBar: company.accentBar,
    accentBorder: company.accentBorder,
    accentGlow: company.accentGlow,
    cardBg: company.cardBg,
  };
}
