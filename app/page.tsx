import { About } from "@/components/About";
import { Channels } from "@/components/Channels";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { GenXFiles } from "@/components/GenXFiles";
import { Hero } from "@/components/Hero";
import { Podcast } from "@/components/Podcast";
import { Shop } from "@/components/Shop";
import { Tapes } from "@/components/Tapes";
import { Videos } from "@/components/Videos";
import { getListings } from "@/lib/etsy";
import { FALLBACK_VIDEOS } from "@/lib/media";
import { getShow } from "@/lib/podcast";
import { getLatestVideos } from "@/lib/youtube";

// Everything on this page refreshes itself hourly. Nothing needs hand-editing.
export const revalidate = 3600;

export default async function Home() {
  const [show, latestVideos, listings] = await Promise.all([
    getShow(),
    getLatestVideos(8),
    getListings(4),
  ]);

  const videos = latestVideos.length > 0 ? latestVideos : FALLBACK_VIDEOS;

  return (
    <>
      <Hero />
      <main id="main">
        <Videos videos={videos} />
        <Channels />
        <GenXFiles />
        <Podcast show={show} />
        <Shop listings={listings} />
        <Gallery />
        <Tapes />
        <About />
      </main>
      <Footer />
    </>
  );
}
