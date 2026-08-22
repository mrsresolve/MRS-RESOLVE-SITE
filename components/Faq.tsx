import { faq } from "@/lib/site";

export function Faq() {
  return (
    <section className="section section--surface" id="duvidas">
      <div className="shell">
        <div className="section-head section-head--center">
          <span className="tag">Dúvidas</span>
          <h2>Perguntas frequentes</h2>
        </div>

        <div className="faq">
          {faq.map((item) => (
            <details key={item.question} name="faq">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
