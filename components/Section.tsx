import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "paper",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "kraft";
}) {
  return (
    <section id={id} className={`scroll-mt-4 ${tone === "kraft" ? "bg-kraft" : ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="label-strip mb-3 inline-block rounded-full border-[3px] border-ink bg-kodak px-4 py-1 text-ink">
          {eyebrow}
        </p>

        <h2 className="font-display text-3xl uppercase leading-[1.02] tracking-tight text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>

        {intro ? (
          <div className="measure mt-5 space-y-4 text-[17px] leading-relaxed text-ink-soft sm:text-lg">
            {intro}
          </div>
        ) : null}

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
