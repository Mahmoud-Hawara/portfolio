export const personal = {
  name: "Mahmoud Hawara",
  initials: "MH",
  handle: "mahmoudhawara",
  /** Profile photo at public/avatar.png */
  avatar: "/avatar.png",
  title: "Software Engineer",
  availability: "Open to opportunities",
  tagline:
    "I build backend systems, teach algorithms, and compete at ICPC — and I really enjoy all three.",
  location: "Cairo, Egypt",
  email: "mahmoudhawara115@gmail.com",
  phone: "+201151239658",
  /** Place your CV at public/cv.pdf or use an external URL */
  cv: "/cv.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/mahmoudhawara",
    github: "https://github.com/Mahmoud-Hawara",
    icpc: "https://icpc.global/team/registration/team/team.html?teamid=123456",
    codeforces: "https://codeforces.com/profile/mahmoudhawara",
  },
};

export const profilePanelTitle = "A bit about me";

export const identityPillars = [
  {
    title: "Software Engineering",
    accent: "blue" as const,
    lines: [
      "Software engineer at **noon**.",
      "Ex-**software engineer** at **Microsoft**.",
    ],
  },
  {
    title: "Teaching",
    accent: "amber" as const,
    lines: [
      "Former **teaching assistant** at German University in Cairo.",
      "Ex-**teaching assistant** at Benha National University.",
      "Ex-**problem-solving instructor** at Coach Academy.",
      "**1,000+ students** taught across my journey.",
    ],
  },
  {
    title: "Competitive Programming",
    accent: "green" as const,
    lines: [
      "**3× ICPC** regional finalist.",
      "**2× ECPC** bronze medalist.",
      "Ex-**problem setter** at **Mercor**.",
      "Solved **4,000+** problems on different online judges.",
    ],
  },
];

export type EducationLevel = "university" | "graduate" | "secondary";

export type EducationStatus = "completed" | "cancelled" | "in-progress";

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  level?: EducationLevel;
  status?: EducationStatus;
  /** e.g. "Excellent with Honors · 5th overall (89.13%)" */
  grade?: string;
  /** Optional: public/logos/school.png */
  logo?: string;
  logoClassName?: string;
  highlights: string[];
  tags?: string[];
};

export const educationEntries: EducationEntry[] = [
  {
    school: "German University in Cairo",
    degree: "Master's Degree — Fully Funded Scholarship",
    period: "2025 – 2026",
    location: "Cairo, Egypt",
    level: "graduate",
    status: "cancelled",
    grade: "Fully funded scholarship",
    logo: "/logos/guc.png",
    logoClassName: "bg-white border-border/80",
    highlights: [
      "Awarded a **fully funded Master's scholarship** at GUC (**2025–2026**) after completing engineering at Benha University.",
      "Later cancelled the scholarship to prioritize **hands-on software engineering** and a return to industry.",
      "Focused on building **real-world engineering experience** and scalable software systems instead of continuing the academic path.",
    ],
    tags: ["Fully Funded", "GUC", "Master's", "Cancelled"],
  },
  {
    school: "Benha University",
    degree:
      "Bachelor's Degree in Engineering — Faculty of Engineering, Shoubra",
    period: "Sep 2019 – Jul 2024",
    location: "Shoubra, Egypt",
    level: "university",
    status: "completed",
    grade: "5th in department · GPA 89.13%",
    logo: "/logos/benha-university.png",
    logoClassName: "bg-white border-border/80",
    highlights: [
      "Ranked **5th in the department** with a **GPA of 89.13%**.",
      "Built a strong foundation in **software engineering**, **problem solving**, and **computer science** fundamentals.",
      "Worked on multiple **engineering and software projects** during university.",
      "Active in the **ICPC community** and participated in technical and leadership activities throughout university life.",
      "Graduation project: **Online Judge Platform** — MERN stack training platform with **300+** active users.",
    ],
    tags: ["Engineering", "Shoubra", "ICPC", "Honors"],
  },
  {
    school: "Qalyub Military Secondary School",
    degree: "High School Diploma",
    period: "2016 – 2019",
    location: "Qalyub, Egypt",
    level: "secondary",
    status: "completed",
    grade: "98%",
    highlights: [
      "Graduated in **2019** with a final score of **98%** after three years of secondary school.",
      "Especially passionate about mathematics, physics, and science subjects in general.",
      "Developed a strong analytical mindset and problem-solving skills through scientific and logical thinking.",
    ],
    tags: ["Secondary Education", "Sciences", "98%"],
  },
];

