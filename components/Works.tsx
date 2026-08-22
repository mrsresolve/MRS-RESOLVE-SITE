import { BeforeAfter } from "./BeforeAfter";

/**
 * Placeholders ate a MRS Resolve enviar as fotos reais. Cada item vira uma
 * obra de verdade preenchendo beforeSrc/afterSrc (ver docs/FOTOS.md).
 */
const works = [
  {
    title: "Apartamento na Asa Norte",
    caption: "Pintura interna completa, com correção de paredes e teto.",
    variant: 1 as const,
  },
  {
    title: "Casa no Lago Sul",
    caption: "Áreas internas e externas, incluindo muros.",
    variant: 2 as const,
  },
  {
    title: "Sala comercial no Sudoeste",
    caption: "Renovação do ambiente de trabalho fora do horário comercial.",
    variant: 3 as const,
  },
  {
    title: "Área comum de condomínio",
    caption: "Serviço programado em etapas, com circulação preservada.",
    variant: 4 as const,
  },
];

export function Works() {
  return (
    <section className="section" id="trabalhos">
      <div className="shell">
        <div className="section-head">
          <span className="tag">Trabalhos</span>
          <h2>Trabalhos realizados</h2>
          <p>
            Arraste o controle para comparar o antes e o depois de cada
            ambiente.
          </p>
        </div>

        <div className="works">
          {works.map((work) => (
            <BeforeAfter key={work.title} {...work} />
          ))}
        </div>
      </div>
    </section>
  );
}
