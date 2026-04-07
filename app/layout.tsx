import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechCash Academy",
  description: "Deviens technicien informatique freelance en 30 jours, meme sans diplome."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
