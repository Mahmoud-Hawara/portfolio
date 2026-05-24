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
      "**Teaching assistant** at German University in Cairo.",
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
      "Started the Master's journey before choosing to transition fully toward **software engineering** and industry-focused career growth.",
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
    role: "Head",
    organization: "ICPC Community — Benha University",
    period: "Sep 2022 – Sep 2023",
    location: "Benha, Egypt",
    category: "Community leadership",
    bullets: [
      "Led preparation for **500+** students in algorithms, data structures, and contest strategy.",
      "Organized structured training sessions, weekly contests, and mentorship for regional qualifiers.",
      "Built the community pipeline that supported Benha teams in **ICPC** and **ECPC** competition seasons.",
    ],
    tags: ["ICPC", "Training", "Leadership"],
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
    role: "Mentor",
    organization: "University ICPC Training Program",
    period: "2022 – 2024",
    location: "Benha, Egypt",
    category: "Peer mentorship",
    bullets: [
      "Coached contest teams on graphs, DP, and greedy patterns ahead of regional **ICPC** qualifiers.",
      "Supported lab sessions and practice sets for the university competitive programming track.",
    ],
    tags: ["ICPC", "Mentorship"],
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
      "Software Engineer at **noon**, contributing to large-scale e-commerce — **Dubai Mall** shopping experiences and catalog-related services.",
      "Part of the **March '26 backend cohort** at noon.",
      "Work across **Catalog**, **Search**, **Indexing**, and **Commercial** systems.",
      "Enhance search performance and optimize indexing pipelines.",
      "Contribute to **Seller Lab** and internal tooling — implemented the **Video Upload** feature.",
      "Resolve bugs in Search and Indexing; improve catalog synchronization and indexing reliability.",
      "Set up staging environments for **Seller Lab** and customer-facing catalog applications.",
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
    period: "Sep 2025 – Present",
    location: "New Cairo, Egypt",
    phases: [
      {
        role: "Teaching & Research Assistant",
        type: "Full-time",
        period: "Sep 2025 – Feb 2026",
        workMode: "On-site",
        note: "6 months full-time",
      },
      {
        role: "Teaching Assistant",
        type: "Part-time",
        period: "Mar 2026 – Present",
        workMode: "On-site",
        note: "Converted to part-time",
      },
    ],
    bullets: [
      "Currently teach **Advanced Database** to **100+** undergraduate students through lectures, tutorials, and coursework.",
      "Previously taught **Data Structures** to **100+** undergraduates.",
      "Help faculty prepare course projects and support delivery for database coursework.",
      "Automate assignment corrections by implementing extensive **automated test** suites for consistent grading.",
      "Support faculty research — literature reviews, experiments, and academic documentation.",
    ],
    tags: ["Advanced Database", "Data Structures", "Teaching", "Automated Testing", "Research"],
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
      "Enhanced **Azure Functions** for **Microsoft Clarity**, simulating sessions and validating metrics for **20,000+** test runs.",
      "Automated the benchmarking pipeline using timer- and queue-triggered **Azure Functions**, reducing manual work by **100%**.",
      "Built **KQL** dashboards in **Grafana** to monitor **15+** system metrics and visualize performance trends.",
      "Fixed high-impact backend issues enabling a **10×** increase in parallel testing capacity (**100 → 1000** tests per 12-hour window).",
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
    location: "San Francisco, California · United States",
    bullets: [
      "Created **75+** competitive programming problems with **20+** test cases each to improve **AI** problem-solving capabilities.",
      "Authored detailed solutions and edge-case test data for **graph, DP, and greedy** problem families.",
      "Reviewed problem quality and difficulty calibration with the engineering team before release.",
    ],
    tags: ["C", "C++", "Competitive Programming", "Problem Setting"],
  },
  {
    role: "Problem-Solving Instructor",
    company: "Coach Academy",
    logo: "/logos/coach-academy.png",
    logoClassName: "bg-white dark:bg-black border-border/80",
    workMode: "Remote",
    type: "Part-time",
    period: "Jul 2023 – Aug 2024",
    location: "Remote · Egypt",
    bullets: [
      "Trained **500+** undergraduates for **ICPC** competitions and **100+** graduates for problem-solving interviews.",
      "Delivered structured sessions on **graphs, dynamic programming, and greedy** techniques with weekly contests.",
      "Mentored students through mock interviews and contest debriefs to close skill gaps quickly.",
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
      "Taught **200+** undergraduate students in **OOP, Algorithms, and MySQL**; supported the university **ICPC** training program.",
      "Ran tutorials and office hours, graded assignments, and prepared exam questions with rubrics.",
      "Coached contest teams on problem-solving patterns ahead of regional **ICPC** qualifiers.",
    ],
    tags: ["C", "C++", "OOP", "Algorithms", "MySQL", "ICPC"],
  },
];

export const projects = [
  {
    title: "Online Judge Platform",
    description:
      "MERN platform for ICPC/IOI-style team training with dynamic rankings, real-time collaboration, and personalized recommendations.",
    impact: "300+ active users",
    year: "2024",
    topics: ["MERN", "MongoDB", "Polygon", "ICPC"],
    href: "https://github.com/gradProject",
    highlights: [
      "Led architecture; improved DB performance by 40%; integrated Polygon for auto test cases.",
      "Built similarity-based recommendation engine improving problem suggestions by 30%.",
      "Graduation Project Grade: Excellent.",
    ],
  },
  {
    title: "Automated University Scheduler",
    description:
      "Scheduling system adopted by the university to assign study groups and observers based on hall capacity and group size.",
    impact: "2 weeks → 2 minutes",
    year: "2023",
    topics: ["Node.js", "Express", "React"],
    href: "#",
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
    photos: [
      {
        src: "/photos/achievements/icpc-1.jpg",
        alt: "ICPC regional finals — team at contest venue",
        caption: "ICPC Regional Finals · 2024 · 30th place",
      },
      {
        src: "/photos/achievements/icpc-2.jpg",
        alt: "ICPC regional finals — awards stage",
        caption: "ICPC Regional Finals · 2023 · 28th place",
      },
    ],
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
    photos: [
      {
        src: "/photos/achievements/ecpc-1.jpg",
        alt: "ECPC bronze medal — Egyptian Collegiate Programming Contest 2022",
        caption: "ECPC Bronze · 12th place · 2022",
      },
      {
        src: "/photos/achievements/ecpc-2.jpg",
        alt: "ECPC bronze medal — Egyptian Collegiate Programming Contest 2024",
        caption: "ECPC Bronze · 11th place · 2024",
      },
    ],
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
    photos: [
      {
        src: "/photos/achievements/codeforces-1.jpg",
        alt: "On-site competitive programming contest",
        caption: "Codeforces · Expert · 1863 peak",
      },
      {
        src: "/photos/achievements/codeforces-2.jpg",
        alt: "Focused problem-solving and training session",
        caption: "Training & practice",
      },
    ],
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
        src: "/photos/achievements/graduation-1.jpg",
        alt: "Graduation ceremony — Excellent with Honors",
        caption: "Excellent with Honors · Class of 2024",
      },
      {
        src: "/photos/achievements/graduation-2.jpg",
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
  currentRole: "Software Engineer @ noon · Teaching Assistant @ GUC",
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
