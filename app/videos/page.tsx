import { Videos } from "@/components/Videos";
import { FALLBACK_VIDEOS } from "@/lib/media";
import { getLatestVideos } from "@/lib/youtube";

// Re-reads the channel feeds hourly, so posting to YouTube is all it takes.
export const revalidate = 3600;

export default async function VideosPage() {
  const latest = await getLatestVideos(8);
  const videos = latest.length > 0 ? latest : FALLBACK_VIDEOS;

  return (
    <>
      <Videos videos={videos} />
    </>
  );
}
