import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function DashboardIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function TagIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M11.5 3H5a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .59 1.41l8.5 8.5a2 2 0 0 0 2.82 0l6.5-6.5a2 2 0 0 0 0-2.82l-8.5-8.5A2 2 0 0 0 11.5 3Z" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BlogIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H15l5 5v11.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5Z" />
      <path d="M14.5 3v4.5a1 1 0 0 0 1 1H20" />
      <path d="M8 12.5h8M8 16h5" />
    </svg>
  );
}

export function LogoutIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function FilterIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M4 5h16l-6 8v6l-4-2v-4Z" />
    </svg>
  );
}

export function PlusIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base} width={size} height={size} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
