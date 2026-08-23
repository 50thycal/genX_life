"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SHOP, SOCIALS, CONTACT } from "@/lib/links";
import { PAGES } from "@/lib/pages";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Runs the minimise animation, then routes. Shared with the desktop icons. */
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

/** A flyout row, the way Programs and Documents worked in the real thing. */
function Flyout({
  label,
  glyph,
  children,
}: {
  label: string;
  glyph: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 px-3 py-2 text-left text-[14px] font-medium hover:bg-tape hover:text-white"
      >
        <span aria-hidden="true" className="w-5 text-center text-[15px]">
          {glyph}
        </span>
        <span className="flex-1">{label}</span>
        <span aria-hidden="true" className="text-[10px]">
          ▶
        </span>
      </button>

      {open ? (
        <ul className="bevel-out absolute left-full top-0 z-10 ml-0.5 min-w-[190px] py-1 sm:ml-1">
          {children}
        </ul>
      ) : null}
    </li>
  );
}

function ExternalItem({
  href,
  label,
  glyph,
  track,
}: {
  href: string;
  label: string;
  glyph: string;
  track: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-track={track}
        className="flex items-center gap-3 px-3 py-2 text-[14px] font-medium hover:bg-tape hover:text-white"
      >
        <span aria-hidden="true" className="w-5 text-center text-[15px]">
          {glyph}
        </span>
        {label}
      </a>
    </li>
  );
}

const SOCIAL_GLYPHS: Record<string, string> = {
  Instagram: "📷",
  Facebook: "👍",
  Pinterest: "📌",
  YouTube: "▶️",
};

export function StartMenu({ open, onClose, onNavigate }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Click away or press Escape, the way a real menu dismisses.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="bevel-out absolute bottom-full left-0 z-30 mb-1 flex w-[290px] max-w-[calc(100vw-1.5rem)] p-1"
    >
      {/* The vertical banner down the left edge. */}
      <div
        aria-hidden="true"
        className="w-8 shrink-0"
        style={{
          background: "linear-gradient(180deg,#45d9e8 0%,#9b5de5 50%,#ff3d8b 100%)",
        }}
      >
        <p className="font-display whitespace-nowrap text-[15px] uppercase tracking-wide text-white/95 [writing-mode:vertical-rl] [transform:rotate(180deg)] pb-2 pl-1.5">
          Our Gen X Life
        </p>
      </div>

      <ul className="min-w-0 flex-1 py-1">
        {PAGES.filter((page) => page.href !== "/").map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              onClick={(event) => {
                onClose();
                onNavigate(event, page.href);
              }}
              className="flex items-center gap-3 px-3 py-2 text-[14px] font-medium hover:bg-tape hover:text-white"
            >
              <span aria-hidden="true" className="w-5 text-center text-[15px]">
                {page.glyph}
              </span>
              {page.label}
            </Link>
          </li>
        ))}

        <li aria-hidden="true" className="my-1 border-t border-rule/60" />

        <Flyout label="Follow Us" glyph="🌐">
          {SOCIALS.map((social) => (
            <ExternalItem
              key={social.href}
              href={social.href}
              label={social.name}
              glyph={SOCIAL_GLYPHS[social.name] ?? "🔗"}
              track={`social:${social.name}`}
            />
          ))}
        </Flyout>

        <Flyout label="Shops" glyph="🛒">
          <ExternalItem
            href={SHOP.etsy.href}
            label="Abby's Etsy Store"
            glyph="🧸"
            track="shop:etsy"
          />
          <ExternalItem
            href={SHOP.spreadshop.href}
            label="Gen X Life Merch"
            glyph="👕"
            track="shop:spreadshop"
          />
        </Flyout>

        <li aria-hidden="true" className="my-1 border-t border-rule/60" />

        <li>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-3 px-3 py-2 text-[14px] font-medium hover:bg-tape hover:text-white"
          >
            <span aria-hidden="true" className="w-5 text-center text-[15px]">
              ✉️
            </span>
            Email Us...
          </a>
        </li>

        <li>
          <Link
            href="/"
            onClick={(event) => {
              onClose();
              onNavigate(event, "/");
            }}
            className="flex items-center gap-3 px-3 py-2 text-[14px] font-medium hover:bg-tape hover:text-white"
          >
            <span aria-hidden="true" className="w-5 text-center text-[15px]">
              🖥️
            </span>
            Back to Desktop
          </Link>
        </li>
      </ul>
    </div>
  );
}
