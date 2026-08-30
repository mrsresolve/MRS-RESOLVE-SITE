"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/admin/actions";
import { BlogIcon, DashboardIcon, LogoutIcon, TagIcon } from "./Icons";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: DashboardIcon },
  { href: "/admin/tags", label: "Tags", Icon: TagIcon },
  { href: "/admin/blog", label: "Blog", Icon: BlogIcon },
] as const;

export function Sidebar({ userName }: { userName: string }) {
  const path = usePathname();

  return (
    <aside className="admin__sidebar">
      <div className="admin__brand">
        MRS Resolve
        <small>Painel administrativo</small>
      </div>

      <nav className="admin__nav">
        {NAV.map(({ href, label, Icon }) => {
          const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="admin__nav-item"
              aria-current={active ? "page" : undefined}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="admin__sidebar-footer">
        <p style={{ fontSize: "0.8125rem", marginBottom: "0.6rem" }}>{userName}</p>
        <form action={signOutAction}>
          <button type="submit" className="admin__logout">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <LogoutIcon />
              Sair
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}
