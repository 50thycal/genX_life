import type { Metadata } from "next";
import { Archivo_Black, Nunito_Sans, Fredoka } from "next/font/google";
import "./globals.css";

// Archivo Black matches the blocky poster letters in the channel banner.
const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Friendly and open at size — this audience is reading on phones at arm's length.
const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// The rounded voice from Abby's channel art, used for small labels.
const label = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ourgenxlife.com"),
  title: "Our Gen X Life — 70s, 80s and 90s nostalgia with Keith & Abby",
  description:
    "Three YouTube channels, a podcast, restored vintage toys and a growing archive of Gen X stories sent in by the people who lived them.",
  openGraph: {
    title: "Our Gen X Life",
    description:
      "70s, 80s and 90s nostalgia with Keith & Abby. Videos, a podcast, rescued vintage, and the Gen X Files.",
    url: "https://www.ourgenxlife.com",
    siteName: "Our Gen X Life",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border-[3px] focus:border-ink focus:bg-kodak focus:px-5 focus:py-2 focus:font-label focus:text-[13px] focus:font-bold focus:uppercase focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
