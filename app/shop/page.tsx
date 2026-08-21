import { AppWindow } from "@/components/AppWindow";
import { Shop } from "@/components/Shop";
import { getListings } from "@/lib/etsy";
import { pageFor } from "@/lib/pages";

export const revalidate = 1800;

export default async function ShopPage() {
  const listings = await getListings(4);

  return (
    <AppWindow title={pageFor("/shop").title}>
      <Shop listings={listings} />
    </AppWindow>
  );
}
