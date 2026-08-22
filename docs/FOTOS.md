# Como trocar os espaços reservados por fotos reais

O pacote da marca não incluiu fotos de obras da MRS Resolve. Enquanto elas não
existirem, as imagens dessas seções são desenhadas em SVG com a identidade
visual e trazem um selo indicando o que entra no lugar.

Já usam material real: o **hero** (vídeo da empresa), a **galeria de
trabalhos** (8 fotos) e um dos **cards de destaque**.

Nenhuma imagem de banco de imagens foi usada.

## Passo a passo

1. Salve as fotos em `public/fotos/` (WebP ou AVIF, largura de 1600px basta).
2. Aponte o caminho no componente correspondente.
3. Rode `npm run build` e confira.

O componente `components/Figure.tsx` decide sozinho: **com** `src` renderiza a
foto otimizada; **sem** `src` desenha o espaço reservado.

## Onde apontar cada foto

| Lugar | Arquivo a editar | O que fazer |
| --- | --- | --- |
| Cards de destaque | `components/Highlights.tsx` | Adicionar `photo` em cada item de `cards` |
| Serviços | `lib/site.ts` | Preencher `photo` e `photoAlt` em cada serviço |
| Galeria de trabalhos | `lib/site.ts` (`works`) | Já usa fotos reais — adicionar novos itens |
| Diferenciais | `components/Differentiators.tsx` | Adicionar `src` no `<Figure>` |

Exemplo em `lib/site.ts`:

```ts
{
  slug: "pintura-residencial",
  title: "Pintura residencial",
  description: "Casas e apartamentos, com preparação e acabamento profissional.",
  icon: "casa",
  photo: "/fotos/residencial.webp",
  photoAlt: "Sala de estar recém-pintada em apartamento na Asa Norte",
}
```

## Galeria de trabalhos

A seção "Trabalhos realizados" usa fotos reais, listadas em `works` no
`lib/site.ts`. Para adicionar um trabalho novo:

1. Salve a foto em `public/fotos/` (ver otimização abaixo).
2. Acrescente um item ao array `works`.

```ts
{
  slug: "cozinha-noroeste",
  tag: "Interna",                 // etiqueta laranja no cartão
  title: "Cozinha no Noroeste",
  caption: "Uma linha sobre o serviço.",
  photo: "/fotos/cozinha-noroeste.webp",
  alt: "Cozinha recém-pintada em apartamento no Noroeste",
  shape: "tall",                  // ver formatos abaixo
}
```

### Como a grade se organiza

No desktop a grade tem 6 colunas. O `shape` acompanha a orientação da foto:

| Formato | Colunas | Proporção | Para |
| --- | --- | --- | --- |
| `tall` | 2 | 3:4 | fotos em retrato |
| `medium` | 2 | 4:3 | fotos em paisagem |
| `wide` | 3 | 4:3 | paisagem em destaque |

Os 8 trabalhos atuais fecham três fileiras cheias: 3 `tall`, 2 `wide` e
3 `medium`. Ao mudar a quantidade, mantenha **cada fileira somando 6
colunas** para não sobrar buraco.

O véu escuro que garante a leitura da legenda fica na própria legenda, não no
cartão. Assim ele tem sempre a altura do texto mais o esmaecimento, seja num
cartão alto de retrato ou num baixo de paisagem.

### Otimização das fotos

```bash
ffmpeg -i foto-original.jpg -vf "scale=1200:-2" \
  -c:v libwebp -quality 78 -compression_level 6 public/fotos/nome.webp
```

O export é estático, então o Next não otimiza imagem em build — o arquivo que
você colocar é o que vai para o ar.

### Seção antes/depois

O comparador antes/depois está **oculto**: ele existe em
`components/Works.tsx` e `components/BeforeAfter.tsx`, mas não entra na home.
Ele só faz sentido com os dois lados do mesmo ambiente fotografados. Quando
esses pares existirem, preencha `beforeSrc` e `afterSrc` em `Works.tsx` e
troque `<Gallery />` por `<Works />` em `app/page.tsx` — ou use os dois.

## Vídeo do hero

O hero **não** usa espaço reservado: ele roda o vídeo real da MRS Resolve, sem
som e em loop.

| Arquivo | Uso |
| --- | --- |
| `public/videos/hero-desktop.webm` / `.mp4` | Telas a partir de 768px (paisagem 1280×720) |
| `public/videos/hero-mobile.webm` / `.mp4` | Telas menores (retrato 720×1280) |
| `public/videos/hero-*-poster.webp` | Primeiro quadro, exibido enquanto o vídeo carrega |

O navegador baixa **só uma** das duas versões — a escolha acontece em
`components/HeroVideo.tsx`, no navegador. Quem tem `prefers-reduced-motion`
ativado vê apenas o pôster.

### Para trocar o vídeo

Substitua os arquivos mantendo os nomes. Para gerar as versões a partir de um
original novo:

```bash
# MP4 (compatibilidade universal), sem áudio
ffmpeg -i original.mp4 -an -c:v libx264 -preset slow -crf 26 \
  -pix_fmt yuv420p -movflags +faststart public/videos/hero-desktop.mp4

# WebM/VP9 (~30% menor, usado por Chrome e Firefox)
ffmpeg -i original.mp4 -an -c:v libvpx-vp9 -crf 40 -b:v 0 \
  -deadline good -cpu-used 4 -row-mt 1 public/videos/hero-desktop.webm

# Pôster: primeiro quadro
ffmpeg -i public/videos/hero-desktop.mp4 -frames:v 1 -c:v libwebp \
  -quality 72 public/videos/hero-desktop-poster.webp
```

O `-an` remove o áudio: o vídeo toca mudo, então a trilha só pesaria no
download.

### Se o vídeo novo for mais claro ou mais escuro

Os degradês de overlay em `app/globals.css` (`.hero__overlay`) foram calibrados
contra o quadro mais claro deste vídeo para manter o texto branco acima de
4,5:1. Ao trocar o vídeo, confira o contraste e ajuste as paradas do degradê se
necessário.

## Fotos necessárias para a versão final

Lista do briefing (`docs/02_INSTRUCOES/BRIEFING-DESIGN-UX.md`):

1. Antes/depois — pares do mesmo ambiente, para reativar o comparador.
2. Preparação — proteção de piso e móveis.
3. Execução — profissional com EPI, ambiente organizado.
4. Detalhe de acabamento.
5. Opcional — veículo, uniforme ou equipe.

O item "hero" da lista original já está resolvido pelo vídeo, e a galeria já
tem 5 trabalhos reais.

## Texto alternativo

Todo `<Figure>` exige `alt`. Descreva o que aparece e onde fica
("Fachada pintada em casa no Lago Sul"), nunca "foto de pintura".

## Imagem de compartilhamento

Hoje o Open Graph usa o logo horizontal. Ao ter uma foto boa de obra, gere uma
imagem 1200×630 em `public/og.png` e troque o caminho em `app/layout.tsx`.
