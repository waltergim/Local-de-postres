import { z } from "zod";
import { CATEGORY_IDS } from "./constants";

const categoryIds = CATEGORY_IDS as [string, ...string[]];

export const productSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(120),
  price: z.coerce
    .number()
    .int("El precio debe ser un número entero")
    .min(0, "El precio no puede ser negativo"),
  category: z.enum(categoryIds),
  description: z
    .string()
    .trim()
    .max(300, "Máximo 300 caracteres")
    .default(""),
  imageUrl: z.string().trim().default(""),
  sortOrder: z.coerce.number().int().catch(0),
  available: z.coerce.boolean().catch(false),
});

export const siteSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  shortName: z.string().trim().min(1, "El nombre corto es obligatorio"),
  tagline: z.string().trim().max(160, "Máximo 160 caracteres").default(""),
  description: z.string().trim().max(400, "Máximo 400 caracteres").default(""),
  location: z.string().trim().default(""),
  address: z.string().trim().default(""),
  phoneDisplay: z.string().trim().default(""),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\d{6,15}$/, "Solo números, sin + ni espacios (ej: 5493435362034)"),
  instagram: z.string().trim().default(""),
  facebook: z.string().trim().default(""),
  email: z
    .string()
    .trim()
    .refine((v) => !v || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), {
      message: "Email inválido",
    })
    .default(""),
});

export const hoursSchema = z.array(
  z.object({
    days: z.string().trim().min(1),
    time: z.string().trim().min(1),
  }),
);

export type ProductInput = z.infer<typeof productSchema>;
export type SiteInput = z.infer<typeof siteSchema>;
