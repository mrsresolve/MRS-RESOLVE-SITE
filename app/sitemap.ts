import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";

/** Lê os posts publicados no banco a cada geração — não pode ser estático. */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