export type VolunteeringEntry = {
  role: string;
  organization: string;
  period: string;
  location?: string;
  /** e.g. "Community leadership" */
  category?: string;
  bullets: string[];
  tags?: string[];
};

export const volunteering: VolunteeringEntry[] = [
  {
    role: "Head & Mentor",
    organization: "ICPC Community — Benha University",
    period: "Head ’22–’23 · Mentor ’22–’24",
    location: "Benha, Egypt",
    category: "Community leadership",
    bullets: [
      "Led preparation for **500+** students in algorithms, data structures, and contest strategy.",
      "Organized structured training sessions, weekly contests, and mentorship for regional qualifiers.",
      "Built the community pipeline that supported Benha teams in **ICPC** and **ECPC** competition seasons.",
      "Coached contest teams on graphs, DP, and greedy patterns ahead of regional **ICPC** qualifiers.",
    ],
    tags: ["ICPC", "Mentorship", "Leadership"],
  },
  {
    role: "Organizer",
    organization: "Ramadan Challenge — Benha University ICPC Community",
    period: "2022 – 2023",
    location: "Benha, Egypt",
    category: "Contest outreach",
    bullets: [
      "Initiated and managed a Ramadan programming challenge with **2,000+** participants.",
      "Designed problem sets, scoring flows, and participant communications across the campaign.",
    ],
    tags: ["Community", "Problem Setting"],
  },
  {
    role: "Technical Support",
    organization: "IEEE Robotics",
    period: "",
    location: "Benha, Egypt",
    category: "Robotics support",
    bullets: [
      "Provided **Technical Support** for **IEEE Robotics** activities.",
    ],
    tags: ["IEEE", "Robotics", "Technical Support"],
  },
  {
    role: "Head",
    organization: "Scientific Committee",
    period: "",
    location: "Benha, Egypt",
    category: "Scientific leadership",
    bullets: [
      "Served as **Head of the Scientific Committee**.",
    ],
    tags: ["Scientific Committee", "Leadership"],
  },
];

export type WorkMode = "Remote" | "On-site" | "Hybrid";

export type LogoVariant = "square" | "wide";

export type ExperiencePhoto = {
  src: string;
  alt: string;
  caption?: string;
  /** Thumbnail crop focal point, e.g. "50% 18%" */
  focus?: string;
};

