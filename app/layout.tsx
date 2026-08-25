import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { seo, site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

/** Google tag (gtag.js) — conversões do Google Ads. */
const GOOGLE_TAG_ID = "AW-18408807505";

/** Google Tag Manager. */
const GTM_ID = "GTM-P2HNGTXC";
const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s | ${site.name}`,
  },
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: [
      {
        url: "/logos/mrs-resolve-logo-horizontal.png",
        width: 600,
        height: 99,
        alt: `${site.name} — ${site.tagline} em ${site.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/logos/mrs-resolve-icone-192.png",
    apple: "/logos/mrs-resolve-avatar-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#172554",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {GTM_SCRIPT}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <a className="skip-link" href="#conteudo">
          Ir para o conteúdo
        </a>
        {children}
        <JsonLd />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`}
        </Script>
      </body>
    </html>
  );
}
