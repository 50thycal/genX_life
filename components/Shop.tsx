import { SHOP } from "@/lib/links";
import { Section } from "./Section";

/**
 * Two different businesses, deliberately not merged into one "Store" link.
 * Etsy is one-of-a-kind and sells on scarcity; Spreadshop is unlimited stock
 * and sells on identity. Giving them equal weight would flatten both.
 */
export function Shop() {
  return (
    <Section
      id="shop"
      eyebrow="The shop"
      title="Take something home"
      intro={
        <p>
          Two very different things live here, so they get two different shelves.
        </p>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <a
          href={SHOP.etsy.href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="shop:etsy"
          className="card-surface group flex flex-col p-8 transition-transform hover:-translate-y-1"
        >
          <span className="label-strip mb-4 inline-flex w-fit items-center gap-2 border border-rec px-2 py-1 text-rec">
            One of each — when it&apos;s gone, it&apos;s gone
          </span>

          <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-balance sm:text-3xl">
            Abby&apos;s Retro Rescue
          </h3>

          <p className="measure mt-4 flex-1 text-[16.5px] leading-relaxed text-ink-soft">
            The dolls and toys Abby finds at estate sales, cleaned up, re-rooted and
            restored by hand. Every piece is the only one of its kind, and most of them
            appear on the channel before they appear in the shop.
          </p>

          <span className="label-strip mt-8 inline-flex items-center gap-2 text-rec">
            See what&apos;s available
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </a>

        <a
          href={SHOP.spreadshop.href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="shop:spreadshop"
          className="group flex flex-col border-2 border-ink bg-kraft/60 p-8 transition-transform hover:-translate-y-1"
        >
          <span className="label-strip mb-4 text-ink-faint">Shirts, mugs, the usual</span>

          <h3 className="font-display text-xl uppercase leading-tight tracking-tight text-balance sm:text-2xl">
            Wear the brand
          </h3>

          <p className="measure mt-4 flex-1 text-[16.5px] leading-relaxed text-ink-soft">
            For anyone who spots another Gen Xer across a parking lot and wants them to
            know. Printed to order, so nothing sells out.
          </p>

          <span className="label-strip mt-8 inline-flex items-center gap-2 text-tape">
            Browse the merch
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </a>
      </div>
    </Section>
  );
}
