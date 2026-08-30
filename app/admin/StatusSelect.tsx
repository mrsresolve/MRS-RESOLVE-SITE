"use client";

import { useTransition } from "react";
import type { LeadStatus } from "@prisma/client";
import { updateLeadStatus } from "./lead-actions";

const OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "NOVO", label: "Novo" },
  { value: "ATENDIDO", label: "Atendido" },
  { value: "FECHADO", label: "Fechado" },
  { value: "PERDIDO", label: "Perdido" },
];

export function StatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const novo = e.target.value as LeadStatus;
        startTransition(() => updateLeadStatus(id, novo));
      }}
      style={{
        border: "1px solid var(--line-strong)",
        borderRadius: "var(--r-sm)",
        padding: "0.3rem 0.5rem",
        font: "inherit",
        fontSize: "0.8125rem",
      }}
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
