/**
 * Fonte única de verdade do conteúdo do site.
 *
 * Toda a copy vem de docs/01_COPY/COPY-SITE.md. Ao ajustar textos, serviços
 * ou regiões, edite aqui — os componentes apenas renderizam estes dados.
 */

/** Domínio usado quando NEXT_PUBLIC_SITE_URL não está configurada. */
const DOMINIO_PADRAO = "https://mrsresolve.com.br";

/**
 * Resolve o domínio canônico a partir da variável de ambiente.
 *
 * Cuidados aprendidos na prática, porque isso roda em build e derruba o
 * deploy inteiro quando dá errado:
 *
 * - a variável pode existir **vazia** no painel da hospedagem. `??` não
 *   pega isso, e `new URL("")` quebra o build com ERR_INVALID_URL;
 * - pode vir sem protocolo ("mrsresolve.com.br"), o que também é inválido
 *   para `new URL`;
 * - pode vir com barra final ou caminho, gerando canonical com barra dupla.
 *
 * O `.origin` normaliza tudo e nunca deixa barra no fim.
 */
function resolverDominio(): string {
  const bruto = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!bruto) return DOMINIO_PADRAO;

  const candidato = /^https?:\/\//i.test(bruto) ? bruto : `https://${bruto}`;
  try {
    return new URL(candidato).origin;
  } catch {
    console.warn(
      `[site] NEXT_PUBLIC_SITE_URL inválida (${JSON.stringify(bruto)}); ` +
        `usando ${DOMINIO_PADRAO}`,
    );
    return DOMINIO_PADRAO;
  }
}

export const site = {
  name: "MRS Resolve",
  tagline: "Pintura profissional",
  city: "Brasília",
  state: "DF",
  /** Trocar pelo domínio oficial antes de publicar (ver .env.example). */
  url: resolverDominio(),
  email: "contato@mrsresolve.com.br",
  phoneDisplay: "(61) 99377-7428",
  /** Formato internacional, apenas dígitos — usado no link do WhatsApp. */
  phoneE164: "5561993777428",
  phoneTel: "+5561993777428",
} as const;

export const cta = {
  /** CTA principal, consistente em todo o site (docs/01_COPY/CTAS-E-WHATSAPP.md). */
  primary: "Solicitar orçamento agora",
  primaryShort: "Solicitar orçamento",
  whatsapp: "Falar no WhatsApp",
  final: "Falar com a MRS Resolve",
  areas: "Consultar atendimento na minha região",
} as const;

export type NavItem = { label: string; href: string };

/**
 * Âncoras da home, prefixadas com "/" para funcionarem também a partir de
 * outra página (o blog, por exemplo) — sem o prefixo, o navegador tenta
 * rolar até a âncora na página atual em vez de ir para a home.
 */
export const nav: NavItem[] = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Trabalhos", href: "/#trabalhos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Áreas atendidas", href: "/#areas" },
  { label: "Blog", href: "/blog/" },
];

export type IconName = "casa" | "loja" | "fachada" | "condominio";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  /** Caminho em /public/fotos quando houver foto real. Ver docs/FOTOS.md. */
  photo?: string;
  photoAlt?: string;
};

/**
 * Serviços confirmados no briefing.
 *
 * A lista da copy trazia sete itens que se sobrepunham: "pintura
 * residencial" já é "casas + apartamentos", e "pintura interna" é o que
 * residencial e comercial significam. Aqui ficam só os quatro realmente
 * distintos — três por tipo de imóvel e um pelo tipo de trabalho, que é
 * operacionalmente diferente (altura, fachada, muro).
 *
 * Os termos de busca dos itens que saíram continuam no texto dos cards e no
 * bloco de contexto local. Cada um ganha página própria quando houver
 * conteúdo real (docs/03_SEO/SEO-LOCAL.md).
 *
 * Não incluir textura, grafiato, impermeabilização ou pintura de
 * madeira/metal sem confirmação da empresa.
 */
