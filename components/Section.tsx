import type { ReactNode } from "react";

/** Section numbers are real information here — they match the contents bar. */
const NUMBERS: Record<string, string> = {
  channels: "01",
  genxfiles: "02",
  podcast: "03",
  shop: "04",
  tapes: "05",
  about: "06",
};

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
      className={`scroll-mt-4 border-t border-rule-firm ${tone === "kraft" ? "bg-kraft" : ""}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[auto_1fr]">
          <p
            aria-hidden="true"
            className="font-display text-5xl font-black leading-none text-rec lg:text-6xl"
          >
            {NUMBERS[id] ?? "—"}
          </p>

          <div>
            <p className="label-strip mb-3 text-ink-faint">{eyebrow}</p>
            <h2 className="font-display text-3xl font-black leading-[1.03] tracking-[-0.02em] text-balance sm:text-4xl md:text-[2.9rem]">
              {title}
            </h2>
            {intro ? (
              <div className="measure mt-5 space-y-4 text-[18px] leading-[1.7] text-ink-soft">
                {intro}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
