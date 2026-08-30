import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { site } from "@/lib/site";
import { getPostBySlug } from "@/lib/blog";

/** O layout do site já é dinâmico (ver app/(site)/layout.tsx) — segue igual. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const titulo = post.metaTitulo || post.titulo;
  const descricao = post.metaDesc || post.resumo;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: titulo,
      description: descricao,
      images: post.capaUrl ? [{ url: post.capaUrl }] : undefined,
    },
  };
}

const formatoData = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked.parse(post.conteudo);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    image: post.capaUrl ? [post.capaUrl] : undefined,
    datePublished: post.publicadoEm?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="section">
      <div className="shell shell--narrow">
        <div className="section-head">
          <span className="tag">Blog</span>
          <h1>{post.titulo}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
            {post.publicadoEm ? formatoData.format(post.publicadoEm) : ""}
          </p>
        </div>

        {post.capaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.capaUrl} alt={post.capaAlt ?? ""} className="article__cover" />
        ) : null}

        <div className="article" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
