import type { Metadata } from "next";
import { Archivo_Black, VT323 } from "next/font/google";
import { Desktop } from "@/components/Desktop";
import "./globals.css";

// Matches the blocky poster letters in the channel banner.
const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// The DOS box only. Interface chrome uses Tahoma, already on the machine.
const terminal = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ourgenxlife.com"),
  title: "Our Gen X Life: 70s, 80s and 90s nostalgia with Keith & Abby",
  description:
    "Three YouTube channels, a podcast, restored vintage toys and a growing archive of Gen X stories sent in by the people who lived them.",
  openGraph: {
    title: "Our Gen X Life",
    description:
      "70s, 80s and 90s nostalgia with Keith and Abby. Videos, a podcast, rescued vintage, and the Gen X Files.",
    url: "https://www.ourgenxlife.com",
    siteName: "Our Gen X Life",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${terminal.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-kodak focus:px-4 focus:py-2 focus:text-[13px] focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <Desktop>{children}</Desktop>
      </body>
    </html>
  );
}
