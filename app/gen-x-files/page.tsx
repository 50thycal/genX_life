import { AppWindow } from "@/components/AppWindow";
import { GenXFiles } from "@/components/GenXFiles";
import { pageFor } from "@/lib/pages";

export default function GenXFilesPage() {
  return (
    <AppWindow title={pageFor("/gen-x-files").title}>
      <GenXFiles />
    </AppWindow>
  );
}
