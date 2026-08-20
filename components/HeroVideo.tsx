"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroVideoSlot } from "@/lib/media";

/**
 * The channel intro, sitting in the hero where the DOS box used to be —
 * dressed as a media player window so it still belongs on the desktop.
 *
 * Autoplays muted and loops, because browsers block autoplay with sound and a
 * silent loop is what reads as an intro. The speaker button turns sound on for
 * anyone who wants it. If the visitor has asked for reduced motion it doesn't
 * autoplay at all — they get the poster frame and normal controls.
 */
export function HeroVideo({ video }: { video: HeroVideoSlot }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  function toggleSound() {
    const element = ref.current;
    if (!element) return;
    const next = !muted;
    element.muted = next;
    setMuted(next);
    if (!next) void element.play().catch(() => {});
  }

  return (
    <div className="window">
      <div className="title-bar">
        <span className="title-bar-text flex-1 truncate">{video.file} — Media Player</span>
        <div className="flex shrink-0 gap-0.5" aria-hidden="true">
          <span className="title-bar-button">_</span>
          <span className="title-bar-button">□</span>
          <span className="title-bar-button">✕</span>
        </div>
      </div>

      <div className="bevel-in m-1 p-1">
        <video
          ref={ref}
          className="block w-full bg-shell"
          poster={video.poster ? `/video/${video.poster}` : undefined}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          controls={reduceMotion}
          aria-label={video.alt}
        >
          <source src={`/video/${video.file}`} type="video/mp4" />
          {/* Anyone whose browser won't play it still gets the point. */}
          {video.alt}
        </video>
      </div>

      {!reduceMotion ? (
        <div className="flex gap-1 px-1 pb-1">
          {/* No button on a file with no audio track — it would do nothing. */}
          {video.silent ? null : (
            <button type="button" onClick={toggleSound} className="btn-95 !min-w-0 !py-1">
              {muted ? "🔇 Sound on" : "🔊 Sound off"}
            </button>
          )}
          <p className="status-field flex-1 truncate">Now playing — the intro</p>
        </div>
      ) : null}
    </div>
  );
}
