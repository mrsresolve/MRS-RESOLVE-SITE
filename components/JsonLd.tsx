import { areas, faq, services, site } from "@/lib/site";

/**
 * Dados estruturados. HousePainter herda de LocalBusiness, entao um unico
 * no cobre negocio local + area de atuacao. FAQPage so e emitido porque as
 * mesmas perguntas e respostas ficam visiveis na pagina.
 */
export function JsonLd() {
  const business = {
    "@type": "HousePainter",
    "@id": `${site.url}#business`,
    name: site.name,
    description: `${site.tagline} em ${site.city}. Casas, apartamentos, empresas e condomínios.`,
    url: site.url,
    telephone: site.phoneTel,
    email: site.email,
    image: `${site.url}/logos/mrs-resolve-logo-horizontal.png`,
    logo: `${site.url}/logos/mrs-resolve-logo-horizontal.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "BR",
    },
    areaServed: areas.map((area) => ({
      "@type": "Place",
      name: `${area}, ${site.city} - ${site.state}`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de pintura",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.title,
          areaServed: `${site.city} - ${site.state}`,
          provider: { "@id": `${site.url}#business` },
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    url: site.url,
    name: site.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${site.url}#business` },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${site.url}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [business, website, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // O conteudo vem apenas de lib/site.ts, sem entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
