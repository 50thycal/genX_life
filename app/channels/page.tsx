import { AppWindow } from "@/components/AppWindow";
import { Channels } from "@/components/Channels";
import { pageFor } from "@/lib/pages";

export default function ChannelsPage() {
  return (
    <AppWindow title={pageFor("/channels").title}>
      <Channels />
    </AppWindow>
  );
}
