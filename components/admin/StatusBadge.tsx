import type { LeadStatus } from "@prisma/client";

const MAP: Record<LeadStatus, { label: string; cls: string }> = {
  NOVO: { label: "Novo", cls: "badge--novo" },
  ATENDIDO: { label: "Atendido", cls: "badge--atendido" },
  FECHADO: { label: "Fechado", cls: "badge--fechado" },
  PERDIDO: { label: "Perdido", cls: "badge--perdido" },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const { label, cls } = MAP[status];
  return <span className={`badge ${cls}`}>{label}</span>;
}
