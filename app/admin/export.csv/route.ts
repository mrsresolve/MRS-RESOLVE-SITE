import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getLeads, type LeadFilters } from "@/lib/leads";

const COLUNAS = [
  "createdAt",
  "botao",
  "paginaUrl",
  "origem",
  "midia",
  "campanha",
  "termo",
  "dispositivo",
  "navegador",
  "sistema",
  "cidade",
  "regiao",
  "status",
] as const;

function paraCsvValor(valor: unknown): string {
  const texto = valor == null ? "" : String(valor);
  if (/[",\n]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

export async function GET(req: NextRequest) {
  // O middleware não cobre rotas de API — checagem própria aqui.
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const filters: LeadFilters = {
    periodo: (params.get("periodo") as LeadFilters["periodo"]) || "todos",
    origem: params.get("origem") || undefined,
    dispositivo: params.get("dispositivo") || undefined,
    cidade: params.get("cidade") || undefined,
    campanha: params.get("campanha") || undefined,
  };

  const leads = await getLeads(filters);

  const linhas = [
    COLUNAS.join(","),
    ...leads.map((lead) =>
      COLUNAS.map((coluna) => paraCsvValor(lead[coluna])).join(","),
    ),
  ];

  return new NextResponse(linhas.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-mrs-resolve-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
