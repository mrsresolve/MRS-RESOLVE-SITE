import type { Metadata } from "next";
import "../admin.css";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ proximo?: string }>;
}) {
  const { proximo } = await searchParams;

  return (
    <div className="login-shell">
      <div className="login-card">
        <div>
          <h1>Painel MRS Resolve</h1>
          <p>Entre com seu e-mail e senha.</p>
        </div>
        <LoginForm proximo={proximo} />
      </div>
    </div>
  );
}
