/**
 * Live listings from Abby's Etsy shop.
 *
 * Etsy's old shop-mini widget is gone and the third-party embed services are
 * paid, inject their own scripts and can't be styled — so this talks to Etsy's
 * v3 API directly and renders in our own markup.
 *
 * Public shop data needs an app credential but no OAuth dance. Register a free
 * app at etsy.com/developers, then set both ETSY_API_KEY (the keystring) and
 * ETSY_SHARED_SECRET. Without them every call here returns null and the shop
 * section falls back to its written pitch.
 */

export type Listing = {
  id: number;
  title: string;
  url: string;
  price: string | null;
  image: string | null;
};

const API = "https://openapi.etsy.com/v3/application";
const SHOP_NAME = "AbbysRetroRescue";

type EtsyImage = { url_570xN?: string; url_fullxfull?: string };
type EtsyListing = {
  listing_id: number;
  title: string;
  url: string;
  price?: { amount: number; divisor: number; currency_code: string };
  images?: EtsyImage[];
};

function formatPrice(price: EtsyListing["price"]): string | null {
  if (!price || !price.divisor) return null;
  const value = price.amount / price.divisor;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency_code || "USD",
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

/**
 * The x-api-key header wants "keystring:shared_secret", not the keystring on
 * its own. Etsy started rejecting the bare keystring with a 403 on 9 February
 * 2026, and the two halves are stored as separate environment variables so
 * nobody has to hand-assemble the string and get the punctuation right.
 *
 * A keystring that already carries the colon is passed through untouched, so
 * the combined form keeps working if it is ever set that way.
 */
function credential(): string | null {
  const keystring = process.env.ETSY_API_KEY?.trim();
  if (!keystring) return null;
  if (keystring.includes(":")) return keystring;

  const secret = process.env.ETSY_SHARED_SECRET?.trim();
  if (!secret) {
    console.error(
      "[etsy] ETSY_API_KEY is set but ETSY_SHARED_SECRET is not; Etsy rejects " +
        "the keystring on its own with a 403",
    );
    return null;
  }

  return `${keystring}:${secret}`;
}

/**
 * Failures here are deliberately loud in the server log and silent on the page.
 *
 * A visitor should never see a broken shop section, but when the strip stays
 * empty we need to know whether Etsy rejected the credential, refused the
 * endpoint without OAuth, or simply found no shop by that name.
 */
async function call(url: string, key: string, label: string) {
  const response = await fetch(url, {
    headers: { "x-api-key": key },
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(
      `[etsy] ${label} failed: ${response.status} ${response.statusText} ${body.slice(0, 300)}`,
    );
    return null;
  }

  return response.json().catch((error) => {
    console.error(`[etsy] ${label} returned unreadable JSON`, error);
    return null;
  });
}

export async function getListings(limit = 4): Promise<Listing[] | null> {
  const key = credential();
  if (!key) return null;

  try {
    const shopData = await call(
      `${API}/shops?shop_name=${encodeURIComponent(SHOP_NAME)}`,
      key,
      "shop lookup",
    );
    if (!shopData) return null;

    const shopId = shopData?.results?.[0]?.shop_id;
    if (!shopId) {
      console.error(`[etsy] no shop found named ${SHOP_NAME}`);
      return null;
    }

    const listingsData = await call(
      `${API}/shops/${shopId}/listings/active?limit=${limit}&includes=Images`,
      key,
      "active listings",
    );
    if (!listingsData) return null;

    const results: EtsyListing[] = listingsData?.results ?? [];
    console.info(`[etsy] ${results.length} listing(s) for shop ${shopId}`);

    return results.map((listing) => ({
      id: listing.listing_id,
      title: listing.title,
      url: listing.url,
      price: formatPrice(listing.price),
      image: listing.images?.[0]?.url_570xN ?? listing.images?.[0]?.url_fullxfull ?? null,
    }));
  } catch (error) {
    console.error("[etsy] request threw", error);
    return null;
  }
}
