import { unstable_cache } from "next/cache";
import { db } from "./db";

/** Chaves editáveis no painel em /admin/tags. */
export const TAG_KEYS = ["gtm", "google_ads", "ga4", "meta_pixel"] as const;
export type TagKey = (typeof TAG_KEYS)[number];

export type TagConfig = Partial<Record<TagKey, string>>;

/**
 * Cacheado e revalidado por tag — o site público não bate no banco a cada
 * visita, mas uma alteração salva em /admin/tags aparece na hora porque a
 * action chama revalidateTag("tag-config") depois de gravar.
 */
export const getTagConfig = unstable_cache(
  async (): Promise<TagConfig> => {
    const rows = await db.tagConfig.findMany({ where: { ativo: true } });
    const config: TagConfig = {};
    for (const row of rows) {
      if (TAG_KEYS.includes(row.chave as TagKey)) {
        config[row.chave as TagKey] = row.valor;
      }
    }
    return config;
  },
  ["tag-config"],
  { tags: ["tag-config"], revalidate: 60 },
);
