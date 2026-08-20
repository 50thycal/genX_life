import type { Photo } from "@/lib/media";
import { photoUrl } from "@/lib/media";

/**
 * A photo in the window chrome — sunken frame, optional title bar and caption.
 * Renders nothing when the slot is empty, so every photo on the page is
 * optional and the layout holds without it.
 */
export function Framed({
  photo,
  title,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  photo: Photo | null | undefined;
  /** Text for the little title bar. Omit for a bare frame. */
  title?: string;
  aspect?: string;
  className?: string;
}) {
  if (!photo) return null;

  return (
    <figure className={`window ${className}`}>
      {title ? (
        <div className="title-bar">
          <span className="title-bar-text flex-1 truncate">{title}</span>
        </div>
      ) : null}

      <div className="bevel-in m-1 p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl(photo)}
          alt={photo.alt}
          loading="lazy"
          className={`block w-full object-cover ${aspect}`}
        />
      </div>

      {photo.caption ? (
        <figcaption className="px-2 pb-2 text-[13px] leading-snug text-ink-soft">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
