import Image from "next/image";
import { getEducationBrand } from "@/lib/education-brands";
import { cn } from "@/lib/utils";

type EducationSchoolMarkProps = {
  school: string;
  logo?: string;
  logoClassName?: string;
  size?: "default" | "large";
  className?: string;
};

export function EducationSchoolMark({
  school,
  logo,
  logoClassName,
  size = "default",
  className,
}: EducationSchoolMarkProps) {
  const brand = getEducationBrand(school);
  const isLarge = size === "large";
  const shellSize = isLarge ? "size-12 sm:size-14" : "size-11 sm:size-12";

  if (logo) {
    return (
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border p-1.5 shadow-sm",
          brand.accentBorder,
          shellSize,
          logoClassName ?? "bg-background",
          className
        )}
      >
        <Image
          src={logo}
          alt={`${school} logo`}
          width={48}
          height={48}
          className="size-full object-contain object-center"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm",
        brand.accentBorder,
        shellSize,
        className
      )}
    >
      <span
        className={cn(
          "flex size-full items-center justify-center rounded-[5px]",
          brand.className,
          isLarge ? "text-sm" : "text-xs"
        )}
      >
        {brand.initials}
      </span>
    </span>
  );
}
