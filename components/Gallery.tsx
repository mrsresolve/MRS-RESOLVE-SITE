import Image from "next/image";
import { works } from "@/lib/site";

/**
 * Galeria de trabalhos entregues.
 *
 * Substitui o comparador antes/depois enquanto não houver pares reais de
 * cada ambiente — ver components/Works.tsx.
 */
export function Gallery() {
  return (
    <section className="section" id="trabalhos">
      <div className="shell">
        <div className="section-head">
          <span className="tag">Trabalhos</span>
          <h2>Trabalhos realizados</h2>
          <p>
            Ambientes internos, fachadas, telhados e áreas comuns entregues em
            Brasília e região.
          </p>
        </div>

        <ul className="gallery">
          {works.map((work, i) => (
            <li key={work.slug} className={`gallery__item gallery__item--${work.shape}`}>
              <figure className="gcard">
                <div className="gcard__media">
                  <Image
                    src={work.photo}
                    alt={work.alt}
                    width={1200}
                    height={1600}
                    /* As duas primeiras costumam entrar na dobra em telas grandes */
                    loading={i < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="gcard__caption">
                  <span className="gcard__tag">{work.tag}</span>
                  <h3>{work.title}</h3>
                  <p>{work.caption}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