/** Tenure step at the same company (e.g. full-time converted to part-time) */
export type ExperiencePhase = {
  /** Title during this tenure step (falls back to the entry role) */
  role?: string;
  type: string;
  period: string;
  workMode?: WorkMode;
  note?: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  /** Optional: public/logos/company.svg */
  logo?: string;
  /** Wide wordmarks (e.g. noon) need a wider logo slot */
  logoVariant?: LogoVariant;
  /** Extra classes on the logo container (e.g. brand background) */
  logoClassName?: string;
  workMode: WorkMode;
  type: string;
  /** Optional schedule when the engagement type is Contract. */
  schedule?: "Full-time" | "Part-time";
  period: string;
  /** e.g. "New Cairo, Egypt" or "Remote" */
  location: string;
  /** Workplace photos — add files under public/photos/experience/ */
  photos?: ExperiencePhoto[];
  bullets: string[];
  /** Prior timeline: collapse bullets after the first few (default true) */
  collapsibleBullets?: boolean;
  /** Same-role progression shown as an in-card timeline */
  phases?: ExperiencePhase[];
  tags?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "noon",
    logo: "/logos/noon.svg",
    logoVariant: "wide",
    logoClassName: "bg-[#FEEE00] border-[#e6d800]/60",
    workMode: "Hybrid",
    type: "Full-time",
    period: "Mar 2026 – Present",
    location: "New Cairo, Egypt",
    bullets: [
      "**Dubai Mall app — before launch to production.** Joined before the internal launch and worked with my mentor as a two-person catalog team, handling much of the catalog work as the app took shape.",
      "**Catalog scale and search.** Work across a catalog of around **100,000 products** and approximately **2 million SKUs**, continually improving search and its latency, along with Solr suggestions, autocomplete, and filter keys.",
      "**Brand search — built from scratch.** Added brand search to the existing store and product search experience, reusing the existing **Solr store core** rather than creating a new core.",
      "**Collections — built end to end.** Built collection creation, SKU selection, and CMS integration so partners can display curated assortments in their app storefronts.",
      "**Video uploads.** Built PDB and bulk importer upload workflows supporting up to **20 videos per import**, with source files up to **100 MB** and automatic compression to **20 MB or less** per video.",
      "**Size ordering.** Built a controlled **AI-assisted workflow** to identify sizing systems and order size combinations without a shared size guide, returning failure reasons when ordering cannot be completed reliably.",
      "**Ops review dashboard.** Built a dashboard for combinations, orderings, sizing-system statistics, AI suggestions, failure review, and manual edits. Changes trigger re-indexing of related products so the updated order reaches the app.",
      "**Incremental processing and cost.** Reused saved orderings and added processing for only new products with missing size combinations, avoiding a full catalog rerun when the feature is re-enabled.",
      "**Size normalization.** Currently working on this as a separate feature from size ordering.",
      "**The catalog pipeline.** Worked across Seller Lab imports and exports, stores and brands, shared marketplace product data, quality/content/live checks, catalog publication, and Solr re-indexing.",
      "**Customer-facing services.** Work on catalog services behind **PDP and BLP**, including catalog URIs. My vector search contribution and Elasticsearch exposure were limited.",
    ],
    tags: [
      "FastAPI",
      "Swagger",
      "Temporal",
      "Docker",
      "Kubernetes",
      "GCP",
      "Cloud Spanner",
      "Cloud Storage",
      "Bigtable",
      "Pub/Sub",
      "Transcoder API",
      "Cron jobs",
      "Elasticsearch",
      "Solr",
      "Seller Lab",
      "Catalog",
    ],
    photos: [
      {
        src: "/photos/experience/noon-1.png",
        alt: "Mahmoud Hawara at the workplace in New Cairo",
        caption: "Workplace photo",
        focus: "50% 16%",
      },
    ],
  },
  {
    role: "Teaching Assistant",
    company: "German University in Cairo",
    logo: "/logos/guc.png",
    logoClassName: "bg-white border-border/80",
    workMode: "On-site",
    type: "Full-time → Part-time",
    period: "Sep 2025 – Jul 2026",
    location: "New Cairo, Egypt",
    phases: [
      {
        role: "Teaching Assistant",
        type: "Full-time",
        period: "Sep 2025 – Feb 2026",
        workMode: "On-site",
        note: "6 months full-time",
      },
      {
        role: "Teaching Assistant",
        type: "Part-time",
        period: "Mar 2026 – 10 Jul 2026",
        workMode: "On-site",
        note: "Part-time appointment ended 10 July 2026",
      },
    ],
    bullets: [
      "**Teaching.** Taught Advanced Database and, previously, Data Structures to **100+ undergraduates per course**, delivering lectures and tutorials and supporting coursework.",
      "**Assessment automation.** Built extensive automated test suites for assignment correction, making grading more consistent across submissions.",
      "**Course development.** Helped faculty prepare database course projects and supported their delivery.",
      "**Teaching and scholarship.** Started at GUC as a Teaching Assistant and received a **fully funded Master’s scholarship**.",
      "**Choosing industry.** Later cancelled the scholarship to focus on hands-on software engineering and return to industry. Continued teaching part-time until **10 July 2026**.",
    ],
    tags: ["Advanced Database", "Data Structures", "Teaching", "Automated Testing"],
    photos: [
      {
        src: "/photos/experience/guc-1.png",
        alt: "Mahmoud Hawara at the German University in Cairo",
        caption: "Campus photo",
        focus: "50% 16%",
      },
    ],
  },
  {
    role: "AI Trainer & Reviewer",
    company: "micro1",
    logo: "/logos/micro1-mark.png",
    workMode: "Remote",
    type: "Contract",
    schedule: "Part-time",
    period: "Sep 2025 – Nov 2025",
    location: "",
    bullets: [
      "**Problem design.** Created around **150 very hard algorithmic problems** for AI training, with a focus on challenging problem-solving tasks.",
      "**Solutions and validation.** Wrote solutions and test data for challenging problems, following the same problem-setting workflow as my work at Mercor.",
      "**Review.** Reviewed problem submissions alongside my own AI-training and problem-authoring work.",
    ],
    tags: ["AI Training", "Algorithms", "Problem Design", "Review"],
  },
  {
    role: "Software Engineer",
    company: "Microsoft",
    logo: "/logos/microsoft.svg",
    collapsibleBullets: false,
    workMode: "Remote",
    type: "Contract",
    period: "Mar 2025 – Aug 2025",
    location: "Cairo, Egypt",
    photos: [
      {
        src: "/photos/experience/microsoft.png",
        alt: "Mahmoud Hawara at the Microsoft office",
        caption: "Microsoft office",
        focus: "50% 16%",
      },
    ],
    bullets: [
      "**Benchmark automation.** Automated Microsoft Clarity’s benchmarking pipeline with timer- and queue-triggered **Azure Functions**, replacing manual execution.",
      "**Session validation.** Enhanced Azure Functions used to simulate sessions and validate metrics across **20,000+ test runs**.",
      "**Observability.** Built **Grafana** dashboards with **KQL** queries to track **15+ system metrics** and inspect performance trends.",
      "**Parallel test capacity.** Fixed backend issues that increased capacity from **100 to 1,000 tests per 12-hour window** — a **10× increase**.",
    ],
    tags: [
      "Python",
      "TypeScript",
      "RESTful APIs",
      "Azure Functions",
      "Azure Durable Functions",
      "Azure Storage",
      "Azure Key Vault",
      "Application Insights",
      "KQL",
      "Grafana",
      "Selenium",
      "BrowserStack",
    ],
  },
  {
    role: "Problem Setter",
    company: "Mercor",
    logo: "/logos/mercor.png",
    logoClassName: "bg-white dark:bg-black border-border/80",
    workMode: "Remote",
    type: "Part-time",
    period: "Nov 2024 – Feb 2025",
    location: "",
    bullets: [
      "**Problem design.** Authored **75+ competitive programming problems** to challenge AI problem solving, each backed by **20+ test cases**.",
      "**Solutions and validation.** Wrote detailed solutions and edge-case test data for graph, dynamic programming, and greedy problems.",
      "**Quality review.** Worked with the engineering team to review problem quality and calibrate difficulty before release.",
    ],
    tags: ["C", "C++", "Competitive Programming", "Problem Setting"],
  },
  {
    role: "Problem-Solving Instructor",
    company: "Coach Academy",
    logo: "/logos/coach-academy-clean.png",
    logoClassName: "bg-white border-border/80",
    workMode: "Remote",
    type: "Part-time",
    period: "Jul 2023 – Aug 2024",
    location: "Egypt",
    bullets: [
      "**Training.** Prepared **500+ undergraduates** for ICPC competitions and **100+ graduates** for problem-solving interviews.",
      "**Structured practice.** Delivered sessions on graphs, dynamic programming, and greedy techniques, alongside weekly contests.",
      "**Feedback and mentorship.** Ran mock interviews and contest debriefs to identify gaps and guide students’ next steps.",
    ],
    tags: ["C", "C++", "ICPC", "Training", "Interviews"],
  },
  {
    role: "Teaching Assistant",
    company: "Benha National University",
    logo: "/logos/bnu.png",
    logoClassName: "bg-white border-border/80",
    workMode: "On-site",
    type: "Part-time",
    period: "Sep 2024 – Feb 2025",
    location: "Cairo, Egypt",
    bullets: [
      "**Core teaching.** Taught **200+ undergraduates** in object-oriented programming, algorithms, and MySQL, and supported the university’s ICPC training program.",
      "**Assessment and support.** Led tutorials and office hours, graded assignments, and prepared exam questions with grading rubrics.",
      "**Contest coaching.** Coached teams on problem-solving patterns ahead of regional ICPC qualifiers.",
    ],
    tags: ["C", "C++", "OOP", "Algorithms", "MySQL", "ICPC"],
  },
];

