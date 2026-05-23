"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ExperiencePhoto } from "@/data/portfolio";
import { getCompanyBrand } from "@/lib/company-brands";
import { cn } from "@/lib/utils";

const DEFAULT_FOCUS = "50% 20%";

type ExperienceEntryPhotosProps = {
  photos: ExperiencePhoto[];
  company?: string;
  className?: string;
};

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function PhotoThumb({
  photo,
  className,
  sizes = "56px",
}: {
  photo: ExperiencePhoto;
  className?: string;
  sizes?: string;
}) {
  const focus = photo.focus ?? DEFAULT_FOCUS;

  return (
    <Image
      src={photo.src}
      alt=""
      fill
      className={cn("object-cover", className)}
      style={{ objectPosition: focus }}
      sizes={sizes}
      aria-hidden
    />
  );
}

export function ExperienceEntryPhotos({
  photos,
  company,
  className,
}: ExperienceEntryPhotosProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useMounted();
  const reactId = useId();
  const brand = company ? getCompanyBrand(company) : null;

  const cover = photos[0];
  const active = photos[index] ?? cover;
  const count = photos.length;
  const hasMultiple = count > 1;
  const linkLabel = hasMultiple
    ? `View ${count} photos`
    : (cover.caption ?? "View photo");

  const close = useCallback(() => {
    setOpen(false);
    setIndex(0);
  }, []);

  const openDialog = useCallback(() => setOpen(true), []);

  const goPrev = useCallback(() => {
    setLoaded(false);
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setLoaded(false);
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!open) {
      setLoaded(false);
      return;
    }
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (hasMultiple && e.key === "ArrowLeft") goPrev();
      if (hasMultiple && e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, goPrev, goNext, hasMultiple]);

  if (!cover) return null;

  const activeFocus = active.focus ?? DEFAULT_FOCUS;

  const dialog = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${reactId}-title`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={close}
            aria-label="Close gallery"
          />

          <motion.div
            className={cn(
              "relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden border border-border bg-surface shadow-2xl",
              "rounded-t-2xl sm:max-w-2xl sm:rounded-xl",
              brand?.accentBorder
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {brand ? (
              <span
                className={cn("block h-1 w-full shrink-0", brand.accentBar)}
                aria-hidden
              />
            ) : null}

            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="min-w-0">
                {company ? (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-gh">
                    {company}
                  </p>
                ) : null}
                <p
                  id={`${reactId}-title`}
                  className="text-sm font-semibold text-fg"
                >
                  {active.caption ?? linkLabel}
                </p>
                {hasMultiple ? (
                  <p className="text-[10px] tabular-nums text-muted-gh">
                    {index + 1} / {count}
                  </p>
                ) : null}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="flex size-8 items-center justify-center rounded-md border border-border text-muted-gh hover:bg-muted hover:text-fg"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="relative flex min-h-[200px] items-center justify-center bg-muted/10 p-4 sm:p-6">
              {hasMultiple ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 z-10 flex size-8 items-center justify-center rounded-full border border-border bg-surface shadow-sm hover:bg-muted sm:left-3"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 z-10 flex size-8 items-center justify-center rounded-full border border-border bg-surface shadow-sm hover:bg-muted sm:right-3"
                    aria-label="Next"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </>
              ) : null}

              {!loaded ? (
                <div className="absolute inset-0 animate-pulse bg-muted/30" aria-hidden />
              ) : null}

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: loaded ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    width={1200}
                    height={1600}
                    className="max-h-[min(70vh,36rem)] w-auto max-w-full object-contain"
                    style={{ objectPosition: activeFocus }}
                    priority
                    onLoad={() => setLoaded(true)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="border-t border-border px-4 py-2.5 text-xs text-muted-gh">
              {active.alt}
            </p>

            {hasMultiple ? (
              <div className="flex gap-2 overflow-x-auto border-t border-border bg-muted/10 px-4 py-2">
                {photos.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => {
                      setLoaded(false);
                      setIndex(i);
                    }}
                    className={cn(
                      "relative h-11 w-14 shrink-0 overflow-hidden rounded-md border-2 transition-all",
                      i === index
                        ? "border-gh-link"
                        : "border-transparent opacity-50 hover:opacity-90"
                    )}
                    aria-current={i === index}
                  >
                    <PhotoThumb photo={photo} sizes="56px" />
                  </button>
                ))}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs text-gh-link transition-colors hover:underline",
          className
        )}
        aria-label={linkLabel}
      >
        <ImageIcon className="size-3.5 shrink-0 opacity-80" aria-hidden />
        {linkLabel}
      </button>

      {mounted ? createPortal(dialog, document.body) : null}
    </>
  );
}
