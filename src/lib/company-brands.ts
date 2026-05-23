/** Logo mark on dark artwork: white shell in light mode, black in dark mode */
export const logoShellOnDarkArtwork = "bg-white dark:bg-black border-border/80";

export type CompanyBrand = {
  initials: string;
  className: string;
  accentBar: string;
  accentGlow: string;
  accentBorder: string;
  accentHover: string;
  /** Timeline spine connector on card hover */
  accentLineHover: string;
  /** Featured current-role card background */
  cardBg?: string;
};

const defaultBrand: CompanyBrand = {
  initials: "·",
  className: "bg-muted text-sm font-semibold text-fg",
  accentBar: "bg-primary",
  accentGlow: "from-primary/20 via-primary/5",
  accentBorder: "border-primary/25",
  accentHover: "hover:border-primary/40 hover:shadow-[0_4px_24px_-10px] hover:shadow-primary/15",
  accentLineHover: "group-hover/entry:bg-primary/50",
};

/** Fallback when no logo image is provided in public/logos/ */
export const companyBrands: Record<string, CompanyBrand> = {
  noon: {
    initials: "n",
    className: "bg-[#FEEE00] text-sm font-bold text-[#111111]",
    accentBar: "bg-[#FEEE00]",
    accentGlow: "from-[#FEEE00]/30 via-primary/5",
    accentBorder: "border-[#e6d800]/45",
    accentHover:
      "hover:border-[#e6d800]/70 hover:shadow-[0_4px_24px_-10px] hover:shadow-[#FEEE00]/25",
    accentLineHover: "group-hover/entry:bg-[#FEEE00]/70",
    cardBg:
      "bg-gradient-to-br from-[#FEEE00]/14 via-[#FEEE00]/[0.04] to-surface dark:from-[#FEEE00]/12 dark:via-[#FEEE00]/[0.03] dark:to-surface",
  },
  Microsoft: {
    initials: "MS",
    className: "bg-[#0078D4]/12 text-sm font-semibold text-[#0078D4]",
    accentBar: "bg-[#0078D4]",
    accentGlow: "from-[#0078D4]/25 via-gh-link/5",
    accentBorder: "border-[#0078D4]/35",
    accentHover:
      "hover:border-[#0078D4]/55 hover:shadow-[0_4px_24px_-10px] hover:shadow-[#0078D4]/20",
    accentLineHover: "group-hover/entry:bg-[#0078D4]/60",
  },
  Mercor: {
    initials: "M",
    className: "bg-[#8B5CF6]/15 text-sm font-semibold text-[#A78BFA]",
    accentBar: "bg-[#8B5CF6]",
    accentGlow: "from-[#8B5CF6]/25 via-[#6366F1]/5",
    accentBorder: "border-[#8B5CF6]/35",
    accentHover:
      "hover:border-[#8B5CF6]/55 hover:shadow-[0_4px_24px_-10px] hover:shadow-[#8B5CF6]/25",
    accentLineHover: "group-hover/entry:bg-[#8B5CF6]/60",
  },
  "Coach Academy": {
    initials: "CA",
    className: "bg-[#2b5797]/15 text-xs font-semibold text-[#4a7ab8]",
    accentBar: "bg-[#2b5797]",
    accentGlow: "from-[#2b5797]/25 via-[#2b5797]/5",
    accentBorder: "border-[#2b5797]/35",
    accentHover:
      "hover:border-[#2b5797]/55 hover:shadow-[0_4px_24px_-10px] hover:shadow-[#2b5797]/20",
    accentLineHover: "group-hover/entry:bg-[#2b5797]/60",
  },
  "German University in Cairo": {
    initials: "GUC",
    className: "bg-[#FFCE00]/10 text-[10px] font-semibold text-[#FFCE00]",
    accentBar: "bg-[#DD0000]",
    accentGlow: "from-[#FFCE00]/20 via-[#DD0000]/10",
    accentBorder: "border-[#DD0000]/30",
    accentHover:
      "hover:border-[#DD0000]/45 hover:shadow-[0_4px_24px_-10px] hover:shadow-[#DD0000]/15",
    accentLineHover: "group-hover/entry:bg-[#DD0000]/55",
    cardBg:
      "bg-gradient-to-br from-[#FFCE00]/10 via-[#DD0000]/[0.03] to-surface dark:from-[#FFCE00]/8 dark:via-[#DD0000]/[0.02] dark:to-surface",
  },
  "Benha National University": {
    initials: "BNU",
    className: "bg-[#48C1D9]/15 text-xs font-semibold text-[#48C1D9]",
    accentBar: "bg-[#48C1D9]",
    accentGlow: "from-[#48C1D9]/25 via-[#48C1D9]/5",
    accentBorder: "border-[#48C1D9]/35",
    accentHover:
      "hover:border-[#48C1D9]/55 hover:shadow-[0_4px_24px_-10px] hover:shadow-[#48C1D9]/20",
    accentLineHover: "group-hover/entry:bg-[#48C1D9]/60",
    cardBg:
      "bg-gradient-to-br from-[#48C1D9]/12 via-[#48C1D9]/[0.03] to-surface dark:from-[#48C1D9]/10 dark:via-[#48C1D9]/[0.02] dark:to-surface",
  },
  "Benha University": {
    initials: "BU",
    className: "bg-[#1a4b8c]/12 text-xs font-semibold text-[#1a4b8c] dark:text-[#5b8fd4]",
    accentBar: "bg-[#1a4b8c]",
    accentGlow: "from-[#1a4b8c]/20 via-[#1a4b8c]/5",
    accentBorder: "border-[#1a4b8c]/35",
    accentHover:
      "hover:border-[#1a4b8c]/50 hover:shadow-[0_4px_24px_-10px] hover:shadow-[#1a4b8c]/18",
    accentLineHover: "group-hover/entry:bg-[#1a4b8c]/55",
    cardBg:
      "bg-gradient-to-br from-[#1a4b8c]/10 via-[#1a4b8c]/[0.03] to-surface dark:from-[#1a4b8c]/8 dark:via-[#1a4b8c]/[0.02] dark:to-surface",
  },
};

export function getCompanyBrand(company: string): CompanyBrand {
  return companyBrands[company] ?? defaultBrand;
}