export const projects = [
  {
    title: "Online Judge Platform",
    category: "Developer platform · Graduation project",
    visual: "judge" as const,
    description:
      "MERN platform for ICPC/IOI-style team training with dynamic rankings, real-time collaboration, and personalized recommendations.",
    impact: "300+ active users",
    year: "2024",
    topics: ["MERN", "MongoDB", "Polygon", "ICPC"],
    href: "https://github.com/gradProject",
    proofs: [
      { value: "300+", label: "active users" },
      { value: "40%", label: "faster database" },
      { value: "30%", label: "better suggestions" },
    ],
    highlights: [
      "Led architecture; improved DB performance by 40%; integrated Polygon for auto test cases.",
      "Built similarity-based recommendation engine improving problem suggestions by 30%.",
      "Graduation Project Grade: Excellent.",
    ],
  },
  {
    title: "Automated University Scheduler",
    category: "Operations tool · Adopted by university",
    visual: "scheduler" as const,
    description:
      "Scheduling system adopted by the university to assign study groups and observers based on hall capacity and group size.",
    impact: "2 weeks → 2 minutes",
    year: "2023",
    topics: ["Node.js", "Express", "React"],
    href: "#",
    proofs: [
      { value: "2 weeks", label: "manual baseline" },
      { value: "< 2 min", label: "automated result" },
      { value: "LIVE", label: "university adopted" },
    ],
    highlights: [
      "Reduced manual scheduling from 2 weeks to under 2 minutes in worst-case scenarios.",
    ],
  },
];

