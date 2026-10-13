import Image from "next/image";
import { site } from "@/lib/site";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="inicio">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-muted">
            Postres caseros
          </span>

          <h1 className="mt-5 font-display text-5xl leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>

          <p className="mt-6 max-w-md text-xl text-muted">{site.tagline}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper transition hover:bg-ink-soft"
            >
              Ver productos
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-base font-medium text-ink transition hover:border-ink/30"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hacé tu pedido
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-line bg-surface p-10 text-center">
            <Image
              src="/logo.webp"
              alt={`Logo de ${site.name}`}
              width={100}
              height={100}
              priority
              className="h-40 w-40 rounded-full object-cover"
            />
            <p className="font-display text-2xl text-ink">
              ¿Qué se te antoja hoy?
            </p>
            <p className="text-base text-muted">
              Tortas, bocaditos, batidos y más. Pedí en segundos por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
