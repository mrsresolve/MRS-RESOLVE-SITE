import { areas, services, site } from "@/lib/site";

/**
 * Bloco de contexto local. Existe para dar ao Google e ao visitante a
 * relacao explicita entre servicos e regioes, sem repeticao artificial de
 * palavra-chave. Cada link ja aponta para as rotas locais planejadas em
 * docs/03_SEO/SEO-LOCAL.md — habilitar quando as paginas existirem.
 */
export function LocalSeo() {
  return (
    <section className="section section--tight local-seo" aria-labelledby="seo-local">
      <div className="shell">
        <h2 id="seo-local">
          Empresa de pintura em {site.city}
        </h2>
        <p>
          A {site.name} faz {services[0].title.toLowerCase()} e{" "}
          {services[3].title.toLowerCase()} em {site.city}, atendendo casas,
          apartamentos, lojas, escritórios e áreas comuns de condomínios. O
          serviço inclui a preparação da superfície, a proteção do ambiente e a
          conferência do acabamento.
        </p>
        <p>
          Regiões com atendimento prioritário: {areas.join(", ")}.
        </p>
      </div>
    </section>
  );
}
