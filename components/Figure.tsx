import Image from "next/image";

export type FigureProps = {
  /** Caminho da foto real (ex.: "/fotos/sala-depois.webp"). */
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Variação do grafismo do placeholder, para que os cartões não se repitam. */
  variant?: 0 | 1 | 2 | 3 | 4;
  tone?: "dark" | "light";
  /** Texto do selo que marca o espaço reservado. */
  note?: string;
  className?: string;
};

/**
 * Imagem do site com espaço reservado embutido.
 *
 * O pacote da marca nao inclui fotos reais de obras. Enquanto elas nao
 * existirem, cada `Figure` sem `src` desenha um grafismo da identidade.
 * Para publicar, basta salvar a foto em /public/fotos e apontar o `src`
 * (ver docs/FOTOS.md) — nenhum outro ajuste e necessario.
 */
export function Figure({
  src,
  alt,
  width = 1200,
  height = 900,
  priority = false,
  variant = 0,
  tone = "dark",
  note = "Foto do trabalho real",
  className,
}: FigureProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 900px) 100vw, 50vw"
        className={className}
      />
    );
  }

  return (
    <span
      className={`ph${tone === "light" ? " ph--light" : ""}${
        className ? ` ${className}` : ""
      }`}
      role="img"
      aria-label={alt}
    >
      <PlaceholderMark variant={variant} tone={tone} />
      <span className="ph__note">{note}</span>
    </span>
  );
}

const strokes: Record<number, string> = {
  0: "M-40 300 C 180 190, 360 360, 640 250",
  1: "M-40 210 C 200 340, 420 120, 640 240",
  2: "M-40 350 C 160 250, 380 420, 640 300",
  3: "M-40 160 C 220 240, 400 90, 640 200",
  4: "M-40 260 C 140 380, 460 160, 640 330",
};

/** Grafismo abstrato: planos de parede + uma passada de rolo em laranja. */
function PlaceholderMark({
  variant,
  tone,
}: {
  variant: number;
  tone: "dark" | "light";
}) {
  const line = tone === "dark" ? "#ffffff" : "#172554";
  const shift = variant * 37;

  return (
    <svg
      className="ph__mark"
      viewBox="0 0 600 450"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
    >
      <g stroke={line} strokeOpacity={tone === "dark" ? 0.14 : 0.1} fill="none">
        {/* Planos de parede */}
        <rect x={40 + shift} y={-60} width="230" height="420" rx="10" />
        <rect x={210 + shift} y={90} width="300" height="430" rx="10" />
        <path d={`M0 ${330 + variant * 12}h600`} />
      </g>

      {/* Passada de rolo */}
      <path
        d={strokes[variant] ?? strokes[0]}
        stroke="#f59e0b"
        strokeOpacity={tone === "dark" ? 0.18 : 0.3}
        strokeWidth="56"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={strokes[variant] ?? strokes[0]}
        stroke="#f59e0b"
        strokeOpacity={tone === "dark" ? 0.8 : 0.7}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Marca d'agua discreta com o monograma */}
      <text
        x="300"
        y="252"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="88"
        fontWeight="800"
        letterSpacing="6"
        fill={line}
        fillOpacity={tone === "dark" ? 0.09 : 0.07}
      >
        MRS
      </text>
    </svg>
  );
}
