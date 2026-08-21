import { AppWindow } from "@/components/AppWindow";
import { Videos } from "@/components/Videos";
import { FALLBACK_VIDEOS } from "@/lib/media";
import { pageFor } from "@/lib/pages";
import { getLatestVideos } from "@/lib/youtube";

// Re-reads the channel feeds hourly, so posting to YouTube is all it takes.
export const revalidate = 3600;

export default async function VideosPage() {
  const latest = await getLatestVideos(8);
  const videos = latest.length > 0 ? latest : FALLBACK_VIDEOS;

  return (
    <AppWindow title={pageFor("/videos").title}>
      <Videos videos={videos} />
    </AppWindow>
  );
}
