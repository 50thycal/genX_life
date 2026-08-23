import { GenXFiles } from "@/components/GenXFiles";

import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Gen X Files: Share Your 70s, 80s and 90s Story",
  description:
    "Everyone who grew up in the 70s, 80s and 90s is carrying a story nobody has asked about in thirty years. Send yours in and Keith and Abby will read it on the show.",
  path: "/gen-x-files",
});


export default function GenXFilesPage() {
  return (
    <>
      <GenXFiles />
    </>
  );
}
