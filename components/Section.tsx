import type { ReactNode } from "react";

/**
 * A heading block inside a window. The window chrome itself now comes from
 * AppWindow, since each page is a single window.
 */
export function Section({
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "kraft";
}) {
  const hasHeading = Boolean(title || intro);

  return (
    <>
      {hasHeading ? (
        <div className="mb-7">
          {eyebrow ? <p className="label-strip mb-2 text-rec-deep">{eyebrow}</p> : null}
          {title ? (
            <h2 className="font-display text-2xl leading-tight text-balance sm:text-3xl">
              {title}
            </h2>
          ) : null}
          {intro ? (
            <div className="measure mt-4 space-y-3 text-[15px] leading-relaxed">
              {intro}
            </div>
          ) : null}
        </div>
      ) : null}

      {children}
    </>
  );
}
