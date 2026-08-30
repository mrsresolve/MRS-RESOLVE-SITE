"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm({ proximo }: { proximo?: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="login-card" style={{ padding: 0, boxShadow: "none" }}>
      {proximo ? <input type="hidden" name="proximo" value={proximo} /> : null}

      {state.error ? <p className="login-error">{state.error}</p> : null}

      <div className="login-field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" autoFocus />
      </div>

      <div className="login-field">
        <label htmlFor="password">Senha</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>

      <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
