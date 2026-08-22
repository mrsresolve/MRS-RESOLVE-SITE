import { areas, cta, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowUpRight, PinIcon } from "./Icons";

export function Areas() {
  return (
    <section className="section section--warm" id="areas">
      <div className="shell areas-layout">
        <div className="section-head">
          <span className="tag">
            <PinIcon size={13} />
            Áreas atendidas
          </span>
          <h2>Pintura em Brasília e região</h2>
          <p>
            Atendimento prioritário nas regiões abaixo. Se a sua não estiver na
            lista, consulte a disponibilidade.
          </p>
          <div className="cta-pair">
            <a
              className="btn btn--navy"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta.areas}
            </a>
            <a
              className="btn-arrow"
              href="#orcamento"
              aria-label="Ir para o formulário de orçamento"
            >
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <ul className="areas-list" aria-label={`Regiões atendidas em ${site.city}`}>
          {areas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
