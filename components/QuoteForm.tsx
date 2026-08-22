"use client";

import { useMemo, useState } from "react";
import { cta, quoteOptions, site } from "@/lib/site";
import { buildQuoteMessage, whatsappUrl } from "@/lib/whatsapp";
import type { QuoteAnswers } from "@/lib/whatsapp";
import {
  ArrowUpRight,
  CheckIcon,
  InfoIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./Icons";

const fields = [
  { key: "property", label: "O que será pintado?", options: quoteOptions.property },
  { key: "service", label: "Qual serviço?", options: quoteOptions.service },
  { key: "region", label: "Onde fica?", options: quoteOptions.region },
] as const;

const nextSteps = [
  "Você escolhe as opções e a mensagem é montada sozinha",
  "Envia as fotos do ambiente na própria conversa",
  "Recebe o retorno com a avaliação do serviço",
] as const;

/**
 * Formulario curto de qualificacao. Nada e enviado para servidor: as
 * respostas montam a mensagem e o botao abre a conversa no WhatsApp ja
 * preenchida. Todas as perguntas sao opcionais, para nao criar atrito.
 */
export function QuoteForm() {
  const [answers, setAnswers] = useState<QuoteAnswers>({});

  const message = useMemo(() => buildQuoteMessage(answers), [answers]);
  const href = useMemo(() => whatsappUrl(answers), [answers]);

  const select = (key: keyof QuoteAnswers, value: string) =>
    setAnswers((prev) => ({
      ...prev,
      // Clicar de novo na mesma opcao desmarca.
      [key]: prev[key] === value ? undefined : value,
    }));

  return (
    <section className="section" id="orcamento">
      <div className="shell quote">
        <div>
          <div className="section-head">
            <span className="tag">Orçamento</span>
            <h2>Solicite seu orçamento</h2>
            <p>
              Três perguntas rápidas. A conversa abre no WhatsApp já com as
              informações preenchidas — depois é só anexar as fotos.
            </p>
          </div>

          <ul className="quote__steps">
            {nextSteps.map((step) => (
              <li key={step}>
                <span aria-hidden>
                  <CheckIcon size={15} />
                </span>
                {step}
              </li>
            ))}
          </ul>

          <a className="quote__phone" href={`tel:${site.phoneTel}`}>
            <PhoneIcon size={17} />
            <span>
              Prefere falar por telefone?
              <strong>{site.phoneDisplay}</strong>
            </span>
          </a>
        </div>

        <div className="quote__card">
          {fields.map((field) => (
            <fieldset className="field" key={field.key}>
              <legend className="field__label">{field.label}</legend>
              <div className="field__options">
                {field.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="chip"
                    aria-pressed={answers[field.key] === option}
                    onClick={() => select(field.key, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="quote__preview">
            <strong>Mensagem que será enviada</strong>
            <p aria-live="polite">{message}</p>
          </div>

          <div className="cta-pair" style={{ marginTop: "1.5rem" }}>
            <a
              className="btn btn--primary btn--lg"
              style={{ flex: 1 }}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {cta.primary}
            </a>
            <span className="btn-arrow" aria-hidden>
              <ArrowUpRight />
            </span>
          </div>

          <p className="quote__note">
            <InfoIcon size={16} />
            Envie fotos do ambiente pelo WhatsApp. Com as imagens a avaliação
            fica mais precisa.
          </p>
        </div>
      </div>
    </section>
  );
}
