"use client";

import Image from "next/image";
import { DeveloperHero, OpeningSequence } from "@/components/developer-hero";
import { ArrowUpRight, Braces, Check, Cloud, Search, Upload, Layers, Code2, Copy, GraduationCap, Medal, Menu, Moon, Plus, Sparkles, Sun, Trophy, Users, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { type CSSProperties, type ReactNode, Fragment, useId, useLayoutEffect, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { achievements, educationEntries, experience, personal, projects, techStack, volunteering, type ExperienceEntry } from "@/data/portfolio";
import { FormattedText } from "@/components/ui/formatted-text";
import { getTechItemBrandIcon } from "@/lib/tech-item-icons";
import { SocialIcon } from "@/components/ui/social-icon";
import { siCodeforces } from "simple-icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const receiptMeta = [
  { type: "REGIONAL CONSISTENCY", tab: "ICPC REGIONAL", stageValue: "3×", note: "3 CONSECUTIVE SEASONS", stats: [{ value: "26TH", label: "2022" }, { value: "28TH", label: "2023" }, { value: "30TH", label: "2024" }] },
  { type: "NATIONAL PODIUM", tab: "ECPC BRONZE", stageValue: "2×", note: "EGYPT · TOP TEAMS", stats: [{ value: "12TH", label: "2022" }, { value: "11TH", label: "2024" }] },
  { type: "GLOBAL PRACTICE", tab: "CODEFORCES", stageValue: "1863", note: "4,000+ PROBLEMS", stats: [{ value: "EXPERT", label: "CODEFORCES" }, { value: "4K+", label: "PROBLEMS" }] },
  { type: "ACADEMIC RECORD", tab: "CLASS RANK", stageValue: "5TH", note: "89.13% · WITH HONORS", stats: [{ value: "5TH", label: "OVERALL" }, { value: "89.13%", label: "FINAL SCORE" }] },
] as const;

// Content is visible in server HTML. Scroll effects only add movement;
// an interrupted animation or unavailable observer must never hide a section.
function Reveal({ children, className = "", delay = 0, direction = "up" }: { children: ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" }) {
  const reduced = useReducedMotion();
  const startX = direction === "left" ? -75 : direction === "right" ? 75 : 0;
  return <motion.div className={`scene-reveal ${className}`} initial={false} whileInView={reduced ? { x: 0, y: 0, scale: 1 } : { x: [startX, 0], y: [direction === "up" ? 65 : 25, 0], scale: [0.97, 1] }} viewport={{ once: false, amount: 0.12, margin: "0px 0px -35px 0px" }} transition={{ duration: reduced ? 0 : 0.85, delay, ease: EASE }}>{children}</motion.div>;
}

function OrganizationMark({ name, src, className = "" }: { name: string; src?: string; className?: string }) {
  return <span className={`organization-mark ${name === "noon" ? "mark-noon" : name === "micro1" ? "mark-micro1" : ""} ${name === "Coach Academy" ? "mark-coach" : ""} ${name === "Benha University" ? "mark-benha" : ""} ${className}`}>
    {src ? <Image src={src} alt={`${name} logo`} width={44} height={44} /> : <GraduationCap size={22} aria-hidden="true" />}
  </span>;
}

const techAliases: Record<string, string> = { React: "React.js", MERN: "MongoDB", "Google Cloud": "GCP" };

function TechnologyIcon({ name }: { name: string }) {
  const icon = getTechItemBrandIcon(techAliases[name] ?? name);
  if (icon) return <svg className={`technology-icon ${["000000", "FFFFFF", "181717"].includes(icon.hex.toUpperCase()) ? "monochrome-icon" : ""}`} viewBox="0 0 24 24" aria-hidden="true" style={{ "--brand": `#${icon.hex}` } as CSSProperties}><path d={icon.path} fill="currentColor" /></svg>;
  if (name.startsWith("Azure") || ["KQL", "Application Insights"].includes(name)) return <Cloud className="technology-icon azure-icon" size={14} aria-hidden="true" />;
  return <Code2 className="technology-icon fallback-icon" size={14} aria-hidden="true" />;
}

const navigation = [
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Beyond", id: "about" },
  { label: "GitHub", id: "github-activity" },
  { label: "Contact", id: "contact" },
];

const companyLinkedIn: Record<string, string> = {
  noon: "https://www.linkedin.com/company/nooncom/",
  "German University in Cairo": "https://www.linkedin.com/school/german-university-in-cairo/",
  Microsoft: "https://www.linkedin.com/company/microsoft/",
  Mercor: "https://www.linkedin.com/company/mercor-ai/",
  micro1: "https://www.linkedin.com/company/micro1/",
  "Benha National University": "https://www.linkedin.com/school/benhanationaluniversity/",
  "Coach Academy": "https://www.linkedin.com/company/coachacademyeg/",
};

function SectionHeading({ number, title, note }: { number: string; title: string; note?: string }) {
  return <Reveal className="section-heading"><div><span className="section-number">{number}</span><h2>{title}</h2></div>{note && <p>{note}</p>}</Reveal>;
}

function Tags({ items }: { items: string[] }) {
  return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}><TechnologyIcon name={item} />{item}</li>)}</ul>;
}

function SmoothDisclosure({ className, summaryClassName = "", summary, children }: { className: string; summaryClassName?: string; summary: ReactNode; children: ReactNode }) {
  const [expanded,setExpanded] = useState(false);
  const [visible,setVisible] = useState(false);
  const [contentHeight,setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const id = useId();
  useLayoutEffect(() => {
    if (!visible || !contentRef.current) return;
    const content = contentRef.current;
    const measure = () => setContentHeight(Math.ceil(content.getBoundingClientRect().height));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [visible]);
  const duration = reduced ? 0 : Math.min(.44,Math.max(.22,contentHeight / 2000));
  return <details className={`${className} smooth-disclosure`} open={visible} data-expanded={expanded}>
    <summary className={summaryClassName} id={`${id}-trigger`} aria-expanded={expanded} aria-controls={`${id}-body`} onClick={event => { event.preventDefault(); setVisible(true); setExpanded(value => !value); }}>{summary}</summary>
    <motion.div id={`${id}-body`} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!expanded} inert={!expanded} initial={false} animate={{height:expanded ? contentHeight : 0}} transition={{duration,ease:[.22,.61,.36,1]}} onAnimationComplete={() => { if (!expanded) setVisible(false); }} className="smooth-disclosure-clip"><div className="disclosure-measure" ref={contentRef}>{children}</div></motion.div>
  </details>;
}

function DetailToggle() {
  return <span className="detail-toggle" aria-hidden="true"><Plus size={12} strokeWidth={1.5} /></span>;
}

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const brand = href.includes("github.com") ? "github" : href.includes("linkedin.com") ? "linkedin" : href.includes("codeforces.com") ? "codeforces" : null;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`text-link ${className}`}>{brand === "codeforces" ? <svg className="social-brand" viewBox="0 0 24 24" aria-hidden="true"><path d={siCodeforces.path} fill="currentColor" /></svg> : brand && <SocialIcon brand={brand} className="social-brand" />}{children}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>;
}

type ProjectEntry = (typeof projects)[number];

function ProjectMachine({ kind, index }: { kind: ProjectEntry["visual"]; index: number }) {
  if (kind === "judge") return <div className="project-machine project-machine-judge" aria-label="Online judge submission pipeline" role="img">
    <div className="machine-topline"><span><span className="machine-live-dot" />LIVE PIPELINE</span><span>JUDGE / 01</span></div>
    <div className="judge-flow">
      <div className="flow-node"><span>01</span><strong>SUBMIT</strong><small>C++ · Java · Python</small></div>
      <span className="project-flow-arrow" aria-hidden="true">→</span>
      <div className="flow-node flow-node-core"><span>02</span><strong>EXECUTE</strong><small>isolated test runner</small><i className="flow-pulse" /></div>
      <span className="project-flow-arrow" aria-hidden="true">→</span>
      <div className="flow-node flow-node-success"><Check size={17} /><strong>ACCEPTED</strong><small>24 / 24 tests</small></div>
    </div>
    <div className="machine-console"><span>$ verdict --submission 4281</span><span>runtime&nbsp; 0.42s</span><span className="console-ok">STATUS&nbsp; AC</span></div>
  </div>;

  if (kind === "scheduler") return <div className="project-machine project-machine-scheduler" aria-label="Automated university scheduling engine" role="img">
    <div className="machine-topline"><span><span className="machine-live-dot" />ALLOCATION ENGINE</span><span>SCHEDULE / 02</span></div>
    <div className="scheduler-workspace">
      <div className="scheduler-board">
        <div className="scheduler-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span></div>
        {[0, 1, 2].map(row => <div className="scheduler-slots" key={row}><small>{9 + row * 2}:00</small>{[0, 1, 2, 3].map(cell => <i className={(row + cell) % 3 === 0 ? "slot-open" : "slot-filled"} key={cell}><span /></i>)}</div>)}
      </div>
      <div className="scheduler-result"><span>WORST CASE</span><strong>02<small>MIN</small></strong><p>Groups, halls and observers allocated.</p><div><Check size={13} /> CONFLICT FREE</div></div>
    </div>
  </div>;

  return <div className="project-machine project-machine-generic" aria-label="Software system architecture" role="img">
    <div className="machine-topline"><span><span className="machine-live-dot" />SYSTEM MAP</span><span>BUILD / {String(index + 1).padStart(2, "0")}</span></div>
    <div className="generic-system-map"><span>INPUT</span><i /><strong>CORE SYSTEM</strong><i /><span>OUTPUT</span></div>
  </div>;
}

