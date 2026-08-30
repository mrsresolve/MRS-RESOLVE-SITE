import { AdminHeader } from "@/components/admin/Header";
import { getTagConfig } from "@/lib/tags";
import { saveTags } from "./actions";

const CAMPOS: { chave: "gtm" | "google_ads" | "ga4" | "meta_pixel"; label: string; ajuda: string; exemplo: string }[] = [
  {
    chave: "gtm",
    label: "Google Tag Manager",
    ajuda: "ID do contêiner, começa com GTM-.",
    exemplo: "GTM-P2HNGTXC",
  },
  {
    chave: "google_ads",
    label: "Google Ads",
    ajuda: "ID de conversão, começa com AW-.",
    exemplo: "AW-18408807505",
  },
  {
    chave: "ga4",
    label: "Google Analytics (GA4)",
    ajuda: "ID de medição, começa com G-.",
    exemplo: "G-XXXXXXXXXX",
  },
  {
    chave: "meta_pixel",
    label: "Meta Pixel",
    ajuda: "ID numérico do Pixel do Facebook/Instagram Ads.",
    exemplo: "123456789012345",
  },
];

export default async function TagsPage() {
  const config = await getTagConfig();

  return (
    <>
      <AdminHeader title="Tags de rastreamento" />
      <div className="admin__content">
        <div className="admin-panel">
          <h2>Códigos ativos no site</h2>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            Deixe um campo vazio e salve para desativar aquela tag. A mudança
            aparece no site em até um minuto, sem precisar de novo deploy.
          </p>

          <form action={saveTags} className="admin-form">
            {CAMPOS.map((campo) => (
              <div className="admin-field" key={campo.chave}>
                <label htmlFor={campo.chave}>{campo.label}</label>
                <input
                  id={campo.chave}
                  name={campo.chave}
                  type="text"
                  placeholder={campo.exemplo}
                  defaultValue={config[campo.chave] ?? ""}
                  style={{ minWidth: 280 }}
                />
                <span style={{ fontSize: "0.75rem", color: "var(--admin-text-muted)" }}>
                  {campo.ajuda}
                </span>
              </div>
            ))}

            <button type="submit" className="admin-btn admin-btn--primary" style={{ justifySelf: "start" }}>
              Salvar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
