# MRS Resolve — Site

Site institucional e comercial da **MRS Resolve**, empresa de pintura
profissional em Brasília. Construído a partir do pacote de marca aprovado
(copy, identidade visual, SEO local), preservado em [`docs/`](docs/).

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **CSS puro** com tokens de design em `app/globals.css` — sem framework de UI
- **Export estático** (`output: "export"`): o site é HTML puro, sem servidor
- Zero dependências de runtime além de React e Next

O formulário de orçamento não envia nada para um backend: ele monta a mensagem
e abre o WhatsApp no próprio navegador.

## Rodando o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera o site estático em out/
npm run typecheck  # checagem de tipos
```

## Estrutura

```
app/
  layout.tsx     metadados, fonte Manrope, JSON-LD
  page.tsx       composição da home
  globals.css    design system (tokens, componentes, responsivo)
  sitemap.ts     sitemap.xml
  robots.ts      robots.txt
components/      uma seção da home por arquivo
lib/
  site.ts        FONTE DE VERDADE do conteúdo: copy, serviços, regiões, FAQ
  whatsapp.ts    montagem da mensagem e do link wa.me
public/
  logos/         logos oficiais da marca
  fotos/         fotos reais das obras (ver docs/FOTOS.md)
docs/            pacote original de copy, briefing e SEO
```

**Para mudar textos, serviços, regiões, telefone ou FAQ, edite
`lib/site.ts`.** Os componentes apenas renderizam esses dados.

## Identidade visual

| Cor | Hex | Uso |
| --- | --- | --- |
| Azul profundo | `#172554` | Títulos, navegação, blocos institucionais, rodapé |
| Laranja | `#F59E0B` | CTA, detalhes, indicadores de interação |
| Off-white | `#F8FAFC` | Fundos de seção |
| Grafite | `#1F2937` | Texto de apoio |

Tipografia: **Manrope**, carregada e auto-hospedada pelo `next/font`.

Duas cores derivadas existem só por contraste: `--orange-600` (`#B45309`) para
ícones e texto laranja sobre fundo claro, e `--orange-hover` (`#E2900A`) para o
hover dos botões. O laranja puro não atinge 4,5:1 nesses usos.

## Estrutura da home

1. Header (fixo)
2. Hero
3. Cards de destaque
4. Serviços
5. Trabalhos realizados (comparador antes/depois)
6. Como funciona
7. Diferenciais
8. Áreas atendidas
9. Orçamento rápido
10. Perguntas frequentes
11. CTA final
12. Bloco de contexto local
13. Rodapé + barra de CTA fixa no mobile

## Acessibilidade e performance

- Auditado com **axe-core**: 0 violações WCAG 2.1 AA no desktop e no mobile
- Todas as combinações de cor verificadas em 4,5:1 (texto) e 3:1 (ícones e foco)
- Navegação por teclado completa, com skip link e anel de foco de duas camadas
- `prefers-reduced-motion` respeitado
- A página renderiza inteira **sem JavaScript** — inclusive os links de orçamento
- ~113 kB de JS no primeiro carregamento; imagens com dimensões explícitas

## SEO

Implementados: title, meta description, canonical, Open Graph, Twitter Card,
`sitemap.xml`, `robots.txt` e JSON-LD (`HousePainter` + `WebSite` + `FAQPage`,
com `areaServed` das 9 regiões e `OfferCatalog` dos 7 serviços).

O `FAQPage` só é emitido porque as mesmas perguntas e respostas aparecem
visíveis na página, como exigem as diretrizes do Google.

### Páginas locais (próxima etapa)

A arquitetura está pronta para as rotas planejadas em
[`docs/03_SEO/SEO-LOCAL.md`](docs/03_SEO/SEO-LOCAL.md)
(`/pintura-lago-sul`, `/pintura-asa-norte`, …). Ao criar cada página, adicione a
rota em `app/sitemap.ts`. **Não duplicar a home trocando o nome da região** —
cada página precisa de conteúdo próprio.

## Deploy (Netlify)

`netlify.toml` já está configurado:

- build: `npm run build`
- publish: `out`

Defina a variável `NEXT_PUBLIC_SITE_URL` com o domínio oficial. Sem ela, o site
usa `https://www.mrsresolve.com.br` como padrão em canonical, Open Graph,
sitemap e JSON-LD.

## Antes de publicar

- [ ] **Substituir os espaços reservados por fotos reais** — ver [`docs/FOTOS.md`](docs/FOTOS.md)
- [ ] Confirmar o domínio oficial e definir `NEXT_PUBLIC_SITE_URL`
- [ ] Confirmar o WhatsApp `(61) 99377-7428` e o e-mail em `lib/site.ts`
- [ ] Confirmar com a empresa os 7 serviços listados. Textura, grafiato,
      impermeabilização e pintura de madeira/metal **não** foram incluídos por
      não estarem confirmados no briefing
- [ ] Revisar as 5 respostas do FAQ com a operação — foram redigidas a partir do
      briefing e precisam bater com a prática real
- [ ] Confirmar as 9 regiões atendidas
- [ ] Gerar imagem de compartilhamento 1200×630
- [ ] Adicionar Google Analytics / Tag Manager, se desejado
- [ ] Cadastrar o sitemap no Search Console

## Promessas evitadas de propósito

Seguindo as regras de copy do pacote, o site **não** promete prazo de orçamento
("ainda hoje", "no mesmo dia") nem cria urgência artificial. Se a operação
confirmar que consegue cumprir, o texto pode ser ajustado em `lib/site.ts`.