export type AchievementPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export type AchievementAccent = "green" | "blue" | "amber" | "neutral";

import type { AchievementIcon } from "@/lib/achievement-icons";

export type { AchievementIcon };

export type AchievementHighlight = {
  id: string;
  label: string;
  value: string;
  accent: AchievementAccent;
  /** Optional tiny line under the label (keep very short) */
  sublabel?: string;
  photos: AchievementPhoto[];
};

/** Quick stats row above achievement cards */
export const achievementHighlights: AchievementHighlight[] = [
  { id: "icpc", label: "ICPC regionals", value: "3×", accent: "green", photos: [] },
  { id: "ecpc", label: "ECPC bronze", value: "2×", accent: "amber", photos: [] },
  { id: "class-rank", label: "Class rank", value: "5th", accent: "neutral", photos: [] },
  {
    id: "final-score",
    label: "Final score",
    value: "89.13%",
    accent: "neutral",
    sublabel: "With honors",
    photos: [],
  },
  {
    id: "codeforces",
    label: "Codeforces",
    value: "Top 3%",
    accent: "blue",
    sublabel: "Globally",
    photos: [],
  },
  {
    id: "problems",
    label: "Problems solved",
    value: "4,000+",
    accent: "blue",
    photos: [],
  },
];

export type Achievement = {
  title: string;
  badge: string;
  period: string;
  /** Opening summary — one professional sentence with optional **bold** emphasis. */
  description: string;
  /** Supporting detail bullets shown on the card. */
  highlights: string[];
  accent: AchievementAccent;
  icon: AchievementIcon;
  photos: AchievementPhoto[];
};

