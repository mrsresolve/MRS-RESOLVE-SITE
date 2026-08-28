import { cta, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { HeroVideo } from "./HeroVideo";
import { ArrowUpRight, WhatsAppIcon } from "./Icons";

const chips = [
  { label: "Residencial", index: "01" },
  { label: "Comercial", index: "02" },
  { label: "Condomínios", index: "03" },
];

export function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__media">
        <HeroVideo />
      </div>
      <div className="hero__overlay" aria-hidden />

      <div className="shell hero__inner">
        <div className="hero__body">
          <p className="hero__eyebrow">{site.name}</p>

          <h1>Pintura profissional em Brasília</h1>

          <p className="hero__lede">
            Orçamento rápido para casas, apartamentos, empresas e condomínios.
          </p>

          <div className="cta-pair">
            <a
              className="btn btn--primary btn--lg"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta.primary}
            </a>
            <a
              className="btn-arrow"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
            >
              <ArrowUpRight />
            </a>
          </div>

          <p className="hero__support">
            <WhatsAppIcon size={16} />
            Atendimento rápido pelo WhatsApp.
          </p>
        </div>

        <ul className="hero__strip">
          {chips.map((chip) => (
            <li key={chip.label}>
              <a className="hero__chip" href="#servicos">
                <span>{chip.label}</span>
                <span aria-hidden>{chip.index}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
