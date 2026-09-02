/**
 * Registra o clique num botão de contato como Lead (ver app/api/leads).
 * Usa sendBeacon pra não atrasar/travar a navegação pro WhatsApp — se
 * falhar, o usuário nem percebe, só não entra no Dashboard.
 */
export function trackClick(botao: string) {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const payload = {
    origem: params.get("utm_source"),
    midia: params.get("utm_medium"),
    campanha: params.get("utm_campaign"),
    termo: params.get("utm_term"),
    gclid: params.get("gclid"),
    referrer: document.referrer || null,
    paginaUrl: window.location.pathname,
    botao,
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/leads", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/leads", {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {});
  }
}
