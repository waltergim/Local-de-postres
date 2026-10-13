import Image from "next/image";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import type { SiteData } from "@/lib/types";
import { WhatsAppIcon } from "@/components/icons";

const links = [
  { href: "#catalogo", label: "Productos" },
  { href: "#nosotros", label: "El local" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar({ site }: { site: SiteData }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt={`Logo de ${site.name}`}
            width={100}
            height={100}
            priority
            className="h-14 w-14 rounded-full object-cover"
          />
          <span className="font-display text-xl leading-none text-ink">
            {site.shortName}
            <span className="mt-0.5 block font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
              Bajonera
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-medium text-ink-soft transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={generalWhatsAppLink(site)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-base font-medium text-paper transition hover:bg-ink-soft"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Escribinos</span>
          <span className="sm:hidden">Pedir</span>
        </a>
      </div>
    </header>
  );
}
