import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getSite, listProducts } from "@/lib/queries";
import { products as fallbackProducts } from "@/lib/products";
import { site as fallbackSite } from "@/lib/site";
import type { Catalog, Product } from "@/lib/types";

export async function getCatalog(): Promise<Catalog> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");

  try {
    const [rows, siteRow] = await Promise.all([listProducts(), getSite()]);

    if (siteRow) {
      const products: Product[] = rows
        .filter((p) => p.available)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category,
          description: p.description ?? undefined,
          image: p.image ?? undefined,
        }));

      return {
        products,
        site: {
          name: siteRow.name,
          shortName: siteRow.shortName,
          tagline: siteRow.tagline,
          description: siteRow.description,
          location: siteRow.location,
          address: siteRow.address,
          phoneDisplay: siteRow.phoneDisplay,
          whatsapp: siteRow.whatsapp,
          instagram: siteRow.instagram ?? "",
          facebook: siteRow.facebook ?? "",
          email: siteRow.email ?? "",
          hours: siteRow.hours ?? [],
        },
      };
    }
  } catch {
    // Si la base no responde, usamos los datos locales de respaldo.
  }

  return {
    products: fallbackProducts,
    site: { ...fallbackSite, hours: fallbackSite.hours.map((h) => ({ ...h })) },
  };
}
