import { Channels } from "@/components/Channels";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Three YouTube Channels",
  description:
    "Nostalgia from the 70s, 80s and 90s, hand-restored estate-sale toys, and rescued VHS tapes. Here is what each of Keith and Abby's channels is for.",
  path: "/channels",
});


export default function ChannelsPage() {
  return (
    <>
      <Channels />
    </>
  );
}
