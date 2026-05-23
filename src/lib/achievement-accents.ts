export type AchievementAccent = "green" | "blue" | "amber" | "neutral";

export const achievementAccentValue: Record<AchievementAccent, string> = {
  green: "text-primary",
  blue: "text-gh-link",
  amber: "text-gh-award",
  neutral: "text-fg",
};

export const achievementAccentBar: Record<AchievementAccent, string> = {
  green: "bg-primary",
  blue: "bg-gh-link",
  amber: "bg-gh-award",
  neutral: "bg-border",
};

export const achievementAccentHover: Record<AchievementAccent, string> = {
  green: "hover:bg-primary/5",
  blue: "hover:bg-gh-link/5",
  amber: "hover:bg-gh-award/8",
  neutral: "hover:bg-muted/50",
};

export const achievementAccentBorder: Record<AchievementAccent, string> = {
  green: "border-l-primary",
  blue: "border-l-gh-link",
  amber: "border-l-gh-award",
  neutral: "border-l-border",
};
