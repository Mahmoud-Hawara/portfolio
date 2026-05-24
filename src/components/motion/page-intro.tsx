"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Monogram } from "@/components/ui/monogram";
import { personal } from "@/data/portfolio";

const bootLines = [
  { text: "Hey — glad you made it here.", delay: 0 },
  { text: "Pulling up projects, experience, and the fun stuff…", delay: 0.35 },
  { text: "Almost ready…", delay: 0.65 },
  { text: "Here we go.", delay: 0.95, accent: true },
];

type Phase = "idle" | "playing" | "exit" | "done";

function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

export function PageIntro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);

    if (!shouldPlayIntro()) {
      setPhase("done");
      return;
    }

    setPhase("playing");
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setPhase("exit"), 2200);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 2900);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const showOverlay = phase === "playing" || phase === "exit";
  const hideContent = phase === "playing";

  const overlay =
    mounted && showOverlay ? (
      <motion.div
        key="page-intro"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-canvas px-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="presentation"
      >
        <div
          className="pointer-events-none absolute inset-0 grid-pattern opacity-40"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />

        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "exit"
              ? { opacity: 0, y: -24, scale: 0.97 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.45, type: "spring" }}
            >
              <Monogram size="lg" className="shadow-sm" />
            </motion.div>
            <div>
              <p className="font-mono text-xs text-muted-gh">
                {personal.handle}@portfolio
              </p>
              <p className="text-lg font-semibold text-fg">{personal.name}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card px-4 py-4 text-sm shadow-lg ring-1 ring-primary/10">
            {bootLines.map((line) => (
              <motion.p
                key={line.text}
                className={
                  line.accent
                    ? "font-medium text-primary"
                    : "text-muted-gh [&:not(:last-child)]:mb-2"
                }
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: line.delay,
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                {line.text}
              </motion.p>
            ))}
            <motion.span
              className="mt-2 inline-block h-4 w-0.5 bg-primary"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              aria-hidden
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 origin-left bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === "exit" ? 1 : 0.9 }}
          transition={{
            duration: phase === "exit" ? 0.35 : 2,
            ease: phase === "exit" ? "easeIn" : "linear",
          }}
        />
      </motion.div>
    ) : null;

  return (
    <>
      {mounted ? createPortal(overlay, document.body) : null}
      <div
        className="transition-[opacity,filter] duration-500 ease-out"
        style={{
          opacity: hideContent ? 0 : 1,
          filter: hideContent ? "blur(8px)" : "none",
          pointerEvents: hideContent ? "none" : undefined,
        }}
      >
        {children}
      </div>
    </>
  );
}
