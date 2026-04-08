import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/formations", "/login", "/register"],
      disallow: ["/dashboard", "/api/"]
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: getAbsoluteUrl("/")
  };
}
