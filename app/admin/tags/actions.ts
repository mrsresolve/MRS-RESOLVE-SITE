"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { TAG_KEYS, type TagKey } from "@/lib/tags";

export async function saveTags(formData: FormData) {
  for (const chave of TAG_KEYS) {
    const valor = (formData.get(chave) as string | null)?.trim() ?? "";

    if (!valor) {
      await db.tagConfig.updateMany({ where: { chave }, data: { ativo: false } });
      continue;
    }

    await db.tagConfig.upsert({
      where: { chave },
      update: { valor, ativo: true },
      create: { chave, valor, ativo: true },
    });
  }

  revalidateTag("tag-config");
  revalidatePath("/admin/tags");
}

export type { TagKey };