function ProjectCase({ project, index }: { project: ProjectEntry; index: number }) {
  const reduced = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const notesTitle = index === 0 ? "Architecture, performance & product decisions" : "From manual planning to a working system";
  return <motion.article className={`project-case project-case-${index + 1}`} data-case={number} initial={false} whileInView={reduced ? undefined : { y: [70, 0], opacity: [0.72, 1] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}>
    <div className="project-case-rail"><span>CASE / {number}</span><span>{project.year}</span></div>
    <div className="project-case-grid">
      <div className="project-case-copy">
        <p className="project-kind">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-case-description">{project.description}</p>
        <div className="project-outcome"><span>THE OUTCOME</span><strong>{project.impact}</strong></div>
        <Tags items={project.topics} />
      </div>
      <ProjectMachine kind={project.visual} index={index} />
    </div>
    <div className="project-proof-strip" aria-label="Project results">{project.proofs.map((proof, proofIndex) => <motion.div key={proof.label} initial={false} whileInView={reduced ? undefined : { y: [18, 0], opacity: [0, 1] }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : proofIndex * 0.09, ease: EASE }}><span>0{proofIndex + 1}</span><strong>{proof.value}</strong><small>{proof.label}</small></motion.div>)}</div>
    <div className="project-case-footer">
      <SmoothDisclosure className="project-notes" summary={<><span className="project-notes-heading"><small>ENGINEERING NOTES</small><strong>{notesTitle}</strong></span><span className="project-notes-command"><small>{String(project.highlights.length).padStart(2, "0")} ENTRIES</small><span className="project-notes-toggle"><Plus size={12} strokeWidth={1.5} /></span></span></>}><div className="project-notes-panel"><ol>{project.highlights.map((line, lineIndex) => <li key={line}><span>{String(lineIndex + 1).padStart(2, "0")}</span><p>{line}</p></li>)}</ol></div></SmoothDisclosure>
      {project.href !== "#" ? <ExternalLink href={project.href} className="project-repository"><span><small>PUBLIC SOURCE</small><strong>GitHub repository</strong></span></ExternalLink> : <span className="project-private"><span className="project-private-dot" /><span><small>RELEASE STATUS</small><strong>Internal deployment</strong></span></span>}
    </div>
  </motion.article>;
}

type GitHubContribution = { date: string; count: number; level: number };
type GitHubContributionResponse = { total: Record<string, number>; contributions: GitHubContribution[] };

