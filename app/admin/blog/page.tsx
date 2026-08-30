import Link from "next/link";
import { AdminHeader } from "@/components/admin/Header";
import { getAllPostsForAdmin } from "@/lib/blog";
import { deletePost } from "./actions";
import { PlusIcon } from "@/components/admin/Icons";

const formatoData = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

export default async function BlogListPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <>
      <AdminHeader title="Blog">
        <Link href="/admin/blog/novo" className="admin-btn admin-btn--primary">
          <PlusIcon size={15} />
          Novo post
        </Link>
      </AdminHeader>

      <div className="admin__content">
        <div className="admin-panel">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Status</th>
                  <th>Atualizado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.titulo}</td>
                    <td>
                      <span className={`badge ${post.status === "PUBLICADO" ? "badge--fechado" : "badge--novo"}`}>
                        {post.status === "PUBLICADO" ? "Publicado" : "Rascunho"}
                      </span>
                    </td>
                    <td>{formatoData.format(post.updatedAt)}</td>
                    <td style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/blog/${post.id}`} className="admin-btn admin-btn--ghost">
                        Editar
                      </Link>
                      <form action={deletePost.bind(null, post.id)}>
                        <button type="submit" className="admin-btn admin-btn--danger">
                          Excluir
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "var(--admin-text-muted)" }}>
                      Nenhum post ainda.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
