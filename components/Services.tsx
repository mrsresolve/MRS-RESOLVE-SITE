import { services } from "@/lib/site";
import { Figure } from "./Figure";
import { ServiceIcon } from "./Icons";

export function Services() {
  return (
    <section className="section section--surface" id="servicos">
      <div className="shell">
        <div className="section-head section-head--center">
          <span className="tag">Serviços</span>
          <h2>Serviços de pintura</h2>
          <p>
            Do apartamento entregue para locação à fachada do condomínio, com a
            mesma preparação e o mesmo cuidado de acabamento.
          </p>
        </div>

        <ul className="services-grid">
          {services.map((service, i) => (
            <li key={service.slug}>
              <article className="scard">
                <div className="scard__media">
                  <Figure
                    src={service.photo}
                    alt={service.photoAlt ?? `${service.title} — MRS Resolve`}
                    variant={(i % 5) as 0 | 1 | 2 | 3 | 4}
                    tone={i % 2 === 0 ? "dark" : "light"}
                    note="Foto do serviço"
                    width={600}
                    height={750}
                  />
                  <span className="scard__badge">
                    <ServiceIcon name={service.icon} />
                  </span>
                </div>
                <div className="scard__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
