import { Manrope } from "next/font/google";
import "./globals.css";

/**
 * Layout raiz — só o que é comum a TUDO no domínio, site público e painel
 * administrativo. Metadados, JSON-LD e as tags de rastreio (GTM, Google Ads)
 * ficam em app/(site)/layout.tsx: o painel em /admin não deve carregar nada
 * disso.
 */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
