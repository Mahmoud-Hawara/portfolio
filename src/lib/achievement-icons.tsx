import {
  Award,
  Code2,
  GraduationCap,
  ListChecks,
  Medal,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export type AchievementIcon =
  | "trophy"
  | "medal"
  | "code"
  | "graduation"
  | "award"
  | "checks";

export const achievementIcons: Record<AchievementIcon, LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  code: Code2,
  graduation: GraduationCap,
  award: Award,
  checks: ListChecks,
};
