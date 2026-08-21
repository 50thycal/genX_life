"use client";

import { useEffect, useState } from "react";

/**
 * The taskbar clock. Windows 95 showed the time in the tray and it's half of
 * what made the taskbar feel switched on.
 *
 * Renders empty on the server: the server's clock and the visitor's clock
 * disagree, and React would flag the mismatch on hydration.
 */
export function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="status-field hidden shrink-0 tabular-nums sm:block" suppressHydrationWarning>
      {now ?? " "}
    </span>
  );
}
