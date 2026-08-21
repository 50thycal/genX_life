import type { Video } from "@/lib/youtube";
import { Section } from "./Section";
import { VideoWall } from "./VideoWall";

export function Videos({ videos }: { videos: Video[] }) {
  return (
    <Section
      id="videos"
      eyebrow="Now playing"
      title="Latest from the channels"
    >
      <VideoWall videos={videos} />
    </Section>
  );
}
