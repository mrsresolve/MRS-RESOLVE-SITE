# Como trocar os espaços reservados por fotos reais

O pacote da marca não incluiu fotos de obras da MRS Resolve. Enquanto elas não
existirem, todas as imagens do site são desenhadas em SVG com a identidade
visual e trazem um selo indicando o que entra no lugar.

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
| Hero | `components/Hero.tsx` | Adicionar `src="/fotos/hero.webp"` no `<Figure>` |
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

## Fotos necessárias para a versão final

Lista do briefing (`docs/02_INSTRUCOES/BRIEFING-DESIGN-UX.md`):

1. Hero — ambiente residencial contemporâneo bem acabado.
2. Antes/depois — pelo menos 4 serviços reais.
3. Preparação — proteção de piso e móveis.
4. Execução — profissional com EPI, ambiente organizado.
5. Detalhe de acabamento.
6. Opcional — veículo, uniforme ou equipe.

## Texto alternativo

Todo `<Figure>` exige `alt`. Descreva o que aparece e onde fica
("Fachada pintada em casa no Lago Sul"), nunca "foto de pintura".

## Imagem de compartilhamento

Hoje o Open Graph usa o logo horizontal. Ao ter uma foto boa de obra, gere uma
imagem 1200×630 em `public/og.png` e troque o caminho em `app/layout.tsx`.
