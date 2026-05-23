import Image from "next/image";
import { Building2 } from "lucide-react";
import type { LogoVariant } from "@/data/portfolio";
import { companyBrands } from "@/lib/company-brands";
import { cn } from "@/lib/utils";

type CompanyLogoProps = {
  company: string;
  logo?: string;
  logoVariant?: LogoVariant;
  logoClassName?: string;
  size?: "default" | "compact";
  className?: string;
};

const logoShell = {
  default: {
    square:
      "relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-background p-2 md:size-12",
    wide: "relative h-11 w-[4.75rem] shrink-0 overflow-hidden rounded-lg border border-border bg-background px-2 py-1.5 md:h-12 md:w-20",
  },
  compact: {
    square:
      "relative size-10 shrink-0 overflow-hidden rounded-md border border-border bg-background p-1.5",
    wide: "relative h-10 w-[4.25rem] shrink-0 overflow-hidden rounded-md border border-border bg-background px-1.5 py-1",
  },
} as const;

export function CompanyLogo({
  company,
  logo,
  logoVariant = "square",
  logoClassName,
  size = "default",
  className,
}: CompanyLogoProps) {
  const brand = companyBrands[company];
  const shell = logoShell[size][logoVariant];

  if (logo) {
    return (
      <div className={cn(shell, logoClassName, className)}>
        <Image
          src={logo}
          alt={`${company} logo`}
          width={logoVariant === "wide" ? 72 : 40}
          height={logoVariant === "wide" ? 32 : 40}
          className="size-full object-contain object-center"
        />
      </div>
    );
  }

  if (brand) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg border border-border",
          logoVariant === "wide"
            ? size === "compact"
              ? "h-10 w-[4.25rem] text-[10px]"
              : "h-11 w-[4.75rem] text-[10px] md:h-12 md:w-20"
            : size === "compact"
              ? "size-10"
              : "size-11 md:size-12",
          brand.className,
          logoClassName,
          className
        )}
        aria-hidden
      >
        {brand.initials}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-gh",
        logoVariant === "wide"
          ? size === "compact"
            ? "h-10 w-[4.25rem]"
            : "h-11 w-[4.75rem] md:h-12 md:w-20"
          : size === "compact"
            ? "size-10"
            : "size-11 md:size-12",
        className
      )}
      aria-hidden
    >
      <Building2 className="size-5" />
    </div>
  );
}
