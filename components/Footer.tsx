import { areas, nav, services, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/mrs-resolve-logo-horizontal.png"
              alt={`${site.name} — ${site.tagline}`}
              width={600}
              height={99}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "8px 12px",
              }}
            />
            <p>
              {site.tagline} em {site.city}. Casas, apartamentos, empresas e
              condomínios.
            </p>
          </div>

          <div>
            <h3>Navegação</h3>
            <ul className="footer__links">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href="#orcamento">Orçamento</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contato</h3>
            <ul className="footer__links">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneTel}`}>Ligar {site.phoneDisplay}</a>
              </li>
              <li>
                {site.city} — {site.state}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p>
            {services
              .slice(0, 4)
              .map((s) => s.title)
              .join(" · ")}{" "}
            · {areas[0]} · {areas[2]}
          </p>
        </div>
      </div>
    </footer>
  );
}
