import type { SiteData } from "@/lib/types";

const features = [
  {
    title: "Casero de verdad",
    text: "Cada postre se prepara en el local, con ingredientes frescos y recetas de siempre.",
  },
  {
    title: "Pedido fácil",
    text: "Elegís tu postre en el catálogo y nos escribís por WhatsApp en un solo toque.",
  },
  {
    title: "Para compartir",
    text: "Desde una cucharita para el antojo hasta promos grandes para toda la mesa.",
  },
];

export function About({ site }: { site: SiteData }) {
  return (
    <section
      id="nosotros"
      className="scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-muted">
            El local
          </span>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Dulce, casero y bien bajonero
          </h2>
        </div>

        <div>
          <p className="text-lg text-muted">
            En {site.name} nos dedicamos a endulzarte el día. Preparamos
            chocotortas, bombas, bocaditos, batidos y ensaladas de frutas con ese
            gustito casero que se nota en el primer bocado.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {features.map((f, i) => (
              <div key={f.title} className="border-t border-line pt-5">
                <span className="font-display text-sm text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
