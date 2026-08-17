/**
 * Live listings from Abby's Etsy shop.
 *
 * Etsy's old shop-mini widget is gone and the third-party embed services are
 * paid, inject their own scripts and can't be styled — so this talks to Etsy's
 * v3 API directly and renders in our own markup.
 *
 * Public shop data only needs an app key (no OAuth dance): register a free app
 * at etsy.com/developers, then set ETSY_API_KEY. Without it every call here
 * returns null and the shop section falls back to its written pitch.
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

export async function getListings(limit = 4): Promise<Listing[] | null> {
  const key = process.env.ETSY_API_KEY;
  if (!key) return null;

  const headers = { "x-api-key": key };

  try {
    const shopResponse = await fetch(
      `${API}/shops?shop_name=${encodeURIComponent(SHOP_NAME)}`,
      { headers, next: { revalidate: 1800 } },
    );
    if (!shopResponse.ok) return null;

    const shopData = await shopResponse.json();
    const shopId = shopData?.results?.[0]?.shop_id;
    if (!shopId) return null;

    const listingsResponse = await fetch(
      `${API}/shops/${shopId}/listings/active?limit=${limit}&includes=Images`,
      { headers, next: { revalidate: 1800 } },
    );
    if (!listingsResponse.ok) return null;

    const listingsData = await listingsResponse.json();
    const results: EtsyListing[] = listingsData?.results ?? [];

    return results.map((listing) => ({
      id: listing.listing_id,
      title: listing.title,
      url: listing.url,
      price: formatPrice(listing.price),
      image: listing.images?.[0]?.url_570xN ?? listing.images?.[0]?.url_fullxfull ?? null,
    }));
  } catch {
    return null;
  }
}
