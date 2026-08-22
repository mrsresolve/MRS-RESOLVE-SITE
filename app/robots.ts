import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Necessario com output: "export" — a rota e gerada em build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
