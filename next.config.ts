import type { NextConfig } from "next";

/**
 * Export estatico: o site nao tem backend — o formulario de orcamento monta
 * um link de WhatsApp no proprio navegador. Isso mantem o deploy simples
 * (Netlify serve HTML puro) e o Core Web Vitals no melhor cenario possivel.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
