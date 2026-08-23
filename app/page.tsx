import { Hero } from "@/components/Hero";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Gen X Life: 70s, 80s and 90s Nostalgia with Keith & Abby",
  description:
    "Keith and Abby rescue the toys, tapes and television everyone else threw out. Three YouTube channels, a podcast, restored vintage, and the Gen X Files.",
  path: "/",
});


export default function WelcomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
