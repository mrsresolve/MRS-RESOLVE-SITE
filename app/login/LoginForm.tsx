"use client";

import { useState } from "react";
import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import { EyeIcon, EyeOffIcon } from "@/components/admin/Icons";

const initialState: LoginState = {};

export function LoginForm({ proximo }: { proximo?: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="login-field__password">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="login-field__toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
      </div>

      <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
