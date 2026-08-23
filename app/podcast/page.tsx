import { JsonLd } from "@/components/JsonLd";
import { Podcast } from "@/components/Podcast";
import { podcastSchema } from "@/lib/schema";
import { getShow } from "@/lib/podcast";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Podcast: 80s Nostalgia with Keith & Abby",
  description:
    "Listen to episodes right here, or subscribe on Spotify, Apple Podcasts, YouTube Music, Audible or Podbean.",
  path: "/podcast",
});


// The feed drives the title and the episode list, so a rename lands here too.
export const revalidate = 3600;

export default async function PodcastPage() {
  const show = await getShow();

  return (
    <>
      <JsonLd
        data={podcastSchema(
          show?.title ?? "Our Gen X Life Podcast",
          show?.description ??
            "Keith and Abby on the decade you grew up in.",
        )}
      />
      <Podcast show={show} />
    </>
  );
}
