import type { Metadata } from "next";
import { cta } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="section" style={{ paddingBlock: "clamp(5rem, 14vw, 9rem)" }}>
      <div className="shell section-head section-head--center">
        <span className="tag">Erro 404</span>
        <h2>Esta página não existe</h2>
        <p>O endereço pode ter mudado. Volte para a home ou fale com a gente.</p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <a className="btn btn--navy btn--lg" href="/">
            Voltar para a home
          </a>
          <a
            className="btn btn--primary btn--lg"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cta.primaryShort}
          </a>
        </div>
      </div>
    </main>
  );
}
