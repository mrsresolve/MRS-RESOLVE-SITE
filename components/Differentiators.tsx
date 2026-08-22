import { differentiators } from "@/lib/site";
import { Figure } from "./Figure";
import { CheckIcon } from "./Icons";

export function Differentiators() {
  return (
    <section className="section" id="diferenciais">
      <div className="shell diffs">
        <div className="diffs__media">
          <Figure
            alt="Piso e móveis protegidos antes do início da pintura"
            variant={4}
            note="Preparação e proteção"
            width={800}
            height={1000}
          />
        </div>

        <div>
          <div className="section-head">
            <span className="tag">Diferenciais</span>
            <h2>Serviço profissional do início ao fim</h2>
          </div>

          <ul className="diff-list" style={{ marginTop: "2.5rem" }}>
            {differentiators.map((item) => (
              <li className="diff" key={item.title}>
                <span className="diff__icon" aria-hidden>
                  <CheckIcon />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
