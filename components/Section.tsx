import type { ReactNode } from "react";

/** Every section is a window on the desktop. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "kraft";
}) {
  return (
    <section id={id} className="scroll-mt-4 px-3 pb-6 sm:px-6">
      <div className="mx-auto w-full max-w-6xl window">
        <div className="title-bar">
          <span className="title-bar-text flex-1 truncate">
            {eyebrow} — {title}
          </span>
          <div className="flex shrink-0 gap-0.5" aria-hidden="true">
            <span className="title-bar-button">_</span>
            <span className="title-bar-button">□</span>
            <span className="title-bar-button">✕</span>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-7 sm:py-8">
          <h2 className="font-display text-2xl leading-tight text-balance sm:text-3xl">
            {title}
          </h2>

          {intro ? (
            <div className="measure mt-4 space-y-3 text-[15px] leading-relaxed">
              {intro}
            </div>
          ) : null}

          <div className="mt-7">{children}</div>
        </div>

        <div className="flex gap-1 px-1 pb-1">
          <p className="status-field flex-1">{eyebrow}</p>
          <p className="status-field w-32 shrink-0">ourgenxlife.com</p>
        </div>
      </div>
    </section>
  );
}
