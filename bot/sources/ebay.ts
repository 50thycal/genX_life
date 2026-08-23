/**
 * eBay Browse API — active listings, not sold comps.
 *
 * This is the honest half of a source that can't give the whole answer. eBay
 * shut off the free sold-listings endpoint in February 2025, and the official
 * replacement (Marketplace Insights) is gated to business-tier approval that
 * independent developers don't get. What's left free is Browse: what people
 * are *asking* right now, and how many are listed.
 *
 * That's not a valuation. But rising asking prices against a shrinking listing
 * count is a real supply-tightening signal on its own — collectors chasing a
 * pattern and finding fewer of them for sale is worth knowing about even
 * without a sold price attached. The report says exactly this rather than
 * implying more than the data supports; a real number still means Terapeak.
 *
 * App-level OAuth only — no seller account, no user login, just a client
 * credentials grant. Free, 5,000 calls/day, no manual review.
 */

import { EBAY } from "../config";
import type { Signal, Term } from "../types";

const TOKEN_URL = "https://api.ebay.com/identity/v1/oauth2/token";
const SEARCH_URL = "https://api.ebay.com/buy/browse/v1/item_summary/search";

async function getToken(): Promise<string | null> {
  const id = process.env.EBAY_CLIENT_ID;
  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!id || !secret) return null;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
  });

  if (!response.ok) throw new Error(`eBay auth ${response.status}`);
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

type SearchResponse = {
  total?: number;
  itemSummaries?: Array<{ price?: { value?: string; currency?: string } }>;
};

async function search(token: string, term: string): Promise<SearchResponse> {
  const url = new URL(SEARCH_URL);
  url.searchParams.set("q", term);
  url.searchParams.set("limit", String(EBAY.limit));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-EBAY-C-MARKETPLACE-ID": EBAY.marketplace,
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error(`eBay search ${response.status} for "${term}"`);
  return (await response.json()) as SearchResponse;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export async function collectEbay(
  terms: Term[],
): Promise<{ signals: Signal[]; available: boolean }> {
  const token = await getToken();
  if (!token) {
    console.warn("  ebay: no credentials — skipping (see bot/README.md)");
    return { signals: [], available: false };
  }

  // Only terms Abby could physically find at a sale — a search for a saying
  // or a TV block ("MTV VJs") isn't a listing category, it's noise.
  const objectTerms = terms.filter((t) => t.object === true);
  const signals: Signal[] = [];

  for (const term of objectTerms) {
    try {
      const result = await search(token, term.term);
      const prices = (result.itemSummaries ?? [])
        .map((item) => Number(item.price?.value))
        .filter((value) => Number.isFinite(value) && value > 0);

      const total = result.total ?? result.itemSummaries?.length ?? 0;
      if (total < EBAY.minListings || prices.length === 0) continue;

      const askingPrice = median(prices);

      // `ratio`/`z` are filled in by score.ts against history, same as
      // YouTube and Reddit — this collector only ever sees the present.
      signals.push({
        term: term.term,
        source: "ebay",
        level: askingPrice,
        ratio: 1,
        z: 0,
        detail: { listingCount: total, sampleSize: prices.length },
      });
      signals.push({
        term: term.term,
        source: "ebay-listings",
        level: total,
        ratio: 1,
        z: 0,
      });
    } catch (error) {
      console.warn(`  ebay: ${term.term} — ${(error as Error).message}`);
    }
  }

  console.log(`  ebay: ${objectTerms.length} object terms searched, ${signals.length / 2} priced`);
  return { signals, available: true };
}
