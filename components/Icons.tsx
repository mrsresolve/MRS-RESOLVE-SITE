import type { SVGProps } from "react";
import type { IconName } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement>;

/** Traço uniforme em todos os ícones, para manter a família coerente. */
const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function ArrowUpRight({ size = 18, ...props }: IconProps & { size?: number }) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, ...props }: IconProps & { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.09 8.09a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.05 8.05 0 0 1-1.24-4.23c0-4.46 3.63-8.09 8.2-8.09Zm-3.7 4.29c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.79 2.73 4.34 3.83.61.26 1.08.42 1.45.54.61.19 1.16.17 1.6.1.49-.07 1.5-.61 1.71-1.21.21-.6.21-1.11.15-1.21-.06-.11-.24-.17-.5-.3-.26-.13-1.5-.74-1.74-.83-.23-.08-.4-.13-.57.13-.17.26-.65.82-.8.99-.15.17-.29.19-.55.06-.26-.13-1.07-.4-2.04-1.26-.75-.67-1.26-1.5-1.41-1.76-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.44.09-.17.04-.32-.02-.45-.06-.13-.57-1.38-.78-1.89-.2-.49-.41-.43-.57-.43h-.49Z" />
    </svg>
  );
}

export function PhoneIcon({ size = 16, ...props }: IconProps & { size?: number }) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4h1.5Z" />
    </svg>
  );
}

export function MenuIcon({ size = 20, ...props }: IconProps & { size?: number }) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ size = 20, ...props }: IconProps & { size?: number }) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon({ size = 18, ...props }: IconProps & { size?: number }) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function InfoIcon({ size = 18, ...props }: IconProps & { size?: number }) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function PinIcon({ size = 18, ...props }: IconProps & { size?: number }) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Ícones de serviço
   ------------------------------------------------------------------------- */

const serviceIcons: Record<IconName, (p: { size: number }) => React.ReactElement> = {
  casa: ({ size }) => (
    <svg {...base} width={size} height={size}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  ),
  loja: ({ size }) => (
    <svg {...base} width={size} height={size}>
      <path d="M4 9h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z" />
      <path d="M3.5 9 5 4h14l1.5 5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  ),
  fachada: ({ size }) => (
    <svg {...base} width={size} height={size}>
      <path d="M3 21V8.5L12 3l9 5.5V21" />
      <path d="M3 21h18" />
      <rect x="7.5" y="11" width="3.5" height="3.5" />
      <rect x="13" y="11" width="3.5" height="3.5" />
      <path d="M10 21v-3.5h4V21" />
    </svg>
  ),
  condominio: ({ size }) => (
    <svg {...base} width={size} height={size}>
      <path d="M3 21V9l5-3v15" />
      <path d="M8 21V6l6-3v18" />
      <path d="M14 21V10l5 3v8" />
      <path d="M2 21h20" />
    </svg>
  ),
};

export function ServiceIcon({
  name,
  size = 22,
}: {
  name: IconName;
  size?: number;
}) {
  const Icon = serviceIcons[name];
  return <Icon size={size} />;
}
