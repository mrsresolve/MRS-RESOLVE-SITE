import { cta, site } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { WhatsAppLink } from "./WhatsAppLink";

export function FinalCta() {
  return (
    <section className="section section--tight">
      <div className="shell">
        <div className="final-cta">
          <h2>Precisa pintar?</h2>
          <p>
            Solicite seu orçamento e fale diretamente com a {site.name}.
          </p>
          <div className="actions">
            <WhatsAppLink className="btn btn--primary btn--lg" botao="final_cta">
              <WhatsAppIcon />
              {cta.final}
            </WhatsAppLink>
            <a className="btn btn--ghost btn--lg" href={`tel:${site.phoneTel}`}
               style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
              <PhoneIcon />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
