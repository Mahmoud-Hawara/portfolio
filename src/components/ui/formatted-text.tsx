import { cn } from "@/lib/utils";

type FormattedTextProps = {
  text: string;
  className?: string;
};

/** Renders strings with **bold** markers as emphasized text. */
export function FormattedText({ text, className }: FormattedTextProps) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
