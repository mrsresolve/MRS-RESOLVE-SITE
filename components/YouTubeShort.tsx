"use client";

import Image from "next/image";
import { useState } from "react";

export type YouTubeShortProps = {
  /** ID do vídeo no YouTube. */
  id: string;
  /** Título real do vídeo, usado no rótulo e no iframe. */
  title: string;
  poster: string;
  posterAlt: string;
};

/**
 * Player de Short do YouTube em 9:16.
 *
 * Começa como um link para o YouTube com a miniatura hospedada aqui. Só ao
 * clicar é que o iframe entra — assim a home não carrega o player do YouTube
 * (várias centenas de kB e cookies de terceiros) para quem nunca vai assistir.
 *
 * Sem JavaScript o link continua funcionando e abre o vídeo no YouTube.
 */
export function YouTubeShort({ id, title, poster, posterAlt }: YouTubeShortProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="short short--playing">
        <iframe
          className="short__frame"
          // nocookie: o YouTube não grava cookies de rastreamento antes do play
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <a
      className="short"
      href={`https://www.youtube.com/shorts/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Assistir ao vídeo: ${title}`}
      onClick={(e) => {
        // Deixa passar cliques com modificador e o botão do meio, para quem
        // prefere abrir em outra aba.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        setPlaying(true);
      }}
    >
      <Image
        className="short__poster"
        src={poster}
        alt={posterAlt}
        width={720}
        height={1280}
        sizes="(max-width: 979px) 320px, 360px"
      />
      <span className="short__play" aria-hidden>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
        </svg>
      </span>
      <span className="short__label">{title}</span>
    </a>
  );
}
