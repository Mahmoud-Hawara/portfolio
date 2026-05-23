"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "card-hover inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-gh hover:text-fg",
        className
      )}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-primary" aria-hidden />
          <span className="text-primary">Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">Copy email</span>
          <span className="sm:hidden">Email</span>
        </>
      )}
    </button>
  );
}
