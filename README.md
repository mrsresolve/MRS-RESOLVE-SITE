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
  fotos/         fotos reais dos trabalhos (ver docs/FOTOS.md)
  videos/        vídeo do hero: desktop e mobile, WebM + MP4 e pôsteres
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

1. Header (sobreposto ao hero, vira barra branca ao rolar)
2. Hero em tela cheia com vídeo de fundo
3. Cards de destaque
4. Serviços
5. Trabalhos realizados (galeria com fotos reais)
6. Como funciona
7. Diferenciais (com Short do YouTube em 9:16)
8. Áreas atendidas
9. Orçamento rápido
10. Perguntas frequentes
11. CTA final
12. Bloco de contexto local
13. Rodapé + barra de CTA fixa no mobile

## Hero em vídeo

O hero ocupa 100% da tela, sem bordas, com o vídeo da MRS Resolve rodando mudo
e em loop. São duas versões — paisagem para desktop, retrato para o celular — e
o navegador baixa **apenas uma**: a escolha acontece em JavaScript, porque dois
`<video>` no HTML fariam o navegador baixar os dois, mesmo o escondido por CSS.

Cada versão tem WebM/VP9 (menor, para Chrome e Firefox) e MP4/H.264 (Safari e
o resto). Os arquivos foram reencodados sem trilha de áudio — o vídeo toca
mudo, então o áudio só pesaria no download. Antes de o vídeo chegar, e para
quem tem `prefers-reduced-motion` ativado, aparece o pôster do primeiro quadro.

O texto fica legível sobre a imagem por camadas de degradê calibradas contra o
quadro mais claro do vídeo: na horizontal no desktop (peso à esquerda, onde
está o texto) e na vertical no mobile. Detalhes em
[`docs/FOTOS.md`](docs/FOTOS.md).

## Acessibilidade e performance

- Auditado com **axe-core**: 0 violações WCAG 2.1 AA no desktop e no mobile
- Todas as combinações de cor verificadas em 4,5:1 (texto) e 3:1 (ícones e foco)
- Navegação por teclado completa, com skip link e anel de foco de duas camadas
- `prefers-reduced-motion` respeitado
- A página renderiza inteira **sem JavaScript** — inclusive os links de orçamento
- Texto do hero verificado quadro a quadro sobre o vídeo: mínimo de 8:1
- Legendas da galeria medidas sobre cada foto: mínimo de 9,9:1
- ~114 kB de JS no primeiro carregamento; imagens com dimensões explícitas
- Vídeo do hero: 675 kB (mobile) ou 912 kB (desktop), nunca os dois
- O player do YouTube só carrega ao clicar: a home não faz nenhuma requisição
  a terceiros

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

- [x] **Fotos reais** — a home não tem mais nenhum espaço reservado: vídeo no hero, 8 fotos na galeria, 3 nos cards de destaque e o Short do YouTube. Os cards de serviço são de ícone e texto por opção; ganham imagem ao preencher `photo` em `lib/site.ts` (ver [`docs/FOTOS.md`](docs/FOTOS.md))
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

## Decisões que divergem do pacote original

Os arquivos em `docs/` são o pacote como foi entregue e ficam intactos, como
registro. Onde o site diverge deles:

| O que mudou | Por quê |
| --- | --- |
| **Park Way saiu das regiões atendidas** | A empresa confirmou que não atende a região. Não criar `/pintura-park-way`, apesar de o plano de SEO do pacote listar essa página. |
| **Sete serviços viraram quatro** | "Pintura residencial" já é "casas + apartamentos", e "pintura interna" é o que residencial e comercial significam. Os termos de busca continuam no texto. |
| **Antes/depois está oculto** | Só faz sentido com os dois lados do mesmo ambiente fotografados. A home mostra a galeria no lugar. |
| **O hero usa vídeo, não foto** | A empresa enviou vídeo próprio para desktop e celular. |

## Promessas evitadas de propósito

Seguindo as regras de copy do pacote, o site **não** promete prazo de orçamento
("ainda hoje", "no mesmo dia") nem cria urgência artificial. Se a operação
confirmar que consegue cumprir, o texto pode ser ajustado em `lib/site.ts`.
