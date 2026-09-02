import { cta, site } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { WhatsAppLink } from "./WhatsAppLink";

/** CTA principal sempre acessivel no mobile, conforme o briefing de UX. */
export function MobileBar() {
  return (
    <div className="mobile-bar">
      <WhatsAppLink className="btn btn--primary" botao="mobile_bar">
        <WhatsAppIcon size={17} />
        {cta.primaryShort}
      </WhatsAppLink>
      <a
        className="btn btn--ghost"
        href={`tel:${site.phoneTel}`}
        aria-label={`Ligar para ${site.phoneDisplay}`}
        style={{ flex: "none", width: 52, padding: 0 }}
      >
        <PhoneIcon size={18} />
      </a>
    </div>
  );
}
