import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: `Dicas e novidades sobre pintura profissional em ${site.city}, pela ${site.name}.`,
  alternates: { canonical: "/blog" },
};

/** O layout do site já é dinâmico (ver app/(site)/layout.tsx) — segue igual. */
export const dynamic = "force-dynamic";

const formatoData = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="section" id="blog-topo">
      <div className="shell">
        <div className="section-head section-head--center">
          <span className="tag">Blog</span>
          <h1>Pintura profissional: dicas e novidades</h1>
          <p>Conteúdo sobre pintura residencial, comercial e de fachadas em {site.city}.</p>
        </div>

        {posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
            Em breve, novos conteúdos por aqui.
          </p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                {post.capaUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.capaUrl} alt={post.capaAlt ?? ""} className="blog-card__img" />
                ) : (
                  <div className="blog-card__img blog-card__img--placeholder" aria-hidden />
                )}
                <div className="blog-card__body">
                  <span className="blog-card__data">
                    {post.publicadoEm ? formatoData.format(post.publicadoEm) : ""}
                  </span>
                  <h2>{post.titulo}</h2>
                  <p>{post.resumo}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
