import type { Metadata } from "next";
import "./globals.css";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "TechCash Academy",
    template: "%s | TechCash Academy"
  },
  metadataBase: new URL(siteConfig.siteUrl),
  description:
    "Catalogue de formations digitales pour vendre des services utiles, signer des clients et structurer une activite rentable.",
  applicationName: siteConfig.brand,
  keywords: [
    "formation digitale",
    "freelance informatique",
    "landing pages",
    "sites web clients",
    "applications mobiles",
    "outils PME",
    "formation business digital"
  ],
  alternates: {
    canonical: getAbsoluteUrl("/")
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: getAbsoluteUrl("/"),
    title: siteConfig.brand,
    description: siteConfig.description,
    siteName: siteConfig.brand
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand,
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
