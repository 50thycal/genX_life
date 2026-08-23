import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Keith & Abby",
  description:
    "Two 80s kids in Andover, Kansas who never quite got over it. How one podcast turned into three channels and a workshop full of half-restored dolls.",
  path: "/about",
});


export default function AboutPage() {
  return (
    <>
      <About />
      <Contact />
    </>
  );
}
