import { generalWhatsAppLink } from "@/lib/whatsapp";
import type { SiteData } from "@/lib/types";
import { WhatsAppIcon } from "@/components/icons";

export function WhatsAppFloat({ site }: { site: SiteData }) {
  return (
    <a
      href={generalWhatsAppLink(site)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
