import { AdminHeader } from "@/components/admin/Header";
import { StatsCard } from "@/components/admin/StatsCard";
import { getContadores, getFilterOptions, getLeads, type LeadFilters } from "@/lib/leads";
import { StatusSelect } from "./StatusSelect";

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const filters: LeadFilters = {
    periodo: (params.periodo as LeadFilters["periodo"]) || "todos",
    origem: params.origem || undefined,
    dispositivo: params.dispositivo || undefined,
    cidade: params.cidade || undefined,
    campanha: params.campanha || undefined,
  };

  const [contadores, leads, opcoes] = await Promise.all([
    getContadores(),
    getLeads(filters),
    getFilterOptions(),
  ]);

  const filtroAtivo = Object.values(filters).some((v) => v && v !== "todos");

  return (
    <>
      <AdminHeader title="Dashboard">
        <a
          className="admin-btn admin-btn--ghost"
          href={`/admin/export.csv?${new URLSearchParams(
            Object.entries(filters).filter(([, v]) => v) as [string, string][],
          ).toString()}`}
        >
          Exportar CSV
        </a>
      </AdminHeader>

      <div className="admin__content">
        <div className="stat-grid">
          <StatsCard label="Hoje" value={contadores.hoje} />
          <StatsCard label="Últimos 7 dias" value={contadores.semana} />
          <StatsCard label="Últimos 30 dias" value={contadores.mes} />
          <StatsCard label="Total" value={contadores.total} />
        </div>

        <div className="admin-panel">
          <h2>Filtros</h2>
          <form method="get" className="admin-filters">
            <div className="admin-field">
              <label htmlFor="periodo">Período</label>
              <select id="periodo" name="periodo" defaultValue={filters.periodo}>
                <option value="todos">Todos</option>
                <option value="hoje">Hoje</option>
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
              </select>
            </div>

            <div className="admin-field">
              <label htmlFor="origem">Origem</label>
              <select id="origem" name="origem" defaultValue={filters.origem ?? ""}>
                <option value="">Todas</option>
                {opcoes.origens.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-field">
              <label htmlFor="dispositivo">Dispositivo</label>
              <select id="dispositivo" name="dispositivo" defaultValue={filters.dispositivo ?? ""}>
                <option value="">Todos</option>
                {opcoes.dispositivos.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-field">
              <label htmlFor="cidade">Cidade</label>
              <select id="cidade" name="cidade" defaultValue={filters.cidade ?? ""}>
                <option value="">Todas</option>
                {opcoes.cidades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-field">
              <label htmlFor="campanha">Campanha</label>
              <select id="campanha" name="campanha" defaultValue={filters.campanha ?? ""}>
                <option value="">Todas</option>
                {opcoes.campanhas.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="admin-btn admin-btn--primary">
              Filtrar
            </button>
            {filtroAtivo ? (
              <a href="/admin" className="admin-btn admin-btn--ghost">
                Limpar
              </a>
            ) : null}
          </form>
        </div>

        <div className="admin-panel">
          <h2>Leads {filtroAtivo ? `(${leads.length} com este filtro)` : ""}</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Quando</th>
                  <th>Botão</th>
                  <th>Origem</th>
                  <th>Campanha</th>
                  <th>Dispositivo</th>
                  <th>Cidade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{formatoData.format(lead.createdAt)}</td>
                    <td>{lead.botao}</td>
                    <td>{lead.origem ?? "—"}</td>
                    <td>{lead.campanha ?? "—"}</td>
                    <td>{lead.dispositivo}</td>
                    <td>{lead.cidade ?? "—"}</td>
                    <td>
                      <StatusSelect id={lead.id} status={lead.status} />
                    </td>
                  </tr>
                ))}
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "var(--admin-text-muted)" }}>
                      Nenhum lead ainda.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
