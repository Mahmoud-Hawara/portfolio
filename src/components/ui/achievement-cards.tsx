"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { AchievementPhotoList } from "@/components/ui/achievement-photo-list";
import { AchievementPhotosDialog } from "@/components/ui/achievement-photos-dialog";
import { FormattedText } from "@/components/ui/formatted-text";
import type { Achievement } from "@/data/portfolio";
import {
  achievementAccentBorder,
  achievementAccentValue,
} from "@/lib/achievement-accents";
import { achievementIcons } from "@/lib/achievement-icons";
import { cn } from "@/lib/utils";

type GalleryState = {
  achievement: Achievement;
  index: number;
} | null;

type AchievementCardsProps = {
  items: Achievement[];
};

export function AchievementCards({ items }: AchievementCardsProps) {
  const [gallery, setGallery] = useState<GalleryState>(null);

  const openGallery = (achievement: Achievement, index = 0) => {
    setGallery({ achievement, index });
  };

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2">
        {items.map((item, i) => {
          const Icon = achievementIcons[item.icon];
          const hasPhotos = item.photos.length > 0;

          return (
            <FadeIn
              key={item.title}
              delay={0.1 + i * 0.06}
              className="contents"
            >
              <li
                className={cn(
                  "card-hover flex h-full flex-col rounded-2xl border border-border/70 border-l-[3px] bg-card/85 p-5 shadow-sm md:p-6",
                  achievementAccentBorder[item.accent]
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl border border-border/70 bg-surface shadow-sm",
                      achievementAccentValue[item.accent]
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xl font-semibold tracking-tight",
                      achievementAccentValue[item.accent]
                    )}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="label-soft mt-1">
                  {item.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-gh">
                  <FormattedText text={item.description} />
                </p>
                {item.highlights.length > 0 ? (
                  <ul className="mt-3 flex-1 space-y-2 border-t border-border/60 pt-3">
                    {item.highlights.map((point) => (
                      <li
                        key={point.slice(0, 48)}
                        className="flex gap-2 text-[13px] leading-relaxed text-muted-gh"
                      >
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                          aria-hidden
                        />
                        <span>
                          <FormattedText text={point} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex-1" />
                )}

                {hasPhotos ? (
                  <AchievementPhotoList
                    photos={item.photos}
                    onOpen={(index) => openGallery(item, index)}
                  />
                ) : null}
              </li>
            </FadeIn>
          );
        })}
      </ul>

      <AchievementPhotosDialog
        open={gallery !== null}
        title={gallery?.achievement.title ?? ""}
        subtitle={gallery?.achievement.period}
        photos={gallery?.achievement.photos ?? []}
        initialIndex={gallery?.index ?? 0}
        onClose={() => setGallery(null)}
      />
    </>
  );
}
