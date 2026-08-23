import { Videos } from "@/components/Videos";
import { FALLBACK_VIDEOS } from "@/lib/media";
import { getLatestVideos } from "@/lib/youtube";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Latest Videos from Our Gen X Life",
  description:
    "The newest uploads from all three channels: Our Gen X Life, Abby's Retro Rescue and Your Life On Tape. Hover any video to preview it.",
  path: "/videos",
});


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
