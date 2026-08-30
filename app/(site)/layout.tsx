import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { seo, site } from "@/lib/site";
import { getTagConfig } from "@/lib/tags";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";

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

/**
 * getTagConfig() lê o banco a cada visita — por isso todo o site público
 * deixa de ser pré-renderizado estático e passa a renderizar por request.
 * É a troca deliberada por ter os IDs de rastreio editáveis sem deploy;
 * pro volume de tráfego de um site local, o custo é desprezível. Se algum
 * dia isso importar, dá pra isolar só os scripts de tag num componente
 * dinâmico dentro de um Suspense, mantendo o resto da página estático.
 */
export const dynamic = "force-dynamic";

/**
 * Layout do site público. Os IDs de rastreio (GTM, Google Ads, GA4, Meta
 * Pixel) não estão mais fixos aqui — vêm do banco via getTagConfig() e são
 * editáveis em /admin/tags, sem precisar de deploy. Cada tag só renderiza
 * se tiver valor configurado.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = await getTagConfig();

  return (
    <>
      {tags.gtm ? (
        <>
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${tags.gtm}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${tags.gtm}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      ) : null}

      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <MobileBar />

      <JsonLd />

      {tags.google_ads ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${tags.google_ads}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-tag" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${tags.google_ads}');`}
          </Script>
        </>
      ) : null}

      {tags.ga4 ? (
        <Script id="ga4-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${tags.ga4}');`}
        </Script>
      ) : null}

      {tags.meta_pixel ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${tags.meta_pixel}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${tags.meta_pixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
