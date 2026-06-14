import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/formations", "/mentions-legales", "/politique-confidentialite", "/conditions-utilisation"],
      disallow: ["/dashboard", "/admin", "/api/", "/checkout", "/cancel", "/success", "/auth/", "/login", "/register"]
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: getAbsoluteUrl("/")
  };
}
