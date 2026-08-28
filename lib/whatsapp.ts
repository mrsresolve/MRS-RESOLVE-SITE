import { site } from "./site";

/**
 * Mensagem pré-preenchida do WhatsApp, igual em todos os botões do site.
 *
 * Fixa e simples de propósito: a MRS Resolve vai até o local para um
 * orçamento mais preciso, então o primeiro contato não precisa (nem deve)
 * pedir fotos ou detalhes do imóvel — isso é levantado na visita.
 */
const MESSAGE = `Olá, vim por meio do site da ${site.name} e desejo solicitar um orçamento.`;

/** Link wa.me com a mensagem já codificada. */
export function whatsappUrl(): string {
  return `https://wa.me/${site.phoneE164}?text=${encodeURIComponent(MESSAGE)}`;
}
