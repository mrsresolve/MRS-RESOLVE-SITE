"use client";

import { useId, useState } from "react";
import { Figure } from "./Figure";

export type BeforeAfterProps = {
  title: string;
  caption: string;
  beforeSrc?: string;
  afterSrc?: string;
  variant?: 0 | 1 | 2 | 3 | 4;
};

/**
 * Comparador antes/depois controlado por um input range — funciona com
 * mouse, toque e teclado (setas), sem biblioteca externa.
 */
export function BeforeAfter({
  title,
  caption,
  beforeSrc,
  afterSrc,
  variant = 0,
}: BeforeAfterProps) {
  const [split, setSplit] = useState(50);
  const id = useId();

  return (
    <article className="compare">
      <div
        className="compare__viewport"
        style={{ ["--split" as string]: `${split}%` }}
      >
        <div className="compare__layer">
          <Figure
            src={beforeSrc}
            alt={`${title} — antes da pintura`}
            variant={variant}
            tone="light"
            note="Antes"
            width={900}
            height={600}
          />
        </div>

        <div className="compare__layer compare__layer--after">
          <Figure
            src={afterSrc}
            alt={`${title} — depois da pintura`}
            variant={variant}
            tone="dark"
            note="Depois"
            width={900}
            height={600}
          />
        </div>

        <span className="compare__line" aria-hidden />
        <span className="compare__label compare__label--before">Antes</span>
        <span className="compare__label compare__label--after">Depois</span>

        <label className="sr-only" htmlFor={id}>
          Comparar antes e depois — {title}
        </label>
        <input
          id={id}
          className="compare__handle"
          type="range"
          min={0}
          max={100}
          step={1}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-valuetext={`${split}% do resultado final visível`}
        />
      </div>

      <div className="compare__caption">
        <div>
          <h3>{title}</h3>
          <p>{caption}</p>
        </div>
      </div>
    </article>
  );
}
