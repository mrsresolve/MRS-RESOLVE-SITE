# Como trocar os espaços reservados por fotos reais

O pacote da marca não incluiu fotos de obras da MRS Resolve. Enquanto elas não
existirem, as imagens das seções internas são desenhadas em SVG com a
identidade visual e trazem um selo indicando o que entra no lugar. O hero é
exceção: ele já roda o vídeo real da empresa.

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
| Cards de destaque | `components/Highlights.tsx` | Adicionar `src` em cada item de `cards` |
| Serviços | `lib/site.ts` | Preencher `photo` e `photoAlt` em cada serviço |
| Antes e depois | `components/Works.tsx` | Preencher `beforeSrc` e `afterSrc` em cada item |
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

1. Antes/depois — pelo menos 4 serviços reais.
2. Preparação — proteção de piso e móveis.
3. Execução — profissional com EPI, ambiente organizado.
4. Detalhe de acabamento.
5. Opcional — veículo, uniforme ou equipe.

O item "hero" da lista original já está resolvido pelo vídeo.

## Texto alternativo

Todo `<Figure>` exige `alt`. Descreva o que aparece e onde fica
("Fachada pintada em casa no Lago Sul"), nunca "foto de pintura".

## Imagem de compartilhamento

Hoje o Open Graph usa o logo horizontal. Ao ter uma foto boa de obra, gere uma
imagem 1200×630 em `public/og.png` e troque o caminho em `app/layout.tsx`.
