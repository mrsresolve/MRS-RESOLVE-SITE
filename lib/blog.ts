import { db } from "./db";

export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getPublishedPosts() {
  return db.post.findMany({
    where: { status: "PUBLICADO" },
    orderBy: { publicadoEm: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return db.post.findFirst({ where: { slug, status: "PUBLICADO" } });
}

export async function getAllPostsForAdmin() {
  return db.post.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getPostById(id: string) {
  return db.post.findUnique({ where: { id } });
}
