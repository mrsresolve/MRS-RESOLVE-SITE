import { Figure } from "./Figure";
import { ArrowUpRight } from "./Icons";

type Card = {
  tag: string;
  title: string;
  href: string;
  alt: string;
  accent?: boolean;
  /** Foto real; sem ela o Figure desenha o espaço reservado da marca. */
  photo?: string;
  variant?: 0 | 1 | 2 | 3 | 4;
  tone?: "dark" | "light";
  note?: string;
};

const cards: Card[] = [
  {
    tag: "Quem somos",
    title: "Empresa de pintura residencial e comercial",
    href: "#diferenciais",
    variant: 1,
    tone: "light",
    note: "Equipe em serviço",
    alt: "Equipe da MRS Resolve preparando um ambiente para pintura",
  },
  {
    tag: "Trabalhos",
    title: "Veja ambientes já entregues",
    href: "#trabalhos",
    photo: "/fotos/fachada-varanda-residencial.webp",
    alt: "Fachada de casa com varanda coberta pintada pela MRS Resolve",
    accent: true,
  },
  {
    tag: "Onde atendemos",
    title: "Atendimento em Brasília e regiões próximas",
    href: "#areas",
    variant: 3,
    tone: "light",
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
                    src={card.photo}
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
