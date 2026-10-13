import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products, siteConfig } from "../lib/db/schema";
import { seedProducts, seedSite } from "../lib/seed-data";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Falta DATABASE_URL (revisá .env.local)");
  }

  const db = drizzle(neon(url));

  await db
    .insert(siteConfig)
    .values(seedSite)
    .onConflictDoUpdate({ target: siteConfig.id, set: seedSite });

  const inserted = await db
    .insert(products)
    .values(seedProducts)
    .onConflictDoNothing({ target: products.id })
    .returning({ id: products.id });

  console.log(`Site config actualizado. Productos nuevos insertados: ${inserted.length}/${seedProducts.length}.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
