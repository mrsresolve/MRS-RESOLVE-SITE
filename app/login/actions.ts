"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const proximo = formData.get("proximo");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: typeof proximo === "string" && proximo ? proximo : "/admin",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-mail ou senha incorretos." };
    }
    // O redirect do signIn bem-sucedido lança um erro especial do Next —
    // precisa deixar ele passar, senão o login nunca redireciona.
    throw error;
  }
}
