import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Process } from "@/components/Process";
import { Differentiators } from "@/components/Differentiators";
import { Areas } from "@/components/Areas";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { LocalSeo } from "@/components/LocalSeo";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />

      <main id="conteudo">
        <Hero />

        <Reveal>
          <Highlights />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <Gallery />
        </Reveal>
        <Reveal>
          <Process />
        </Reveal>
        <Reveal>
          <Differentiators />
        </Reveal>
        <Reveal>
          <Areas />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <FinalCta />
        </Reveal>
        <LocalSeo />
      </main>

      <Footer />
      <MobileBar />
    </>
  );
}
