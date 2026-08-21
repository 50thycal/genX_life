import { SHOP } from "@/lib/links";
import type { Listing } from "@/lib/etsy";
import { BENCH_PHOTO } from "@/lib/media";
import { Framed } from "./Framed";
import { Section } from "./Section";

/**
 * Two different businesses, deliberately not merged into one "Store" link.
 * Etsy is one-of-a-kind and sells on scarcity; Spreadshop is unlimited stock
 * and sells on identity. Giving them equal weight would flatten both.
 */

export function Shop({ listings }: { listings: Listing[] | null }) {
  return (
    <Section
      id="shop"
      eyebrow="The shop"
      title="Take something home"
      intro={<p>Check out our Etsy shop and merch!</p>}
    >
      {/* Just rescued: the scarcity play, live from Etsy */}
      {listings && listings.length > 0 ? (
        <div className="mb-6">
          <p className="label-strip mb-3 text-rec-deep">Just rescued</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((listing) => (
              <li key={listing.id}>
                <a
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track={`etsy:${listing.id}`}
                  className="window block"
                >
                  {listing.image ? (
                    <div className="bevel-in m-1 p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={listing.image}
                        alt={listing.title}
                        loading="lazy"
                        className="block aspect-square w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <p className="line-clamp-2 px-2 pt-1 text-[13px] font-bold leading-snug">
                    {listing.title}
                  </p>
                  <p className="status-field m-1 mt-1.5">{listing.price ?? "View"}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Framed
        photo={BENCH_PHOTO}
        title="the-bench.jpg"
        aspect="aspect-[16/9]"
        className="mb-6 max-w-2xl"
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <a
          href={SHOP.etsy.href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="shop:etsy"
          className="card-surface group flex flex-col p-6"
        >
          <span className="label-strip bevel-in mb-4 inline-flex w-fit px-2 py-1 text-rec-deep">
            Abby&apos;s Etsy Store
          </span>

          <h3 className="font-display text-xl leading-tight text-balance">
            Abby&apos;s Retro Rescue
          </h3>

          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
            The dolls and toys Abby finds at estate sales, cleaned up, re-rooted and
            restored by hand. Every piece is the only one of its kind, and most of them
            appear on the channel before they appear in the shop.
          </p>

          <span className="label-strip mt-5 inline-flex items-center gap-2 text-rec-deep">
            See what&apos;s available
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </a>

        <a
          href={SHOP.spreadshop.href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="shop:spreadshop"
          className="card-surface group flex flex-col p-6"
        >
          <span className="label-strip bevel-in mb-4 inline-flex w-fit px-2 py-1 text-tape">
            Gen X Life Merch
          </span>

          <h3 className="font-display text-xl leading-tight text-balance">
            Wear the brand
          </h3>

          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
            For anyone who spots another Gen Xer across a parking lot and wants them to
            know. Printed to order, so nothing sells out.
          </p>

          <span className="label-strip mt-5 inline-flex items-center gap-2 text-tape">
            Browse the merch
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </a>
      </div>
    </Section>
  );
}
