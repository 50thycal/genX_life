import type { Video } from "@/lib/youtube";
import { Section } from "./Section";
import { VideoWall } from "./VideoWall";

export function Videos({ videos }: { videos: Video[] }) {
  return (
    <Section
      id="videos"
      eyebrow="Now playing"
      title="Latest from the channels"
      intro={
        <p>
          Hover any of these and it&apos;ll start playing right here. Click to open it
          properly on YouTube. This list looks after itself — whatever Keith and Abby post
          shows up on its own.
        </p>
      }
    >
      <VideoWall videos={videos} />
    </Section>
  );
}
