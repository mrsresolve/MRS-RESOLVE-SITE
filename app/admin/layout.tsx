import type { Metadata } from "next";
import "../admin.css";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

/**
 * O middleware já redireciona quem não está logado antes de chegar aqui —
 * este `auth()` é só para pegar o nome do usuário para a sidebar.
 */
export const metadata: Metadata = {
  title: { default: "Painel", template: "%s · Painel MRS Resolve" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="admin">
      <Sidebar userName={session?.user?.name ?? "Conta"} />
      <div className="admin__main">{children}</div>
    </div>
  );
}
