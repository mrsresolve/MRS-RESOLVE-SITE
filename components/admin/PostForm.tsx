"use client";

import { useActionState } from "react";
import type { Post } from "@prisma/client";
import type { PostFormState } from "@/app/admin/blog/actions";

type Action = (prev: PostFormState, formData: FormData) => Promise<PostFormState>;

export function PostForm({ action, post }: { action: Action; post?: Post }) {
  const [state, formAction, pending] = useActionState<PostFormState, FormData>(action, {});

  return (
    <form action={formAction} className="admin-form">
      {state.error ? <p className="login-error">{state.error}</p> : null}

      <div className="admin-field">
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" type="text" required defaultValue={post?.titulo} style={{ minWidth: 420 }} />
      </div>

      <div className="admin-field">
        <label htmlFor="resumo">Resumo (aparece na listagem e nas buscas)</label>
        <textarea id="resumo" name="resumo" rows={2} defaultValue={post?.resumo} style={{ minWidth: 420 }} />
      </div>

      <div className="admin-field">
        <label htmlFor="conteudo">Conteúdo (Markdown)</label>
        <textarea
          id="conteudo"
          name="conteudo"
          rows={16}
          required
          defaultValue={post?.conteudo}
          style={{ minWidth: 420, fontFamily: "monospace", fontSize: "0.875rem" }}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="capaUrl">URL da imagem de capa</label>
        <input id="capaUrl" name="capaUrl" type="text" defaultValue={post?.capaUrl ?? ""} style={{ minWidth: 420 }} />
      </div>

      <div className="admin-field">
        <label htmlFor="capaAlt">Texto alternativo da capa</label>
        <input id="capaAlt" name="capaAlt" type="text" defaultValue={post?.capaAlt ?? ""} style={{ minWidth: 420 }} />
      </div>

      <div className="admin-field">
        <label htmlFor="metaTitulo">Título para SEO (opcional — usa o título acima se vazio)</label>
        <input id="metaTitulo" name="metaTitulo" type="text" defaultValue={post?.metaTitulo ?? ""} style={{ minWidth: 420 }} />
      </div>

      <div className="admin-field">
        <label htmlFor="metaDesc">Descrição para SEO (opcional — usa o resumo se vazio)</label>
        <textarea id="metaDesc" name="metaDesc" rows={2} defaultValue={post?.metaDesc ?? ""} style={{ minWidth: 420 }} />
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.875rem" }}>
        <input type="checkbox" name="publicar" defaultChecked={post?.status === "PUBLICADO"} />
        Publicado (visível em /blog)
      </label>

      <button type="submit" className="admin-btn admin-btn--primary" disabled={pending} style={{ justifySelf: "start" }}>
        {pending ? "Salvando…" : "Salvar"}
      </button>
    </form>
  );
}
