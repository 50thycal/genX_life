"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/youtube";
import { thumbnailFor, watchUrl } from "@/lib/youtube";

/**
 * Hover a card and the video starts playing in place, muted — the same trick
 * their current site and Instagram use. Clicking anywhere still opens YouTube.
 *
 * The player is only mounted for the card being hovered, so the page loads one
 * grid of images rather than eight embeds. Anyone who has asked for reduced
 * motion just gets the still.
 */
export function VideoWall({ videos }: { videos: Video[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [allowPreview, setAllowPreview] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAllowPreview(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  /* A short delay stops every card firing while the pointer crosses the grid. */
  function open(id: string) {
    if (!allowPreview) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActiveId(id), 220);
  }

  function close() {
    if (timer.current) clearTimeout(timer.current);
    setActiveId(null);
  }

  if (videos.length === 0) return null;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {videos.map((video) => {
        const isActive = activeId === video.id;

        return (
          <li key={video.id}>
            <a
              href={watchUrl(video.id)}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`video:${video.id}`}
              className="window group block"
              onMouseEnter={() => open(video.id)}
              onMouseLeave={close}
              onFocus={() => open(video.id)}
              onBlur={close}
            >
              <div className="title-bar">
                <span className="title-bar-text flex-1 truncate">{video.channel}</span>
                <span className="title-bar-button" aria-hidden="true">
                  ▶
                </span>
              </div>

              <div className="bevel-in m-1 p-1">
                <div className="relative aspect-video overflow-hidden bg-shell">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailFor(video.id)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {isActive ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&playsinline=1&modestbranding=1&rel=0`}
                      title={video.title}
                      allow="autoplay; encrypted-media"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      /* pointer-events off so the whole card stays one link */
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 grid place-items-center"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-rec/90 text-lg text-white shadow-lg transition-transform group-hover:scale-110">
                        ▶
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <p className="px-2 pb-1 text-[13px] font-bold leading-snug text-ink line-clamp-2">
                {video.title}
              </p>

              <p className="status-field mx-1 mb-1 truncate">
                {video.published
                  ? new Date(video.published).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Watch on YouTube"}
              </p>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