/**
 * Main achievement cards — add photos under public/photos/achievements/.
 * Dummy placeholders below; replace src paths with your real images.
 */
export const achievements: Achievement[] = [
  {
    title: "ICPC Regional Finalist",
    badge: "3×",
    period: "2022 – 2024",
    description:
      "Qualified as a **regional finalist** for three consecutive seasons (2022–2024) at the International Collegiate Programming Contest (ICPC), competing at the highest collegiate level in the region.",
    highlights: [
      "Regional finishes of **26th in 2022**, **28th in 2023**, and **30th in 2024** out of approximately **10,000 teams** per event.",
      "Represented Benha University in team-based contests under strict ICPC rules, time limits, and algorithmic problem sets.",
      "Built long-term contest discipline through preparation, team coordination, and high-pressure implementation.",
    ],
    accent: "green",
    icon: "trophy",
    photos: [],
  },
  {
    title: "ECPC Bronze Medalist",
    badge: "2×",
    period: "2022 & 2024",
    description:
      "Earned **bronze medals** at the Egyptian Collegiate Programming Contest (ECPC), the national championship that selects teams for ICPC regional competition.",
    highlights: [
      "Finished **12th overall in 2022** and **11th overall in 2024**, placing among the top teams in Egypt in both cycles.",
      "Competed in rigorous, team-based contests requiring algorithms, data structures, and production-quality code under time pressure.",
      "Demonstrated consistent national-level performance across separate contest years and team compositions.",
    ],
    accent: "amber",
    icon: "medal",
    photos: [],
  },
  {
    title: "Global Problem Solving",
    badge: "Expert",
    period: "Codeforces & online judges",
    description:
      "Maintains a **top-tier competitive programming profile** on global platforms, including **Expert** on Codeforces (best rank **1863**) alongside sustained practice across thousands of problems.",
    highlights: [
      "**Expert** on Codeforces with a best rank of **1863**; also in the **top 3% worldwide** and **top 1.5% in Egypt**, reflecting long-term contest performance.",
      "Solved **4,000+ problems** across online judges, spanning graphs, dynamic programming, math, and implementation.",
      "Applies the same analytical rigor to teaching, problem-setting at Mercor, and production software engineering.",
    ],
    accent: "blue",
    icon: "code",
    photos: [],
  },
  {
    title: "Excellent with Honors",
    badge: "5th",
    period: "Benha University · 2024",
    description:
      "Graduated with **Excellent with Honors** in Computer Engineering, ranked **5th** in the graduating class with a cumulative score of **89.13%**, earning **Excellent** in every programming- and computer-related course and on the **graduation project**.",
    highlights: [
      "Earned **Excellent** in every programming- and computer-related course — including algorithms, data structures, OOP, databases, and core engineering subjects.",
      "Graduation project graded **Excellent** — an online judge platform for ICPC/IOI-style team training.",
      "Led the ICPC Community and large-scale training programs while sustaining top-class academic standing.",
    ],
    accent: "neutral",
    icon: "graduation",
    photos: [
      {
        src: "/photos/achievements/graduation-1.png",
        alt: "Graduation ceremony — Excellent with Honors",
        caption: "Excellent with Honors · Class of 2024",
      },
      {
        src: "/photos/achievements/graduation-2.png",
        alt: "Graduation day with classmates at Benha University",
        caption: "Benha University · Computer Engineering",
      },
    ],
  },
];

/** Tools grouped by technology — experience section ties these to roles */
export type TechGroup = {
  id: string;
  label: string;
  items: string[];
};

export type TechStackSection = {
  id: string;
  label: string;
  groupIds: string[];
};

export const techStackSections: TechStackSection[] = [
  {
    id: "application",
    label: "Application layer",
    groupIds: ["programming-languages", "backend", "frontend"],
  },
  {
    id: "cloud",
    label: "Cloud & data",
    groupIds: ["gcp", "azure", "data"],
  },
  {
    id: "platform",
    label: "Platform & quality",
    groupIds: ["devops", "qa"],
  },
  {
    id: "core",
    label: "Core engineering",
    groupIds: ["fundamentals"],
  },
  {
    id: "personal",
    label: "Personal & professional",
    groupIds: ["spoken-languages", "communication", "leadership", "workstyle"],
  },
];

