import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section className="section section--navy" id="como-funciona">
      <div className="shell">
        <div className="section-head">
          <span className="tag tag--dark">Processo</span>
          <h2>Como funciona</h2>
          <p>Quatro etapas, do primeiro contato até a entrega do ambiente.</p>
        </div>

        <ol className="steps">
          {processSteps.map((step) => (
            <li className="step" key={step.number}>
              <span className="step__num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
