import { About } from "@/components/About";
import { Channels } from "@/components/Channels";
import { Footer } from "@/components/Footer";
import { GenXFiles } from "@/components/GenXFiles";
import { Hero } from "@/components/Hero";
import { Podcast } from "@/components/Podcast";
import { Shop } from "@/components/Shop";
import { Tapes } from "@/components/Tapes";
import { getShow } from "@/lib/podcast";

// Re-checks the podcast feed hourly. Nothing here needs updating by hand.
export const revalidate = 3600;

export default async function Home() {
  const show = await getShow();

  return (
    <>
      <Hero />
      <main id="main">
        <Channels />
        <GenXFiles />
        <Podcast show={show} />
        <Shop />
        <Tapes />
        <About />
      </main>
      <Footer />
    </>
  );
}
