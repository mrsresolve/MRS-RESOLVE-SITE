import type { Prisma } from "@prisma/client";
import { db } from "./db";

export type LeadFilters = {
  periodo?: "hoje" | "7dias" | "30dias" | "todos";
  origem?: string;
  dispositivo?: string;
  cidade?: string;
  campanha?: string;
};

function periodoParaData(periodo: LeadFilters["periodo"]): Date | undefined {
  const agora = new Date();
  switch (periodo) {
    case "hoje": {
      const inicio = new Date(agora);
      inicio.setHours(0, 0, 0, 0);
      return inicio;
    }
    case "7dias":
      return new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30dias":
      return new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
    default:
      return undefined;
  }
}

function whereFromFilters(filters: LeadFilters): Prisma.LeadWhereInput {
  const desde = periodoParaData(filters.periodo);
  return {
    ...(desde ? { createdAt: { gte: desde } } : {}),
    ...(filters.origem ? { origem: filters.origem } : {}),
    ...(filters.dispositivo ? { dispositivo: filters.dispositivo } : {}),
    ...(filters.cidade ? { cidade: filters.cidade } : {}),
    ...(filters.campanha ? { campanha: filters.campanha } : {}),
  };
}

export async function getLeads(filters: LeadFilters) {
  return db.lead.findMany({
    where: whereFromFilters(filters),
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export async function getFilterOptions() {
  const [origens, dispositivos, cidades, campanhas] = await Promise.all([
    db.lead.findMany({ distinct: ["origem"], select: { origem: true }, where: { origem: { not: null } } }),
    db.lead.findMany({ distinct: ["dispositivo"], select: { dispositivo: true } }),
    db.lead.findMany({ distinct: ["cidade"], select: { cidade: true }, where: { cidade: { not: null } } }),
    db.lead.findMany({ distinct: ["campanha"], select: { campanha: true }, where: { campanha: { not: null } } }),
  ]);

  return {
    origens: origens.map((o) => o.origem!).filter(Boolean),
    dispositivos: dispositivos.map((d) => d.dispositivo).filter(Boolean),
    cidades: cidades.map((c) => c.cidade!).filter(Boolean),
    campanhas: campanhas.map((c) => c.campanha!).filter(Boolean),
  };
}

export async function getContadores() {
  const agora = new Date();

  const inicioDia = new Date(agora);
  inicioDia.setHours(0, 0, 0, 0);

  const inicioSemana = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
  const inicioMes = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [hoje, semana, mes, total] = await Promise.all([
    db.lead.count({ where: { createdAt: { gte: inicioDia } } }),
    db.lead.count({ where: { createdAt: { gte: inicioSemana } } }),
    db.lead.count({ where: { createdAt: { gte: inicioMes } } }),
    db.lead.count(),
  ]);

  return { hoje, semana, mes, total };
}
