import { Shop } from "@/components/Shop";
import { getListings } from "@/lib/etsy";

export const revalidate = 1800;

export default async function ShopPage() {
  const listings = await getListings(4);

  return (
    <>
      <Shop listings={listings} />
    </>
  );
}
