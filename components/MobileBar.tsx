import { cta, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** CTA principal sempre acessivel no mobile, conforme o briefing de UX. */
export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a
        className="btn btn--primary"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={17} />
        {cta.primaryShort}
      </a>
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
