import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { PageTransition } from "@/components/ui/PageTransition";
import { DevLogin } from "@/components/dev-login";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "TechCash Academy",
    template: "%s | TechCash Academy"
  },
  metadataBase: new URL(siteConfig.siteUrl),
  description:
    "Catalogue de formations digitales pour vendre des services utiles, signer des clients et structurer une activité rentable.",
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
    siteName: siteConfig.brand,
    images: [
      {
        url: getAbsoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "TechCash Academy — Formations digitales"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand,
    description: siteConfig.description,
    images: [getAbsoluteUrl("/og-image.png")]
  }
};

const educationalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "TechCash Academy",
  url: siteConfig.siteUrl,
  description:
    "École en ligne — formations web, mobile, IA, entrepreneuriat digital",
  creator: {
    "@type": "Organization",
    name: "KAH Digital",
    url: "https://kah-digital.ch"
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
        <Script
          id="educational-org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
        <PageTransition>{children}</PageTransition>
        {process.env.NEXT_PUBLIC_DEV_LOGIN === "true" && <DevLogin />}
      </body>
    </html>
  );
}
