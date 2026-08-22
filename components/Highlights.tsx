import { Figure } from "./Figure";
import { ArrowUpRight } from "./Icons";

const cards = [
  {
    tag: "Quem somos",
    title: "Empresa de pintura residencial e comercial",
    href: "#diferenciais",
    variant: 1 as const,
    tone: "light" as const,
    note: "Equipe em serviço",
    alt: "Equipe da MRS Resolve preparando um ambiente para pintura",
  },
  {
    tag: "Antes e depois",
    title: "Veja o antes e o depois dos ambientes",
    href: "#trabalhos",
    variant: 2 as const,
    tone: "dark" as const,
    note: "Antes / depois",
    alt: "Comparação entre parede antes e depois da pintura",
    accent: true,
  },
  {
    tag: "Onde atendemos",
    title: "Atendimento em Brasília e regiões próximas",
    href: "#areas",
    variant: 3 as const,
    tone: "light" as const,
    note: "Atendimento local",
    alt: "Vista de área residencial atendida em Brasília",
  },
];

export function Highlights() {
  return (
    <section className="section section--tight">
      <div className="shell">
        <ul className="highlights">
          {cards.map((card) => (
            <li key={card.tag}>
              <article className={`hcard${card.accent ? " hcard--accent" : ""}`}>
                <div className="hcard__top">
                  <div>
                    <span className="tag">{card.tag}</span>
                    <h3>{card.title}</h3>
                  </div>
                  <a
                    className="btn-arrow btn-arrow--light"
                    href={card.href}
                    aria-label={`Ver ${card.tag.toLowerCase()}`}
                  >
                    <ArrowUpRight />
                  </a>
                </div>

                <div className="hcard__media">
                  <Figure
                    alt={card.alt}
                    variant={card.variant}
                    tone={card.tone}
                    note={card.note}
                    width={800}
                    height={600}
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
