import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Necessario com output: "export" — a rota e gerada em build.
export const dynamic = "force-static";

/**
 * Hoje o site tem apenas a home. Ao criar as paginas locais e de servico
 * (docs/03_SEO/SEO-LOCAL.md), adicione cada rota nesta lista.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
