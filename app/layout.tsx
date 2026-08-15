import type { Metadata } from "next";
import { Archivo_Black, Zilla_Slab, Courier_Prime } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Zilla_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const label = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-label focus:text-[12px] focus:uppercase focus:tracking-widest focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
