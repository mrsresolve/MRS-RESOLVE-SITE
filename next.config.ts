import type { NextConfig } from "next";

/**
 * O site público continua pré-renderizado (páginas estáticas por padrão no
 * App Router). O que muda ao sair do `output: "export"` é a possibilidade de
 * ter rotas dinâmicas ao lado dele: /admin, /login, /api/* e /ir/whatsapp,
 * que precisam de servidor para autenticação e banco de dados.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Mantido do export estático: preserva a barra final nas URLs (o formato
  // já indexado pelo Google) mesmo rodando em servidor agora.
  trailingSlash: true,

  async headers() {
    return [
      {
        // Reforça o robots.ts: o painel não deve ser indexado mesmo se
        // alguém linkar para ele por engano.
        source: "/(admin|login)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
