import type { Product, SiteData } from "@/lib/types";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function buildWhatsAppLink(whatsapp: string, message?: string): string {
  const base = `https://wa.me/${whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppLink(product: Product, site: SiteData): string {
  const message = `¡Hola ${site.name}! Quiero pedir: ${product.name} (${formatPrice(
    product.price,
  )}). ¿Está disponible?`;
  return buildWhatsAppLink(site.whatsapp, message);
}

export function generalWhatsAppLink(site: SiteData): string {
  return buildWhatsAppLink(
    site.whatsapp,
    `¡Hola ${site.name}! Quisiera hacer una consulta.`,
  );
}
