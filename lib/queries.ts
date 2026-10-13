import "server-only";
import { asc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { products, siteConfig, type Product, type SiteConfig } from "./db/schema";

export async function listProducts(): Promise<Product[]> {
  return getDb()
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.name));
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const [row] = await getDb()
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return row;
}

export async function getSite(): Promise<SiteConfig | undefined> {
  const [row] = await getDb()
    .select()
    .from(siteConfig)
    .where(eq(siteConfig.id, 1))
    .limit(1);
  return row;
}
