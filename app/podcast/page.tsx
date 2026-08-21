import { Podcast } from "@/components/Podcast";
import { getShow } from "@/lib/podcast";

// The feed drives the title and the episode list, so a rename lands here too.
export const revalidate = 3600;

export default async function PodcastPage() {
  const show = await getShow();

  return (
    <>
      <Podcast show={show} />
    </>
  );
}
