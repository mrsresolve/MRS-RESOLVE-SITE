import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";

/**
 * Recebe o clique de um botão de contato (WhatsApp) e grava como Lead.
 * Chamado via sendBeacon/fetch no clique — não bloqueia a navegação pro
 * WhatsApp, então falha aqui nunca deve impedir o usuário de falar com a
 * empresa.
 */
export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null);
  if (!isRecord(body) || typeof body.paginaUrl !== "string" || typeof body.botao !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") ?? "";
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const cidade = req.headers.get("x-vercel-ip-city");

  await db.lead.create({
    data: {
      origem: str(body.origem),
      midia: str(body.midia),
      campanha: str(body.campanha),
      termo: str(body.termo),
      gclid: str(body.gclid),
      referrer: str(body.referrer)?.slice(0, 500) ?? null,
      paginaUrl: body.paginaUrl.slice(0, 500),
      botao: body.botao.slice(0, 100),
      dispositivo: parseDispositivo(ua),
      navegador: parseNavegador(ua),
      sistema: parseSistema(ua),
      cidade: cidade ? decodeURIComponent(cidade) : null,
      regiao: req.headers.get("x-vercel-ip-country-region"),
      ipHash: ip ? createHash("sha256").update(ip).digest("hex") : null,
    },
  });

  return NextResponse.json({ ok: true });
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function str(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v.slice(0, 200) : null;
}

function parseDispositivo(ua: string): string {
  if (/mobile/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

function parseNavegador(ua: string): string | null {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome\//i.test(ua)) return "Chrome";
  if (/firefox\//i.test(ua)) return "Firefox";
  if (/safari\//i.test(ua)) return "Safari";
  return null;
}

function parseSistema(ua: string): string | null {
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/windows/i.test(ua)) return "Windows";
  if (/mac os/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  return null;
}
