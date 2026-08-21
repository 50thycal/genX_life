import type { ReactNode } from "react";

/**
 * One page, dressed as a window. The title bar carries the page name and the
 * usual three buttons, which are decorative: closing a window you're looking
 * at would leave nothing behind.
 */
export function AppWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="window">
      <div className="title-bar">
        <span className="title-bar-text flex-1 truncate">{title}</span>
        <div className="flex shrink-0 gap-0.5" aria-hidden="true">
          <span className="title-bar-button">_</span>
          <span className="title-bar-button">□</span>
          <span className="title-bar-button">✕</span>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-7 sm:py-8">{children}</div>
    </div>
  );
}
