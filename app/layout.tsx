import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TechCash Academy",
    template: "%s | TechCash Academy"
  },
  description:
    "Catalogue de formations digitales pour vendre des services utiles, signer des clients et structurer une activite rentable."
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