function GitHubActivity({ username, profile }: { username: string; profile: string }) {
  const [activity, setActivity] = useState<GitHubContributionResponse | null>(null);
  const [activityUnavailable, setActivityUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("GitHub activity unavailable");
        return response.json() as Promise<GitHubContributionResponse>;
      })
      .then(data => setActivity(data))
      .catch(error => { if (error instanceof Error && error.name !== "AbortError") setActivityUnavailable(true); });
    return () => controller.abort();
  }, [username]);

  const placeholder = Array.from({ length: 371 }, (_, index) => ({ date: "", count: 0, level: index % 13 === 0 ? 1 : 0 }));
  const contributions = activity?.contributions ?? placeholder;
  const weeks = Array.from({ length: Math.ceil(contributions.length / 7) }, (_, index) => contributions.slice(index * 7, index * 7 + 7));
  const months = weeks.flatMap((week, weekIndex) => {
    const firstWeekDate = week.find(day => day.date && Number(day.date.slice(8)) <= 7);
    return firstWeekDate ? [{ label: new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(`${firstWeekDate.date}T00:00:00`)), weekIndex }] : [];
  }).filter((month, index, list) => index === 0 || month.label !== list[index - 1].label);
  const total = activity ? Object.values(activity.total)[0] : null;
  const activeDays = activity?.contributions.filter(day => day.count > 0).length ?? null;
  const longestStreak = activity?.contributions.reduce((result, day) => {
    const run = day.count > 0 ? result.run + 1 : 0;
    return { run, max: Math.max(result.max, run) };
  }, { run: 0, max: 0 }).max ?? null;
  const firstDate = activity?.contributions.at(0)?.date;
  const lastDate = activity?.contributions.at(-1)?.date;
  const formatRange = (date?: string) => date ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`)) : "";

  return <div className="github-activity">
    <div className="github-activity-head">
      <div><span className="github-kicker"><span className="machine-live-dot" />GITHUB / LAST 12 MONTHS</span><h3><span className="github-handle-icon"><SocialIcon brand="github" /></span>@{username}</h3></div>
      <div className="github-activity-stats"><div className="github-total"><strong>{total ?? "—"}</strong><span>{activityUnavailable ? "View live activity on GitHub" : "contributions"}</span></div><div className="github-mini-stat"><strong>{activeDays ?? "—"}</strong><span>active days</span></div><div className="github-mini-stat"><strong>{longestStreak ?? "—"}</strong><span>days / longest streak</span></div></div>
    </div>
    <div className="github-calendar-scroll" aria-label={activityUnavailable ? "GitHub activity unavailable" : `${total ?? "Loading"} GitHub contributions in the last year`}>
      <div className="github-calendar-inner">
        <div className="github-months" aria-hidden="true">{months.map(month => <span key={`${month.label}-${month.weekIndex}`} style={{ "--github-offset": `${(month.weekIndex / Math.max(weeks.length - 1, 1)) * 100}%` } as CSSProperties}>{month.label}</span>)}</div>
        <div className="github-calendar-grid"><div className="github-day-labels" aria-hidden="true"><span>MON</span><span>WED</span><span>FRI</span></div><div className={`github-weeks ${activity ? "is-loaded" : "is-loading"}`}>{weeks.map((week, weekIndex) => <div className="github-week" key={weekIndex}>{week.map((day, dayIndex) => <time className={weekIndex === weeks.length - 1 && dayIndex === week.length - 1 ? "is-latest" : ""} key={`${weekIndex}-${dayIndex}`} dateTime={day.date || undefined} title={day.date ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : "Loading activity"} data-level={day.level} />)}</div>)}</div></div>
      </div>
    </div>
    <div className="github-activity-foot"><span>{firstDate && lastDate ? `${formatRange(firstDate)} — ${formatRange(lastDate)}` : "Loading the latest activity…"}</span><div className="github-legend" aria-label="Contribution intensity"><small>LESS</small>{[0, 1, 2, 3, 4].map(level => <i data-level={level} key={level} />)}<small>MORE</small></div><ExternalLink href={profile}>Open GitHub profile</ExternalLink></div>
  </div>;
}

const careerNarrative: Record<string, { lead: string; metric: string; metricLabel: string; signal: string; chapter: string; chapterText: string; drawerTitle: string; tags: string[] }> = {
  noon: {
    lead: "I build catalog and discovery features for the Dubai Mall shopping app. I joined before its internal launch and worked alongside my mentor as a two-person catalog team, handling much of the work from seller tooling to the customer-facing app.",
    metric: "~2M",
    metricLabel: "SKUs · 100K products",
    signal: "Dubai Mall app · Pre-launch → Production",
    chapter: "Building Dubai Mall’s catalog.",
    chapterText: "Part of a two-person catalog team from before internal launch, building features and improving search across approximately two million SKUs.",
    drawerTitle: "Inside Dubai Mall",
    tags: ["Dubai Mall app", "Brand search", "Catalog", "Solr"],
  },
  "German University in Cairo": {
    lead: "Started at GUC as a Teaching Assistant and received a fully funded Master’s scholarship. Later chose hands-on software engineering and a return to industry, cancelling the scholarship while continuing to teach part-time until July 2026.",
    metric: "100+",
    metricLabel: "students per course",
    signal: "Teach → Test → Mentor",
    chapter: "Make hard ideas click.",
    chapterText: "Teaching and a fully funded Master’s scholarship, followed by a decision to prioritize industry. Continued teaching part-time until 10 July 2026.",
    drawerTitle: "Teaching, scholarship & the move to industry",
    tags: ["Advanced Database", "Data Structures", "Teaching"],
  },
  Microsoft: {
    lead: "Built automation and observability for Microsoft Clarity’s backend testing, from scheduled benchmarks to dashboards and parallel test capacity.",
    metric: "10×",
    metricLabel: "parallel test capacity",
    signal: "Automate → Observe → Scale",
    chapter: "Automate the bottleneck.",
    chapterText: "Automated benchmarks, monitored system performance, and removed bottlenecks in parallel testing.",
    drawerTitle: "What I automated",
    tags: ["Python", "Azure Functions", "KQL", "Grafana"],
  },
  micro1: {
    lead: "Created around 150 very challenging algorithmic problems for AI training, alongside reviewing problem submissions.",
    metric: "~150",
    metricLabel: "hard problems authored",
    signal: "Design → Validate → Review",
    chapter: "Raise the difficulty.",
    chapterText: "AI training and review focused on very hard algorithmic problems.",
    drawerTitle: "AI training & review",
    tags: ["AI Training", "Algorithms", "Problem Design", "Review"],
  },
  Mercor: {
    lead: "Authored competitive programming problems, reference solutions, and edge-case tests to challenge AI problem solving.",
    metric: "75+",
    metricLabel: "problems authored",
    signal: "Design → Validate → Calibrate",
    chapter: "Design for edge cases.",
    chapterText: "Designed original problems and test data, then reviewed their quality and difficulty with the engineering team.",
    drawerTitle: "What I designed",
    tags: ["C++", "Algorithms", "Problem Setting"],
  },
  "Benha National University": {
    lead: "Taught object-oriented programming, algorithms, and MySQL while supporting coursework and ICPC team preparation.",
    metric: "200+",
    metricLabel: "students taught",
    signal: "Explain → Practice → Compete",
    chapter: "Build the foundations.",
    chapterText: "Teaching the concepts students need before they can compete with confidence.",
    drawerTitle: "What I taught",
    tags: ["Algorithms", "OOP", "MySQL", "ICPC"],
  },
  "Coach Academy": {
    lead: "Prepared undergraduates for ICPC and graduates for technical interviews through structured practice and individual feedback.",
    metric: "600+",
    metricLabel: "learners trained",
    signal: "Learn → Solve → Review",
    chapter: "Train the thinking.",
    chapterText: "Helping problem solvers build structure, speed, and confidence under pressure.",
    drawerTitle: "How I trained",
    tags: ["C++", "ICPC", "Training", "Interviews"],
  },
};

const noonTopics = [
  {
    "label": "Dubai Mall app",
    "caption": "Before launch → production",
    "mark": "01",
    "tone": "gold",
    "kind": "overview",
    "title": "My work on the Dubai Mall app.",
    "intro": "I work mainly on the Dubai Mall shopping app, building the catalog services behind its product browsing and search.",
    "sections": [
      [
        "Involved from before launch",
        "I joined before the internal launch and worked on the catalog as the app took shape. My mentor and I were the two people on the catalog team, handling much of the work from seller tools to the customer-facing app."
      ],
      [
        "What I build and improve",
        "I built brand search, collections, video uploads, and size ordering. Alongside these features, I keep working on search quality and latency. Size normalization is my current focus."
      ]
    ]
  },
  {
    "label": "Catalog pipeline",
    "caption": "Seller Lab → publication",
    "mark": "02",
    "tone": "gold",
    "kind": "seller",
    "title": "How products reach the app.",
    "intro": "My work spans the path from a seller uploading a product to that product becoming available in the app.",
    "sections": [
      [
        "Seller tools",
        "In Seller Lab, partners import products and catalog data, export their existing catalog, and manage product records. I also worked on stores and brands: a partner can have several stores under a project, with multiple brands in each store."
      ],
      [
        "Checks and publication",
        "Submitted product data is stored centrally across noon marketplaces. It passes quality, content, and live checks before entering our catalog. We then re-index the published data in Solr so customers can find it through search. I worked across this pipeline."
      ]
    ]
  },
  {
    "label": "Search & discovery",
    "caption": "Suggestions, filters & latency",
    "mark": "03",
    "tone": "gold",
    "kind": "search",
    "title": "Help customers find products faster.",
    "intro": "I work on Solr search, improving suggestions, autocomplete, and search latency.",
    "sections": [
      [
        "Organizing search with filter keys",
        "I worked on filter keys that group SKUs. These groups let us narrow search queries and organize the filters customers use to browse the catalog."
      ],
      [
        "Catalog services in the app",
        "My work also covers catalog URIs and the data behind PDP and BLP pages. I had a small contribution to vector search and limited exposure to Elasticsearch, which is used for search in Seller Lab."
      ]
    ]
  },
  {
    "label": "Brand search",
    "caption": "Built from scratch",
    "mark": "↳",
    "tone": "teal",
    "kind": "brand",
    "title": "Search by brand, alongside stores and products.",
    "intro": "I built brand search from scratch, adding a search option that the app did not previously have.",
    "sections": [
      [
        "The feature",
        "The app already supported store and product search. I added the ability to search for brands, giving customers another way to find what they are looking for."
      ],
      [
        "The implementation",
        "I built it using the existing Solr store core. We extended the search infrastructure already in place instead of creating a separate core for brands."
      ]
    ]
  },
  {
    "label": "Collections",
    "caption": "Built end to end",
    "mark": "↳",
    "tone": "blue",
    "kind": "collections",
    "title": "Build a collection. Show it in the store.",
    "intro": "I built collections end to end, so partners can group selected products and display them together in their app storefront.",
    "sections": [
      [
        "From SKUs to a storefront collection",
        "A partner creates a collection, adds the SKUs it should contain, and uses the CMS to place it in their store. For example, a summer collection brings a chosen set of products together for customers to browse. My work covered creation through CMS integration."
      ],
      [
        "My end-to-end contribution",
        "I built the collection feature from creation and SKU selection through CMS integration, so partners can display their chosen products together in the app storefront."
      ]
    ]
  },
  {
    "label": "Video uploads",
    "caption": "Upload & media processing",
    "mark": "↳",
    "tone": "teal",
    "kind": "video",
    "title": "Upload product videos individually or in bulk.",
    "intro": "I built the video upload flow through PDB and the importers, including automatic compression as part of processing.",
    "sections": [
      [
        "What partners can upload",
        "The importer accepts up to 20 videos in one submission, with each source file up to 100 MB. PDB provides the other upload route."
      ],
      [
        "Preparing videos for playback",
        "The processing flow automatically compresses videos to a maximum of 20 MB each. The app then fetches the smaller processed file, reducing the amount of data transferred for playback."
      ]
    ]
  },
  {
    "label": "Product sizing",
    "caption": "Controlled AI · Ops review",
    "mark": "↳",
    "tone": "blue",
    "kind": "sizing",
    "title": "AI size ordering, with Ops in control.",
    "intro": "I built the size-ordering workflow end to end: controlled AI suggestions, a review dashboard for Ops, and updates that flow back into the app. Size normalization remains a separate, ongoing feature.",
    "sections": [
      [
        "The problem: no shared size guide",
        "Each brand or store supplied sizes in its own format and without a reliable order. With no size guide to follow, we needed a way to identify the sizing system and arrange each size combination correctly."
      ],
      [
        "Controlled suggestions, with reasons when they fail",
        "I defined the supported sizing systems and built the AI flow to identify which system a new size belongs to, then order sizes within that system. When it finds a problem, it reports a failure with a reason so Ops can investigate instead of accepting an unclear result."
      ],
      [
        "An Ops dashboard for review and editing",
        "I built a dashboard showing size combinations, their orderings, and statistics across the sizing systems in our data. Ops can request AI suggestions, review the results and failure reasons, and edit the ordering directly."
      ],
      [
        "Process only what is missing",
        "Previously processed combinations reuse their saved results. I also added a way to fetch only new products whose size combinations are missing from size ordering, and run AI on those. This lets us catch up after the feature has been disabled and re-enabled without paying to process the whole catalog again."
      ],
      [
        "From an Ops edit to the app",
        "When Ops updates a combination’s ordering, the related products are re-indexed so the corrected order is reflected in the app."
      ]
    ]
  },
] as const;

function NoonWorkflows() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const topic = noonTopics[selected];
  const selectTopic = (index: number, focus = false) => {
    setSelected(index);
    if (focus) document.getElementById(`noon-topic-${index}`)?.focus();
  };
  return <SmoothDisclosure className="noon-atlas" summaryClassName="noon-atlas-cover" summary={<>
      <span className="noon-cover-emblem" aria-hidden="true"><Layers size={19} /><i /><i /></span>
      <span className="noon-cover-text"><small>DUBAI MALL / CATALOG ENGINEERING</small><strong>From pre-launch to production.</strong><span>The catalog, search & features I helped build.</span></span>
      <span className="noon-cover-command"><span className="noon-open-label">EXPLORE<small>{String(noonTopics.length).padStart(2,"0")} PARTS</small></span><span className="noon-close-label">CLOSE<small>FIELD NOTES</small></span><DetailToggle /></span>
      <span className="noon-cover-map" aria-hidden="true"><span><i>Dubai Mall app</i><b>→</b><i>Catalog & discovery</i></span><span className="noon-cover-features"><i><Search size={9} />Brand search</i><i><Layers size={9} />Collections & more</i></span></span>
    </>}>
    <div className="noon-atlas-body">
      <div className="noon-atlas-topline"><span>THE APP & THE FEATURES</span><span>SELECT A PART TO EXPLORE <span aria-hidden="true">↙</span></span></div>
      <div className="noon-atlas-layout">
        <div className="noon-atlas-nav" role="tablist" aria-label="Explore the catalog pipeline" aria-orientation="vertical">
          {noonTopics.map((item, index) => <Fragment key={item.label}>
            {index === 3 && <span className="noon-nav-divider" role="presentation">FEATURES I BUILT</span>}
            <button type="button" role="tab" id={`noon-topic-${index}`} aria-controls="noon-topic-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} data-tone={item.tone} onClick={() => selectTopic(index)} onKeyDown={event => {
              const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % noonTopics.length : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index + noonTopics.length - 1) % noonTopics.length : event.key === "Home" ? 0 : event.key === "End" ? noonTopics.length - 1 : null;
              if (next !== null) { event.preventDefault(); selectTopic(next, true); }
            }}><span className="noon-nav-marker">{item.kind === "video" ? <Upload size={12} /> : item.kind === "brand" ? <Search size={12} /> : index >= 3 ? <Layers size={12} /> : item.mark}</span><span><strong>{item.label}</strong><small>{item.caption}</small></span><ArrowUpRight size={13} aria-hidden="true" />{selected === index && <motion.i layoutId="noon-topic-active" transition={{ duration: reduced ? 0 : .25 }} />}</button>
          </Fragment>)}
        </div>
        <div className="noon-atlas-panel" id="noon-topic-panel" role="tabpanel" aria-labelledby={`noon-topic-${selected}`} tabIndex={0} data-tone={topic.tone}>
          <motion.div key={selected} initial={reduced ? false : { opacity: .4, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .28 }}>
            <div className="noon-panel-meta"><span><i aria-hidden="true" />{topic.kind === "overview" ? "DUBAI MALL APP" : selected < 3 ? "ACROSS THE PIPELINE" : topic.kind === "sizing" ? "BUILT + IN PROGRESS" : "FEATURE IMPLEMENTATION"}</span><span>0{selected + 1} / {String(noonTopics.length).padStart(2,"0")}</span></div>
            <h4>{topic.title}</h4><p className="noon-panel-intro">{topic.intro}</p>
            <div className={`noon-exhibit noon-exhibit-${topic.kind}`}>
              {topic.kind === "overview" && <div className="noon-app-scale"><div><strong>100K</strong><span>products</span></div><div><strong>~2M</strong><span>SKUs</span></div><p>Pre-launch foundations.<br />Production catalog.</p></div>}
              {topic.kind === "brand" && <div className="noon-brand-diagram"><span><small>EXISTING SEARCH</small><strong>Store core</strong></span><i aria-hidden="true">→</i><span><small>NEW FEATURE</small><strong>Brand search</strong></span><em>Same core · new search path</em></div>}
              {topic.kind === "sizing" && <div className="noon-size-routing"><span className="size-routing-label">SIZE ORDERING / CONTROLLED AI</span><div><span>Known combination</span><i aria-hidden="true">→</i><strong>Reuse saved order</strong></div><div><span>New combination</span><i aria-hidden="true">→</i><strong>Identify system & order</strong></div><div><span>Ops review & edits</span><i aria-hidden="true">→</i><strong>Re-index related products</strong></div><small><i aria-hidden="true" />Failure reasons and sizing-system statistics in the Ops dashboard</small><small><i aria-hidden="true" />Size normalization: in progress</small></div>}
              {topic.kind === "seller" && <><div className="noon-file-stack" aria-hidden="true"><i /><i /><i /></div><div className="noon-exhibit-text"><small>SELLER LAB</small><strong>Import ↔ Export</strong><span>Partners manage their catalog here.</span></div><div className="noon-record-preview" aria-label="Products, stores and brands"><span><i />Products</span><span><i />Stores</span><span><i />Brands</span></div></>}
              {topic.kind === "search" && <><div className="noon-search-preview"><span><Search size={13} /><strong>Product discovery</strong><small>SOLR</small></span><div><i>Suggestions</i><i>Autocomplete</i><i>Filter keys</i></div></div><span className="noon-search-destination">PDP<br />BLP<ArrowUpRight size={13} /></span></>}
              {topic.kind === "video" && <><div className="noon-video-limit"><strong>20</strong><span>videos / import</span></div><div className="noon-video-conversion"><span>100 MB <small>source limit</small></span><i aria-hidden="true" /><strong>≤20 MB <small>processed video</small></strong></div></>}
              {topic.kind === "collections" && <><div className="noon-sku-mosaic" aria-label="Selected SKUs"><i /><i /><i /><i /><i /><i /></div><span className="noon-mosaic-arrow" aria-hidden="true"><small>CURATE</small>→</span><div className="noon-mini-store"><small>CMS / STOREFRONT</small><strong>Summer collection</strong><span><i /><i /><i /></span></div></>}
            </div>
            <div className="noon-panel-notes">{topic.sections.map(([title, body]) => <section key={title}><h5>{title}</h5><p>{body}</p></section>)}</div>
          </motion.div>
          <div className="noon-panel-pager"><span className="noon-topic-position" aria-label={`Part ${selected + 1} of ${noonTopics.length}`}>{noonTopics.map((item,index) => <i key={item.label} className={index === selected ? "is-current" : ""} />)}</span><button type="button" onClick={() => selectTopic((selected + 1) % noonTopics.length, true)}><span><small>UP NEXT</small>{noonTopics[(selected + 1) % noonTopics.length].label}</span><ArrowUpRight size={15} aria-hidden="true" /></button></div>
        </div>
      </div>
    </div>
  </SmoothDisclosure>;
}

const experienceNoteHeadings: Record<string, { title: string; subtitle: string }> = {
  "German University in Cairo": { title: "Inside the classroom", subtitle: "Teaching, scholarship & the move to industry" },
  Microsoft: { title: "Behind Clarity’s benchmarks", subtitle: "Automation, observability & performance" },
  micro1: { title: "Designing and reviewing hard problems", subtitle: "AI training, problem design & review" },
  Mercor: { title: "The making of a challenge", subtitle: "Problem design, test data & review" },
  "Benha National University": { title: "Building the foundations", subtitle: "Core teaching, coursework & ICPC" },
  "Coach Academy": { title: "Training the problem solver", subtitle: "Competition, interviews & mentorship" },
};

function ExperienceNotes({ entry }: { entry: ExperienceEntry }) {
  const heading = experienceNoteHeadings[entry.company];
  return <SmoothDisclosure className="experience-notes" summaryClassName="experience-notes-trigger" summary={<><span className="experience-notes-title"><span className="experience-notes-kicker">A CLOSER LOOK</span><strong>{heading.title}</strong><span className="experience-notes-subtitle">{heading.subtitle}</span></span><span className="experience-notes-action"><small className="disclosure-open-label">EXPLORE</small><small className="disclosure-close-label">CLOSE</small><span className="experience-notes-plus" aria-hidden="true"><Plus size={12} strokeWidth={1.5} /></span></span></>}>
    <div className="experience-notes-body">
      <dl className="experience-reading-list">{entry.bullets.map(bullet => {
        const match = bullet.match(/^\*\*(.+?)\.\*\*\s*(.*)$/);
        return <div key={bullet}><dt>{match ? match[1] : "Contribution"}</dt><dd><FormattedText text={match ? match[2] : bullet} /></dd></div>;
      })}</dl>
      {entry.phases && <div className="experience-notes-phases" aria-label="Role progression">{entry.phases.map(phase => <div key={phase.period}><strong>{phase.type}</strong><span>{phase.period}</span></div>)}</div>}
    </div>
  </SmoothDisclosure>;
}

function MicrosoftWork({ entry }: { entry: ExperienceEntry }) {
  const [selected,setSelected] = useState(0);
  const reduced = useReducedMotion();
  const topics = [
    { label: "Automation", title: "Benchmarks that run themselves.", bullets:[0,1] },
    { label: "Observability", title: "A clearer view of performance.", bullets:[2] },
    { label: "Test capacity", title: "More parallel tests. Same test window.", bullets:[3] },
  ];
  const topic = topics[selected];
  const id = useId();
  return <SmoothDisclosure className="microsoft-brief" summaryClassName="microsoft-brief-cover" summary={<><span className="microsoft-cover-symbol" aria-hidden="true"><i /><i /><i /><i /></span><span><small>MICROSOFT CLARITY / BACKEND</small><strong>Inside the testing engine.</strong><span>Automation, visibility, and room to scale.</span></span><span className="microsoft-cover-action"><span className="disclosure-open-label">EXPLORE</span><span className="disclosure-close-label">CLOSE</span><DetailToggle /></span></>}>
    <div className="microsoft-brief-body">
      <div className="microsoft-brief-tabs" role="tablist" aria-label="Explore my work on Microsoft Clarity">{topics.map((item,index) => <button key={item.label} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={index === selected} tabIndex={index === selected ? 0 : -1} aria-controls={`${id}-panel`} onClick={() => setSelected(index)} onKeyDown={event => { const next = event.key === "ArrowRight" ? (index+1)%3 : event.key === "ArrowLeft" ? (index+2)%3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : null; if (next !== null) {event.preventDefault();setSelected(next);document.getElementById(`${id}-tab-${next}`)?.focus();} }}><span>0{index+1}</span>{item.label}{index === selected && <motion.i layoutId={`${id}-active`} transition={{duration:reduced ? 0 : .2}} />}</button>)}</div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} tabIndex={0}>
        <motion.div key={selected} initial={reduced ? false : {opacity:.5,y:4}} animate={{opacity:1,y:0}} transition={{duration:.18}}>
          <h4>{topic.title}</h4>
          {selected === 0 && <div className="clarity-automation" aria-label="Timer and queue triggers run Azure Functions for session and metric validation"><span><small>TRIGGER</small><strong>Timer / Queue</strong></span><i aria-hidden="true">→</i><span><small>EXECUTE</small><strong>Azure Functions</strong></span><i aria-hidden="true">→</i><span><small>VALIDATE</small><strong>Sessions & metrics</strong></span></div>}
          {selected === 1 && <div className="clarity-observability"><div><strong>15+</strong><span>system metrics</span></div><div className="clarity-query"><small>QUERY → VISUALIZE</small><span>KQL <i>→</i> Grafana</span><small>Monitor performance trends</small></div></div>}
          {selected === 2 && <div className="clarity-capacity"><div><span>BEFORE</span><strong>100</strong><i style={{"--capacity":"10%"} as CSSProperties} /></div><div><span>AFTER</span><strong>1,000</strong><i style={{"--capacity":"100%"} as CSSProperties} /></div><p>tests per 12-hour window</p></div>}
          <div className="clarity-description">{topic.bullets.map(index => <p key={index}><FormattedText text={entry.bullets[index].replace(/^\*\*.+?\.\*\*\s*/,"")} /></p>)}</div>
        </motion.div>
      </div>
    </div>
  </SmoothDisclosure>;
}

function CareerJourney({ jobs }: { jobs: ExperienceEntry[] }) {
  const journey = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<Array<HTMLElement | null>>([]);
  const reduced = useReducedMotion();
  const [activeStop, setActiveStop] = useState(0);
  const { scrollYProgress } = useScroll({ target: journey, offset: ["start 72%", "end 72%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 95, damping: 28, mass: 0.35 });
  const cursorPosition = useTransform(lineProgress, [0, 1], ["14px", "calc(100% - 34px)"]);
  const activeJob = jobs[activeStop];
  const activeStory = careerNarrative[activeJob.company];

  useEffect(() => {
    let frame = 0;
    const updateActiveStop = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.36;
        let next = 0;
        let distance = Number.POSITIVE_INFINITY;
        stopRefs.current.forEach((stop, index) => {
          if (!stop) return;
          const rect = stop.getBoundingClientRect();
          const currentDistance = rect.top <= marker && rect.bottom >= marker
            ? 0
            : Math.min(Math.abs(rect.top - marker), Math.abs(rect.bottom - marker));
          if (currentDistance < distance) {
            distance = currentDistance;
            next = index;
          }
        });
        setActiveStop((current) => current === next ? current : next);
      });
    };
    updateActiveStop();
    window.addEventListener("scroll", updateActiveStop, { passive: true });
    window.addEventListener("resize", updateActiveStop);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveStop);
      window.removeEventListener("resize", updateActiveStop);
    };
  }, [jobs.length]);

  return <div className="career-journey" ref={journey} data-range={`{ 01 → ${String(jobs.length).padStart(2,"0")} }`}>
    <aside className="career-story">
      <span className="career-live"><i /> CAREER SIGNAL / LIVE</span>
      <h3><span>Build at scale.</span><span>Teach with clarity.</span><em>Stay sharp.</em></h3>
      <p>Building production systems, teaching the thinking behind them, and staying sharp through competition.</p>

      <div className="career-now">
        <div className="career-now-label"><span>CURRENT CHAPTER</span><span>SCROLL / FOLLOW</span></div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeJob.company}
            initial={reduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -3 }}
            transition={{ duration: reduced ? 0 : 0.26, ease: EASE }}
          >
            <span className="career-now-index">0{activeStop + 1} / {String(jobs.length).padStart(2,"0")}</span>
            <div className="career-now-company"><OrganizationMark name={activeJob.company} src={activeJob.logo} /><span><strong>{activeJob.company}</strong><small>{activeJob.role}</small></span></div>
            <h4>{activeStory.chapter}</h4>
            <p>{activeStory.chapterText}</p>
            <span className="career-now-signal">{activeStory.signal}</span>
          </motion.div>
        </AnimatePresence>
        <div className="career-step-dots" aria-hidden="true">{jobs.map((job, index) => <i className={index <= activeStop ? "is-passed" : ""} key={job.company} />)}</div>
      </div>

    </aside>

    <div className="career-stream">
      <span className="career-line" aria-hidden="true" />
      <motion.span className="career-line-progress" aria-hidden="true" style={reduced ? { scaleY: 1 } : { scaleY: lineProgress }} />
      <motion.span className="career-line-cursor" aria-hidden="true" style={reduced ? { top: "calc(100% - 34px)" } : { top: cursorPosition }}><i /></motion.span>
      {jobs.map((entry, index) => {
        const story = careerNarrative[entry.company];
        const current = entry.period.includes("Present");
        return <motion.article
          className={`career-stop career-stop-${index + 1} ${index === activeStop ? "is-active" : ""}`}
          data-career-index={index}
          ref={(node) => { stopRefs.current[index] = node; }}
          key={`${entry.company}-${entry.period}`}
          initial={false}
          whileInView={reduced ? { y: 0, opacity: 1 } : { y: [18, 0], opacity: [.72, 1] }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: reduced ? 0 : 0.58, ease: EASE }}
        >
          <span className="career-node" aria-hidden="true"><i /></span>
          <div className="career-stop-topline">
            <span>0{index + 1} / {current ? "NOW" : entry.period.split("–").at(-1)?.trim()}</span>
            <span className={current ? "is-current" : ""}>{[entry.type,entry.schedule].filter(Boolean).join(" · ").toUpperCase()}</span>
          </div>
          <div className="career-stop-heading">
            <a className="career-company-identity" href={companyLinkedIn[entry.company]} target="_blank" rel="noopener noreferrer" aria-label={`${entry.company} on LinkedIn (opens in a new tab)`}>
              <span className="career-company-logo"><OrganizationMark name={entry.company} src={entry.logo} /><span className="career-profile-cue" aria-hidden="true"><ArrowUpRight size={11} /></span></span>
              <span className="career-company-copy"><h3>{entry.company}</h3><p>{entry.role}</p></span>
            </a>
            <time>{entry.period}</time>
          </div>
          <div className="career-stop-content">
            <div className="career-copy">
              <p className="career-lead">{story.lead}</p>
              <span className="career-signal">{story.signal}</span>
            </div>
            <div className="career-side">
              <div className="career-outcome"><strong>{story.metric}</strong><span>{story.metricLabel}</span></div>
            </div>
          </div>
          <div className="career-stop-footer">
            <Tags items={story.tags} />
            <span className="career-workplace"><span>{entry.workMode}</span>{entry.workMode !== "Remote" && entry.location && <span>{entry.location}</span>}</span>
          </div>
          {entry.company === "noon" ? <NoonWorkflows /> : entry.company === "Microsoft" ? <MicrosoftWork entry={entry} /> : <ExperienceNotes entry={entry} />}
        </motion.article>;
      })}
    </div>
  </div>;
}

function ContactField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    let animationFrame = 0;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let rotationX = -0.13;
    let rotationY = 0.34;
    let targetX = rotationX;
    let targetY = rotationY;
    let pointerX = 0;
    let pointerY = 0;
    let engagement = 0;
    let targetEngagement = 0;
    const pointCount = window.innerWidth < 700 ? 62 : 92;
    const points = Array.from({ length: pointCount }, (_, index) => {
      const y = 1 - (index / (pointCount - 1)) * 2;
      const ring = Math.sqrt(1 - y * y);
      const angle = Math.PI * (3 - Math.sqrt(5)) * index;
      return { x: Math.cos(angle) * ring, y, z: Math.sin(angle) * ring };
    });
    const edgeKeys = new Set<string>();
    const edges: Array<[number, number]> = [];

    points.forEach((point, index) => {
      points
        .map((candidate, candidateIndex) => ({
          candidateIndex,
          distance: (point.x - candidate.x) ** 2 + (point.y - candidate.y) ** 2 + (point.z - candidate.z) ** 2,
        }))
        .filter(({ candidateIndex }) => candidateIndex !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .forEach(({ candidateIndex }) => {
          const start = Math.min(index, candidateIndex);
          const end = Math.max(index, candidateIndex);
          const key = `${start}:${end}`;
          if (!edgeKeys.has(key)) {
            edgeKeys.add(key);
            edges.push([start, end]);
          }
        });
    });

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      const x = pointerX / bounds.width - 0.5;
      const y = pointerY / bounds.height - 0.5;
      targetY = 0.34 + x * 0.9;
      targetX = -0.13 + y * 0.48;
      targetEngagement = 1;
    };

    const leave = () => {
      targetX = -0.13;
      targetY = 0.34;
      targetEngagement = 0;
    };

    const draw = (time: number) => {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      rotationX += (targetX - rotationX) * 0.035;
      rotationY += (targetY - rotationY) * 0.035;
      engagement += (targetEngagement - engagement) * 0.06;
      if (!reduced) rotationY += 0.00125 + engagement * 0.0022;

      const dark = document.documentElement.classList.contains("dark");
      const ink = dark ? "242,238,232" : "35,38,42";
      const aqua = dark ? "117,220,211" : "27,126,129";
      const orange = dark ? "255,157,108" : "190,79,40";
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const sphereRadius = Math.min(width, height) * (width < 430 ? 0.35 : 0.385);

      const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, sphereRadius * 1.25);
      halo.addColorStop(0, `rgba(${aqua},${dark ? 0.075 : 0.055})`);
      halo.addColorStop(0.48, `rgba(${orange},${dark ? 0.026 : 0.018})`);
      halo.addColorStop(1, `rgba(${ink},0)`);
      context.fillStyle = halo;
      context.beginPath();
      context.arc(centerX, centerY, sphereRadius * 1.35, 0, Math.PI * 2);
      context.fill();

      const sinY = Math.sin(rotationY);
      const cosY = Math.cos(rotationY);
      const sinX = Math.sin(rotationX);
      const cosX = Math.cos(rotationX);
      const projected = points.map(point => {
        const x1 = point.x * cosY - point.z * sinY;
        const z1 = point.x * sinY + point.z * cosY;
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = point.y * sinX + z1 * cosX;
        const perspective = 1.52 / (2.55 - z2 * 0.48);
        return {
          x: centerX + x1 * sphereRadius * perspective,
          y: centerY + y2 * sphereRadius * perspective,
          z: z2,
          perspective,
        };
      });

      context.lineWidth = 0.65 + engagement * 0.2;
      edges.forEach(([start, end]) => {
        const a = projected[start];
        const b = projected[end];
        const depth = (a.z + b.z + 2) / 4;
        context.strokeStyle = `rgba(${ink},${0.035 + depth * (dark ? 0.16 : 0.12)})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      });

      projected
        .map((point, index) => ({ ...point, index }))
        .sort((a, b) => a.z - b.z)
        .forEach(point => {
          const accent = point.index % 17 === 0 ? aqua : point.index % 23 === 0 ? orange : ink;
          const depth = (point.z + 1) / 2;
          const pointerDistance = Math.hypot(point.x - pointerX, point.y - pointerY);
          const proximity = engagement * Math.max(0, 1 - pointerDistance / 94);
          context.fillStyle = `rgba(${accent},${0.2 + depth * 0.72})`;
          context.beginPath();
          context.arc(point.x, point.y, 0.75 + depth * 1.35 + proximity * 2.2, 0, Math.PI * 2);
          context.fill();
        });

      if (engagement > 0.02) {
        const nearest = projected.reduce((best, point) => {
          const distance = Math.hypot(point.x - pointerX, point.y - pointerY);
          return distance < best.distance ? { point, distance } : best;
        }, { point: projected[0], distance: Number.POSITIVE_INFINITY });
        if (nearest.distance < 125) {
          const locatorAlpha = engagement * Math.max(0, 1 - nearest.distance / 125);
          context.strokeStyle = `rgba(${aqua},${locatorAlpha * 0.78})`;
          context.lineWidth = 0.8;
          context.setLineDash([2, 4]);
          context.beginPath();
          context.moveTo(pointerX, pointerY);
          context.lineTo(nearest.point.x, nearest.point.y);
          context.stroke();
          context.setLineDash([]);
          context.beginPath();
          context.arc(nearest.point.x, nearest.point.y, 7 + Math.sin(time * 0.006) * 1.8, 0, Math.PI * 2);
          context.stroke();
        }
      }

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.18);
      context.strokeStyle = `rgba(${aqua},${dark ? 0.19 : 0.16})`;
      context.lineWidth = 0.7;
      context.setLineDash([2, 7]);
      context.beginPath();
      context.ellipse(0, 0, sphereRadius * 0.94, sphereRadius * 0.31, 0, 0, Math.PI * 2);
      context.stroke();
      context.setLineDash([]);
      context.restore();

      const pulse = reduced ? 0.35 : (time * 0.00034) % 1;
      context.strokeStyle = `rgba(${aqua},${(1 - pulse) * (dark ? 0.1 : 0.075)})`;
      context.lineWidth = 0.7;
      context.beginPath();
      context.arc(centerX, centerY, sphereRadius * (0.22 + pulse * 0.88), 0, Math.PI * 2);
      context.stroke();

      const satelliteAngle = reduced ? 0.7 : time * 0.00048;
      const satelliteX = centerX + Math.cos(satelliteAngle) * sphereRadius * 0.93;
      const satelliteY = centerY + Math.sin(satelliteAngle) * sphereRadius * 0.3;
      context.fillStyle = `rgba(${orange},0.95)`;
      context.shadowColor = `rgba(${orange},0.45)`;
      context.shadowBlur = 12;
      context.beginPath();
      context.arc(satelliteX, satelliteY, 3.1, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;

      const secondAngle = reduced ? 2.5 : -time * 0.00036 + 2.2;
      const secondX = centerX + Math.cos(secondAngle) * sphereRadius * 0.78;
      const secondY = centerY + Math.sin(secondAngle) * sphereRadius * 0.52;
      context.fillStyle = `rgba(${aqua},0.92)`;
      context.shadowColor = `rgba(${aqua},0.4)`;
      context.shadowBlur = 10;
      context.beginPath();
      context.arc(secondX, secondY, 2.35, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;

      if (!reduced) animationFrame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    const themeObserver = new MutationObserver(() => { if (reduced) draw(0); });
    resizeObserver.observe(host);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    resize();
    draw(0);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);

  return <canvas className="contact-portal-canvas" ref={canvasRef} aria-hidden="true" />;
}

