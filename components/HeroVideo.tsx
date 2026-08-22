"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP = {
  webm: "/videos/hero-desktop.webm",
  mp4: "/videos/hero-desktop.mp4",
  poster: "/videos/hero-desktop-poster.webp",
};
const MOBILE = {
  webm: "/videos/hero-mobile.webm",
  mp4: "/videos/hero-mobile.mp4",
  poster: "/videos/hero-mobile-poster.webp",
};

/**
 * Vídeo de fundo do hero.
 *
 * O arquivo só é escolhido no navegador para que apenas uma das duas versões
 * seja baixada — com dois <video> no HTML os dois seriam carregados, mesmo o
 * escondido por CSS. Enquanto isso (e quando não há JavaScript) o pôster
 * aparece como imagem de fundo, definida em CSS por media query.
 *
 * Quem pede menos animação (prefers-reduced-motion) fica só no pôster: um
 * vídeo em loop no fundo é exatamente o tipo de movimento que a preferência
 * existe para evitar.
 */
export function HeroVideo() {
  const [source, setSource] = useState<typeof DESKTOP | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setSource(isDesktop ? DESKTOP : MOBILE);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Alguns navegadores recusam o autoplay declarativo; o play() explícito
    // cobre esse caso e a falha é silenciosa (fica o pôster).
    void video.play().catch(() => undefined);
  }, [source]);

  if (!source) return null;

  return (
    <video
      ref={videoRef}
      className="hero__video"
      poster={source.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      // Fundo decorativo: o conteúdo do hero já está no texto ao lado.
      aria-hidden
      tabIndex={-1}
    >
      {/* WebM primeiro: ~30% menor. Safari e navegadores sem VP9 caem no MP4. */}
      <source src={source.webm} type="video/webm" />
      <source src={source.mp4} type="video/mp4" />
    </video>
  );
}
