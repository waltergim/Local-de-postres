"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { put } from "@vercel/blob";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/dal";
import { triggerSiteRevalidate } from "@/lib/revalidate";
import { productSchema } from "@/lib/validation";

export type ProductFormState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

async function uploadImage(
  file: FormDataEntryValue | null,
): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().slice(0, 5);
  const key = `productos/${randomUUID()}.${ext}`;
  const blob = await put(key, file, { access: "public", addRandomSuffix: false });
  return blob.url;
}

function parse(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    sortOrder: formData.get("sortOrder"),
    available: formData.get("available") === "on",
  });
}

export async function createProduct(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parse(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const uploaded = await uploadImage(formData.get("image"));
  const image = uploaded ?? parsed.data.imageUrl ?? null;

  await getDb()
    .insert(products)
    .values({
      id: randomUUID(),
      name: parsed.data.name,
      price: parsed.data.price,
      category: parsed.data.category,
      description: parsed.data.description || null,
      image,
      sortOrder: parsed.data.sortOrder,
      available: parsed.data.available,
    });

  await triggerSiteRevalidate();
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(
  id: string,
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parse(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const uploaded = await uploadImage(formData.get("image"));
  const image = uploaded ?? parsed.data.imageUrl ?? null;

  await getDb()
    .update(products)
    .set({
      name: parsed.data.name,
      price: parsed.data.price,
      category: parsed.data.category,
      description: parsed.data.description || null,
      image,
      sortOrder: parsed.data.sortOrder,
      available: parsed.data.available,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  await triggerSiteRevalidate();
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await getDb().delete(products).where(eq(products.id, id));
  }
  await triggerSiteRevalidate();
  revalidatePath("/admin");
}
