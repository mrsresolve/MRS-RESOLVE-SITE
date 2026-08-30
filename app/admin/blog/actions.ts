"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/blog";

export type PostFormState = { error?: string };

function lerCampos(formData: FormData) {
  return {
    titulo: String(formData.get("titulo") ?? "").trim(),
    resumo: String(formData.get("resumo") ?? "").trim(),
    conteudo: String(formData.get("conteudo") ?? "").trim(),
    capaUrl: String(formData.get("capaUrl") ?? "").trim() || null,
    capaAlt: String(formData.get("capaAlt") ?? "").trim() || null,
    metaTitulo: String(formData.get("metaTitulo") ?? "").trim() || null,
    metaDesc: String(formData.get("metaDesc") ?? "").trim() || null,
    publicar: formData.get("publicar") === "on",
  };
}

export async function createPost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Sessão expirada, entre de novo." };

  const campos = lerCampos(formData);
  if (!campos.titulo || !campos.conteudo) {
    return { error: "Título e conteúdo são obrigatórios." };
  }

  const slugBase = slugify(campos.titulo);
  let slug = slugBase;
  let sufixo = 2;
  while (await db.post.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${sufixo}`;
    sufixo += 1;
  }

  const post = await db.post.create({
    data: {
      slug,
      titulo: campos.titulo,
      resumo: campos.resumo,
      conteudo: campos.conteudo,
      capaUrl: campos.capaUrl,
      capaAlt: campos.capaAlt,
      metaTitulo: campos.metaTitulo,
      metaDesc: campos.metaDesc,
      status: campos.publicar ? "PUBLICADO" : "RASCUNHO",
      publicadoEm: campos.publicar ? new Date() : null,
      autorId: session.user.id,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${post.id}`);
}

export async function updatePost(
  id: string,
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const campos = lerCampos(formData);
  if (!campos.titulo || !campos.conteudo) {
    return { error: "Título e conteúdo são obrigatórios." };
  }

  const atual = await db.post.findUnique({ where: { id } });
  if (!atual) return { error: "Post não encontrado." };

  const jaEstavaPublicado = atual.status === "PUBLICADO";
  const publicarAgora = campos.publicar && !jaEstavaPublicado;

  await db.post.update({
    where: { id },
    data: {
      titulo: campos.titulo,
      resumo: campos.resumo,
      conteudo: campos.conteudo,
      capaUrl: campos.capaUrl,
      capaAlt: campos.capaAlt,
      metaTitulo: campos.metaTitulo,
      metaDesc: campos.metaDesc,
      status: campos.publicar ? "PUBLICADO" : "RASCUNHO",
      publicadoEm: publicarAgora ? new Date() : atual.publicadoEm,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${atual.slug}`);
  revalidatePath("/admin/blog");
  return {};
}

export async function deletePost(id: string) {
  const post = await db.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
}
