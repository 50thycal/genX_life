import { AppWindow } from "@/components/AppWindow";
import { Hero } from "@/components/Hero";
import { pageFor } from "@/lib/pages";

export default function WelcomePage() {
  return (
    <AppWindow title={pageFor("/").title}>
      <Hero />
    </AppWindow>
  );
}
