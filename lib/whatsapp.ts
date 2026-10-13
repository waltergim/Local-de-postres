import { site } from "@/lib/site";
import type { Product } from "@/lib/products";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppLink(product: Product): string {
  const message = `¡Hola ${site.name}! Quiero pedir: ${product.name} (${formatPrice(
    product.price,
  )}). ¿Está disponible?`;
  return buildWhatsAppLink(message);
}

export const generalWhatsAppLink = buildWhatsAppLink(
  `¡Hola ${site.name}! Quisiera hacer una consulta.`,
);
