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
          className="group flex flex-col border-t-2 border-ink pt-6"
        >
          <span className="label-strip mb-4 block text-rec">
            One of each — when it&apos;s gone, it&apos;s gone
          </span>

          <h3 className="font-display text-3xl font-black leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
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
          className="group flex flex-col border-t border-rule-firm pt-6"
        >
          <span className="label-strip mb-4 text-ink-faint">Shirts, mugs, the usual</span>

          <h3 className="font-display text-2xl font-bold leading-tight text-balance">
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
