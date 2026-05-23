import Link from "next/link";
import { Monogram } from "@/components/ui/monogram";
import { personal } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-canvas py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <Monogram size="sm" />
            <div>
              <p className="font-semibold text-fg">{personal.name}</p>
              <p className="text-sm text-muted-gh">{personal.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm">
            <Link
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub
            </Link>
            <Link
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              LinkedIn
            </Link>
            <Link
              href={personal.links.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Codeforces
            </Link>
            <Link href={`mailto:${personal.email}`} className="text-link">
              Email
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-gh">
          © {year} {personal.name}
        </p>
      </div>
    </footer>
  );
}
