import { ArrowRight, FileDown, Mail } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function HeroActions({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full max-w-xl flex-col items-stretch gap-2 max-sm:max-w-none sm:flex-row sm:gap-3",
        className
      )}
    >
      <LinkButton
        href="#projects"
        className="btn-primary-gh inline-flex h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-2xl px-4 text-sm font-semibold shadow-sm sm:w-auto sm:gap-2 sm:px-6 sm:min-w-[10.5rem]"
      >
        See my work
        <ArrowRight className="size-4 shrink-0" aria-hidden />
      </LinkButton>

      <div className="card-hover inline-flex min-h-11 min-w-0 w-full flex-1 flex-row overflow-hidden rounded-2xl border border-border/70 bg-card/60 sm:max-w-md sm:flex-none">
        <LinkButton
          href="#contact"
          className="inline-flex h-11 min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-none border-0 bg-transparent px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:gap-2 sm:px-5"
        >
          <Mail className="size-4 shrink-0 text-muted-gh" aria-hidden />
          <span className="truncate">Get in touch</span>
        </LinkButton>

        <span className="w-px shrink-0 self-stretch bg-border" aria-hidden />

        <LinkButton
          href={personal.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 min-h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-none border-0 bg-transparent px-2.5 text-sm font-medium text-link transition-colors hover:bg-muted sm:gap-2 sm:px-5"
        >
          <FileDown className="size-4 shrink-0" aria-hidden />
          <span className="truncate">Download CV</span>
        </LinkButton>
      </div>
    </div>
  );
}