export const services: Service[] = [
  {
    slug: "pintura-residencial",
    title: "Pintura residencial",
    description:
      "Pintura de casas e apartamentos, por cômodo ou no imóvel completo, com preparação e acabamento profissional.",
    icon: "casa",
  },
  {
    slug: "pintura-comercial",
    title: "Pintura comercial",
    description:
      "Lojas, escritórios e ambientes de trabalho, com execução combinada para não parar a operação.",
    icon: "loja",
  },
  {
    slug: "pintura-externa",
    title: "Fachadas e áreas externas",
    description:
      "Pintura externa de fachadas, muros e áreas descobertas, com o preparo que a exposição ao tempo exige.",
    icon: "fachada",
  },
  {
    slug: "condominios",
    title: "Condomínios",
    description:
      "Pintura de áreas comuns e serviços programados, executados por etapas para preservar a circulação.",
    icon: "condominio",
  },
];

export type Work = {
  slug: string;
  /** Etiqueta curta do tipo de serviço. */
  tag: string;
  title: string;
  caption: string;
  photo: string;
  alt: string;
  /**
   * Formato do cartão na galeria, escolhido pela orientação da foto:
   * "tall" para retrato, "medium" e "wide" para paisagem. A grade tem 6
   * colunas — tall e medium ocupam 2, wide ocupa 3 —, então cada fileira
   * precisa somar 6 para não deixar buraco.
   */
  shape: "tall" | "medium" | "wide";
};

/** Trabalhos entregues pela MRS Resolve. Fotos reais em /public/fotos. */
export const works: Work[] = [
  {
    slug: "sala-reuniao",
    tag: "Comercial",
    title: "Sala de reunião",
    caption: "Paredes e forro em tom escuro, com recorte no rodapé de tijolo.",
    photo: "/fotos/sala-reuniao-comercial.webp",
    alt: "Sala de reunião com paredes e forro pintados em azul escuro, sanca iluminada e piso de madeira",
    shape: "tall",
  },
  {
    slug: "fachada-varanda",
    tag: "Externa",
    title: "Fachada e varanda",
    caption: "Estrutura, pilares e paredes externas de uma casa térrea.",
    photo: "/fotos/fachada-varanda-residencial.webp",
    alt: "Fachada de casa com varanda coberta, pilares pintados e piso externo",
    shape: "tall",
  },
  {
    slug: "sala-apartamento",
    tag: "Interna",
    title: "Sala de apartamento",
    caption: "Ambiente completo entregue pronto para a mudança.",
    photo: "/fotos/sala-apartamento-interna.webp",
    alt: "Sala de apartamento vazia com paredes claras recém-pintadas e teto com sanca",
    shape: "tall",
  },
  {
    slug: "entrada-pergolado",
    tag: "Residencial",
    title: "Entrada com pergolado",
    caption: "Pergolado, pilares e entrada durante a execução do serviço.",
    photo: "/fotos/entrada-pergolado-residencial.webp",
    alt: "Entrada de casa com pergolado de madeira e pilares pintados, durante a execução",
    shape: "wide",
  },
  {
    slug: "area-comum",
    tag: "Condomínios",
    title: "Área comum",
    caption: "Forro em caixotões e esquadrias de um edifício em obra.",
    photo: "/fotos/area-comum-forro-esquadrias.webp",
    alt: "Área comum de edifício com forro em caixotões pintado e esquadrias em arco",
    shape: "wide",
  },
  {
    slug: "telhado-residencial",
    tag: "Telhado",
    title: "Telhado residencial",
    caption: "Telhas pintadas uma a uma, do beiral até a cumeeira.",
    photo: "/fotos/telhado-residencial.webp",
    alt: "Telhado de telhas cerâmicas recém-pintadas, vistas de perto em ângulo",
    shape: "medium",
  },
  {
    slug: "telhado-cobertura",
    tag: "Telhado",
    title: "Cobertura completa",
    caption: "Vista da cobertura inteira depois da pintura das telhas.",
    photo: "/fotos/telhado-cobertura-completa.webp",
    alt: "Cobertura inteira de telhas cerâmicas pintadas, com céu azul ao fundo",
    shape: "medium",
  },
  {
    slug: "telhado-casa-terrea",
    tag: "Telhado",
    title: "Telhado de casa térrea",
    caption: "Todas as águas pintadas, incluindo espigões e beirais.",
    photo: "/fotos/telhado-casa-terrea.webp",
    alt: "Telhado de casa térrea com todas as águas pintadas, visto do alto",
    shape: "medium",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Solicite seu orçamento",
    description: "Conte o que precisa pelo WhatsApp e agende uma visita.",
  },
  {
    number: "02",
    title: "Avaliamos o serviço",
    description: "Visitamos o local para avaliar a área e o tipo de pintura.",
  },
  {
    number: "03",
    title: "Combinamos a execução",
    description: "Definimos o serviço, prazo e início.",
  },
  {
    number: "04",
    title: "Entregamos o ambiente pronto",
    description: "Execução organizada e atenção ao acabamento.",
  },
] as const;

