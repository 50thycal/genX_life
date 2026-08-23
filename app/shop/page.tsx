import { Shop } from "@/components/Shop";
import { getListings } from "@/lib/etsy";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shop: Restored Vintage Toys and Gen X Merch",
  description:
    "Abby's hand-restored estate-sale dolls and toys on Etsy, plus Our Gen X Life shirts, mugs and more.",
  path: "/shop",
});


export const revalidate = 1800;

export default async function ShopPage() {
  const listings = await getListings(4);

  return (
    <>
      <Shop listings={listings} />
    </>
  );
}
