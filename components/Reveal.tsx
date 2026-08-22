"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animacao leve de entrada.
 *
 * Regra de seguranca: o conteudo comeca visivel e so recebe o estado inicial
 * da animacao se estiver realmente abaixo da dobra no momento da montagem.
 * Assim nada que o visitante ja consegue ver e escondido, e uma falha do
 * IntersectionObserver nunca resulta em secao em branco.
 */
export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ja visivel (ou acima da dobra): mantem sem animacao.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setVisible(false);

    const reveal = () => {
      setVisible(true);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(safety);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && reveal(),
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);

    // Rede de seguranca: rolagem rapida pode nao gerar entrada do observer.
    const onScroll = () => {
      if (node.getBoundingClientRect().top < window.innerHeight) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Ultimo recurso: nunca deixar o conteudo preso invisivel.
    const safety = window.setTimeout(reveal, 4000);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(safety);
    };
  }, []);

  return (
    <div ref={ref} className="reveal" data-visible={visible}>
      {children}
    </div>
  );
}