export const differentiators = [
  {
    title: "Agilidade no atendimento",
    description:
      "A conversa pelo WhatsApp já começa pelo essencial: o que será pintado e onde fica, para agendarmos a visita.",
  },
  {
    title: "Organização durante a execução",
    description:
      "Etapas definidas antes de começar, para que você saiba o que acontece em cada dia de serviço.",
  },
  {
    title: "Preparação das superfícies",
    description:
      "Correção e tratamento da parede antes da tinta. É a etapa que define a durabilidade do acabamento.",
  },
  {
    title: "Cuidado com o ambiente",
    description:
      "Proteção de piso, móveis e áreas que não serão pintadas, com limpeza ao final do serviço.",
  },
  {
    title: "Atenção ao acabamento",
    description:
      "Recortes, cantos e emendas conferidos de perto — o detalhe que separa um serviço pronto de um serviço bem feito.",
  },
] as const;

/** Regiões prioritárias de atendimento (docs/03_SEO/SEO-LOCAL.md). */
export const areas = [
  "Lago Sul",
  "Lago Norte",
  "Asa Sul",
  "Asa Norte",
  "Noroeste",
  "Sudoeste",
  "Jardim Botânico",
  "Região Central de Brasília",
] as const;

export const faq = [
  {
    question: "Como funciona o orçamento?",
    answer:
      "Você entra em contato pelo WhatsApp contando o que precisa. Para um orçamento mais preciso, vamos até o local avaliar o ambiente antes de fechar a proposta.",
  },
  {
    question: "Vocês atendem qual região?",
    answer:
      "Brasília e região, com atendimento prioritário no Lago Sul, Lago Norte, Asa Sul, Asa Norte, Noroeste, Sudoeste, Jardim Botânico e região central. Se a sua região não estiver na lista, consulte pelo WhatsApp.",
  },
  {
    question: "Preciso tirar os móveis do ambiente?",
    answer:
      "Não é necessário esvaziar o ambiente. Os móveis são afastados e protegidos, assim como o piso e as áreas que não serão pintadas.",
  },
  {
    question: "O serviço inclui a preparação da parede?",
    answer:
      "Sim. A preparação da superfície faz parte do serviço e é avaliada junto com o orçamento, porque o estado atual da parede influencia diretamente no acabamento final.",
  },
  {
    question: "Vocês pintam apenas um cômodo?",
    answer:
      "Sim. O serviço pode ser feito por cômodo ou no imóvel completo, conforme a sua necessidade.",
  },
] as const;

export const seo = {
  title: "Pintura Profissional em Brasília | MRS Resolve",
  description:
    "Pintura profissional para casas, apartamentos, empresas e condomínios em Brasília. Solicite seu orçamento com a MRS Resolve.",
  ogTitle: "MRS Resolve | Pintura Profissional em Brasília",
  ogDescription:
    "Orçamento rápido para pintura residencial e comercial em Brasília.",
} as const;
