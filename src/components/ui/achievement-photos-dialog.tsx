"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AchievementPhoto } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type AchievementPhotosDialogProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  photos: AchievementPhoto[];
  initialIndex?: number;
  onClose: () => void;
};

const HEADER_OFFSET = 88;

export function AchievementPhotosDialog({
  open,
  title,
  subtitle,
  photos,
  initialIndex = 0,
  onClose,
}: AchievementPhotosDialogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const figureRefs = useRef<(HTMLElement | null)[]>([]);
  const programmaticScroll = useRef(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const count = photos.length;
  const hasMultiple = count > 1;

  const clampIndex = useCallback(
    (index: number) => Math.max(0, Math.min(index, count - 1)),
    [count]
  );

  const getActiveIndexFromScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return 0;

    const activationLine = container.getBoundingClientRect().top + HEADER_OFFSET;
    let bestIndex = 0;
    let bestDistance = Infinity;

    figureRefs.current.forEach((figure, i) => {
      if (!figure) return;
      const rect = figure.getBoundingClientRect();
      const distance = Math.abs(rect.top - activationLine);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    });

    return bestIndex;
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      const figure = figureRefs.current[clampIndex(index)];
      if (!container || !figure) return;

      const targetIndex = clampIndex(index);
      programmaticScroll.current = true;
      setActiveIndex(targetIndex);

      const containerRect = container.getBoundingClientRect();
      const figureRect = figure.getBoundingClientRect();
      const top =
        container.scrollTop +
        (figureRect.top - containerRect.top) -
        HEADER_OFFSET +
        16;

      container.scrollTo({ top: Math.max(0, top), behavior });

      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(
        () => {
          programmaticScroll.current = false;
        },
        behavior === "smooth" ? 450 : 0
      );
    },
    [clampIndex]
  );

  const handleScroll = useCallback(() => {
    if (programmaticScroll.current) return;
    setActiveIndex(getActiveIndexFromScroll());
  }, [getActiveIndexFromScroll]);

  useEffect(() => {
    if (!open) {
      setActiveIndex(0);
      figureRefs.current = [];
      return;
    }

    const safeIndex = clampIndex(initialIndex);
    setActiveIndex(safeIndex);

    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToIndex(safeIndex, "auto"));
    });

    return () => cancelAnimationFrame(timer);
  }, [open, initialIndex, clampIndex, scrollToIndex]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (!hasMultiple) return;

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setActiveIndex((current) => {
          const next = clampIndex(current + 1);
          scrollToIndex(next);
          return next;
        });
      }
      if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setActiveIndex((current) => {
          const prev = clampIndex(current - 1);
          scrollToIndex(prev);
          return prev;
        });
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, [open, onClose, hasMultiple, clampIndex, scrollToIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!open || !container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open, handleScroll]);

  return (
    <AnimatePresence>
      {open && count > 0 ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-photos-title"
        >
          <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="min-w-0">
              <h2
                id="achievement-photos-title"
                className="truncate text-sm font-semibold text-fg sm:text-base"
              >
                {title}
              </h2>
              {subtitle ? (
                <p className="truncate font-mono text-[11px] text-muted-gh">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden font-mono text-[11px] text-muted-gh sm:inline">
                {hasMultiple ? "↑↓ to navigate" : null}
              </span>
              <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[11px] tabular-nums text-muted-gh">
                {activeIndex + 1}/{count}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="card-hover flex size-9 items-center justify-center rounded-md border border-border text-muted-gh hover:text-fg"
                aria-label="Close gallery"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          {hasMultiple ? (
            <div className="h-0.5 shrink-0 bg-border">
              <div
                className="h-full bg-primary transition-[width] duration-300"
                style={{ width: `${((activeIndex + 1) / count) * 100}%` }}
              />
            </div>
          ) : null}

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          >
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
              <div className="space-y-12 sm:space-y-16">
                {photos.map((photo, i) => (
                  <figure
                    key={photo.src}
                    ref={(el) => {
                      figureRefs.current[i] = el;
                    }}
                    data-photo-index={i}
                    className={cn(
                      "scroll-mt-24 transition-opacity duration-300",
                      i === activeIndex ? "opacity-100" : "opacity-90"
                    )}
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-2xl border bg-[#f6f8fa] shadow-sm transition-[border-color,box-shadow] dark:bg-[#161b22]",
                        i === activeIndex
                          ? "border-primary/40 shadow-md ring-1 ring-primary/15"
                          : "border-border"
                      )}
                    >
                      <div className="flex min-h-[200px] items-center justify-center p-5 sm:min-h-[280px] sm:p-8">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={1400}
                          height={1050}
                          className="max-h-[min(58vh,520px)] w-auto max-w-full object-contain"
                          sizes="(max-width: 672px) 100vw, 640px"
                          priority={i === initialIndex}
                        />
                      </div>
                    </div>
                    <figcaption className="mt-3 px-1">
                      <p className="text-sm font-medium text-fg">
                        {photo.caption ?? photo.alt}
                      </p>
                      {photo.caption && photo.alt !== photo.caption ? (
                        <p className="mt-1 text-xs leading-relaxed text-muted-gh">
                          {photo.alt}
                        </p>
                      ) : null}
                      <p className="mt-2 font-mono text-[10px] text-muted-gh/80">
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(count).padStart(2, "0")}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          {hasMultiple ? (
            <div className="z-20 shrink-0 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
              <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="card-hover flex size-9 items-center justify-center rounded-md border border-border text-muted-gh hover:text-fg disabled:pointer-events-none disabled:opacity-40"
                  aria-label="Previous photo"
                >
                  <ChevronUp className="size-4" aria-hidden />
                </button>

                <ul className="flex flex-1 justify-center gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {photos.map((photo, i) => (
                    <li key={photo.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => scrollToIndex(i)}
                        className={cn(
                          "flex h-11 w-14 items-center justify-center rounded-md border bg-[#f6f8fa] p-1 transition-all dark:bg-[#161b22]",
                          i === activeIndex
                            ? "border-primary ring-2 ring-primary/25"
                            : "border-border opacity-70 hover:opacity-100"
                        )}
                        aria-label={`Jump to photo ${i + 1}`}
                        aria-current={i === activeIndex ? "true" : undefined}
                      >
                        <Image
                          src={photo.src}
                          alt=""
                          width={80}
                          height={60}
                          className="max-h-9 max-w-full object-contain"
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToIndex(activeIndex + 1)}
                  disabled={activeIndex === count - 1}
                  className="card-hover flex size-9 items-center justify-center rounded-md border border-border text-muted-gh hover:text-fg disabled:pointer-events-none disabled:opacity-40"
                  aria-label="Next photo"
                >
                  <ChevronDown className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