export const techStack: TechGroup[] = [
  {
    id: "programming-languages",
    label: "Programming languages",
    items: ["C", "C++", "Python", "TypeScript", "Java", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "spoken-languages",
    label: "Languages",
    items: [
      "Arabic — Native",
      "English — Professional working proficiency",
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: [
      "Spring Boot",
      "FastAPI",
      "Node.js",
      "Express",
      "RESTful APIs",
      "Swagger",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    id: "gcp",
    label: "Google Cloud",
    items: [
      "Cloud Spanner",
      "Bigtable",
      "Pub/Sub",
      "Cloud Storage",
      "Transcoder API",
      "Workers",
      "Cron jobs",
    ],
  },
  {
    id: "azure",
    label: "Microsoft Azure",
    items: [
      "Azure Functions",
      "Azure Durable Functions",
      "Azure Storage",
      "Azure Key Vault",
      "Application Insights",
      "KQL",
    ],
  },
  {
    id: "data",
    label: "Data stores & search",
    items: ["MySQL", "MongoDB", "Elasticsearch", "Solr"],
  },
  {
    id: "devops",
    label: "DevOps & platform",
    items: [
      "Docker",
      "Kubernetes",
      "Temporal",
      "Grafana",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "qa",
    label: "Testing & automation",
    items: ["Unit testing", "Selenium", "BrowserStack"],
  },
  {
    id: "fundamentals",
    label: "Engineering fundamentals",
    items: [
      "Data Structures",
      "Algorithms",
      "OOP",
      "SOLID",
      "Design Patterns",
      "System Design",
    ],
  },
  {
    id: "communication",
    label: "Communication",
    items: [
      "Clear technical communication",
      "Cross-functional collaboration",
      "Mentoring & teaching",
      "Documentation & knowledge sharing",
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    items: [
      "Team leadership",
      "Community building",
      "Stakeholder alignment",
      "Public speaking",
    ],
  },
  {
    id: "workstyle",
    label: "Work style",
    items: [
      "Problem solving",
      "Time management",
      "Adaptability",
      "Attention to detail",
    ],
  },
];

export const navLinks = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Volunteering", href: "#volunteering" },
  { label: "Contact", href: "#contact" },
];

export const heroHighlights = [
  "noon",
  "Microsoft",
  "ICPC Regional Finalist",
  "Teaching Assistant",
];

export const contactOpenTo = [
  "Software engineering opportunities",
  "Backend & systems engineering roles",
  "Teaching assistantships and technical mentoring",
  "ICPC training, problem-setting, and volunteering",
];

export const contactMeta = {
  timezone: "Africa/Cairo (GMT+2)",
  responseTime: "Usually replies within 24–48 hours",
  languages: "English & Arabic",
  preferred: "Email",
  currentRole: "Software Engineer @ noon",
};

export const heroSocials = [
  { label: "GitHub", href: personal.links.github, icon: "github" as const },
  { label: "LinkedIn", href: personal.links.linkedin, icon: "linkedin" as const },
  {
    label: "Codeforces",
    href: personal.links.codeforces,
    icon: "codeforces" as const,
  },
  { label: "Email", href: `mailto:${personal.email}`, icon: "mail" as const },
];

/** Hero terminal stats — complementary to Quick snapshot (no duplicate counts). */
export const stats = [
  {
    id: "codeforces",
    label: "Global percentile on Codeforces",
    value: "Top 3%",
  },
  {
    id: "dept_rank",
    label: "In department · Benha University",
    value: "5th",
  },
  {
    id: "ecpc_best_rank",
    label: "Best ECPC finish",
    value: "11th",
  },
  {
    id: "problems_authored",
    label: "Problems created for Mercor",
    value: "100+",
  },
];
