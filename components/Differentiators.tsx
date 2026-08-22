import { differentiators } from "@/lib/site";
import { CheckIcon } from "./Icons";
import { YouTubeShort } from "./YouTubeShort";

export function Differentiators() {
  return (
    <section className="section" id="diferenciais">
      <div className="shell diffs">
        <div className="diffs__media">
          <YouTubeShort
            id="t5HRP2AFHUE"
            title="Pintura externa — MRS Resolve"
            poster="/videos/short-pintura-externa-poster.webp"
            posterAlt="Parede externa de casa recém-pintada, com o piso protegido por lona durante o serviço"
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
