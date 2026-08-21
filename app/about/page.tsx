import { About } from "@/components/About";
import { AppWindow } from "@/components/AppWindow";
import { Contact } from "@/components/Contact";
import { pageFor } from "@/lib/pages";

export default function AboutPage() {
  return (
    <AppWindow title={pageFor("/about").title}>
      <About />
      <Contact />
    </AppWindow>
  );
}
