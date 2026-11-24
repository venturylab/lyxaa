import type { Metadata } from "next";
import { en } from "@/content/en";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isSiteIndexable, siteUrl } from "@/lib/indexing";
import "./globals.css";

const indexable = isSiteIndexable();
const base = siteUrl();

export const metadata: Metadata = {
  ...(base ? { metadataBase: base } : {}),
  title: {
    default: "LYXAA",
    template: "%s — LYXAA",
  },
  description: "LYXAA",
  applicationName: "LYXAA",
  robots: indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    siteName: "LYXAA",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#content">
          {en.skip}
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
