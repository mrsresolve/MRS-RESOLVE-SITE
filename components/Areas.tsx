import { areas, cta, site } from "@/lib/site";
import { ArrowUpRight, PinIcon } from "./Icons";
import { WhatsAppLink } from "./WhatsAppLink";

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
            <WhatsAppLink className="btn btn--navy" botao="areas_primary">
              {cta.areas}
            </WhatsAppLink>
            <WhatsAppLink className="btn-arrow" botao="areas_secondary" aria-label="Falar no WhatsApp">
              <ArrowUpRight />
            </WhatsAppLink>
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
