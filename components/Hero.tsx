import { cta, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Figure } from "./Figure";
import { ArrowUpRight, WhatsAppIcon } from "./Icons";

const chips = [
  { label: "Residencial", index: "01" },
  { label: "Comercial", index: "02" },
  { label: "Condomínios", index: "03" },
];

export function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="shell">
        <div className="hero__frame">
          <div className="hero__media">
            <Figure
              alt="Ambiente residencial em Brasília com pintura recém-finalizada"
              variant={0}
              priority
              width={1600}
              height={1000}
              note="Foto do hero — trabalho real"
            />
          </div>

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
                href="#orcamento"
                aria-label="Ir para o formulário de orçamento"
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
      </div>
    </section>
  );
}
