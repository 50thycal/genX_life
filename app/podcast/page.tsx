import { AppWindow } from "@/components/AppWindow";
import { Podcast } from "@/components/Podcast";
import { pageFor } from "@/lib/pages";
import { getShow } from "@/lib/podcast";

// The feed drives the title and the episode list, so a rename lands here too.
export const revalidate = 3600;

export default async function PodcastPage() {
  const show = await getShow();

  return (
    <AppWindow title={pageFor("/podcast").title}>
      <Podcast show={show} />
    </AppWindow>
  );
}
