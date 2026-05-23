import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type ExperienceEntryLocationProps = {
  location: string;
  className?: string;
};

export function ExperienceEntryLocation({
  location,
  className,
}: ExperienceEntryLocationProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-1.5 text-sm leading-snug text-muted-gh",
        className
      )}
    >
      <MapPin
        className="size-3.5 shrink-0 text-muted-gh/70"
        aria-hidden
      />
      <span>{location}</span>
    </p>
  );
}
