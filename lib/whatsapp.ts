import { site } from "./site";

export type QuoteAnswers = {
  property?: string;
  service?: string;
  region?: string;
};

/** Artigo correto para cada tipo de imóvel do formulário. */
const propertyPhrase: Record<string, string> = {
  Casa: "uma casa",
  Apartamento: "um apartamento",
  "Comércio": "um comércio",
  "Condomínio": "um condomínio",
};

/** Preposição correta para cada região, para a frase sair natural. */
const regionPhrase: Record<string, string> = {
  "Lago Sul": "no Lago Sul",
  "Lago Norte": "no Lago Norte",
  "Asa Sul": "na Asa Sul",
  "Asa Norte": "na Asa Norte",
  Noroeste: "no Noroeste",
  Sudoeste: "no Sudoeste",
  "Park Way": "no Park Way",
  "Jardim Botânico": "no Jardim Botânico",
  "Outra região": "em outra região de Brasília",
};

/**
 * Monta a mensagem pré-preenchida do WhatsApp
 * (modelo em docs/01_COPY/CTAS-E-WHATSAPP.md).
 *
 * Todas as perguntas são opcionais, então a frase é montada apenas com as
 * respostas escolhidas — sem trechos vazios e sempre gramatical.
 */
export function buildQuoteMessage({
  property,
  service,
  region,
}: QuoteAnswers = {}): string {
  const details: string[] = [];

  if (property) {
    details.push(`o imóvel é ${propertyPhrase[property] ?? property.toLowerCase()}`);
  }
  if (region) {
    // Sem o tipo de imovel antes, a frase precisa do sujeito explicito.
    const prefix = property ? "fica" : "o imóvel fica";
    details.push(`${prefix} ${regionPhrase[region] ?? `em ${region}`}`);
  }
  if (service === "Não sei ainda") {
    details.push("ainda preciso definir o tipo de pintura");
  } else if (service) {
    details.push(`preciso de pintura ${service.toLowerCase()}`);
  }

  const opening = details.length
    ? "Olá, gostaria de solicitar um orçamento de pintura."
    : `Olá, gostaria de solicitar um orçamento de pintura em ${site.city}.`;

  const middle = details.length ? ` ${joinPtBr(details)}.` : "";

  return `${opening}${capitalizeAfterPeriod(middle)} Posso enviar algumas fotos para avaliação?`;
}

/** "a, b e c" — vírgulas com "e" antes do último item. */
function joinPtBr(items: string[]): string {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function capitalizeAfterPeriod(text: string): string {
  return text.replace(/^ (\p{Ll})/u, (_, c: string) => ` ${c.toUpperCase()}`);
}

/** Link wa.me com a mensagem já codificada. */
export function whatsappUrl(answers?: QuoteAnswers): string {
  const text = encodeURIComponent(buildQuoteMessage(answers));
  return `https://wa.me/${site.phoneE164}?text=${text}`;
}
