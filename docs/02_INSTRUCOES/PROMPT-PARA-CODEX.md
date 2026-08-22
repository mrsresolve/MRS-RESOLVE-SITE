# Prompt para Codex / Agente de Código

Construa o site oficial da MRS Resolve usando os arquivos deste pacote como fonte de verdade.

## Objetivo

Criar um site institucional moderno, rápido, responsivo e orientado a conversão para uma empresa de pintura profissional em Brasília.

O site não deve usar copy publicitária exagerada. A pessoa que chega já procura pintura; a interface deve provar rapidamente profissionalismo, agilidade e organização.

## Stack

Prefira uma implementação simples, performática e fácil de manter. Se o repositório estiver vazio, use Next.js com App Router, TypeScript e CSS/Tailwind apenas se necessário. Evite dependências desnecessárias.

O site será publicado via Netlify a partir da branch principal.

## Identidade

Use os logos da pasta `04_ASSETS/logos`.

Cores:
- #172554
- #F59E0B
- #F8FAFC
- #1F2937

Tipografia: Manrope, com fallback sans-serif.

## Estrutura da home

1. Header
2. Hero
3. Serviços
4. Trabalhos realizados / antes e depois
5. Como funciona
6. Diferenciais
7. Onde atendemos
8. FAQ
9. CTA final
10. Footer

## Hero obrigatório

H1: “Pintura profissional em Brasília”

Texto: “Orçamento rápido para casas, apartamentos, empresas e condomínios.”

CTA: “Solicitar orçamento agora”

Apoio: “Atendimento rápido pelo WhatsApp.”

## UX

- mobile first;
- CTA de orçamento sempre fácil de acessar;
- formulário curto de qualificação opcional antes do WhatsApp;
- navegação simples;
- sem carrosséis automáticos;
- acessibilidade por teclado;
- contraste AA;
- respeitar prefers-reduced-motion.

## SEO

Implemente title, meta description, canonical configurável, Open Graph, sitemap, robots, JSON-LD LocalBusiness/HousePainter, Service e breadcrumbs quando aplicável.

Criar arquitetura preparada para páginas locais futuras:

- /pintura-lago-sul
- /pintura-lago-norte
- /pintura-asa-sul
- /pintura-asa-norte
- /pintura-noroeste
- /pintura-sudoeste
- /pintura-park-way
- /pintura-jardim-botanico

Não criar páginas locais duplicadas apenas trocando o nome da região. Cada página futura deverá ter conteúdo próprio.

## Performance

- imagens em WebP/AVIF;
- lazy loading abaixo da dobra;
- dimensões explícitas de imagem;
- evitar JS desnecessário;
- priorizar Core Web Vitals.

## Conteúdo

Use `01_COPY/COPY-SITE.md` como copy principal.

Não inventar serviços que não estejam confirmados.

Não usar “orçamento no mesmo dia” sem confirmação.

## Fotos

Neste pacote existem referências de marca, mas não fotos reais de obras. Estruture componentes de imagem com placeholders elegantes e fáceis de substituir. Não use imagens genéricas externas sem aprovação.
