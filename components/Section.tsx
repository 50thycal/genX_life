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
    <section
      id={id}
      className={`scroll-mt-4 border-t-2 border-ink ${tone === "kraft" ? "bg-kraft/50" : ""}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="label-strip mb-3 text-rec">{eyebrow}</p>
        <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
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