export function PortfolioSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [active, setActive] = useState("");
  const [activeReceipt, setActiveReceipt] = useState(0);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const updateHeader = () => {
      const visible = window.scrollY > 48;
      setHeaderVisible(visible);
      setHeaderCompact(window.scrollY > window.innerHeight * 0.9);
      if (!visible) setMenuOpen(false);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const ids = navigation.map(link => link.id);
    let frame = 0;
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.34;
        let next = "";
        ids.forEach(id => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= marker) next = id;
        });
        setActive(current => current === next ? current : next);
      });
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  async function copyEmail() {
    const showCopiedState = () => {
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(personal.email);
      } else {
        const input = document.createElement("textarea");
        input.value = personal.email;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      showCopiedState();
    } catch {
      showCopiedState();
    }
  }

  const career = [...experience].sort((a,b) => Date.parse(b.period.split(" – ")[0]) - Date.parse(a.period.split(" – ")[0]));
  const contactMailto = `mailto:${personal.email}?subject=${encodeURIComponent("A problem worth solving")}`;
  const toolsFor = (ids: string[]) => techStack.filter(group => ids.includes(group.id)).flatMap(group => group.items);
  const stackLanes = [
    { index: "01", label: "Languages", note: "The layer closest to thought.", items: toolsFor(["programming-languages"]) },
    { index: "02", label: "Product & APIs", note: "Interfaces people and services depend on.", items: toolsFor(["backend", "frontend"]) },
    { index: "03", label: "Cloud & data", note: "State, scale, and the systems around them.", items: toolsFor(["gcp", "azure", "data"]) },
    { index: "04", label: "Platform & core", note: "Reliability below every shipped feature.", items: toolsFor(["devops", "qa", "fundamentals"]) },
  ];
  const humanLanes = [
    { index: "A", label: "Communicate", note: "Make difficult technical ideas clear.", items: ["Technical communication", "Mentoring & teaching", "Knowledge sharing"] },
    { index: "B", label: "Collaborate", note: "Keep people aligned while the system moves.", items: ["Cross-functional work", "Stakeholder alignment", "Team leadership"] },
    { index: "C", label: "Operate", note: "Stay useful when the problem is still unclear.", items: ["Problem solving", "Adaptability", "Attention to detail"] },
  ];
  const communityMetrics = [
    { value: "500+", label: "STUDENTS PREPARED" },
    { value: "2,000+", label: "CHALLENGE PARTICIPANTS" },
    { value: "IEEE", label: "ROBOTICS" },
    { value: "HEAD", label: "SCIENTIFIC COMMITTEE" },
  ];
  const receipt = achievements[activeReceipt]!;
  const receiptDetails = receiptMeta[activeReceipt]!;
  const selectReceipt = (index: number) => setActiveReceipt(index);

  return (
    <>
      <motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" /><noscript><style>{`.scene-reveal,.scroll-chapter,.tool-items>span {opacity:1!important;transform:none!important;filter:none!important}`}</style></noscript>
      <OpeningSequence />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" data-visible={headerVisible} data-compact={headerCompact} data-menu-open={menuOpen} inert={!headerVisible}>
        <div className="shell header-inner">
          <a className="name-wordmark" href="#hero" aria-label="Mahmoud Hawara, back to top"><span>Mahmoud Hawara</span><i aria-hidden="true" /></a>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="main-navigation" aria-label="Main navigation">
            {navigation.map((link, index) => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined} style={{ "--nav-order": index } as CSSProperties} onClick={() => setMenuOpen(false)}><span>{link.label}</span>{active === link.id && <motion.i className="nav-active-line" layoutId="header-active-line" transition={{ type: "spring", stiffness: 360, damping: 34 }} />}</a>)}
          </nav>
          <div className="header-actions">
            <button className="icon-button theme-button" aria-label="Toggle color theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><Sun className="sun-icon" size={16} /><Moon className="moon-icon" size={16} /></button>
            <button ref={menuButton} className="icon-button menu-button" aria-controls="main-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <DeveloperHero contactHref={contactMailto} socials={<><ExternalLink href={personal.links.github}>GitHub</ExternalLink><ExternalLink href={personal.links.linkedin}>LinkedIn</ExternalLink><ExternalLink href={personal.links.codeforces}>Codeforces</ExternalLink></>} />

        <div className="proof-band"><Reveal className="shell proof-grid"><div><Trophy className="proof-icon" size={21} /><strong>3×</strong><span>ICPC regional finalist</span></div><div><Sparkles className="proof-icon" size={21} /><strong>2×</strong><span>ECPC bronze medalist</span></div><div><Users className="proof-icon" size={21} /><strong>1,000+</strong><span>Students taught</span></div><div><Braces className="proof-icon" size={21} /><strong>4,000+</strong><span>Problems solved</span></div></Reveal></div>

        <section className="section shell experience-section" id="experience">
          <SectionHeading number="01" title="Work, in motion." note="Engineering that ships. Teaching that sticks." />
          <CareerJourney jobs={career} />
        </section>

        <section className="projects-section" id="projects"><div className="shell section">
          <SectionHeading number="02" title="Built from scratch." note="Real problems. Working systems. Measurable outcomes." />
          <div className="project-archive-head"><div><span className="machine-live-dot" />SELECTED BUILDS</div><span>{String(projects.length).padStart(2, "0")} CASE STUDIES</span><span>ARCHIVE / EXPANDING</span></div>
          <div className="project-archive">{projects.map((project, index) => <ProjectCase project={project} index={index} key={project.title} />)}</div>
        </div></section>

        <section className="section shell about-section" id="about">
          <SectionHeading number="03" title="Built on more than code." note="Engineering. Teaching. Competition." />

          <div className="about-stage">
            <div className="about-manifesto">
              <span className="about-kicker"><i />THE OPERATING SYSTEM</span>
              <h3><span>I build.</span><span>I explain.</span><span>I compete.</span></h3>
              <p>Those three modes shape how I work: ship dependable systems, make difficult ideas clear, and stay calm when the problem gets hard.</p>
              <ExternalLink href={personal.links.codeforces}>See the problem solver</ExternalLink>
            </div>
            <div className="about-process" aria-label="From ambiguity to shipped software">
              <div className="about-process-meta"><span>FROM THE PROBLEM</span><i /><span>TO THE PRODUCT</span></div>
              <div className="about-process-field" aria-hidden="true">
                <svg className="about-process-path" viewBox="0 0 700 490" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="about-flow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="var(--accent-two)" stopOpacity=".18" />
                      <stop offset=".48" stopColor="var(--foreground)" stopOpacity=".42" />
                      <stop offset="1" stopColor="var(--accent)" stopOpacity=".72" />
                    </linearGradient>
                  </defs>
                  <path className="about-process-ghost" d="M42 91 C 210 12, 310 190, 470 145 S 650 210, 548 278 S 280 278, 235 384 S 408 480, 648 410" />
                  <path className="about-process-flow" d="M42 91 C 210 12, 310 190, 470 145 S 650 210, 548 278 S 280 278, 235 384 S 408 480, 648 410" />
                  <circle className="about-process-runner-svg" r="4">
                    <animateMotion dur="7s" repeatCount="indefinite" path="M42 91 C 210 12, 310 190, 470 145 S 650 210, 548 278 S 280 278, 235 384 S 408 480, 648 410" />
                  </circle>
                </svg>
                <span className="about-process-seed about-process-seed-a" />
                <span className="about-process-seed about-process-seed-c" />
                <div className="about-process-word about-process-word-a"><small>01 / READ</small><strong>AMBIGUITY</strong><p>Find the real problem.</p></div>
                <div className="about-process-word about-process-word-b"><small>02 / REDUCE</small><strong>CLARITY</strong><p>Make the thinking visible.</p></div>
                <div className="about-process-word about-process-word-c"><small>03 / MAKE</small><strong>SHIPPED.</strong><p>Turn the answer into something real.</p></div>
                <span className="about-process-whisper about-process-whisper-a">ASK BETTER QUESTIONS</span>
                <span className="about-process-whisper about-process-whisper-b">SYSTEMS · PEOPLE · PRESSURE</span>
              </div>
              <div className="about-process-foot"><span>THINK</span><i /><span>EXPLAIN</span><i /><span>BUILD</span></div>
            </div>
          </div>

          <div className="about-education" id="education">
            <div className="about-education-head">
              <div><span>03A / EDUCATION</span><h3>Education.</h3></div>
              <p>Three chapters that built the analytical base behind the work.</p>
            </div>
            <div className="education-editorial" aria-label="Education history">
              <article className="education-side education-before">
                <span><i>01</i> BEFORE / 2016—2019</span>
                <div className="education-side-score"><b>98%</b><small>FINAL SCORE</small></div>
                <div className="education-side-school"><OrganizationMark name={educationEntries[2].school} src={educationEntries[2].logo} /><h4>{educationEntries[2].school}</h4></div>
                <p>{educationEntries[2].degree}</p>
                <strong>Science built the curiosity.</strong>
                <footer><span>MATH</span><span>PHYSICS</span><span>LOGIC</span></footer>
              </article>

              <article className="education-core">
                <div className="education-core-top"><span>02 / THE DEGREE · 2019—2024</span><strong>COMPUTER ENGINEERING</strong></div>
                <div className="education-core-score" aria-hidden="true"><small>DEPARTMENT<br />RANK</small><b>5</b><i>TH</i></div>
                <div className="education-core-domains" aria-label="Core computer engineering studies"><small>CORE STUDIES</small><span>ALGORITHMS</span><span>OPERATING SYSTEMS</span><span>DATABASES</span><span>COMPUTER NETWORKS</span><span>BACKEND SYSTEMS</span></div>
                <span className="education-core-stamp">ACADEMIC RECORD <i /> VERIFIED</span>
                <div className="education-core-identity"><OrganizationMark name={educationEntries[1].school} src={educationEntries[1].logo} className="education-benha-mark" /><div><span>{educationEntries[1].period}</span><h4>{educationEntries[1].school}</h4><p>{educationEntries[1].degree}</p></div></div>
                <div className="education-core-result"><span>EXCELLENT WITH HONORS</span><b>89.13%</b></div>
              </article>

              <article className="education-side education-after">
                <span><i>03</i> AFTER / 2025—2026</span>
                <div className="education-funded"><small>MERIT SCHOLARSHIP</small><b><em>FULLY</em> FUNDED</b><span>AWARD / 01</span></div>
                <div className="education-side-school"><OrganizationMark name={educationEntries[0].school} src={educationEntries[0].logo} /><h4>{educationEntries[0].school}</h4></div>
                <p>Master’s Degree scholarship</p>
                <strong>Chose the industry path.</strong>
                <footer><span>GUC</span><span>MASTER’S</span><span>2025</span></footer>
              </article>
            </div>
            <div className="education-baseline"><span>CURIOSITY</span><i /><span>ENGINEERING</span><i /><span>DIRECTION</span></div>
          </div>

          <div className="about-record" id="achievements">
            <div className="about-subhead"><div><span>03B / PROOF</span><h3>Receipts.</h3></div><p>The outcomes behind the claims.</p></div>
            <div className="receipt-switcher">
              <div className="receipt-switcher-head"><span><i />SELECT A RECORD</span><span>HOVER / FOCUS / TAP</span></div>
              <div className="receipt-tabs" role="tablist" aria-label="Achievement records">
                {achievements.map((entry, index) => <button key={entry.title} type="button" role="tab" id={`receipt-tab-${index}`} aria-controls="receipt-panel" aria-selected={activeReceipt === index} className={activeReceipt === index ? "is-active" : ""} onMouseEnter={() => selectReceipt(index)} onFocus={() => selectReceipt(index)} onClick={() => selectReceipt(index)}>
                  <strong>{entry.badge}</strong><small>{receiptMeta[index].tab}</small>
                </button>)}
              </div>
              <div className={`receipt-stage receipt-stage-${receipt.accent}`} id="receipt-panel" role="tabpanel" aria-labelledby={`receipt-tab-${activeReceipt}`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article key={receipt.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .42, ease: EASE }}>
                    <div className="receipt-stage-mark"><div className="receipt-stage-score"><span>{receipt.icon === "graduation" ? <GraduationCap size={31} /> : receipt.icon === "code" ? <Braces size={31} /> : receipt.icon === "medal" ? <Medal size={31} /> : <Trophy size={31} />}</span><strong>{receiptDetails.stageValue}</strong></div><div className="receipt-stage-stats">{receiptDetails.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
                    <div className="receipt-stage-copy"><div><span>{receiptDetails.type}</span><i /> <span>{receipt.period}</span></div><h4>{receipt.title}</h4><p><FormattedText text={receipt.description} /></p></div>
                    <footer><span><i />VERIFIED OUTCOME</span><span>{receiptDetails.note}</span></footer>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="about-stack" id="tools">
            <div className="stack-foundation-head">
              <div><span>03C / SKILLS</span><h3>What the work<br />stands on.</h3></div>
              <p>The tools change. The engineering fundamentals stay.</p>
            </div>
            <div className="stack-foundation-field">
              <div className="stack-foundation-legend" aria-hidden="true"><span>TECHNICAL FIELD</span><span>04 CONNECTED DOMAINS</span></div>
              <div className="stack-foundation-core" aria-hidden="true"><span>ENGINEERING</span><strong>04</strong><small>CONNECTED LAYERS</small></div>
              {stackLanes.map((lane, index) => <article className={`stack-foundation-lane stack-foundation-lane-${index + 1}`} key={lane.index}>
                <header><span>{lane.index}</span><div><h4>{lane.label}</h4><p>{lane.note}</p></div><small>{String(lane.items.length).padStart(2, "0")} SKILLS</small></header>
                <div className="stack-foundation-items">{lane.items.map(item => <span key={item}><TechnologyIcon name={item} />{item}</span>)}</div>
              </article>)}
            </div>
            <div className="stack-foundation-foot"><span><i />LANGUAGE TO INFRASTRUCTURE</span><p>Chosen for the problem. Connected as one system.</p></div>
            <div className="stack-human-layer">
              <div className="stack-human-intro"><span>THE HUMAN LAYER</span><h4>How I work<br />with people.</h4><p>Strong software still depends on clear thinking, shared context, and calm execution.</p></div>
              <div className="stack-human-grid">{humanLanes.map(lane => <article key={lane.index}>
                <header><span>{lane.index}</span><div><h5>{lane.label}</h5><p>{lane.note}</p></div></header>
                <ul>{lane.items.map(item => <li key={item}><i />{item}</li>)}</ul>
              </article>)}</div>
            </div>
          </div>

          <div className="about-community" id="volunteering">
            <div className="community-head">
              <div><span>03D / COMMUNITY</span><h4>Knowledge<br />moves forward.</h4></div>
              <div className="community-head-note"><p>Learning became leadership, contests, and mentorship for the next group coming through.</p><span>BENHA · 2022—2024</span></div>
            </div>
            <div className="community-impact-grid">{volunteering.map((entry, index) => <article className={index === 0 ? "community-impact-lead" : index === volunteering.length - 1 ? "community-impact-wide" : "community-impact-side"} key={`${entry.role}-${entry.organization}`}>
              <header><span>0{index + 1} / {entry.category}</span>{entry.period && <time>{entry.period}</time>}</header>
              <div className="community-impact-metric"><strong>{communityMetrics[index]!.value}</strong><small>{communityMetrics[index]!.label}</small></div>
              <div className="community-impact-copy"><span>{entry.role}</span><h5>{entry.organization}</h5><p><FormattedText text={entry.bullets[0]} /></p>{index === 0 && <div className="community-impact-note"><span>WEEKLY CONTESTS</span><span>REGIONAL QUALIFIERS</span><span>MENTORSHIP PIPELINE</span></div>}</div>
              <ul>{entry.tags?.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </article>)}</div>
            <div className="community-pass"><span>TEACH IT</span><i /> <span>BUILD THE SPACE</span><i /> <span>PASS IT ON</span><p>One community. More people ready for the next hard problem.</p></div>
          </div>
        </section>

        <section className="github-section" id="github-activity"><div className="shell section"><SectionHeading number="04" title="A year of building." note="A live record of the last 12 months." /><GitHubActivity username="Mahmoud-Hawara" profile={personal.links.github} /></div></section>

        <section className="section shell contact-section" id="contact">
          <div className="contact-portal">
            <div className="contact-ambient" aria-hidden="true"><i className="contact-ambient-cross" /><i className="contact-ambient-square" /><span className="contact-ambient-bits">01 · 10 · 11</span><span className="contact-ambient-brace">&#123;&nbsp;&#125;</span></div>
            <div className="contact-portal-top">
              <span className="contact-portal-index"><i />05 / OPEN CHANNEL</span>
              <span className="contact-portal-status"><i />{personal.availability}</span>
            </div>

            <div className="contact-portal-grid">
              <div className="contact-portal-copy">
                <span className="contact-portal-kicker">PRODUCTS · SYSTEMS · HARD PROBLEMS</span>
                <h2><span>Make it work.</span><span>Make it <em>last.</em></span></h2>
                <p>I like turning unclear requirements into software people can depend on.</p>
                <div className="contact-signal-map" aria-label="Understand, engineer, and deliver a dependable system">
                  <div className="contact-signal-map-head"><span>PROBLEM / SYSTEM</span><span><i />SIGNAL STABILIZING</span></div>
                  <div className="contact-signal-map-graph" aria-hidden="true">
                    <svg viewBox="0 0 540 82" preserveAspectRatio="none">
                      <path className="contact-signal-base" d="M0 42 C18 4 36 80 56 37 S91 69 116 39 S151 57 185 42 C227 30 266 51 309 42 C370 38 434 42 540 42" />
                      <path className="contact-signal-live" d="M0 42 C18 4 36 80 56 37 S91 69 116 39 S151 57 185 42 C227 30 266 51 309 42 C370 38 434 42 540 42" />
                      <circle cx="56" cy="37" r="3" />
                      <circle cx="309" cy="42" r="3" />
                      <circle cx="510" cy="42" r="3" />
                    </svg>
                    <span>NOISE</span><span>STABLE</span>
                  </div>
                  <div className="contact-signal-steps"><span><i>01</i><strong>UNDERSTAND</strong></span><span><i>02</i><strong>ENGINEER</strong></span><span><i>03</i><strong>DELIVER</strong></span></div>
                </div>
              </div>

              <div className="contact-portal-visual" aria-label="Interactive engineering network">
                <ContactField />
                <a className="contact-portal-core" href={contactMailto} aria-label="Email Mahmoud"><strong>@</strong><small>EMAIL</small></a>
                <a className="contact-orbit-label contact-orbit-label-a" href={personal.links.linkedin} target="_blank" rel="noopener noreferrer"><span>LINKEDIN</span><ArrowUpRight size={10} /></a>
                <a className="contact-orbit-label contact-orbit-label-b" href={personal.links.github} target="_blank" rel="noopener noreferrer"><span>GITHUB</span><ArrowUpRight size={10} /></a>
                <button className="contact-orbit-label contact-orbit-label-c" type="button" onClick={copyEmail}><span>{copied ? "COPIED" : "COPY EMAIL"}</span>{copied ? <Check size={10} /> : <Copy size={10} />}</button>
                <span role="status" className="sr-only">{copied ? "Email copied" : ""}</span>
              </div>
            </div>

          </div>
        </section>
      </main>
      <footer className="site-footer footer-closing shell">
        <div className="footer-closing-main">
          <p className="footer-signoff"><i /><span>© {new Date().getFullYear()}</span><strong>Mahmoud Hawara</strong></p>
          <nav className="footer-socials" aria-label="Social profiles">
            <a href={personal.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><SocialIcon brand="github" className="footer-social-icon" /></a>
            <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><SocialIcon brand="linkedin" className="footer-social-icon" /></a>
            <a href={personal.links.codeforces} target="_blank" rel="noopener noreferrer" aria-label="Codeforces"><svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={siCodeforces.path} fill="currentColor" /></svg></a>
          </nav>
          <a className="text-link" href="#hero">Back to top <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </>
  );
}
