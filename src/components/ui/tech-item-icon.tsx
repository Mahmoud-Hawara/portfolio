"use client";

import {
  BookOpen,
  Box,
  Boxes,
  CalendarClock,
  Cloud,
  Code2,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  LayoutGrid,
  Lightbulb,
  MessageCircle,
  Mic,
  Monitor,
  RefreshCw,
  ScanSearch,
  Server,
  ShoppingBag,
  Store,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getTechItemBrandIcon } from "@/lib/tech-item-icons";
import { cn } from "@/lib/utils";

const lucideByItem: Record<string, LucideIcon> = {
  BrowserStack: Monitor,
  "Cron jobs": CalendarClock,
  "Cron Jobs": CalendarClock,
  "Azure Functions": Cloud,
  "Azure Durable Functions": Cloud,
  "Azure Storage": Cloud,
  "Azure Key Vault": Cloud,
  "Application Insights": Cloud,
  KQL: Cloud,
  "Seller Lab": Store,
  Catalog: LayoutGrid,
  "Arabic — Native": Globe,
  "English — Professional working proficiency": Globe,
  "Clear technical communication": MessageCircle,
  "Cross-functional collaboration": Users,
  "Mentoring & teaching": GraduationCap,
  "Documentation & knowledge sharing": FileText,
  "Team leadership": Users,
  "Community building": Users,
  "Stakeholder alignment": Target,
  "Public speaking": Mic,
  "Problem solving": Lightbulb,
  "Time management": CalendarClock,
  Adaptability: RefreshCw,
  "Attention to detail": ScanSearch,
  "Data Structures": GitBranch,
  Algorithms: GitBranch,
  OOP: Box,
  SOLID: Boxes,
  "Design Patterns": LayoutGrid,
  "System Design": Server,
  ICPC: Trophy,
  Training: BookOpen,
  Teaching: GraduationCap,
  Research: Lightbulb,
  "Competitive Programming": Trophy,
  "Problem Setting": FileText,
  Interviews: Users,
  Mentorship: Users,
  Leadership: Users,
  Community: Users,
  Honors: Trophy,
  Engineering: Server,
  Shoubra: GraduationCap,
  GUC: GraduationCap,
  "Fully Funded": ShoppingBag,
  "Master's": GraduationCap,
  Cancelled: RefreshCw,
  "Secondary Education": BookOpen,
  Sciences: Lightbulb,
  "98%": Trophy,
};

const azureItems = new Set([
  "Azure Functions",
  "Azure Durable Functions",
  "Azure Storage",
  "Azure Key Vault",
  "Application Insights",
  "KQL",
]);

const googleCloudLucideItems = new Set(["Cron jobs", "Cron Jobs"]);

type TechItemIconProps = {
  name: string;
  className?: string;
};

export function TechItemIcon({ name, className }: TechItemIconProps) {
  const brand = getTechItemBrandIcon(name);
  const sizeClass = cn("size-3.5 shrink-0", className);

  if (brand) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        aria-label={brand.title}
        className={sizeClass}
        style={{ color: `#${brand.hex}` }}
      >
        <path d={brand.path} fill="currentColor" />
      </svg>
    );
  }

  const Lucide = lucideByItem[name];
  if (Lucide) {
    return (
      <Lucide
        className={cn(
          sizeClass,
          azureItems.has(name) && "text-[#0078D4]",
          googleCloudLucideItems.has(name) && "text-[#4285F4]",
          !azureItems.has(name) &&
            !googleCloudLucideItems.has(name) &&
            "text-muted-gh"
        )}
        aria-hidden
      />
    );
  }

  return <Code2 className={cn(sizeClass, "text-muted-gh/80")} aria-hidden />;
}
