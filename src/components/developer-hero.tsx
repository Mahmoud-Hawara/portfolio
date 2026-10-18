"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Box, Braces, Code2, Database, GitBranch, MapPin } from "lucide-react";
import styles from "./developer-hero.module.css";

export function OpeningSequence() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("mahmoud-opening-v6") === "seen"; } catch {}
    if (reduced || seen || window.scrollY > 48 || (location.hash && location.hash !== "#hero")) {
      const hideFrame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(hideFrame);
    }
    const startedAt = performance.now();
    let animationFrame = 0;
    const updateProgress = (now: number) => {
      const ratio = Math.min(1, (now - startedAt) / 3200);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));
      if (ratio < 1) animationFrame = window.requestAnimationFrame(updateProgress);
    };
    animationFrame = window.requestAnimationFrame(updateProgress);
    const dismiss = () => {
      try { sessionStorage.setItem("mahmoud-opening-v6", "seen"); } catch {}
      setVisible(false);
    };
    const timer = setTimeout(dismiss, 4300);
    window.addEventListener("wheel", dismiss, { once: true, passive: true });
    window.addEventListener("touchstart", dismiss, { once: true, passive: true });
    window.addEventListener("keydown", dismiss, { once: true });
    return () => {
      clearTimeout(timer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [reduced]);

  if (!visible) return null;
  const phase = progress < 38 ? "READING IDENTITY" : progress < 76 ? "CONNECTING THE WORK" : progress < 100 ? "FINALIZING EXPERIENCE" : "READY";
  return <div className={styles.opening} data-phase={progress === 100 ? "ready" : "loading"} aria-hidden="true">
    <div className={styles.openingGrid} />
    <div className={styles.openingScan} />
    <div className={styles.openingCorners}><i /><i /><i /><i /></div>
    <div className={styles.openingTopline}><span>PORTFOLIO / 2026</span><span>CAIRO, EGYPT</span></div>
    <div className={styles.openingIdentity}>
      <span className={styles.openingIndex}><i />01 / {phase}</span>
      <span className={styles.openingTitle}><span>Mahmoud</span><span>Hawara<span className={styles.openingPeriod}>.</span></span></span>
      <span className={styles.openingName}><strong>SOFTWARE ENGINEER</strong><i /><span>BUILD / EXPLAIN / COMPETE</span></span>
    </div>
    <div className={styles.openingRoute}><span data-ready={progress >= 32}><i />PROBLEM</span><b /><span data-ready={progress >= 64}><i />SYSTEM</span><b /><span data-ready={progress >= 96}><i />IMPACT</span></div>
    <div className={styles.openingProgress}><span>{phase}</span><span className={styles.openingRule}><i style={{ transform: `scaleX(${progress / 100})` }} /></span><strong>{String(progress).padStart(2, "0")}%</strong></div>
  </div>;
}

export function DeveloperHero({ socials, contactHref }: { socials: ReactNode; contactHref: string }) {
  return <section className={styles.hero} id="hero" aria-labelledby="hero-title">
    <div className={styles.ambientShapes} aria-hidden="true">
      <Box className={styles.cubeOne} />
      <Box className={styles.cubeTwo} />
      <Box className={styles.cubeThree} />
      <Box className={styles.cubeFour} />
      <Box className={styles.cubeFive} />
      <Database className={styles.databaseMark} />
      <GitBranch className={styles.branchMark} />
      <Braces className={styles.bracesMark} />
      <span className={styles.ambientNode}><i /><i /><i /></span>
      <span className={styles.ambientStack}><i /><i /><i /></span>
      <span className={styles.ambientSweep} />
    </div>
    <div className={styles.topline}><span><i className={styles.liveDot} />MAHMOUD HAWARA / SOFTWARE ENGINEER</span><span className={styles.location}><MapPin size={12} />CAIRO, EGYPT</span></div>
    <div className={styles.grid}>
      <div className={styles.introduction}>
        <p className={styles.eyebrow}><Code2 size={14} />HELLO, I’M MAHMOUD.</p>
        <h1 id="hero-title">I build software.<br /><span>I teach the thinking.</span></h1>
        <p className={styles.bio}>Software engineer at <strong>noon</strong>, previously at <strong>Microsoft</strong>. I build production systems, teach algorithms, data structures and databases at <strong>GUC</strong>, and compete in problem solving.</p>
        <div className={styles.signalRow} aria-label="Career highlights">
          <span><b>3×</b> ICPC regional finalist</span><i />
          <span><b>1,000+</b> students</span><i />
          <span><b>4,000+</b> problems</span>
        </div>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href="#projects">Explore my work <ArrowUpRight size={18} /></a>
          <a className={styles.secondaryAction} href="#experience">My experience <ArrowDown size={13} /></a>
        </div>
        <div className={styles.modeCard} aria-label="How Mahmoud works">
          <div className={styles.modeHeader}><GitBranch size={13} /><span>ENGINEER / TEACH / COMPETE</span><i /></div>
          <div className={styles.modeGrid}>
            <span><small>01 / ENGINEER</small><strong>Production software</strong></span>
            <span><small>02 / TEACH</small><strong>Algorithms · Data Structures · Databases</strong></span>
            <span><small>03 / COMPETE</small><strong>ICPC problem solving</strong></span>
          </div>
        </div>
      </div>
      <div className={styles.visual} aria-label="Mahmoud Hawara, software engineer">
        <div className={styles.techGrid} aria-hidden="true" />
        <div className={`${styles.orbit} ${styles.orbitOuter}`} aria-hidden="true"><i /></div>
        <div className={`${styles.orbit} ${styles.orbitMiddle}`} aria-hidden="true"><i /></div>
        <div className={`${styles.orbit} ${styles.orbitInner}`} aria-hidden="true" />
        <span className={`${styles.codeTag} ${styles.tagTop}`} aria-hidden="true"><Braces size={13} /> software</span>
        <div className={styles.processTag} aria-hidden="true"><small>WORKFLOW</small><span>design <i>→</i> build <i>→</i> ship</span></div>
        <figure className={styles.portrait}>
          <div className={styles.portraitImage}><Image src="/avatar.png" alt="Mahmoud Hawara" width={683} height={1024} sizes="(max-width: 760px) 180px, 310px" preload /></div>
          <figcaption><span>MAHMOUD HAWARA</span><i />AVAILABLE IN CAIRO</figcaption>
        </figure>
        <div className={`${styles.logoOrbiter} ${styles.noonOrbiter}`}><div><Image src="/logos/noon.svg" alt="" width={30} height={30} /><span><small>CURRENTLY</small><strong>noon</strong></span></div></div>
        <div className={`${styles.logoOrbiter} ${styles.microsoftOrbiter}`}><div><Image src="/logos/microsoft.svg" alt="" width={25} height={25} /><span><small>PREVIOUSLY</small><strong>Microsoft</strong></span></div></div>
        <div className={`${styles.logoOrbiter} ${styles.gucOrbiter}`}><div><Image src="/logos/guc.png" alt="" width={28} height={28} /><span><small>TEACHING</small><strong>GUC</strong></span></div></div>
      </div>
    </div>
    <div className={styles.bottom}>
      <a href="#experience" className={styles.scrollLink}><span className={styles.scrollTrack} aria-hidden="true"><i /></span>SCROLL TO EXPLORE <ArrowDown size={12} /></a>
      <div className={styles.socials}>{socials}</div>
      <a className={styles.heroContact} href={contactHref}>Start a conversation <ArrowUpRight size={11} /></a>
    </div>
  </section>;
}
