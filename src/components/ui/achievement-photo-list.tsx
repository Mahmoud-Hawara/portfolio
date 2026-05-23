"use client";

import { ArrowUpRight, ChevronRight, Images } from "lucide-react";
import Image from "next/image";
import type { AchievementPhoto } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_ROWS = 4;

type AchievementPhotoListProps = {
  photos: AchievementPhoto[];
  onOpen: (index: number) => void;
  className?: string;
};

export function AchievementPhotoList({
  photos,
  onOpen,
  className,
}: AchievementPhotoListProps) {
  const scrollable = photos.length > MAX_VISIBLE_ROWS;

  return (
    <div
      className={cn(
        "card-hover mt-4 overflow-hidden rounded-lg border border-border bg-card/50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-gh">
          <Images className="size-3 text-primary" aria-hidden />
          Gallery
          <span className="normal-case tracking-normal text-muted-gh/80">
            · {photos.length}
          </span>
        </span>
        <button
          type="button"
          onClick={() => onOpen(0)}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-link transition-colors hover:bg-muted hover:text-fg"
          aria-label={
            photos.length > 1
              ? `View all ${photos.length} photos`
              : "View photo full screen"
          }
        >
          {photos.length > 1 ? "View all" : "Full screen"}
          <ArrowUpRight className="size-3 shrink-0" aria-hidden />
        </button>
      </div>

      <ul
        className={cn(
          "divide-y divide-border",
          scrollable &&
            "max-h-[220px] overflow-y-auto overscroll-contain [scrollbar-width:thin]"
        )}
      >
        {photos.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => onOpen(i)}
              className="group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none sm:px-4 sm:py-3"
              aria-label={`Open photo ${i + 1}: ${photo.alt}`}
            >
              <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-[#f6f8fa] dark:bg-[#161b22]">
                <Image
                  src={photo.src}
                  alt=""
                  width={96}
                  height={96}
                  className="max-h-11 max-w-11 object-contain"
                  sizes="48px"
                />
                <span className="absolute bottom-0.5 right-0.5 rounded bg-card/90 px-1 font-mono text-[8px] text-muted-gh shadow-sm">
                  {i + 1}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium text-fg group-hover:text-link">
                  {photo.caption ?? photo.alt}
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-muted-gh">
                  Tap to view full size
                </span>
              </span>
              <ChevronRight
                className="size-4 shrink-0 text-muted-gh transition-transform group-hover:translate-x-0.5 group-hover:text-link"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
