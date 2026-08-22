import { cta, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

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
            <a
              className="btn btn--primary btn--lg"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {cta.final}
            </a>
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
