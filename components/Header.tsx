"use client";

import { useEffect, useState } from "react";
import { cta, nav, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao voltar para o desktop, evitando estado preso.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="shell header__inner">
        <a className="header__logo" href="#topo" aria-label={`${site.name} — início`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/mrs-resolve-logo-horizontal.png"
            alt={`${site.name} — ${site.tagline}`}
            width={600}
            height={99}
          />
        </a>

        <nav className="header__nav" aria-label="Navegação principal">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={`tel:${site.phoneTel}`}>
            <PhoneIcon />
            {site.phoneDisplay}
          </a>

          <a
            className="btn btn--primary header__cta"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cta.primaryShort}
          </a>

          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" id="menu-mobile">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--navy btn--block" href={`tel:${site.phoneTel}`}>
            <PhoneIcon />
            {site.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
