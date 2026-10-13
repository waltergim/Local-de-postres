import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type HoursRow = { days: string; time: string };

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  image: text("image"),
  sortOrder: integer("sort_order").notNull().default(0),
  available: boolean("available").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const siteConfig = pgTable("site_config", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  address: text("address").notNull(),
  phoneDisplay: text("phone_display").notNull(),
  whatsapp: text("whatsapp").notNull(),
  instagram: text("instagram").notNull().default(""),
  facebook: text("facebook").notNull().default(""),
  email: text("email").notNull().default(""),
  hours: jsonb("hours").$type<HoursRow[]>().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type SiteConfig = typeof siteConfig.$inferSelect;
export type NewSiteConfig = typeof siteConfig.$inferInsert;
