"use client";

import type { AnchorHTMLAttributes } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { trackClick } from "@/lib/track";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Identifica qual botão foi clicado, pra aparecer no Dashboard. */
  botao: string;
};

/** Link de WhatsApp que registra o clique como Lead antes de navegar. */
export function WhatsAppLink({ botao, onClick, ...rest }: Props) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackClick(botao);
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
