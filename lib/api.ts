import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { products as fallbackProducts } from "@/lib/products";
import { site as fallbackSite } from "@/lib/site";
import type { Catalog, HoursRow, Product, SiteData } from "@/lib/types";

type ApiProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  available: boolean;
};

type ApiSite = Omit<SiteData, "hours"> & {
  hours: HoursRow[] | null;
};

function normalizeProduct(raw: ApiProduct): Product {
  return {
    id: raw.id,
    name: raw.name,
    price: raw.price,
    category: raw.category,
    description: raw.description ?? undefined,
    image: raw.image ?? undefined,
  };
}

function normalizeSite(raw: ApiSite): SiteData {
  return {
    name: raw.name,
    shortName: raw.shortName,
    tagline: raw.tagline,
    description: raw.description,
    location: raw.location,
    address: raw.address,
    phoneDisplay: raw.phoneDisplay,
    whatsapp: raw.whatsapp,
    instagram: raw.instagram ?? "",
    facebook: raw.facebook ?? "",
    email: raw.email ?? "",
    hours: raw.hours ?? [],
  };
}

export async function getCatalog(): Promise<Catalog> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");

  const base = process.env.BACKEND_URL;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, "")}/api/data`);
      if (res.ok) {
        const data = (await res.json()) as {
          products?: ApiProduct[];
          site?: ApiSite;
        };
        if (Array.isArray(data.products) && data.site) {
          const products = data.products
            .filter((p) => p.available)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map(normalizeProduct);
          return { products, site: normalizeSite(data.site) };
        }
      }
    } catch {
      // Si el backend no responde, usamos los datos locales de respaldo.
    }
  }

  return {
    products: fallbackProducts,
    site: { ...fallbackSite, hours: fallbackSite.hours.map((h) => ({ ...h })) },
  };
}
