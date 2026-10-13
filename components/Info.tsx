import { site } from "@/lib/site";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";

export function Info() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address,
  )}&output=embed`;

  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-muted">
            Visitanos
          </span>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Horarios, ubicación y contacto
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="border-t border-line pt-5">
              <div className="flex items-center gap-3 text-ink">
                <ClockIcon className="h-5 w-5 text-muted" />
                <h3 className="font-display text-xl">Horarios</h3>
              </div>
              <ul className="mt-4 space-y-2 text-base">
                {site.hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex items-center justify-between gap-4 text-muted"
                  >
                    <span>{h.days}</span>
                    <span className="font-medium text-ink">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-line pt-5">
              <div className="flex items-center gap-3 text-ink">
                <MapPinIcon className="h-5 w-5 text-muted" />
                <h3 className="font-display text-xl">Ubicación</h3>
              </div>
              <p className="mt-4 text-base text-muted">{site.address}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={generalWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-base font-medium text-paper transition hover:bg-ink-soft"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:+${site.whatsapp}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-base font-medium text-ink transition hover:border-ink/30"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {site.phoneDisplay}
                </a>
              </div>

              <div className="mt-5 flex gap-3">
                {site.instagram ? (
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-ink/30 hover:text-ink"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                ) : null}
                {site.facebook ? (
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-ink/30 hover:text-ink"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line">
            <iframe
              title={`Ubicación de ${site.name}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-80 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
